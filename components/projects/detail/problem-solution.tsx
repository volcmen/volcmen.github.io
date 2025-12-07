import { Target, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectProblemSolutionProps {
  problem?: string;
  solution?: string;
  className?: string;
}

export function ProjectProblemSolution({ problem, solution, className }: ProjectProblemSolutionProps) {
  if (!problem && !solution) return null;

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-8', className)}>
      {problem && (
        <div className="bg-card/30 border border-border/50 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl font-display font-bold mb-3 flex items-center gap-2 text-destructive">
            <Target className="size-5" />
            {' '}
            PROBLEM_STATEMENT
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {problem}
          </p>
        </div>
      )}
      {solution && (
        <div className="bg-card/30 border border-border/50 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl font-display font-bold mb-3 flex items-center gap-2 text-secondary">
            <Lightbulb className="size-5" />
            {' '}
            SOLUTION_PROTOCOL
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {solution}
          </p>
        </div>
      )}
    </div>
  );
}
