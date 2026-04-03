import { createContext, useContext, useState } from 'react'

// Credenciais fixas para fins acadêmicos
// Em produção: usar hash bcrypt + JWT via backend
const CREDENTIALS = {
  email: 'admin@ong.com',
  password: 'admin123',
}

const SESSION_KEY = 'ong_session'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem(SESSION_KEY)
  )

  function login(email, password) {
    // Validação básica de entrada
    if (!email || !password) return false

    // Sanitização: trim nos valores antes de comparar
    const cleanEmail = email.trim().toLowerCase()
    const cleanPassword = password.trim()

    if (cleanEmail === CREDENTIALS.email && cleanPassword === CREDENTIALS.password) {
      // Token simples com timestamp para simular sessão
      const token = btoa(`${cleanEmail}:${Date.now()}`)
      localStorage.setItem(SESSION_KEY, token)
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
