import { getAllProjects, getProjectBySlug } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { ProjectHeader } from '@/components/projects/detail/header';
import { ProjectContent } from '@/components/projects/detail/content';
import { ProjectSystemOverview } from '@/components/projects/detail/system-overview';
import { ProjectProblemSolution } from '@/components/projects/detail/problem-solution';
import { ProjectGallery } from '@/components/projects/detail/gallery';
import { ProjectSpecifications } from '@/components/projects/detail/specifications';
import { ProjectSidebar } from '@/components/projects/detail/sidebar';

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
        <div className="lg:col-span-2 space-y-12">
          <ProjectSystemOverview
            description={project.longDescription || project.description}
          />

          <ProjectProblemSolution
            problem={project.problem}
            solution={project.solution}
          />

          <ProjectGallery
            images={project.images}
            title={project.title}
          />

          {project.content && (
            <ProjectSpecifications
              content={project.content}
            />
          )}
        </div>

        <ProjectSidebar
          link={project.link}
          repo={project.repo}
          features={project.features}
        />
      </ProjectContent>
    </main>
  );
}
