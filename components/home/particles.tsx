'use client';

import * as m from 'motion/react-m';
import { memo } from 'react';

import { mulberry32 } from '@/lib/prng';

const PARTICLE_COUNT = 20;
const GOLDEN_RATIO_CONJUGATE = 0.61803398875;

interface ParticleProps {
  initialX: string;
  initialY: string;
  animateY: number;
  duration: number;
  delay: number;
}

type ParticleConfig = ParticleProps & { id: number };

const Particle = memo(function Particle({
  initialX,
  initialY,
  animateY,
  duration,
  delay,
}: ParticleProps) {
  return (
    <m.div
      className="absolute h-1 w-1 rounded-full bg-primary/30"
      style={{ left: initialX, top: initialY }}
      initial={{ opacity: 0 }}
      animate={{
        y: [0, animateY],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeOut',
      }}
    />
  );
});

const createParticles = (): ParticleConfig[] => {
  const rand = mulberry32(0x9e3779b9);
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const x = (rand() + i * GOLDEN_RATIO_CONJUGATE) % 1;
    const y = (rand() + i * (GOLDEN_RATIO_CONJUGATE / 2)) % 1;
    return {
      id: i,
      initialX: `${x * 100}%`,
      initialY: `${y * 100}%`,
      animateY: -100 - rand() * 200,
      duration: 2 + rand() * 3,
      delay: rand() * 5,
    };
  });
};

const PRECOMPUTED_PARTICLES = createParticles();

export const Particles = memo(function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {PRECOMPUTED_PARTICLES.map(particle => (
        <Particle
          key={particle.id}
          initialX={particle.initialX}
          initialY={particle.initialY}
          animateY={particle.animateY}
          duration={particle.duration}
          delay={particle.delay}
        />
      ))}
    </div>
  );
});
