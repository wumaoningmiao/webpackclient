const form = document.forms[0];

import ajax from '../utils/ajax';
form.onsubmit = async function (e) {
  e.preventDefault();

  const result = await ajax('post', '/api/manage/admins/login', {
    uid: form.uid.value,
    pwd: form.pwd.value,
  })
  if (result.flag) {
    localStorage.setItem('token', result.token);
    alert('登陆成功');
    location.assign('/manage/index.html')
  } else {
    alert(result.msg)
  }
}