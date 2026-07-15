//src\payload.config.ts
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { QRCodes } from './collections/QRCodes'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    autoRefresh: true, // stay logged in indefinitely while browser is open and on admin panel, by automatically refreshing auth token before it expires
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, QRCodes],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  upload: {
    limits: {
      fileSize: 2 * 1024 * 1024, // 2 MB
    },
    abortOnLimit: true, // immediately reject oversize files
  },
  plugins: [
    s3Storage({
      collections: {
        media: true, // Apply storage to 'media' collection
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET || '',
        },
        region: 'auto', // Cloudflare R2 uses 'auto' as the region
        endpoint: process.env.S3_ENDPOINT || '',
      },
    }),
  ],
})
