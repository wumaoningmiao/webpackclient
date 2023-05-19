import './tab_content.css'

const tab_content = document.querySelector('#tab-content');


export default (title) => {
  let key = false;
  [...tab_content.children].forEach(item => {
    if (item.dataset.title == title) {
      key = true;
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  })

  if (!key && title != '') {
    //创建
    const div = document.createElement('div');
    div.dataset.title = title;

    import(`../${title}/${title}.tmp`).then(result => {
      div.innerHTML = result.default;

    })
    div.style.display = 'block';
    import(`../${title}/${title}.js`).then(result => {
      result.default();

    })

    import(`../${title}/${title}.css`);
    tab_content.appendChild(div);


  }
}

export function removeContent(title) {
  const elem = tab_content.querySelector(`[data-title='${title}']`);
  if (elem) {
    elem.remove();
  }
}