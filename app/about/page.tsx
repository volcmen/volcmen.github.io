import { Intro } from '@/components/about/intro';
import { Radio } from '@/components/about/radio';
import { Hobbies } from '@/components/about/hobbies';
import { Biography } from '@/components/about/biography';

export default function AboutPage() {
  return (
    <main className="container mx-auto py-24 md:py-32 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="flex flex-col space-y-20">
        <Intro />
        <Radio />
        <Biography />
        <Hobbies />
      </div>
    </main>

  );
}
