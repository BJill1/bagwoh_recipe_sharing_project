import { useMutation } from '@tanstack/react-query'
import { createRecipe } from '../api/getRecipes.js'
import { useState } from 'react'
export function CreateRecipe() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [steps, setSteps] = useState([])
  const [ingredientInput, setIngredientInput] = useState('')
  const [stepInput, setStepInput] = useState('')
  const createRecipeMutation = useMutation({
    mutationFn: () => createRecipe({ title, author, ingredients, steps })
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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input 
        type='text' 
        name='create-title' 
        id='create-title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create_author'>Author: </label>
        <input 
        type='text' 
        name='create-author' 
        id='create_author'
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='create-ingredients'>Ingredients: </label>
        <input
          type='text'
          id='create-ingredients'
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
        />
        <button type='button' onClick={handleAddIngredient}>
          Add Ingredient
        </button>
        <ul>
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <label htmlFor='create-steps'>Recipe Steps: </label>
        <input
          type='text'
          id='create-steps'
          value={stepInput}
          onChange={(e) => setStepInput(e.target.value)}
        />
        <button type='button' onClick={handleAddStep}>
          Add Step
        </button>
        <ol>
          {steps.map((s, index) => (
            <li key={index}>{s}</li>
          ))}
        </ol>
      </div>
      <br />
      <br />
      <input 
      type='submit' 
      value={createRecipeMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title || createRecipeMutation.isPending}
      />
      {createRecipeMutation.isSuccess ? (
        <>
          <br />
          Recipe created successfully!
        </>
      ) : null}
    </form>
  )
}
