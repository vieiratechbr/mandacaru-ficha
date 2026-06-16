import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const res = NextResponse.redirect(new URL('/admin/login', url.origin))
  res.cookies.delete('admin_session')
  return res
}
