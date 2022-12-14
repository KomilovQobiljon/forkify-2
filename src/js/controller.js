import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function() {
  try{
    const id = window.location.hash.slice(1);

    if(!id) return;
    recipeView.renderSpinner();
    
    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage())

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  }catch(err){
    recipeView.renderError();
  }
};

const controlSearch = async function() {
  try{  
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if(!query) return;
    
    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render search results
    //resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  }catch(err){
    console.log(err)
    searchView.renderError();
  }
}
const controlPagination = (page) =>{
  try{
    resultsView.render(model.getSearchResultsPage(page));
    paginationView.render(model.state.search);
  }catch(err){
    console.error(err);
  }
}

const controlServings = (servings) => {
  // 1) update the recipe servings ( in state )
  model.updateServings(servings);

  // 2) update the recipe view
  recipeView.update(model.state.recipe);
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServing(controlServings);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerPagination(controlPagination);
}
init();