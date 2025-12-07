import * as m from 'motion/react-m';
import { User } from 'lucide-react';
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
    <section className={cn('space-y-8 max-w-4xl mx-auto text-center', className)}>
      <m.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.32 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-sm mb-4"
      >
        <User className="size-4" />
        <span className="tracking-wide">HUMAN_PROFILE_DETECTED</span>
      </m.div>

      <m.h1
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.08, duration: 0.32 }}
        className="text-5xl sm:text-6xl md:text-7xl font-display font-black tracking-tighter"
      >
        WHO IS
        {' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/80 via-primary/90 to-secondary/80 animate-gradient-x">VOLCMEN</span>
        ?
      </m.h1>

      <m.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.16, duration: 0.36 }}
        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
      >
        Inspired by
        {' '}
        <span className="text-primary font-bold">cultural archives</span>
        ,
        {' '}
        <span className="text-secondary font-bold">film scores</span>
        , and the immersion of a great
        video game.
        <br />
        To me, software is more than just tools&mdash;it&rsquo;s a
        {' '}
        <span className="text-primary font-bold">{EMPHASIS.creative}</span>
        . I strive to fuse
        {' '}
        <span className="text-primary font-bold">{EMPHASIS.reliability}</span>
        {' '}
        with
        {' '}
        <span className="text-secondary font-bold">{EMPHASIS.polish}</span>
        , creating systems that
        are as
        {' '}
        <span className="text-secondary font-bold">{EMPHASIS.expressive}</span>
        {' '}
        as they are
        {' '}
        <span className="text-primary font-bold">{EMPHASIS.robust}</span>
        .
      </m.p>
    </section>
  );
}
