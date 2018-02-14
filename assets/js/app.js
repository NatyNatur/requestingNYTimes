const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedText;

form.addEventListener('submit', function(e) {
  e.preventDefault();
  responseContainer.innerHTML= '';
  searchedText = searchField.value;
  getNews();
});

function getNews() {
  //se crea el nuevo objeto
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedText}&api-key=e96c1ec17753448eac5a6e2e5f7a2592`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  //se envía la solicitud
  articleRequest.send();
}

function handleError() {
  console.log('Se ha presentado un error');
}

function addNews() {
  const data = JSON.parse(this.responseText);
  /*const response = data.response;
  console.log(data);*/
  const article = data.response.docs[0];
  const title = article.headline.main;
  const snippet = article.snippet;

  let li = document.createElement('li');
  li.className = 'articleClass';
  li.innerText = snippet;

  var newsIcon= document.createElement('i');
  newsIcon.classList.add('far', 'fa-newspaper', 'newspaperIcon');
  li.prepend(newsIcon);

  responseContainer.appendChild(li);
}
