'use server'
import { getPayload } from 'payload'
import config from '@payload-config'

export type SaveQRCodeInput = {
  inputText: string
  style: {
    foregroundColor: string
    backgroundColor: string
    dotStyle: 'squares' | 'dots' | 'fluid'
  }
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H'
  transparentBackground: boolean
  logo?: {
    data: string
    filename: string
    mimeType: string
  }
}

export type SaveQRCodeResult =
  | { ok: true; doc: { id: number | string; shareId: string } }
  | { ok: false; error: string }

function sanitizeFilename(filename: string): string {
  const extIdx = filename.lastIndexOf('.')
  const name = extIdx > 0 ? filename.slice(0, extIdx) : filename
  const ext = extIdx > 0 ? filename.slice(extIdx) : ''
  const clean = name
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50)
  return clean || 'logo' + ext
}

export async function saveQRCode(data: SaveQRCodeInput): Promise<SaveQRCodeResult> {
  try {
    const payload = await getPayload({ config })

    let logoId: number | undefined

    if (data.logo) {
      const buffer = Buffer.from(data.logo.data, 'base64')
      const sanitized = sanitizeFilename(data.logo.filename)

      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: sanitized.replace(/\.[^/.]+$/, ''),
          kind: 'logo',
        },
        file: {
          data: buffer,
          mimetype: data.logo.mimeType,
          name: sanitized,
          size: buffer.length,
        },
      })

      logoId = mediaDoc.id
    }

    const doc = await payload.create({
      collection: 'qr-codes',
      data: {
        inputText: data.inputText,
        style: {
          foregroundColor: data.style.foregroundColor,
          backgroundColor: data.style.backgroundColor,
          dotStyle: data.style.dotStyle,
        },
        errorCorrectionLevel: data.errorCorrectionLevel,
        transparentBackground: data.transparentBackground,
        ...(logoId !== undefined ? { logo: logoId } : {}),
      },
    })

    return {
      ok: true,
      doc: { id: doc.id, shareId: doc.shareId as string },
    }
  } catch (error) {
    console.error('❌ [saveQRCode] Failed to save QR code:', error)
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
