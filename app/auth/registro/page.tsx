'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

const g: Record<string, React.CSSProperties> = {
  page: { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
          background:'#1a100a', fontFamily:'Georgia,serif' },
  card: { width:380, background:'#e8d9b8', border:'2px solid #7a3318',
          boxShadow:'0 0 0 4px #1a100a,0 0 0 6px #7a3318,0 20px 60px rgba(0,0,0,.7)',
          padding:'2.5rem 2rem' },
  title: { fontSize:'1.8rem', color:'#7a3318', textAlign:'center', letterSpacing:'0.1em', margin:'0 0 0.2rem' },
  sub:   { fontSize:'0.72rem', letterSpacing:'0.3em', color:'#b8a480', textAlign:'center',
           marginBottom:'2rem', textTransform:'uppercase' as const },
  lbl:   { display:'block', fontSize:'0.65rem', letterSpacing:'0.25em', color:'#7a3318',
           marginBottom:4, textTransform:'uppercase' as const },
  inp:   { width:'100%', background:'transparent', border:'none', borderBottom:'1px solid #b8a480',
           fontFamily:'Georgia,serif', fontSize:'0.95rem', color:'#2a1a0a', padding:'4px',
           outline:'none', marginBottom:'1.2rem', boxSizing:'border-box' as const },
  btn:   { width:'100%', background:'#7a3318', color:'#e8d9b8', border:'2px solid #c49a3c',
           padding:'0.7rem', fontFamily:'Georgia,serif', fontSize:'0.8rem', letterSpacing:'0.25em',
           textTransform:'uppercase' as const, cursor:'pointer', marginTop:'0.5rem' },
  err:   { background:'rgba(139,26,26,.1)', border:'1px solid #8b1a1a', color:'#8b1a1a',
           padding:'0.5rem 0.8rem', fontSize:'0.82rem', marginBottom:'1rem' },
  ok:    { background:'rgba(61,92,46,.1)', border:'1px solid #3d5c2e', color:'#3d5c2e',
           padding:'0.5rem 0.8rem', fontSize:'0.82rem', marginBottom:'1rem' },
  link:  { textAlign:'center' as const, marginTop:'1.2rem', fontSize:'0.78rem', color:'#7a3318' },
}

export default function Registro() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function registrar(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setErro(''); setOk('')
    const { error } = await supabase.auth.signUp({ email, password: senha })
    if (error) { setErro(error.message); setLoading(false); return }
    setOk('Conta criada! Verifique seu email para confirmar, depois faça login.')
    setLoading(false)
  }

  return (
    <div style={g.page}>
      <link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet"/>
      <div style={g.card}>
        <div style={g.title}>MANDACARU</div>
        <div style={g.sub}>Novo Sobrevivente</div>
        {erro && <div style={g.err}>{erro}</div>}
        {ok   && <div style={g.ok}>{ok}</div>}
        {!ok && (
          <form onSubmit={registrar}>
            <label style={g.lbl}>Email</label>
            <input style={g.inp} type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
            <label style={g.lbl}>Senha (mínimo 6 caracteres)</label>
            <input style={g.inp} type="password" value={senha} onChange={e=>setSenha(e.target.value)} required minLength={6} />
            <button style={g.btn} disabled={loading}>{loading ? 'Criando…' : '✦ Criar Conta'}</button>
          </form>
        )}
        {ok && <a href="/auth/login" style={{...g.btn, display:'block', textAlign:'center', textDecoration:'none', marginTop:'1rem'}}>Ir para o Login</a>}
        <div style={g.link}>Já tem conta? <a href="/auth/login" style={{color:'#7a3318'}}>Entrar</a></div>
      </div>
    </div>
  )
}
