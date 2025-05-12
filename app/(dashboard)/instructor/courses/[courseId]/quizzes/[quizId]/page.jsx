'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { isInstructor } from '@/lib/user-roles';
import { MOCK_QUIZZES, MOCK_QUIZ_QUESTIONS } from '@/constants/mock-data';
import {
  ArrowLeft,
  Plus,
  MessageSquare,
  Check,
  X,
  Trash,
  Save,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export default function QuizEditor({ params }) {
  const { courseId, quizId } = params;
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [newQuestionOpen, setNewQuestionOpen] = useState(false);
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState(0);
  const [isTrueFalse, setIsTrueFalse] = useState(false);

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
  const quiz = MOCK_QUIZZES.find((q) => q.id === quizId);

  if (!quiz) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Quiz Not Found</h1>
        <p className="mb-4">The quiz you're looking for doesn't exist.</p>
        <Button onClick={() => router.push(`/instructor/courses/${courseId}`)}>
          Return to Course
        </Button>
      </div>
    );
  }

  // Get questions for this quiz
  const quizQuestions = MOCK_QUIZ_QUESTIONS.filter((q) => q.quizId === quizId);

  const handleCreateQuestion = (data) => {
    console.log('Creating question:', data);
    setNewQuestionOpen(false);
    // In a real app, this would send data to your API
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index) => {
    if (options.length <= 2) return;
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    if (correctOption >= newOptions.length) {
      setCorrectOption(0);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push(`/instructor/courses/${courseId}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{quiz.title}</h1>
            <p className="text-neutral-500">
              Time limit: {quiz.duration} minutes
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button size="sm">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Quiz Settings</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Quiz Title</Label>
            <Input id="title" defaultValue={quiz.title} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              defaultValue={quiz.duration}
              min="1"
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              defaultValue={quiz.instructions}
              rows={3}
            />
          </div>
          <div className="col-span-2 flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">Publish Quiz</h3>
              <p className="text-sm text-gray-500">
                Make the quiz available to students
              </p>
            </div>
            <Switch checked={quiz.isPublished} />
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Questions</h2>
        <Dialog open={newQuestionOpen} onOpenChange={setNewQuestionOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Question</DialogTitle>
              <DialogDescription>
                Create a new question for your quiz.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = {
                  question: formData.get('question'),
                  type: questionType,
                  points: parseInt(formData.get('points')),
                  options: questionType === 'multiple-choice' ? options : null,
                  correctAnswer:
                    questionType === 'multiple-choice'
                      ? correctOption
                      : questionType === 'true-false'
                        ? isTrueFalse
                        : formData.get('shortAnswer'),
                };
                handleCreateQuestion(data);
              }}
            >
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Question Text</Label>
                  <Textarea id="question" name="question" rows={3} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="questionType">Question Type</Label>
                  <Select value={questionType} onValueChange={setQuestionType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple-choice">
                        Multiple Choice
                      </SelectItem>
                      <SelectItem value="true-false">True/False</SelectItem>
                      <SelectItem value="short-answer">Short Answer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {questionType === 'multiple-choice' && (
                  <div className="space-y-4">
                    <Label>Answer Options</Label>
                    {options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroup
                          value={correctOption.toString()}
                          onValueChange={(val) =>
                            setCorrectOption(parseInt(val))
                          }
                        >
                          <RadioGroupItem
                            value={index.toString()}
                            id={`option-${index}`}
                          />
                        </RadioGroup>
                        <Input
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(index, e.target.value)
                          }
                          placeholder={`Option ${index + 1}`}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveOption(index)}
                          disabled={options.length <= 2}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddOption}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Option
                    </Button>
                  </div>
                )}

                {questionType === 'true-false' && (
                  <div className="space-y-2">
                    <Label>Correct Answer</Label>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroup
                          value={isTrueFalse ? 'true' : 'false'}
                          onValueChange={(val) =>
                            setIsTrueFalse(val === 'true')
                          }
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="true" />
                            <Label htmlFor="true">True</Label>
                          </div>
                          <div className="mt-2 flex items-center space-x-2">
                            <RadioGroupItem value="false" id="false" />
                            <Label htmlFor="false">False</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                )}

                {questionType === 'short-answer' && (
                  <div className="space-y-2">
                    <Label htmlFor="shortAnswer">Correct Answer</Label>
                    <Input
                      id="shortAnswer"
                      name="shortAnswer"
                      placeholder="Enter the correct answer"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="points">Points</Label>
                  <Input
                    id="points"
                    name="points"
                    type="number"
                    defaultValue="10"
                    min="1"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setNewQuestionOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Question</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {quizQuestions.length === 0 ? (
        <div className="rounded-lg border bg-white p-12 text-center">
          <MessageSquare className="mx-auto mb-4 h-12 w-12 text-neutral-400" />
          <h3 className="mb-2 text-lg font-medium">No questions yet</h3>
          <p className="mb-6 text-neutral-500">Add questions to your quiz</p>
          <Button onClick={() => setNewQuestionOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Question
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {quizQuestions.map((question, index) => (
            <Card key={question.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-base font-medium">
                    Question {index + 1}{' '}
                    <span className="text-sm font-normal text-gray-500">
                      ({question.points} points)
                    </span>
                  </CardTitle>
                  <CardDescription className="mt-2 text-base">
                    {question.question}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {question.type === 'multiple-choice' && (
                  <div className="space-y-2">
                    {question.options.map((option, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        {i === question.correctAnswer ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === 'true-false' && (
                  <div className="flex items-center space-x-2">
                    <span>Correct answer:</span>
                    <span className="font-medium">
                      {question.correctAnswer ? 'True' : 'False'}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
