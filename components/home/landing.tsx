'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Gamepad2, Sparkles, Zap } from 'lucide-react';
import * as m from 'motion/react-m';
import { Button } from '@/components/ui/button';
import { TerminalIntro } from '@/components/terminal-intro';
import { Stats } from './stats';

const INTRO_SEEN_KEY = 'intro_seen';
const INTRO_EXPIRATION_TIME = 3 * 60 * 60 * 1000; // 3 hours
const STORAGE_MAX_AGE = INTRO_EXPIRATION_TIME / 1000;

const isIntroFresh = (timestamp: number) => (Date.now() - timestamp) < INTRO_EXPIRATION_TIME;

const persistIntroSeen = (timestamp: number) => {
  try {
    localStorage.setItem(INTRO_SEEN_KEY, timestamp.toString());
    document.cookie = `${INTRO_SEEN_KEY}=${timestamp}; max-age=${STORAGE_MAX_AGE}; path=/; samesite=lax`;
  }
  catch {
    // Storage might be unavailable (e.g., private browsing). Ignore failures to keep UX smooth.
  }
};

function useIntroState() {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const hydrateFromStorage = () => {
      try {
        const stored = localStorage.getItem(INTRO_SEEN_KEY);
        const parsed = stored ? Number(stored) : NaN;
        const hasFreshLocalValue = !Number.isNaN(parsed) && isIntroFresh(parsed);
        setIsTypingComplete(hasFreshLocalValue);
      }
      catch {
        // If storage is blocked, we just fall back to showing the intro once.
      }
      finally {
        setHasHydrated(true);
      }
    };

    const timer = window.setTimeout(hydrateFromStorage, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleIntroComplete = useCallback(() => {
    const timestamp = Date.now();
    setIsTypingComplete(true);
    persistIntroSeen(timestamp);
  }, []);

  return useMemo(() => ({
    isTypingComplete,
    hasHydrated,
    handleIntroComplete,
  }), [handleIntroComplete, hasHydrated, isTypingComplete]);
}

export function Landing() {
  const { isTypingComplete, hasHydrated, handleIntroComplete } = useIntroState();

  if (!hasHydrated && !isTypingComplete) {
    return null;
  }

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 space-y-12 relative z-10 pt-24 pb-16">

      {!isTypingComplete && (
        <TerminalIntro
          onComplete={handleIntroComplete}
          onClose={handleIntroComplete}
        />
      )}

      {isTypingComplete && (
        <>
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8 max-w-5xl"
          >
            <div className="relative inline-block group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
              <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black tracking-tighter leading-none">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary/80 via-primary/90 to-secondary/80 animate-gradient-x mt-2">
                  SOFTWARE
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary/90 via-secondary/80 to-primary/90 animate-gradient-x mt-2">
                  ENGINEER
                </span>
              </h1>
            </div>

            <div className="relative">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-secondary/50" />
                <Sparkles className="size-5 text-secondary animate-pulse" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-secondary/50" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono text-secondary tracking-[0.3em] uppercase text-glow-cyan font-semibold">
                Distributed Systems Architect
              </h2>
            </div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mx-auto max-w-2xl"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative border-l-4 border-primary/70 bg-muted/30 backdrop-blur-sm pl-6 pr-6 py-5 text-left">
                  <p className="text-base sm:text-lg md:text-xl text-foreground/90 font-mono leading-relaxed">
                    Architecting
                    {' '}
                    <span className="text-primary font-semibold">high-performance distributed systems</span>
                    {' '}
                    and crafting
                    {' '}
                    <span className="text-secondary font-semibold">immersive digital experiences</span>
                    {' '}
                    at the bleeding edge of technology.
                  </p>
                  <div className="absolute top-0 right-0 size-2 bg-primary" />
                  <div className="absolute bottom-0 left-0 size-2 bg-secondary" />
                </div>
              </div>
            </m.div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center mt-12"
          >
            <Button asChild size="lg" variant="hero" className="text-base sm:text-lg font-bold tracking-wide group relative overflow-hidden">
              <Link href="/projects" className="relative z-10">
                <span className="relative z-10 flex items-center">
                  EXPLORE PROJECTS
                  <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
              </Link>
            </Button>
            <Button variant="cyber" size="lg" asChild className="text-base sm:text-lg font-bold tracking-wide px-8 group">
              <Link href="/games">
                <Gamepad2 className="mr-2 size-5 group-hover:rotate-12 transition-transform" />
                LAUNCH GAMES
                <Zap className="ml-2 size-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>
          </m.div>

          <Stats />
        </>
      )}

    </section>
  );
}
