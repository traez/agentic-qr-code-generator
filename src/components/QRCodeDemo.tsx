//src\components\QRCodeDemo.tsx
'use client'
import { useState } from 'react'
import { QRCode } from 'react-qrcode-logo'
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
  const [dotStyle, setDotStyle] = useState<'squares' | 'dots' | 'fluid'>('squares')
  const [logoBase64, setLogoBase64] = useState<string | null>(null)
  const [logoFileName, setLogoFileName] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [savedShareId, setSavedShareId] = useState<string | null>(null)

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setLogoFileName(file.name)
    const reader = new FileReader()
    reader.onload = () => setLogoBase64(reader.result as string)
    reader.readAsDataURL(file)
    if (level === 'L') setLevel('M')
    e.target.value = ''
  }

  function handleRemoveLogo() {
    setLogoBase64(null)
    setLogoFileName(null)
  }

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

    let logoPayload: { data: string; filename: string; mimeType: string } | undefined
    if (logoBase64 && logoFileName) {
      const [header, rawData] = logoBase64.split(',')
      const mimeType = header.replace('data:', '').replace(';base64', '')
      logoPayload = { data: rawData, filename: logoFileName, mimeType }
    }

    const result: SaveQRCodeResult = await saveQRCode({
      inputText: trimmed,
      style: { foregroundColor: fgColor, backgroundColor: bgColor, dotStyle },
      errorCorrectionLevel: level,
      transparentBackground: bgColor === '#FFFFFF' ? false : true,
      ...(logoPayload ? { logo: logoPayload } : {}),
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
            <label className="block text-sm font-medium text-foreground mb-1">Dot Style</label>
            <div className="flex gap-4">
              {([{ label: 'Square', value: 'squares' }, { label: 'Rounded', value: 'dots' }, { label: 'Fluid', value: 'fluid' }] as const).map((s) => (
                <label key={s.value} className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="dotStyle"
                    value={s.value}
                    checked={dotStyle === s.value}
                    onChange={() => setDotStyle(s.value)}
                    className="accent-foreground"
                  />
                  <span className="text-sm text-foreground">{s.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Logo (optional)</label>
            {logoBase64 ? (
              <div className="flex items-center gap-3">
                <img src={logoBase64} alt="Logo" className="w-10 h-10 object-contain border border-border rounded" />
                <span className="text-sm text-muted-foreground truncate flex-1">{logoFileName}</span>
                <button type="button" onClick={handleRemoveLogo} className="text-sm text-red-600 hover:text-red-800">
                  Remove
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/png,image/svg+xml,image/jpeg"
                onChange={handleLogoUpload}
                className="w-full text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded file:border file:border-border file:text-sm file:bg-background file:text-foreground hover:file:bg-accent"
              />
            )}
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
              ecLevel={level}
              size={size}
              qrStyle={dotStyle}
              logoImage={logoBase64 ?? undefined}
              removeQrCodeBehindLogo
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
