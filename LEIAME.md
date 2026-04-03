# GestãoSolidária — Sistema de Gestão para ONGs

Sistema web desenvolvido como Projeto Integrador para gerenciamento de doadores, voluntários e doações de uma ONG, substituindo controles manuais em papel ou planilhas.

## Tecnologias Utilizadas

| Tecnologia        | Função                          |
|-------------------|---------------------------------|
| React 18          | Interface do usuário            |
| Vite 5            | Build tool / servidor de dev    |
| React Router v6   | Navegação entre páginas (SPA)   |
| LocalStorage API  | Persistência de dados no browser|
| CSS puro          | Estilização sem dependências    |

## Estrutura de Pastas

```
ong-gestao/
├── index.html                  # Entrada HTML
├── vite.config.js              # Configuração do Vite
├── package.json                # Dependências
├── src/
│   ├── main.jsx                # Bootstrap da aplicação
│   ├── App.jsx                 # Roteamento principal
│   ├── index.css               # Estilos globais
│   ├── context/
│   │   └── AuthContext.jsx     # Estado de autenticação global
│   ├── utils/
│   │   └── storage.js          # Abstração do LocalStorage
│   ├── components/
│   │   ├── Layout.jsx          # Estrutura sidebar + conteúdo
│   │   ├── Sidebar.jsx         # Navegação lateral
│   │   └── PrivateRoute.jsx    # Proteção de rotas
│   └── pages/
│       ├── Login.jsx           # Tela de login
│       ├── Dashboard.jsx       # Painel com estatísticas
│       ├── Doadores.jsx        # CRUD de doadores
│       ├── Voluntarios.jsx     # CRUD de voluntários
│       └── Doacoes.jsx         # CRUD de doações
├── SEGURANCA.md                # Documentação de segurança
├── TESTES.md                   # Plano de testes
└── APRESENTACAO.md             # Roteiro de apresentação
```

## Como Executar

### Pré-requisitos
- [Node.js](https://nodejs.org) versão 18 ou superior
- npm (já vem com Node.js)

### Passos

```bash
# 1. Entre na pasta do projeto
cd ong-gestao

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse no navegador: **http://localhost:5173**

### Credenciais de acesso

| Campo  | Valor          |
|--------|----------------|
| E-mail | admin@ong.com  |
| Senha  | admin123       |

## Funcionalidades

- **Login** com validação de campos e proteção de sessão
- **Dashboard** com contadores de doadores, voluntários e doações
- **Doadores** — cadastro com nome, e-mail, telefone e cidade
- **Voluntários** — cadastro com área de atuação
- **Doações** — registro por tipo (dinheiro, alimentos, roupas etc.)
- **Remoção** de registros em todas as seções
- **Persistência** dos dados no localStorage do navegador
