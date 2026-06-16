import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { senha } = await req.json()
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return NextResponse.json({ error: 'Admin não configurado.' }, { status: 500 })
  }

  if (senha !== adminPassword) {
    return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 })
  }

  // Seta cookie de sessão admin (httpOnly, 8h)
  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_session', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8 horas
    path: '/',
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete('admin_session')
  return res
}
