import { Terminal } from 'lucide-react';
import * as m from 'motion/react-m';

import { cn } from '@/lib/utils';

interface ProjectsHeaderProps {
  count: number;
  className?: string;
}

export function ProjectsHeader({ count, className }: ProjectsHeaderProps) {
  return (
    <div className={cn('mb-16 flex flex-col space-y-10', className)}>
      <div className="max-w-4xl space-y-6">
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-3 border-2 border-primary/40 bg-primary/5 px-4 py-2 font-mono text-xs text-primary shadow-[0_0_15px_rgba(251,191,36,0.15)] backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 sm:text-sm"
        >
          <Terminal className="size-4 animate-pulse" />
          <span className="tracking-wider">/ACCESSING_ARCHIVES/PROJECTS</span>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative"
        >
          <h1 className="relative font-display text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block bg-gradient-to-r from-primary/80 via-secondary/70 to-foreground bg-clip-text text-transparent">
              DIGITAL WORKS
            </span>
          </h1>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative"
        >
          <div className="relative border-l-4 border-primary/60 bg-muted/20 py-4 pr-4 pl-6 backdrop-blur-sm">
            <p className="max-w-2xl font-mono text-sm leading-relaxed text-foreground/80 sm:text-base md:text-lg">
              An evolving archive of{' '}
              <span className="font-semibold text-primary">production-grade systems</span>,{' '}
              <span className="font-semibold text-secondary">experimental interfaces</span>, and
              innovative code artifacts engineered to solve real-world challenges.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm">
              <div className="size-2 animate-pulse rounded-full bg-primary" />
              <span className="font-bold tracking-wider text-primary/90">
                TOTAL RECORDS: <span className="text-lg text-primary">{count}</span>
              </span>
            </div>
            <div className="absolute top-0 right-0 size-3 bg-primary" />
            <div className="absolute bottom-0 left-0 size-3 bg-secondary" />
          </div>
        </m.div>
      </div>
    </div>
  );
}
