import { Recipe } from './recipe_posts.js'
import { initDatabase } from '../init.js'

await initDatabase()
const example_recipe = new Recipe({
    title: 'Bitterleaf Soup',
    ingredients: [
      'washed bitterleaf',
      'salt',
      'maggi',
      'water',
      'palm oil',
      'dried fish',
      'goat meat',
      'onion',
      'tomatoes'
    ],
    steps: [
      'Cut some onions and tomatoes and in hot oil till dry',
      'Add fish and boiled goat meat',
      'Put the bitterleaf, add some water and cook till ready'
    ],
    author: 'Jill Bagwoh'
  })
await example_recipe.save()

const stored_recipe = await Recipe.find()
console.log(stored_recipe)