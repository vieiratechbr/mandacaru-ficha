import { createServerSupabase, createAdminSupabase } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const fichaId = searchParams.get('id')
  const cookieStore = await cookies()
  const isAdmin = cookieStore.get('admin_session')?.value === 'true'

  if (fichaId && isAdmin) {
    const adminSb = createAdminSupabase()
    const { data, error } = await adminSb.from('fichas').select('*').eq('id', fichaId).single()
    if (error) return NextResponse.json({ error: error.message }, { status: 404 })
    return NextResponse.json(data)
  }

  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const { data, error } = await supabase.from('fichas').select('*').eq('jogador_id', user.id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest) {
  const cookieStore = await cookies()
  const isAdmin = cookieStore.get('admin_session')?.value === 'true'
  const body = await req.json()
  const { id, ...campos } = body
  if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 })

  if (isAdmin) {
    const adminSb = createAdminSupabase()
    const { data, error } = await adminSb.from('fichas').update(campos).eq('id', id).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data)
  }

  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const { data: ficha } = await supabase.from('fichas').select('selada').eq('id', id).single()
  const CAMPOS_FIXOS = ['nome','apelido','passado','faccao','atr_for','atr_agi','atr_vig','atr_int','atr_pre',
                        'sangue_max','medo_max','pericias','desvantagens','habilidades']

  if (ficha?.selada) {
    for (const campo of CAMPOS_FIXOS) {
      if (campo in campos) return NextResponse.json({ error: `Campo "${campo}" está selado.` }, { status: 403 })
    }
  }

  const { data, error } = await supabase.from('fichas').update(campos).eq('id', id).eq('jogador_id', user.id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}
