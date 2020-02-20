import './styles.css';
import pixiAPI from './API/apiService.js';
import templateImageCard from './templates/templateImageCard.hbs';
import * as basicLightbox from 'basiclightbox';
import './basicLightbox.css';


function parseData(data) {
  console.log(data);
  const result = templateImageCard(data);
  document.querySelector('.gallery').innerHTML += result;
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

btnLoad.addEventListener('click', onClick);
input.addEventListener('keypress', onKeyPress);

function onKeyPress(e){
  if(e.code === "Enter"){
    e.preventDefault();
    onClick()
  }
}

function onClick(e) {
  pixiAPI(input.value, ++currentPage, parseData);
  section.addEventListener('click', lightbox);
}

function lightbox(e) {
  console.log(e.target)
  if (e.target.classList.contains('img')) {
    const instance = basicLightbox.create(
      `<img src="${e.target.dataset.origin}" width="800" height="600">`)
    instance.show()
  }
}