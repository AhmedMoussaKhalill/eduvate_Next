'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { isInstructor } from '@/lib/user-roles';
import { ArrowLeft, Image, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export default function CreateCourse() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isPublished: false,
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTogglePublish = (checked) => {
    setFormData((prev) => ({
      ...prev,
      isPublished: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, this would send data to your API
      console.log('Creating course:', formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push('/instructor');
    } catch (error) {
      console.error('Error creating course:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push('/instructor')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold">Create New Course</h1>
        <p className="text-neutral-500">
          Fill in the details to create a new course
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6 rounded-lg border bg-white p-6">
          <div className="space-y-2">
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Introduction to Computer Science"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Course Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Provide a detailed description of your course..."
              value={formData.description}
              onChange={handleChange}
              rows={6}
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Course Image</Label>
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <Image className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-medium">Upload course image</h3>
              <p className="mb-4 text-sm text-gray-500">
                Drag and drop an image, or click to browse
              </p>
              <Button type="button" variant="outline">
                Choose File
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-lg font-medium">Course Publication</h3>
              <p className="text-sm text-gray-500">
                Students will be able to enroll if the course is published
              </p>
            </div>
            <Switch
              checked={formData.isPublished}
              onCheckedChange={handleTogglePublish}
            />
          </div>
        </div>

        <Separator />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/instructor')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Creating...' : 'Create Course'}
          </Button>
        </div>
      </form>
    </div>
  );
}
