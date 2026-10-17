'use client';

import { ArrowRight, Gamepad2, Sparkles, Zap } from 'lucide-react';
import * as m from 'motion/react-m';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { TerminalIntro } from '@/components/terminal-intro';
import { Button } from '@/components/ui/button';

import { Stats } from './stats';

const INTRO_SEEN_KEY = 'intro_seen';
const INTRO_EXPIRATION_TIME = 3 * 60 * 60 * 1000; // 3 hours
const STORAGE_MAX_AGE = INTRO_EXPIRATION_TIME / 1000;

const isIntroFresh = (timestamp: number) => Date.now() - timestamp < INTRO_EXPIRATION_TIME;

const persistIntroSeen = (timestamp: number) => {
  try {
    localStorage.setItem(INTRO_SEEN_KEY, timestamp.toString());
    document.cookie = `${INTRO_SEEN_KEY}=${timestamp}; max-age=${STORAGE_MAX_AGE}; path=/; samesite=lax`;
  } catch {
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
      } catch {
        // If storage is blocked, we just fall back to showing the intro once.
      } finally {
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

  return useMemo(
    () => ({
      isTypingComplete,
      hasHydrated,
      handleIntroComplete,
    }),
    [handleIntroComplete, hasHydrated, isTypingComplete],
  );
}

export function Landing() {
  const { isTypingComplete, hasHydrated, handleIntroComplete } = useIntroState();

  if (!hasHydrated && !isTypingComplete) {
    return null;
  }

  return (
    <section className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center space-y-12 px-4 pt-24 pb-16 text-center sm:px-6 lg:px-8">
      {!isTypingComplete && (
        <TerminalIntro onComplete={handleIntroComplete} onClose={handleIntroComplete} />
      )}

      {isTypingComplete && (
        <>
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-5xl space-y-8"
          >
            <div className="group relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-30" />
              <h1 className="relative font-display text-5xl leading-none font-black tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                <span className="animate-gradient-x mt-2 block bg-gradient-to-r from-secondary/80 via-primary/90 to-secondary/80 bg-clip-text text-transparent">
                  SOFTWARE
                </span>
                <span className="animate-gradient-x mt-2 block bg-gradient-to-r from-primary/90 via-secondary/80 to-primary/90 bg-clip-text text-transparent">
                  ENGINEER
                </span>
              </h1>
            </div>

            <div className="relative">
              <div className="mb-4 flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-secondary/50" />
                <Sparkles className="size-5 animate-pulse text-secondary" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-secondary/50" />
              </div>
              <h2 className="text-glow-cyan font-mono text-xl font-semibold tracking-[0.3em] text-secondary uppercase sm:text-2xl md:text-3xl lg:text-4xl">
                Distributed Systems Architect
              </h2>
            </div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mx-auto max-w-2xl"
            >
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative border-l-4 border-primary/70 bg-muted/30 py-5 pr-6 pl-6 text-left backdrop-blur-sm">
                  <p className="font-mono text-base leading-relaxed text-foreground/90 sm:text-lg md:text-xl">
                    Architecting{' '}
                    <span className="font-semibold text-primary">
                      high-performance distributed systems
                    </span>{' '}
                    and crafting{' '}
                    <span className="font-semibold text-secondary">
                      immersive digital experiences
                    </span>{' '}
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
            className="mt-12 flex flex-col flex-wrap justify-center gap-4 sm:flex-row sm:gap-6"
          >
            <Button
              asChild
              size="lg"
              variant="hero"
              className="group relative overflow-hidden text-base font-bold tracking-wide sm:text-lg"
            >
              <Link href="/projects" className="relative z-10">
                <span className="relative z-10 flex items-center">
                  EXPLORE PROJECTS
                  <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary via-primary-glow to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            </Button>
            <Button
              variant="cyber"
              size="lg"
              asChild
              className="group px-8 text-base font-bold tracking-wide sm:text-lg"
            >
              <Link href="/games">
                <Gamepad2 className="mr-2 size-5 transition-transform group-hover:rotate-12" />
                LAUNCH GAMES
                <Zap className="ml-2 size-4 opacity-50 transition-opacity group-hover:opacity-100" />
              </Link>
            </Button>
          </m.div>

          <Stats />
        </>
      )}
    </section>
  );
}
