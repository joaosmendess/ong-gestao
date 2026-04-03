import { useState } from 'react'
import { storage } from '../utils/storage.js'

const TIPOS = ['Alimentos', 'Roupas', 'Dinheiro', 'Materiais Escolares', 'Medicamentos', 'Outro']

const hoje = new Date().toISOString().split('T')[0]
const EMPTY_FORM = { doador: '', tipo: '', valor: '', data: hoje, observacao: '' }

function validate(form) {
  const errs = {}
  if (!form.doador.trim()) errs.doador = 'Nome do doador é obrigatório.'
  else if (form.doador.trim().length < 3) errs.doador = 'Nome deve ter ao menos 3 caracteres.'

  if (!form.tipo) errs.tipo = 'Selecione o tipo de doação.'

  if (!form.valor.trim()) {
    errs.valor = 'Informe o valor ou quantidade.'
  } else if (form.tipo === 'Dinheiro') {
    const num = parseFloat(form.valor.replace(',', '.'))
    if (isNaN(num) || num <= 0) errs.valor = 'Informe um valor monetário válido.'
  }

  if (!form.data) errs.data = 'Data é obrigatória.'

  return errs
}

export default function Doacoes() {
  const [doacoes, setDoacoes] = useState(() => storage.getAll('doacoes'))
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

    // Formata data para exibição
    const [ano, mes, dia] = form.data.split('-')
    const dataFormatada = `${dia}/${mes}/${ano}`

    storage.add('doacoes', {
      ...form,
      valor: form.tipo === 'Dinheiro' ? parseFloat(form.valor.replace(',', '.')).toFixed(2) : form.valor,
      data: dataFormatada,
    })
    setDoacoes(storage.getAll('doacoes'))
    setForm({ ...EMPTY_FORM, data: hoje })
    setErrors({})
    setSuccess('Doação registrada com sucesso!')
    setTimeout(() => setSuccess(''), 3000)
  }

  function handleDelete(id) {
    if (!window.confirm('Deseja remover este registro de doação?')) return
    storage.remove('doacoes', id)
    setDoacoes(storage.getAll('doacoes'))
  }

  const isDinheiro = form.tipo === 'Dinheiro'

  return (
    <div className="page">
      <div className="page-header">
        <h2>🎁 Doações</h2>
        <p className="page-subtitle">Registro e listagem de doações recebidas</p>
      </div>

      <div className="content-grid">
        {/* Formulário */}
        <div className="card">
          <h3>Nova Doação</h3>
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>Nome do doador *</label>
              <input
                name="doador"
                value={form.doador}
                onChange={handleChange}
                placeholder="Ex: Carlos Oliveira"
                className={errors.doador ? 'input-error' : ''}
              />
              {errors.doador && <span className="error-msg">{errors.doador}</span>}
            </div>

            <div className="form-group">
              <label>Tipo de doação *</label>
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className={errors.tipo ? 'input-error' : ''}
              >
                <option value="">Selecione...</option>
                {TIPOS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.tipo && <span className="error-msg">{errors.tipo}</span>}
            </div>

            <div className="form-group">
              <label>{isDinheiro ? 'Valor (R$) *' : 'Quantidade / Descrição *'}</label>
              <input
                name="valor"
                value={form.valor}
                onChange={handleChange}
                placeholder={isDinheiro ? 'Ex: 150.00' : 'Ex: 10 kg de arroz'}
                className={errors.valor ? 'input-error' : ''}
              />
              {errors.valor && <span className="error-msg">{errors.valor}</span>}
            </div>

            <div className="form-group">
              <label>Data *</label>
              <input
                type="date"
                name="data"
                value={form.data}
                onChange={handleChange}
                className={errors.data ? 'input-error' : ''}
              />
              {errors.data && <span className="error-msg">{errors.data}</span>}
            </div>

            <div className="form-group">
              <label>Observação (opcional)</label>
              <textarea
                name="observacao"
                value={form.observacao}
                onChange={handleChange}
                placeholder="Informações adicionais sobre a doação..."
                rows={3}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Registrar Doação
            </button>
          </form>
        </div>

        {/* Lista */}
        <div className="card">
          <h3>Doações Registradas ({doacoes.length})</h3>
          {doacoes.length === 0 ? (
            <p className="empty-state">Nenhuma doação registrada ainda.</p>
          ) : (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Doador</th>
                    <th>Tipo</th>
                    <th>Valor / Qtd.</th>
                    <th>Data</th>
                    <th>Obs.</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {[...doacoes].reverse().map((d) => (
                    <tr key={d.id}>
                      <td>{d.doador}</td>
                      <td>
                        <span className="badge">{d.tipo}</span>
                      </td>
                      <td>
                        {d.tipo === 'Dinheiro' ? `R$ ${parseFloat(d.valor).toFixed(2)}` : d.valor}
                      </td>
                      <td>{d.data}</td>
                      <td className="td-obs">{d.observacao || '—'}</td>
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
