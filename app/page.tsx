import { Landing } from '@/components/home/landing';
import { Particles } from '@/components/home/particles';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
      <Particles />
      <Landing />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background via-background/50 to-transparent z-20 pointer-events-none" />
    </main>
  );
}
