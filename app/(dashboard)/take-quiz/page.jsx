'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const TakeQuiz = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const quizData = searchParams.get('quiz');
    if (quizData) {
      try {
        const parsedQuiz = JSON.parse(decodeURIComponent(quizData));
        setQuiz(parsedQuiz);
        // Set timer based on number of questions (2 minutes per question)
        setTimeLeft(parsedQuiz.questions.length * 2 * 60);
      } catch (error) {
        console.error('Error parsing quiz data:', error);
        toast.error('Invalid quiz data');
        router.push('/quiz-maker');
      }
    } else {
      router.push('/quiz-maker');
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const calculateScore = async () => {
    let totalScore = 0;
    let maxScore = quiz.questions.length;

    for (let i = 0; i < quiz.questions.length; i++) {
      const question = quiz.questions[i];
      const userAnswer = answers[i];

      if (question.type === 'mcq') {
        if (userAnswer === question.correctAnswer) {
          totalScore++;
        }
      } else if (question.type === 'essay') {
        // For essay questions, we'll use the chat API to evaluate the answer
        try {
          const response = await fetch('/api/quiz/evaluate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              question: question.question,
              modelAnswer: question.modelAnswer,
              userAnswer: userAnswer,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to evaluate essay answer');
          }

          const result = await response.json();
          if (result.score > 0.7) {
            // If the answer is 70% or more similar to the model answer
            totalScore++;
          }
        } catch (error) {
          console.error('Error evaluating essay answer:', error);
        }
      }
    }

    return {
      score: totalScore,
      maxScore,
      percentage: (totalScore / maxScore) * 100,
    };
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const result = await calculateScore();
      setScore(result);
      setShowResults(true);
      toast.success(
        `Quiz completed! Score: ${result.score}/${result.maxScore}`
      );
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast.error('Failed to submit quiz');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!quiz) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
            <CardDescription>
              Your score: {score.score}/{score.maxScore} (
              {score.percentage.toFixed(1)}%)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {quiz.questions.map((question, index) => (
              <div key={index} className="space-y-4 rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium">Question {index + 1}</h3>
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                    {question.type.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-700">{question.question}</p>

                <div className="space-y-2">
                  <p className="font-medium">Your Answer:</p>
                  <p className="text-gray-600">
                    {answers[index] || 'No answer provided'}
                  </p>
                </div>

                {question.type === 'mcq' && (
                  <div className="space-y-2">
                    <p className="font-medium">Correct Answer:</p>
                    <p className="text-green-600">{question.correctAnswer}</p>
                  </div>
                )}

                <div className="rounded-md bg-gray-50 p-3">
                  <p className="text-sm font-medium text-gray-700">
                    Explanation:
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {question.explanation}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push('/quiz-maker')}
              >
                Create New Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{quiz.title}</h1>
        <div className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700">
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          {quiz.questions.map((question, index) => (
            <div key={index} className="space-y-4 rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <h3 className="font-medium">Question {index + 1}</h3>
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                  {question.type.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-700">{question.question}</p>

              {question.type === 'mcq' ? (
                <RadioGroup
                  value={answers[index]}
                  onValueChange={(value) => handleAnswerChange(index, value)}
                >
                  {question.options.map((option, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`q${index}-o${i}`} />
                      <Label htmlFor={`q${index}-o${i}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <Textarea
                  placeholder="Type your answer here..."
                  value={answers[index] || ''}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="min-h-[100px]"
                />
              )}
            </div>
          ))}

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Quiz'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TakeQuiz;
