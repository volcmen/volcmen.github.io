import { Mic2 } from 'lucide-react';
import * as m from 'motion/react-m';
import dynamic from 'next/dynamic';

import { cn } from '@/lib/utils';

const MusicPlayer = dynamic(async () => (await import('./music-player')).MusicPlayer, {
  loading: () => (
    <div className="h-[360px] animate-pulse rounded-2xl border border-secondary/30 bg-muted/30" />
  ),
});

interface RadioProps {
  className?: string;
}

export function Radio({ className }: RadioProps) {
  return (
    <section
      className={cn('mx-auto w-full max-w-5xl', className)}
      aria-labelledby="about-radio-heading"
    >
      <m.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-secondary/20 bg-card/40 p-8 backdrop-blur-xl md:p-12"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-[size:4rem_4rem] opacity-20" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 font-mono text-sm tracking-widest text-secondary uppercase">
              <Mic2 aria-hidden className="size-4" />
              <span>Audio Interface</span>
            </div>

            <h2
              id="about-radio-heading"
              className="font-display text-3xl leading-tight font-bold md:text-4xl"
            >
              SONIC{' '}
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                FREQUENCIES
              </span>
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              <strong className="text-foreground">AUDITORY INPUT:</strong>{' '}
              <span className="font-bold text-primary">ECLECTIC</span>. My coding rhythm relies on
              the legendary curation of the{' '}
              <strong className="text-foreground">GTA radio dial</strong>
              &mdash;a high-speed mix of genres that sustains momentum.
              <br />
              <br />I treat music as a programming language: engaging the{' '}
              <span className="font-bold text-secondary">robotic precision</span> of{' '}
              <strong className="text-foreground">Daft Punk</strong> for repetitive tasks,
              deciphering complex logic through the{' '}
              <span className="font-bold text-purple-600 dark:text-purple-400">fractal chaos</span>{' '}
              of <strong className="text-foreground">Aphex Twin</strong>, and entering deep-focus
              sprints to the{' '}
              <span className="font-bold text-rose-600 dark:text-rose-500">neon-noir pulse</span> of{' '}
              <strong className="text-foreground">M.O.O.N</strong> and{' '}
              <strong className="text-foreground">Danger</strong>
              .
              <br />
              The right track turns a blank terminal into a{' '}
              <strong className="text-primary">flow state</strong>.
            </p>
          </div>

          <div className="relative">
            <div className="mb-6 space-y-2 text-right">
              <div className="inline-flex items-center justify-end gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
                <span>Session Protocol</span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Select a frequency below. Synchronize your neural pathways with my creative
                wavelength before accessing the{' '}
                <strong className="text-primary">Source Code</strong> archives.
              </p>
            </div>

            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-secondary/20 to-primary/20 opacity-30 blur-3xl" />
            <MusicPlayer />
          </div>
        </div>
      </m.div>
    </section>
  );
}
