import './tab_title.css';
import template from './tab_title.tmp';
import add_tab_content from '../tab_content/tab_content'
import { removeContent } from '../tab_content/tab_content'
// 获取选项卡标题栏元素，并插入 HTML 模板
const tab_title = document.querySelector('#tab-title');
tab_title.innerHTML = template;

const ul = tab_title.children[0];


// 定义导出函数
export default (title, name) => {
  const arrLi = ul.children;
  let key = false;
  [...arrLi].forEach(item => {
    // 如果 tab 标题已经存在，则将其设为 active 样式，并将 key 设为 true  
    if (item.dataset.template != title) {
      item.classList.remove('active');
    } else {
      item.classList.add('active');
      key = true;
    }
  })

  if (!key) {
    const li = document.createElement('li');
    li.innerHTML = name;
    const i = document.createElement('i');
    li.appendChild(i);
    li.classList.add('active');
    li.dataset.template = title;

    ul.appendChild(li);
    li.onclick = li_click;
    i.onclick = close;
  }
}



function close(e) {
  e.stopPropagation();
  let template = '';
  const currentLi = e.target.parentElement;
  if (currentLi.classList.contains('active')) {
    // 判断当前选项卡的前一项或后一项是否存在，如果存在则将其设为活动状态
    if (currentLi.previousElementSibling) {
      currentLi.previousElementSibling.classList.add('active');
      template = currentLi.previousElementSibling.dataset.template;
    } else {
      if (currentLi.nextElementSibling) {
        currentLi.nextElementSibling.classList.add('active');
        template = currentLi.nextElementSibling.dataset.template;
      }
    }
    add_tab_content(template);
  }
  currentLi.remove();

  removeContent(currentLi.dataset.content)
}

function li_click(e) {
  [...ul.children].forEach(item => {
    if (item.dataset.template != e.currentTarget.dataset.template) {
      item.classList.remove('active');
    } else {
      item.classList.add('active');
      // 显示当前选项卡对应的内容区域
      add_tab_content(e.currentTarget.dataset.template);
    }
  })
}