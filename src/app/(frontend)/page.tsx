//src\app\(frontend)\page.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import ProjectsGallery from '@/components/ProjectsGallery'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const { docs: projects } = await payload.find({
    collection: 'projects',
    limit: 100,
    sort: '-createdAt',
  })

  return (
    <div className="w-full h-auto mx-auto">
      <ProjectsGallery projects={projects} />
      <a
        className="text-link hover:text-link/70 transition-all duration-200 hover:-translate-y-0.5 inline-block"
        href={payload.config.routes.admin}
        rel="noopener noreferrer"
        target="_blank"
      >
        Go to admin panel
      </a>
    </div>
  )
}
