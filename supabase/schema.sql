-- ============================================================
--  MANDACARU — Schema simplificado (sem mesas)
--  Execute no SQL Editor do Supabase
-- ============================================================

create extension if not exists "pgcrypto";

-- Tabela de fichas (uma por usuário)
create table public.fichas (
  id            uuid primary key default gen_random_uuid(),
  jogador_id    uuid not null references auth.users(id) on delete cascade unique,
  -- Dados fixos
  nome          text,
  apelido       text,
  passado       text,
  faccao        text,
  atr_for       int2 default 0,
  atr_agi       int2 default 0,
  atr_vig       int2 default 0,
  atr_int       int2 default 0,
  atr_pre       int2 default 0,
  sangue_max    int2 default 0,
  medo_max      int2 default 0,
  pericias      jsonb default '[]',
  desvantagens  jsonb default '[]',
  habilidades   jsonb default '[]',
  selada        boolean default false,
  -- Dados dinâmicos
  sangue_atual  int2 default 0,
  medo_atual    int2 default 0,
  bornal        jsonb default '[]',
  notas         text default '',
  criada_em     timestamptz default now(),
  atualizada_em timestamptz default now()
);

-- Trigger: atualiza atualizada_em
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.atualizada_em = now(); return new; end;
$$;

create trigger fichas_updated_at
  before update on public.fichas
  for each row execute procedure public.set_updated_at();

-- Cria ficha em branco quando usuário se registra
create or replace function public.criar_ficha_novo_usuario()
returns trigger language plpgsql security definer as $$
begin
  insert into public.fichas (jogador_id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.criar_ficha_novo_usuario();

-- RLS
alter table public.fichas enable row level security;

-- Jogador vê só a própria ficha
create policy "jogador_propria_ficha" on public.fichas
  for all using (jogador_id = auth.uid());

-- Index
create index on public.fichas(jogador_id);
