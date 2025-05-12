'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { isInstructor } from '@/lib/user-roles';
import { MOCK_COURSES } from '@/constants/mock-data';
import { Pencil, Plus, BookOpen, FileText, Users, Trash } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function InstructorDashboard() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState('courses');
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // In development mode, bypass the role check
  if (!isDevelopment && !isInstructor(user)) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Unauthorized Access</h1>
        <p className="mb-4">You don't have permission to access this page.</p>
        <Button onClick={() => router.push('/dashboard')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  // Filter courses by current instructor
  const instructorCourses = MOCK_COURSES.filter(
    (course) => course.instructorId === user.id
  );

  const handleCreateCourse = () => {
    router.push('/instructor/courses/create');
  };

  const handleEditCourse = (courseId) => {
    router.push(`/instructor/courses/${courseId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
          <p className="text-neutral-500">
            Manage your courses, assignments, and quizzes
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={user?.imageUrl}
              alt={user?.fullName || 'Instructor'}
            />
            <AvatarFallback>{user?.fullName?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium">{user?.fullName || 'Instructor'}</h2>
            <p className="text-sm text-neutral-500">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 grid grid-cols-3">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Courses</h2>
            <Button onClick={handleCreateCourse}>
              <Plus className="mr-2 h-4 w-4" />
              Create Course
            </Button>
          </div>

          {instructorCourses.length === 0 ? (
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-12 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-neutral-400" />
              <h3 className="mb-2 text-lg font-medium">No courses yet</h3>
              <p className="mb-6 text-neutral-500">
                Get started by creating your first course
              </p>
              <Button onClick={handleCreateCourse}>
                <Plus className="mr-2 h-4 w-4" />
                Create Course
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {instructorCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{
                      backgroundImage: course.image
                        ? `url(${course.image})`
                        : 'linear-gradient(to right, #4f46e5, #3b82f6)',
                    }}
                  />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{course.title}</CardTitle>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditCourse(course.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>
                      {course.description.length > 120
                        ? `${course.description.substring(0, 120)}...`
                        : course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4 text-sm">
                      <div className="flex items-center">
                        <FileText className="mr-1 h-4 w-4 text-neutral-500" />
                        <span>12 Lectures</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4 text-neutral-500" />
                        <span>24 Students</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <div className="text-sm text-neutral-500">
                      {course.isPublished ? 'Published' : 'Draft'}
                    </div>
                    <div className="text-sm text-neutral-500">
                      Created {new Date(course.createdAt).toLocaleDateString()}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <h2 className="text-xl font-semibold">Student Management</h2>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-12 text-center">
            <Users className="mx-auto mb-4 h-12 w-12 text-neutral-400" />
            <h3 className="mb-2 text-lg font-medium">
              Student management coming soon
            </h3>
            <p className="text-neutral-500">
              View enrollments and manage student progress
            </p>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <h2 className="text-xl font-semibold">Course Analytics</h2>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 text-neutral-400">📊</div>
            <h3 className="mb-2 text-lg font-medium">Analytics coming soon</h3>
            <p className="text-neutral-500">
              Track course performance and student engagement
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
