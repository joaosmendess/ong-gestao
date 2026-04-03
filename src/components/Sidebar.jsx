import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/doadores', label: 'Doadores', icon: '❤️' },
  { to: '/voluntarios', label: 'Voluntários', icon: '🙌' },
  { to: '/doacoes', label: 'Doações', icon: '🎁' },
]

export default function Sidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">🤝</span>
        <span className="logo-text">GestãoSolidária</span>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              'nav-link' + (isActive ? ' nav-link--active' : '')
            }
          >
            <span className="nav-icon">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="btn-logout" onClick={handleLogout}>
          🚪 Sair
        </button>
      </div>
    </aside>
  )
}
