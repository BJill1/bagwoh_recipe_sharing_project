import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { likeRecipe, unlikeRecipe, getLikeCount } from '/workspaces/bagwoh_recipe_sharing_project/src/api/likes.js'
import { useState } from 'react'

export function Recipe({
  id,
  title,
  author,
  ingredients,
  steps,
  imageUrl,
  initialLikes = 0,
}) {
  const queryClient = useQueryClient()
  const [likes, setLikes] = useState(initialLikes)
  const [loading, setLoading] = useState(false)

  // Mutation for liking a recipe
  const likeMutation = useMutation({
    mutationFn: (token) => likeRecipe(token, id),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setLikes((prev) => prev + 1)
      setLoading(false)
      // Optionally refetch recipe list if needed
      queryClient.invalidateQueries(['recipes'])
    },
    onError: () => setLoading(false),
  })

  // Mutation for unliking a recipe
  const unlikeMutation = useMutation({
    mutationFn: (token) => unlikeRecipe(token, id),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setLikes((prev) => Math.max(prev - 1, 0))
      setLoading(false)
      queryClient.invalidateQueries(['recipes'])
    },
    onError: () => setLoading(false),
  })

  // Replace with your auth token retrieval
  const token = localStorage.getItem('authToken')

  const handleLike = () => {
    if (!token) return alert('You must be logged in to like a recipe.')
    likeMutation.mutate(token)
  }

  const handleUnlike = () => {
    if (!token) return alert('You must be logged in to unlike a recipe.')
    unlikeMutation.mutate(token)
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
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <hr />

      <h3>Steps:</h3>
      <ol>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      <hr />

      <button onClick={handleLike} disabled={loading}>
        Like
      </button>
      <button onClick={handleUnlike} disabled={loading}>
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