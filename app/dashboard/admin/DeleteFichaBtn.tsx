'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteFichaBtn({ fichaId, nome }: { fichaId: string, nome: string }) {
  const [confirmando, setConfirmando] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function deletar() {
    setLoading(true)
    const res = await fetch(`/api/admin/fichas?id=${fichaId}`, { method: 'DELETE' })
    if (res.ok) {
      router.refresh()
    } else {
      alert('Erro ao deletar ficha.')
      setLoading(false)
    }
  }

  const s: Record<string, React.CSSProperties> = {
    btn:    { background:'none', border:'1px solid #8b1a1a', color:'#8b1a1a', fontSize:'0.65rem',
              letterSpacing:'0.15em', padding:'3px 10px', cursor:'pointer', fontFamily:'Georgia,serif' },
    cancel: { background:'none', border:'1px solid #b8a480', color:'#b8a480', fontSize:'0.65rem',
              letterSpacing:'0.15em', padding:'3px 10px', cursor:'pointer', fontFamily:'Georgia,serif' },
    confirm:{ background:'#8b1a1a', border:'1px solid #8b1a1a', color:'#e8d9b8', fontSize:'0.65rem',
              letterSpacing:'0.15em', padding:'3px 10px', cursor:'pointer', fontFamily:'Georgia,serif' },
    row:    { display:'flex', gap:'0.4rem', alignItems:'center' },
    warn:   { color:'#8b1a1a', fontSize:'0.65rem', fontStyle:'italic' },
  }

  if (!confirmando) {
    return (
      <button style={s.btn} onClick={() => setConfirmando(true)}>
        Deletar
      </button>
    )
  }

  return (
    <div style={s.row}>
      <span style={s.warn}>Deletar "{nome}"?</span>
      <button style={s.confirm} onClick={deletar} disabled={loading}>
        {loading ? '…' : 'Sim'}
      </button>
      <button style={s.cancel} onClick={() => setConfirmando(false)}>
        Não
      </button>
    </div>
  )
}
