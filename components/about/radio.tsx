import dynamic from 'next/dynamic';
import { Mic2 } from 'lucide-react';
import * as m from 'motion/react-m';
import { cn } from '@/lib/utils';

const MusicPlayer = dynamic(
  async () => (await import('./music-player')).MusicPlayer,
  {
    loading: () => (
      <div className="h-[360px] rounded-2xl border border-secondary/30 bg-muted/30 animate-pulse" />
    ),
  },
);

interface RadioProps {
  className?: string;
}

export function Radio({ className }: RadioProps) {
  return (
    <section
      className={cn('max-w-5xl mx-auto w-full', className)}
      aria-labelledby="about-radio-heading"
    >
      <m.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-secondary/20 bg-card/40 backdrop-blur-xl p-8 md:p-12"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-secondary font-mono text-sm tracking-widest uppercase">
              <Mic2 aria-hidden className="size-4" />
              <span>Audio Interface</span>
            </div>

            <h2
              id="about-radio-heading"
              className="text-3xl md:text-4xl font-display font-bold leading-tight"
            >
              SONIC
              {' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                FREQUENCIES
              </span>
            </h2>

            <p className="text-base text-muted-foreground leading-relaxed">
              <strong className="text-foreground">AUDITORY INPUT:</strong>
              {' '}
              <span className="text-primary font-bold">ECLECTIC</span>
              . My coding rhythm relies on the legendary curation of the
              {' '}
              <strong className="text-foreground">GTA radio dial</strong>
              &mdash;a high-speed mix of genres that sustains momentum.
              <br />
              <br />
              I treat music as a programming language: engaging the
              {' '}
              <span className="text-secondary font-bold">robotic precision</span>
              {' '}
              of
              {' '}
              <strong className="text-foreground">
                Daft Punk
              </strong>
              {' '}
              for repetitive tasks, deciphering complex logic through the
              {' '}
              <span className="text-purple-600 dark:text-purple-400 font-bold">fractal chaos</span>
              {' '}
              of
              {' '}
              <strong className="text-foreground">Aphex Twin</strong>
              , and entering deep-focus sprints to the
              {' '}
              <span className="text-rose-600 dark:text-rose-500 font-bold">neon-noir pulse</span>
              {' '}
              of
              {' '}
              <strong className="text-foreground">M.O.O.N</strong>
              {' '}
              and
              {' '}
              <strong className="text-foreground">Danger</strong>
              .
              <br />
              The right track turns a blank terminal into a
              {' '}
              <strong className="text-primary">flow state</strong>
              .
            </p>
          </div>

          <div className="relative">
            <div className="mb-6 text-right space-y-2">
              <div className="inline-flex items-center justify-end gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Session Protocol</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Select a frequency below. Synchronize your neural pathways with my creative wavelength before accessing the
                {' '}
                <strong className="text-primary">Source Code</strong>
                {' '}
                archives.
              </p>
            </div>

            <div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-3xl opacity-30" />
            <MusicPlayer />
          </div>
        </div>
      </m.div>
    </section>
  );
}
