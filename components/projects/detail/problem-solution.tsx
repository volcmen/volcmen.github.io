import { Lightbulb, Target } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ProjectProblemSolutionProps {
  problem?: string;
  solution?: string;
  className?: string;
}

export function ProjectProblemSolution({
  problem,
  solution,
  className,
}: ProjectProblemSolutionProps) {
  if (!problem && !solution) return null;

  return (
    <div className={cn('grid grid-cols-1 gap-8 md:grid-cols-2', className)}>
      {problem && (
        <div className="rounded-lg border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
          <h3 className="mb-3 flex items-center gap-2 font-display text-xl font-bold text-destructive">
            <Target className="size-5" /> PROBLEM_STATEMENT
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{problem}</p>
        </div>
      )}
      {solution && (
        <div className="rounded-lg border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
          <h3 className="mb-3 flex items-center gap-2 font-display text-xl font-bold text-secondary">
            <Lightbulb className="size-5" /> SOLUTION_PROTOCOL
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{solution}</p>
        </div>
      )}
    </div>
  );
}
