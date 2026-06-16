import { createServerSupabase, createAdminSupabase } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const { data: perfil } = await supabase.from('perfis').select('role').eq('id', user.id).single()
  if (perfil?.role !== 'admin') return NextResponse.json({ error: 'Apenas admin.' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('user')
  const role   = searchParams.get('role')
  if (!userId || !['jogador','mestre','admin'].includes(role ?? '')) {
    return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: 400 })
  }

  const adminSb = createAdminSupabase()
  const { error } = await adminSb.from('perfis').update({ role }).eq('id', userId)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  const url = new URL(req.url)
  return NextResponse.redirect(new URL('/dashboard/admin', url.origin))
}
