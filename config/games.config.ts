import { BrainCircuit, Crosshair, Gamepad2, LucideIcon, Skull, Zap } from 'lucide-react';

type GameStatus = 'active' | 'coming-soon' | 'in-development';

interface GameBadge {
  variant: 'outline' | 'secondary';
  text: string;
  icon?: LucideIcon;
  className?: string;
}

interface GameConfig {
  id: string;
  title: string;
  description: string;
  content: string;
  href: string;
  icon: LucideIcon;
  badges: GameBadge[];
  tags?: string[];
  status: GameStatus;
  buttonText: string;
  external?: boolean;
}

const GAMES_CONFIG: GameConfig[] = [
  {
    id: 'doom',
    title: 'DOOM',
    description: 'The legendary 1993 first-person shooter',
    content: 'My first demon-slaying gig at age 4-5 on grandpa\'s MS-DOS rig—loaded from those chunky 8-inch floppies. Spent countless hours mastering IDDQD and IDKFA, even on Nightmare (yes, I still have the muscle memory). Now running natively in your browser via WebAssembly. No floppy drive required.',
    href: '/games/doom',
    icon: Gamepad2,
    badges: [
      {
        variant: 'outline',
        text: 'WASM',
        icon: Zap,
        className: 'bg-secondary/10 border-secondary/40 text-secondary font-bold',
      },
    ],
    tags: ['Keyboard', 'Fullscreen'],
    status: 'active',
    buttonText: 'C:\\> DOOM.EXE_',
  },
  {
    id: 'proz-zero-game',
    title: 'Proz Zero Game',
    description: 'A top-down ballistic survival simulation.',
    content: 'Executing a primary directive held in memory since childhood: architect the ultimate top-down chaos engine. A relentless fusion of \'Vampire Survivors\' swarm logic and \'Diablo\' atmospheric grit, optimized for maximum kinetic satisfaction.',
    href: 'https://proz-zero-game.volc.men/',
    icon: Crosshair,
    badges: [
      {
        variant: 'outline',
        text: 'SWARM_LOGIC',
        icon: Skull,
        className: 'bg-red-500/10 border-red-500/40 text-red-500 font-bold',
      },
      {
        variant: 'outline',
        text: 'CORE_MEMORY',
        icon: BrainCircuit,
        className: 'bg-amber-500/10 border-amber-500/40 text-amber-500 font-bold',
      },
    ],
    tags: ['Roguelite', '2D Architecture', 'Bullet Hell'],
    status: 'active',
    buttonText: 'LAUNCH GAME',
  },
  {
    id: 'more-games',
    title: 'MORE GAMES',
    description: '',
    content: 'Additional interactive experiences in the pipeline. Stay tuned!',
    href: '#',
    icon: Gamepad2,
    badges: [],
    status: 'in-development',
    buttonText: 'IN DEVELOPMENT',
  },
];

export type { GameConfig };
export { GAMES_CONFIG };
