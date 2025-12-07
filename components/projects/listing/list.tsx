import * as m from 'motion/react-m';
import { ProjectCard } from './card';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Terminal } from 'lucide-react';
import type { Project } from '@/lib/mdx';
import { cn } from '@/lib/utils';

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
          className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8', className)}
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
            <Card className="relative h-full flex flex-col overflow-hidden border-2 border-dashed border-border/30 bg-muted/5 backdrop-blur-md">
              <CardHeader className="space-y-3 pb-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded border bg-muted/10 border-border/30 w-fit">
                    <Code className="size-6 text-muted-foreground/50" />
                  </div>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-muted-foreground/70 tracking-tight uppercase">
                  MORE PROJECTS
                </h3>
              </CardHeader>

              <CardContent className="flex-1 pt-0">
                <p className="text-sm text-muted-foreground/60 font-mono leading-relaxed">
                  More content will come soon
                </p>
              </CardContent>

              <CardFooter className="pt-4 border-t border-border/30">
                <Button disabled variant="outline" className="w-full">
                  IN DEVELOPMENT
                </Button>
              </CardFooter>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 size-4 border-t-2 border-l-2 border-muted-foreground/20" />
              <div className="absolute bottom-0 right-0 size-4 border-b-2 border-r-2 border-muted-foreground/20" />
            </Card>
          </m.div>
        </m.div>
      )}

      {!hasProjects && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="border-2 border-dashed border-border/50 rounded p-12 bg-muted/10">
            <Terminal className="size-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground font-mono text-lg tracking-wider">
              NO_RECORDS_FOUND
            </p>
            <p className="text-muted-foreground/70 font-mono text-sm mt-2">
              {' // No projects match the current filters'}
            </p>
          </div>
        </m.div>
      )}
    </>
  );
}
