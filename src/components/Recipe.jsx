import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { likeRecipe, unlikeRecipe, getLikeCount } from '../api/likes.js'
import { User } from './User.jsx'

export function Recipe({
  id,
  title,
  author,
  ingredients,
  steps,
  imageUrl,
  token, // JWT token passed from parent
}) {
  const [likes, setLikes] = useState(0)
  const [userHasLiked, setUserHasLiked] = useState(false)
  const [loading, setLoading] = useState(false)

  // Fetch like count and user like status
  useEffect(() => {
    async function fetchLikes() {
      try {
        const data = await getLikeCount(id)
        setLikes(data.likes)
      } catch (err) {
        console.error('Error fetching likes:', err)
      }
    }
    fetchLikes()
  }, [id])

  const handleLike = async () => {
    if (!token) return alert('You must be logged in to like a recipe.')
    try {
      setLoading(true)
      await likeRecipe(token, id)
      setLikes((prev) => prev + 1)
      setUserHasLiked(true)
    } catch (err) {
      console.error('Like failed:', err)
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUnlike = async () => {
    if (!token) return alert('You must be logged in to unlike a recipe.')
    try {
      setLoading(true)
      await unlikeRecipe(token, id)
      setLikes((prev) => Math.max(prev - 1, 0))
      setUserHasLiked(false)
    } catch (err) {
      console.error('Unlike failed:', err)
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
      {imageUrl && <img src={imageUrl} alt={title} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} />}
      <h2>{title}</h2>
      {author && <p style={{ fontStyle: 'italic' }}>Written by <User id={author} /></p>}

      <hr />
      <h3>Ingredients:</h3>
      <ul>{ingredients.map((i, idx) => <li key={idx}>{i}</li>)}</ul>

      <hr />
      <h3>Steps:</h3>
      <ol>{steps.map((s, idx) => <li key={idx}>{s}</li>)}</ol>

      <hr />
      <button onClick={handleLike} disabled={loading || userHasLiked}>Like</button>
      <button onClick={handleUnlike} disabled={loading || !userHasLiked}>Unlike</button>
      <span style={{ marginLeft: '10px' }}>Likes: {likes}</span>
    </div>
  )
}

Recipe.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageUrl: PropTypes.string,
  token: PropTypes.string, // JWT token from parent
}