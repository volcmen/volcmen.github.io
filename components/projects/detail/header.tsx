import * as m from 'motion/react-m';
import Link from 'next/link';
import { ArrowLeft, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProjectHeaderProps {
  title: string;
  slug: string;
  year: string;
  tech: string[];
  image?: string;
  className?: string;
}

export function ProjectHeader({ title, slug, year, tech, image, className }: ProjectHeaderProps) {
  return (
    <div className={cn('relative w-full h-[25vh] overflow-hidden border-b border-primary/20', className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm"
        style={{ backgroundImage: `url(${image || ''})` }}
      />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 z-0" />

      <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-20">
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="ghost" asChild className="mb-6 w-fit text-muted-foreground hover:text-primary transition-colors">
            <Link href="/projects">
              <ArrowLeft className="mr-2 size-4" />
              {' '}
              BACK_TO_ARCHIVES
            </Link>
          </Button>
        </m.div>

        <div className="space-y-4">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-2 text-primary font-mono text-sm"
          >
            <Terminal className="size-4" />
            <span>
              /PROJECT_LOGS/
              {slug.toUpperCase()}
            </span>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-foreground to-primary animate-gradient-x">
              {title}
            </h1>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Badge variant="outline" className="text-primary border-primary/50 bg-primary/10 px-3 py-1 font-mono">
              YEAR:
              {' '}
              {year}
            </Badge>
            <div className="h-px w-12 bg-primary/30 hidden sm:block" />
            <div className="flex gap-2 flex-wrap">
              {tech.map((t, i) => (
                <m.div
                  key={t}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                >
                  <Badge variant="secondary" className="text-xs font-mono">{t}</Badge>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </div>
  );
}
