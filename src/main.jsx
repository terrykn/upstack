import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Layout from './Layout.jsx'
import App from './App.jsx'
import Authentication from './pages/Authentication.jsx'
import ManagePortfolio from './pages/ManagePortfolio.jsx'

const hostname = window.location.hostname;
const hasSubdomain = hostname.split(".").length > 2;

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
        element: hasSubdomain ? <Navigate to="/" /> : <Authentication />
      },
      {
        path: 'manage-portfolio',
        element: hasSubdomain ? (
          <Navigate to="/" />
        ) : (
          <ProtectedRoute>
            <ManagePortfolio />
          </ProtectedRoute>
        ),
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);