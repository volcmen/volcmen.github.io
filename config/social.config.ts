import { SiGithub as Github, SiSpotify as Spotify, SiSoundcloud as Soundcloud } from '@icons-pack/react-simple-icons';
import { BaseConfigItem } from './types';

interface Social extends BaseConfigItem {
  name: string;
  url: string;
  desc: string;
  stats: string;
}

const SOCIAL_LINKS: Social[] = [
  {
    name: 'GITHUB',
    icon: Github,
    url: 'https://github.com/volcmen',
    colors: {
      text: 'text-foreground',
      border: 'border-foreground/20',
      bg: 'bg-foreground/5',
    },
    desc: 'SOURCE_CODE // REPOS',
    stats: 'COMMIT_LOG_ACTIVE',
  },
  {
    name: 'SPOTIFY',
    icon: Spotify,
    url: 'https://open.spotify.com/user/volcmen',
    colors: {
      text: 'text-green-500',
      border: 'border-green-500/20',
      bg: 'bg-green-500/5',
    },
    desc: 'AUDIO_STREAM // MIX',
    stats: 'SIGNAL_DETECTED',
  },
  {
    name: 'SOUNDCLOUD',
    icon: Soundcloud,
    url: 'https://soundcloud.com/volcmen',
    colors: {
      text: 'text-orange-500',
      border: 'border-orange-500/20',
      bg: 'bg-orange-500/5',
    },
    desc: 'WAVEFORMS // UPLOAD',
    stats: 'FREQ_MODULATION',
  },
];

export type { Social };
export { SOCIAL_LINKS };
