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
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 w-full max-w-5xl px-4 auto-rows-fr items-stretch justify-items-stretch"
    >
      {STATS.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <m.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
            className="group cursor-default h-full"
          >
            <div className="relative flex h-full flex-col items-center justify-center rounded border border-border/60 bg-background/80 p-6 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.65)] backdrop-blur-sm transition-transform transition-colors duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1 group-hover:border-primary/70 transform-gpu">
              <div className="flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4">
                <div className="p-3 rounded border border-primary/30 bg-primary/10 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300" aria-hidden>
                  <Icon className="size-7 text-primary group-hover:text-primary-glow transition-colors duration-300" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-display text-primary group-hover:text-glow transition-all duration-300 leading-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest font-medium leading-tight">
                  {stat.label}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-stretch justify-stretch">
                <div className="absolute left-0 top-0 size-3 border-l-2 border-t-2 border-primary/60 group-hover:border-primary" aria-hidden />
                <div className="absolute right-0 bottom-0 size-3 border-b-2 border-r-2 border-secondary/60 group-hover:border-secondary" aria-hidden />
              </div>
            </div>
          </m.div>
        );
      })}
    </m.div>
  );
}
