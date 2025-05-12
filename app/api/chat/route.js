import { NextResponse } from 'next/server';

const CHAT_API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL;

// Helper function to clean up API response for markdown
function cleanResponseForMarkdown(text) {
  if (!text || typeof text !== 'string') {
    return text;
  }

  // Remove thinking sections
  let cleaned = text.replace(/<think>[\s\S]*?<\/think>/g, '');

  // Replace or remove problematic characters/tags
  cleaned = cleaned.replace(/--•/g, '---');
  cleaned = cleaned.replace(/<\/?b>/g, '**');
  cleaned = cleaned.replace(/<\/?i>/g, '_');
  cleaned = cleaned.replace(/•/g, '* ');

  // Fix spacing issues
  cleaned = cleaned.replace(/\s+\*/g, ' *');
  cleaned = cleaned.replace(/\*\s+/g, '* ');

  // Fix math formatting if needed
  cleaned = cleaned.replace(
    /\$\\operatorname{([^}]+)}\$/g,
    '$\\operatorname{$1}$'
  );

  return cleaned.trim();
}

export async function POST(req) {
  try {
    // Destructure with fallbacks to handle both formats: { message, chatId } and { question }
    const { message, chatId, question } = await req.json();
    const userMessage = question || message; // Use question if provided, otherwise use message

    console.log('Received request:', { userMessage, chatId });

    if (!userMessage) {
      return NextResponse.json(
        { error: 'Message or question is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${CHAT_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        chatId,
        // Request markdown formatted response if possible
        format: 'markdown',
      }),
    });

    console.log('External API response status:', response.status);
    const data = await response.json();
    console.log('External API response data:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get response from chat API');
    }

    // Extract content from various possible response formats
    // First check for answer field, then content, then message, etc.
    let content =
      data.answer || data.content || data.message || data.response || data;

    // If content is an object, convert it to a string
    if (typeof content === 'object') {
      content = JSON.stringify(content);
    }

    // Clean up the content for markdown rendering
    const cleanedContent = cleanResponseForMarkdown(content);

    // Return the content in a format consistent with our frontend expectations
    // This will be consumed by the MarkdownRenderer component
    return NextResponse.json({
      answer: cleanedContent,
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: error.status || 500 }
    );
  }
}
