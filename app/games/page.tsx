import { Header } from '@/components/games/header';
import { List } from '@/components/games/list';

export default function GamesPage() {
  return (
    <main className="container mx-auto py-24 md:py-32 px-4 sm:px-6 lg:px-8 min-h-screen">
      <Header />
      <List />
    </main>
  );
}
