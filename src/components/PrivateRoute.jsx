import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Proteção de rotas: redireciona para login se não autenticado
export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
