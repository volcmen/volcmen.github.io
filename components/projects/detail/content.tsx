import * as React from 'react';
import * as m from 'motion/react-m';
import { cn } from '@/lib/utils';

interface ProjectContentProps extends React.PropsWithChildren {
  className?: string;
}

export function ProjectContent({ children, className }: ProjectContentProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className={cn('container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12', className)}
    >
      {children}
    </m.div>
  );
}
