//src\components\ProjectsGallery.tsx
'use client'
import type { Project } from '@/payload-types'

interface ProjectsGalleryProps {
  projects: Project[]
}

const ProjectsGallery = ({ projects }: ProjectsGalleryProps) => {
  return (
    <div className="w-full">
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground">
              Projects Gallery
            </h2>
            <p className="text-base text-muted-foreground mt-1 md:max-w-[800px]">
              Browse through your saved QR code projects.
            </p>
          </div>
        </div>

        {projects.length === 0 ? (
          <p className="text-base text-muted-foreground">
            No projects yet. Start creating QR codes to see them here.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
            {projects.map((project) => {
              const meta =
                project.metadata &&
                typeof project.metadata === 'object' &&
                !Array.isArray(project.metadata)
                  ? (project.metadata as Record<string, unknown>)
                  : null
              const version = meta?.version
              const techStack = meta?.techStack

              return (
                <div
                  key={project.id}
                  className="border border-border rounded-lg p-4 flex flex-col gap-2 min-h-[200px]"
                >
                  <h3 className="font-semibold text-foreground">{project.name}</h3>
                  {project.description && (
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  )}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground self-start capitalize w-fit">
                    {project.status ?? 'draft'}
                  </span>
                  {meta && (
                    <div className="text-xs text-muted-foreground space-y-1 mt-auto">
                      <div>
                        <span className="font-medium">Version:</span>{' '}
                        {String(version ?? '—')}
                      </div>
                      <div>
                        <span className="font-medium">Tech Stack:</span>{' '}
                        {Array.isArray(techStack)
                          ? techStack.join(', ')
                          : String(techStack ?? '—')}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}

export default ProjectsGallery