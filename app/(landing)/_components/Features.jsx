import React from 'react';

import { Courgette } from 'next/font/google';
import { cn } from '@/lib/utils';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';

const courgette = Courgette({
  subsets: ['latin'],
  weight: '400',
});
const Features = () => {
  return (
    <section className="space-y-10">
      <div className="flex flex-col items-center justify-center space-y-5 text-center">
        <div
          className={cn(
            'group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800',
            courgette.className
          )}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-5 py-[3px] transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Key Features</span>
          </AnimatedShinyText>
        </div>
        <div className="space-y-3">
          <h2 className={cn('text-4xl font-bold', courgette.className)}>
            Experience Seamless Learning at <br />
            Your Fingertips
          </h2>
          <p className="text-sm">
            Our platform simplifies your learning journey. Effortlessly navigate
            through <br />
            courses, quizzes, and track your progress with ease.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-4">
        {DATA.map((item, index) => (
          <Card key={index}>
            <CardHeader className="space-y-2">
              <CardTitle className="flex items-center gap-x-2.5 text-xl">
                {item.icon}
                {item.title}
              </CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;

const DATA = [
  {
    icon: <Icons.layers className="size-7" />,
    title: 'Customized AI Chat Bot',
    description: 'Our courses are tailored to meet diverse learning needs.',
  },
  {
    icon: <Icons.quiz className="size-7" />,
    title: 'Fun Knowledge Quizzes',
    description:
      'Challenge yourself with quizzes that reinforce your learning.',
  },
  {
    icon: <Icons.members className="size-7" />,
    title: 'Easy Progress Tracking',
    description: 'Monitor your achievements and stay motivated.',
  },
  {
    icon: <Icons.yttutorials className="size-7" />,
    title: 'AI Yoytube Tutorials',
    description: 'Monitor your achievements and stay motivated.',
  },
];
