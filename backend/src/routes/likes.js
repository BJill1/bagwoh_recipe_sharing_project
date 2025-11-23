import Like from '../db/models/like.js'
import mongoose from 'mongoose'
import { requireAuth } from '/workspaces/bagwoh_recipe_sharing_project/backend/middleware/jwt.js'

export function likeRoutes(app) {

  // Like a recipe
  app.post('/api/v1/recipes/:recipeId/like', requireAuth, async (req, res) => {
    try {
      const recipeId = req.params.recipeId
      const userId = req.auth.sub

      console.log('Trying to like recipe:', recipeId, 'by user:', userId)

      // Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(recipeId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid recipeId or userId' })
      }

      // Prevent duplicate like
      const existingLike = await Like.findOne({
        recipe: recipeId,
        user: userId,
      })
      console.log('Existing like:', existingLike)

      if (existingLike) {
        return res.status(400).json({ message: 'You already liked this recipe' })
      }

      const like = await Like.create({
        recipe: recipeId,
        user: userId,
      })
      return res.status(201).json({ message: 'Recipe liked', like })
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

      console.log('Trying to unlike recipe:', recipeId, 'by user:', userId)

      if (!mongoose.Types.ObjectId.isValid(recipeId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid recipeId or userId' })
      }

      const deleted = await Like.findOneAndDelete({
        recipe: recipeId,
        user: userId,
      })

      if (!deleted) {
        return res.status(400).json({ message: "You haven't liked this recipe yet" })
      }

      return res.status(200).json({ message: 'Recipe unliked' })
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