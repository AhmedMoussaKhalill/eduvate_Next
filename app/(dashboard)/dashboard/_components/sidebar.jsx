'use client';
import { Icons } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import { sideBarLinks, sideBarLinks1 } from '@/constants';
import { cn } from '@/lib/utils';
import { Caveat, Courgette } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const font = Courgette({ subsets: ['latin-ext'], weight: '400' });

const logoFont = Caveat({ subsets: ['latin-ext'], weight: '700' });

const SideBar = () => {
  const pathName = usePathname();

  return (
    <aside className="fixed left-0 z-20 h-full w-60 border-r border-gray-800/10 bg-gray-500/5 px-5 py-5">
      <div className="flex flex-col space-y-5">
        <Link
          href="/"
          className={cn('relative text-4xl font-bold', logoFont.className)}
        >
          Edu
          <span className="logo bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500 bg-clip-text pr-1.5 text-transparent">
            vate
          </span>
          <Icons.cap className="absolute -left-0.5 -top-1 size-[20px] -rotate-[30deg]" />
        </Link>

        <Separator className="w-full" />
        <div className="flex flex-col space-y-5">
          <h2 className={cn('text-sm text-neutral-500', font.className)}>
            Menu
          </h2>
          {sideBarLinks.map((link) => {
            const isActive = link.route === pathName;

            return (
              <div
                key={link.route}
                className={`transition-all duration-300 ${
                  isActive
                    ? '-translate-x-1.5 text-blue-700 underline-offset-4'
                    : 'text-neutral-600'
                } `}
              >
                <Link className="flex items-center gap-x-3" href={link.route}>
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </div>
            );
          })}
        </div>
        <Separator className="w-full" />
        <div className="flex flex-col space-y-5">
          <h2 className={cn('text-sm text-neutral-500', font.className)}>
            System
          </h2>
          {sideBarLinks1.map((link) => {
            const isActive = link.route === pathName;

            return (
              <div
                key={link.route}
                className={`transition-all duration-300 ${
                  isActive
                    ? '-translate-x-1.5 text-blue-700 underline-offset-4'
                    : 'text-neutral-600'
                } `}
              >
                <Link className="flex items-center gap-x-3" href={link.route}>
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
