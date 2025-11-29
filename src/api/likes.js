const BASE_URL = import.meta.env.VITE_BACKEND_URL

// Like a recipe
export const likeRecipe = async (token, recipeId) => {
  const res = await fetch(`${BASE_URL}/recipes/${recipeId}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    const errData = await res.json()
    throw new Error(errData.message || 'Failed to like recipe')
  }

  // The backend now returns the updated likes count directly
  const data = await res.json()
  return { likes: Number(data.likes) || 0 }
}

// Unlike a recipe
export const unlikeRecipe = async (token, recipeId) => {
  const res = await fetch(`${BASE_URL}/recipes/${recipeId}/unlike`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    const errData = await res.json()
    throw new Error(errData.message || 'Failed to unlike recipe')
  }

  const data = await res.json()
  return { likes: Number(data.likes) || 0 }
}

// Get total like count for a recipe
export const getLikeCount = async (recipeId) => {
  const res = await fetch(`${BASE_URL}/recipes/${recipeId}/likes`)
  if (!res.ok) {
    const errData = await res.json()
    throw new Error(errData.message || 'Failed to get like count')
  }
  const data = await res.json()
  return Number(data.likes) || 0
}
