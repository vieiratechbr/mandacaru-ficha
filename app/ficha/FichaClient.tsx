'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import type { Ficha } from '@/types'

const PERICIAS = [
  'Atletismo','Pontaria','Investigação','Briga','Furtividade','Mecânica',
  'Luta / Facão','Manejo','Remédio','Resistência','Sobrevivência','Lábia',
  'Intimidação','Misticismo','Intuição'
]
const BORNAL_ICONS = ['🔧','🍖','💊','🗡️','🔦','📦','🧪','🪢','🪬','📜']

interface Props {
  fichaInicial: Ficha | null
  fichaId: string | null
  isAdmin: boolean
}

declare global { interface Window { html2pdf: any } }

export default function FichaClient({ fichaInicial, fichaId, isAdmin }: Props) {
  const [ficha, setFicha] = useState<Ficha | null>(fichaInicial)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [modalConfirm, setModalConfirm] = useState(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout>>()
  const supabase = createClient()

  const selada = ficha?.selada ?? false
  const podeEditarFixos = isAdmin || !selada

  // Carrega html2pdf via script tag
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.html2pdf) {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
      document.head.appendChild(script)
    }
  }, [])

  const autosave = useCallback(async (dados: Partial<Ficha>) => {
    if (!fichaId) return
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      setSaving(true)
      await fetch('/api/fichas', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: fichaId, ...dados })
      })
      setSaving(false); setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 800)
  }, [fichaId])

  function setField(campo: keyof Ficha, valor: any) {
    setFicha(prev => {
      if (!prev) return prev
      const novo = { ...prev, [campo]: valor }
      autosave({ [campo]: valor })
      return novo
    })
  }

  async function selarFicha() {
    if (!fichaId) return
    await fetch('/api/fichas', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: fichaId, selada: true })
    })
    setFicha(prev => prev ? { ...prev, selada: true } : prev)
    setModalConfirm(false)
  }

  async function exportarPDF() {
    if (!window.html2pdf) {
      alert('Aguarde o carregamento da biblioteca de PDF.')
      return
    }
    const el = document.getElementById('ficha-sheet')!

    // Salva estilos originais
    const origMaxWidth = el.style.maxWidth
    const origWidth    = el.style.width
    const origShadow   = el.style.boxShadow

    // Força largura A4 exata para o html2canvas capturar sem cortar
    el.style.maxWidth  = '794px'
    el.style.width     = '794px'
    el.style.boxShadow = 'none'

    await window.html2pdf().set({
      margin: [8, 8, 8, 8],
      filename: `Mandacaru_${ficha?.nome ?? 'Sobrevivente'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: '#e8d9b8',
        windowWidth: 794,
        scrollX: 0,
        scrollY: 0,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    }).from(el).save()

    // Restaura estilos
    el.style.maxWidth  = origMaxWidth
    el.style.width     = origWidth
    el.style.boxShadow = origShadow
  }

  const cs = {
    page:  { minHeight:'100vh', background:'#1a100a', display:'flex', justifyContent:'center',
             padding:'2rem 1rem 6rem', fontFamily:"'Special Elite',serif" },
    sheet: { width:'100%', maxWidth:820, background:'#e8d9b8',
             backgroundImage:'linear-gradient(160deg,#f0e2c0 0%,#e2d0a0 40%,#d4bc8c 100%)',
             border:'3px solid #7a3318',
             boxShadow:'0 0 0 6px #1a100a,0 0 0 9px #7a3318,0 20px 60px rgba(0,0,0,.8)',
             padding:'2.5rem 2.8rem 3rem', position:'relative' as const },
    header:{ textAlign:'center' as const, borderBottom:'2px solid #7a3318', paddingBottom:'1.2rem', marginBottom:'1.8rem' },
    title: { fontFamily:'Georgia,serif', fontSize:'clamp(2rem,5vw,3.2rem)', color:'#7a3318', letterSpacing:'0.1em', lineHeight:1 },
    sub:   { fontSize:'0.75rem', letterSpacing:'0.35em', color:'#b8a480', textTransform:'uppercase' as const, marginTop:'0.4rem' },
    sTitle:{ fontFamily:'Georgia,serif', fontSize:'0.65rem', letterSpacing:'0.4em', textTransform:'uppercase' as const,
             color:'#7a3318', borderBottom:'1px solid #7a3318', paddingBottom:3, marginBottom:'1rem',
             display:'flex', justifyContent:'space-between', alignItems:'center' },
    sec:   { marginBottom:'1.8rem' },
    label: { display:'block', fontFamily:'Georgia,serif', fontSize:'0.6rem', letterSpacing:'0.25em',
             textTransform:'uppercase' as const, color:'#7a3318', marginBottom:2 },
    inp:   (locked: boolean): React.CSSProperties => ({
             width:'100%', background:'transparent', border:'none',
             borderBottom: locked ? 'none' : '1px solid #b8a480',
             fontFamily:"'Special Elite',Georgia,serif", fontSize:'0.92rem',
             color:'#2a1a0a', padding:'2px 4px', outline:'none',
             opacity: locked ? 0.8 : 1, cursor: locked ? 'not-allowed' : 'text' }),
    twoCol:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 2rem' },
    fld:   { marginBottom:'0.85rem' },
    attrG: { display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'0.8rem' },
    attrB: { display:'flex', flexDirection:'column' as const, alignItems:'center',
             border:'1.5px solid #7a3318', padding:'0.6rem 0.3rem 0.4rem', background:'rgba(122,51,24,0.05)' },
    attrA: { fontFamily:'Georgia,serif', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.2em', color:'#7a3318' },
    attrN: { fontFamily:'Georgia,serif', fontSize:'0.45rem', color:'#b8a480', letterSpacing:'0.15em', marginBottom:'0.4rem' },
    numI:  (locked: boolean): React.CSSProperties => ({
             width:'2.8rem', textAlign:'center', background: locked ? '#c8b898' : '#d4c49a',
             border:'1px solid #b8a480', fontFamily:'Georgia,serif', fontSize:'1.3rem',
             color:'#2a1a0a', padding:2, outline:'none', cursor: locked ? 'not-allowed' : 'text' }),
    resG:  { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' },
    resB:  { border:'1.5px solid #7a3318', padding:'0.8rem', background:'rgba(122,51,24,0.04)' },
    resL:  { fontFamily:'Georgia,serif', fontSize:'0.6rem', letterSpacing:'0.3em', color:'#7a3318', marginBottom:'0.6rem', textAlign:'center' as const },
    resF:  { display:'flex', gap:'1rem', justifyContent:'center' },
    resP:  { textAlign:'center' as const },
    resPL: { display:'block', fontFamily:'Georgia,serif', fontSize:'0.5rem', letterSpacing:'0.2em', color:'#b8a480', marginBottom:2 },
    resI:  (locked: boolean): React.CSSProperties => ({
             width:'3.5rem', textAlign:'center', background: locked ? '#c8b898' : '#d4c49a',
             border:'1px solid #b8a480', fontFamily:"'Special Elite',serif", fontSize:'1.2rem',
             color:'#2a1a0a', padding:2, outline:'none', cursor: locked ? 'not-allowed' : 'text' }),
    dotW:  { display:'flex', flexWrap:'wrap' as const, gap:5, justifyContent:'center', marginTop:'0.8rem' },
    dot:   (filled: boolean, type: 'sangue'|'medo'): React.CSSProperties => ({
             width:18, height:18, borderRadius:'50%',
             border: `1.5px solid ${type==='sangue'?'#7a3318':'#4a3a7a'}`,
             background: filled ? (type==='sangue'?'#8b1a1a':'#4a3a7a') : 'transparent',
             cursor:'pointer' }),
    perG:  { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.4rem 1.5rem' },
    perI:  (locked: boolean): React.CSSProperties => ({
             display:'flex', alignItems:'center', gap:'0.5rem',
             cursor: locked ? 'not-allowed' : 'pointer', opacity: locked ? 0.8 : 1 }),
    chk:   (checked: boolean): React.CSSProperties => ({
             width:16, height:16, border:'1.5px solid #7a3318', flexShrink:0,
             display:'flex', alignItems:'center', justifyContent:'center',
             background: checked ? '#7a3318' : 'transparent', color:'#e8d9b8', fontSize:'0.7rem' }),
    listN: { listStyle:'none', padding:0 },
    listI: { display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'0.5rem', color:'#7a3318', fontFamily:'Georgia,serif', fontSize:'0.65rem' },
    listIn:(locked: boolean): React.CSSProperties => ({
             flex:1, background:'transparent', border:'none',
             borderBottom: locked ? 'none' : '1px solid #b8a480',
             fontFamily:"'Special Elite',serif", fontSize:'0.88rem',
             color:'#2a1a0a', outline:'none', padding:'2px 4px',
             opacity: locked ? 0.8 : 1, cursor: locked ? 'not-allowed' : 'text' }),
    slot:  { display:'flex', alignItems:'center', gap:'0.5rem', padding:'0.3rem 0', borderBottom:'1px solid #b8a480' },
    slotN: { fontFamily:'Georgia,serif', fontSize:'0.6rem', color:'#7a3318', minWidth:'1.2rem', textAlign:'right' as const },
    slotIn:{ flex:1, background:'transparent', border:'none', fontFamily:"'Special Elite',serif", fontSize:'0.88rem', color:'#2a1a0a', outline:'none' },
    notes: { width:'100%', background:'rgba(122,51,24,0.04)', border:'1px solid #b8a480',
             fontFamily:"'Special Elite',serif", fontSize:'0.88rem', color:'#2a1a0a',
             padding:'0.6rem', outline:'none', resize:'vertical' as const, minHeight:80 },
    confBan:{ background:'rgba(61,92,46,0.1)', border:'1.5px solid #3d5c2e', padding:'1rem 1.2rem',
              marginBottom:'1.8rem', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem', flexWrap:'wrap' as const },
    confP: { fontFamily:'Georgia,serif', fontStyle:'italic', fontSize:'0.82rem', color:'#3d5c2e', flex:1 },
    confBtn:{ background:'#3d5c2e', color:'#e8d9b8', border:'2px solid #c49a3c', padding:'0.55rem 1.2rem',
              fontFamily:'Georgia,serif', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase' as const, cursor:'pointer' },
    seladoBadge:{ fontFamily:'Georgia,serif', fontSize:'0.65rem', letterSpacing:'0.2em', color:'#3d5c2e',
                  padding:'0.4rem 0.8rem', border:'1px solid #3d5c2e', marginBottom:'1.8rem', display:'inline-block' },
    mOvr:  { position:'fixed' as const, inset:0, background:'rgba(0,0,0,0.75)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center' },
    mBox:  { background:'#e8d9b8', border:'2px solid #7a3318', boxShadow:'0 0 0 4px #1a100a,0 0 0 6px #7a3318', padding:'2rem 2.4rem', maxWidth:420, width:'90%', textAlign:'center' as const },
    mH2:   { fontFamily:'Georgia,serif', fontSize:'1.1rem', color:'#7a3318', marginBottom:'0.8rem' },
    mP:    { fontFamily:'Georgia,serif', fontStyle:'italic', fontSize:'0.88rem', color:'#2a1a0a', marginBottom:'1.4rem', lineHeight:1.5 },
    mRow:  { display:'flex', gap:'1rem', justifyContent:'center' },
    mOk:   { background:'#7a3318', color:'#e8d9b8', border:'2px solid #c49a3c', padding:'0.55rem 1.4rem', fontFamily:'Georgia,serif', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase' as const, cursor:'pointer' },
    mCan:  { background:'transparent', color:'#b8a480', border:'1.5px solid #b8a480', padding:'0.55rem 1.4rem', fontFamily:'Georgia,serif', fontSize:'0.65rem', letterSpacing:'0.2em', cursor:'pointer' },
    fBar:  { position:'fixed' as const, bottom:'2rem', right:'2rem', zIndex:999 },
    fBtn:  { display:'flex', alignItems:'center', gap:'0.6rem', background:'#7a3318', color:'#e8d9b8',
              border:'2px solid #c49a3c', padding:'0.75rem 1.4rem', fontFamily:'Georgia,serif',
              fontSize:'0.75rem', letterSpacing:'0.2em', textTransform:'uppercase' as const,
              cursor:'pointer', boxShadow:'0 4px 20px rgba(0,0,0,.5)' },
    saveInd:{ position:'fixed' as const, bottom:'2rem', left:'2rem', fontFamily:'Georgia,serif',
               fontSize:'0.55rem', letterSpacing:'0.15em', color:'#3d5c2e', transition:'opacity 0.3s',
               opacity: saving || saved ? 1 : 0 },
    bkBtn: { position:'fixed' as const, top:'1rem', left:'1rem', color:'#b8a480', fontSize:'0.72rem',
              background:'none', border:'1px solid #b8a480', padding:'6px 14px', cursor:'pointer',
              fontFamily:'Georgia,serif', letterSpacing:'0.15em', textDecoration:'none', display:'inline-block' },
    adminB:{ background:'rgba(139,26,26,0.12)', border:'1.5px solid #8b1a1a', padding:'0.7rem 1rem',
              marginBottom:'1.8rem', color:'#8b1a1a', fontFamily:'Georgia,serif', fontStyle:'italic', fontSize:'0.82rem' },
    lockBadge: { fontSize:'0.5rem', color:'#3d5c2e', border:'1px solid #3d5c2e', padding:'1px 6px' },
  }

  if (!ficha) return (
    <div style={{ ...cs.page, alignItems:'center' }}>
      <div style={{ color:'#b8a480', fontFamily:'Georgia,serif', fontSize:'1rem' }}>
        Nenhuma ficha encontrada.
      </div>
    </div>
  )

  const sangueAtual = ficha.sangue_atual ?? 0
  const sangueMax   = ficha.sangue_max   ?? 0
  const medoAtual   = ficha.medo_atual   ?? 0
  const medoMax     = ficha.medo_max     ?? 0

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet"/>
      <a style={cs.bkBtn} href={isAdmin ? '/dashboard/admin' : '/'}>← Voltar</a>
      <div style={cs.saveInd}>{saving ? '💾 Salvando…' : '✦ Salvo'}</div>

      {modalConfirm && (
        <div style={cs.mOvr}>
          <div style={cs.mBox}>
            <div style={cs.mH2}>Gravar na Pedra?</div>
            <p style={cs.mP}>
              Uma vez selada, os dados de origem não poderão mais ser alterados.<br/>
              Vida, medo e equipamentos continuam editáveis.<br/><br/>
              Selar o destino deste sobrevivente?
            </p>
            <div style={cs.mRow}>
              <button style={cs.mCan} onClick={() => setModalConfirm(false)}>Ainda não</button>
              <button style={cs.mOk} onClick={selarFicha}>Selar o Destino</button>
            </div>
          </div>
        </div>
      )}

      <div style={cs.page}>
        <div id="ficha-sheet" style={cs.sheet}>

          {isAdmin && <div style={cs.adminB}>👁 Modo Mestre — editando ficha do jogador</div>}

          <div style={cs.header}>
            <div style={{ display:'flex', justifyContent:'center', gap:'1rem', fontSize:'1.4rem', opacity:0.6, marginBottom:'0.4rem' }}>🌵 ☀️ 🌵 ☀️ 🌵</div>
            <div style={cs.title}>MANDACARU</div>
            <div style={cs.sub}>Ficha de Registro de Sobrevivente</div>
          </div>

          {!selada && !isAdmin && (
            <div style={cs.confBan}>
              <p style={cs.confP}>Preencha todos os campos e confirme quando estiver pronto. <strong>Dados de origem serão travados permanentemente.</strong></p>
              <button style={cs.confBtn} onClick={() => setModalConfirm(true)}>✦ Confirmar Ficha</button>
            </div>
          )}
          {selada && !isAdmin && <div style={cs.seladoBadge}>🔒 Ficha selada — dados de origem permanentes</div>}

          {/* Dados Pessoais */}
          <div style={cs.sec}>
            <div style={cs.sTitle}>
              <span>⟡ Dados Pessoais ⟡</span>
              {selada && !isAdmin && <span style={cs.lockBadge}>🔒 SELADO</span>}
            </div>
            <div style={cs.twoCol}>
              {(['nome','apelido','passado','faccao'] as const).map((key, i) => (
                <div key={key} style={cs.fld}>
                  <label style={cs.label}>{['Nome','Apelido','Passado / Origem','Facção Aliada'][i]}</label>
                  <input style={cs.inp(!podeEditarFixos)} value={(ficha as any)[key] ?? ''}
                    readOnly={!podeEditarFixos}
                    onChange={e => podeEditarFixos && setField(key, e.target.value)} />
                </div>
              ))}
            </div>
          </div>

          {/* Atributos */}
          <div style={cs.sec}>
            <div style={cs.sTitle}>
              <span>⟡ Atributos Core ⟡</span>
              {selada && !isAdmin && <span style={cs.lockBadge}>🔒 SELADO</span>}
            </div>
            <div style={cs.attrG}>
              {(['atr_for','atr_agi','atr_vig','atr_int','atr_pre'] as const).map((key, i) => (
                <div key={key} style={cs.attrB}>
                  <span style={cs.attrA}>{['FOR','AGI','VIG','INT','PRE'][i]}</span>
                  <span style={cs.attrN}>{['Força','Agilidade','Vigor','Intelecto','Presença'][i]}</span>
                  <input type="number" min={0} max={20} style={cs.numI(!podeEditarFixos)}
                    value={ficha[key] ?? 0} readOnly={!podeEditarFixos}
                    onChange={e => podeEditarFixos && setField(key, +e.target.value)} />
                </div>
              ))}
            </div>
          </div>

          {/* Recursos */}
          <div style={cs.sec}>
            <div style={cs.sTitle}><span>⟡ Recursos ⟡</span></div>
            <div style={cs.resG}>
              {/* Sangue */}
              <div style={cs.resB}>
                <div style={cs.resL}>🩸 Sangue (Vida)</div>
                <div style={cs.resF}>
                  <div style={cs.resP}>
                    <span style={cs.resPL}>Máx (inicial)</span>
                    <input type="number" min={0} max={30} style={cs.resI(!podeEditarFixos)}
                      value={sangueMax} readOnly={!podeEditarFixos}
                      onChange={e => podeEditarFixos && setField('sangue_max', +e.target.value)} />
                  </div>
                  <div style={cs.resP}>
                    <span style={cs.resPL}>Atual ✎</span>
                    <input type="number" min={0} max={sangueMax} style={cs.resI(false)}
                      value={sangueAtual}
                      onChange={e => setField('sangue_atual', Math.min(+e.target.value, sangueMax))} />
                  </div>
                </div>
                <div style={cs.dotW}>
                  {Array.from({ length: sangueMax }, (_, i) => (
                    <div key={i} style={cs.dot(i < sangueAtual, 'sangue')}
                      onClick={() => setField('sangue_atual', sangueAtual === i+1 ? i : i+1)} />
                  ))}
                </div>
              </div>
              {/* Medo */}
              <div style={cs.resB}>
                <div style={cs.resL}>👁 Medo (Sanidade)</div>
                <div style={cs.resF}>
                  <div style={cs.resP}>
                    <span style={cs.resPL}>Limiar (inicial)</span>
                    <input type="number" min={0} max={20} style={cs.resI(!podeEditarFixos)}
                      value={medoMax} readOnly={!podeEditarFixos}
                      onChange={e => podeEditarFixos && setField('medo_max', +e.target.value)} />
                  </div>
                  <div style={cs.resP}>
                    <span style={cs.resPL}>Atual ✎</span>
                    <input type="number" min={0} max={medoMax} style={cs.resI(false)}
                      value={medoAtual}
                      onChange={e => setField('medo_atual', Math.min(+e.target.value, medoMax))} />
                  </div>
                </div>
                <div style={cs.dotW}>
                  {Array.from({ length: medoMax }, (_, i) => (
                    <div key={i} style={cs.dot(i < medoAtual, 'medo')}
                      onClick={() => setField('medo_atual', medoAtual === i+1 ? i : i+1)} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Perícias */}
          <div style={cs.sec}>
            <div style={cs.sTitle}>
              <span>⟡ Perícias Calejadas ⟡</span>
              {selada && !isAdmin && <span style={cs.lockBadge}>🔒 SELADO</span>}
            </div>
            <div style={cs.perG}>
              {PERICIAS.map((p, i) => {
                const checked = ficha.pericias?.[i] ?? false
                const locked = !podeEditarFixos
                return (
                  <div key={p} style={cs.perI(locked)}
                    onClick={() => {
                      if (locked) return
                      const arr = [...(ficha.pericias ?? Array(15).fill(false))]
                      arr[i] = !arr[i]
                      setField('pericias', arr)
                    }}>
                    <div style={cs.chk(checked)}>{checked && '✕'}</div>
                    <span style={{ fontFamily:"'Special Elite',serif", fontSize:'0.82rem', color:'#2a1a0a' }}>{p}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Tragédias e Talentos */}
          <div style={cs.sec}>
            <div style={cs.sTitle}>
              <span>⟡ Tragédias e Talentos ⟡</span>
              {selada && !isAdmin && <span style={cs.lockBadge}>🔒 SELADO</span>}
            </div>
            <div style={cs.twoCol}>
              <div>
                <div style={{ fontFamily:'Georgia,serif', fontSize:'0.6rem', letterSpacing:'0.2em', color:'#7a3318', marginBottom:'0.5rem' }}>DESVANTAGENS</div>
                <ol style={cs.listN}>
                  {[0,1].map(i => (
                    <li key={i} style={cs.listI}>
                      <span>{i+1}.</span>
                      <input style={cs.listIn(!podeEditarFixos)} value={ficha.desvantagens?.[i] ?? ''} readOnly={!podeEditarFixos}
                        onChange={e => { if (!podeEditarFixos) return; const arr=[...(ficha.desvantagens??['',''])]; arr[i]=e.target.value; setField('desvantagens',arr) }} />
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <div style={{ fontFamily:'Georgia,serif', fontSize:'0.6rem', letterSpacing:'0.2em', color:'#7a3318', marginBottom:'0.5rem' }}>HABILIDADES</div>
                <ol style={cs.listN}>
                  {[0,1,2].map(i => (
                    <li key={i} style={cs.listI}>
                      <span>{i+1}.</span>
                      <input style={cs.listIn(!podeEditarFixos)} value={ficha.habilidades?.[i] ?? ''} readOnly={!podeEditarFixos}
                        onChange={e => { if (!podeEditarFixos) return; const arr=[...(ficha.habilidades??['','',''])]; arr[i]=e.target.value; setField('habilidades',arr) }} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Bornal */}
          <div style={cs.sec}>
            <div style={cs.sTitle}><span>⟡ Bornal de Carga ✎</span></div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.5rem 2rem' }}>
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} style={cs.slot}>
                  <span style={cs.slotN}>{String(i+1).padStart(2,'0')}</span>
                  <span style={{ fontSize:'0.9rem', opacity:0.5 }}>{BORNAL_ICONS[i]}</span>
                  <input style={cs.slotIn} placeholder="vazio…" value={ficha.bornal?.[i] ?? ''}
                    onChange={e => { const arr=[...(ficha.bornal??Array(10).fill(''))]; arr[i]=e.target.value; setField('bornal',arr) }} />
                </div>
              ))}
            </div>
          </div>

          {/* Notas */}
          <div style={cs.sec}>
            <div style={cs.sTitle}><span>⟡ Anotações ✎</span></div>
            <textarea style={cs.notes} placeholder="Histórico, segredos, dívidas de sangue…"
              value={ficha.notas ?? ''}
              onChange={e => setField('notas', e.target.value)} />
          </div>

          <div style={{ textAlign:'center', color:'#7a3318', opacity:0.5, letterSpacing:'0.5em', margin:'0.3rem 0 1rem' }}>✦ ✦ ✦</div>
          <div style={{ textAlign:'center', fontFamily:'Georgia,serif', fontStyle:'italic', fontSize:'0.72rem', color:'#b8a480', opacity:0.7 }}>
            "No sertão ressecado, só sobrevive quem sabe esperar a chuva — ou fazer chover."
          </div>

        </div>
      </div>

      <div style={cs.fBar}>
        <button style={cs.fBtn} onClick={exportarPDF}>↓ Exportar PDF</button>
      </div>
    </>
  )
}
