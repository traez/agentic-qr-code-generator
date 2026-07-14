//src\components\QRCodeDemo.tsx
'use client'

import { useState } from 'react'
import QRCode from 'react-qr-code'
import { saveQRCode, type SaveQRCodeResult } from '@/actions/qrcodes/saveQRCode'

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

const LEVELS = [
  { label: 'L (7%)', value: 'L' },
  { label: 'M (15%)', value: 'M' },
  { label: 'Q (25%)', value: 'Q' },
  { label: 'H (30%)', value: 'H' },
] as const

export default function QRCodeDemo() {
  const [inputText, setInputText] = useState('')
  const [submittedValue, setSubmittedValue] = useState<string | null>(null)
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [level, setLevel] = useState<'L' | 'M' | 'Q' | 'H'>('L')
  const [size, setSize] = useState(256)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [savedShareId, setSavedShareId] = useState<string | null>(null)

  function handleGenerateOnly() {
    const trimmed = inputText.trim()
    if (trimmed) {
      setSubmittedValue(trimmed)
      setSaveStatus('idle')
      setSavedShareId(null)
    }
  }

  async function handleGenerateAndSave() {
    const trimmed = inputText.trim()
    if (!trimmed) return
    setSubmittedValue(trimmed)
    setSaveStatus('saving')
    setSavedShareId(null)

    const result: SaveQRCodeResult = await saveQRCode({
      inputText: trimmed,
      style: { foregroundColor: fgColor, backgroundColor: bgColor },
      errorCorrectionLevel: level,
      transparentBackground: bgColor === '#FFFFFF' ? false : true,
    })

    if (result.ok) {
      setSaveStatus('saved')
      setSavedShareId(result.doc.shareId)
    } else {
      setSaveStatus('error')
    }
  }

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-8">QR Code Demo</h2>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex flex-col gap-4 w-full max-w-md">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Text or URL</label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text or URL..."
              className="w-full border border-border rounded px-3 py-2 bg-background text-foreground"
            />
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={handleGenerateOnly}
                disabled={!inputText.trim()}
                className="flex-1 px-4 py-2 bg-foreground text-background font-medium rounded hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed border border-border"
              >
                Generate QR Code
              </button>
              <button
                type="button"
                onClick={handleGenerateAndSave}
                disabled={!inputText.trim() || saveStatus === 'saving'}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground font-medium rounded hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed border border-border"
              >
                {saveStatus === 'saving' ? 'Saving...' : 'Generate & Save'}
              </button>
            </div>
            {saveStatus === 'saved' && savedShareId && (
              <p className="mt-1 text-xs text-green-600">
                Saved — Share ID: <span className="font-mono">{savedShareId}</span>
              </p>
            )}
            {saveStatus === 'error' && (
              <p className="mt-1 text-xs text-red-600">Failed to save. Try again.</p>
            )}
          </div>

          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Foreground</label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-12 h-10 p-0.5 border border-border rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Background</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-12 h-10 p-0.5 border border-border rounded cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Error Correction
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
              className="w-full border border-border rounded px-3 py-2 bg-background text-foreground"
            >
              {LEVELS.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Size: {size}px</label>
            <input
              type="range"
              min="128"
              max="512"
              step="16"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex-shrink-0 border border-border rounded-lg p-4 bg-white">
          {submittedValue ? (
            <QRCode
              value={submittedValue}
              fgColor={fgColor}
              bgColor={bgColor}
              level={level}
              size={size}
            />
          ) : (
            <div
              className="flex items-center justify-center text-muted-foreground"
              style={{ width: size, height: size }}
            >
              Enter text and click Generate
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
