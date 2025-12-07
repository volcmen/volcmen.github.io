'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  external?: boolean;
}

interface NavLinksProps {
  items: NavItem[];
}

export function NavLinks({ items }: NavLinksProps) {
  const pathname = usePathname();

  return items.map((item) => {
    const isActive
      = !item.external
        && (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)));

    return (
      <Link
        key={item.href}
        href={item.href}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noopener noreferrer' : undefined}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'relative px-3 sm:px-4 py-2 font-mono text-xs sm:text-sm font-medium transition-all duration-300 group hover:text-primary',
          isActive ? 'text-secondary text-glow-cyan' : 'text-muted-foreground',
        )}
      >
        {isActive && (
          <>
            <span className="absolute inset-0 z-[-1] bg-secondary/10 border-b-2 border-secondary shadow-[0_0_15px_rgba(6,182,212,0.3)] mix-blend-overlay" />
            <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-secondary" />
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-secondary" />
          </>
        )}
        <span className="relative z-10 flex items-center">
          <span
            className={cn(
              'mr-1 transition-all duration-300',
              isActive ? 'text-secondary opacity-100' : 'text-primary/40 opacity-0 group-hover:opacity-100',
            )}
          >
            &gt;
          </span>
          <span
            className={cn(
              'transition-transform duration-300',
              isActive ? 'translate-x-1' : 'group-hover:translate-x-1',
            )}
          >
            {item.name}
          </span>
        </span>
      </Link>
    );
  });
}
