'use client';

import { useEffect, useState } from 'react';
import * as m from 'motion/react-m';
import { useAnimate, stagger } from 'motion/react';
import { InitWindow } from '@/components/init-window';

const FULL_TEXT = '> INITIALIZING SYNAPTIC BRIDGE... \n> LOADING KERNEL v13.3.7 (STABLE)... \n> DECRYPTING ASSETS: [||||||||||] 100% \n> IDENTITY CONFIRMED: VOLCMEN \n> WELCOME TO THE NETWORK.';
const POST_COMPLETION_DELAY_MS = 2500;
const CHARACTERS = FULL_TEXT.split('').map((char, index) => ({
  char,
  id: `char-${index}`,
}));

interface TerminalIntroProps {
  onComplete: () => void;
  onClose: () => void;
}

export function TerminalIntro({ onComplete, onClose }: TerminalIntroProps) {
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const runAnimation = async () => {
      await animate(
        'span.char',
        { opacity: 1, display: 'inline' },
        { delay: stagger(0.03), duration: 0 },
      );

      setIsTypingDone(true);

      // Wait for the post-completion delay
      await new Promise((resolve) => {
        timeoutId = setTimeout(resolve, POST_COMPLETION_DELAY_MS);
      });

      onComplete();
    };

    runAnimation();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [animate, onComplete]);

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-3xl mx-auto flex items-center justify-center min-h-screen absolute inset-0 z-50 pointer-events-none"
    >
      <div className="w-full max-w-3xl px-4 pointer-events-auto">
        <InitWindow
          title="/home/volcmen/synaptic/init.sh"
          onClose={onClose}
        >
          <div
            ref={scope}
            className="whitespace-pre-wrap min-h-[120px] font-mono text-sm md:text-base leading-relaxed"
            role="status"
            aria-live="polite"
          >
            {CHARACTERS.map(character => (
              <span
                key={character.id}
                className="char opacity-0 hidden"
              >
                {character.char}
              </span>
            ))}
            {!isTypingDone && (
              <m.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block ml-1 text-primary align-text-bottom"
              >
                ▊
              </m.span>
            )}
          </div>
        </InitWindow>
      </div>
    </m.div>
  );
}
