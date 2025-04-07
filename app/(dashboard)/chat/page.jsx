import { AppSidebar } from "@/components/app-sidebar";
import { Icons } from "@/components/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ArrowBigUp, ArrowUp } from "lucide-react";
import { Caveat } from "next/font/google";

const font = Caveat({
  subsets: ["latin"],
  weight: "700",
});

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-3 px-3">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Icons.newchat className="size-6 cursor-pointer text-zinc-600" />
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>New Chat</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="rounded-full border border-gray-500/5 bg-sidebar px-3 py-1.5 text-xs">
              Powered by <b>llama 3.1</b>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">
          <div className="mx-auto grid w-full max-w-3xl space-y-20">
            <div className="space-y-5 text-center">
              <h2 className="text-4xl">
                Hi, I'm{" "}
                <span
                  className={cn(
                    "bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500 bg-clip-text pr-1 text-5xl font-bold text-transparent",
                    font.className,
                  )}
                >
                  Quira
                </span>
              </h2>
              <p className="text-muted-foreground">How can I help you today?</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="mx-auto h-fit w-full cursor-pointer rounded-xl p-5 shadow-custom">
                <div className="space-y-2">
                  <h2>What are the advantages</h2>
                  <p className="text-sm text-muted-foreground">
                    of using ChatGPT?
                  </p>
                </div>
              </div>
              <div className="mx-auto h-fit w-full cursor-pointer rounded-xl p-5 shadow-custom">
                <div className="space-y-2">
                  <h2>What are the advantages</h2>
                  <p className="text-sm text-muted-foreground">
                    of using ChatGPT?
                  </p>
                </div>
              </div>
              <div className="mx-auto h-fit w-full cursor-pointer rounded-xl p-5 shadow-custom">
                <div className="space-y-2">
                  <h2>What are the advantages</h2>
                  <p className="text-sm text-muted-foreground">
                    of using ChatGPT?
                  </p>
                </div>
              </div>
              <div className="mx-auto h-fit w-full cursor-pointer rounded-xl p-5 shadow-custom">
                <div className="space-y-2">
                  <h2>What are the advantages</h2>
                  <p className="text-sm text-muted-foreground">
                    of using ChatGPT?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="left-64 right-0 mx-auto flex h-full w-full max-w-3xl flex-col justify-end">
            <div className="relative w-full">
              <div className="absolute bottom-0 left-3 flex -translate-y-1/2">
                <Button size="sm" className="rounded-full bg-black">
                  <Icons.world
                    className="-ms-1 me-0.5"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  Search
                </Button>
              </div>
              <Icons.attach className="absolute bottom-0 right-12 size-7 -translate-y-1/2 transform text-muted-foreground" />
              <Button
                size="icon"
                className="absolute bottom-0 right-3 size-7 -translate-y-1/2 items-center rounded-full bg-black"
              >
                <ArrowUp className="size-5" />
              </Button>
              <Textarea
                className="resize-none rounded-[1.2rem] bg-sidebar p-3"
                rows={4}
                placeholder="Type your message here."
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
