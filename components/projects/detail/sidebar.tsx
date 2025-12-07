import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiGithub as Github } from '@icons-pack/react-simple-icons';
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
      <div className="bg-card/20 border border-primary/30 p-6 rounded-lg sticky top-24 backdrop-blur-md">
        <h3 className="text-lg font-display font-bold mb-6 text-primary border-b border-primary/20 pb-2">
          ACCESS_CONTROLS
        </h3>

        <div className="space-y-4">
          {link && (
            <Button asChild className="w-full" variant="hero">
              <Link href={link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 size-4" />
                {' '}
                LAUNCH_PROJECT
              </Link>
            </Button>
          )}
          {repo && (
            <Button asChild variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10">
              <Link href={repo} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 size-4" />
                {' '}
                SOURCE_CODE
              </Link>
            </Button>
          )}
        </div>

        {features && (
          <div className="mt-8 space-y-4">
            <h4 className="font-mono text-sm text-muted-foreground uppercase tracking-wider">
              Key Features
            </h4>
            <ul className="space-y-2">
              {features.map(feature => (
                <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="text-primary mt-1">▹</span>
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
