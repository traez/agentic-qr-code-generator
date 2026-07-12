// src\hooks\media\validateFileName.ts
import type { CollectionBeforeChangeHook } from 'payload'

export const validateFileName: CollectionBeforeChangeHook = async ({ data }) => {
  const file = data.filename // assuming 'filename' is the field that stores the uploaded file name

  if (!file) return data

  // remove extension first
  const nameWithoutExt = file.replace(/\.[^/.]+$/, '')

  // validation regex: lowercase letters, numbers, hyphens, max 50 chars
  const valid = /^[a-z0-9-]{1,50}$/.test(nameWithoutExt)

  if (!valid) {
    throw new Error(
      'Invalid filename. Use only lowercase letters, numbers, and hyphens. Max 50 characters.',
    )
  }

  return data
}
