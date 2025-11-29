import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { Recipe } from './Recipe.jsx'

export function RecipeList({ recipes = [], token }) {
  return (
    <div>
      {recipes.map((recipe) => (
        <Fragment key={recipe._id}>
          <Recipe {...recipe} id={recipe._id} token={token} />
          <hr color="blue" size="4" />
        </Fragment>
      ))}
    </div>
  )
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  token: PropTypes.string,
}