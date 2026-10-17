import { Landing } from '@/components/home/landing';
import { Particles } from '@/components/home/particles';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <Particles />
      <Landing />
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-40 w-full bg-gradient-to-t from-background via-background/50 to-transparent" />
    </main>
  );
}
