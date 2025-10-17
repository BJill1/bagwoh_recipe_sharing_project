import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Recipe } from './Recipe_post.jsx'
export function RecipeList({ recipes = [] }) {
  return (
    <div>
      {recipes.map((recipe) => (
       <Fragment key={recipe._id}>
          <Recipe {...recipe} />
          <hr color = "blue" size = "4"/>
        </Fragment>
      ))}
    </div>
  )
}
RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape(Recipe.propTypes)).isRequired,
}
