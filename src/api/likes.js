export const likeRecipe = async (token, recipeId) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/recipes/${recipeId}/like`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return await res.json()
}

export const unlikeRecipe = async (token, recipeId) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/recipes/${recipeId}/unlike`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return await res.json()
}

export const getLikeCount = async (recipeId) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/recipes/${recipeId}/likes`,
  )

  return await res.json()
}