import { Cpu } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ProjectSystemOverviewProps {
  description: string;
  className?: string;
}

export function ProjectSystemOverview({ description, className }: ProjectSystemOverviewProps) {
  return (
    <section className={cn('space-y-4', className)}>
      <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-foreground">
        <Cpu className="size-5 text-primary" /> SYSTEM_OVERVIEW
      </h2>
      <div className="space-y-2 border-l-2 border-primary/20 pl-4 font-mono text-lg leading-relaxed text-muted-foreground">
        <p>{description}</p>
      </div>
    </section>
  );
}
