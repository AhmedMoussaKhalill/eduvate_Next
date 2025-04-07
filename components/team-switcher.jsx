"use client";

import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Caveat } from "next/font/google";
import Link from "next/link";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import SearchInput from "@/app/(dashboard)/dashboard/_components/search";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const caveat = Caveat({
  subsets: ["latin"],
  weight: "700",
});
export function TeamSwitcher({ teams }) {
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  return (
    <SidebarMenu>
      {/* <SidebarMenuItem className="pt-4">
        <SearchInput />
      </SidebarMenuItem> */}
    </SidebarMenu>
  );
}
