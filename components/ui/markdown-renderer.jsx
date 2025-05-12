'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { cn } from '@/lib/utils';

const MarkdownRenderer = ({ content, className }) => {
  // If content has a "think" section, remove it
  let processedContent = content;
  if (processedContent && typeof processedContent === 'string') {
    // Remove <think>...</think> sections
    processedContent = processedContent.replace(
      /<think>[\s\S]*?<\/think>/g,
      ''
    );

    // Replace HTML-like tags with markdown equivalents
    processedContent = processedContent.replace(/<\/?b>/g, '**');
    processedContent = processedContent.replace(/<\/?i>/g, '_');
    processedContent = processedContent.replace(/--•/g, '---');

    // Fix bullet points
    processedContent = processedContent.replace(/•/g, '* ');

    // Clean up any remaining HTML-like markers
    processedContent = processedContent.replace(/\*Source:•/g, '*Source:*');

    // Normalize math delimiters
    processedContent = processedContent.replace(/\$\$(.*?)\$\$/g, '$$\n$1\n$$');
    processedContent = processedContent.replace(/\$(.*?)\$/g, '$\n$1\n$');
  }

  return (
    <div className={cn('markdown-content', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="mb-4 mt-6 text-2xl font-bold" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="mb-3 mt-5 text-xl font-bold" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="mb-2 mt-4 text-lg font-semibold" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="mb-2 mt-3 font-semibold" {...props} />
          ),
          p: ({ node, ...props }) => <p className="mb-4" {...props} />,
          ul: ({ node, ...props }) => (
            <ul className="mb-4 list-disc pl-6" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="mb-4 list-decimal pl-6" {...props} />
          ),
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          a: ({ node, ...props }) => (
            <a className="text-blue-600 hover:underline" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="my-4 border-l-4 border-gray-300 py-1 pl-4 italic"
              {...props}
            />
          ),
          code: ({ node, className, inline, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={atomDark}
                language={match[1]}
                PreTag="div"
                className="my-4 rounded"
                {...props}
              />
            ) : (
              <code
                className={cn(
                  inline
                    ? 'rounded bg-gray-100 px-1 text-sm'
                    : 'my-4 block overflow-x-auto rounded bg-gray-100 p-3 text-sm'
                )}
                {...props}
              />
            );
          },
          pre: ({ node, ...props }) => (
            <pre
              className="my-4 overflow-x-auto rounded bg-gray-100 p-3 text-sm"
              {...props}
            />
          ),
          table: ({ node, ...props }) => (
            <div className="my-4 overflow-x-auto">
              <table
                className="min-w-full border-collapse border border-gray-300"
                {...props}
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="border-b bg-gray-100" {...props} />
          ),
          tbody: ({ node, ...props }) => <tbody {...props} />,
          tr: ({ node, ...props }) => (
            <tr className="border-b hover:bg-gray-50" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-4 py-2 text-left font-medium" {...props} />
          ),
          td: ({ node, ...props }) => <td className="px-4 py-2" {...props} />,
          hr: ({ node, ...props }) => (
            <hr className="my-6 border-gray-300" {...props} />
          ),
        }}
      >
        {processedContent || ''}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
