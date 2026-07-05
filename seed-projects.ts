import { getPayload } from 'payload'
import config from '@/payload.config'

const payloadConfig = await config
const payload = await getPayload({ config: payloadConfig })

const projects = [
  {
    name: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration and inventory management.',
    status: 'published',
    metadata: { version: 1, techStack: ['Next.js', 'PostgreSQL', 'Stripe'] },
  },
  {
    name: 'Task Management App',
    description: 'Collaborative task tracker with real-time updates and team workspaces.',
    status: 'published',
    metadata: { version: 1, techStack: ['React', 'Node.js', 'Socket.io'] },
  },
  {
    name: 'Analytics Dashboard',
    description: 'Interactive data visualization dashboard with customizable widgets.',
    status: 'draft',
    metadata: { version: 1, techStack: ['Vue', 'D3.js', 'Express'] },
  },
  {
    name: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication.',
    status: 'published',
    metadata: { version: 2, techStack: ['React Native', 'TypeScript', 'GraphQL'] },
  },
  {
    name: 'Content Management System',
    description: 'Headless CMS with multi-language support and visual editor.',
    status: 'archived',
    metadata: { version: 1, techStack: ['Payload', 'Next.js', 'PostgreSQL'] },
  },
  {
    name: 'Real-time Chat Application',
    description: 'End-to-end encrypted messaging with file sharing and channels.',
    status: 'draft',
    metadata: { version: 1, techStack: ['React', 'Firebase', 'WebRTC'] },
  },
  {
    name: 'Project Portfolio Website',
    description: 'Personal portfolio with blog, project showcase, and contact form.',
    status: 'published',
    metadata: { version: 1, techStack: ['Astro', 'Tailwind', 'MDX'] },
  },
  {
    name: 'Inventory Management System',
    description: 'Warehouse inventory tracking with barcode scanning and reports.',
    status: 'published',
    metadata: { version: 3, techStack: ['Angular', 'ASP.NET Core', 'SQL Server'] },
  },
  {
    name: 'Learning Management System',
    description: 'Online course platform with video streaming, quizzes, and certificates.',
    status: 'draft',
    metadata: { version: 1, techStack: ['Remix', 'Prisma', 'PostgreSQL'] },
  },
  {
    name: 'Social Media Scheduler',
    description: 'Multi-platform social media content scheduler with analytics.',
    status: 'archived',
    metadata: { version: 1, techStack: ['SvelteKit', 'Supabase', 'Puppeteer'] },
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
process.exit(0)