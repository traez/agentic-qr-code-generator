'use client'

import { useState, useEffect } from 'react'
import { listQRCodes } from '@/actions/qrcodes/listQRCodes'
import type { QrCode } from '@/payload-types'
import Card from './ui/Card'
import Modal from './ui/Modal'

export default function QRCodeGallery() {
  const [qrs, setQrs] = useState<QrCode[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedQr, setSelectedQr] = useState<QrCode | null>(null)
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    listQRCodes().then((docs) => {
      setQrs(docs)
      setLoading(false)
    })
    setOrigin(window.location.origin)
  }, [])

  if (loading) return null
  if (qrs.length === 0) return null

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-8">Saved QR Codes</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {qrs.map((qr) => (
          <Card key={qr.id} onClick={() => setSelectedQr(qr)}>
            <div className="aspect-square bg-muted flex items-center justify-center p-4">
              <p className="text-sm text-muted-foreground text-center break-all line-clamp-3">
                {qr.inputText}
              </p>
            </div>
            <div className="p-3 border-t border-border">
              <p className="text-xs text-muted-foreground truncate">{qr.inputText}</p>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={!!selectedQr} onClose={() => setSelectedQr(null)}>
        {selectedQr && (
          <div className="space-y-5">
            <div className="aspect-square bg-muted flex items-center justify-center rounded-lg">
              <span className="text-muted-foreground text-sm">QR Preview</span>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Text / URL</p>
              <p className="font-medium break-all">{selectedQr.inputText}</p>
            </div>

            {selectedQr.style && (
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">FG:</span>
                  <span
                    className="w-5 h-5 rounded border border-border"
                    style={{ backgroundColor: selectedQr.style.foregroundColor ?? '#000' }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">BG:</span>
                  <span
                    className="w-5 h-5 rounded border border-border"
                    style={{ backgroundColor: selectedQr.style.backgroundColor ?? '#fff' }}
                  />
                </div>
                <span className="text-muted-foreground">
                  Dot: <span className="text-foreground font-medium capitalize">{selectedQr.style.dotStyle ?? 'squares'}</span>
                </span>
                <span className="text-muted-foreground">
                  EC: <span className="text-foreground font-medium">{selectedQr.errorCorrectionLevel ?? 'M'}</span>
                </span>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <button disabled className="px-4 py-2 border border-border rounded text-sm bg-foreground text-background font-medium opacity-50 cursor-not-allowed">
                Download PNG
              </button>
              <button disabled className="px-4 py-2 border border-border rounded text-sm bg-foreground text-background font-medium opacity-50 cursor-not-allowed">
                Download SVG
              </button>
              <button disabled className="px-4 py-2 border border-border rounded text-sm bg-foreground text-background font-medium opacity-50 cursor-not-allowed">
                Copy to Clipboard
              </button>
            </div>

            {selectedQr.shareId && (
              <div className="pt-2">
                <p className="text-xs text-muted-foreground mb-1">Shareable link:</p>
                <a
                  href={`/share/${selectedQr.shareId}`}
                  className="text-sm text-primary underline break-all hover:text-primary/80"
                >
                  {origin}/share/{selectedQr.shareId}
                </a>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  )
}
