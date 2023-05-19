const form = document.forms[0];

import ajax from '../utils/ajax';
form.onsubmit = async function (e) {
  e.preventDefault();

  const result = await ajax('post', '/api/manage/admins/reg', {
    uid: form.uid.value,
    pwd: form.pwd.value,
  })
  if (result.flag) {
    localStorage.setItem('token', result.token);
    alert('注册成功')
    location.assign('/manage/login.html')
  } else {
    alert(result.msg)
  }

}