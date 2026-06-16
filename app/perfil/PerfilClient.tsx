'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Role = 'jogador' | 'mestre' | 'admin'

const s: Record<string, React.CSSProperties> = {
  page: { minHeight:'100vh', background:'#1a100a', padding:'2rem',
          fontFamily:'Georgia,serif', color:'#e8d9b8' },
  wrap: { maxWidth:860, margin:'0 auto' },
  title: { color:'#7a3318', fontSize:'1.8rem', letterSpacing:'0.1em', margin:0 },
  sub: { color:'#b8a480', fontSize:'0.72rem', letterSpacing:'0.25em',
         textTransform:'uppercase', marginTop:4, marginBottom:'2rem' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'1rem' },
  card: { background:'#e8d9b8', color:'#2a1a0a', border:'1.5px solid #7a3318',
          padding:'1.4rem 1.5rem' },
  h2: { color:'#7a3318', fontSize:'1rem', letterSpacing:'0.12em', margin:'0 0 0.6rem',
        textTransform:'uppercase' },
  p: { color:'#5a4630', fontSize:'0.9rem', lineHeight:1.45, minHeight:70 },
  label: { display:'block', fontSize:'0.62rem', letterSpacing:'0.25em',
           color:'#7a3318', marginBottom:4, textTransform:'uppercase' },
  input: { width:'100%', background:'transparent', border:'none',
           borderBottom:'1px solid #b8a480', fontFamily:'Georgia,serif',
           fontSize:'0.95rem', color:'#2a1a0a', padding:'6px 4px',
           outline:'none', marginBottom:'1rem', boxSizing:'border-box',
           textTransform:'uppercase' },
  btn: { background:'#7a3318', color:'#e8d9b8', border:'2px solid #c49a3c',
         padding:'0.65rem 1rem', fontFamily:'Georgia,serif', fontSize:'0.75rem',
         letterSpacing:'0.18em', textTransform:'uppercase', cursor:'pointer',
         textDecoration:'none', display:'inline-block', textAlign:'center' },
  mutedBtn: { background:'transparent', color:'#7a3318', border:'1.5px solid #7a3318',
              padding:'0.65rem 1rem', fontFamily:'Georgia,serif', fontSize:'0.75rem',
              letterSpacing:'0.18em', textTransform:'uppercase', cursor:'pointer',
              textDecoration:'none', display:'inline-block', textAlign:'center' },
  err: { marginTop:'1rem', background:'rgba(139,26,26,.12)', border:'1px solid #8b1a1a',
         color:'#8b1a1a', padding:'0.6rem 0.8rem', fontSize:'0.85rem' },
  badge: { display:'inline-block', color:'#3d5c2e', border:'1px solid #3d5c2e',
           padding:'2px 8px', fontSize:'0.62rem', letterSpacing:'0.18em',
           textTransform:'uppercase', marginBottom:'1rem' },
}

export default function PerfilClient({
  nome,
  role,
  hasFicha,
}: {
  nome: string
  role: Role
  hasFicha: boolean
}) {
  const [codigo, setCodigo] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function virarMestre() {
    setLoading(true); setErro('')
    const res = await fetch('/api/perfil/role', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'mestre' }),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => null)
      setErro(body?.error ?? 'Nao foi possivel alterar seu papel.')
      setLoading(false); return
    }

    router.push('/dashboard/mestre')
    router.refresh()
  }

  async function entrarNaMesa(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setErro('')
    const res = await fetch('/api/mesas/entrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo }),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => null)
      setErro(body?.error ?? 'Nao foi possivel entrar nesta mesa.')
      setLoading(false); return
    }

    router.push('/ficha')
    router.refresh()
  }

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet"/>
      <main style={s.wrap}>
        <h1 style={s.title}>MANDACARU</h1>
        <div style={s.sub}>Escolha seu caminho, {nome}</div>

        {role === 'mestre' && <div style={s.badge}>Voce ja esta como Mestre</div>}

        <div style={s.grid}>
          <section style={s.card}>
            <h2 style={s.h2}>Sou Mestre</h2>
            <p style={s.p}>
              Use este modo para criar mesas, gerar codigos de convite e acompanhar
              as fichas dos jogadores.
            </p>
            {role === 'mestre' ? (
              <a href="/dashboard/mestre" style={s.btn}>Ir para painel</a>
            ) : (
              <button style={s.btn} onClick={virarMestre} disabled={loading}>
                {loading ? 'Aguarde...' : 'Virar Mestre'}
              </button>
            )}
          </section>

          <section style={s.card}>
            <h2 style={s.h2}>Sou Jogador</h2>
            <p style={s.p}>
              Entre em uma mesa usando o codigo enviado pelo Mestre. Ao entrar,
              sua ficha sera criada automaticamente.
            </p>
            <form onSubmit={entrarNaMesa}>
              <label style={s.label}>Codigo da Mesa</label>
              <input
                style={s.input}
                value={codigo}
                onChange={e => setCodigo(e.target.value)}
                placeholder="ex: SERTAO-42"
                required={!hasFicha}
              />
              <button style={s.btn} disabled={loading || !codigo.trim()}>
                {loading ? 'Entrando...' : 'Entrar na mesa'}
              </button>
            </form>
            {hasFicha && (
              <a href="/ficha" style={{ ...s.mutedBtn, marginTop:'0.8rem' }}>
                Abrir minha ficha
              </a>
            )}
          </section>
        </div>

        {erro && <div style={s.err}>{erro}</div>}
      </main>
    </div>
  )
}
