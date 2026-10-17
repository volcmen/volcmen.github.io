'use client';

import * as m from 'motion/react-m';

import { GAMES_CONFIG } from '@/config/games.config';

import { Card } from './card';

export function List() {
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
    >
      {GAMES_CONFIG.map((game, index) => (
        <Card key={game.id} game={game} delay={0.2 + index * 0.1} />
      ))}
    </m.div>
  );
}
