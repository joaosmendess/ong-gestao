import { useState } from 'react'
import { storage } from '../utils/storage.js'

const EMPTY_FORM = { nome: '', email: '', telefone: '', cidade: '' }

function validate(form) {
  const errs = {}
  if (!form.nome.trim()) errs.nome = 'Nome é obrigatório.'
  else if (form.nome.trim().length < 3) errs.nome = 'Nome deve ter ao menos 3 caracteres.'

  if (!form.email.trim()) errs.email = 'E-mail é obrigatório.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'E-mail inválido.'

  if (!form.telefone.trim()) errs.telefone = 'Telefone é obrigatório.'
  else if (!/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(form.telefone.replace(/\s/g, '')))
    errs.telefone = 'Telefone inválido. Ex: (11) 99999-9999'

  if (!form.cidade.trim()) errs.cidade = 'Cidade é obrigatória.'

  return errs
}

export default function Doadores() {
  const [doadores, setDoadores] = useState(() => storage.getAll('doadores'))
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
    storage.add('doadores', form)
    setDoadores(storage.getAll('doadores'))
    setForm(EMPTY_FORM)
    setErrors({})
    setSuccess('Doador cadastrado com sucesso!')
    setTimeout(() => setSuccess(''), 3000)
  }

  function handleDelete(id) {
    if (!window.confirm('Deseja remover este doador?')) return
    storage.remove('doadores', id)
    setDoadores(storage.getAll('doadores'))
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2>❤️ Doadores</h2>
        <p className="page-subtitle">Cadastro e listagem de doadores</p>
      </div>

      <div className="content-grid">
        {/* Formulário */}
        <div className="card">
          <h3>Novo Doador</h3>
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>Nome completo *</label>
              <input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Ex: Maria da Silva"
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
                placeholder="Ex: maria@email.com"
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
              <label>Cidade *</label>
              <input
                name="cidade"
                value={form.cidade}
                onChange={handleChange}
                placeholder="Ex: São Paulo"
                className={errors.cidade ? 'input-error' : ''}
              />
              {errors.cidade && <span className="error-msg">{errors.cidade}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Cadastrar Doador
            </button>
          </form>
        </div>

        {/* Lista */}
        <div className="card">
          <h3>Doadores Cadastrados ({doadores.length})</h3>
          {doadores.length === 0 ? (
            <p className="empty-state">Nenhum doador cadastrado ainda.</p>
          ) : (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Cidade</th>
                    <th>Cadastro</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {doadores.map((d) => (
                    <tr key={d.id}>
                      <td>{d.nome}</td>
                      <td>{d.email}</td>
                      <td>{d.telefone}</td>
                      <td>{d.cidade}</td>
                      <td>{d.criadoEm}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(d.id)}
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
