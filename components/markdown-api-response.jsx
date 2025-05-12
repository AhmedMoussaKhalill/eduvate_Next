'use client';

import { useState, useEffect } from 'react';
import MarkdownRenderer from '@/components/ui/markdown-renderer';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const MarkdownApiResponse = ({ endpoint, initialPrompt = '', className }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchResponse = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: prompt }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      // Assuming the API returns the answer in the 'answer' field
      const content = data.answer || data.content || data.response || '';

      setResponse(content);
    } catch (err) {
      console.error('Error fetching API response:', err);
      setError(err.message || 'Failed to fetch response');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <div className="mb-4 flex flex-col space-y-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="min-h-[100px] w-full rounded-md border border-gray-300 p-2"
          disabled={isLoading}
        />

        <Button onClick={fetchResponse} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Fetching Response...
            </>
          ) : (
            'Get Response'
          )}
        </Button>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      {response && (
        <Card>
          <CardContent className="pt-6">
            <MarkdownRenderer content={response} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MarkdownApiResponse;
