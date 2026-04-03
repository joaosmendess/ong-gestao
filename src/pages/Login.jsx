import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)

  // Redireciona se já autenticado
  if (isAuthenticated) {
    navigate('/dashboard')
    return null
  }

  function validate() {
    const errs = {}
    if (!form.email.trim()) {
      errs.email = 'E-mail é obrigatório.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Formato de e-mail inválido.'
    }
    if (!form.password.trim()) {
      errs.password = 'Senha é obrigatória.'
    } else if (form.password.length < 6) {
      errs.password = 'Senha deve ter pelo menos 6 caracteres.'
    }
    return errs
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    setLoginError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setLoading(true)
    // Simula pequeno delay (boa UX para indicar processamento)
    setTimeout(() => {
      const ok = login(form.email, form.password)
      if (ok) {
        navigate('/dashboard')
      } else {
        setLoginError('E-mail ou senha incorretos.')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="login-logo">🤝</span>
          <h1>GestãoSolidária</h1>
          <p>Sistema de Gestão para ONGs</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@ong.com"
              className={errors.email ? 'input-error' : ''}
              autoComplete="email"
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={errors.password ? 'input-error' : ''}
              autoComplete="current-password"
            />
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>

          {loginError && (
            <div className="alert alert-error">{loginError}</div>
          )}

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="login-hint">
          Acesso demo: <strong>admin@ong.com</strong> / <strong>admin123</strong>
        </p>
      </div>
    </div>
  )
}
