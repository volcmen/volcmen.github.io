import { Layers } from 'lucide-react';
import { ProjectCarousel } from './carousel';
import { cn } from '@/lib/utils';

interface ProjectGalleryProps {
  images?: string[];
  title: string;
  className?: string;
}

export function ProjectGallery({ images, title, className }: ProjectGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className={cn('space-y-4', className)}>
      <h2 className="text-2xl font-display font-bold flex items-center gap-2">
        <Layers className="size-5 text-primary" />
        {' '}
        VISUAL_DATA
      </h2>
      <div className="border border-primary/20 rounded-lg overflow-hidden bg-black/50 p-1">
        <ProjectCarousel images={images} title={title} />
      </div>
    </section>
  );
}
