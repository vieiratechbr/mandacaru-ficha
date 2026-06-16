import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createAdminSupabase } from '@/lib/supabase-server'

export default async function DashboardAdmin() {
  const cookieStore = await cookies()
  if (cookieStore.get('admin_session')?.value !== 'true') redirect('/admin/login')

  const adminSb = createAdminSupabase()
  const { data: fichas } = await adminSb
    .from('fichas')
    .select('id, nome, apelido, selada, sangue_atual, sangue_max, medo_atual, medo_max, atualizada_em, jogador_id')
    .order('atualizada_em', { ascending: false })

  const { data: { users } } = await adminSb.auth.admin.listUsers()
  const emailMap: Record<string, string> = {}
  users?.forEach((u: any) => { emailMap[u.id] = u.email ?? '—' })

  const s: Record<string, React.CSSProperties> = {
    page:    { minHeight:'100vh', background:'#1a100a', padding:'2rem', fontFamily:'Georgia,serif' },
    h1:      { color:'#7a3318', fontSize:'1.8rem', letterSpacing:'0.1em', margin:0 },
    sub:     { color:'#b8a480', fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase' as const, marginTop:4, marginBottom:'2rem' },
    grid:    { display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'1rem', maxWidth:900, marginBottom:'2rem' },
    stat:    { background:'#e8d9b8', border:'1.5px solid #7a3318', padding:'1rem 1.5rem' },
    num:     { fontSize:'2rem', color:'#7a3318', fontWeight:'bold' },
    slabel:  { fontSize:'0.65rem', color:'#b8a480', letterSpacing:'0.2em', textTransform:'uppercase' as const },
    sec:     { color:'#7a3318', fontSize:'0.7rem', letterSpacing:'0.35em', textTransform:'uppercase' as const,
               borderBottom:'1px solid #7a3318', paddingBottom:4, marginBottom:'1rem', maxWidth:900 },
    table:   { width:'100%', borderCollapse:'collapse', maxWidth:900, marginBottom:'2rem', fontSize:'0.82rem', color:'#e8d9b8' },
    th:      { textAlign:'left' as const, borderBottom:'1px solid #7a3318', padding:'6px 10px',
               color:'#c49a3c', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase' as const },
    td:      { padding:'7px 10px', borderBottom:'1px solid rgba(122,51,24,0.3)' },
    header:  { display:'flex', justifyContent:'space-between', alignItems:'flex-start', maxWidth:900, marginBottom:'1.5rem' },
    logout:  { color:'#b8a480', fontSize:'0.72rem', background:'none', border:'1px solid #b8a480',
               padding:'6px 14px', cursor:'pointer', fontFamily:'Georgia,serif', letterSpacing:'0.15em' },
    viewBtn: { color:'#c49a3c', fontSize:'0.72rem', textDecoration:'none', letterSpacing:'0.1em' },
  }

  const total = fichas?.length ?? 0
  const seladas = fichas?.filter((f: any) => f.selada).length ?? 0

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet"/>
      <div style={s.header}>
        <div>
          <div style={s.h1}>MANDACARU</div>
          <div style={s.sub}>Painel do Mestre</div>
        </div>
        <form action="/api/admin/logout" method="POST">
          <button style={s.logout}>Sair</button>
        </form>
      </div>

      <div style={s.grid}>
        <div style={s.stat}><div style={s.num}>{total}</div><div style={s.slabel}>Total de Fichas</div></div>
        <div style={s.stat}><div style={s.num}>{seladas}</div><div style={s.slabel}>Fichas Seladas</div></div>
        <div style={s.stat}><div style={s.num}>{total - seladas}</div><div style={s.slabel}>Em Criação</div></div>
      </div>

      <div style={s.sec}>⟡ Fichas dos Sobreviventes ⟡</div>

      {(!fichas || fichas.length === 0) ? (
        <div style={{ color:'#b8a480', fontStyle:'italic' }}>Nenhuma ficha ainda.</div>
      ) : (
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Personagem</th>
              <th style={s.th}>Jogador (email)</th>
              <th style={s.th}>Vida</th>
              <th style={s.th}>Medo</th>
              <th style={s.th}>Status</th>
              <th style={s.th}>Atualizada</th>
              <th style={s.th}></th>
            </tr>
          </thead>
          <tbody>
            {fichas.map((f: any) => (
              <tr key={f.id}>
                <td style={s.td}>{f.nome ?? '(sem nome)'}{f.apelido ? ` — "${f.apelido}"` : ''}</td>
                <td style={{ ...s.td, fontSize:'0.75rem', color:'#b8a480' }}>{emailMap[f.jogador_id] ?? '—'}</td>
                <td style={s.td}>{f.sangue_atual ?? 0}/{f.sangue_max ?? 0}</td>
                <td style={s.td}>{f.medo_atual ?? 0}/{f.medo_max ?? 0}</td>
                <td style={s.td}>
                  <span style={{ fontSize:'0.6rem', padding:'2px 8px',
                    background: f.selada ? 'rgba(61,92,46,0.3)' : 'rgba(196,154,60,0.2)',
                    color: f.selada ? '#3d5c2e' : '#c49a3c' }}>
                    {f.selada ? '🔒 Selada' : '✎ Criando'}
                  </span>
                </td>
                <td style={{ ...s.td, fontSize:'0.72rem', color:'#b8a480' }}>
                  {new Date(f.atualizada_em).toLocaleDateString('pt-BR')}
                </td>
                <td style={s.td}>
                  <a style={s.viewBtn} href={`/ficha?id=${f.id}&admin=1`}>Ver →</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
