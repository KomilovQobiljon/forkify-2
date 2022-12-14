import icons from 'url:../../img/icons.svg';
import View from './View';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again.';
  _message = '';

  _clear(){
    this._parentElement.innerHTML = '';
  }

  _generateMarkup(){
    const markup = this._data.map((recipe)=>(this._generateMarkupView(recipe))).join('');
    return markup;
  }
  _generateMarkupView(recipe){
    const id = window.location.hash.slice(1);

    return (`
    <li class="preview">
      <a class="preview__link ${recipe.id === id ? 'preview__link--active': ''}" href="#${recipe.id}">
        <figure class="preview__fig">
          <img src="${recipe.image}" alt="${recipe.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${recipe.title}</h4>
          <p class="preview__publisher">${recipe.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
    `);
  }
}

export default new ResultsView();