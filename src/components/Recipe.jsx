import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { useState, useEffect } from 'react'
import { likeRecipe, unlikeRecipe, getLikeCount } from '../api/likes.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export function Recipe({
  id,
  title,
  author,
  ingredients,
  steps,
  imageUrl,
  initialLikes = 0,
}) {
  const [likes, setLikes] = useState(Number(initialLikes) || 0) // ensure number
  const [userHasLiked, setUserHasLiked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [token] = useAuth()

  // Fetch initial likes from backend (in case not provided)
  useEffect(() => {
    async function fetchLikes() {
      try {
        const data = await getLikeCount(id)
        setLikes(Number(data.likes) || 0)
      } catch (err) {
        console.error('Failed to fetch likes:', err)
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
      alert(err.message || 'Failed to like recipe.')
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
      alert(err.message || 'Failed to unlike recipe.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: '100%',
            maxHeight: '300px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '15px',
          }}
          onError={(e) => (e.target.style.display = 'none')}
        />
      )}

      <h2>{title}</h2>
      {author && (
        <p style={{ fontStyle: 'italic' }}>
          Written by <User id={author} />
        </p>
      )}

      <hr />
      <h3>Ingredients:</h3>
      <ul>
        {ingredients.map((ingredient, i) => (
          <li key={i}>{ingredient}</li>
        ))}
      </ul>

      <hr />
      <h3>Steps:</h3>
      <ol>
        {steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      <hr />
      <button onClick={handleLike} disabled={loading || userHasLiked}>
        Like
      </button>
      <button onClick={handleUnlike} disabled={loading || !userHasLiked}>
        Unlike
      </button>
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
  initialLikes: PropTypes.number,
}