'use client';

import { memo } from 'react';
import * as m from 'motion/react-m';
import { useTime, useTransform, type MotionValue } from 'motion/react';

const HEX_SIZE = 40;
const NEURON_COUNT = 10;
const W = HEX_SIZE * 1.732;
const VERT_DIST = HEX_SIZE * 1.5;
const GRID_COLS = 60;
const GRID_ROWS = 50;

function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

interface Neuron {
  id: number;
  path: string;
  duration: number;
  delay: number;
  traceDelay: number;
  color: string;
}

function generateNeuron(index: number): Neuron {
  let seed = index * 123.45; // Initial seed based on index

  const rand = () => {
    const r = seededRandom(seed);
    seed += 1;
    return r;
  };

  const generatePath = () => {
    let cx = Math.floor(rand() * GRID_COLS) * W;
    const cy = Math.floor(rand() * GRID_ROWS) * VERT_DIST;

    if (Math.floor(cy / VERT_DIST) % 2 !== 0) cx += W / 2;

    let path = `M ${cx} ${cy}`;

    const trunkSteps = 5 + Math.floor(rand() * 8);
    let currentX = cx;
    let currentY = cy;

    const directions = [
      { dx: W, dy: 0 },
      { dx: -W, dy: 0 },
      { dx: W / 2, dy: VERT_DIST },
      { dx: -W / 2, dy: VERT_DIST },
      { dx: W / 2, dy: -VERT_DIST },
      { dx: -W / 2, dy: -VERT_DIST },
    ];

    for (let i = 0; i < trunkSteps; i++) {
      const dir = directions[Math.floor(rand() * directions.length)];
      currentX += dir.dx;
      currentY += dir.dy;
      path += ` L ${currentX} ${currentY}`;

      // 30% chance to create a branch at each step (Deterministic)
      if (rand() > 0.7) {
        const branchSteps = 2 + Math.floor(rand() * 4);
        let branchX = currentX;
        let branchY = currentY;

        for (let j = 0; j < branchSteps; j++) {
          const branchDir = directions[Math.floor(rand() * directions.length)];
          branchX += branchDir.dx;
          branchY += branchDir.dy;
          path += ` L ${branchX} ${branchY}`;
        }

        // Return to trunk
        path += ` M ${currentX} ${currentY}`;
      }
    }

    return path;
  };

  return {
    id: index,
    path: generatePath(),
    duration: 4 + rand() * 6,
    delay: rand() * 5,
    traceDelay: rand() * 2,
    color: rand() > 0.7 ? '#00ffcc' : 'var(--primary)',
  };
}

const NEURONS = Array.from({ length: NEURON_COUNT }).map((_, i) => generateNeuron(i));

const NeuronPath = memo(function NeuronPath({ neuron, time }: { neuron: Neuron; time: MotionValue<number> }) {
  // Derive all animations from the single time source
  const neuronTime = useTransform(
    time,
    t => (t - neuron.delay * 1000) / (neuron.duration * 1000),
  );

  const pathLength = useTransform(
    neuronTime,
    (t) => {
      const cycle = t % 1;
      if (cycle < 0.4) return cycle / 0.4 * 0.4;
      return 0.4 - ((cycle - 0.4) / 0.6 * 0.4);
    },
  );

  const pathOffset = useTransform(neuronTime, t => t % 1);

  const opacity = useTransform(
    neuronTime,
    (t) => {
      const cycle = t % 1;
      if (cycle < 0.4) return cycle / 0.4;
      return 1 - ((cycle - 0.4) / 0.6);
    },
  );

  return (
    <g>
      <m.path
        d={neuron.path}
        fill="none"
        stroke={neuron.color}
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1, delay: neuron.traceDelay }}
      />

      <m.path
        d={neuron.path}
        fill="none"
        stroke={neuron.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="0 1"
        style={{
          pathLength,
          pathOffset,
          opacity,
        }}
      />
    </g>
  );
});

export function HexGrid() {
  const time = useTime();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none bg-transparent">
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <m.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundImage: 'inherit',
          }}
        />
      </m.div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <svg className="absolute inset-0 size-full">
        <g>
          {NEURONS.map(neuron => (
            <NeuronPath key={neuron.id} neuron={neuron} time={time} />
          ))}
        </g>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background opacity-80" />
    </div>
  );
}
