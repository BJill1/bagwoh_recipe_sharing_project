import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { useState } from 'react'
import { likeRecipe, unlikeRecipe } from '../api/likes.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export function Recipe({
  id,
  title,
  author,
  ingredients,
  steps,
  imageUrl,
  likes: initialLikes = 0, // get likes from backend directly
}) {
  const [likes, setLikes] = useState(Number(initialLikes) || 0)
  const [userHasLiked, setUserHasLiked] = useState(false) // initially false
  const [loading, setLoading] = useState(false)
  const [token] = useAuth()

  const handleLike = async () => {
    if (!token) return alert('You must be logged in to like a recipe.')
    try {
      setLoading(true)
      const res = await likeRecipe(token, id)
      setLikes(res.likes)
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
      const res = await unlikeRecipe(token, id)
      setLikes(res.likes)
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
  likes: PropTypes.number,
}

