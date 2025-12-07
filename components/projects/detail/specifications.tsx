import { Suspense } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Terminal } from 'lucide-react';
import { getMDXComponents } from '@/lib/mdx-components';
import { cn } from '@/lib/utils';

interface ProjectSpecificationsProps {
  content: string;
  className?: string;
}

export function ProjectSpecifications({ content, className }: ProjectSpecificationsProps) {
  const mdxComponents = getMDXComponents({});

  return (
    <section className={cn('space-y-4', className)}>
      <h2 className="text-2xl font-display font-bold flex items-center gap-2 text-foreground">
        <Terminal className="size-5 text-primary" />
        {' '}
        DETAILED_SPECIFICATIONS
      </h2>
      <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-primary prose-code:text-secondary prose-pre:bg-black/50 prose-pre:border prose-pre:border-primary/20 prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground">
        <Suspense fallback={(
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        )}
        >
          <MDXRemote
            source={content}
            components={mdxComponents}
          />
        </Suspense>
      </div>
    </section>
  );
}
