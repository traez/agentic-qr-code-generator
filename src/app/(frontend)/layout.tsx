//src\app\(frontend)\layout.tsx
import React from 'react'
import './styles.css'

export const metadata = {
  description: 'AI-agent-built QR Code Generator, powered by PayloadCMS',
  title: 'Agentic-Qr-Code-Generator',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
