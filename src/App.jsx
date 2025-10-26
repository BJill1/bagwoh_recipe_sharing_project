import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecipeApp } from './pages/RecipeApp.jsx'
import { Signup } from './pages/Signup.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: '/',
    element: <RecipeApp />,
  },
    {
    path: '/signup',
    element: <Signup />,
  },

])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
