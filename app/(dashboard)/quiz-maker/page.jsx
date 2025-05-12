'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Loader2,
  BookOpen,
  Brain,
  Timer,
  Check,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  BrainCircuit,
  LucideSearch,
  HelpCircle,
  BookCopy,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const QuizMaker = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('basic');
  const [progress, setProgress] = useState(25);
  const [isGenerating, setIsGenerating] = useState(false);

  // Enhanced form data with more options
  const [formData, setFormData] = useState({
    course: '',
    subject: '',
    topic: '',
    numberOfQuestions: '10',
    difficulty: 'medium',
    questionType: 'mcq',
    timeLimit: '30',
    includeExplanations: true,
    includeHints: false,
    targetAudience: 'college',
    quizStyle: 'standard',
    customInstructions: '',
  });

  // Sample available courses for the select dropdown
  const availableCourses = [
    { value: 'data-analysis', label: 'Data Analysis' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'python-programming', label: 'Python Programming' },
    { value: 'database-management', label: 'Database Management' },
    { value: 'law101', label: 'Law 101' },
    { value: 'politics101', label: 'Politics 101' },
    { value: 'english101', label: 'English 101' },
    { value: 'economics101', label: 'Economics 101' },
    { value: 'mathematics101', label: 'Mathematics 101' },
  ];

  // Preview sample questions
  const [previewQuestions, setPreviewQuestions] = useState([
    {
      type: 'mcq',
      question: 'What is the primary purpose of a database index?',
      options: [
        'To improve query performance',
        'To encrypt data',
        'To compress data',
        'To validate data integrity',
      ],
    },
    {
      type: 'essay',
      question:
        'Explain the concept of data normalization and its benefits in database design.',
    },
  ]);

  const handleTabChange = (value) => {
    setActiveTab(value);
    // Update progress based on tab
    if (value === 'basic') setProgress(25);
    else if (value === 'advanced') setProgress(50);
    else if (value === 'preview') setProgress(75);
    else if (value === 'generate') setProgress(100);
  };

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      // Prepare data for API
      const apiData = {
        course: formData.course,
        subject: formData.subject,
        topic: formData.topic,
        numberOfQuestions: formData.numberOfQuestions,
        difficulty: formData.difficulty,
        questionType: formData.questionType,
        includeExplanations: formData.includeExplanations,
        includeHints: formData.includeHints,
        targetAudience: formData.targetAudience,
        quizStyle: formData.quizStyle,
        customInstructions: formData.customInstructions,
        timeLimit: formData.timeLimit,
      };

      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate quiz');
      }

      if (!data.questions || !Array.isArray(data.questions)) {
        throw new Error('Invalid quiz data received from server');
      }

      // Add title and metadata to the quiz data
      const quizWithTitle = {
        ...data,
        title: formData.topic
          ? `${formData.topic} - ${formData.difficulty} Quiz`
          : `${formData.course} Quiz - ${formData.difficulty} Difficulty`,
        timeLimit: parseInt(formData.timeLimit) * 60, // convert to seconds
        createdAt: new Date().toISOString(),
      };

      // Navigate to take-quiz page with the quiz data
      const quizParam = encodeURIComponent(JSON.stringify(quizWithTitle));
      router.push(`/take-quiz?quiz=${quizParam}`);

      toast.success('Quiz generated successfully! Get ready to start.');
    } catch (error) {
      console.error('Error generating quiz:', error);
      toast.error(
        error.message || 'Failed to generate quiz. Please try again.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNextTab = () => {
    if (activeTab === 'basic') handleTabChange('advanced');
    else if (activeTab === 'advanced') handleTabChange('preview');
    else if (activeTab === 'preview') handleTabChange('generate');
  };

  const handlePrevTab = () => {
    if (activeTab === 'advanced') handleTabChange('basic');
    else if (activeTab === 'preview') handleTabChange('advanced');
    else if (activeTab === 'generate') handleTabChange('preview');
  };

  // Check if current tab is complete
  const isCurrentTabComplete = () => {
    if (activeTab === 'basic') {
      return (
        !!formData.course &&
        !!formData.numberOfQuestions &&
        !!formData.difficulty
      );
    }
    return true;
  };

  // Preview of quiz settings before generation
  const renderSettingsSummary = () => {
    return (
      <div className="space-y-4 rounded-lg border bg-gray-50 p-4">
        <h3 className="font-medium">Quiz Configuration</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-600" />
            <span className="text-gray-500">Course:</span>
            <span className="font-medium">
              {availableCourses.find((c) => c.value === formData.course)
                ?.label || formData.course}
            </span>
          </div>
          {formData.topic && (
            <div className="flex items-center gap-2">
              <BookCopy className="h-4 w-4 text-blue-600" />
              <span className="text-gray-500">Topic:</span>
              <span className="font-medium">{formData.topic}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-blue-600" />
            <span className="text-gray-500">Questions:</span>
            <span className="font-medium">{formData.numberOfQuestions}</span>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-blue-600" />
            <span className="text-gray-500">Difficulty:</span>
            <span className="font-medium capitalize">
              {formData.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-600" />
            <span className="text-gray-500">Type:</span>
            <span className="font-medium">
              {formData.questionType === 'mcq'
                ? 'Multiple Choice'
                : formData.questionType === 'essay'
                  ? 'Essay Questions'
                  : 'Mixed Format'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-blue-600" />
            <span className="text-gray-500">Time Limit:</span>
            <span className="font-medium">{formData.timeLimit} minutes</span>
          </div>
          {formData.includeExplanations && (
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-4 w-4 text-blue-600" />
              <span className="text-gray-500">Includes:</span>
              <span className="font-medium">Answer Explanations</span>
            </div>
          )}
          {formData.includeHints && (
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-gray-500">Includes:</span>
              <span className="font-medium">Hints</span>
            </div>
          )}
          {formData.customInstructions && (
            <div className="col-span-2 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <LucideSearch className="h-4 w-4 text-blue-600" />
                <span className="text-gray-500">Custom Instructions:</span>
              </div>
              <p className="ml-6 text-sm text-gray-700">
                {formData.customInstructions}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">Quiz Builder</h1>
        <p className="text-gray-600">
          Create customized AI-powered quizzes for your learning journey
        </p>
      </div>

      <div className="mb-6">
        <div className="mb-2 flex justify-between text-sm font-medium">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="overflow-hidden border-0 shadow-lg">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="border-b">
            <div className="container flex-1">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="basic"
                  className={cn(
                    'relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none',
                    activeTab === 'basic' && 'text-primary'
                  )}
                >
                  1. Basics
                </TabsTrigger>
                <TabsTrigger
                  value="advanced"
                  className={cn(
                    'relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none',
                    activeTab === 'advanced' && 'text-primary'
                  )}
                >
                  2. Advanced Options
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className={cn(
                    'relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none',
                    activeTab === 'preview' && 'text-primary'
                  )}
                >
                  3. Preview
                </TabsTrigger>
                <TabsTrigger
                  value="generate"
                  className={cn(
                    'relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none',
                    activeTab === 'generate' && 'text-primary'
                  )}
                >
                  4. Generate
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="basic" className="m-0 p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="course">
                    Course <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.course}
                    onValueChange={(value) =>
                      handleInputChange('course', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCourses.map((course) => (
                        <SelectItem key={course.value} value={course.value}>
                          {course.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Specific Topic (optional)</Label>
                  <Input
                    id="topic"
                    placeholder="E.g., 'SQL Joins' or 'Constitutional Law'"
                    value={formData.topic}
                    onChange={(e) => handleInputChange('topic', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberOfQuestions">
                    Number of Questions <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.numberOfQuestions}
                    onValueChange={(value) =>
                      handleInputChange('numberOfQuestions', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of questions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Questions</SelectItem>
                      <SelectItem value="10">10 Questions</SelectItem>
                      <SelectItem value="15">15 Questions</SelectItem>
                      <SelectItem value="20">20 Questions</SelectItem>
                      <SelectItem value="25">25 Questions</SelectItem>
                      <SelectItem value="30">30 Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">
                    Difficulty Level <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) =>
                      handleInputChange('difficulty', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="questionType">
                    Question Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.questionType}
                    onValueChange={(value) =>
                      handleInputChange('questionType', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcq">
                        Multiple Choice Questions
                      </SelectItem>
                      <SelectItem value="essay">
                        Essay/Short Answer Questions
                      </SelectItem>
                      <SelectItem value="both">Mixed (MCQ & Essay)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeLimit">
                    Time Limit (minutes) <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.timeLimit}
                    onValueChange={(value) =>
                      handleInputChange('timeLimit', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                      <SelectItem value="120">120 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="m-0 p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <Label>Quiz Features</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeExplanations"
                        checked={formData.includeExplanations}
                        onCheckedChange={(checked) =>
                          handleInputChange('includeExplanations', checked)
                        }
                      />
                      <label
                        htmlFor="includeExplanations"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Include Explanations for Answers
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeHints"
                        checked={formData.includeHints}
                        onCheckedChange={(checked) =>
                          handleInputChange('includeHints', checked)
                        }
                      />
                      <label
                        htmlFor="includeHints"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Include Hints (for difficult questions)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Select
                    value={formData.targetAudience}
                    onValueChange={(value) =>
                      handleInputChange('targetAudience', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select target audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="k12">K-12 Students</SelectItem>
                      <SelectItem value="highschool">
                        High School Students
                      </SelectItem>
                      <SelectItem value="college">College Students</SelectItem>
                      <SelectItem value="graduate">
                        Graduate Students
                      </SelectItem>
                      <SelectItem value="professional">
                        Professionals
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quizStyle">Quiz Style</Label>
                  <Select
                    value={formData.quizStyle}
                    onValueChange={(value) =>
                      handleInputChange('quizStyle', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select quiz style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">
                        Standard Academic
                      </SelectItem>
                      <SelectItem value="challenging">
                        Challenging (Critical Thinking)
                      </SelectItem>
                      <SelectItem value="conceptual">
                        Conceptual Understanding
                      </SelectItem>
                      <SelectItem value="application">
                        Applied Knowledge
                      </SelectItem>
                      <SelectItem value="certification">
                        Certification Prep
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1 space-y-2 md:col-span-2">
                  <Label htmlFor="customInstructions">
                    Custom Instructions (Optional)
                  </Label>
                  <Textarea
                    id="customInstructions"
                    placeholder="Add any specific instructions for the AI to consider when generating questions..."
                    className="min-h-[100px]"
                    value={formData.customInstructions}
                    onChange={(e) =>
                      handleInputChange('customInstructions', e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="m-0 p-6">
            <div className="space-y-6">
              {renderSettingsSummary()}

              <div className="space-y-4">
                <h3 className="font-medium">Sample Question Preview</h3>
                <p className="text-sm text-gray-600">
                  These are example questions based on your selected format.
                  Your generated quiz will contain unique questions tailored to
                  your specifications.
                </p>

                <div className="space-y-4">
                  {previewQuestions.map((question, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
                            {index + 1}
                          </span>
                          <span className="text-sm font-medium text-gray-500">
                            {question.type === 'mcq'
                              ? 'Multiple Choice'
                              : 'Essay Question'}
                          </span>
                        </div>
                      </div>

                      <p className="mb-4 font-medium">{question.question}</p>

                      {question.type === 'mcq' && (
                        <div className="space-y-2">
                          <RadioGroup defaultValue={question.options[0]}>
                            {question.options.map((option, i) => (
                              <div
                                key={i}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem
                                  value={option}
                                  id={`q${index}-o${i}`}
                                />
                                <label
                                  htmlFor={`q${index}-o${i}`}
                                  className="text-sm"
                                >
                                  {option}
                                </label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      )}

                      {question.type === 'essay' && (
                        <div className="rounded-lg border border-dashed border-gray-300 p-3">
                          <p className="text-sm text-gray-500">
                            [Text answer area will appear here]
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="generate" className="m-0 p-6">
            <div className="space-y-6">
              <div className="rounded-lg bg-blue-50 p-4 text-blue-700">
                <h3 className="mb-2 font-medium">
                  Ready to Generate Your Quiz
                </h3>
                <p className="text-sm">
                  Your AI-powered quiz will be created with{' '}
                  {formData.numberOfQuestions} {formData.difficulty}
                  questions about{' '}
                  {availableCourses.find((c) => c.value === formData.course)
                    ?.label || formData.course}
                  {formData.topic ? ` focusing on ${formData.topic}` : ''}.
                </p>
              </div>

              {renderSettingsSummary()}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="rounded-lg border bg-gray-50 p-4">
                  <h3 className="mb-2 font-medium">Important Notes</h3>
                  <ul className="ml-4 list-disc space-y-1 text-sm text-gray-600">
                    <li>
                      Quiz generation typically takes 15-30 seconds depending on
                      complexity
                    </li>
                    <li>
                      Once generated, you'll be automatically directed to take
                      the quiz
                    </li>
                    <li>Time will start automatically when the quiz begins</li>
                    <li>
                      Your quiz will not be saved permanently - bookmark the URL
                      if needed
                    </li>
                  </ul>
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="w-full max-w-md py-6 text-lg"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating Your Quiz...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate Quiz
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
        </Tabs>

        <CardFooter className="flex justify-between border-t bg-gray-50 px-6 py-4">
          <Button
            variant="outline"
            onClick={handlePrevTab}
            disabled={activeTab === 'basic'}
          >
            Back
          </Button>
          <Button
            onClick={handleNextTab}
            disabled={!isCurrentTabComplete() || activeTab === 'generate'}
          >
            Continue <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizMaker;
