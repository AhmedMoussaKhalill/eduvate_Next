import { NextResponse } from 'next/server';

const CHAT_API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL;

export async function POST(req) {
  try {
    const { question, modelAnswer, userAnswer } = await req.json();

    if (!question || !modelAnswer || !userAnswer) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Construct the prompt for evaluating the answer
    const prompt = `Evaluate the following essay answer for the question: "${question}"

Model Answer: "${modelAnswer}"

User's Answer: "${userAnswer}"

Please evaluate the user's answer on a scale of 0 to 1, where:
- 1 means the answer is perfect and matches the model answer
- 0 means the answer is completely wrong or irrelevant

Consider:
1. Accuracy of the information
2. Completeness of the answer
3. Understanding of the concepts
4. Clarity of explanation

Return only a number between 0 and 1 as your evaluation.`;

    const response = await fetch(`${CHAT_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: prompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from chat API');
    }

    const data = await response.json();
    const score = parseFloat(
      data.content || data.message || data.response || data
    );

    if (isNaN(score) || score < 0 || score > 1) {
      throw new Error('Invalid score received from AI');
    }

    return NextResponse.json({ score });
  } catch (error) {
    console.error('Error evaluating essay answer:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to evaluate answer' },
      { status: 500 }
    );
  }
}
