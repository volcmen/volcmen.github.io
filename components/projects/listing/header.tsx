import * as m from 'motion/react-m';
import { Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectsHeaderProps {
  count: number;
  className?: string;
}

export function ProjectsHeader({ count, className }: ProjectsHeaderProps) {
  return (
    <div className={cn('flex flex-col space-y-10 mb-16', className)}>
      <div className="space-y-6 max-w-4xl">
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-3 text-primary font-mono text-xs sm:text-sm border-2 border-primary/40 px-4 py-2 bg-primary/5 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
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
          <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary/80 via-secondary/70 to-foreground">
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
          <div className="relative border-l-4 border-primary/60 bg-muted/20 backdrop-blur-sm pl-6 pr-4 py-4">
            <p className="text-foreground/80 max-w-2xl font-mono text-sm sm:text-base md:text-lg leading-relaxed">
              An evolving archive of
              {' '}
              <span className="text-primary font-semibold">production-grade systems</span>
              ,
              {' '}
              <span className="text-secondary font-semibold">experimental interfaces</span>
              , and innovative code artifacts
              engineered to solve real-world challenges.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm">
              <div className="size-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary/90 font-bold tracking-wider">
                TOTAL RECORDS:
                {' '}
                <span className="text-primary text-lg">{count}</span>
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
