import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createRecipe } from '../api/getRecipes.js'
import { Recipe } from './Recipe.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'

export function CreateRecipe() {
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [steps, setSteps] = useState([])
  const [ingredientInput, setIngredientInput] = useState('')
  const [stepInput, setStepInput] = useState('')
  const [createdRecipe, setCreatedRecipe] = useState(null)

  const [token] = useAuth()

  const createRecipeMutation = useMutation({
    mutationFn: () => createRecipe(token, { title, imageUrl, ingredients, steps }),
    onSuccess: (data) => {
      setCreatedRecipe(data)
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
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" required />
        
        <div>
          <input type="text" value={ingredientInput} onChange={(e) => setIngredientInput(e.target.value)} placeholder="Add ingredient" />
          <button type="button" onClick={handleAddIngredient}>Add</button>
          <ul>{ingredients.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
        </div>

        <div>
          <input type="text" value={stepInput} onChange={(e) => setStepInput(e.target.value)} placeholder="Add step" />
          <button type="button" onClick={handleAddStep}>Add</button>
          <ol>{steps.map((s, idx) => <li key={idx}>{s}</li>)}</ol>
        </div>

        <button type="submit" disabled={createRecipeMutation.isLoading}>
          {createRecipeMutation.isLoading ? 'Creating...' : 'Create Recipe'}
        </button>
      </form>

      {createdRecipe && <Recipe {...createdRecipe} token={token} />}
    </div>
  )
}