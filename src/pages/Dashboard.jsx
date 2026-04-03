import { storage } from '../utils/storage.js'

export default function Dashboard() {
  const totalDoadores = storage.count('doadores')
  const totalVoluntarios = storage.count('voluntarios')
  const totalDoacoes = storage.count('doacoes')

  const doacoes = storage.getAll('doacoes')
  const totalEmDinheiro = doacoes
    .filter((d) => d.tipo === 'Dinheiro')
    .reduce((acc, d) => acc + (parseFloat(d.valor) || 0), 0)

  const cards = [
    {
      label: 'Total de Doadores',
      value: totalDoadores,
      icon: '❤️',
      color: 'card-red',
      desc: 'pessoas cadastradas',
    },
    {
      label: 'Total de Voluntários',
      value: totalVoluntarios,
      icon: '🙌',
      color: 'card-blue',
      desc: 'voluntários ativos',
    },
    {
      label: 'Total de Doações',
      value: totalDoacoes,
      icon: '🎁',
      color: 'card-green',
      desc: 'registros de doação',
    },
    {
      label: 'Doações em Dinheiro',
      value: `R$ ${totalEmDinheiro.toFixed(2)}`,
      icon: '💰',
      color: 'card-yellow',
      desc: 'valor arrecadado',
    },
  ]

  const ultimasDoacoes = [...doacoes]
    .sort((a, b) => parseInt(b.id) - parseInt(a.id))
    .slice(0, 5)

  return (
    <div className="page">
      <div className="page-header">
        <h2>Dashboard</h2>
        <p className="page-subtitle">Visão geral do sistema</p>
      </div>

      <div className="cards-grid">
        {cards.map((card) => (
          <div key={card.label} className={`stat-card ${card.color}`}>
            <div className="stat-icon">{card.icon}</div>
            <div className="stat-info">
              <span className="stat-value">{card.value}</span>
              <span className="stat-label">{card.label}</span>
              <span className="stat-desc">{card.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <h3>Últimas Doações Registradas</h3>
        {ultimasDoacoes.length === 0 ? (
          <p className="empty-state">Nenhuma doação registrada ainda.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Doador</th>
                <th>Tipo</th>
                <th>Valor / Qtd.</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {ultimasDoacoes.map((d) => (
                <tr key={d.id}>
                  <td>{d.doador}</td>
                  <td>
                    <span className="badge">{d.tipo}</span>
                  </td>
                  <td>{d.tipo === 'Dinheiro' ? `R$ ${parseFloat(d.valor).toFixed(2)}` : d.valor}</td>
                  <td>{d.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
