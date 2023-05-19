import './pop.css'
import template from './pop.tmp';

//不能直接写入文本形式的html，会覆盖之前的dom
//创建一个div做中转，把template代码插入到body中
const pop = document.createElement('div');

document.body.appendChild(pop);
pop.innerHTML = template;


//为插入的dialog(遮罩)附加点击事件，被点击时关闭弹窗
pop.children[0].onclick = function () {
  pop.children[0].style.display = 'none';
}
//为了防止点击遮罩内部的弹窗主体时，弹窗也关闭，所以，在主体上加入相同事件且阻止传递。
pop.children[0].children[0].onclick = function (e) {
  e.stopPropagation();
}


export default {
  show() {
    pop.children[0].style.display = 'flex';
  },
  load(html) {
    pop.children[0].children[0].innerHTML = html;
    return pop.children[0].children[0];
  },
  hide() {
    pop.children[0].style.display = 'none';
  }
}


