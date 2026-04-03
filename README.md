# 🤝 GestãoSolidária

Sistema web para gerenciamento de ONGs — substitui controles em papel e planilhas por uma solução digital simples, funcional e segura.

> Projeto Integrador — Faculdade | React + Vite + LocalStorage

---

## Sobre o Projeto

O **GestãoSolidária** foi desenvolvido para resolver um problema real de muitas ONGs: a falta de organização digital no controle de doadores, voluntários e doações. Com uma interface limpa e intuitiva, qualquer colaborador consegue usar o sistema sem treinamento técnico.

### Funcionalidades

- **Login seguro** com validação e proteção de sessão
- **Dashboard** com contadores em tempo real
- **Doadores** — cadastro e listagem com nome, e-mail, telefone e cidade
- **Voluntários** — cadastro com área de atuação
- **Doações** — registro por tipo (dinheiro, alimentos, roupas etc.) com valor/quantidade
- **Proteção de rotas** — nenhuma página acessível sem autenticação

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18 | Interface do usuário |
| Vite | 5 | Build tool e servidor de desenvolvimento |
| React Router | v6 | Navegação entre páginas (SPA) |
| LocalStorage API | — | Persistência de dados no navegador |
| CSS puro | — | Estilização sem dependências externas |

---

## Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org) v18 ou superior

### Instalação

```bash
# Clone o repositório
git clone https://github.com/joaosmendess/ong-gestao.git

# Entre na pasta
cd ong-gestao

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: **http://localhost:5173**

### Credenciais de acesso

| Campo | Valor |
|---|---|
| E-mail | `admin@ong.com` |
| Senha | `admin123` |

---

## Estrutura de Pastas

```
ong-gestao/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx                # Bootstrap da aplicação
│   ├── App.jsx                 # Rotas principais
│   ├── index.css               # Estilos globais
│   ├── context/
│   │   └── AuthContext.jsx     # Autenticação global (login/logout/sessão)
│   ├── utils/
│   │   └── storage.js          # Abstração do LocalStorage
│   ├── components/
│   │   ├── Layout.jsx          # Estrutura sidebar + conteúdo
│   │   ├── Sidebar.jsx         # Navegação lateral
│   │   └── PrivateRoute.jsx    # Proteção de rotas privadas
│   └── pages/
│       ├── Login.jsx           # Tela de login
│       ├── Dashboard.jsx       # Painel com estatísticas
│       ├── Doadores.jsx        # CRUD de doadores
│       ├── Voluntarios.jsx     # CRUD de voluntários
│       └── Doacoes.jsx         # CRUD de doações
├── SEGURANCA.md                # Documentação de segurança
├── TESTES.md                   # Plano de testes (31 cenários)
└── APRESENTACAO.md             # Roteiro de apresentação acadêmica
```

---

## Segurança

- Autenticação com token de sessão via localStorage
- Proteção de rotas — redirecionamento automático para login
- Validação de todos os campos nos formulários (regex, tamanho mínimo, obrigatoriedade)
- Sanitização de inputs com `.trim()` e `.toLowerCase()`
- Confirmação antes de remover qualquer registro

Detalhes completos em [SEGURANCA.md](SEGURANCA.md).

---

## Testes

Foram definidos **31 cenários de testes manuais** cobrindo:

- Login válido, inválido, campos vazios
- Proteção de rotas sem autenticação
- Validação de formulários com dados inválidos
- Persistência de dados após recarregamento
- Usabilidade e feedback visual

Plano completo em [TESTES.md](TESTES.md).

---

## Apresentação

Roteiro completo de 10–15 minutos com falas sugeridas, demo passo a passo e respostas para possíveis perguntas em [APRESENTACAO.md](APRESENTACAO.md).

---

## Telas do Sistema

| Rota | Tela |
|---|---|
| `/login` | Autenticação com validação de campos |
| `/dashboard` | Visão geral com contadores |
| `/doadores` | Cadastro e listagem de doadores |
| `/voluntarios` | Cadastro e listagem de voluntários |
| `/doacoes` | Registro e listagem de doações |
