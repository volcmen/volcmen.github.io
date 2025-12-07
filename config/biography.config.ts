import {
  AudioWaveform,
  Cpu,
  Gamepad2,
  Monitor,
  ShieldCheck,
  Server,
  Terminal,
} from 'lucide-react';
import { BaseConfigItem } from './types';

interface BiographyLog extends BaseConfigItem {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  status: string;
  content: string[];
  image?: string;
}

const BIOGRAPHY_LOGS: BiographyLog[] = [
  {
    id: '01',
    title: 'ORIGIN_STORY',
    subtitle: 'THE Y2K SHADOW',
    year: '1999',
    icon: Monitor,
    colors: {
      text: 'text-blue-400',
      border: 'border-blue-400/20',
      bg: 'bg-blue-400/5',
    },
    status: 'INIT_SEQUENCE',
    content: [
      'It began in 1999, right as the world was panicking about the Millennium Bug. While everyone else was selling their electronics in fear of Y2K, my father bought our first machine: a beige tower running Windows 95 with MS-DOS dual boot.',
      'I was 4 years old.',
      'My grandfather became my first mentor—the original Root User in my life. He didn\'t just let me play games; he taught me the command line. Under his guidance, I learned the dark arts of MS-DOS, navigated the blue screens of Volkov Commander, and mastered the ritual of the "Clean Windows Reinstall."',
      'He even possessed a peripheral that was rare for many setups at the time: a mouse. He taught me the specific initialization script—loading mouse.com—to enable pointer support in the shell. But I never understood why. Why drag a plastic brick across the table when a precise sequence of keystrokes could execute the command instantly?',
      'That was my first lesson in efficiency: the GUI is optional; the keyboard is sovereign.',
    ],
  },
  {
    id: '02',
    title: 'REALITY_INJECTION',
    subtitle: 'THE GTA ERA',
    year: '2004',
    icon: Gamepad2,
    colors: {
      text: 'text-green-500',
      border: 'border-green-500/20',
      bg: 'bg-green-500/5',
    },
    status: 'MOD_LOADED',
    content: [
      'The turning point was GTA: San Andreas. While others were just driving cars, I was obsessed with opening the hood of the game itself.',
      'I discovered Modding. It started innocently—using primitive Paint tools to retexture shops and logos. But soon, I found the physics engine hidden in .ini files. I tweaked variables, making cars accelerate to lightspeed and characters run like Sonic.',
      'I tried to learn 3D modeling (3ds Max) to build my own vehicles, but my hardware was too obsolete to render the polygons. That limitation forced me deeper into the code. I started using IDA Pro to disassemble binaries, trying to understand the "Matrix" behind the game mechanics. I wasn\'t just a player anymore; I was an architect in training.',
    ],
  },
  {
    id: '03',
    title: 'THE_SERVER_ADMIN',
    subtitle: 'LOCALHOST SOVEREIGN',
    year: '2007',
    icon: Server,
    colors: {
      text: 'text-orange-500',
      border: 'border-orange-500/20',
      bg: 'bg-orange-500/5',
    },
    status: 'NET_ONLINE',
    content: [
      'When the internet was too slow for MMOs, I built my own worlds.',
      'I taught myself how to self-host servers for Lineage 2 and World of Warcraft. I configured databases, managed firewalls, and ran virtual machines before I even knew what "DevOps" was.',
      'My second PC became the server, and I became the Game Master. I invited friends to join my private network, where we played MMORPGs like single-player narrative campaigns. We finished quests and cleared dungeons in a world I controlled. It was my first taste of backend engineering—the thrill of keeping the system alive for the users.',
    ],
  },
  {
    id: '04',
    title: 'SELF_COMPILED',
    subtitle: 'THE LOGIC LAYER',
    year: '2010',
    icon: Terminal,
    colors: {
      text: 'text-purple-500',
      border: 'border-purple-500/20',
      bg: 'bg-purple-500/5',
    },
    status: 'COMPILING',
    content: [
      'My formal training wasn\'t academic; it was a brute-force compilation in isolation. Hampered by a language barrier and search protocol failures, I was lost until I unearthed a localized digital archive of C++ and Java learning materials.',
      'I built terminal calculators and logic puzzles, but simple utilities weren\'t enough. I wanted to build worlds. However, lacking GUI knowledge, I was confined to the terminal—forced to render imagination in pure text. I engineered complex text adventures like Zork and even rendered simple 2D shooter using nothing but ASCII symbols.',
      'Then came the catalyst: JavaScript: The Definitive Guide. It was the decryption key for the web\'s architecture. Armed with this new protocol, I pivoted to the browser as my runtime. I ported the physics engine of Gravity Defied directly into the DOM—a raw experiment using vanilla JavaScript to prove the web could handle complex kinetics.',
      'Later, when Node.js released, it shattered the browser sandbox completely, allowing me to create a CLI or a server, and unify the entire stack.',
      'The Pandora Box was opened.',
    ],
  },
  {
    id: '05',
    title: 'CRITICAL_FAILURE',
    subtitle: 'THE LINUX AWAKENING',
    year: '2013',
    icon: ShieldCheck,
    colors: {
      text: 'text-red-500',
      border: 'border-red-500/20',
      bg: 'bg-red-500/5',
    },
    status: 'SYSTEM_REBOOT',
    content: [
      'With great access comes great vulnerability.',
      'My journey hit a wall when I contracted my first devastating virus. It bricked my PC completely. I was crushed, but it was a necessary failure. It forced me to understand Security.',
      'I dove into protocols, ports, and network layers. To immunize my workflow, I abandoned Windows and installed Debian Linux. That crash taught me resilience. It transitioned me from a "script kiddie" into a developer who understands the importance of a hardened kernel.',
      'But I craved deeper control. I eventually migrated to Arch Linux, forcing myself to build the system from the ground up. The learning curve was vertical, but it gave me absolute command over the machine.',
      '(And yes, I use Arch BTW).',
    ],
  },
  {
    id: '06',
    title: 'AUDIO_SYNTHESIS',
    subtitle: 'THE FREQUENCY SHIFT',
    year: '2015',
    icon: AudioWaveform,
    colors: {
      text: 'text-cyan-500',
      border: 'border-cyan-500/20',
      bg: 'bg-cyan-500/5',
    },
    status: 'AUDIO_DRIVERS',
    content: [
      'Between 2015 and 2016, my creative output expanded from visual code to audible frequencies. I became obsessed with the architecture of sound, heavily inspired by the underground Demoscene.',
      'I was captivated by the work of legends like Jesper Kyd, who defined an era by merging hypnotic trackers with bleeding-edge visuals. Watching code and music fuse into a single experience sparked a new ambition in me.',
      'I mastered FL Studio and Ableton Live, treating the Digital Audio Workstation (DAW) like an IDE. I wasn\'t just composing music; I was engineering it—debugging beats, optimizing mixing chains, and compiling raw waveforms into atmospheric soundscapes. This period taught me that rhythm and logic are not opposites; they are the same language spoken in different dialects.',
    ],
  },
  {
    id: '07',
    title: 'CURRENT_STATE',
    subtitle: 'THE ARCHITECT\'S PARADOX',
    year: 'NOW',
    icon: Cpu,
    colors: {
      text: 'text-primary',
      border: 'border-primary/20',
      bg: 'bg-primary/5',
    },
    status: 'RUNNING',
    content: [
      'Today, that same obsession drives my career. I am a Engineer who builds systems with the same curiosity I had as a kid editing .ini files.',
      'Ironically, I still play games the way I build software. When I boot up Skyrim or Fallout: New Vegas, I don\'t just play—I spend weeks curating a 500+ mod list, resolving conflicts, and optimizing load orders.',
      'For me, creating the perfectly stable system is more fun than the game itself. Creating is my mojo, my life\'s directive. I am thrilled to build, to create, and I simply thrive on converting raw entropy into structured logic.',
      'I have deployed code across the entire spectrum—from the agile trenches of scrappy startups and boutique agencies to the massive infrastructure of a Fortune-scale giant. I have built games in Unity, engineered resilient digital ecosystems from the void to live deployment, and pushed web technologies to their theoretical limits. But at my core, I am still that kid in 1999—forever trying to bypass the interface to touch the raw code that defines the system',
    ],
  },
];

export { BIOGRAPHY_LOGS };
