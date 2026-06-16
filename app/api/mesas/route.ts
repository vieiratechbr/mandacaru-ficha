import { createServerSupabase } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

function gerarCodigo() {
  const palavras = ['SERTAO','CAATINGA','MANDACARU','SERTANEJO','VAQUEIRO','CANGACO']
  const palavra = palavras[Math.floor(Math.random() * palavras.length)]
  const num = Math.floor(Math.random() * 90) + 10
  return `${palavra}-${num}`
}

// POST /api/mesas — cria nova mesa (mestre/admin)
export async function POST(req: NextRequest) {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const { data: perfil } = await supabase.from('perfis').select('role').eq('id', user.id).single()
  if (!['mestre','admin'].includes(perfil?.role ?? '')) {
    return NextResponse.json({ error: 'Apenas mestres podem criar mesas.' }, { status: 403 })
  }

  const body = await req.json()
  const codigo = gerarCodigo()

  const { data, error } = await supabase.from('mesas').insert({
    nome: body.nome,
    descricao: body.descricao ?? null,
    codigo,
    mestre_id: user.id,
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

// GET /api/mesas — lista mesas do mestre logado (ou todas se admin)
export async function GET() {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const { data, error } = await supabase
    .from('mesas').select('*, fichas(count)').order('criada_em', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}
