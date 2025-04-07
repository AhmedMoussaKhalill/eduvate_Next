"use client";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { sideBarLinks, sideBarLinks1 } from "@/constants";
import { cn } from "@/lib/utils";
import { Caveat, Courgette } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const font = Courgette({ subsets: ["latin-ext"], weight: "400" });

const logoFont = Caveat({ subsets: ["latin-ext"], weight: "700" });

const SideBar = () => {
  const pathName = usePathname();
  return (
    <aside className="fixed left-0 z-20 h-full w-64 border-r border-gray-800/10 bg-gray-500/5 px-5 py-5">
      <div className="flex flex-col space-y-5">
      <Link
          href="/"
          className={cn("relative text-4xl font-bold", logoFont.className)}
        >
          Edu
          <span className="logo bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500 bg-clip-text pr-1.5 text-transparent">
            vate
          </span>
          <Icons.cap className="absolute -left-0.5 -top-1 size-[20px] -rotate-[30deg]" />
        </Link>
        <Separator className="w-full" />
        <div className="flex flex-col space-y-5">
          <h2 className={cn("text-neutral-500 text-sm", font.className)}>Menu</h2>
          {sideBarLinks.map((link) => {
            const isActive = link.route === pathName;

            return (
              <div
                key={link.route}
                className={`transition-all duration-300 ${
                  isActive ? "-translate-x-1.5 text-blue-700 underline-offset-4" : "text-neutral-600"
                } `}
              >
                <Link className="flex items-center gap-x-3" href={link.route}>
                  {link.icon}
                  {link.label}
                </Link>
              </div>
            );
          })}
          {/* <div className="flex items-center gap-x-3 text-neutral-600">
            <Icons.prompt className="h-[22px] w-[22px]" />
            Prompt Box
          </div>
          <div className="flex items-center gap-x-3 text-neutral-600">
            <Icons.chating className="h-[22px] w-[22px]" />
            Chat AI
          </div>
          <div className="flex items-center gap-x-3 text-neutral-600">
            <Icons.tools className="h-[22px] w-[22px] rotate-45" />
            All Tools
          </div>
          <div className="flex items-center gap-x-3 text-neutral-600">
            <Icons.art className="h-[22px] w-[22px]" />
            Image Tools
          </div> */}
        </div>
        <Separator className="w-full" />
        <div className="flex flex-col space-y-5">
        <h2 className={cn("text-neutral-500 text-sm", font.className)}>System</h2>
          {sideBarLinks1.map((link) => {
            const isActive = link.route === pathName;

            return (
              <div
                key={link.route}
                className={`transition-all duration-300 ${
                  isActive ? "translate-x-1 text-[#674be3]" : "text-neutral-600"
                } `}
              >
                <Link className="flex items-center gap-x-3" href={link.route}>
                  {link.icon}
                  {link.label}
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

// "use client";
// import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
// import { Icons } from "@/components/ui/icons";
// import { Separator } from "@/components/ui/separator";
// import { sideBarLinks } from "@/constants";
// import { cn } from "@/lib/utils";
// import { ArrowRight } from "lucide-react";
// import { Caveat, Courgette } from "next/font/google";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React from "react";

// const font = Courgette({ subsets: ["latin-ext"], weight: "400" });

// const logoFont = Caveat({ subsets: ["latin-ext"], weight: "700" });

// const SideBar = () => {
//   const pathname = usePathname();
//   return (
//     <aside className="fixed left-0 z-20 h-full w-56 border-r border-gray-800/10 bg-gray-500/5 px-5 py-4">
//       <div className="flex flex-col space-y-5">
//         <div className={cn("text-3xl text-black", logoFont.className)}>
//           Rylu Ai
//         </div>
//         <Separator className="w-full" />
//         <div className="flex flex-col space-y-5">
//           <h2 className={cn("text-neutral-500", font.className)}>Menu</h2>
//           {sideBarLinks.map((link) => {
//             const isActive = link.route === pathname;

//             return (
//               <div
//                 key={link.route}
//                 className={`${
//                   isActive ? "bg-purple-500 text-white" : "text-neutral-600"
//                 }`}
//               >
//                 <Link href={link.route} className="flex items-center gap-x-3">
//                   {link.icon}
//                   {link.label}
//                 </Link>
//               </div>
//             );
//           })}
//           {/* <div className="flex items-center gap-x-3 text-neutral-600">
//             <Icons.prompt className="h-[22px] w-[22px]" />
//             Prompt Box
//           </div>
//           <div className="flex items-center gap-x-3 text-neutral-600">
//             <Icons.chating className="h-[22px] w-[22px]" />
//             Chat AI
//           </div>
//           <div className="flex items-center gap-x-3 text-neutral-600">
//             <Icons.tools className="h-[22px] w-[22px] rotate-45" />
//             All Tools
//           </div>
//           <div className="flex items-center gap-x-3 text-neutral-600">
//             <Icons.art className="h-[22px] w-[22px]" />
//             Image Tools
//           </div> */}
//         </div>
//         <Separator className="w-full" />
//         <div className="flex flex-col space-y-5">
//           <div className="flex items-center gap-x-3 text-neutral-600">
//             <Icons.settings className="h-[22px] w-[22px]" />
//             Settings
//           </div>
//           <div className="flex items-center gap-x-3 text-neutral-600">
//             <Icons.help className="h-[22px] w-[22px]" />
//             Help Center
//           </div>
//         </div>
//         <Separator className="w-full" />
//         <div className="space-y-3">
//           <div className="h-fit space-y-2 rounded-lg bg-gray-900/5 p-2.5 ring-1 ring-gray-800/10">
//             <h2 className={cn("text-base", font.className)}>Credits</h2>
//             <div className="h-2 w-full rounded-full bg-gray-300"></div>
//             <div className="text-xs">
//               2300 / 5000 <span className="ml-2 text-xs">Credit Used</span>
//             </div>
//           </div>
//           <div>
//             <AnimatedGradientText className="cursor-pointer rounded-lg">
//               🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
//               <span
//                 className={cn(
//                   `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
//                 )}
//               >
//                 Go Premium
//               </span>
//               <ArrowRight className="ml-2 size-3.5 text-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
//             </AnimatedGradientText>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default SideBar;
