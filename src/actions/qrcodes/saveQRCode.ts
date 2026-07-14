'use server'
import { getPayload } from 'payload'
import config from '@payload-config'

export type SaveQRCodeInput = {
  inputText: string
  style: {
    foregroundColor: string
    backgroundColor: string
  }
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H'
  transparentBackground: boolean
}

export type SaveQRCodeResult =
  | { ok: true; doc: { id: number | string; shareId: string } }
  | { ok: false; error: string }

export async function saveQRCode(data: SaveQRCodeInput): Promise<SaveQRCodeResult> {
  try {
    const payload = await getPayload({ config })

    const doc = await payload.create({
      collection: 'qr-codes',
      data: {
        inputText: data.inputText,
        style: {
          foregroundColor: data.style.foregroundColor,
          backgroundColor: data.style.backgroundColor,
        },
        errorCorrectionLevel: data.errorCorrectionLevel,
        transparentBackground: data.transparentBackground,
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
