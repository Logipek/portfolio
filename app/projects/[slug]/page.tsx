import { notFound } from 'next/navigation'
import { projects } from '@/lib/projects'
import ClientProjectContent from '@/components/client-project-content'

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <ClientProjectContent project={project} />
      </div>
    </div>
  )
}