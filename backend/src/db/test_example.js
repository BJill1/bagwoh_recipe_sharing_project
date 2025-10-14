import { initDatabase } from './init.js'
import { Recipe } from './models/recipe_post.js'
await initDatabase()

const sample_recipe = new Recipe({
    title: "corn fufu, popular Cameroonian cuisine",
    ingredients: [
        { name: "corn flower", quantity: "400g" },
        { name: "water", quantity: "enough" },
    ],
    steps: [
        { stepNumber: 1, instruction: " Boil enough quantity of water" },
        { stepNumber: 2, instruction: " Mix a small quantity of cornflower with cold water" },
        { stepNumber: 3, instruction: " Pour the cold water paste into the boiling water" },
        { stepNumber: 4, instruction: " Mix and allow to boil" },
        { stepNumber: 5, instruction: " Add more cornflower and stir till ready" },
    ],
    author: "Jill Bagwoh"
})
await sample_recipe.save()
console.log(await Recipe.find())