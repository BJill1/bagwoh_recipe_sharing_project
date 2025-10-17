
import PropTypes from 'prop-types'
export function Recipe({ title, author, ingredients, steps }) {
  return (
    <div>
      <h2>{title}</h2>
      <p><strong>Author:</strong> {author}</p>
      <hr/>

      <h3>Ingredients:</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <hr/>

      <h3>Steps:</h3>
      <ol>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

// PropTypes for validation
Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
};