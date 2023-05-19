//专门用于上传

export default (url, fd) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('post', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          if (xhr.status == 401) {
            alert('您未登录或登录超时，请重新登录');
            location.assign('/manage/login.html')
          }
          console.log(xhr.status);
          reject(xhr.status)
        }
      }
    }
    //读取token 合并到请求中
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xhr.send(fd);
  })
}