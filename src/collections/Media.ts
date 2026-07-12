//src\collections\Media.ts
import type { CollectionConfig } from 'payload'
import { validateFileName } from '@/hooks/media/validateFileName'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/png', 'image/svg+xml', 'image/jpeg', 'image/webp'],
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'public, max-age=2678400')
      return headers
    },
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description:
          'Upload a file with lowercase letters, numbers, and hyphens only. Max 50 characters.',
      },
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'Logo Upload', value: 'logo' },
        { label: 'Generated QR PNG', value: 'qr-png' },
        { label: 'Generated QR SVG', value: 'qr-svg' },
      ],
    },
  ],
  hooks: {
    beforeChange: [validateFileName],
  },
}
