import icons from 'url:../../img/icons.svg';
import View from './View';

class SearchView extends View {
  _parentElement = document.querySelector('.search');

  _clear(){
    this._parentElement.querySelector('.search__field').value = '';
  }

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clear();
    return query;
  }

  addHandlerSearch(handler) {
    const form = document.querySelector('.search');
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      handler();
    })
  }
}

export default new SearchView();