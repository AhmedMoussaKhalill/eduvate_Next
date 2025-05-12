'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { isInstructor } from '@/lib/user-roles';
import {
  MOCK_COURSES,
  MOCK_LECTURES,
  MOCK_QUIZZES,
} from '@/constants/mock-data';
import {
  ArrowLeft,
  Plus,
  File,
  Video,
  FileQuestion,
  GripVertical,
  Pencil,
  Trash,
  Settings,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function CourseEditor({ params }) {
  const { courseId } = params;
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState('content');
  const [newLectureOpen, setNewLectureOpen] = useState(false);
  const [newQuizOpen, setNewQuizOpen] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isInstructor(user)) {
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

  // In a real application, you would fetch this data from your API
  const course = MOCK_COURSES.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Course Not Found</h1>
        <p className="mb-4">The course you're looking for doesn't exist.</p>
        <Button onClick={() => router.push('/instructor')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  // Filter lectures and quizzes for this course
  const courseLectures = MOCK_LECTURES.filter(
    (lecture) => lecture.courseId === courseId
  );
  const courseQuizzes = MOCK_QUIZZES.filter(
    (quiz) => quiz.courseId === courseId
  );

  // Combine lectures and quizzes for the content list, and sort by position
  const contentItems = [
    ...courseLectures.map((lecture) => ({ ...lecture, type: 'lecture' })),
    ...courseQuizzes.map((quiz) => ({ ...quiz, type: 'quiz' })),
  ].sort((a, b) => a.position - b.position);

  const handleCreateLecture = (data) => {
    console.log('Creating lecture:', data);
    setNewLectureOpen(false);
    // In a real app, this would send data to your API
  };

  const handleCreateQuiz = (data) => {
    console.log('Creating quiz:', data);
    setNewQuizOpen(false);
    // In a real app, this would send data to your API
  };

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

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push('/instructor')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-neutral-500">{course.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 grid grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Course Content</h2>
            <div className="flex gap-2">
              <Dialog open={newLectureOpen} onOpenChange={setNewLectureOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Lecture
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Lecture</DialogTitle>
                    <DialogDescription>
                      Create a new lecture for your course.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      const data = {
                        title: formData.get('title'),
                        content: formData.get('content'),
                        videoUrl: formData.get('videoUrl'),
                      };
                      handleCreateLecture(data);
                    }}
                  >
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Lecture Title</Label>
                        <Input id="title" name="title" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          name="content"
                          rows={5}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="videoUrl">Video URL (optional)</Label>
                        <Input
                          id="videoUrl"
                          name="videoUrl"
                          placeholder="https://example.com/video.mp4"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setNewLectureOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Create Lecture</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog open={newQuizOpen} onOpenChange={setNewQuizOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Quiz
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Quiz</DialogTitle>
                    <DialogDescription>
                      Create a new quiz for your course.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      const data = {
                        title: formData.get('title'),
                        instructions: formData.get('instructions'),
                        duration: formData.get('duration'),
                      };
                      handleCreateQuiz(data);
                    }}
                  >
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Quiz Title</Label>
                        <Input id="title" name="title" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="instructions">Instructions</Label>
                        <Textarea
                          id="instructions"
                          name="instructions"
                          rows={3}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <Input
                          id="duration"
                          name="duration"
                          type="number"
                          min="1"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setNewQuizOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Create Quiz</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="rounded-lg border bg-white">
            {contentItems.length === 0 ? (
              <div className="p-12 text-center">
                <File className="mx-auto mb-4 h-12 w-12 text-neutral-400" />
                <h3 className="mb-2 text-lg font-medium">No content yet</h3>
                <p className="mb-6 text-neutral-500">
                  Get started by adding lectures and quizzes
                </p>
                <div className="flex justify-center gap-4">
                  <Button onClick={() => setNewLectureOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Lecture
                  </Button>
                  <Button onClick={() => setNewQuizOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Quiz
                  </Button>
                </div>
              </div>
            ) : (
              <div className="divide-y">
                {contentItems.map((item, index) => (
                  <div key={item.id} className="flex items-center p-4">
                    <div className="mr-2 text-gray-400">
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <div className="flex flex-1 items-center">
                      {getContentIcon(item.type)}
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm capitalize text-gray-500">
                          {item.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
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
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <h2 className="text-xl font-semibold">Students</h2>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 text-neutral-400">👥</div>
            <h3 className="mb-2 text-lg font-medium">
              Student enrollment coming soon
            </h3>
            <p className="text-neutral-500">
              Manage students enrolled in this course
            </p>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <h2 className="text-xl font-semibold">Course Settings</h2>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-12 text-center">
            <Settings className="mx-auto mb-4 h-12 w-12 text-neutral-400" />
            <h3 className="mb-2 text-lg font-medium">Settings coming soon</h3>
            <p className="text-neutral-500">
              Configure course visibility and access settings
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
