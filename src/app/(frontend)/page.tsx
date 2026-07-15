//src\app\(frontend)\page.tsx
import Link from 'next/link'
import QRCodeDemo from '@/components/QRCodeDemo'
import QRCodeGallery from '@/components/QRCodeGallery'

export default function HomePage() {
  return (
    <div className="w-full h-auto mx-auto">
      <QRCodeDemo />
      <QRCodeGallery />
      <footer className="text-foreground text-sm font-bold p-4 mx-auto flex flex-row justify-center items-center gap-2">
        ©{new Date().getFullYear()}{' '}
        <Link
          href="https://github.com/traez/agentic-qr-code-generator"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link/70 transition-all duration-200 hover:-translate-y-0.5 inline-block"
        >
          Zeeofor Technologies
        </Link>{' '}
        | All rights reserved.{' '}
        <Link
          href="/admin"
          className="text-link hover:text-link/70 transition-all duration-200 hover:-translate-y-0.5 inline-block"
        >
          (Admin)
        </Link>
      </footer>
    </div>
  )
}
