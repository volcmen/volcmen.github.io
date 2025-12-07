import type { Metadata } from 'next';
import { JetBrains_Mono, Rajdhani } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Nav } from '@/components/nav';
import { HexGrid } from '@/components/effects/hex-grid';
import { Scanlines } from '@/components/effects/scanlines';
import { MotionLazyConfig } from '@/components/providers/motion-lazy-config';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

const rajdhani = Rajdhani({
  variable: '--font-rajdhani',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'SYNAPTIC UPLINK // VOLCMEN',
    template: '%s // VOLCMEN_ARCHIVE',
  },
  description: 'Senior Architect. Peeking behind the curtain of the web to build robust systems and retro-fueled experiences.',

  applicationName: 'VOLCMEN_OS_V8',
  keywords: ['Full Stack', 'Cyberpunk', 'System Architect', 'Game Dev', 'React', 'Next.js'],
  authors: [{ name: 'Volcmen' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          jetbrainsMono.variable,
          rajdhani.variable,
          'min-h-screen overflow-x-hidden bg-background text-foreground',
          'selection:bg-primary selection:text-primary-foreground',
          'flex flex-col antialiased',
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MotionLazyConfig>
            <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--background)_0%,_transparent_100%)] dark:bg-[radial-gradient(circle_at_center,_var(--background)_0%,_black_100%)]" />
              <HexGrid />
            </div>
            <Scanlines />
            <Nav />

            <main className="relative z-10 flex-1">
              {children}
            </main>
          </MotionLazyConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
