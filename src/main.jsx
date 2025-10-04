import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Layout from './Layout.jsx'
import App from './App.jsx'
import Authentication from './pages/Authentication.jsx'
import ManagePortfolio from './pages/ManagePortfolio.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,  
    children: [
      {
        index: true, 
        element: <App />
      },
      {
        path: 'login',
        element: <Authentication />
      },
      {
        path: 'manage-portfolio',
        element: (
          <ProtectedRoute>
            <ManagePortfolio />
          </ProtectedRoute>
        ),
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)