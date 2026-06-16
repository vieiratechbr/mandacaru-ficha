import { redirect } from 'next/navigation'
import { createServerSupabase } from '@/lib/supabase-server'
import { cookies } from 'next/headers'

export default async function Home() {
  // Checa se é admin (cookie de sessão admin)
  const cookieStore = cookies()
  const adminSession = cookieStore.get('admin_session')
  if (adminSession?.value === 'true') redirect('/dashboard/admin')

  // Checa jogador logado
  const supabase = createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  redirect('/ficha')
}
