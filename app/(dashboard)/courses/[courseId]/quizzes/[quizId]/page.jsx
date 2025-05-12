'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { MOCK_QUIZZES, MOCK_QUIZ_QUESTIONS } from '@/constants/mock-data';
import { ArrowLeft, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function QuizTaking({ params }) {
  const { courseId, quizId } = params;
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);

  // In a real application, you would fetch this data from your API
  const quiz = MOCK_QUIZZES.find((q) => q.id === quizId);
  const quizQuestions = MOCK_QUIZ_QUESTIONS.filter((q) => q.quizId === quizId);

  useEffect(() => {
    if (quiz) {
      // Initialize timer with quiz duration in minutes, converted to seconds
      setTimeLeft(quiz.duration * 60);

      // Initialize empty answers
      const initialAnswers = {};
      quizQuestions.forEach((question) => {
        initialAnswers[question.id] = null;
      });
      setAnswers(initialAnswers);
    }
  }, [quiz, quizQuestions]);

  useEffect(() => {
    if (timeLeft <= 0) {
      // Auto-submit when time is up
      handleSubmitQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Quiz Not Found</h1>
        <p className="mb-4">The quiz you're looking for doesn't exist.</p>
        <Button onClick={() => router.push(`/courses/${courseId}`)}>
          Return to Course
        </Button>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const navigateToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmitQuiz = async () => {
    setSubmitting(true);

    try {
      // In a real application, you would send this data to your API
      console.log('Submitting quiz answers:', answers);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setQuizSubmitted(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setSubmitting(false);
      setConfirmSubmitOpen(false);
    }
  };

  const calculateScore = () => {
    let score = 0;
    let totalPoints = 0;

    quizQuestions.forEach((question) => {
      totalPoints += question.points;

      const userAnswer = answers[question.id];
      if (userAnswer === null) return;

      if (question.type === 'multiple-choice') {
        if (parseInt(userAnswer) === question.correctAnswer) {
          score += question.points;
        }
      } else if (question.type === 'true-false') {
        if (userAnswer === question.correctAnswer.toString()) {
          score += question.points;
        }
      } else if (question.type === 'short-answer') {
        // In a real application, this would be handled by an instructor or AI
        if (userAnswer.toLowerCase() === question.correctAnswer.toLowerCase()) {
          score += question.points;
        }
      }
    });

    return {
      score,
      totalPoints,
      percentage: Math.round((score / totalPoints) * 100),
    };
  };

  if (quizSubmitted) {
    const result = calculateScore();

    return (
      <div className="container mx-auto max-w-3xl p-6">
        <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
          <div className="mb-6">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">Quiz Completed!</h1>
          <p className="mb-6 text-neutral-600">
            You've successfully completed the quiz.
          </p>

          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">Your Score</h2>
            <div className="mb-4 flex items-center justify-center">
              <div className="text-5xl font-bold text-blue-600">
                {result.score}
              </div>
              <div className="ml-2 text-2xl text-neutral-500">
                / {result.totalPoints}
              </div>
            </div>
            <div className="mx-auto mb-2 w-full max-w-md">
              <Progress value={result.percentage} className="h-3" />
            </div>
            <p className="text-lg">{result.percentage}%</p>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push(`/courses/${courseId}`)}
            >
              Return to Course
            </Button>
            <Button
              onClick={() =>
                router.push(`/courses/${courseId}/quizzes/${quizId}/review`)
              }
            >
              Review Answers
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="mb-8 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.push(`/courses/${courseId}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Exit Quiz
        </Button>

        <div className="flex items-center space-x-2 rounded-full border bg-white px-4 py-2 shadow-sm">
          <Clock className="h-4 w-4 text-red-500" />
          <span className="font-medium">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
                <span className="text-sm text-neutral-500">
                  {currentQuestion.points} points
                </span>
              </div>
              <CardDescription className="mt-2 text-base font-medium">
                {currentQuestion.question}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {currentQuestion.type === 'multiple-choice' && (
                <RadioGroup
                  value={answers[currentQuestion.id]?.toString() || ''}
                  onValueChange={handleAnswerChange}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={index.toString()}
                        id={`option-${index}`}
                      />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestion.type === 'true-false' && (
                <RadioGroup
                  value={answers[currentQuestion.id]?.toString() || ''}
                  onValueChange={handleAnswerChange}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="true" />
                    <Label htmlFor="true">True</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="false" />
                    <Label htmlFor="false">False</Label>
                  </div>
                </RadioGroup>
              )}

              {currentQuestion.type === 'short-answer' && (
                <div className="space-y-2">
                  <Label htmlFor="answer">Your Answer</Label>
                  <Input
                    id="answer"
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    placeholder="Type your answer here..."
                  />
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between border-t p-4">
              <Button
                variant="outline"
                onClick={previousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>

              {currentQuestionIndex < quizQuestions.length - 1 ? (
                <Button onClick={nextQuestion}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={() => setConfirmSubmitOpen(true)}>
                  Submit Quiz
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h3 className="mb-4 font-medium">Question Navigator</h3>
          <div className="grid grid-cols-4 gap-2">
            {quizQuestions.map((_, index) => (
              <Button
                key={index}
                variant={
                  answers[quizQuestions[index].id] !== null
                    ? 'default'
                    : 'outline'
                }
                className={`h-10 w-10 ${currentQuestionIndex === index ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => navigateToQuestion(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="mb-2 flex justify-between text-sm">
            <span>Answered</span>
            <span>
              {Object.values(answers).filter((a) => a !== null).length} /{' '}
              {quizQuestions.length}
            </span>
          </div>
          <Progress
            value={
              (Object.values(answers).filter((a) => a !== null).length /
                quizQuestions.length) *
              100
            }
            className="mb-4 h-2"
          />

          <Button
            className="w-full"
            onClick={() => setConfirmSubmitOpen(true)}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Quiz'}
          </Button>
        </div>
      </div>

      <Dialog open={confirmSubmitOpen} onOpenChange={setConfirmSubmitOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Quiz</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your quiz? You can't make changes
              after submission.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmSubmitOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitQuiz} disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Quiz'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
