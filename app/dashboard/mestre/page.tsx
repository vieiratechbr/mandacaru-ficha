import { createServerSupabase } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import CriarMesaBtn from './CriarMesaBtn'

export default async function DashboardMestre() {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: perfil } = await supabase
    .from('perfis').select('role,nome').eq('id', user.id).single()
  if (!['mestre','admin'].includes(perfil?.role ?? '')) redirect('/ficha')

  const { data: mesas } = await supabase
    .from('mesas')
    .select('id, nome, descricao, codigo, fichas(id, nome, selada, sangue_atual, sangue_max)')
    .order('criada_em', { ascending: false })

  const s: Record<string, React.CSSProperties> = {
    page:   { minHeight:'100vh', background:'#1a100a', padding:'2rem', fontFamily:'Georgia,serif' },
    header: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', maxWidth:860, marginBottom:'1.5rem' },
    h1:     { color:'#7a3318', fontSize:'1.8rem', letterSpacing:'0.1em', margin:0 },
    sub:    { color:'#b8a480', fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', marginTop:4 },
    logout: { color:'#b8a480', fontSize:'0.72rem', background:'none', border:'1px solid #b8a480',
              padding:'6px 14px', cursor:'pointer', fontFamily:'Georgia,serif', letterSpacing:'0.15em' },
    card:   { background:'#e8d9b8', border:'1.5px solid #7a3318', padding:'1.2rem 1.5rem',
              marginBottom:'1.5rem', maxWidth:860 },
    badge:  { background:'#7a3318', color:'#e8d9b8', fontSize:'0.65rem', padding:'2px 10px',
              letterSpacing:'0.2em', textTransform:'uppercase' },
    nomeMesa: { color:'#2a1a0a', fontSize:'1.1rem', margin:'0.5rem 0 0.2rem' },
    cod:    { color:'#b8a480', fontSize:'0.75rem', letterSpacing:'0.2em' },
    table:  { width:'100%', borderCollapse:'collapse', marginTop:'0.8rem', fontSize:'0.82rem', color:'#2a1a0a' },
    th:     { textAlign:'left', borderBottom:'1px solid #b8a480', padding:'4px 8px',
              color:'#7a3318', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase' },
    td:     { padding:'6px 8px', borderBottom:'1px solid rgba(184,164,128,0.3)' },
    btn:    { background:'#7a3318', color:'#e8d9b8', border:'1px solid #c49a3c', padding:'4px 14px',
              fontSize:'0.72rem', cursor:'pointer', letterSpacing:'0.15em', textDecoration:'none',
              display:'inline-block' },
    empty:  { color:'#b8a480', fontStyle:'italic', fontSize:'0.9rem', maxWidth:860 },
  }

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet"/>
      <div style={s.header}>
        <div>
          <div style={s.h1}>MANDACARU</div>
          <div style={s.sub}>Painel do Mestre — {perfil?.nome ?? user.email}</div>
        </div>
        <form action="/api/auth/logout" method="POST">
          <button style={s.logout}>Sair</button>
        </form>
      </div>

      <CriarMesaBtn />

      {(!mesas || mesas.length === 0) ? (
        <div style={s.empty}>Nenhuma mesa criada ainda. Crie a primeira acima.</div>
      ) : mesas.map((mesa: any) => (
        <div key={mesa.id} style={s.card}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={s.nomeMesa}>{mesa.nome}</div>
              <div style={s.cod}>Código de convite: <strong>{mesa.codigo}</strong></div>
              {mesa.descricao && <div style={{ color:'#b8a480', fontSize:'0.8rem', marginTop:4 }}>{mesa.descricao}</div>}
            </div>
            <span style={s.badge}>{mesa.fichas?.length ?? 0} jogadores</span>
          </div>

          {mesa.fichas?.length > 0 && (
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Personagem</th>
                  <th style={s.th}>Vida</th>
                  <th style={s.th}>Status</th>
                  <th style={s.th}></th>
                </tr>
              </thead>
              <tbody>
                {mesa.fichas.map((f: any) => (
                  <tr key={f.id}>
                    <td style={s.td}>{f.nome ?? '(sem nome)'}</td>
                    <td style={s.td}>{f.sangue_atual ?? 0} / {f.sangue_max ?? 0}</td>
                    <td style={s.td}>
                      <span style={{ color: f.selada ? '#3d5c2e' : '#c49a3c', fontSize:'0.72rem' }}>
                        {f.selada ? '🔒 Selada' : '✎ Em criação'}
                      </span>
                    </td>
                    <td style={s.td}>
                      <a style={s.btn} href={`/ficha?id=${f.id}&mestre=1`}>Ver ficha</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  )
}
