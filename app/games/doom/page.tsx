import { DoomGame } from '@/components/games/doom/doom-game';

export default function DoomPage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center px-4 py-24">
      <h1 className="mb-8 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-center text-4xl font-bold text-transparent">
        Doom 1993 (WASM)
      </h1>
      <DoomGame />
    </main>
  );
}
