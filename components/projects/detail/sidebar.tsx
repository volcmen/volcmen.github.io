import { SiGithub as Github } from '@icons-pack/react-simple-icons';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProjectSidebarProps {
  link?: string;
  repo?: string;
  features?: string[];
  className?: string;
}

export function ProjectSidebar({ link, repo, features, className }: ProjectSidebarProps) {
  return (
    <div className={cn('space-y-8', className)}>
      <div className="sticky top-24 rounded-lg border border-primary/30 bg-card/20 p-6 backdrop-blur-md">
        <h3 className="mb-6 border-b border-primary/20 pb-2 font-display text-lg font-bold text-primary">
          ACCESS_CONTROLS
        </h3>

        <div className="space-y-4">
          {link && (
            <Button asChild className="w-full" variant="hero">
              <Link href={link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 size-4" /> LAUNCH_PROJECT
              </Link>
            </Button>
          )}
          {repo && (
            <Button
              asChild
              variant="outline"
              className="w-full border-primary/50 text-primary hover:bg-primary/10"
            >
              <Link href={repo} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 size-4" /> SOURCE_CODE
              </Link>
            </Button>
          )}
        </div>

        {features && (
          <div className="mt-8 space-y-4">
            <h4 className="font-mono text-sm tracking-wider text-muted-foreground uppercase">
              Key Features
            </h4>
            <ul className="space-y-2">
              {features.map(feature => (
                <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="mt-1 text-primary">▹</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
