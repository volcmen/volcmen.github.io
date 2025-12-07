import * as m from 'motion/react-m';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ExternalLink } from 'lucide-react';

import type { Project } from '@/lib/mdx';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { SiGithub as Github } from '@icons-pack/react-simple-icons';
import { cn } from '@/lib/utils';

const MAX_TECH_BADGES = 5;

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
}

export function ProjectCard({ project, index, className }: ProjectCardProps) {
  const {
    title,
    slug,
    year,
    description,
    tech = [],
    images = [],
    repo,
    link,
  } = project;

  const heroImage = images.at(0);
  const visibleTech = tech.slice(0, MAX_TECH_BADGES);
  const remainingTechCount = tech.length - MAX_TECH_BADGES;

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
      viewport={{ once: true }}
      className={cn('group h-full', className)}
    >
      <div className="relative h-full">
        <div className="absolute -inset-1 rounded bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-lg opacity-0 transition-all duration-500 group-hover:opacity-100" />

        <Card className="relative flex h-full flex-col overflow-hidden border-2 border-border/40 bg-card/70 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-primary/60 hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]">
          {heroImage && (
            <div className="relative aspect-video overflow-hidden">
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 mix-blend-overlay opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <Image
                src={heroImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 grayscale-[0.7] group-hover:scale-110 group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute left-0 top-0 z-30 size-4 border-l-2 border-t-2 border-primary/50 transition-colors group-hover:border-primary" />
              <div className="pointer-events-none absolute bottom-0 right-0 z-30 size-4 border-b-2 border-r-2 border-secondary/50 transition-colors group-hover:border-secondary" />
            </div>
          )}

          <CardHeader className="space-y-3 pb-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary md:text-2xl">
                {title}
              </h3>
              <Badge
                variant="outline"
                className="flex items-center bg-background/90 text-primary shadow-[0_0_10px_rgba(251,191,36,0.3)] backdrop-blur-sm"
              >
                <Calendar className="mr-1 size-3" />
                <span className="font-mono text-xs font-bold">{year}</span>
              </Badge>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {visibleTech.map(techItem => (
                <Badge
                  key={techItem}
                  variant="secondary"
                  className="h-6 border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-mono font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/15"
                >
                  {techItem}
                </Badge>
              ))}
              {remainingTechCount > 0 && (
                <Badge
                  variant="secondary"
                  className="h-6 border border-secondary/30 bg-secondary/10 px-2.5 py-0.5 text-[11px] font-mono font-medium text-secondary"
                >
                  +
                  {remainingTechCount}
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="flex-1 pt-0">
            <p className="line-clamp-3 font-mono text-sm leading-relaxed text-muted-foreground/90">
              {description}
            </p>
          </CardContent>

          <CardFooter className="gap-2 border-t border-border/30 pt-4">
            <Button asChild variant="cyber" size="sm" className="flex-1 text-xs font-bold">
              <Link href={`/projects/${slug}`} aria-label={`View details for ${title}`}>
                VIEW DETAILS
              </Link>
            </Button>
            <div className="flex gap-2">
              {repo && (
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="size-9 border-2 border-primary/30 transition-all hover:border-primary hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_10px_rgba(251,191,36,0.3)]"
                >
                  <a href={repo} target="_blank" rel="noopener noreferrer" title="View source code">
                    <Github className="size-4" aria-hidden />
                  </a>
                </Button>
              )}
              {link && (
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="size-9 border-2 border-secondary/30 transition-all hover:border-secondary hover:bg-secondary/10 hover:text-secondary hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                >
                  <a href={link} target="_blank" rel="noopener noreferrer" title="View live project">
                    <ExternalLink className="size-4" aria-hidden />
                  </a>
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </m.div>
  );
}
