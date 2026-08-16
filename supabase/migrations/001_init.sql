-- ============================================
-- 15s Saray Invitacion - Migración inicial
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- Tabla de invitados (una fila por invitación)
create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  display_name text not null,
  confirmed boolean not null default false,
  num_guests integer not null default 1,
  confirmed_at timestamptz,
  created_at timestamptz not null default now()
);

-- Tabla de canciones sugeridas
create table if not exists public.songs (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid not null references public.guests(id) on delete cascade,
  song_name text not null,
  selected boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists songs_guest_id_idx on public.songs (guest_id);
create index if not exists guests_slug_idx on public.guests (slug);

-- ===== Row Level Security =====
alter table public.guests enable row level security;
alter table public.songs enable row level security;

-- Los invitados (anon) pueden leer la información de los invitados
drop policy if exists "guests_select_anon" on public.guests;
create policy "guests_select_anon" on public.guests
  for select to anon using (true);

-- Los invitados (anon) pueden actualizar su confirmación
drop policy if exists "guests_update_anon" on public.guests;
create policy "guests_update_anon" on public.guests
  for update to anon using (true) with check (true);

-- Los invitados (anon) pueden insertar canciones
drop policy if exists "songs_insert_anon" on public.songs;
create policy "songs_insert_anon" on public.songs
  for insert to anon with check (true);

-- Los invitados (anon) pueden leer la canción que acaban de insertar (return=representation)
drop policy if exists "songs_select_anon" on public.songs;
create policy "songs_select_anon" on public.songs
  for select to anon using (true);

-- Solo el admin logueado (authenticated) puede leer canciones
drop policy if exists "songs_select_auth" on public.songs;
create policy "songs_select_auth" on public.songs
  for select to authenticated using (true);

-- El admin puede actualizar canciones (toggle de seleccionadas)
drop policy if exists "songs_update_auth" on public.songs;
create policy "songs_update_auth" on public.songs
  for update to authenticated using (true) with check (true);

-- El admin puede leer todos los invitados
drop policy if exists "guests_select_auth" on public.guests;
create policy "guests_select_auth" on public.guests
  for select to authenticated using (true);