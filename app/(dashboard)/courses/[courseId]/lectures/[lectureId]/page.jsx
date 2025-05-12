'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import {
  MOCK_COURSES,
  MOCK_LECTURES,
  MOCK_ENROLLMENTS,
} from '@/constants/mock-data';
import {
  ArrowLeft,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Video,
  FileQuestion,
  Download,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LectureView({ params }) {
  const { courseId, lectureId } = params;
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
  const lecture = MOCK_LECTURES.find((l) => l.id === lectureId);

  if (!course || !lecture) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Lecture Not Found</h1>
        <p className="mb-4">The lecture you're looking for doesn't exist.</p>
        <Button onClick={() => router.push(`/courses/${courseId}`)}>
          Return to Course
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
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Access Denied</h1>
        <p className="mb-4">You are not enrolled in this course.</p>
        <Button onClick={() => router.push(`/courses/${courseId}`)}>
          View Course
        </Button>
      </div>
    );
  }

  // Get all lectures for this course
  const courseLectures = MOCK_LECTURES.filter(
    (l) => l.courseId === courseId
  ).sort((a, b) => a.position - b.position);

  // Find the current lecture index and determine previous/next lectures
  const currentIndex = courseLectures.findIndex((l) => l.id === lectureId);
  const previousLecture =
    currentIndex > 0 ? courseLectures[currentIndex - 1] : null;
  const nextLecture =
    currentIndex < courseLectures.length - 1
      ? courseLectures[currentIndex + 1]
      : null;

  // Handle lecture navigation
  const goToPreviousLecture = () => {
    if (previousLecture) {
      router.push(`/courses/${courseId}/lectures/${previousLecture.id}`);
    }
  };

  const goToNextLecture = () => {
    if (nextLecture) {
      router.push(`/courses/${courseId}/lectures/${nextLecture.id}`);
    }
  };

  const markAsComplete = () => {
    // In a real application, you would update the progress through an API
    console.log('Marking lecture as complete:', lectureId);
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push(`/courses/${courseId}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="space-y-6 md:col-span-3">
          <div>
            <h1 className="mb-2 text-2xl font-bold">{lecture.title}</h1>
            <div className="mb-4 flex items-center text-sm text-neutral-500">
              <Badge variant="outline" className="mr-2">
                Lecture {currentIndex + 1}
              </Badge>
              <span>Course: {course.title}</span>
            </div>
          </div>

          {lecture.videoUrl ? (
            <div className="flex aspect-video items-center justify-center rounded-lg bg-black">
              <iframe
                className="h-full w-full rounded-lg"
                src={lecture.videoUrl}
                title={lecture.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-lg bg-neutral-100">
              <div className="text-center">
                <Video className="mx-auto mb-2 h-12 w-12 text-neutral-400" />
                <p className="text-neutral-500">
                  No video available for this lecture
                </p>
              </div>
            </div>
          )}

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6 grid grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="prose max-w-none">
                    <div
                      dangerouslySetInnerHTML={{ __html: lecture.content }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h3 className="mb-2 text-lg font-medium">Your Notes</h3>
                    <p className="mb-4 text-sm text-neutral-500">
                      Take notes while watching this lecture.
                    </p>
                    <textarea
                      className="h-60 w-full rounded-lg border p-4"
                      placeholder="Type your notes here..."
                    ></textarea>
                  </div>
                  <Button>Save Notes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussion" className="space-y-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <MessageCircle className="mx-auto mb-2 h-12 w-12 text-neutral-400" />
                  <h3 className="mb-2 text-lg font-medium">Discussion Forum</h3>
                  <p className="mb-4 text-neutral-500">
                    Ask questions and discuss this lecture with your classmates
                    and instructor.
                  </p>
                  <Button variant="outline">Coming Soon</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between border-t pt-6">
            <Button
              variant="outline"
              onClick={goToPreviousLecture}
              disabled={!previousLecture}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous Lecture
            </Button>

            <Button onClick={markAsComplete}>
              <CheckSquare className="mr-2 h-4 w-4" />
              Mark as Complete
            </Button>

            <Button onClick={goToNextLecture} disabled={!nextLecture}>
              Next Lecture
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <h3 className="mb-4 font-medium">Course Progress</h3>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm">Your progress</span>
              <span className="text-sm font-medium">
                {enrollment?.progress || 0}%
              </span>
            </div>
            <Progress value={enrollment?.progress || 0} className="mb-4 h-2" />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push(`/courses/${courseId}`)}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Course Overview
            </Button>
          </div>

          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <h3 className="mb-4 font-medium">Lecture Content</h3>
            <div className="space-y-4">
              {courseLectures.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex cursor-pointer items-center rounded-md p-2 ${item.id === lectureId ? 'bg-blue-50 font-medium text-blue-700' : 'hover:bg-neutral-50'}`}
                  onClick={() =>
                    router.push(`/courses/${courseId}/lectures/${item.id}`)
                  }
                >
                  <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-xs">
                    {index + 1}
                  </div>
                  <div className="flex-1 text-sm">{item.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <h3 className="mb-4 font-medium">Resources</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.print()}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Lecture Notes
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push(`/courses/${courseId}/quizzes`)}
              >
                <FileQuestion className="mr-2 h-4 w-4" />
                Go to Course Quizzes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
