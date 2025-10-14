import { Recipe } from '../db/models/recipe_post.js'
export async function createRecipe({title, description, ingredients, steps, author, tags}){
    const newRecipe = new Recipe({ title, description, ingredients, steps, author, tags })
    return await newRecipe.save()
} 
    
