import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Courgette } from "next/font/google";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const courgette = Courgette({
  subsets: ["latin"],
  weight: "400",
});

const Hero = () => {
  return (
    <section className="relative pt-20">
      <img
        src="/ai.svg"
        alt="hero"
        className="absolute inset-x-0 top-5 -z-10 object-cover opacity-35"
      />
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="flex flex-col space-y-8">
          <h1 className={cn("text-6xl", courgette.className)}>
            Getting Elite Quality Education Has <br />
            Never Been Easier
          </h1>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-1 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500"></div>
            <p className="font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              voluptates <br /> corrupti veritatis amet quia? Unde dicta nulla
              labore.
            </p>
          </div>
          <div className="flex items-center space-x-5">
            <Button
              variant="default"
              size="lg"
              className="rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="group rounded-full"
            >
              Learn More
              <ArrowRight className="transition-all duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto h-[365px] w-[350px] rounded-2xl bg-secondary">
            <img
              src="/4.png"
              alt="Smiling student"
              className="absolute bottom-0 right-3 h-[431px] w-80 rounded-2xl object-cover object-center"
            />
          </div>
          <div className="animate-DownAndup absolute left-0 top-12 flex items-center space-x-3 rounded-xl bg-white/70 p-4 shadow-lg">
            <Image
              src="/avatar.JPG"
              alt="Instructor"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h3 className="font-semibold">CSCI 301</h3>
              <div className="text-sm text-gray-600">
                Veronica, <Badge className="rounded-full bg-black">23+ courses</Badge>
              </div>
            </div>
          </div>
          <div className="animate-upAndDown absolute right-0 top-36 flex items-center space-x-3 rounded-xl bg-white/70 p-4 shadow-lg">
            <Image
              src="/avatar.JPG"
              alt="Instructor"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h3 className="font-semibold">UI Design Patterns</h3>
              <div className="text-sm text-gray-600">
                Veronica, <Badge className="rounded-full bg-black">23+ courses</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
