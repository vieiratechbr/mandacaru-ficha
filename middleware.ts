import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Rotas públicas: login jogador, registro, admin login, APIs
  if (
    path.startsWith('/auth') ||
    path.startsWith('/admin/login') ||
    path.startsWith('/api/admin/auth') ||
    path.startsWith('/_next') ||
    path === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // Admin: protege /dashboard/admin e /ficha?admin=1
  if (path.startsWith('/dashboard/admin')) {
    const adminSession = request.cookies.get('admin_session')?.value
    if (adminSession !== 'true') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    return NextResponse.next()
  }

  // API admin routes
  if (path.startsWith('/api/admin')) {
    const adminSession = request.cookies.get('admin_session')?.value
    if (adminSession !== 'true') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    return NextResponse.next()
  }

  // Jogadores: verifica auth Supabase
  let response = NextResponse.next({ request: { headers: request.headers } })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL('/auth/login', request.url))
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
