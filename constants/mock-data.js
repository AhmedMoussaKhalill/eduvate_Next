// Mock data for development and testing

export const MOCK_COURSES = [
  {
    id: 'course-1',
    title: 'Introduction to Computer Science',
    description:
      'Fundamentals of computer science, including algorithms, data structures, and programming concepts.',
    instructorId: 'user-instructor-1',
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2023-09-10'),
    image: '/images/courses/cs-intro.jpg',
    isPublished: true,
  },
  {
    id: 'course-2',
    title: 'Advanced Mathematics',
    description:
      'Explore complex mathematical concepts including calculus, linear algebra, and statistics.',
    instructorId: 'user-instructor-2',
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2023-08-25'),
    image: '/images/courses/math-advanced.jpg',
    isPublished: true,
  },
  {
    id: 'course-3',
    title: 'Business Ethics',
    description:
      'Ethical considerations in modern business practices and corporate responsibility.',
    instructorId: 'user-instructor-1',
    createdAt: new Date('2023-07-10'),
    updatedAt: new Date('2023-07-20'),
    image: '/images/courses/business-ethics.jpg',
    isPublished: true,
  },
];

export const MOCK_LECTURES = [
  {
    id: 'lecture-1',
    title: 'Introduction to Algorithms',
    courseId: 'course-1',
    content:
      'This lecture covers the basics of algorithmic thinking and problem-solving approaches.',
    videoUrl: 'https://example.com/videos/algorithms-intro.mp4',
    position: 1,
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2023-09-01'),
    isPublished: true,
  },
  {
    id: 'lecture-2',
    title: 'Data Structures Overview',
    courseId: 'course-1',
    content:
      'Learn about fundamental data structures including arrays, linked lists, stacks, and queues.',
    videoUrl: 'https://example.com/videos/data-structures.mp4',
    position: 2,
    createdAt: new Date('2023-09-03'),
    updatedAt: new Date('2023-09-03'),
    isPublished: true,
  },
  {
    id: 'lecture-3',
    title: 'Differential Calculus',
    courseId: 'course-2',
    content:
      'Introduction to derivatives and their applications in solving real-world problems.',
    videoUrl: 'https://example.com/videos/calculus-intro.mp4',
    position: 1,
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2023-08-15'),
    isPublished: true,
  },
];

export const MOCK_QUIZZES = [
  {
    id: 'quiz-1',
    title: 'Algorithms Basics',
    courseId: 'course-1',
    position: 1,
    duration: 30, // 30 minutes
    instructions: 'Answer all questions. Each question is worth 10 points.',
    createdAt: new Date('2023-09-05'),
    updatedAt: new Date('2023-09-05'),
    isPublished: true,
  },
  {
    id: 'quiz-2',
    title: 'Data Structures Fundamentals',
    courseId: 'course-1',
    position: 2,
    duration: 45, // 45 minutes
    instructions: 'Answer all questions. Various point values per question.',
    createdAt: new Date('2023-09-08'),
    updatedAt: new Date('2023-09-08'),
    isPublished: true,
  },
];

export const MOCK_QUIZ_QUESTIONS = [
  {
    id: 'question-1',
    quizId: 'quiz-1',
    question: 'What is the time complexity of binary search?',
    type: 'multiple-choice',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
    correctAnswer: 2, // index of correct option (O(log n))
    points: 10,
    position: 1,
  },
  {
    id: 'question-2',
    quizId: 'quiz-1',
    question:
      'Bubble sort is an efficient sorting algorithm for large datasets.',
    type: 'true-false',
    correctAnswer: false,
    points: 10,
    position: 2,
  },
  {
    id: 'question-3',
    quizId: 'quiz-2',
    question:
      'What data structure operates on a First-In-First-Out (FIFO) principle?',
    type: 'multiple-choice',
    options: ['Stack', 'Queue', 'Binary Tree', 'Hash Table'],
    correctAnswer: 1, // index of correct option (Queue)
    points: 15,
    position: 1,
  },
];

export const MOCK_ASSIGNMENTS = [
  {
    id: 'assignment-1',
    title: 'Algorithm Analysis',
    courseId: 'course-1',
    description:
      'Analyze the time and space complexity of three given algorithms.',
    dueDate: new Date('2023-10-15'),
    pointsPossible: 100,
    createdAt: new Date('2023-09-15'),
    updatedAt: new Date('2023-09-15'),
    isPublished: true,
  },
  {
    id: 'assignment-2',
    title: 'Data Structure Implementation',
    courseId: 'course-1',
    description: 'Implement a linked list and demonstrate its operations.',
    dueDate: new Date('2023-11-01'),
    pointsPossible: 150,
    createdAt: new Date('2023-09-20'),
    updatedAt: new Date('2023-09-20'),
    isPublished: true,
  },
];

export const MOCK_ENROLLMENTS = [
  {
    id: 'enrollment-1',
    userId: 'user-student-1',
    courseId: 'course-1',
    enrolledAt: new Date('2023-09-05'),
    role: 'student',
    progress: 45, // 45% complete
  },
  {
    id: 'enrollment-2',
    userId: 'user-student-1',
    courseId: 'course-2',
    enrolledAt: new Date('2023-09-10'),
    role: 'student',
    progress: 20, // 20% complete
  },
  {
    id: 'enrollment-3',
    userId: 'user-instructor-1',
    courseId: 'course-1',
    enrolledAt: new Date('2023-08-15'),
    role: 'instructor',
    progress: 100, // instructors have full access
  },
];
