import { redirect } from 'next/navigation'
import { createServerSupabase } from '@/lib/supabase-server'
import { cookies } from 'next/headers'

export default async function Home() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get('admin_session')
  if (adminSession?.value === 'true') redirect('/dashboard/admin')

  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  redirect('/ficha')
}
