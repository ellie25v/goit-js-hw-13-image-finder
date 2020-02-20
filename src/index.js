import './styles.css';
import pixiAPI from './API/apiService.js';
import templateImageCard from './templates/templateImageCard.hbs';
import * as basicLightbox from 'basiclightbox';
import './basicLightbox.css';


function parseData(data) {
  const result = templateImageCard(data);
  document.querySelector('.gallery').insertAdjacentHTML('beforeend', result);
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
}

let currentPage = 0;
const section = document.querySelector('#container');
const btnLoad = document.querySelector('#load-more-btn');
section.insertAdjacentHTML('beforeend', `<ul class="gallery"></ul>`)
section.insertAdjacentHTML('afterend', `<form class="search-form" id="search-form">
<input
class="input"
  type="text"
  name="query"
  autocomplete="off"
  placeholder="Search images..."/>
  </form>`);
const input = document.querySelector('.input');
const form = document.querySelector('#search-form')

btnLoad.addEventListener('click', onClick);
form.addEventListener('submit', onSubmit);
input.addEventListener('keypress', onKeypress)

function onSubmit(e) {
    e.preventDefault();
}
function onKeypress(e){
  if (e.code === "Enter") {
    e.preventDefault();
    onClick()
  }
}

function onClick(e) {
  pixiAPI(input.value, ++currentPage, parseData);
  section.addEventListener('click', lightbox);
}
let instance;

function lightbox(e) {
  if (e.target.classList.contains('img')) {
    instance = basicLightbox.create(
      `<img class="open-img" src="${e.target.dataset.origin}" width="800" height="600">`)
    instance.show()
  }
}