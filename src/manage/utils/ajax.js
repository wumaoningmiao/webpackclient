export default function (method, url, data = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let sendData;
    //如果是get，则拼接url
    if (method.toLowerCase() != 'post') {
      const arr = [];
      for (let [key, value] of Object.entries(data)) {
        arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
      }
      url += '?' + arr.join('&');

    } else {
      sendData = JSON.stringify(data);

    }

    xhr.open(method, url, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          if (xhr.status == 401) {
            alert('您未登录或登陆超时，请重新登录');
            location.assign('/manage/login.html')
          }
          reject(xhr.status);
        }
      }
    }
    if (method.toLowerCase() == 'post') {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }
    //读取token 合并到请求中
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));

    xhr.send(sendData)
  })
}