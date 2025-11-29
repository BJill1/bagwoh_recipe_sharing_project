import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { useState, useEffect } from 'react'
import { likeRecipe, unlikeRecipe, getLikeCount, getUserLikedRecipe } from '../api/likes.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export function Recipe({
  id,
  title,
  author,
  ingredients,
  steps,
  imageUrl,
}) {
  const [likes, setLikes] = useState(0)
  const [userHasLiked, setUserHasLiked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [token] = useAuth()

  // Fetch initial likes and user like status
  useEffect(() => {
    if (!id) return  // safety: do nothing if id is missing

    async function fetchLikes() {
      try {
        const data = await getLikeCount(id)
        setLikes(Number(data.likes) || 0)

        if (token) {
          const userLiked = await getUserLikedRecipe(token, id)
          setUserHasLiked(userLiked)
        }
      } catch (err) {
        console.error('Failed to fetch likes:', err)
      }
    }

    fetchLikes()
  }, [id, token])

  const handleLike = async () => {
    if (!id) return alert('Recipe ID missing.')
    if (!token) return alert('You must be logged in to like a recipe.')

    setLoading(true)
    try {
      await likeRecipe(token, id)
      const updated = await getLikeCount(id)
      setLikes(Number(updated.likes) || 0)
      setUserHasLiked(true)
    } catch (err) {
      console.error('Like failed:', err)
      alert(err.message || 'Failed to like recipe.')
    } finally {
      setLoading(false)
    }
  }

  const handleUnlike = async () => {
    if (!id) return alert('Recipe ID missing.')
    if (!token) return alert('You must be logged in to unlike a recipe.')

    setLoading(true)
    try {
      await unlikeRecipe(token, id)
      const updated = await getLikeCount(id)
      setLikes(Number(updated.likes) || 0)
      setUserHasLiked(false)
    } catch (err) {
      console.error('Unlike failed:', err)
      alert(err.message || 'Failed to unlike recipe.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
      {imageUrl && <img src={imageUrl} alt={title} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} onError={(e) => (e.target.style.display = 'none')} />}
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
  id: PropTypes.string, // optional for safety
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageUrl: PropTypes.string,
}

