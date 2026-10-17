import { notFound } from 'next/navigation';

import { ProjectContent } from '@/components/projects/detail/content';
import { ProjectGallery } from '@/components/projects/detail/gallery';
import { ProjectHeader } from '@/components/projects/detail/header';
import { ProjectProblemSolution } from '@/components/projects/detail/problem-solution';
import { ProjectSidebar } from '@/components/projects/detail/sidebar';
import { ProjectSpecifications } from '@/components/projects/detail/specifications';
import { ProjectSystemOverview } from '@/components/projects/detail/system-overview';
import { getAllProjects, getProjectBySlug } from '@/lib/mdx';

export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map(project => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen pb-20">
      <ProjectHeader
        title={project.title}
        slug={project.slug}
        year={project.year.toString()}
        tech={project.tech}
        image={project.images?.[0]}
      />

      <ProjectContent>
        <div className="space-y-12 lg:col-span-2">
          <ProjectSystemOverview description={project.longDescription || project.description} />

          <ProjectProblemSolution problem={project.problem} solution={project.solution} />

          <ProjectGallery images={project.images} title={project.title} />

          {project.content && <ProjectSpecifications content={project.content} />}
        </div>

        <ProjectSidebar link={project.link} repo={project.repo} features={project.features} />
      </ProjectContent>
    </main>
  );
}
