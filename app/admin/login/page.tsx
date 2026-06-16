'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const g: Record<string, React.CSSProperties> = {
  page: { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
          background:'#0a0805', fontFamily:'Georgia,serif' },
  card: { width:340, background:'#1a100a', border:'1.5px solid #5a2510',
          boxShadow:'0 0 0 3px #0a0805,0 0 0 5px #5a2510,0 20px 60px rgba(0,0,0,.9)',
          padding:'2.5rem 2rem' },
  title:{ fontSize:'0.65rem', letterSpacing:'0.5em', color:'#5a2510', textAlign:'center',
          textTransform:'uppercase' as const, marginBottom:'0.4rem' },
  sub:  { fontSize:'1.2rem', color:'#c49a3c', textAlign:'center', letterSpacing:'0.1em', marginBottom:'2rem' },
  lbl:  { display:'block', fontSize:'0.6rem', letterSpacing:'0.25em', color:'#7a3318',
          marginBottom:4, textTransform:'uppercase' as const },
  inp:  { width:'100%', background:'transparent', border:'none', borderBottom:'1px solid #5a2510',
          fontFamily:'Georgia,serif', fontSize:'0.95rem', color:'#c49a3c', padding:'4px',
          outline:'none', marginBottom:'1.5rem', boxSizing:'border-box' as const },
  btn:  { width:'100%', background:'#5a2510', color:'#c49a3c', border:'1px solid #c49a3c',
          padding:'0.7rem', fontFamily:'Georgia,serif', fontSize:'0.75rem', letterSpacing:'0.3em',
          textTransform:'uppercase' as const, cursor:'pointer' },
  err:  { background:'rgba(139,26,26,.15)', border:'1px solid #8b1a1a', color:'#8b1a1a',
          padding:'0.5rem 0.8rem', fontSize:'0.8rem', marginBottom:'1rem' },
  back: { display:'block', textAlign:'center' as const, marginTop:'1.2rem', fontSize:'0.65rem',
          color:'#5a2510', letterSpacing:'0.2em', textDecoration:'none' },
}

export default function AdminLogin() {
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function entrar(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setErro('')
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senha }),
    })
    if (res.ok) {
      router.push('/dashboard/admin')
      router.refresh()
    } else {
      setErro('Senha incorreta.')
      setLoading(false)
    }
  }

  return (
    <div style={g.page}>
      <div style={g.card}>
        <div style={g.title}>Acesso Restrito</div>
        <div style={g.sub}>Painel do Mestre</div>
        {erro && <div style={g.err}>{erro}</div>}
        <form onSubmit={entrar}>
          <label style={g.lbl}>Senha de Administrador</label>
          <input style={g.inp} type="password" value={senha}
            onChange={e=>setSenha(e.target.value)} required autoFocus />
          <button style={g.btn} disabled={loading}>
            {loading ? 'Verificando…' : '✦ Entrar'}
          </button>
        </form>
        <a href="/auth/login" style={g.back}>← voltar ao login de jogadores</a>
      </div>
    </div>
  )
}
