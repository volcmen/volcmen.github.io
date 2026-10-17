import { Biography } from '@/components/about/biography';
import { Hobbies } from '@/components/about/hobbies';
import { Intro } from '@/components/about/intro';
import { Radio } from '@/components/about/radio';

export default function AboutPage() {
  return (
    <main className="container mx-auto min-h-screen px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="flex flex-col space-y-20">
        <Intro />
        <Radio />
        <Biography />
        <Hobbies />
      </div>
    </main>
  );
}
