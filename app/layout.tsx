import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'MANDACARU — Fichas de RPG',
  description: 'Sistema de fichas para o RPG Mandacaru',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, background: '#1a100a', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  )
}
