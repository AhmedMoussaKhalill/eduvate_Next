'use client';
import React from 'react';
import { Courgette } from 'next/font/google';
import { Icons } from '@/components/icons';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import SearchInput from './_components/search';
import { Progress } from '@/components/ui/progress';
import { UserButton, useUser } from '@clerk/nextjs';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Video,
  FileQuestion,
} from 'lucide-react';
import NotificationDropdown from './_components/notification-dropdown';
import { useRouter } from 'next/navigation';

const courgette = Courgette({
  subsets: ['latin'],
  weight: '400',
});

// Course gradient colors
const getCourseGradient = (category) => {
  switch (category) {
    case 'Law':
      return 'from-blue-500 to-indigo-700';
    case 'Politics':
      return 'from-purple-500 to-pink-600';
    case 'English':
      return 'from-green-500 to-emerald-700';
    case 'Economics':
      return 'from-amber-400 to-orange-600';
    case 'Mathematics':
      return 'from-red-500 to-rose-700';
    case 'Psychology':
      return 'from-teal-400 to-cyan-600';
    default:
      return 'from-gray-500 to-slate-700';
  }
};

const page = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleCourseClick = (courseId, courseName) => {
    router.push(
      `/dashboard/courses/${courseId}?name=${encodeURIComponent(courseName)}`
    );
  };

  return (
    <div className="space-y-7 p-5">
      <div className="flex items-center justify-between">
        <SearchInput />
        <div className="flex items-center space-x-5">
          <NotificationDropdown />
          <div className="flex items-center space-x-3">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: '35px',
                    height: '35px',
                  },
                },
              }}
            />
            {user ? (
              <div className="flex flex-col space-y-0.5">
                <h2 className="text-sm">{user.fullName || 'User'}</h2>
                <p className="text-xs text-neutral-500">
                  {user.primaryEmailAddress?.emailAddress || 'No email'}
                </p>
              </div>
            ) : (
              <div className="flex flex-col space-y-0.5">
                <h2 className="text-sm">Loading...</h2>
                <p className="text-xs text-neutral-500">Loading email...</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {/* My Course Section */}
        <div className="col-span-8">
          <div className="rounded-lg bg-blue-700 p-6 shadow-custom">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icons.bookopen className="size-6 text-white" />
                <h2 className="text-xl font-medium text-white">My Course</h2>
              </div>
              <div className="flex gap-2">
                <button className="rounded-full bg-blue-600 p-1 text-white">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="rounded-full bg-blue-600 p-1 text-white">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {/* Law Class */}
              <div
                className="group relative cursor-pointer rounded-lg bg-blue-600 p-4 transition-transform hover:scale-105"
                onClick={() => handleCourseClick('law101', 'Law Class')}
              >
                <div className="absolute inset-0 rounded-lg bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-10"></div>
                <div className="absolute right-2 top-2 hidden items-center justify-center rounded-full bg-blue-500 p-1.5 text-white group-hover:flex">
                  <Icons.link className="h-3.5 w-3.5" />
                </div>
                <div className="mb-4 flex justify-center">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${getCourseGradient('Law')}`}
                  >
                    <span className="text-lg font-bold text-white">L</span>
                  </div>
                </div>
                <h3 className="mb-1 text-center text-xl font-medium text-white">
                  Law Class
                </h3>
                <p className="mb-4 text-center text-blue-200">Lecturer</p>
                <div className="mb-4 flex items-center justify-center">
                  <Avatar className="border-2 border-blue-500">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Gut Alexen"
                    />
                    <AvatarFallback>GA</AvatarFallback>
                  </Avatar>
                  <span className="ml-2 text-white">Gut Alexen</span>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-blue-200">Class progress</span>
                    <span className="text-white">82%</span>
                  </div>
                  <Progress value={82} className="h-2 bg-blue-500" />
                </div>
              </div>

              {/* Politics Class */}
              <div
                className="group relative cursor-pointer rounded-lg bg-blue-600 p-4 transition-transform hover:scale-105"
                onClick={() =>
                  handleCourseClick('politics101', 'Politics Class')
                }
              >
                <div className="absolute inset-0 rounded-lg bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-10"></div>
                <div className="absolute right-2 top-2 hidden items-center justify-center rounded-full bg-blue-500 p-1.5 text-white group-hover:flex">
                  <Icons.link className="h-3.5 w-3.5" />
                </div>
                <div className="mb-4 flex justify-center">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${getCourseGradient('Politics')}`}
                  >
                    <span className="text-lg font-bold text-white">P</span>
                  </div>
                </div>
                <h3 className="mb-1 text-center text-xl font-medium text-white">
                  Politics Class
                </h3>
                <p className="mb-4 text-center text-blue-200">Lecturer</p>
                <div className="mb-4 flex items-center justify-center">
                  <Avatar className="border-2 border-blue-500">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Ramirez Huts"
                    />
                    <AvatarFallback>RH</AvatarFallback>
                  </Avatar>
                  <span className="ml-2 text-white">Ramirez Huts</span>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-blue-200">Class progress</span>
                    <span className="text-white">70%</span>
                  </div>
                  <Progress value={70} className="h-2 bg-blue-500" />
                </div>
              </div>

              {/* English Class */}
              <div
                className="group relative cursor-pointer rounded-lg bg-blue-600 p-4 transition-transform hover:scale-105"
                onClick={() => handleCourseClick('english101', 'English Class')}
              >
                <div className="absolute inset-0 rounded-lg bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-10"></div>
                <div className="absolute right-2 top-2 hidden items-center justify-center rounded-full bg-blue-500 p-1.5 text-white group-hover:flex">
                  <Icons.link className="h-3.5 w-3.5" />
                </div>
                <div className="mb-4 flex justify-center">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${getCourseGradient('English')}`}
                  >
                    <span className="text-lg font-bold text-white">E</span>
                  </div>
                </div>
                <h3 className="mb-1 text-center text-xl font-medium text-white">
                  English Class
                </h3>
                <p className="mb-4 text-center text-blue-200">Lecturer</p>
                <div className="mb-4 flex items-center justify-center">
                  <Avatar className="border-2 border-blue-500">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Emma Larson"
                    />
                    <AvatarFallback>EL</AvatarFallback>
                  </Avatar>
                  <span className="ml-2 text-white">Emma Larson</span>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-blue-200">Class progress</span>
                    <span className="text-white">94%</span>
                  </div>
                  <Progress value={94} className="h-2 bg-blue-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Cards */}
          <div className="mt-6 grid grid-cols-2 gap-6">
            {/* GPA Card */}
            <div className="rounded-lg bg-white p-6 shadow-custom">
              <div className="mb-6 flex items-center gap-3">
                <Icons.gpa />
                <h3 className="text-lg font-medium">Total GPA</h3>
              </div>
              <div className="mb-4 flex justify-center">
                <div className="relative h-40 w-40">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-blue-700">
                      3.5
                    </span>
                  </div>
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#f0f0f0"
                      strokeWidth="10"
                    />
                    <path
                      d="M50 5 A 45 45 0 1 1 5 50"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#1d4ed8" />
                        <stop offset="50%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Icons.smile className="size-6" />
                <span className="font-medium">Keep it up!</span>
                <Icons.smile className="size-6" />
              </div>
            </div>

            {/* Attendance Card */}
            <div className="rounded-lg bg-white p-6 shadow-custom">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icons.users />
                  <h3 className="text-lg font-medium">Attendance</h3>
                </div>
                <button className="text-blue-700">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              <div className="flex h-48 flex-col items-center justify-center">
                <span className="text-7xl font-bold text-blue-700">64</span>
                <span className="mt-2 text-gray-500">Total Sessions Done</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-4">
          {/* Forum Activity */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow-custom">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icons.calendarbroken className="size-6 text-gray-700" />
                <h3 className="text-lg font-medium">Forum Activity</h3>
              </div>
              <button className="text-blue-700">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3 border-b pb-4">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Alex Ben"
                  />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    What is the difference between Saw and S...
                  </p>
                  <div className="mt-1 flex justify-between">
                    <span className="text-sm font-medium">Alex Ben</span>
                    <span className="text-xs text-gray-500">3:21PM</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 border-b pb-4">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Penny Angela"
                  />
                  <AvatarFallback>PA</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">2022 Hottest Year on Record?</p>
                  <div className="mt-1 flex justify-between">
                    <span className="text-sm font-medium">Penny Angela</span>
                    <span className="text-xs text-gray-500">1:24PM</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Leah Hudson"
                  />
                  <AvatarFallback>LH</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    Will the Big 5 tech co's release abortion poli...
                  </p>
                  <div className="mt-1 flex justify-between">
                    <span className="text-sm font-medium">Leah Hudson</span>
                    <span className="text-xs text-gray-500">1:12PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Agenda */}
          <div className="rounded-lg bg-white p-6 shadow-custom">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icons.calculator className="size-6 text-gray-700" />
                <h3 className="text-lg font-medium">Upcoming Agenda</h3>
              </div>
              <div className="flex gap-2">
                <button className="rounded-full bg-gray-100 p-1 text-gray-500">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="rounded-full bg-gray-100 p-1 text-gray-500">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-3">
                  <div className="rounded-lg bg-gray-200 p-2">
                    <Video className="h-5 w-5 text-gray-700" />
                  </div>
                  <span className="font-medium">Zoom Session</span>
                </div>
                <h4 className="mb-1 font-medium">Law Class</h4>
                <p className="text-sm text-gray-500">
                  25 August 2022 • 7:00-9:00 PM
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-3">
                  <div className="rounded-lg bg-gray-200 p-2">
                    <FileQuestion className="h-5 w-5 text-gray-700" />
                  </div>
                  <span className="font-medium">Quiz</span>
                </div>
                <h4 className="mb-1 font-medium">Politics Class</h4>
                <p className="text-sm text-gray-500">25 August 2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
