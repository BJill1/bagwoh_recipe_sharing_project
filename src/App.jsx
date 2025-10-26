import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecipeApp } from './pages/RecipeApp.jsx'
import { Signup } from './pages/Signup.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { Login } from './pages/Login.jsx'
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
  {
    path: '/login',
    element: <Login />,
  },


])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
