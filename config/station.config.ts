import {
  Atom,
  Bot,
  CassetteTape,
  Music2,
  Orbit,
  Radio,
  Waves,
  Zap,
} from 'lucide-react';
import { BaseConfigItem } from './types';

interface Station extends BaseConfigItem {
  id: string;
  name: string;
  description: string;
  logo: string;
  url: string;
}

const STATIONS: Station[] = [
  {
    id: 'danger',
    name: 'Danger',
    description: '4:30',
    icon: Zap,
    logo: '/assets/images/about/radio-danger.svg',
    colors: {
      text: 'text-red-600 dark:text-red-500',
      border: 'border-red-600/50 dark:border-red-500/50',
      bg: 'bg-red-600/10 dark:bg-red-500/10',
    },
    url: 'https://www.youtube.com/watch?v=HuyioN2YTrM',
  },
  {
    id: 'msx-fm',
    name: 'MSX FM',
    description: 'Hosted by MC Codebreaker',
    icon: Radio,
    logo: '/assets/images/about/radio-msx-fm.svg',
    colors: {
      text: 'text-blue-700 dark:text-blue-400',
      border: 'border-blue-700/50 dark:border-blue-400/50',
      bg: 'bg-blue-700/10 dark:bg-blue-400/10',
    },
    url: 'https://www.youtube.com/watch?v=eMkdtMQH7WM',
  },
  {
    id: 'daft-punk',
    name: 'Daft Punk',
    description: 'Buy it, use it, break it, fix it, trash it, change it, mail, upgrade it',
    icon: Bot,
    logo: '/assets/images/about/radio-daft-punk.svg',
    colors: {
      text: 'text-cyan-600 dark:text-cyan-400',
      border: 'border-cyan-600/50 dark:border-cyan-400/50',
      bg: 'bg-cyan-600/10 dark:bg-cyan-400/10',
    },
    url: 'https://www.youtube.com/watch?v=PXYeARRyDWk',
  },
  {
    id: 'flash-fm',
    name: 'FLASH FM',
    description: 'The sound of the 80s, today',
    icon: Music2,
    logo: '/assets/images/about/radio-flash-fm.svg',
    colors: {
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-600/50 dark:border-purple-400/50',
      bg: 'bg-purple-600/10 dark:bg-purple-400/10',
    },
    url: 'https://www.youtube.com/watch?v=B-8EORB783c',
  },
  {
    id: 'aphex-twin',
    name: 'Aphex Twin',
    description: 'I just played some sandpaper',
    icon: Orbit,
    logo: '/assets/images/about/radio-aphex-twin.svg',
    colors: {
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-600/50 dark:border-amber-400/50',
      bg: 'bg-amber-600/10 dark:bg-amber-400/10',
    },
    url: 'https://www.youtube.com/watch?v=FATTzbm78cc',
  },
  {
    id: 'playback-fm',
    name: 'PLAYBACK FM',
    description: 'Classic East Coast hip-hop',
    icon: CassetteTape,
    logo: '/assets/images/about/radio-playback-fm.svg',
    colors: {
      text: 'text-orange-700 dark:text-orange-400',
      border: 'border-orange-700/50 dark:border-orange-400/50',
      bg: 'bg-orange-700/10 dark:bg-orange-400/10',
    },
    url: 'https://www.youtube.com/watch?v=okYufSMIQls',
  },
  {
    id: 'electro-choc',
    name: 'Electro Choc',
    description: 'This is Electro Choc',
    icon: Atom,
    logo: '/assets/images/about/radio-electro-choc.svg',
    colors: {
      text: 'text-pink-600 dark:text-pink-400',
      border: 'border-pink-600/50 dark:border-pink-400/50',
      bg: 'bg-pink-600/10 dark:bg-pink-400/10',
    },
    url: 'https://www.youtube.com/watch?v=gn9f38xRP4E',
  },
  {
    id: 'flylo-fm',
    name: 'FlyLo FM',
    description: 'Alternative hip-hop and dance music',
    icon: Waves,
    logo: '/assets/images/about/radio-flylo-fm.svg',
    colors: {
      text: 'text-yellow-600 dark:text-yellow-400',
      border: 'border-yellow-600/50 dark:border-yellow-400/50',
      bg: 'bg-yellow-600/10 dark:bg-yellow-400/10',
    },
    url: 'https://www.youtube.com/watch?v=YAzCJINGWGM',
  },

];

export { STATIONS };
