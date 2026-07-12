// src\seeding\update-serial-numbers.ts
import { getPayload } from 'payload'
import config from '@/payload.config'

async function updateSerialNumbers() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Find all projects that need serial numbers (those with TEMP-SERIAL)
  const { docs: projects } = await payload.find({
    collection: 'projects',
    limit: 1000,
    where: {
      serialNumber: {
        equals: 'TEMP-SERIAL',
      },
    },
  })

  console.log(`Found ${projects.length} projects to update`)

  // Get today's date in DDMMYYYY format
  function getDateString(): string {
    const now = new Date()
    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = now.getFullYear()
    return `${day}${month}${year}`
  }

  // Generate 4 random characters (letters and numbers)
  function generateRandomChars(length: number = 4): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const dateString = getDateString()
  console.log(`Using date: ${dateString}`)

  for (const project of projects) {
    const random = generateRandomChars(4)
    const serialNumber = `PRJ-${dateString}-${random}`

    await payload.update({
      collection: 'projects',
      id: project.id,
      data: {
        serialNumber,
      },
    })

    console.log(`Updated ${project.name} -> ${serialNumber}`)
  }

  console.log('All serial numbers updated!')
  process.exit(0)
}

await updateSerialNumbers().catch((error) => {
  console.error('Update failed:', error)
  process.exit(1)
})
