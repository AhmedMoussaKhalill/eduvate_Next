import { Icons } from '@/components/icons';
import React from 'react';
import CreateToutorialForm from './_components/CreateToutorialForm';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const page = () => {
  return (
    <div className="p-5">
      <Link href="/dashboard">
        <Button size="sm" variant="outline" className="">
          <ChevronLeft /> Back
        </Button>
      </Link>
      <div className="mx-auto my-[50px] flex max-w-xl flex-col items-start px-8">
        <h1 className="self-center text-center text-3xl font-bold sm:text-4xl">
          Tutorials AI
        </h1>
        <CreateToutorialForm />
      </div>
    </div>
  );
};

export default page;
