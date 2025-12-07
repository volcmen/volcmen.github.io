import { getAllProjects } from '@/lib/mdx';
import { ProjectsHeader } from '@/components/projects/listing/header';
import { ProjectsList } from '@/components/projects/listing/list';

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 min-h-screen">
      <ProjectsHeader count={projects.length} />
      <ProjectsList projects={projects} />
    </main>
  );
}
