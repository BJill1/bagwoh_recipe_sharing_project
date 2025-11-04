import { Recipe } from '../db/models/recipe_posts.js'
import { User } from '../db/models/user.js'
export async function createRecipe(userId, {title, description, ingredients, steps, tags, imageUrl }){
    const newRecipe = new Recipe({ title, description, ingredients, steps, author: userId, tags, imageUrl })
    return await newRecipe.save()
} 
    
async function listRecipes(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Recipe.find(query).sort({ [sortBy]: sortOrder })
}
export async function listAllRecipes(options) {
      return await listRecipes({}, options)
}
export async function listRecipesByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listRecipes({ author: user._id }, options)
}
export async function listRecipesByTag(tags, options) {
  return await listRecipes({ tags }, options)
}
export async function getRecipeById(recipeId) {
  return await Recipe.findById(recipeId)
}
export async function updateRecipe(userId, recipeId, { title, description, ingredients, steps, tags }) {
  return await Recipe.findOneAndUpdate(
    { _id: recipeId, author:userId },
    { $set: { title, description, ingredients, steps, tags } },
    { new: true },
  )
}
export async function deleteRecipe(recipeId,userId) {
  return await Recipe.deleteOne({ _id: recipeId, author: userId  })
}
