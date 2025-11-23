import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { Recipe } from './Recipe_post.jsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { likeRecipe, unlikeRecipe } from '../api/likes.js' // make sure these exist

export function RecipeList({ recipes = [], token }) {
  const queryClient = useQueryClient()

  // Mutation for liking
  const likeMutation = useMutation({
    mutationFn: ({ recipeId }) => likeRecipe(token, recipeId),
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
  })

  // Mutation for unliking
  const unlikeMutation = useMutation({
    mutationFn: ({ recipeId }) => unlikeRecipe(token, recipeId),
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
  })

  const handleLike = (recipeId) => {
    likeMutation.mutate({ recipeId })
  }

  const handleUnlike = (recipeId) => {
    unlikeMutation.mutate({ recipeId })
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <Fragment key={recipe._id}>
          <Recipe
            {...recipe}
            onLike={() => handleLike(recipe._id)}
            onUnlike={() => handleUnlike(recipe._id)}
            likeLoading={
              likeMutation.isLoading || unlikeMutation.isLoading
            }
          />
          <hr color="blue" size="4" />
        </Fragment>
      ))}
    </div>
  )
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape(Recipe.propTypes)).isRequired,
  token: PropTypes.string, // JWT token to pass to API
}