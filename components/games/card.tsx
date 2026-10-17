import { Play } from 'lucide-react';
import * as m from 'motion/react-m';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card as UiCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GameConfig } from '@/config/games.config';
import { cn } from '@/lib/utils';

interface CardProps {
  game: GameConfig;
  delay?: number;
  className?: string;
}

export function Card({ game, delay = 0, className }: CardProps) {
  const {
    badges = [],
    buttonText,
    content,
    description,
    external,
    href,
    icon: Icon,
    id,
    status,
    tags = [],
    title,
  } = game;

  const isActive = status === 'active';
  const isComingSoon = status === 'coming-soon';
  const isInDevelopment = status === 'in-development';
  const isDashed = isComingSoon || isInDevelopment;

  const imagePath = `/assets/images/games/${id}/image.png`;

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget;
    target.style.opacity = '0';
    target.style.pointerEvents = 'none';
    target.style.visibility = 'hidden';
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={cn('group relative', className)}
    >
      {isActive && (
        <div className="absolute -inset-1 rounded bg-gradient-to-r from-secondary/20 via-primary/20 to-secondary/20 opacity-0 blur-lg transition-all duration-500 group-hover:opacity-100" />
      )}

      <UiCard
        className={cn(
          'relative flex h-full flex-col overflow-hidden border-2 backdrop-blur-md transition-all duration-500',
          isDashed ? 'border-dashed border-border/30 bg-muted/5' : 'border-border/40 bg-card/70',
          isComingSoon ? 'hover:border-primary/60' : 'hover:border-secondary/60',
          isActive && 'group-hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
        )}
      >
        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-secondary/5 to-primary/5">
          {!isInDevelopment && (
            <Image
              src={imagePath}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={handleImageError}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/20 to-transparent" />

          {badges.length > 0 && (
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              {badges.map(badge => {
                const Icon = badge.icon;
                return (
                  <Badge
                    key={`${badge.text}-${badge.variant ?? 'default'}`}
                    variant={badge.variant}
                    className={cn(badge.className, 'shadow-lg backdrop-blur-md')}
                  >
                    {Icon && <Icon className="mr-1 size-3" />}
                    {badge.text}
                  </Badge>
                );
              })}
            </div>
          )}
        </div>

        <CardHeader className="space-y-3 pb-3">
          <div className="flex items-center justify-between">
            <div
              className={cn(
                'w-fit rounded border p-2.5 transition-all',
                isActive
                  ? 'border-secondary/30 bg-secondary/10 group-hover:border-secondary/50 group-hover:bg-secondary/20'
                  : 'border-border/30 bg-muted/10',
              )}
            >
              <Icon
                className={cn('size-6', isActive ? 'text-secondary' : 'text-muted-foreground/50')}
              />
            </div>
          </div>
          <CardTitle
            className={cn(
              'font-display text-2xl leading-tight font-bold tracking-tight uppercase md:text-3xl',
              isActive
                ? 'transition-colors group-hover:text-secondary'
                : 'text-muted-foreground/70',
            )}
          >
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="font-mono text-sm leading-relaxed">
              {description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="grow space-y-4 pb-4">
          <p
            className={cn(
              'font-mono text-sm leading-relaxed',
              isActive ? 'text-muted-foreground/90' : 'text-muted-foreground/60',
            )}
          >
            {content}
          </p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="border border-secondary/30 bg-secondary/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-secondary"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t border-border/30 pt-4">
          {isInDevelopment ? (
            <Button disabled variant="outline" className="w-full">
              {buttonText}
            </Button>
          ) : external ? (
            <Link href={href} target="_blank" className="w-full">
              <Button variant="hero" size="lg" className="group/btn w-full">
                <Play className="mr-2 size-5 transition-transform group-hover/btn:scale-110" />
                {buttonText}
              </Button>
            </Link>
          ) : (
            <Button asChild variant="hero" size="lg" className="group/btn w-full">
              <Link href={href} target="_blank">
                <Play className="mr-2 size-5 transition-transform group-hover/btn:scale-110" />
                {buttonText}
              </Link>
            </Button>
          )}
        </CardFooter>

        <div
          className={cn(
            'absolute top-0 left-0 size-4 border-t-2 border-l-2 transition-colors',
            isActive
              ? 'border-secondary/50 group-hover:border-secondary'
              : 'border-muted-foreground/20',
          )}
        />
        <div
          className={cn(
            'absolute right-0 bottom-0 size-4 border-r-2 border-b-2 transition-colors',
            isActive
              ? 'border-primary/50 group-hover:border-primary'
              : 'border-muted-foreground/20',
          )}
        />
      </UiCard>
    </m.div>
  );
}
