import { Layers } from 'lucide-react';

import { cn } from '@/lib/utils';

import { ProjectCarousel } from './carousel';

interface ProjectGalleryProps {
  images?: string[];
  title: string;
  className?: string;
}

export function ProjectGallery({ images, title, className }: ProjectGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className={cn('space-y-4', className)}>
      <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
        <Layers className="size-5 text-primary" /> VISUAL_DATA
      </h2>
      <div className="overflow-hidden rounded-lg border border-primary/20 bg-black/50 p-1">
        <ProjectCarousel images={images} title={title} />
      </div>
    </section>
  );
}
