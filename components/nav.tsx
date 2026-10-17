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
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/90 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 w-full items-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 justify-start">
          <Link href="/" className="group flex items-center space-x-3" aria-label="Back to home">
            <div className="relative flex size-10 items-center justify-center border-2 border-primary/60 bg-primary/10 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_rgba(251,191,36,0.4)]">
              <span className="font-display text-xl font-bold text-primary transition-colors group-hover:text-primary-glow">
                V
              </span>
              <div className="absolute -right-1 -bottom-1 size-2.5 bg-primary transition-colors group-hover:bg-primary-glow" />
              <div className="absolute -top-1 -left-1 size-2.5 border-t-2 border-l-2 border-primary transition-colors group-hover:border-primary-glow" />
            </div>
            <span className="hidden font-display text-lg font-bold tracking-[0.2em] text-foreground transition-colors duration-300 group-hover:text-primary sm:inline-block">
              VOLCMEN
            </span>
          </Link>
        </div>

        <nav
          className="flex shrink-0 items-center justify-center gap-1 sm:gap-2 md:gap-4"
          aria-label="Primary navigation"
        >
          <NavLinks items={navItems} />
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="border-l-2 border-border/50 pl-4">
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
    </header>
  );
}
