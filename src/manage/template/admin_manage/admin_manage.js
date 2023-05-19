import ajax from "../../utils/ajax";
import pop from '../common/pop/pop';

import { formatDate } from '../../utils/utils'


//载入pop后再载入pop内容，调用pop的load方法将内容写入pop.
import pophtml from './pop.tmp';
const a = pop.load(pophtml);
const form = a.children[0];

//只载入一次，因为
//模块化：es6的模块化：值的引用，
//每一个模块在首次被使用时，执行一次
//再次被调用不会再次执行，而是直接引用上次执行产生的执行上下文（对象）
//当我们反复调用同一个模块，需要每次调用时都执行模块内的一部分代码时，就需要导出这部分代码来主动执行。
form.onsubmit = function (e) {
  e.preventDefault();
  let url;
  if (form.id) {
    url = '/api/manage/admins/modifyadmin'
  } else {
    url = '/api/manage/admins/reg'
  }
  ajax('post', url, {
    username: form.username.value,
    password: form.password.value,
    id: form.id.value
  }).then(result => {
    if (result.flag) {
      alert(form.btn.innerHTML + '成功');
      pop.hide();
      render();
    } else {
      alert(result.msg)
    }
  })
}





let search = "", pagesize = 15, pageindex = 1;

export default init;

function init() {

  //获取管理员列表数据，并渲染到页面
  render();

  //为新增按钮附加事件
  document.getElementById('admin_manage_add_btn').onclick = show_add_window;

  //查询按钮
  document.forms['admin_manage_search'].onsubmit = function (e) {
    e.preventDefault();
    search = e.target.uid.value;
    pageindex = 1;
    render();
  }
  //重置按钮
  document.forms['admin_manage_search'].onreset = function () {
    search = '';
    pageindex = 1;
    render();
  }



}

function show_add_window() {
  form.reset();
  from.btn.innerHTML = '新增';

  pop.show();
}


//获取管理员列表数据，并渲染到页面
async function render() {
  const tbody = document.querySelector("#admin_manage_tbody");
  //删除按钮的事件
  tbody.addEventListener('click', del_admin);
  //修改按钮的点击事件
  tbody.addEventListener('click', revise_admin);


  const result = await ajax("get", '/api/manage/admins/getlist', { search, pagesize, pageindex })


  let s = '';

  result.data.forEach(item => {

    s += `<tr>
    <td>${item.id}</td>
    <td>${item.username}</td>
    <td>${formatDate(item.updateTime)}</td>
    <td>${formatDate(item.createTime)}</td>
    <td>
      <button class='revise' data-id='${item.id}'>修改</button>
      <button class='del' data-id='${item.id}'}'>删除</button>
    </td>
  </tr>`;
  })
  tbody.innerHTML = s;

}


/**
 * 为删除按钮添加事件
 */
function del_admin(e) {
  if (e.target.className == 'del') {
    const id = e.target.getAttribute('data-id');
    if (confirm("您确定要删除吗？")) {
      ajax('delete', `/api/manage/admins/deladmin`, { id }).then(result => {
        if (result.flag) {
          alert('删除成功');
          render();
        } else {
          alert('删除失败')
        }
      })
    }
  }
}
/***
 * 为修改按钮添加事件
 */
async function revise_admin(e) {
  if (e.target.className == 'revise') {
    const id = e.target.getAttribute('data-id');
    const result = await ajax('get', '/api/manage/admins/getadmin', { id });
    if (result.flag) {
      form.username.value = result.data.username;
      form.password.value = result.data.password;
      form.id.value = id;
      form.btn.innerHTML = '修改';
      pop.show();
    }
  }
}