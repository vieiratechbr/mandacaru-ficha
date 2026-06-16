'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const s: Record<string, React.CSSProperties> = {
  wrap:   { maxWidth:860, marginBottom:'1.5rem' },
  form:   { background:'#e8d9b8', border:'1.5px solid #3d5c2e', padding:'1.2rem 1.5rem', marginTop:'0.8rem' },
  label:  { display:'block', fontSize:'0.6rem', letterSpacing:'0.25em', color:'#7a3318',
            marginBottom:3, textTransform:'uppercase', fontFamily:'Georgia,serif' },
  input:  { width:'100%', background:'transparent', border:'none', borderBottom:'1px solid #b8a480',
            fontFamily:'Georgia,serif', fontSize:'0.95rem', color:'#2a1a0a', padding:'4px',
            outline:'none', marginBottom:'1rem', boxSizing:'border-box' as const },
  row:    { display:'flex', gap:'0.8rem' },
  ok:     { background:'#3d5c2e', color:'#e8d9b8', border:'1px solid #c49a3c', padding:'8px 20px',
            fontSize:'0.72rem', cursor:'pointer', letterSpacing:'0.2em', textTransform:'uppercase',
            fontFamily:'Georgia,serif' },
  cancel: { background:'transparent', color:'#b8a480', border:'1px solid #b8a480', padding:'8px 20px',
            fontSize:'0.72rem', cursor:'pointer', letterSpacing:'0.2em', fontFamily:'Georgia,serif' },
  newbtn: { background:'#3d5c2e', color:'#e8d9b8', border:'1px solid #c49a3c', padding:'8px 20px',
            fontSize:'0.78rem', cursor:'pointer', letterSpacing:'0.2em', textTransform:'uppercase',
            fontFamily:'Georgia,serif' },
}

export default function CriarMesaBtn() {
  const [aberto, setAberto] = useState(false)
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [loading, setLoading] = useState(false)
  const [criado, setCriado] = useState<{nome:string,codigo:string}|null>(null)
  const router = useRouter()
  const supabase = createClient()

  async function criar(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    const res = await fetch('/api/mesas', {
      method:'POST',
      headers:{ 'Content-Type':'application/json',
        'Authorization': `Bearer ${session?.access_token}` },
      body: JSON.stringify({ nome, descricao })
    })
    const data = await res.json()
    if (res.ok) {
      setCriado({ nome: data.nome, codigo: data.codigo })
      router.refresh()
    }
    setLoading(false)
  }

  if (criado) return (
    <div style={{ ...s.form, borderColor:'#3d5c2e', marginBottom:'1.5rem', maxWidth:860 }}>
      <div style={{ color:'#3d5c2e', fontFamily:'Georgia,serif', marginBottom:8 }}>
        ✦ Mesa <strong>{criado.nome}</strong> criada!
      </div>
      <div style={{ color:'#2a1a0a', fontSize:'0.9rem' }}>
        Código de convite: <strong style={{ letterSpacing:'0.15em' }}>{criado.codigo}</strong>
        <span style={{ color:'#b8a480', fontSize:'0.78rem', marginLeft:12 }}>
          Passe esse código para os jogadores se registrarem.
        </span>
      </div>
      <button style={{ ...s.ok, marginTop:12 }} onClick={() => { setCriado(null); setAberto(false); setNome(''); setDescricao('') }}>
        + Nova mesa
      </button>
    </div>
  )

  return (
    <div style={s.wrap}>
      {!aberto
        ? <button style={s.newbtn} onClick={() => setAberto(true)}>+ Criar nova mesa</button>
        : (
          <form style={s.form} onSubmit={criar}>
            <label style={s.label}>Nome da mesa</label>
            <input style={s.input} value={nome} onChange={e => setNome(e.target.value)} required placeholder="Ex: A Rota do Sertão"/>
            <label style={s.label}>Descrição (opcional)</label>
            <input style={s.input} value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Campanha de sobrevivência no sertão..."/>
            <div style={s.row}>
              <button style={s.ok} disabled={loading}>{loading ? 'Criando…' : '✦ Criar Mesa'}</button>
              <button style={s.cancel} type="button" onClick={() => setAberto(false)}>Cancelar</button>
            </div>
          </form>
        )}
    </div>
  )
}
