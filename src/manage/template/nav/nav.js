import './nav.css';
import template from './nav.tmp';
import add_tab_title from "../tab_title/tab_title";
import add_tab_content from "../tab_content/tab_content";

const menu = document.querySelector('#menu');
menu.innerHTML = template;

menu.onclick = function (e) {
  if (e.target.nodeName == 'DT') {
    if (getComputedStyle(e.target.nextElementSibling, null).display != 'none') {
      e.target.nextElementSibling.style.display = 'none';
    } else {
      e.target.nextElementSibling.style.display = 'block';
    }
  }
  if (e.target.nodeName == "A") {
    add_tab_title(e.target.dataset.template, e.target.dataset.name);
    add_tab_content(e.target.dataset.template)
  }
}
