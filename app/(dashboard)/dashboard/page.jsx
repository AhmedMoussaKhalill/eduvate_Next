import React from "react";
import { Courgette } from "next/font/google";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Component } from "./_components/PieChart";
import SearchInput from "./_components/search";
import { Button } from "@/components/ui/button";
import { CourseCard } from "./_components/Course-Card";
import { CourseTable } from "./_components/course-table";
import { ContinueLearningCard } from "./_components/continue-learning-card";

const courgette = Courgette({
  subsets: ["latin"],
  weight: "400",
});

const page = () => {
  return (
    <div className="space-y-7 p-5">
      <div className="flex items-center justify-between">
        <SearchInput />
        {/* <h1 className={cn("text-3xl", courgette.className)}>Dashboard</h1> */}
        <div className="flex items-center space-x-5">
          <Icons.notification className="size-6" />
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-0.5">
              <h2 className="text-sm">Ahmed Moussa</h2>
              <p className="text-xs text-neutral-500">
                ahmedmoussakhalill@gmail.com
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-neutral-500" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-2">
          <div className="mb-8 grid grid-cols-3 gap-6">
            {[
              {
                title: "Ongoing Courses",
                icon: Icons.cap2,
                value: "15",
              },
              {
                title: "Completed Courses",
                icon: Icons.complete,
                value: "15",
              },
              {
                title: "Hour Spent",
                icon: Icons.watch,
                value: "13",
              },
            ].map((item, index) => (
              <Card key={index} className="h-fit">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.title}
                  </CardTitle>
                  <item.icon className="size-7 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{item.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Courses</h2>
              <Button variant="link" className="text-gray-600">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <CourseCard
                category="DESIGN"
                hours={48}
                lessons={16}
                price={"CSCI 101"}
                // thumbnail="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-06%20at%201.09.35%E2%80%AFAM-WKnd0kgvDZY9T0WxxH62bpJK75mrwo.png"
                title="Create 3D With Blender"
              />
              <CourseCard
                category="BUSINESS"
                hours={48}
                lessons={30}
                price={"CSCI 101"}
                // thumbnail="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-06%20at%201.09.35%E2%80%AFAM-WKnd0kgvDZY9T0WxxH62bpJK75mrwo.png"
                title="Digital Marketing"
              />
              <CourseCard
                category="CODE"
                hours={3}
                lessons={30}
                price={"CSCI 102"}
                // thumbnail="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-06%20at%201.09.35%E2%80%AFAM-WKnd0kgvDZY9T0WxxH62bpJK75mrwo.png"
                title="Slicing UI Design With Tailwind"
              />
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <Component />
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Continue Learning</h2>
          </div>
          <div className="space-y-4">
            <ContinueLearningCard category="DESIGN" lessons="12/16" progress={75} title="UI/UX Design" />
            <ContinueLearningCard category="CODE" lessons="20/30" progress={60} title="Cyber Security" />
            <ContinueLearningCard category="DATA" lessons="8/20" progress={40} title="Learn Data Analyst" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
