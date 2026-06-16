import { createServerSupabase, createAdminSupabase } from '@/lib/supabase-server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import FichaClient from './FichaClient'

export default async function FichaPage({ searchParams }: { searchParams: { id?: string, admin?: string } }) {
  const cookieStore = await cookies()
  const isAdmin = cookieStore.get('admin_session')?.value === 'true'

  let ficha = null
  let fichaId = searchParams.id

  if (isAdmin && fichaId) {
    const adminSb = createAdminSupabase()
    const { data } = await adminSb.from('fichas').select('*').eq('id', fichaId).single()
    ficha = data
  } else {
    const supabase = await createServerSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/auth/login')
    const { data } = await supabase.from('fichas').select('*').eq('jogador_id', user.id).single()
    ficha = data
    fichaId = ficha?.id
  }

  return (
    <FichaClient
      fichaInicial={ficha}
      fichaId={fichaId ?? null}
      isAdmin={isAdmin && !!searchParams.admin}
    />
  )
}
