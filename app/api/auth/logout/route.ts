import { createServerSupabase } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const supabase = await createServerSupabase()
  await supabase.auth.signOut()
  const url = new URL(req.url)
  return NextResponse.redirect(new URL('/auth/login', url.origin))
}
