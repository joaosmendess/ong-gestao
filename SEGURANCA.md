# Segurança do Sistema — GestãoSolidária

Este documento descreve as medidas de segurança implementadas no sistema e as boas práticas adotadas, considerando o contexto acadêmico e a natureza local da aplicação.

---

## 1. Autenticação e Controle de Acesso

### O que foi implementado
- **Tela de login obrigatória** antes de qualquer acesso ao sistema
- **Sessão simulada via localStorage**: ao fazer login, é gerado um token (`btoa(email + timestamp)`) que persiste até o logout explícito
- **Verificação de sessão ativa**: ao recarregar a página, o sistema lê o token do localStorage. Se não existir, redireciona para o login

### Código relevante
```js
// AuthContext.jsx — geração do token
const token = btoa(`${cleanEmail}:${Date.now()}`)
localStorage.setItem(SESSION_KEY, token)
```

### Em produção, o correto seria
- Utilizar **JWT (JSON Web Token)** com assinatura via algoritmo como HS256
- Armazenar o token em `httpOnly cookie` para prevenir acesso via JavaScript
- Implementar **expiração de sessão** (ex: 1 hora sem atividade)
- Usar **bcrypt** para hash das senhas no banco de dados
- Implementar **limite de tentativas** de login (rate limiting) contra ataques de força bruta

---

## 2. Proteção de Rotas

### O que foi implementado
- Componente `PrivateRoute` que verifica se o usuário está autenticado antes de renderizar qualquer página protegida
- Se não autenticado, redireciona automaticamente para `/login`
- URLs internas não são acessíveis sem sessão ativa

```jsx
// PrivateRoute.jsx
if (!isAuthenticated) {
  return <Navigate to="/login" replace />
}
```

### Em produção, o correto seria
- Validar o token no servidor a cada requisição (middleware de autenticação)
- Implementar controle de perfis/permissões (admin, operador, etc.)

---

## 3. Validação de Entradas

### O que foi implementado
Todos os formulários possuem validação **no lado do cliente** antes de qualquer operação:

| Campo     | Validação aplicada                                      |
|-----------|---------------------------------------------------------|
| Nome      | Obrigatório, mínimo 3 caracteres                        |
| E-mail    | Obrigatório, formato válido via regex                   |
| Telefone  | Formato brasileiro via regex `(XX) XXXXX-XXXX`         |
| Senha     | Obrigatória, mínimo 6 caracteres                        |
| Tipo/Área | Seleção obrigatória (não permite vazio)                 |
| Valor     | Para dinheiro: numérico positivo                        |

```js
// Exemplo de validação de e-mail
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
  errs.email = 'E-mail inválido.'
}
```

### Sanitização de entradas
- `.trim()` aplicado em todos os campos de texto antes da comparação ou armazenamento
- `.toLowerCase()` aplicado no e-mail para evitar duplicidades por capitalização

### Em produção, o correto seria
- Validação também no **backend (server-side)**, pois validação client-side pode ser contornada
- Sanitização contra **XSS** (Cross-Site Scripting): escapar caracteres especiais HTML nos dados exibidos
- Usar bibliotecas como `DOMPurify` para sanitizar inputs rich-text
- Validação contra **SQL Injection** ao usar banco de dados (prepared statements / ORM)

---

## 4. Armazenamento de Dados

### O que foi implementado
- Dados armazenados no **localStorage** do navegador com chaves prefixadas (`ong_doadores`, `ong_voluntarios`, `ong_doacoes`)
- Separação clara entre chave de sessão (`ong_session`) e dados da aplicação
- Tratamento de erro no parse do JSON para evitar crash em dados corrompidos

```js
try {
  return raw ? JSON.parse(raw) : []
} catch {
  return []  // Retorna array vazio em caso de dado corrompido
}
```

### Limitações do localStorage (para apresentação)
- Dados ficam visíveis no navegador (DevTools → Application → LocalStorage)
- Não é criptografado por padrão
- Acessível por qualquer JavaScript da mesma origem

### Em produção, o correto seria
- Usar banco de dados no servidor (PostgreSQL, MySQL, MongoDB)
- Comunicação via HTTPS com certificado SSL/TLS
- Senhas com hash bcrypt no banco de dados
- Dados sensíveis criptografados em repouso

---

## 5. Boas Práticas Adotadas

| Prática                          | Implementação                                         |
|----------------------------------|-------------------------------------------------------|
| Feedback visual de erros         | Mensagens de erro exibidas abaixo de cada campo       |
| Confirmação antes de excluir     | `window.confirm()` antes de remover qualquer registro |
| Separação de responsabilidades   | Lógica de auth, storage e UI em arquivos separados    |
| Nenhum dado sensível no código   | Credenciais poderiam vir de variável de ambiente      |
| Atributo `noValidate` nos forms  | Controle total da validação via JavaScript            |
| `autocomplete` nos campos        | Facilita uso e segue padrão de acessibilidade         |

---

## Resumo para Apresentação

> "O sistema implementa autenticação com controle de sessão, proteção de rotas que impede acesso não autorizado, e validação de entradas em todos os formulários. Em um ambiente de produção, estas medidas seriam complementadas por backend com JWT, HTTPS, banco de dados com senhas em hash e validação server-side."
