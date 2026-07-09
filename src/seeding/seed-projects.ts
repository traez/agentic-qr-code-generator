/* //src\seeding\seed-projects.ts
import { getPayload } from 'payload'
import config from '@/payload.config'

const payloadConfig = await config
const payload = await getPayload({ config: payloadConfig })

const projects = [
  {
    name: 'AI Coding Assistant',
    description:
      'An IDE extension providing real-time code completions, bug detection, and automated unit testing.',
    status: 'published' as const,
    metadata: { version: 1, techStack: ['TypeScript', 'Python', 'OpenAI API'] },
  },
  {
    name: 'Fitness Tracking App',
    description:
      'Mobile health companion featuring workout logging, macro tracking, and social challenges.',
    status: 'draft' as const,
    metadata: { version: 1, techStack: ['Flutter', 'Dart', 'MongoDB'] },
  },
  {
    name: 'Smart Home IoT Dashboard',
    description:
      'Centralized control system for residential IoT devices with real-time power consumption metrics.',
    status: 'published' as const,
    metadata: { version: 2, techStack: ['Nuxt.js', 'MQTT', 'InfluxDB'] },
  },
]

for (const project of projects) {
  await payload.create({
    collection: 'projects',
    data: project,
  })
  console.log(`Created: ${project.name}`)
}

console.log('Seeding complete!')
process.exit(0) */