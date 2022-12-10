import { async } from 'regenerator-runtime';
import * as config from './config.js';
import * as helpers from './views/helpers.js';

export const state = {
  recipe: {},
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
    console.error(`${err} 💥💥💥💥`);
  }
}