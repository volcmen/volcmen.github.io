import * as React from 'react';
import { Minus, Square, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const controlButtonClass
  = 'group/btn flex size-7 items-center justify-center border border-transparent transition-all duration-200 hover:border-primary/50 hover:bg-primary/20';

interface InitWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  onClose?: () => void;
}

export function InitWindow({
  className,
  title = '/usr/bin/synaptic',
  onClose,
  children,
  ...props
}: InitWindowProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col overflow-hidden border-2 border-primary/40 bg-black/95 backdrop-blur-xl shadow-[0_0_40px_rgba(251,191,36,0.2),0_0_80px_rgba(6,182,212,0.1)] group',
        className,
      )}
      {...props}
    >
      <div className="absolute top-0 left-0 size-4 border-t-2 border-l-2 border-primary" />
      <div className="absolute top-0 right-0 size-4 border-t-2 border-r-2 border-secondary" />
      <div className="absolute bottom-0 left-0 size-4 border-b-2 border-l-2 border-secondary" />
      <div className="absolute bottom-0 right-0 size-4 border-b-2 border-r-2 border-primary" />

      <div className="relative bg-gradient-to-r from-primary/15 via-secondary/10 to-primary/15 border-b-2 border-primary/40 px-4 py-2.5 font-mono text-xs sm:text-sm flex justify-between items-center select-none">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <span className="text-primary text-sm sm:text-base animate-pulse">❯</span>
          <span className="truncate tracking-wide">{title}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className={controlButtonClass}
            aria-label="Minimize"
          >
            <Minus className="size-4 text-primary/60 group-hover/btn:text-primary transition-colors" strokeWidth={2.5} />
          </button>

          <button
            type="button"
            className={controlButtonClass}
            aria-label="Maximize"
          >
            <Square className="size-3.5 text-primary/60 group-hover/btn:text-primary transition-colors" strokeWidth={2.5} />
          </button>

          <button
            onClick={onClose}
            type="button"
            className={cn(controlButtonClass, 'hover:border-destructive/50 hover:bg-destructive/30')}
            aria-label="Close"
          >
            <X className="size-4 text-primary/60 group-hover/btn:text-destructive transition-colors" strokeWidth={2.5} />
          </button>

        </div>
      </div>

      <div className="flex-1 bg-black/95 text-primary/90 p-5 sm:p-6 overflow-auto">
        {children}
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      </div>
    </div>
  );
}
