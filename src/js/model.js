import { async } from 'regenerator-runtime';
import * as config from './config.js';
import * as helpers from './views/helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    page: 1,
    results: [],
    resultsPerPage: config.RES_PER_PAGE
  }
}

export const loadRecipe = async (id) => {
  try{
    const data = await helpers.getJSON(`${config.API_URL}/${id}`);
  
    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    }
  }catch(err){
    throw err;
  }
}

export const loadSearchResults = async function(query) {
  try{
    state.search.query = query;
    const { data } = await helpers.getJSON(`${config.API_URL}?search=${query}`);

    state.search.results = data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      }
    })
  }catch(err){
    console.log(`${err} 💥💥💥`);
    throw err;
  }
}

export const getSearchResultsPage = function( page = state.search.page ) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;// 0
  const end = page * state.search.resultsPerPage;// 9

  return state.search.results.slice(start,end);
}

export const updateServings = function(newServings) {
  state.recipe.ingredients.forEach(ingredient=>{
    ingredient.quantity = ingredient.quantity/state.recipe.servings * newServings;
  })
  state.recipe.servings = newServings;
}