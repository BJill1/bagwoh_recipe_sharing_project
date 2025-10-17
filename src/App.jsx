import { CreateRecipe } from './components/CreateRecipe.jsx'
import { RecipeFilter } from './components/RecipeFilter.jsx'
import { RecipeSorting } from './components/RecipeSorting.jsx'
import { RecipeList } from './components/RecipeList.jsx'
const recipes = [
  {
    title: 'Boiled egg',
    author: "Jill Bagwoh",
    ingredients: ['water', 'egg'],
    steps: ['Put some egg in water', 'Boil for 0 minutes']
  },
  { 
    title: 'Boiled rice',
    author: "Iliasu Ndimo",
    ingredients: ['water', 'rice'],
    steps: ['Put some egg in water', 'Boil for 30 minutes']
   },
]
export function App() {
  return (
    <div style={{ padding: 8 }}>
      <CreateRecipe />
      <br />
      <hr />
      Filter by:
      <RecipeFilter field='author' />
      <br />
      <RecipeSorting fields={['createdAt', 'updatedAt']} />
      <hr />
      <RecipeList recipes={recipes} />
    </div>
  )
}

    
