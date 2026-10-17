import { ProjectsHeader } from '@/components/projects/listing/header';
import { ProjectsList } from '@/components/projects/listing/list';
import { getAllProjects } from '@/lib/mdx';

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="container mx-auto min-h-screen px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <ProjectsHeader count={projects.length} />
      <ProjectsList projects={projects} />
    </main>
  );
}
