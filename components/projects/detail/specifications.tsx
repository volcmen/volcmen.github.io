import { Terminal } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Suspense } from 'react';

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
      <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-foreground">
        <Terminal className="size-5 text-primary" /> DETAILED_SPECIFICATIONS
      </h2>
      <div className="prose prose-invert prose-headings:font-display prose-headings:text-primary prose-code:text-secondary prose-pre:bg-black/50 prose-pre:border prose-pre:border-primary/20 prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground max-w-none">
        <Suspense
          fallback={
            <div className="animate-pulse space-y-4">
              <div className="h-4 w-3/4 rounded bg-muted"></div>
              <div className="h-4 w-full rounded bg-muted"></div>
              <div className="h-4 w-5/6 rounded bg-muted"></div>
            </div>
          }
        >
          <MDXRemote source={content} components={mdxComponents} />
        </Suspense>
      </div>
    </section>
  );
}
