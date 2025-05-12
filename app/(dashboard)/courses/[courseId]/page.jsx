'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import {
  MOCK_COURSES,
  MOCK_LECTURES,
  MOCK_QUIZZES,
  MOCK_ASSIGNMENTS,
  MOCK_ENROLLMENTS,
} from '@/constants/mock-data';
import {
  File,
  Video,
  FileQuestion,
  Clock,
  CheckCircle,
  Book,
  User,
  Play,
  FileText,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CourseView({ params }) {
  const { courseId } = params;
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState('content');

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // In a real application, you would fetch this data from your API
  const course = MOCK_COURSES.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Course Not Found</h1>
        <p className="mb-4">The course you're looking for doesn't exist.</p>
        <Button onClick={() => router.push('/dashboard')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  // Check if user is enrolled in this course
  const enrollment = MOCK_ENROLLMENTS.find(
    (e) => e.courseId === courseId && e.userId === user?.id
  );

  if (!enrollment && isLoaded) {
    return (
      <div className="container mx-auto max-w-5xl p-6">
        <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
          <h1 className="mb-4 text-2xl font-bold">{course.title}</h1>
          <p className="mx-auto mb-8 max-w-2xl text-neutral-600">
            {course.description}
          </p>
          <div className="mb-6">
            <img
              src={
                course.image || 'https://placehold.co/600x400?text=Course+Image'
              }
              alt={course.title}
              className="mx-auto max-w-md rounded-lg"
            />
          </div>
          <Button
            size="lg"
            onClick={() => console.log('Enrolling in course...')}
          >
            Enroll in this Course
          </Button>
        </div>
      </div>
    );
  }

  // Filter content for this course
  const courseLectures = MOCK_LECTURES.filter(
    (lecture) => lecture.courseId === courseId
  );
  const courseQuizzes = MOCK_QUIZZES.filter(
    (quiz) => quiz.courseId === courseId
  );
  const courseAssignments = MOCK_ASSIGNMENTS.filter(
    (assignment) => assignment.courseId === courseId
  );

  // Combine lectures and quizzes for the content list, and sort by position
  const contentItems = [
    ...courseLectures.map((lecture) => ({ ...lecture, type: 'lecture' })),
    ...courseQuizzes.map((quiz) => ({ ...quiz, type: 'quiz' })),
  ].sort((a, b) => a.position - b.position);

  const getContentIcon = (type) => {
    switch (type) {
      case 'lecture':
        return <Video className="mr-2 h-4 w-4" />;
      case 'quiz':
        return <FileQuestion className="mr-2 h-4 w-4" />;
      default:
        return <File className="mr-2 h-4 w-4" />;
    }
  };

  const startLecture = (lectureId) => {
    router.push(`/courses/${courseId}/lectures/${lectureId}`);
  };

  const startQuiz = (quizId) => {
    router.push(`/courses/${courseId}/quizzes/${quizId}`);
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push('/dashboard')}
        >
          ← Back to Dashboard
        </Button>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="mb-2 text-3xl font-bold">{course.title}</h1>
            <p className="mb-4 text-neutral-600">{course.description}</p>

            <div className="mb-6 flex items-center text-sm text-neutral-500">
              <div className="mr-4 flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>10 weeks</span>
              </div>
              <div className="mr-4 flex items-center">
                <FileText className="mr-1 h-4 w-4" />
                <span>{courseLectures.length} lectures</span>
              </div>
              <div className="flex items-center">
                <FileQuestion className="mr-1 h-4 w-4" />
                <span>{courseQuizzes.length} quizzes</span>
              </div>
            </div>

            <div className="mb-6 rounded-lg border bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium">Your Progress</h3>
                <span className="text-sm font-medium">
                  {enrollment?.progress || 0}% complete
                </span>
              </div>
              <Progress value={enrollment?.progress || 0} className="h-2" />
            </div>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center">
              <Avatar className="mr-4 h-12 w-12">
                <AvatarImage src="/placeholder.svg" alt="Instructor" />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Instructor</h3>
                <p className="text-sm text-neutral-500">Prof. Alex Johnson</p>
              </div>
            </div>

            <div className="mb-6 space-y-4">
              <div className="flex items-center">
                <Book className="mr-2 h-4 w-4 text-neutral-500" />
                <span className="text-sm">20 courses</span>
              </div>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4 text-neutral-500" />
                <span className="text-sm">500+ students</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-neutral-500" />
                <span className="text-sm">Expert in the field</span>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              {enrollment?.progress === 100
                ? 'Review Course'
                : 'Continue Learning'}
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 grid grid-cols-3">
          <TabsTrigger value="content">Course Content</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <div className="rounded-lg border bg-white shadow-sm">
            {contentItems.length === 0 ? (
              <div className="p-12 text-center">
                <File className="mx-auto mb-4 h-12 w-12 text-neutral-400" />
                <h3 className="mb-2 text-lg font-medium">
                  No content available
                </h3>
                <p className="text-neutral-500">
                  The instructor has not added any content yet
                </p>
              </div>
            ) : (
              <div className="divide-y">
                {contentItems.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getContentIcon(item.type)}
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm capitalize text-gray-500">
                            {item.type}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          item.type === 'lecture'
                            ? startLecture(item.id)
                            : startQuiz(item.id)
                        }
                      >
                        {item.type === 'lecture' ? (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Watch
                          </>
                        ) : (
                          <>
                            <FileQuestion className="mr-2 h-4 w-4" />
                            Take Quiz
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {courseAssignments.length === 0 ? (
              <div className="rounded-lg border bg-white p-12 text-center shadow-sm md:col-span-2">
                <FileText className="mx-auto mb-4 h-12 w-12 text-neutral-400" />
                <h3 className="mb-2 text-lg font-medium">
                  No assignments available
                </h3>
                <p className="text-neutral-500">
                  The instructor has not added any assignments yet
                </p>
              </div>
            ) : (
              courseAssignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      {assignment.title}
                    </CardTitle>
                    <CardDescription>
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{assignment.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <Badge variant="outline">
                        {assignment.pointsPossible} points
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-yellow-200 bg-yellow-50 text-yellow-700"
                      >
                        Not submitted
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button size="sm">Submit</Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="discussions" className="space-y-6">
          <div className="rounded-lg border bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 h-12 w-12 text-neutral-400">💬</div>
            <h3 className="mb-2 text-lg font-medium">
              Discussions coming soon
            </h3>
            <p className="text-neutral-500">
              Course discussion board will be available soon
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
