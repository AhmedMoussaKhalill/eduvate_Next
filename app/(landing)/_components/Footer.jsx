import React from "react";
import Link from "next/link";
import { Icons } from "@/components/global/icons/icons";
import { Caveat, Courgette } from "next/font/google";
import { cn } from "@/lib/utils";


const caveat = Caveat({
  subsets: ["latin"],
  weight: "700",
});

const courgette = Courgette({
  subsets: ["latin"],
  weight: "400",
});

const Footer = () => {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-6 py-7 mt-20">
        <div className="flex justify-between">
          <div className="space-y-5">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className={cn("relative text-4xl font-bold", caveat.className)}
              >
                Edu
                <span className="logo bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500 bg-clip-text pr-1.5 text-transparent">
                  vate
                </span>
                <Icons.cap className="absolute -left-0.5 -top-1 size-[20px] -rotate-[30deg]" />
              </Link>{" "}
              <p className="text-sm text-neutral-700">
                Unlock a new level of efficiency as AI handles the heavy lifting
                <br /> helping you achieve more in less time and achieve new
                heights.
              </p>
              <span
                className={cn(
                  "flex gap-x-1 text-sm tracking-widest",
                  courgette.className,
                )}
              >
                Made In EGYPT With Love
                <Icons.heart className="h-4 w-4 fill-blue-600 text-blue-600" />
              </span>
            </div>
            <p className="text-sm text-neutral-700">
              © 2025 Eduvate Inc. All rights reserved.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className={cn("text-lg", courgette.className)}>Product</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href=""
                      className="flex transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-foreground"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      className="flex transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-foreground"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      className="flex transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-foreground"
                    >
                      Testimonials
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 flex flex-col md:mt-0">
                <h3 className={cn("text-lg", courgette.className)}>Contact</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href=""
                      className="flex transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-foreground"
                    >
                      LinkedIn
                    </Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      className="flex transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-foreground"
                    >
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      className="flex transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-foreground"
                    >
                      GitHub
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className={cn("text-lg", courgette.className)}>
                  Resources
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href=""
                      className="flex transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-foreground"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      className="flex transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-foreground"
                    >
                      Case Studies
                    </Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      className="flex transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-foreground"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 flex flex-col md:mt-0">
                <h3 className={cn("text-lg", courgette.className)}>Company</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="">
                    <Link
                      href=""
                      className="flex transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-foreground"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      className="flex transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-foreground"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
