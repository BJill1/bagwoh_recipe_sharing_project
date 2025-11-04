import { useMutation } from '@tanstack/react-query'
import { createRecipe } from '../api/getRecipes.js'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

export function CreateRecipe() {
  const [imageUrl, setImageUrl] = useState('')
  const [title, setTitle] = useState('')
  const [token] = useAuth()
  const [ingredients, setIngredients] = useState([])
  const [steps, setSteps] = useState([])
  const [ingredientInput, setIngredientInput] = useState('')
  const [stepInput, setStepInput] = useState('')

  // ✅ Local state to hold the created recipe
  const [createdRecipe, setCreatedRecipe] = useState(null)

  // ✅ Setup mutation with success handler
  const createRecipeMutation = useMutation({
    mutationFn: () => createRecipe(token, { title, imageUrl, ingredients, steps }),
    onSuccess: (data) => {
      // Save the returned recipe in state to display below
      setCreatedRecipe(data)
      // Clear the form
      setTitle('')
      setImageUrl('')
      setIngredients([])
      setSteps([])
    },
  })

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setIngredients([...ingredients, ingredientInput.trim()])
      setIngredientInput('')
    }
  }

  const handleAddStep = () => {
    if (stepInput.trim()) {
      setSteps([...steps, stepInput.trim()])
      setStepInput('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createRecipeMutation.mutate()
  }

  if (!token) return <div>Please log in to create new posts.</div>

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <h2>Create a New Recipe</h2>

        <div>
          <label htmlFor='create-title'>Title:</label>
          <input
            type='text'
            id='create-title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter recipe title'
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor='create-image'>Image URL:</label>
          <input
            type='text'
            id='create-image'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder='Paste image URL'
            required
          />
        </div>

        {/* ✅ Show preview before submission */}
        {imageUrl && (
          <div style={{ marginTop: '10px' }}>
            <img
              src={imageUrl}
              alt='Recipe preview'
              style={{ width: '100%', borderRadius: '8px' }}
              onError={(e) => (e.target.style.display = 'none')}
            />
          </div>
        )}

        <br />

        <div>
          <label>Ingredients:</label>
          <input
            type='text'
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            placeholder='Add ingredient'
          />
          <button type='button' onClick={handleAddIngredient}>
            Add
          </button>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <label>Steps:</label>
          <input
            type='text'
            value={stepInput}
            onChange={(e) => setStepInput(e.target.value)}
            placeholder='Add step'
          />
          <button type='button' onClick={handleAddStep}>
            Add
          </button>
          <ol>
            {steps.map((s, index) => (
              <li key={index}>{s}</li>
            ))}
          </ol>
        </div>

        <br />
        <input
          type='submit'
          value={createRecipeMutation.isPending ? 'Creating...' : 'Create Recipe'}
          disabled={!title || createRecipeMutation.isPending}
        />

        {createRecipeMutation.isError && (
          <p style={{ color: 'red' }}>Error creating recipe. Please try again.</p>
        )}
      </form>

      {/* ✅ Display the created recipe immediately below */}
      {createdRecipe && (
        <div
          style={{
            marginTop: '30px',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
        >
          <h3>{createdRecipe.title}</h3>
          {createdRecipe.imageUrl && (
            <img
              src={createdRecipe.imageUrl}
              alt={createdRecipe.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
          )}
          <h4>Ingredients:</h4>
          <ul>
            {createdRecipe.ingredients.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>

          <h4>Steps:</h4>
          <ol>
            {createdRecipe.steps.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
