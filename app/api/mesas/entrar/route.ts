import { createAdminSupabase, createServerSupabase } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })

  const body = await req.json().catch(() => null)
  const codigo = String(body?.codigo ?? '').trim().toUpperCase()

  if (!codigo) {
    return NextResponse.json({ error: 'Informe o codigo da mesa.' }, { status: 400 })
  }

  const adminSb = createAdminSupabase()
  const { data: mesa, error: mesaError } = await adminSb
    .from('mesas')
    .select('id,nome,codigo')
    .eq('codigo', codigo)
    .maybeSingle()

  if (mesaError) return NextResponse.json({ error: mesaError.message }, { status: 400 })
  if (!mesa) return NextResponse.json({ error: 'Mesa nao encontrada.' }, { status: 404 })

  const { data: existente } = await adminSb
    .from('fichas')
    .select('id')
    .eq('mesa_id', mesa.id)
    .eq('jogador_id', user.id)
    .maybeSingle()

  if (existente) {
    return NextResponse.json({ fichaId: existente.id, mesa })
  }

  const { data: ficha, error } = await adminSb
    .from('fichas')
    .insert({
      mesa_id: mesa.id,
      jogador_id: user.id,
    })
    .select('id')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ fichaId: ficha.id, mesa })
}
