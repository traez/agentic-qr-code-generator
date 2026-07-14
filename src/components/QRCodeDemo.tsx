//src\components\QRCodeDemo.tsx
'use client'

import { useState } from 'react'
import QRCode from 'react-qr-code'

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

  function handleSubmit() {
    const trimmed = inputText.trim()
    if (trimmed) {
      setSubmittedValue(trimmed)
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
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!inputText.trim()}
              className="mt-2 w-full px-4 py-2 bg-foreground text-background font-medium rounded hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed border border-border"
            >
              Generate QR Code
            </button>
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
