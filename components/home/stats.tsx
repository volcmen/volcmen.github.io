import { Brain, Coffee, LucideIcon, Network, Shield } from 'lucide-react';
import * as m from 'motion/react-m';

type StatColor = 'primary' | 'secondary';

interface Stat {
  icon: LucideIcon;
  label: string;
  value: string;
  color: StatColor;
}

const STATS: Stat[] = [
  { icon: Brain, label: 'Neural Architecture', value: 'Decentralized', color: 'primary' },
  { icon: Shield, label: 'Security Protocol', value: 'Hardened', color: 'secondary' },
  { icon: Coffee, label: 'Caffeine Intake', value: 'Maximum', color: 'primary' },
  { icon: Network, label: 'Tech Arsenal', value: 'Novel', color: 'secondary' },
] as const;

export function Stats() {
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.0 }}
      className="mt-20 grid w-full max-w-5xl auto-rows-fr grid-cols-2 items-stretch justify-items-stretch gap-6 px-4 md:grid-cols-4"
    >
      {STATS.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <m.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
            className="group h-full cursor-default"
          >
            <div className="relative flex h-full transform-gpu flex-col items-center justify-center rounded border border-border/60 bg-background/80 p-6 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.65)] backdrop-blur-sm transition-colors transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02] group-hover:border-primary/70">
              <div className="flex flex-col items-center justify-center space-y-3 text-center sm:space-y-4">
                <div
                  className="rounded border border-primary/30 bg-primary/10 p-3 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/20"
                  aria-hidden
                >
                  <Icon className="size-7 text-primary transition-colors duration-300 group-hover:text-primary-glow" />
                </div>
                <div className="group-hover:text-glow font-display text-3xl leading-tight font-bold text-primary transition-all duration-300 sm:text-4xl">
                  {stat.value}
                </div>
                <div className="text-xs leading-tight font-medium tracking-widest text-muted-foreground uppercase sm:text-sm">
                  {stat.label}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-stretch justify-stretch">
                <div
                  className="absolute top-0 left-0 size-3 border-t-2 border-l-2 border-primary/60 group-hover:border-primary"
                  aria-hidden
                />
                <div
                  className="absolute right-0 bottom-0 size-3 border-r-2 border-b-2 border-secondary/60 group-hover:border-secondary"
                  aria-hidden
                />
              </div>
            </div>
          </m.div>
        );
      })}
    </m.div>
  );
}
