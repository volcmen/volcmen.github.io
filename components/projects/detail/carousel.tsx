'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const BASE_ZOOM = 1.6;

interface ProjectCarouselProps {
  images: string[];
  title: string;
  className?: string;
}

export function ProjectCarousel({ images, title, className }: ProjectCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const pointerStart = useRef({
    x: 0,
    y: 0,
    offsetX: 0,
    offsetY: 0,
    rect: { left: 0, top: 0, width: 0, height: 0 },
  });

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => setCurrent(api.selectedScrollSnap() + 1);

    queueMicrotask(updateCurrent);

    api.on('select', updateCurrent);

    return () => {
      api.off('select', updateCurrent);
    };
  }, [api]);

  if (!images || images.length === 0) return null;

  const zoomScale = isZoomedIn ? BASE_ZOOM : 1;

  const resetZoomState = () => {
    setIsZoomedIn(false);
    setOffset({ x: 0, y: 0 });
  };

  const handleImageSelect = (image: string) => {
    setZoomedImage(image);
    resetZoomState();
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (open) return;
    setZoomedImage(null);
    resetZoomState();
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerStart.current = {
      x: event.clientX,
      y: event.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
      rect,
    };

    if (!isZoomedIn || event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsPanning(false);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!isZoomedIn) return;
    if (event.buttons !== 1) {
      if (isPanning) setIsPanning(false);
      return;
    }
    const dx = event.clientX - pointerStart.current.x;
    const dy = event.clientY - pointerStart.current.y;
    const distance = Math.hypot(dx, dy);

    if (!isPanning && distance > 4) {
      setIsPanning(true);
    }

    if (!isPanning) return;

    event.preventDefault();
    setOffset({
      x: pointerStart.current.offsetX + dx,
      y: pointerStart.current.offsetY + dy,
    });
  };

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (isPanning) {
      setIsPanning(false);
      return;
    }

    if (!zoomedImage) return;

    if (!isZoomedIn) {
      const { rect } = pointerStart.current;
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const scaleDelta = BASE_ZOOM - 1;

      setOffset({
        x: (centerX - clickX) * scaleDelta,
        y: (centerY - clickY) * scaleDelta,
      });
      setIsZoomedIn(true);
    }
    else {
      setIsZoomedIn(false);
      setOffset({ x: 0, y: 0 });
    }
  };

  return (
    <div className={cn('mx-auto w-full max-w-4xl', className)}>
      <Carousel className="w-full" opts={{ loop: true }} setApi={setApi}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={image}>
              <button
                type="button"
                className="relative aspect-video w-full cursor-zoom-in overflow-hidden rounded-lg border bg-muted"
                onClick={() => handleImageSelect(image)}
              >
                <Image
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="mt-4 flex justify-center">
        <Badge variant="secondary">
          {current}
          {' '}
          /
          {images.length}
        </Badge>
      </div>

      <Dialog
        open={!!zoomedImage}
        onOpenChange={handleDialogOpenChange}
      >
        <DialogContent className="flex h-[85vh] w-[85vw] max-w-none flex-col overflow-hidden p-0 sm:max-w-[85vw]">
          <DialogTitle className="sr-only">
            {title}
            {' '}
            - Zoomed Image
          </DialogTitle>
          <button
            type="button"
            className={`relative flex h-full w-full items-center justify-center overflow-auto ${isZoomedIn ? (isPanning ? 'cursor-grabbing' : 'cursor-zoom-out') : 'cursor-zoom-in'}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {zoomedImage && (
              <div
                className="relative h-full w-full overflow-hidden transition-all duration-200 ease-in-out"
              >
                <Image
                  src={zoomedImage}
                  alt={`${title} - Zoomed`}
                  fill
                  className="origin-center object-contain transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoomScale})`,
                  }}
                  draggable={false}
                  unoptimized
                />
              </div>
            )}
          </button>
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm">
            {isZoomedIn ? 'Click to fit' : 'Click to zoom'}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
