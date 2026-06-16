import { createAdminSupabase, createServerSupabase } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

const ROLES_PERMITIDAS = ['jogador', 'mestre'] as const

export async function PATCH(req: NextRequest) {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })

  const body = await req.json().catch(() => null)
  const role = body?.role

  if (!ROLES_PERMITIDAS.includes(role)) {
    return NextResponse.json({ error: 'Papel invalido.' }, { status: 400 })
  }

  const adminSb = createAdminSupabase()
  const { data: perfil } = await adminSb
    .from('perfis')
    .select('role,nome')
    .eq('id', user.id)
    .maybeSingle()

  if (perfil?.role === 'admin') {
    return NextResponse.json({ error: 'Admin nao pode trocar de papel por aqui.' }, { status: 403 })
  }

  const { error } = await adminSb
    .from('perfis')
    .upsert({
      id: user.id,
      role,
      nome: perfil?.nome ?? user.user_metadata?.nome ?? user.email ?? null,
    })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ role })
}
