import { Card, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { SocialUplink } from './social-uplink';

import { HOBBIES } from '@/config/hobbies.config';

interface HobbiesProps {
  className?: string;
}

export function Hobbies({ className }: HobbiesProps) {
  return (
    <section className={cn('mx-auto w-full max-w-5xl space-y-8', className)}>
      <header className="space-y-2 text-center">
        <h2 className="text-3xl font-display font-bold tracking-tight">
          PERSONAL
          {' '}
          <span className="text-primary">ARCHIVES</span>
        </h2>
        <p className="text-sm font-mono uppercase text-muted-foreground">
          {' // Declassified hobby telemetry'}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {HOBBIES.map(({ icon: Icon, title, description, accentClass }) => (
          <Card
            key={title}
            className="group h-full border-muted/40 bg-card/50 backdrop-blur-sm transition-colors duration-200 hover:bg-card/80"
          >
            <CardHeader className="space-y-3">
              <Icon
                aria-hidden
                className={cn('h-8 w-8 text-muted-foreground transition-colors duration-200', accentClass)}
              />
              <h3 className="font-display text-xl font-bold">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="pt-12">
        <SocialUplink />
      </div>
    </section>
  );
}
