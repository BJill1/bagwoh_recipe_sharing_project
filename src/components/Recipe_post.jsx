import PropTypes from 'prop-types'
import { User } from './User.jsx'

export function Recipe({ title, author, ingredients, steps, imageUrl }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
      
      {/* ✅ Display image if available */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }}
          onError={(e) => (e.target.style.display = 'none')} // hides broken images
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
    </div>
  )
}

// PropTypes for validation
Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageUrl: PropTypes.string, // ✅ add this
}