import { NextResponse } from 'next/server';

const CHAT_API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL;

export async function POST(req) {
  try {
    const {
      course,
      subject,
      topic,
      numberOfQuestions,
      difficulty,
      questionType,
      timeLimit,
      includeExplanations,
      includeHints,
      targetAudience,
      quizStyle,
      customInstructions,
    } = await req.json();

    console.log('Received quiz request:', {
      course,
      subject,
      topic,
      numberOfQuestions,
      difficulty,
      questionType,
      timeLimit,
      includeExplanations,
      includeHints,
      targetAudience,
      quizStyle,
      customInstructions,
    });

    // Validate required fields
    if (!course || !numberOfQuestions || !difficulty || !questionType) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Build a rich, detailed prompt for the AI
    let prompt = `Generate a ${difficulty} difficulty quiz about ${course}`;

    // Add specific topic if provided
    if (topic) {
      prompt += ` focusing specifically on the topic of "${topic}"`;
    }

    prompt += ` with ${numberOfQuestions} questions.`;

    // Question type specifications
    if (questionType === 'mcq') {
      prompt += ` All questions should be multiple choice with 4 options each.`;
    } else if (questionType === 'essay') {
      prompt += ` All questions should be essay/short answer format.`;
    } else if (questionType === 'both') {
      prompt += ` The quiz should have a mix of multiple choice questions (with 4 options each) and essay/short answer questions.`;
    }

    // Target audience
    if (targetAudience) {
      const audienceMap = {
        k12: 'K-12 students',
        highschool: 'high school students',
        college: 'college-level students',
        graduate: 'graduate-level students',
        professional: 'professionals in the field',
      };

      prompt += ` The questions should be appropriate for ${audienceMap[targetAudience] || targetAudience}.`;
    }

    // Quiz style
    if (quizStyle) {
      const styleMap = {
        standard: 'standard academic format with emphasis on core knowledge',
        challenging:
          'challenging format that emphasizes critical thinking and problem-solving',
        conceptual:
          'conceptual format focusing on understanding fundamental concepts and theories',
        application:
          'application-oriented format focusing on practical uses of knowledge',
        certification:
          'certification-style questions similar to professional certification exams',
      };

      prompt += ` Use a ${styleMap[quizStyle] || quizStyle}.`;
    }

    // Include explanations and hints if requested
    if (includeExplanations) {
      prompt += ` For each question, include a detailed explanation of the answer.`;
    }

    if (includeHints) {
      prompt += ` Include helpful hints for more difficult questions.`;
    }

    // Add any custom instructions
    if (customInstructions) {
      prompt += ` Additional instructions: ${customInstructions}`;
    }

    // Format specification
    prompt += `
    Format the response as a JSON object with an array of questions.
    Each question should have the following structure:
    {
      "type": "mcq" or "essay",
      "question": "question text",
      "options": ["option1", "option2", "option3", "option4"] (for MCQ only),
      "correctAnswer": "correct answer" (for MCQ only),
      "modelAnswer": "model answer" (for essay only),
      "explanation": "explanation of the answer" (if explanations requested),
      "hint": "hint to help answer the question" (if hints requested)
    }
    
    Ensure all questions are accurate, well-formatted, and appropriate for the specified difficulty level.`;

    // Make the API call
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
    console.log('External API response received');

    // Extract the content from the response
    const content = data.content || data.message || data.response || data;

    // Try to parse the content as JSON
    let quizData;
    try {
      // If the response is already a string, parse it directly
      if (typeof content === 'string') {
        quizData = JSON.parse(content);
      }
      // If it's an object, it might be the direct response
      else if (typeof content === 'object') {
        quizData = content;
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (parseError) {
      console.error('Error parsing quiz data:', parseError);
      // If parsing fails, try to extract JSON from the text
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          quizData = JSON.parse(jsonMatch[0]);
        } catch (e) {
          throw new Error('Failed to parse quiz data from AI response');
        }
      } else {
        throw new Error('Failed to parse quiz data from AI response');
      }
    }

    // Validate the quiz data structure
    if (!quizData.questions || !Array.isArray(quizData.questions)) {
      throw new Error('Invalid quiz data structure');
    }

    // Validate and process each question
    quizData.questions = quizData.questions.map((q, index) => {
      if (!q.type || !q.question) {
        throw new Error(`Invalid question structure at index ${index}`);
      }

      // Validate MCQ questions
      if (q.type === 'mcq' && (!q.options || !q.correctAnswer)) {
        throw new Error(`Invalid MCQ question structure at index ${index}`);
      }

      // Validate essay questions
      if (q.type === 'essay' && !q.modelAnswer) {
        throw new Error(`Invalid essay question structure at index ${index}`);
      }

      // Ensure explanation exists if requested
      if (includeExplanations && !q.explanation) {
        q.explanation = 'Explanation not provided by the AI.';
      }

      // Ensure hint exists if requested
      if (includeHints && !q.hint) {
        q.hint = 'Hint not provided by the AI.';
      }

      return q;
    });

    // Add metadata to the quiz
    quizData.metadata = {
      course,
      topic: topic || null,
      difficulty,
      questionType,
      timeLimit: parseInt(timeLimit) || 30,
      includesExplanations: includeExplanations,
      includesHints: includeHints,
      targetAudience: targetAudience || 'college',
      quizStyle: quizStyle || 'standard',
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json(quizData);
  } catch (error) {
    console.error('Quiz API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: error.status || 500 }
    );
  }
}
