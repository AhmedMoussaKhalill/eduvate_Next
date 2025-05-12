// Database schema definitions for the educational platform

export const COURSE_SCHEMA = {
  id: 'string', // unique identifier
  title: 'string',
  description: 'string',
  instructorId: 'string',
  createdAt: 'date',
  updatedAt: 'date',
  image: 'string?', // optional course image URL
  isPublished: 'boolean',
};

export const ENROLLMENT_SCHEMA = {
  id: 'string',
  userId: 'string',
  courseId: 'string',
  enrolledAt: 'date',
  role: 'string', // 'student' or 'instructor'
  progress: 'number', // progress percentage 0-100
};

export const LECTURE_SCHEMA = {
  id: 'string',
  title: 'string',
  courseId: 'string',
  content: 'string',
  videoUrl: 'string?', // optional video URL
  position: 'number', // ordering within course
  createdAt: 'date',
  updatedAt: 'date',
  isPublished: 'boolean',
};

export const QUIZ_SCHEMA = {
  id: 'string',
  title: 'string',
  courseId: 'string',
  position: 'number',
  duration: 'number', // in minutes
  instructions: 'string',
  createdAt: 'date',
  updatedAt: 'date',
  isPublished: 'boolean',
};

export const QUIZ_QUESTION_SCHEMA = {
  id: 'string',
  quizId: 'string',
  question: 'string',
  type: 'string', // 'multiple-choice', 'true-false', 'short-answer'
  options: 'array?', // for multiple choice questions
  correctAnswer: 'any', // could be index, boolean, or string based on type
  points: 'number',
  position: 'number',
};

export const QUIZ_ATTEMPT_SCHEMA = {
  id: 'string',
  quizId: 'string',
  userId: 'string',
  startedAt: 'date',
  submittedAt: 'date?',
  score: 'number?',
  answers: 'array', // array of answers
  status: 'string', // 'in-progress', 'completed', 'graded'
};

export const ASSIGNMENT_SCHEMA = {
  id: 'string',
  title: 'string',
  courseId: 'string',
  description: 'string',
  dueDate: 'date',
  pointsPossible: 'number',
  createdAt: 'date',
  updatedAt: 'date',
  isPublished: 'boolean',
};

export const SUBMISSION_SCHEMA = {
  id: 'string',
  assignmentId: 'string',
  userId: 'string',
  content: 'string',
  attachments: 'array?', // URLs to uploaded files
  submittedAt: 'date',
  grade: 'number?',
  feedback: 'string?',
  gradedAt: 'date?',
  status: 'string', // 'submitted', 'graded', 'late'
};
