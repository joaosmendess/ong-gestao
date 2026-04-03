// Camada de abstração para localStorage
// Facilita troca futura por API real

const KEYS = {
  doadores: 'ong_doadores',
  voluntarios: 'ong_voluntarios',
  doacoes: 'ong_doacoes',
}

function getAll(resource) {
  try {
    const raw = localStorage.getItem(KEYS[resource])
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function save(resource, data) {
  localStorage.setItem(KEYS[resource], JSON.stringify(data))
}

function add(resource, item) {
  const items = getAll(resource)
  const newItem = {
    ...item,
    id: Date.now().toString(),
    criadoEm: new Date().toLocaleDateString('pt-BR'),
  }
  items.push(newItem)
  save(resource, items)
  return newItem
}

function remove(resource, id) {
  const items = getAll(resource).filter((i) => i.id !== id)
  save(resource, items)
}

function count(resource) {
  return getAll(resource).length
}

export const storage = { getAll, add, remove, count }
