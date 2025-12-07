import { Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectSystemOverviewProps {
  description: string;
  className?: string;
}

export function ProjectSystemOverview({ description, className }: ProjectSystemOverviewProps) {
  return (
    <section className={cn('space-y-4', className)}>
      <h2 className="text-2xl font-display font-bold flex items-center gap-2 text-foreground">
        <Cpu className="size-5 text-primary" />
        {' '}
        SYSTEM_OVERVIEW
      </h2>
      <div className="text-lg text-muted-foreground leading-relaxed font-mono border-l-2 border-primary/20 pl-4 space-y-2">
        <p>{description}</p>
      </div>
    </section>
  );
}
