import Like from '../db/models/like.js'
import mongoose from 'mongoose'
import { requireAuth } from '/workspaces/bagwoh_recipe_sharing_project/backend/middleware/jwt.js'

export function likeRoutes(app) {

  // Like a recipe
  app.post('/api/v1/recipes/:recipeId/like', requireAuth, async (req, res) => {
    try {
      const { recipeId } = req.params
      const userId = req.auth.sub

      if (!mongoose.Types.ObjectId.isValid(recipeId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid recipeId or userId' })
      }

      const existingLike = await Like.findOne({ recipe: recipeId, user: userId })
      if (existingLike) return res.status(400).json({ message: 'Already liked' })

      await Like.create({ recipe: recipeId, user: userId })

      const likesCount = await Like.countDocuments({ recipe: recipeId })
      return res.status(201).json({ likes: likesCount })

    } catch (err) {
      console.error('Error liking recipe:', err)
      return res.status(500).json({ error: err.message })
    }
  })

  // Unlike a recipe
  app.post('/api/v1/recipes/:recipeId/unlike', requireAuth, async (req, res) => {
    try {
      const { recipeId } = req.params
      const userId = req.auth.sub

      if (!mongoose.Types.ObjectId.isValid(recipeId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid recipeId or userId' })
      }

      const deleted = await Like.findOneAndDelete({ recipe: recipeId, user: userId })
      if (!deleted) return res.status(400).json({ message: "You haven't liked this recipe" })

      const likesCount = await Like.countDocuments({ recipe: recipeId })
      return res.status(200).json({ likes: likesCount })

    } catch (err) {
      console.error('Error unliking recipe:', err)
      return res.status(500).json({ error: err.message })
    }
  })

  // Get like count for a recipe
  app.get('/api/v1/recipes/:recipeId/likes', async (req, res) => {
    try {
      const { recipeId } = req.params

      if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        return res.status(400).json({ message: 'Invalid recipeId' })
      }

      const likesCount = await Like.countDocuments({ recipe: recipeId })
      return res.status(200).json({ likes: likesCount })

    } catch (err) {
      console.error('Error fetching likes:', err)
      return res.status(500).json({ error: err.message })
    }
  })
  // Check if current user liked a recipe
app.get('/api/v1/recipes/:recipeId/liked', requireAuth, async (req, res) => {
  try {
    const { recipeId } = req.params
    const userId = req.auth.sub

    if (!mongoose.Types.ObjectId.isValid(recipeId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid recipeId or userId' })
    }

    const like = await Like.findOne({ recipe: recipeId, user: userId })
    return res.status(200).json({ liked: !!like })

  } catch (err) {
    console.error('Error checking if user liked recipe:', err)
    return res.status(500).json({ error: err.message })
  }
})
// Check if current user liked a recipe
app.get('/api/v1/recipes/:recipeId/liked', requireAuth, async (req, res) => {
  try {
    const { recipeId } = req.params
    const userId = req.auth.sub

    if (!mongoose.Types.ObjectId.isValid(recipeId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid recipeId or userId' })
    }

    const like = await Like.findOne({ recipe: recipeId, user: userId })
    return res.status(200).json({ liked: !!like })

  } catch (err) {
    console.error('Error checking if user liked recipe:', err)
    return res.status(500).json({ error: err.message })
  }
})

}
