import { User } from 'lucide-react';
import * as m from 'motion/react-m';

import { cn } from '@/lib/utils';

const EMPHASIS = {
  creative: 'creative medium',
  reliability: 'industrial-strength reliability',
  polish: 'artistic polish',
  expressive: 'expressive',
  robust: 'robust',
} as const;

interface IntroProps {
  className?: string;
}

export function Intro({ className }: IntroProps) {
  return (
    <section className={cn('mx-auto max-w-4xl space-y-8 text-center', className)}>
      <m.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.32 }}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-sm text-primary"
      >
        <User className="size-4" />
        <span className="tracking-wide">HUMAN_PROFILE_DETECTED</span>
      </m.div>

      <m.h1
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.08, duration: 0.32 }}
        className="font-display text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl"
      >
        WHO IS{' '}
        <span className="animate-gradient-x bg-gradient-to-r from-secondary/80 via-primary/90 to-secondary/80 bg-clip-text text-transparent">
          VOLCMEN
        </span>
        ?
      </m.h1>

      <m.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.16, duration: 0.36 }}
        className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
      >
        Inspired by <span className="font-bold text-primary">cultural archives</span>,{' '}
        <span className="font-bold text-secondary">film scores</span>
        , and the immersion of a great video game.
        <br />
        To me, software is more than just tools&mdash;it&rsquo;s a{' '}
        <span className="font-bold text-primary">{EMPHASIS.creative}</span>. I strive to fuse{' '}
        <span className="font-bold text-primary">{EMPHASIS.reliability}</span> with{' '}
        <span className="font-bold text-secondary">{EMPHASIS.polish}</span>, creating systems that
        are as <span className="font-bold text-secondary">{EMPHASIS.expressive}</span> as they are{' '}
        <span className="font-bold text-primary">{EMPHASIS.robust}</span>.
      </m.p>
    </section>
  );
}
