import * as m from 'motion/react-m';
import { Gamepad2 } from 'lucide-react';

export function Header() {
  return (
    <section className="mb-16 flex flex-col space-y-10" aria-labelledby="games-hero-title">
      <div className="max-w-4xl space-y-6">
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-3 text-secondary font-mono text-xs sm:text-sm border-2 border-secondary/40 px-4 py-2 bg-secondary/5 backdrop-blur-sm hover:bg-secondary/10 hover:border-secondary/60 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
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
            className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary/80 via-primary/70 to-secondary/80">
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
          <div className="relative border-l-4 border-secondary/60 bg-muted/20 backdrop-blur-sm pl-6 pr-4 py-4">
            <p className="max-w-2xl font-mono text-sm sm:text-base md:text-lg leading-relaxed text-foreground/80">
              A curated showcase of
              {' '}
              <span className="text-secondary font-semibold">legendary titles</span>
              {' '}
              like DOOM running
              <span className="text-primary font-semibold"> instant-play</span>
              {' '}
              in your browser, plus my own game projects—ready to
              <span className="text-secondary font-semibold"> frag</span>
              {' '}
              online or download for offline domination.
            </p>
            <div className="absolute top-0 right-0 size-3 bg-secondary" />
            <div className="absolute bottom-0 left-0 size-3 bg-primary" />
          </div>
        </m.div>
      </div>
    </section>
  );
}
