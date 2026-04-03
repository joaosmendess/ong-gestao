import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Doadores from './pages/Doadores.jsx'
import Voluntarios from './pages/Voluntarios.jsx'
import Doacoes from './pages/Doacoes.jsx'
import Layout from './components/Layout.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="doadores" element={<Doadores />} />
        <Route path="voluntarios" element={<Voluntarios />} />
        <Route path="doacoes" element={<Doacoes />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
