import Like from '../db/models/like.js'
import mongoose from 'mongoose'
import { requireAuth } from '/workspaces/bagwoh_recipe_sharing_project/backend/middleware/jwt.js'

export function likeRoutes(app) {

  // Like a recipe
  app.post('/api/v1/recipes/:recipeId/like', requireAuth, async (req, res) => {
    try {
      const recipeId = req.params.recipeId
      const userId = req.auth.sub

      if (!mongoose.Types.ObjectId.isValid(recipeId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid recipeId or userId' })
      }

      // Prevent duplicate like
      const existingLike = await Like.findOne({ recipe: recipeId, user: userId })
      if (existingLike) {
        return res.status(400).json({ message: 'You already liked this recipe' })
      }

      await Like.create({ recipe: recipeId, user: userId })

      // Return updated likes count
      const likesCount = await Like.countDocuments({ recipe: recipeId })
      return res.status(201).json({ message: 'Recipe liked', likes: likesCount })
    } catch (err) {
      console.error('Error in like route:', err)
      return res.status(500).json({ error: err.message })
    }
  })

  // Unlike a recipe
  app.post('/api/v1/recipes/:recipeId/unlike', requireAuth, async (req, res) => {
    try {
      const recipeId = req.params.recipeId
      const userId = req.auth.sub

      if (!mongoose.Types.ObjectId.isValid(recipeId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid recipeId or userId' })
      }

      const deleted = await Like.findOneAndDelete({ recipe: recipeId, user: userId })
      if (!deleted) {
        return res.status(400).json({ message: "You haven't liked this recipe yet" })
      }

      // Return updated likes count
      const likesCount = await Like.countDocuments({ recipe: recipeId })
      return res.status(200).json({ message: 'Recipe unliked', likes: likesCount })
    } catch (err) {
      console.error('Error in unlike route:', err)
      return res.status(500).json({ error: err.message })
    }
  })

  // Get like count for a recipe
  app.get('/api/v1/recipes/:recipeId/likes', async (req, res) => {
    try {
      const recipeId = req.params.recipeId

      if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        return res.status(400).json({ message: 'Invalid recipeId' })
      }

      const count = await Like.countDocuments({ recipe: recipeId })
      return res.status(200).json({ recipeId, likes: count })
    } catch (err) {
      console.error('Error in get likes route:', err)
      return res.status(500).json({ error: err.message })
    }
  })
}

