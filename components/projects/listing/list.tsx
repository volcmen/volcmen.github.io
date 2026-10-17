import { Code, Terminal } from 'lucide-react';
import * as m from 'motion/react-m';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { Project } from '@/lib/mdx';
import { cn } from '@/lib/utils';

import { ProjectCard } from './card';

interface ProjectsListProps {
  projects: Project[];
  className?: string;
}

export function ProjectsList({ projects, className }: ProjectsListProps) {
  const hasProjects = projects.length > 0;
  const placeholderDelay = 0.3 + projects.length * 0.08;

  return (
    <>
      {hasProjects && (
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={cn('grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8', className)}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}

          {/* Empty card for future content */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: placeholderDelay, duration: 0.6 }}
            className="group relative h-full"
          >
            <Card className="relative flex h-full flex-col overflow-hidden border-2 border-dashed border-border/30 bg-muted/5 backdrop-blur-md">
              <CardHeader className="space-y-3 pb-3">
                <div className="flex items-center justify-between">
                  <div className="w-fit rounded border border-border/30 bg-muted/10 p-2.5">
                    <Code className="size-6 text-muted-foreground/50" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight text-muted-foreground/70 uppercase md:text-2xl">
                  MORE PROJECTS
                </h3>
              </CardHeader>

              <CardContent className="flex-1 pt-0">
                <p className="font-mono text-sm leading-relaxed text-muted-foreground/60">
                  More content will come soon
                </p>
              </CardContent>

              <CardFooter className="border-t border-border/30 pt-4">
                <Button disabled variant="outline" className="w-full">
                  IN DEVELOPMENT
                </Button>
              </CardFooter>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 size-4 border-t-2 border-l-2 border-muted-foreground/20" />
              <div className="absolute right-0 bottom-0 size-4 border-r-2 border-b-2 border-muted-foreground/20" />
            </Card>
          </m.div>
        </m.div>
      )}

      {!hasProjects && (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
          <div className="rounded border-2 border-dashed border-border/50 bg-muted/10 p-12">
            <Terminal className="mx-auto mb-4 size-12 text-muted-foreground/50" />
            <p className="font-mono text-lg tracking-wider text-muted-foreground">
              NO_RECORDS_FOUND
            </p>
            <p className="mt-2 font-mono text-sm text-muted-foreground/70">
              {' // No projects match the current filters'}
            </p>
          </div>
        </m.div>
      )}
    </>
  );
}
