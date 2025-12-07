import { Code, Disc, Film, Monitor, Server, Terminal, type LucideIcon } from 'lucide-react';

interface Hobby {
  icon: LucideIcon;
  title: string;
  description: string;
  accentClass: string;
}

const HOBBIES: Hobby[] = [
  {
    icon: Monitor,
    title: 'Digital Preservation',
    description:
      'Preserving the golden age of MS-DOS and arcade classics. I don\'t just play history; I emulate it.',
    accentClass: 'text-rose-500 group-hover:text-rose-500',
  },
  {
    icon: Code,
    title: 'Reverse Engineering',
    description:
      'Peeking behind the curtain. From hex editing saves to disassembling game engines and reverse engineering websites.',
    accentClass: 'text-emerald-500 group-hover:text-emerald-500',
  },
  {
    icon: Server,
    title: 'Home Lab Sovereign',
    description:
      'Self-hosting enthusiast. If it can be containerized, it lives on my metal. Open source independence.',
    accentClass: 'text-orange-500 group-hover:text-orange-500',
  },
  {
    icon: Terminal,
    title: 'System Tuning',
    description:
      'Linux ricing, kernel compilation, and hardware modding. The quest for the perfectly optimized machine.',
    accentClass: 'text-amber-500 group-hover:text-amber-500',
  },
  {
    icon: Film,
    title: 'Cinema & Art',
    description:
      'A student of visual storytelling. From obscure art house cinema to the visual language of sci-fi.',
    accentClass: 'text-violet-500 group-hover:text-violet-500',
  },
  {
    icon: Disc,
    title: 'Audio Fidelity',
    description:
      'High-fidelity synthwave architecture. Treating soundscapes as essential cognitive infrastructure.',
    accentClass: 'text-cyan-500 group-hover:text-cyan-500',
  },
];

export { HOBBIES };
