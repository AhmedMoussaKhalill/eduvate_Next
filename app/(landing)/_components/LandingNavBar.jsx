"use client";
import React from "react";
import Link from "next/link";
import { Caveat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";

import { Icons } from "@/components/icons";

const caveat = Caveat({
  subsets: ["latin"],
  weight: "700",
});

const LandingNavBar = () => {
  const { user } = useUser();
  const { openSignIn, openUserProfile } = useClerk();

  return (
    <header className="mx-auto max-w-7xl px-6 py-7">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className={cn("relative text-4xl font-bold", caveat.className)}
        >
          Edu
          <span className="logo bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500 bg-clip-text pr-1.5 text-transparent">
            vate
          </span>
          <Icons.cap className="absolute -left-0.5 -top-1 size-[20px] -rotate-[30deg]" />
        </Link>
        <div className="fixed inset-x-0 top-0 z-50">
          <div className="mx-auto flex max-w-md items-center justify-center rounded-b-xl bg-white/95 px-5 py-5 shadow-custom">
            <div>
              <nav>
                <ul className="flex space-x-6 text-neutral-700">
                  {NavLinks.map((link, index) => (
                    <li
                      key={index}
                      className="hover:underline hover:underline-offset-4"
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {user ? (
          <div className="z-50 flex items-center space-x-3">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "35px",
                    height: "35px",
                  },
                },
              }}
            />
            <div className="flex flex-col space-y-0.5">
              <h2 className="text-sm">{user.fullName || "User"}</h2>
              <p className="text-xs text-neutral-500">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
        ) : (
          <div className="z-50 flex items-center space-x-4 text-sm font-medium">
            <div
              onClick={openSignIn}
              className="transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              Login
            </div>
            <Button
              variant="default"
              onClick={openSignIn}
              className="rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500 px-6 transition-all duration-300 hover:-translate-y-0.5"
            >
              Sign up
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingNavBar;

const NavLinks = [
  {
    name: "Community",
    href: "#",
  },
  {
    name: "Solutions",
    href: "#",
  },
  {
    name: "How it works",
    href: "#",
  },
  {
    name: "About Us",
    href: "#",
  },
];