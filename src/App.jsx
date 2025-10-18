import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecipeApp } from './RecipeApp.jsx'
const queryClient = new QueryClient()
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecipeApp />
    </QueryClientProvider>
  )
}
