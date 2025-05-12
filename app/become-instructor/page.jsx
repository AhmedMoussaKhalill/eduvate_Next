'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function BecomeInstructor() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleBecomeInstructor = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/dev/set-instructor-role', {
        method: 'POST',
      });

      if (response.ok) {
        setMessage(
          'Successfully set as instructor! You can now access the instructor dashboard.'
        );
        // Reload the page after 2 seconds to reflect the new role
        setTimeout(() => {
          window.location.href = '/instructor';
        }, 2000);
      } else {
        const error = await response.text();
        setMessage(`Error: ${error}`);
      }
    } catch (error) {
      setMessage('An error occurred while setting the role.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4 rounded-lg border p-6 shadow-lg">
        <h1 className="text-2xl font-bold">Become an Instructor</h1>
        <p className="text-gray-600">
          Click the button below to set your role as an instructor. This will
          allow you to access the instructor dashboard.
        </p>
        <Button
          onClick={handleBecomeInstructor}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Setting Role...' : 'Become Instructor'}
        </Button>
        {message && (
          <p
            className={`mt-4 text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
