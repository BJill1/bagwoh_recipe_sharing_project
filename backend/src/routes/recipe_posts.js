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
import Like from '../db/models/like.js'
import mongoose from 'mongoose'

export function recipesRoutes(app) {

  // Helper: attach likes count to recipes
  async function attachLikes(recipes) {
    return await Promise.all(
      recipes.map(async (recipe) => {
        const likesCount = await Like.countDocuments({ recipe: recipe._id })
        return { ...recipe.toObject(), likes: Number(likesCount) || 0 }
      })
    )
  }

  // List recipes with optional sorting & filtering
  app.get('/api/v1/recipes', async (req, res) => {
    const { sortBy = 'createdAt', sortOrder = 'descending', author, tag } = req.query
    const sortMultiplier = sortOrder === 'ascending' ? 1 : -1

    try {
      let recipes

      if (author && tag) {
        return res.status(400).json({ error: 'query by either author or tag, not both' })
      } else if (author) {
        recipes = await listRecipesByAuthor(author)
      } else if (tag) {
        recipes = await listRecipesByTag(tag)
      } else {
        recipes = await listAllRecipes()
      }

      const recipesWithLikes = await attachLikes(recipes)

      // Sort by likes if requested
      if (sortBy === 'likes') {
        recipesWithLikes.sort((a, b) => (a.likes - b.likes) * sortMultiplier)
      } else {
        // Sort by any Recipe field
        recipesWithLikes.sort((a, b) => {
          if (a[sortBy] < b[sortBy]) return -1 * sortMultiplier
          if (a[sortBy] > b[sortBy]) return 1 * sortMultiplier
          return 0
        })
      }

      return res.json(recipesWithLikes)

    } catch (err) {
      console.error('Error listing recipes:', err)
      return res.status(500).end()
    }
  })

  // Get a single recipe
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
      console.error('Error getting recipe:', err)
      return res.status(500).end()
    }
  })

  // Create a recipe
  app.post('/api/v1/recipes', requireAuth, async (req, res) => {
    try {
      const recipe = await createRecipe(req.auth.sub, req.body)
      return res.status(201).json({ ...recipe.toObject(), likes: 0 })
    } catch (err) {
      console.error('Error creating recipe:', err)
      return res.status(500).end()
    }
  })

  // Update a recipe
  app.patch('/api/v1/recipes/:id', requireAuth, async (req, res) => {
    try {
      const recipe = await updateRecipe(req.auth.sub, req.params.id, req.body)
      if (!recipe) return res.status(404).end()

      const likesCount = await Like.countDocuments({ recipe: req.params.id })
      return res.json({ ...recipe.toObject(), likes: Number(likesCount) || 0 })
    } catch (err) {
      console.error('Error updating recipe:', err)
      return res.status(500).end()
    }
  })

  // Delete a recipe
  app.delete('/api/v1/recipes/:id', requireAuth, async (req, res) => {
    try {
      const { deletedCount } = await deleteRecipe(req.auth.sub, req.params.id)
      if (deletedCount === 0) return res.sendStatus(404)
      return res.status(204).end()
    } catch (err) {
      console.error('Error deleting recipe:', err)
      return res.status(500).end()
    }
  })
}
