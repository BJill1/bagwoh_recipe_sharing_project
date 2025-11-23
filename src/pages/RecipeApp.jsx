import { CreateRecipe } from '../components/CreateRecipe.jsx'
import { RecipeFilter } from '../components/RecipeFilter.jsx'
import { RecipeSorting } from '../components/RecipeSorting.jsx'
import { RecipeList } from '../components/RecipeList.jsx'
import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '../api/getRecipes.js'
import { useState } from 'react'
import { Header } from '../components/Header.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'

export function RecipeApp() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')
  const [token] = useAuth()
  const recipesQuery = useQuery({
    queryKey: ['recipes', { author, sortBy, sortOrder }],
    queryFn: () => getRecipes({ author, sortBy, sortOrder }),
  })
  const recipes = recipesQuery.data ?? []

  return (
    <div style={{ padding: 8 }}>
      <br />
      <h2>Welcome to my Recipe-Sharing App!</h2>
      <br />
      <Header />
      <br />
      <hr />
      <CreateRecipe />
      <br />
      <hr />
      Filter by:
      <RecipeFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <RecipeSorting
        fields={['createdAt', 'updatedAt', 'likes']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <RecipeList recipes={recipes} token={token} />
    </div>
  )
}
