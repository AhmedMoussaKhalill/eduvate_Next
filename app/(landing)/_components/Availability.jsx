"use client";

import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import NumberTicker from "@/components/ui/number-ticker";
import { WorldMap } from "@/components/ui/world-map";
import { cn } from "@/lib/utils";
import { Courgette } from "next/font/google";

const courgette = Courgette({
  subsets: ["latin"],
  weight: "400",
});
export function Availability() {
  return (
    <div className="w-full bg-white dark:bg-black">
      <div className="mb-7 flex flex-col items-center justify-center space-y-5 text-center">
        <div
          className={cn(
            "group w-fit rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
            courgette.className,
          )}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-5 py-[3px] transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Availability</span>
          </AnimatedShinyText>
        </div>
        <div className="space-y-3">
          <h2 className={cn("text-4xl font-bold", courgette.className)}>
            We are available everywhere
          </h2>
          <p className="text-sm">
            Our platform is available in all countries, will support from over
            <br />
            20,000+ representatives
          </p>
        </div>
      </div>
<div className=" rounded-full shadow-custom">
<WorldMap
        dots={[
          {
            start: {
              lat: 64.2008,
              lng: -149.4937,
            }, // Alaska (Fairbanks)
            end: {
              lat: 34.0522,
              lng: -118.2437,
            }, // Los Angeles
          },
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
            end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
          },
          {
            start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
        ]}
      />
</div>
      <div className="flex flex-col justify-center items-center text-center space-y-3 mt-7">
        <div className="text-4xl">
        <NumberTicker className="text-4xl" value={23000} /> +
        </div>
        <p>Happy customers worldwide</p>
      </div>
    </div>
  );
}
