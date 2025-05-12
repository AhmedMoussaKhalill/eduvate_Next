'use client';
import React, { useState } from 'react';
import { Icons } from '@/components/icons';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Search, Filter, Plus } from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';
import { CourseProgress } from './_components/course-progress';
import { useRouter } from 'next/navigation';

// Map course IDs to courseIds used in the course details page
const courseIdMap = {
  1: 'law101',
  2: 'politics101',
  3: 'english101',
  4: 'economics101',
  5: 'mathematics101',
  6: 'psychology101',
};

const MyCourses = () => {
  const { user } = useUser();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Gradient color pairs for course categories
  const gradientColors = {
    Law: ['from-blue-500', 'to-indigo-700'],
    Politics: ['from-purple-500', 'to-pink-600'],
    Language: ['from-green-500', 'to-emerald-700'],
    Economics: ['from-amber-400', 'to-orange-600'],
    Mathematics: ['from-red-500', 'to-rose-700'],
    Psychology: ['from-teal-400', 'to-cyan-600'],
    // Default gradient for any other category
    default: ['from-gray-500', 'to-slate-700'],
  };

  // Get gradient colors for a category
  const getGradientColors = (category) => {
    return gradientColors[category] || gradientColors['default'];
  };

  // Helper to get text color for a category
  const getTextColor = (category) => {
    switch (category) {
      case 'Law':
        return 'text-blue-600';
      case 'Politics':
        return 'text-purple-600';
      case 'Language':
        return 'text-green-600';
      case 'Economics':
        return 'text-amber-600';
      case 'Mathematics':
        return 'text-red-600';
      case 'Psychology':
        return 'text-teal-600';
      default:
        return 'text-gray-600';
    }
  };

  // Helper to get border color for a category
  const getBorderColor = (category) => {
    switch (category) {
      case 'Law':
        return 'border-blue-500';
      case 'Politics':
        return 'border-purple-500';
      case 'Language':
        return 'border-green-500';
      case 'Economics':
        return 'border-amber-500';
      case 'Mathematics':
        return 'border-red-500';
      case 'Psychology':
        return 'border-teal-500';
      default:
        return 'border-gray-500';
    }
  };

  // Helper to get progress indicator color
  const getProgressColor = (status, category) => {
    if (status === 'completed') return 'bg-green-500';
    if (status === 'not-started') return 'bg-gray-400';

    // Use category color for in-progress
    switch (category) {
      case 'Law':
        return 'bg-blue-600';
      case 'Politics':
        return 'bg-purple-600';
      case 'Language':
        return 'bg-green-600';
      case 'Economics':
        return 'bg-amber-600';
      case 'Mathematics':
        return 'bg-red-600';
      case 'Psychology':
        return 'bg-teal-600';
      default:
        return 'bg-gray-600';
    }
  };

  // Navigate to course details
  const handleCourseClick = (courseId, courseTitle) => {
    const mappedId = courseIdMap[courseId] || `course${courseId}`;
    router.push(
      `/dashboard/courses/${mappedId}?name=${encodeURIComponent(courseTitle)}`
    );
  };

  // Mock course data
  const allCourses = [
    {
      id: 1,
      title: 'Law Class',
      category: 'Law',
      instructor: 'Gut Alexen',
      instructorAvatar: '/placeholder.svg',
      progress: 82,
      status: 'in-progress',
    },
    {
      id: 2,
      title: 'Politics Class',
      category: 'Politics',
      instructor: 'Ramirez Huts',
      instructorAvatar: '/placeholder.svg',
      progress: 70,
      status: 'in-progress',
    },
    {
      id: 3,
      title: 'English Class',
      category: 'Language',
      instructor: 'Emma Larson',
      instructorAvatar: '/placeholder.svg',
      progress: 94,
      status: 'in-progress',
    },
    {
      id: 4,
      title: 'Economics 101',
      category: 'Economics',
      instructor: 'John Davis',
      instructorAvatar: '/placeholder.svg',
      progress: 100,
      status: 'completed',
    },
    {
      id: 5,
      title: 'Mathematics Advanced',
      category: 'Mathematics',
      instructor: 'Sarah Wilson',
      instructorAvatar: '/placeholder.svg',
      progress: 45,
      status: 'in-progress',
    },
    {
      id: 6,
      title: 'Introduction to Psychology',
      category: 'Psychology',
      instructor: 'Michael Brown',
      instructorAvatar: '/placeholder.svg',
      progress: 0,
      status: 'not-started',
    },
  ];

  // Filter courses based on active filter and search query
  const filteredCourses = allCourses
    .filter((course) => {
      if (activeFilter === 'all') return true;
      return course.status === activeFilter;
    })
    .filter(
      (course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const filterOptions = [
    { id: 'all', label: 'All Courses' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'completed', label: 'Completed' },
    { id: 'not-started', label: 'Not Started' },
  ];

  return (
    <div className="space-y-7 p-5">
      {/* Header with search */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Courses</h1>
          <p className="mt-1 text-gray-500">
            Manage and track your learning progress
          </p>
        </div>
        <div className="flex items-center space-x-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
          </div>
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

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {filterOptions.map((option) => (
            <Button
              key={option.id}
              onClick={() => setActiveFilter(option.id)}
              variant={activeFilter === option.id ? 'default' : 'outline'}
              className={activeFilter === option.id ? '' : 'hover:bg-gray-200'}
            >
              {option.label}
            </Button>
          ))}
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          <span>Add New Course</span>
        </Button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => {
          const gradientClasses = getGradientColors(course.category);
          const textColor = getTextColor(course.category);
          const borderColor = getBorderColor(course.category);

          return (
            <div
              key={course.id}
              className="group relative cursor-pointer rounded-lg bg-white p-6 shadow-custom transition-all hover:shadow-md"
              onClick={() => handleCourseClick(course.id, course.title)}
            >
              <div className="absolute inset-0 rounded-lg group-hover:bg-opacity-5"></div>
              <div className="absolute right-2 top-2 hidden items-center justify-center rounded-full bg-blue-500 p-1.5 text-white group-hover:flex">
                <Icons.link className="h-3.5 w-3.5" />
              </div>
              <div className="mb-4 flex justify-center">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${gradientClasses[0]} ${gradientClasses[1]}`}
                >
                  <span className="text-lg font-bold text-white">
                    {course.title.charAt(0)}
                  </span>
                </div>
              </div>
              <h3 className="mb-1 text-center text-xl font-medium">
                {course.title}
              </h3>
              <p className={`mb-4 text-center ${textColor}`}>
                {course.category}
              </p>
              <div className="mb-4 flex items-center justify-center">
                <Avatar className={`border-2 ${borderColor}`}>
                  <AvatarImage
                    src={course.instructorAvatar}
                    alt={course.instructor}
                  />
                  <AvatarFallback>
                    {course.instructor
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="ml-2">{course.instructor}</span>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <CourseProgress
                  value={course.progress}
                  indicatorColor={getProgressColor(
                    course.status,
                    course.category
                  )}
                />
                <div className="mt-4 flex justify-center">
                  <Button
                    variant="link"
                    className={`h-auto p-0 ${textColor}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCourseClick(course.id, course.title);
                    }}
                  >
                    {course.status === 'not-started'
                      ? 'Start Course'
                      : course.status === 'completed'
                        ? 'View Certificate'
                        : 'Continue Learning'}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state if no courses */}
      {filteredCourses.length === 0 && (
        <div className="rounded-lg bg-white p-8 text-center shadow-custom">
          <div className="mb-4 flex justify-center">
            <Icons.bookopen className="size-16 text-gray-400" />
          </div>
          <h3 className="mb-2 text-xl font-medium">No courses found</h3>
          <p className="mb-4 text-gray-500">
            {searchQuery
              ? `No courses match "${searchQuery}" with the selected filter.`
              : 'No courses found with the selected filter.'}
          </p>
          <Button
            variant="link"
            className="h-auto p-0 text-blue-600"
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
          >
            {searchQuery ? 'Clear Search' : 'Browse All Courses'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
