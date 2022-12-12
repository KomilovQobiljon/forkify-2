import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _clear(){
    this._parentElement.innerHTML = '';
  }

  _generateMarkup(){
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    // page 1, and there are other pages
    if(this._data.page === 1 && numPages > 1){
      return this._generateNextPage()
    }else if (numPages === 1){
      // Page 1, and there are not other pages
      return ''
    }else if (numPages === this._data.page){
      // Last page
      return this._generatePrevPage()
    }else {
      // Other page
      return `${this._generatePrevPage()} ${this._generateNextPage()}`;
    }
  }
  _generateNextPage(){
    return  (`
    <button data-goto="${this._data.page + 1}" class="btn--inline pagination__btn--next">
      <span>Page ${this._data.page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `)
  }
  _generatePrevPage(){
    return  (`
    <button data-goto="${this._data.page - 1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.page - 1}</span>
    </button>
    `)
  }

  nextPage(){
    return this._data.page = this._data.page + 1;
  }
  prevPage(){
    return this._data.page = this._data.page - 1;
  }
  addHandlerPagination(handler){
    this._parentElement.addEventListener('click',(e)=>{
      const btn = e.target.closest('.btn--inline');
      if(!btn) return;
      const gotoPage = Number(btn.dataset.goto)
      handler(gotoPage);
    })
  }
}

export default new PaginationView();