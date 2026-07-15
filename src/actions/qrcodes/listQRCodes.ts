'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { QrCode } from '@/payload-types'

export async function listQRCodes(): Promise<QrCode[]> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'qr-codes',
    sort: '-createdAt',
    depth: 1,
  })
  return docs as QrCode[]
}
