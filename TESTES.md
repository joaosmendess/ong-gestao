# Plano de Testes — GestãoSolidária

Este documento descreve os testes aplicáveis ao sistema, organizados por tipo e por funcionalidade.

---

## 1. Testes Manuais (Funcionais)

São testes realizados manualmente, simulando o uso real do sistema.

### 1.1 Teste de Login

| # | Cenário                            | Entrada                            | Resultado Esperado                        | Status |
|---|------------------------------------|------------------------------------|-------------------------------------------|--------|
| 1 | Login com credenciais corretas     | admin@ong.com / admin123           | Redireciona para o Dashboard              | ✅ OK  |
| 2 | Login com senha errada             | admin@ong.com / senha_errada       | Exibe mensagem "E-mail ou senha incorretos" | ✅ OK  |
| 3 | Login com e-mail inexistente       | outro@email.com / admin123         | Exibe mensagem de erro                    | ✅ OK  |
| 4 | Login com campos vazios            | (sem preencher nada)               | Exibe erros em ambos os campos            | ✅ OK  |
| 5 | Login com e-mail em formato errado | "nao-e-email" / admin123           | Exibe "Formato de e-mail inválido"        | ✅ OK  |
| 6 | Login com senha < 6 caracteres     | admin@ong.com / 123                | Exibe erro de tamanho mínimo de senha     | ✅ OK  |

### 1.2 Teste de Proteção de Rotas

| # | Cenário                                       | Resultado Esperado               | Status |
|---|-----------------------------------------------|----------------------------------|--------|
| 7 | Acessar /dashboard sem estar logado           | Redireciona para /login          | ✅ OK  |
| 8 | Acessar /doadores sem estar logado            | Redireciona para /login          | ✅ OK  |
| 9 | Após logout, tentar voltar pelo botão "Voltar"| Permanece na tela de login       | ✅ OK  |

---

## 2. Testes de Formulário — Doadores

| # | Cenário                           | Entrada                          | Resultado Esperado                      |
|---|-----------------------------------|----------------------------------|-----------------------------------------|
| 10 | Cadastro válido                  | Todos os campos preenchidos      | Exibe sucesso e aparece na listagem     |
| 11 | Nome muito curto                 | Nome: "Jo"                       | Erro: "mínimo 3 caracteres"             |
| 12 | E-mail inválido                  | Email: "email-sem-arroba"        | Erro: "E-mail inválido"                 |
| 13 | Telefone inválido                | Telefone: "123"                  | Erro de formato de telefone             |
| 14 | Campos obrigatórios em branco    | (sem preencher nada)             | Todos os erros exibidos simultaneamente |
| 15 | Remoção de doador                | Clicar em "Remover" + confirmar  | Doador removido da listagem             |
| 16 | Cancelar remoção                 | Clicar em "Remover" + cancelar   | Doador permanece na listagem            |

---

## 3. Testes de Formulário — Voluntários

| # | Cenário                           | Entrada                           | Resultado Esperado                    |
|---|-----------------------------------|-----------------------------------|---------------------------------------|
| 17 | Cadastro válido                  | Todos os campos preenchidos       | Sucesso e aparece na listagem         |
| 18 | Área não selecionada             | Sem selecionar área               | Erro: "Selecione uma área"            |
| 19 | Cadastro e remoção               | Cadastra e depois remove          | Lista atualizada corretamente         |

---

## 4. Testes de Formulário — Doações

| # | Cenário                              | Entrada                                 | Resultado Esperado                           |
|---|--------------------------------------|-----------------------------------------|----------------------------------------------|
| 20 | Doação em dinheiro válida           | Tipo: Dinheiro, Valor: 150.00           | Registrada e exibida com "R$ 150,00"         |
| 21 | Doação em dinheiro com valor zero   | Tipo: Dinheiro, Valor: 0                | Erro: "valor monetário válido"               |
| 22 | Doação em dinheiro com texto        | Tipo: Dinheiro, Valor: "cem reais"      | Erro de validação                            |
| 23 | Doação de alimentos                 | Tipo: Alimentos, Qtd: "5 kg de arroz"  | Registrada normalmente                       |
| 24 | Tipo não selecionado                | (sem tipo)                              | Erro: "Selecione o tipo de doação"           |
| 25 | Dashboard atualiza após cadastro    | Cadastrar nova doação                   | Contador no Dashboard incrementa             |

---

## 5. Testes de Persistência de Dados

| # | Cenário                                     | Resultado Esperado                               |
|---|---------------------------------------------|--------------------------------------------------|
| 26 | Recarregar página após cadastros            | Dados permanecem (localStorage persistente)      |
| 27 | Fechar e reabrir o navegador                | Dados e sessão permanecem                        |
| 28 | Logout e novo login                         | Dados permanecem, sessão é renovada              |

---

## 6. Testes de Usabilidade

| # | Cenário                                     | Resultado Esperado                               |
|---|---------------------------------------------|--------------------------------------------------|
| 29 | Feedback após cadastro                      | Mensagem verde de sucesso aparece e desaparece   |
| 30 | Navegação entre páginas                     | Sidebar destaca a página ativa corretamente      |
| 31 | Listagem mostra doações em ordem inversa    | A mais recente aparece no topo                   |

---

## 7. Tipos de Testes Automatizados (Possíveis Extensões)

Se o projeto fosse expandido para incluir testes automatizados:

### Testes Unitários — com Vitest ou Jest
```js
// Exemplo: testar função de validação
import { describe, it, expect } from 'vitest'
import { validate } from '../pages/Doadores'

describe('Validação de Doadores', () => {
  it('deve retornar erro se nome estiver vazio', () => {
    const errs = validate({ nome: '', email: 'a@b.com', telefone: '(11)99999-9999', cidade: 'SP' })
    expect(errs.nome).toBeDefined()
  })

  it('não deve retornar erros com dados válidos', () => {
    const errs = validate({ nome: 'Maria', email: 'maria@email.com', telefone: '(11)99999-9999', cidade: 'SP' })
    expect(Object.keys(errs)).toHaveLength(0)
  })
})
```

### Testes de Integração — com React Testing Library
```jsx
// Exemplo: testar submissão do formulário de login
import { render, screen, fireEvent } from '@testing-library/react'
import Login from '../pages/Login'

test('exibe erro quando campos estão vazios', () => {
  render(<Login />)
  fireEvent.click(screen.getByText('Entrar'))
  expect(screen.getByText('E-mail é obrigatório.')).toBeInTheDocument()
})
```

### Testes E2E — com Playwright ou Cypress
```js
// Exemplo: fluxo completo de login
test('usuário faz login e vê o dashboard', async ({ page }) => {
  await page.goto('http://localhost:5173/login')
  await page.fill('[name=email]', 'admin@ong.com')
  await page.fill('[name=password]', 'admin123')
  await page.click('button[type=submit]')
  await expect(page).toHaveURL('/dashboard')
  await expect(page.locator('h2')).toContainText('Dashboard')
})
```

---

## Resumo para Apresentação

> "O sistema foi testado manualmente cobrindo 31 cenários: login válido e inválido, proteção de rotas, validação de formulários com diferentes tipos de dados, persistência após recarregamento e usabilidade geral. O projeto também está estruturado para receber testes automatizados unitários, de integração e E2E."
