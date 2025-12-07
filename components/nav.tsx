import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { NavLinks } from './nav-links';

interface NavItem {
  name: string;
  href: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { name: 'PROJECTS', href: '/projects' },
  { name: 'GAMES', href: '/games' },
  { name: 'ABOUT', href: '/about' },
  { name: 'BLOG', href: 'https://blog.volc.men', external: true },
];

export function Nav() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="w-full mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 justify-start">
          <Link href="/" className="flex items-center space-x-3 group" aria-label="Back to home">
            <div className="relative flex size-10 items-center justify-center border-2 border-primary/60 bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(251,191,36,0.4)]">
              <span className="font-display font-bold text-xl text-primary group-hover:text-primary-glow transition-colors">V</span>
              <div className="absolute -bottom-1 -right-1 size-2.5 bg-primary group-hover:bg-primary-glow transition-colors" />
              <div className="absolute -top-1 -left-1 size-2.5 border-t-2 border-l-2 border-primary group-hover:border-primary-glow transition-colors" />
            </div>
            <span className="hidden font-display font-bold tracking-[0.2em] text-lg sm:inline-block text-foreground group-hover:text-primary transition-colors duration-300">
              VOLCMEN
            </span>
          </Link>
        </div>

        <nav className="flex shrink-0 items-center justify-center gap-1 sm:gap-2 md:gap-4" aria-label="Primary navigation">
          <NavLinks items={navItems} />
        </nav>

        <div className="flex flex-1 justify-end items-center space-x-4">
          <div className="pl-4 border-l-2 border-border/50">
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
    </header>
  );
}
