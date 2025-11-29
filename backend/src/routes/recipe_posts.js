import {
  listAllRecipes,
  listRecipesByAuthor,
  listRecipesByTag,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
} from '../services/recipe_posts.js'
import { requireAuth } from '/workspaces/bagwoh_recipe_sharing_project/backend/middleware/jwt.js'
import Like from '../db/models/like.js'  // import Like model
import mongoose from 'mongoose'

export function recipesRoutes(app) {

  // Helper to attach likes count to recipe(s)
  async function attachLikes(recipes) {
    return await Promise.all(
      recipes.map(async (recipe) => {
        const likesCount = await Like.countDocuments({ recipe: recipe._id })
        return { ...recipe.toObject(), likes: Number(likesCount) || 0 }
      })
    )
  }

  app.get('/api/v1/recipes', async (req, res) => {
    const { sortBy, sortOrder, author, tag } = req.query
    const options = { sortBy, sortOrder }

    try {
      let recipes

      if (author && tag) {
        return res
          .status(400)
          .json({ error: 'query by either author or tag, not both' })
      } else if (author) {
        recipes = await listRecipesByAuthor(author, options)
      } else if (tag) {
        recipes = await listRecipesByTag(tag, options)
      } else {
        recipes = await listAllRecipes(options)
      }

      const recipesWithLikes = await attachLikes(recipes)
      return res.json(recipesWithLikes)

    } catch (err) {
      console.error('error listing recipes', err)
      return res.status(500).end()
    }
  })

  app.get('/api/v1/recipes/:id', async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid recipe id' })
    }

    try {
      const recipe = await getRecipeById(id)
      if (!recipe) return res.status(404).end()

      const likesCount = await Like.countDocuments({ recipe: id })
      return res.json({ ...recipe.toObject(), likes: Number(likesCount) || 0 })

    } catch (err) {
      console.error('error getting post', err)
      return res.status(500).end()
    }
  })

  app.post('/api/v1/recipes', requireAuth, async (req, res) => {
    try {
      const recipe = await createRecipe(req.auth.sub, req.body)
      return res.json({ ...recipe.toObject(), likes: 0 }) // new recipe starts with 0 likes
    } catch (err) {
      console.error('error creating recipe', err)
      return res.status(500).end()
    }
  })

  app.patch('/api/v1/recipes/:id', requireAuth, async (req, res) => {
    try {
      const recipe = await updateRecipe(req.auth.sub, req.params.id, req.body)
      if (!recipe) return res.status(404).end()

      const likesCount = await Like.countDocuments({ recipe: req.params.id })
      return res.json({ ...recipe.toObject(), likes: Number(likesCount) || 0 })
    } catch (err) {
      console.error('error updating recipe', err)
      return res.status(500).end()
    }
  })

  app.delete('/api/v1/recipes/:id', requireAuth, async (req, res) => {
    try {
      const { deletedCount } = await deleteRecipe(req.auth.sub, req.params.id)
      if (deletedCount === 0) return res.sendStatus(404)
      return res.status(204).end()
    } catch (err) {
      console.error('error deleting post', err)
      return res.status(500).end()
    }
  })
}