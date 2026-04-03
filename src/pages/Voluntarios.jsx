import { useState } from 'react'
import { storage } from '../utils/storage.js'

const AREAS = ['Educação', 'Saúde', 'Assistência Social', 'Tecnologia', 'Comunicação', 'Outro']
const EMPTY_FORM = { nome: '', email: '', telefone: '', area: '' }

function validate(form) {
  const errs = {}
  if (!form.nome.trim()) errs.nome = 'Nome é obrigatório.'
  else if (form.nome.trim().length < 3) errs.nome = 'Nome deve ter ao menos 3 caracteres.'

  if (!form.email.trim()) errs.email = 'E-mail é obrigatório.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'E-mail inválido.'

  if (!form.telefone.trim()) errs.telefone = 'Telefone é obrigatório.'
  else if (!/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(form.telefone.replace(/\s/g, '')))
    errs.telefone = 'Telefone inválido. Ex: (11) 99999-9999'

  if (!form.area) errs.area = 'Selecione uma área de atuação.'

  return errs
}

export default function Voluntarios() {
  const [voluntarios, setVoluntarios] = useState(() => storage.getAll('voluntarios'))
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    storage.add('voluntarios', form)
    setVoluntarios(storage.getAll('voluntarios'))
    setForm(EMPTY_FORM)
    setErrors({})
    setSuccess('Voluntário cadastrado com sucesso!')
    setTimeout(() => setSuccess(''), 3000)
  }

  function handleDelete(id) {
    if (!window.confirm('Deseja remover este voluntário?')) return
    storage.remove('voluntarios', id)
    setVoluntarios(storage.getAll('voluntarios'))
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2>🙌 Voluntários</h2>
        <p className="page-subtitle">Cadastro e listagem de voluntários</p>
      </div>

      <div className="content-grid">
        {/* Formulário */}
        <div className="card">
          <h3>Novo Voluntário</h3>
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>Nome completo *</label>
              <input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Ex: João Souza"
                className={errors.nome ? 'input-error' : ''}
              />
              {errors.nome && <span className="error-msg">{errors.nome}</span>}
            </div>

            <div className="form-group">
              <label>E-mail *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Ex: joao@email.com"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Telefone *</label>
              <input
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                placeholder="Ex: (11) 99999-9999"
                className={errors.telefone ? 'input-error' : ''}
              />
              {errors.telefone && <span className="error-msg">{errors.telefone}</span>}
            </div>

            <div className="form-group">
              <label>Área de atuação *</label>
              <select
                name="area"
                value={form.area}
                onChange={handleChange}
                className={errors.area ? 'input-error' : ''}
              >
                <option value="">Selecione...</option>
                {AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
              {errors.area && <span className="error-msg">{errors.area}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Cadastrar Voluntário
            </button>
          </form>
        </div>

        {/* Lista */}
        <div className="card">
          <h3>Voluntários Cadastrados ({voluntarios.length})</h3>
          {voluntarios.length === 0 ? (
            <p className="empty-state">Nenhum voluntário cadastrado ainda.</p>
          ) : (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Área</th>
                    <th>Cadastro</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {voluntarios.map((v) => (
                    <tr key={v.id}>
                      <td>{v.nome}</td>
                      <td>{v.email}</td>
                      <td>{v.telefone}</td>
                      <td>
                        <span className="badge badge-blue">{v.area}</span>
                      </td>
                      <td>{v.criadoEm}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(v.id)}
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
