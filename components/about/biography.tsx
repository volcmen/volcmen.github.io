'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useScroll, useTransform } from 'motion/react';
import * as m from 'motion/react-m';
import { Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

import { BIOGRAPHY_LOGS } from '@/config/biography.config';

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
    <section ref={containerRef} className={cn('max-w-5xl mx-auto w-full py-12', className)}>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center space-y-4 will-change-[transform,opacity]"
      >
        <div className="inline-flex items-center gap-2 text-primary font-mono text-xs tracking-widest uppercase mb-2">
          <Terminal className="size-4" />
          <span>System Logs</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold">
          THE
          {' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">SOURCE CODE</span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto" />
      </m.div>

      <div className="relative">
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border/30 h-full" aria-hidden />

        <m.div
          style={{ height: progressHeight }}
          className="absolute left-[20px] md:left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary via-secondary to-primary z-10 origin-top will-change-transform"
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
                  'relative z-20 flex flex-col md:flex-row gap-8 items-start will-change-[transform,opacity]',
                  !isEven && 'md:flex-row-reverse',
                )}
              >
                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20 top-0">
                  <div className={cn(
                    'size-10 rounded-full border-2 bg-background flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)]',
                    log.colors.border,
                  )}
                  >
                    <Icon className={cn('size-5', log.colors.text)} />
                  </div>
                </div>

                <div className={cn(
                  'ml-12 md:ml-0 md:w-1/2 flex items-center',
                  !isEven ? 'md:justify-start' : 'md:justify-end',
                )}
                >
                  <div className={cn(
                    'hidden md:flex flex-col',
                    !isEven ? 'items-start text-left pl-12' : 'items-end text-right pr-12',
                  )}
                  >
                    <span className={cn('text-5xl font-display font-black tracking-tighter opacity-20', log.colors.text)}>{log.year}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="font-mono text-[10px] tracking-wider">
                        OFFSET_0x
                        {log.id}
                      </Badge>
                    </div>
                  </div>
                  {/* Mobile Only Header */}
                  <div className="md:hidden flex flex-col pl-2">
                    <span className={cn('text-2xl font-display font-bold', log.colors.text)}>{log.year}</span>
                    <span className="text-xs font-mono text-muted-foreground">
                      OFFSET_0x
                      {log.id}
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                  <div className={cn('relative', !isEven ? 'md:pr-12' : 'md:pl-12')}>
                    <Card
                      className={cn(
                        'relative overflow-hidden border bg-card/40 hover:bg-card/60 transition-colors group transform-gpu',
                        log.colors.border,
                      )}

                    >
                      <div className={cn('absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity', log.colors.bg)} />

                      {log.image && (
                        <div className="relative w-full h-48 overflow-hidden bg-muted/20">
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
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

                      <CardContent className="p-6 md:p-8 relative z-10 space-y-4">
                        <div>
                          <h3 className={cn('text-xl md:text-2xl font-bold font-display tracking-tight', log.colors.text)}>
                            {log.title}
                          </h3>
                          <p className="text-sm font-mono text-muted-foreground tracking-widest mt-1">
                            {` // ${log.subtitle}`}
                          </p>
                        </div>

                        <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
                          {log.content.map(paragraph => (
                            <p key={`${log.id}-p-${paragraph.slice(0, 24)}`} className={cn(paragraph === log.content[0] && 'text-foreground font-medium')}>
                              {paragraph}
                            </p>
                          ))}
                        </div>

                        <div className="pt-6 flex flex-wrap gap-2 items-center border-t border-border/50 mt-4">
                          <Badge
                            variant="outline"
                            className={cn(
                              'font-mono text-[10px] bg-background/50 backdrop-blur-sm',
                              log.colors.border,
                              log.colors.text,
                            )}
                          >
                            STATUS:
                            {' '}
                            {log.status}
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
