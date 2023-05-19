export function formatDate(s, format = 'yyyy-MM-dd hh:mm:ss') {
  const offset = new Date().getTimezoneOffset() / 60;

  const date = new Date(s)
  date.setHours(date.getHours() - 8 - offset);
  format = format.replace(/yyyy/g, date.getFullYear());

  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/M/g, date.getMonth() + 1);

  format = format.replace(/dd/g, ('0' + (date.getDate())).slice(-2));
  format = format.replace(/d/g, date.getDate());

  format = format.replace(/hh/g, ('0' + (date.getHours())).slice(-2));
  format = format.replace(/h/g, date.getHours());

  format = format.replace(/mm/g, ('0' + (date.getMinutes())).slice(-2));
  format = format.replace(/m/g, date.getMinutes());

  format = format.replace(/ss/g, ('0' + (date.getSeconds())).slice(-2));
  format = format.replace(/s/g, date.getSeconds());

  return format;
}