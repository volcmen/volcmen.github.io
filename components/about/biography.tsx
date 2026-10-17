'use client';

import { Terminal } from 'lucide-react';
import { useMotionValue, useScroll, useTransform } from 'motion/react';
import * as m from 'motion/react-m';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BIOGRAPHY_LOGS } from '@/config/biography.config';
import { cn } from '@/lib/utils';

interface BiographyProps {
  className?: string;
}

export function Biography({ className }: BiographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);
  const lineHeight = useMotionValue(0);

  useEffect(() => {
    const updateHeight = () => {
      const last = lastItemRef.current;
      if (!last) return;

      lineHeight.set(last.offsetTop + last.offsetHeight);
    };

    const resizeObserver = new ResizeObserver(() => {
      // Use RAF to avoid layout thrash during resize bursts.
      requestAnimationFrame(updateHeight);
    });

    updateHeight();

    const last = lastItemRef.current;
    const container = containerRef.current;
    if (last) resizeObserver.observe(last);
    if (container) resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [lineHeight]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start when the section hits the viewport top, finish when the end reaches the viewport bottom
    offset: ['start start', 'end end'],
  });

  // Drive the progress line height directly so it starts at 0 and finishes exactly at the last node.
  const progressHeight = useTransform([scrollYProgress, lineHeight], ([progress, height]) => {
    const p = Number(progress) || 0;
    const h = Number(height) || 0;
    const clamped = Math.max(0, Math.min(1, p));
    return clamped * h;
  });

  return (
    <section ref={containerRef} className={cn('mx-auto w-full max-w-5xl py-12', className)}>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 space-y-4 text-center will-change-[transform,opacity]"
      >
        <div className="mb-2 inline-flex items-center gap-2 font-mono text-xs tracking-widest text-primary uppercase">
          <Terminal className="size-4" />
          <span>System Logs</span>
        </div>
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          THE{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SOURCE CODE
          </span>
        </h2>
        <div className="mx-auto h-1 w-20 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </m.div>

      <div className="relative">
        <div
          className="absolute top-0 bottom-0 left-[20px] h-full w-px -translate-x-1/2 bg-border/30 md:left-1/2"
          aria-hidden
        />

        <m.div
          style={{ height: progressHeight }}
          className="absolute top-0 left-[20px] z-10 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-primary via-secondary to-primary will-change-transform md:left-1/2"
        />

        <div className="space-y-12 md:space-y-24">
          {BIOGRAPHY_LOGS.map((log, index) => {
            const isEven = index % 2 === 0;
            const isLast = index === BIOGRAPHY_LOGS.length - 1;
            const Icon = log.icon;

            return (
              <m.div
                key={log.id}
                ref={isLast ? lastItemRef : null}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px -10% 0px' }} // Adjusted margin for better mobile triggering
                transition={{ duration: 0.5, delay: 0.1 }}
                className={cn(
                  'relative z-20 flex flex-col items-start gap-8 will-change-[transform,opacity] md:flex-row',
                  !isEven && 'md:flex-row-reverse',
                )}
              >
                <div className="absolute top-0 left-[20px] z-20 flex -translate-x-1/2 items-center justify-center md:left-1/2">
                  <div
                    className={cn(
                      'flex size-10 items-center justify-center rounded-full border-2 bg-background shadow-[0_0_15px_rgba(0,0,0,0.5)]',
                      log.colors.border,
                    )}
                  >
                    <Icon className={cn('size-5', log.colors.text)} />
                  </div>
                </div>

                <div
                  className={cn(
                    'ml-12 flex items-center md:ml-0 md:w-1/2',
                    !isEven ? 'md:justify-start' : 'md:justify-end',
                  )}
                >
                  <div
                    className={cn(
                      'hidden flex-col md:flex',
                      !isEven ? 'items-start pl-12 text-left' : 'items-end pr-12 text-right',
                    )}
                  >
                    <span
                      className={cn(
                        'font-display text-5xl font-black tracking-tighter opacity-20',
                        log.colors.text,
                      )}
                    >
                      {log.year}
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-[10px] tracking-wider">
                        OFFSET_0x
                        {log.id}
                      </Badge>
                    </div>
                  </div>
                  {/* Mobile Only Header */}
                  <div className="flex flex-col pl-2 md:hidden">
                    <span className={cn('font-display text-2xl font-bold', log.colors.text)}>
                      {log.year}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      OFFSET_0x
                      {log.id}
                    </span>
                  </div>
                </div>

                <div className="w-full pl-12 md:w-1/2 md:pl-0">
                  <div className={cn('relative', !isEven ? 'md:pr-12' : 'md:pl-12')}>
                    <Card
                      className={cn(
                        'group relative transform-gpu overflow-hidden border bg-card/40 transition-colors hover:bg-card/60',
                        log.colors.border,
                      )}
                    >
                      <div
                        className={cn(
                          'absolute inset-0 opacity-50 transition-opacity group-hover:opacity-100',
                          log.colors.bg,
                        )}
                      />

                      {log.image && (
                        <div className="relative h-48 w-full overflow-hidden bg-muted/20">
                          <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-transparent" />
                          <Image
                            src={log.image}
                            alt={log.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      )}

                      <CardContent className="relative z-10 space-y-4 p-6 md:p-8">
                        <div>
                          <h3
                            className={cn(
                              'font-display text-xl font-bold tracking-tight md:text-2xl',
                              log.colors.text,
                            )}
                          >
                            {log.title}
                          </h3>
                          <p className="mt-1 font-mono text-sm tracking-widest text-muted-foreground">
                            {` // ${log.subtitle}`}
                          </p>
                        </div>

                        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                          {log.content.map(paragraph => (
                            <p
                              key={`${log.id}-p-${paragraph.slice(0, 24)}`}
                              className={cn(
                                paragraph === log.content[0] && 'font-medium text-foreground',
                              )}
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/50 pt-6">
                          <Badge
                            variant="outline"
                            className={cn(
                              'bg-background/50 font-mono text-[10px] backdrop-blur-sm',
                              log.colors.border,
                              log.colors.text,
                            )}
                          >
                            STATUS: {log.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
