import { DoomGame } from '@/components/games/doom/doom-game';

export default function DoomPage() {
  return (
    <main className="container mx-auto py-24 px-4 flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
        Doom 1993 (WASM)
      </h1>
      <DoomGame />
    </main>
  );
}
