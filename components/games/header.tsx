import { Gamepad2 } from 'lucide-react';
import * as m from 'motion/react-m';

export function Header() {
  return (
    <section className="mb-16 flex flex-col space-y-10" aria-labelledby="games-hero-title">
      <div className="max-w-4xl space-y-6">
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-3 border-2 border-secondary/40 bg-secondary/5 px-4 py-2 font-mono text-xs text-secondary shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-sm transition-all duration-300 hover:border-secondary/60 hover:bg-secondary/10 sm:text-sm"
        >
          <Gamepad2 className="size-4 animate-pulse" aria-hidden />
          <span className="tracking-wider">/ARCADE/GAMES_COLLECTION</span>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative"
        >
          <h1
            id="games-hero-title"
            className="relative font-display text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span className="block bg-gradient-to-r from-secondary/80 via-primary/70 to-secondary/80 bg-clip-text text-transparent">
              GAME ARCADE
            </span>
          </h1>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative"
        >
          <div className="relative border-l-4 border-secondary/60 bg-muted/20 py-4 pr-4 pl-6 backdrop-blur-sm">
            <p className="max-w-2xl font-mono text-sm leading-relaxed text-foreground/80 sm:text-base md:text-lg">
              A curated showcase of{' '}
              <span className="font-semibold text-secondary">legendary titles</span> like DOOM
              running
              <span className="font-semibold text-primary"> instant-play</span> in your browser,
              plus my own game projects—ready to
              <span className="font-semibold text-secondary"> frag</span> online or download for
              offline domination.
            </p>
            <div className="absolute top-0 right-0 size-3 bg-secondary" />
            <div className="absolute bottom-0 left-0 size-3 bg-primary" />
          </div>
        </m.div>
      </div>
    </section>
  );
}
