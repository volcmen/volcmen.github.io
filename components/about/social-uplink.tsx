import * as m from 'motion/react-m';
import { ArrowUpRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { Social, SOCIAL_LINKS } from '@/config/social.config';

function SocialCard({ social, index }: { social: Social; index: number }) {
  const Icon = social.icon;

  return (
    <m.a
      href={social.url}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${social.name} profile`}
      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.35, ease: 'easeOut' }}
    >
      <Card
        className={cn(
          'h-full border bg-card/50 backdrop-blur-sm shadow-sm transition-transform duration-300',
          social.colors.border,
          'hover:-translate-y-1 hover:shadow-lg hover:bg-card/80',
        )}
      >
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className={cn('rounded-md p-2', social.colors.bg)}>
            <Icon aria-hidden className={cn('size-6', social.colors.text)} />
          </div>
          <ArrowUpRight
            aria-hidden
            className={cn(
              'size-4 text-muted-foreground transition-transform duration-300',
              social.colors.text,
              'group-hover:-translate-y-1 group-hover:translate-x-1',
            )}
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <CardTitle className="text-lg font-bold tracking-tight">{social.name}</CardTitle>
            <CardDescription className="mt-1 font-mono text-xs">{social.desc}</CardDescription>
          </div>
          <Badge
            variant="outline"
            className={cn(
              'font-mono text-[10px] bg-transparent',
              social.colors.border,
              social.colors.text,
            )}
          >
            {social.stats}
          </Badge>
        </CardContent>
      </Card>
    </m.a>
  );
}

interface SocialUplinkProps {
  className?: string;
}

export function SocialUplink({ className }: SocialUplinkProps) {
  return (
    <section className={cn('w-full', className)}>
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-8 flex items-center gap-2"
      >
        <div className="h-px flex-1 bg-border" aria-hidden />
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          DATA_UPLINK_ESTABLISHED
        </span>
        <div className="h-px flex-1 bg-border" aria-hidden />
      </m.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {SOCIAL_LINKS.map((social, index) => (
          <SocialCard key={social.name} social={social} index={index} />
        ))}
      </div>
    </section>
  );
}
