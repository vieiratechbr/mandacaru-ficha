import { createServerSupabase } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import PerfilClient from './PerfilClient'

export default async function PerfilPage() {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const [{ data: perfil }, { data: ficha }] = await Promise.all([
    supabase
      .from('perfis')
      .select('role,nome')
      .eq('id', user.id)
      .maybeSingle(),
    supabase
      .from('fichas')
      .select('id')
      .eq('jogador_id', user.id)
      .limit(1)
      .maybeSingle(),
  ])

  if (perfil?.role === 'admin') redirect('/dashboard/admin')

  return (
    <PerfilClient
      nome={perfil?.nome ?? user.email ?? 'Sobrevivente'}
      role={perfil?.role ?? 'jogador'}
      hasFicha={!!ficha}
    />
  )
}
