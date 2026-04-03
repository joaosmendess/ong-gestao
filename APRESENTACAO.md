# Roteiro de Apresentação — GestãoSolidária

**Tempo sugerido:** 10 a 15 minutos

---

## Abertura (1 min)

> "Bom dia/tarde. O projeto que vamos apresentar é o **GestãoSolidária**, um sistema web desenvolvido para auxiliar ONGs a gerenciar suas operações do dia a dia, substituindo controles feitos em papel e planilhas por uma solução digital simples, funcional e segura."

---

## 1. Contexto e Problema (2 min)

**Falar sobre:**
- Muitas ONGs ainda controlam doadores, voluntários e doações manualmente (cadernos, planilhas Excel)
- Problemas: dados perdidos, difícil de pesquisar, sem visão geral rápida, sem controle de acesso
- Solução proposta: sistema web acessível por qualquer dispositivo com navegador

**Frase de impacto:**
> "Enquanto uma planilha pode se perder ou ser editada por qualquer pessoa, nosso sistema controla quem acessa e garante que os dados fiquem organizados e seguros."

---

## 2. Demonstração do Sistema (5 min)

### Passo 1 — Login
- Abrir o sistema em `http://localhost:5173`
- Mostrar que sem login, qualquer URL redireciona para `/login`
- Tentar login com senha errada → mostrar mensagem de erro
- Fazer login correto: `admin@ong.com` / `admin123`

### Passo 2 — Dashboard
- Mostrar a tela inicial com os contadores
- Explicar que o dashboard dá uma visão rápida sem precisar abrir nada

### Passo 3 — Cadastrar um Doador
- Ir em "Doadores" → preencher o formulário
- Tentar enviar com e-mail inválido → mostrar a validação em tempo real
- Cadastrar corretamente → mostrar o registro na tabela
- Voltar ao Dashboard → mostrar que o contador aumentou

### Passo 4 — Cadastrar um Voluntário
- Ir em "Voluntários" → cadastrar rapidamente
- Mostrar a seleção de área de atuação

### Passo 5 — Registrar uma Doação
- Ir em "Doações" → registrar doação em dinheiro
- Mostrar que o campo muda de rótulo dependendo do tipo ("Valor" vs "Quantidade")
- Registrar doação de alimentos para mostrar a flexibilidade

### Passo 6 — Logout
- Clicar em "Sair"
- Mostrar que volta para o login e não dá para acessar rotas internas

---

## 3. Arquitetura e Tecnologias (2 min)

**Mostrar/falar:**
> "O sistema foi construído com React e Vite, que são tecnologias modernas usadas no mercado. Os dados são armazenados no localStorage do navegador, o que nos permitiu focar na lógica e na interface sem precisar de um servidor de banco de dados."

**Mostrar a estrutura de pastas** (abrir no VS Code ou mostrar slide):
- `src/context/` → autenticação global
- `src/utils/storage.js` → abstração do banco (fácil de trocar por API)
- `src/components/` → elementos reutilizáveis
- `src/pages/` → cada tela do sistema

---

## 4. Segurança (2 min)

**Pontos para destacar:**

1. **Autenticação** — o sistema exige login e cria uma sessão com token
2. **Proteção de rotas** — nenhuma página é acessível sem estar logado
3. **Validação de formulários** — todos os campos são validados antes de aceitar os dados
4. **Sanitização** — `.trim()` e `.toLowerCase()` nos inputs para evitar dados sujos

**Falar sobre produção:**
> "Em um ambiente de produção real, usaríamos JWT com backend, HTTPS, senhas com hash bcrypt e validação também no servidor. O sistema já está estruturado para essa evolução."

---

## 5. Testes (2 min)

**Pontos para destacar:**
- Foram definidos **31 cenários de testes manuais**
- Cobrem: login, proteção de rotas, validação de formulários, persistência, usabilidade
- O projeto está preparado para receber testes automatizados com Vitest e React Testing Library

**Demonstrar ao vivo:**
- Tentar acessar `/dashboard` sem login → redireciona ✅
- Tentar cadastrar com campos inválidos → mostra erros ✅
- Cadastrar e recarregar a página → dados persistem ✅

---

## Encerramento (1 min)

> "O GestãoSolidária resolve um problema real que muitas ONGs enfrentam, com uma solução simples, segura e funcional. O sistema pode ser facilmente expandido com novas funcionalidades como relatórios, busca de registros, ou migração para um backend real com banco de dados. Obrigado."

---

## Possíveis Perguntas e Respostas

**"Por que não usaram banco de dados?"**
> Para fins acadêmicos, o localStorage é suficiente para demonstrar os conceitos. Em produção, substituiríamos por uma API REST com banco relacional como PostgreSQL.

**"Os dados são seguros no localStorage?"**
> Localmente sim para o propósito do sistema. Em produção, utilizaríamos HTTPS, tokens JWT no httpOnly cookie e banco de dados com criptografia.

**"Posso acessar de outro computador?"**
> Atualmente não, pois os dados ficam no navegador. Com um backend, os dados ficariam centralizados e acessíveis de qualquer lugar.

**"E se dois usuários tentarem usar ao mesmo tempo?"**
> Com localStorage não haveria conflito pois os dados são locais. Com backend, usaríamos controle de concorrência no banco de dados.
