import { Header } from '@/components/games/header';
import { List } from '@/components/games/list';

export default function GamesPage() {
  return (
    <main className="container mx-auto min-h-screen px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <Header />
      <List />
    </main>
  );
}
