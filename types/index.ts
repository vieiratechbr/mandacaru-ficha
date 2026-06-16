export interface Ficha {
  id: string
  jogador_id: string
  nome: string | null
  apelido: string | null
  passado: string | null
  faccao: string | null
  atr_for: number
  atr_agi: number
  atr_vig: number
  atr_int: number
  atr_pre: number
  sangue_max: number
  medo_max: number
  pericias: boolean[]
  desvantagens: string[]
  habilidades: string[]
  selada: boolean
  sangue_atual: number
  medo_atual: number
  bornal: string[]
  notas: string
  criada_em: string
  atualizada_em: string
}
