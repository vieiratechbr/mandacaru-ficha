# 🌵 MANDACARU — Sistema de Fichas de RPG

Sistema completo de fichas online com autenticação, múltiplas mesas e painel do Mestre.

---

## Stack
- **Next.js 14** (App Router) — frontend + API routes
- **Supabase** — banco PostgreSQL + autenticação + Row Level Security
- **Vercel** — deploy e hospedagem

---

## 🚀 Como subir o projeto

### 1. Supabase — configurar banco

1. Acesse [supabase.com](https://supabase.com) e abra seu projeto
2. Vá em **SQL Editor** e cole o conteúdo de `supabase/schema.sql`
3. Execute o script — ele cria todas as tabelas, RLS e triggers
4. Vá em **Settings → API** e copie:
   - `URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

> ⚠️ **Ativar confirmação de email (opcional):**
> Em Authentication → Settings, você pode desativar "Confirm email"
> para testes. Em produção, recomenda-se deixar ativado.

---

### 2. Vercel — deploy

1. Faça push deste projeto para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. Em **Environment Variables**, adicione as 3 variáveis acima
4. Deploy! A Vercel detecta Next.js automaticamente.

---

### 3. Criar o primeiro Admin

Após o primeiro usuário se registrar no site, execute no **SQL Editor** do Supabase:

```sql
-- Substitua pelo email do admin
UPDATE public.perfis
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'seu@email.com'
);
```

Para criar um Mestre:
```sql
UPDATE public.perfis
SET role = 'mestre'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'mestre@email.com'
);
```

---

## 🎲 Fluxo de uso

### Como Mestre
1. Registre-se e peça ao admin para virar `mestre`
2. Acesse `/dashboard/mestre`
3. Crie uma Mesa — ela gera um **código de convite** (ex: `SERTAO-42`)
4. Passe o código para os jogadores
5. Veja todas as fichas da mesa, edite qualquer campo

### Como Jogador
1. Registre-se em `/auth/registro` com o código da mesa
2. Sua ficha em branco é criada automaticamente
3. Preencha a ficha e **Confirme** para selar os dados de origem
4. Dados dinâmicos (vida, medo, bornal) ficam sempre editáveis
5. Exporte como PDF quando quiser

### Como Admin
1. Acesse `/dashboard/admin`
2. Veja todos os usuários, mesas e fichas
3. Altere roles de usuários (jogador → mestre → admin)

---

## 📁 Estrutura do projeto

```
mandacaru/
├── app/
│   ├── page.tsx                  # Redirect inteligente por role
│   ├── layout.tsx
│   ├── auth/
│   │   ├── login/page.tsx        # Login
│   │   └── registro/page.tsx     # Registro + código de mesa
│   ├── dashboard/
│   │   ├── mestre/
│   │   │   ├── page.tsx          # Painel do Mestre
│   │   │   └── CriarMesaBtn.tsx  # Componente criar mesa
│   │   └── admin/page.tsx        # Painel Admin
│   ├── ficha/
│   │   ├── page.tsx              # Server component (carrega dados)
│   │   └── FichaClient.tsx       # Ficha interativa (client)
│   └── api/
│       ├── fichas/route.ts       # GET/PATCH fichas
│       ├── mesas/route.ts        # GET/POST mesas
│       ├── auth/logout/route.ts  # Logout
│       └── admin/set-role/       # Alterar role de usuário
├── lib/
│   ├── supabase.ts               # Cliente browser
│   └── supabase-server.ts        # Cliente server + admin
├── types/index.ts                # TypeScript types
├── middleware.ts                 # Proteção de rotas
├── supabase/schema.sql           # Schema completo do banco
└── .env.example                  # Variáveis necessárias
```

---

## 🔒 Segurança (RLS)

| Tabela   | Jogador           | Mestre                  | Admin     |
|----------|-------------------|-------------------------|-----------|
| `fichas` | Só a própria      | Todas da sua mesa       | Todas     |
| `mesas`  | Só onde tem ficha | As que criou            | Todas     |
| `perfis` | Só o próprio      | Só o próprio            | Todos     |

Campos fixos (após selar): protegidos na API — jogador não consegue
alterar mesmo se tentar via fetch direto.

---

## 🌵 Campos da Ficha

**Fixos (travados após confirmar):**
- Nome, Apelido, Passado, Facção
- FOR, AGI, VIG, INT, PRE
- Sangue Máx, Medo Limiar
- Perícias, Desvantagens, Habilidades

**Dinâmicos (sempre editáveis):**
- Sangue Atual, Medo Atual (com tracker de bolinhas)
- Bornal (10 slots de equipamento)
- Anotações livres
