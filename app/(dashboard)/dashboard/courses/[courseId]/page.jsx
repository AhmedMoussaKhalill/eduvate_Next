'use client';
import React, { useState, useEffect, use } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ChevronLeft,
  Download,
  FileText,
  Video,
  FileQuestion,
  BarChart3,
  Play,
  BookOpen,
  FlaskRound,
  Filter,
  Search,
  ExternalLink,
  File,
  Presentation,
  X,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { Icons } from '@/components/icons';

// Add more realistic grades data with structured feedback
const addRealGradesAndRecordings = (coursesData) => {
  // Create a deep copy to avoid mutating the original
  const updatedCoursesData = JSON.parse(JSON.stringify(coursesData));

  // Law course grades and recordings
  if (updatedCoursesData.law101) {
    const course = updatedCoursesData.law101;
    // Add recordings with consistent watched status
    course.recordings = course.lectures.map((lecture) => ({
      id: lecture.id,
      title: lecture.title,
      duration: lecture.duration,
      date: lecture.date,
      videoUrl: lecture.fileUrl,
      thumbnail: lecture.thumbnail,
      watched: true, // All lectures watched
    }));

    // Add labs
    course.labs = [
      {
        id: 1,
        title: 'Legal Research Methods',
        description: 'Practice using legal databases and research techniques',
        deadline: '28 Aug 2022',
        duration: '2 hours',
        status: 'completed',
        resources: [
          {
            name: 'Lab Manual',
            url: '/labs/law/legal-research-manual.pdf',
          },
          {
            name: 'Research Database Access',
            url: 'https://legal-database.example.com',
          },
        ],
      },
      {
        id: 2,
        title: 'Case Brief Workshop',
        description:
          'Learn how to properly format and structure legal case briefs',
        deadline: '8 Sep 2022',
        duration: '1.5 hours',
        status: 'pending',
        resources: [
          {
            name: 'Case Brief Template',
            url: '/labs/law/case-brief-template.docx',
          },
          {
            name: 'Sample Cases',
            url: '/labs/law/sample-cases.pdf',
          },
        ],
      },
    ];

    // Add real grades data with detailed feedback
    course.gradeItems = [
      {
        id: 'a-1',
        title: 'Case Study Analysis',
        type: 'assignment',
        category: 'Assignments',
        weight: 15,
        maxScore: 100,
        score: 88,
        date: '30 Aug 2022',
        status: 'completed',
        feedback:
          'Excellent analysis of the case law. Your arguments were well-structured and showed deep understanding of legal principles. To improve: include more precedent cases and consider international law perspectives.',
      },
      {
        id: 'a-2',
        title: 'Legal Brief Writing',
        type: 'assignment',
        category: 'Assignments',
        weight: 15,
        maxScore: 100,
        score: null,
        date: '10 Sep 2022',
        status: 'pending',
        feedback: null,
      },
      {
        id: 'q-1',
        title: 'Legal Terminology Quiz',
        type: 'quiz',
        category: 'Quizzes',
        weight: 5,
        maxScore: 20,
        score: 17,
        date: '25 Aug 2022',
        status: 'completed',
        feedback:
          'Good command of legal terminology. Review the sections on contract law terms.',
      },
      {
        id: 'q-2',
        title: 'Constitutional Law Quiz',
        type: 'quiz',
        category: 'Quizzes',
        weight: 5,
        maxScore: 15,
        score: null,
        date: '5 Sep 2022',
        status: 'upcoming',
        feedback: null,
      },
      {
        id: 'm-1',
        title: 'Midterm Examination',
        type: 'exam',
        category: 'Midterm',
        weight: 25,
        maxScore: 100,
        score: null,
        date: '15 Sep 2022',
        status: 'upcoming',
        feedback: null,
      },
      {
        id: 'f-1',
        title: 'Final Examination',
        type: 'exam',
        category: 'Final',
        weight: 30,
        maxScore: 100,
        score: null,
        date: '10 Oct 2022',
        status: 'upcoming',
        feedback: null,
      },
      {
        id: 'att-1',
        title: 'Class Attendance',
        type: 'attendance',
        category: 'Attendance',
        weight: 5,
        maxScore: 100,
        score: 85,
        date: 'Ongoing',
        status: 'in-progress',
        feedback:
          'Good attendance record. Remember that participation is also evaluated.',
      },
      {
        id: 'p-1',
        title: 'Case Law Analysis Project',
        type: 'project',
        category: 'Project',
        weight: 20,
        maxScore: 100,
        score: null,
        date: '5 Oct 2022',
        status: 'not-started',
        feedback: null,
      },
    ];

    // Add grade categories for organized display
    course.gradeCategories = [
      { id: 'assignments', name: 'Assignments', weight: 30 },
      { id: 'quizzes', name: 'Quizzes', weight: 10 },
      { id: 'midterm', name: 'Midterm', weight: 25 },
      { id: 'final', name: 'Final', weight: 30 },
      { id: 'attendance', name: 'Attendance', weight: 5 },
      { id: 'project', name: 'Project', weight: 20 },
    ];

    // Calculate overall grade (only from completed items)
    const completedGrades = course.gradeItems.filter(
      (grade) => grade.score !== null
    );
    if (completedGrades.length > 0) {
      // Calculate weighted grade
      const totalWeight = completedGrades.reduce(
        (sum, grade) => sum + grade.weight,
        0
      );
      const weightedScore = completedGrades.reduce((sum, grade) => {
        return sum + (grade.score / grade.maxScore) * grade.weight;
      }, 0);

      // Normalize to percentage based on weights of completed items
      course.overallGrade = Math.round((weightedScore / totalWeight) * 100);

      // Calculate course completed percentage
      const totalCourseWeight = course.gradeCategories.reduce(
        (sum, cat) => sum + cat.weight,
        0
      );
      course.gradeCompletion = Math.round(
        (totalWeight / totalCourseWeight) * 100
      );
    } else {
      course.overallGrade = null;
      course.gradeCompletion = 0;
    }
  }

  // Politics course grades and recordings
  if (updatedCoursesData.politics101) {
    const course = updatedCoursesData.politics101;
    // Add recordings with consistent watched status
    course.recordings = course.lectures.map((lecture) => ({
      id: lecture.id,
      title: lecture.title,
      duration: lecture.duration,
      date: lecture.date,
      videoUrl: lecture.fileUrl,
      thumbnail: lecture.thumbnail,
      watched: true, // All lectures watched
    }));

    // Add labs
    course.labs = [
      {
        id: 1,
        title: 'Electoral Systems Simulation',
        description: 'Interactive simulation of different electoral systems',
        deadline: '2 Sep 2022',
        duration: '1.5 hours',
        status: 'pending',
        resources: [
          {
            name: 'Simulation Guide',
            url: '/labs/politics/electoral-systems-guide.pdf',
          },
        ],
      },
    ];

    // Add real grades data with detailed feedback
    course.grades = [
      {
        id: 'a-1',
        title: 'Political System Analysis',
        type: 'assignment',
        maxScore: 100,
        score: 75,
        date: '1 Sep 2022',
        status: 'completed',
        feedback:
          'Good analysis of democratic systems. Your comparison between parliamentary and presidential systems shows understanding of core concepts. Areas for improvement: deeper analysis of how these systems function in developing nations, more current examples.',
      },
      {
        id: 'q-1',
        title: 'Political Theories Quiz',
        type: 'quiz',
        maxScore: 25,
        score: 21,
        date: '28 Aug 2022',
        status: 'completed',
        feedback:
          'Strong understanding of major political theories. Review the sections on social contract theory.',
      },
    ];

    // Calculate overall grade
    const completedGrades = course.grades.filter(
      (grade) => grade.score !== null
    );
    const totalScore = completedGrades.reduce(
      (sum, grade) => sum + (grade.score / grade.maxScore) * 100,
      0
    );
    course.overallGrade = Math.round(totalScore / completedGrades.length);
  }

  // English course grades and recordings
  if (updatedCoursesData.english101) {
    const course = updatedCoursesData.english101;
    // Add recordings with consistent watched status
    course.recordings = course.lectures.map((lecture) => ({
      id: lecture.id,
      title: lecture.title,
      duration: lecture.duration,
      date: lecture.date,
      videoUrl: lecture.fileUrl,
      thumbnail: lecture.thumbnail,
      watched: true, // All lectures watched
    }));

    // Add real grades data with detailed feedback
    course.grades = [
      {
        id: 'a-1',
        title: 'Essay Writing',
        type: 'assignment',
        maxScore: 100,
        score: 95,
        date: '29 Aug 2022',
        status: 'completed',
        feedback:
          'Exceptional essay with clear thesis, strong supporting arguments, and elegant language. Your analysis of the literary work shows deep insight and critical thinking. For future essays, consider incorporating more diverse critical perspectives.',
      },
      {
        id: 'a-2',
        title: 'Book Review',
        type: 'assignment',
        maxScore: 100,
        score: 92,
        date: '15 Sep 2022',
        status: 'completed',
        feedback:
          'Excellent review that captures both the content and significance of the book. Your critical analysis shows maturity and understanding of literary contexts. Minor improvements needed in citation format.',
      },
      {
        id: 'q-1',
        title: 'Grammar and Punctuation Quiz',
        type: 'quiz',
        maxScore: 30,
        score: 28,
        date: '24 Aug 2022',
        status: 'completed',
        feedback:
          'Near perfect score! Excellent command of grammar and punctuation rules.',
      },
      {
        id: 'q-2',
        title: 'Literary Devices Quiz',
        type: 'quiz',
        maxScore: 20,
        score: 19,
        date: '7 Sep 2022',
        status: 'completed',
        feedback:
          'Outstanding knowledge of literary devices and their applications.',
      },
    ];

    // Calculate overall grade
    const completedGrades = course.grades.filter(
      (grade) => grade.score !== null
    );
    const totalScore = completedGrades.reduce(
      (sum, grade) => sum + (grade.score / grade.maxScore) * 100,
      0
    );
    course.overallGrade = Math.round(totalScore / completedGrades.length);
  }

  // Economics course grades and recordings
  if (updatedCoursesData.economics101) {
    const course = updatedCoursesData.economics101;
    // Add recordings with consistent watched status
    course.recordings = course.lectures.map((lecture) => ({
      id: lecture.id,
      title: lecture.title,
      duration: lecture.duration,
      date: lecture.date,
      videoUrl: lecture.fileUrl,
      thumbnail: lecture.thumbnail,
      watched: true, // All lectures watched (course is completed)
    }));

    // Add real grades data with detailed feedback
    course.grades = [
      {
        id: 'a-1',
        title: 'Economic Models Analysis',
        type: 'assignment',
        maxScore: 100,
        score: 98,
        date: '22 Aug 2022',
        status: 'completed',
        feedback:
          'Exceptional analysis of economic models. Your application of theoretical models to real-world scenarios demonstrates excellent understanding of economic principles. Your discussion of market failures was particularly insightful.',
      },
      {
        id: 'a-2',
        title: 'Market Research Project',
        type: 'assignment',
        maxScore: 100,
        score: 97,
        date: '28 Aug 2022',
        status: 'completed',
        feedback:
          'Outstanding market research project with thorough data collection and analysis. Your conclusions are well-supported and demonstrate critical thinking in economic contexts.',
      },
      {
        id: 'q-1',
        title: 'Economics Terminology Quiz',
        type: 'quiz',
        maxScore: 25,
        score: 25,
        date: '18 Aug 2022',
        status: 'completed',
        feedback: 'Perfect score! Excellent command of economic terminology.',
      },
      {
        id: 'q-2',
        title: 'Financial Markets Quiz',
        type: 'quiz',
        maxScore: 20,
        score: 19,
        date: '25 Aug 2022',
        status: 'completed',
        feedback:
          'Near-perfect understanding of financial markets and their mechanisms.',
      },
    ];

    // Calculate overall grade
    const completedGrades = course.grades.filter(
      (grade) => grade.score !== null
    );
    const totalScore = completedGrades.reduce(
      (sum, grade) => sum + (grade.score / grade.maxScore) * 100,
      0
    );
    course.overallGrade = Math.round(totalScore / completedGrades.length);
  }

  // Mathematics course grades and recordings
  if (updatedCoursesData.mathematics101) {
    const course = updatedCoursesData.mathematics101;
    // Add recordings with consistent watched status
    course.recordings = course.lectures.map((lecture) => ({
      id: lecture.id,
      title: lecture.title,
      duration: lecture.duration,
      date: lecture.date,
      videoUrl: lecture.fileUrl,
      thumbnail: lecture.thumbnail,
      watched: true, // Only first lecture watched
    }));

    // Add real grades data with detailed feedback
    course.grades = [
      {
        id: 'a-1',
        title: 'Calculus Problem Set',
        type: 'assignment',
        maxScore: 100,
        score: 72,
        date: '30 Aug 2022',
        status: 'completed',
        feedback:
          'Good work on the calculus problems. You demonstrated understanding of basic principles but had some difficulty with integration techniques. Review sections 3.4 and 3.6 in the textbook and practice more complex integration problems.',
      },
      {
        id: 'a-2',
        title: 'Linear Algebra Exercise',
        type: 'assignment',
        maxScore: 100,
        score: null,
        date: '5 Sep 2022',
        status: 'not-started',
        feedback: null,
      },
      {
        id: 'q-1',
        title: 'Calculus Concepts Quiz',
        type: 'quiz',
        maxScore: 15,
        score: 10,
        date: '26 Aug 2022',
        status: 'completed',
        feedback:
          'Satisfactory understanding of basic calculus concepts. Review the sections on limits and derivatives of complex functions.',
      },
    ];

    // Calculate overall grade
    const completedGrades = course.grades.filter(
      (grade) => grade.score !== null
    );
    const totalScore = completedGrades.reduce(
      (sum, grade) => sum + (grade.score / grade.maxScore) * 100,
      0
    );
    course.overallGrade = Math.round(totalScore / completedGrades.length);
  }

  // Psychology course grades and recordings
  if (updatedCoursesData.psychology101) {
    const course = updatedCoursesData.psychology101;
    // Add empty recordings since course hasn't started
    course.recordings = course.lectures.map((lecture) => ({
      id: lecture.id,
      title: lecture.title,
      duration: lecture.duration,
      date: lecture.date,
      videoUrl: lecture.fileUrl,
      thumbnail: lecture.thumbnail,
      watched: false, // No lectures watched (course not started)
    }));

    // Add empty grades since course hasn't started
    course.grades = [
      {
        id: 'a-1',
        title: 'Psychological Case Analysis',
        type: 'assignment',
        maxScore: 100,
        score: null,
        date: '6 Sep 2022',
        status: 'not-started',
        feedback: null,
      },
      {
        id: 'q-1',
        title: 'Psychology Fundamentals Quiz',
        type: 'quiz',
        maxScore: 30,
        score: null,
        date: '3 Sep 2022',
        status: 'upcoming',
        feedback: null,
      },
    ];

    // No overall grade for this course
    course.overallGrade = null;
  }

  return updatedCoursesData;
};

// Mock data for lectures, assignments, and quizzes
const coursesData = {
  law101: {
    name: 'Law Class',
    lecturer: 'Gut Alexen',
    lecturerImage: '/placeholder.svg?height=40&width=40',
    progress: 82,
    category: 'Law',
    lectures: [
      {
        id: 1,
        title: 'Introduction to Law',
        duration: '45 pages',
        date: '15 Aug 2022',
        fileUrl: '/lectures/law-intro.pdf',
        fileType: 'pdf',
        thumbnail: '/images/law-thumbnail-1.jpg',
      },
      {
        id: 2,
        title: 'Legal Systems',
        duration: '32 slides',
        date: '17 Aug 2022',
        fileUrl: '/lectures/law-systems.ppt',
        fileType: 'ppt',
        thumbnail: '/images/law-thumbnail-2.jpg',
      },
      {
        id: 3,
        title: 'Constitutional Law',
        duration: '60 pages',
        date: '22 Aug 2022',
        fileUrl: '/lectures/constitutional-law.pdf',
        fileType: 'pdf',
        thumbnail: '/images/law-thumbnail-3.jpg',
      },
      {
        id: 4,
        title: 'Criminal Law Fundamentals',
        duration: '38 pages',
        date: '25 Aug 2022',
        fileUrl: '/lectures/criminal-law.pdf',
        fileType: 'pdf',
        thumbnail: '/images/law-thumbnail-4.jpg',
      },
      {
        id: 5,
        title: 'Contract Law Principles',
        duration: '42 slides',
        date: '28 Aug 2022',
        fileUrl: '/lectures/contract-law.ppt',
        fileType: 'ppt',
        thumbnail: '/images/law-thumbnail-5.jpg',
      },
      {
        id: 6,
        title: 'Legal Research Methods',
        duration: '28 pages',
        date: '1 Sep 2022',
        fileUrl: '/lectures/legal-research.pdf',
        fileType: 'pdf',
        thumbnail: '/images/law-thumbnail-6.jpg',
      },
      {
        id: 7,
        title: 'Case Law Analysis',
        duration: '36 slides',
        date: '5 Sep 2022',
        fileUrl: '/lectures/case-law-analysis.ppt',
        fileType: 'ppt',
        thumbnail: '/images/law-thumbnail-7.jpg',
      },
    ],
    assignments: [
      {
        id: 1,
        title: 'Case Study Analysis',
        deadline: '30 Aug 2022',
        pdfUrl: '/assignments/law-case-study.pdf',
        status: 'pending',
      },
      {
        id: 2,
        title: 'Legal Brief Writing',
        deadline: '10 Sep 2022',
        pdfUrl: '/assignments/legal-brief.pdf',
        status: 'pending',
      },
    ],
    quizzes: [
      {
        id: 1,
        title: 'Legal Terminology Quiz',
        questions: 20,
        time: '30 minutes',
        date: '25 Aug 2022',
        status: 'upcoming',
      },
      {
        id: 2,
        title: 'Constitutional Law Quiz',
        questions: 15,
        time: '25 minutes',
        date: '5 Sep 2022',
        status: 'upcoming',
      },
    ],
  },
  politics101: {
    name: 'Politics Class',
    lecturer: 'Ramirez Huts',
    lecturerImage: '/placeholder.svg?height=40&width=40',
    progress: 70,
    category: 'Politics',
    lectures: [
      {
        id: 1,
        title: 'Introduction to Political Science',
        duration: '28 slides',
        date: '16 Aug 2022',
        fileUrl: '/lectures/politics-intro.ppt',
        fileType: 'ppt',
        thumbnail: '/images/politics-thumbnail-1.jpg',
      },
      {
        id: 2,
        title: 'Political Ideologies',
        duration: '52 pages',
        date: '18 Aug 2022',
        fileUrl: '/lectures/political-ideologies.pdf',
        fileType: 'pdf',
        thumbnail: '/images/politics-thumbnail-2.jpg',
      },
      {
        id: 3,
        title: 'Democratic Systems',
        duration: '36 slides',
        date: '23 Aug 2022',
        fileUrl: '/lectures/democratic-systems.ppt',
        fileType: 'ppt',
        thumbnail: '/images/politics-thumbnail-3.jpg',
      },
      {
        id: 4,
        title: 'International Relations',
        duration: '45 pages',
        date: '26 Aug 2022',
        fileUrl: '/lectures/international-relations.pdf',
        fileType: 'pdf',
        thumbnail: '/images/politics-thumbnail-4.jpg',
      },
      {
        id: 5,
        title: 'Political Economy',
        duration: '30 slides',
        date: '30 Aug 2022',
        fileUrl: '/lectures/political-economy.ppt',
        fileType: 'ppt',
        thumbnail: '/images/politics-thumbnail-5.jpg',
      },
    ],
    assignments: [
      {
        id: 1,
        title: 'Political System Analysis',
        deadline: '1 Sep 2022',
        pdfUrl: '/assignments/political-analysis.pdf',
        status: 'pending',
      },
    ],
    quizzes: [
      {
        id: 1,
        title: 'Political Theories Quiz',
        questions: 25,
        time: '40 minutes',
        date: '28 Aug 2022',
        status: 'upcoming',
      },
    ],
  },
  english101: {
    name: 'English Class',
    lecturer: 'Emma Larson',
    lecturerImage: '/placeholder.svg?height=40&width=40',
    progress: 94,
    category: 'English',
    lectures: [
      {
        id: 1,
        title: 'Advanced Grammar',
        duration: '36 pages',
        date: '14 Aug 2022',
        fileUrl: '/lectures/english-grammar.pdf',
        fileType: 'pdf',
        thumbnail: '/images/english-thumbnail-1.jpg',
      },
      {
        id: 2,
        title: 'Academic Writing',
        duration: '24 slides',
        date: '19 Aug 2022',
        fileUrl: '/lectures/academic-writing.ppt',
        fileType: 'ppt',
        thumbnail: '/images/english-thumbnail-2.jpg',
      },
      {
        id: 3,
        title: 'Literature Analysis',
        duration: '48 pages',
        date: '21 Aug 2022',
        fileUrl: '/lectures/literature-analysis.pdf',
        fileType: 'pdf',
        thumbnail: '/images/english-thumbnail-3.jpg',
      },
      {
        id: 4,
        title: 'Critical Reading Techniques',
        duration: '32 pages',
        date: '24 Aug 2022',
        fileUrl: '/lectures/critical-reading.pdf',
        fileType: 'pdf',
        thumbnail: '/images/english-thumbnail-4.jpg',
      },
      {
        id: 5,
        title: 'Rhetorical Devices',
        duration: '30 slides',
        date: '27 Aug 2022',
        fileUrl: '/lectures/rhetorical-devices.ppt',
        fileType: 'ppt',
        thumbnail: '/images/english-thumbnail-5.jpg',
      },
      {
        id: 6,
        title: 'Research Paper Writing',
        duration: '28 slides',
        date: '31 Aug 2022',
        fileUrl: '/lectures/research-paper.ppt',
        fileType: 'ppt',
        thumbnail: '/images/english-thumbnail-6.jpg',
      },
    ],
    assignments: [
      {
        id: 1,
        title: 'Essay Writing',
        deadline: '29 Aug 2022',
        pdfUrl: '/assignments/essay-writing.pdf',
        status: 'pending',
      },
      {
        id: 2,
        title: 'Book Review',
        deadline: '15 Sep 2022',
        pdfUrl: '/assignments/book-review.pdf',
        status: 'pending',
      },
    ],
    quizzes: [
      {
        id: 1,
        title: 'Grammar and Punctuation Quiz',
        questions: 30,
        time: '45 minutes',
        date: '24 Aug 2022',
        status: 'upcoming',
      },
      {
        id: 2,
        title: 'Literary Devices Quiz',
        questions: 20,
        time: '30 minutes',
        date: '7 Sep 2022',
        status: 'upcoming',
      },
    ],
  },
};

// Enhance course data with REAL grades and recordings instead of random data
const enhancedCoursesData = addRealGradesAndRecordings(coursesData);

// Course gradient colors
const getCourseGradient = (category) => {
  switch (category) {
    case 'Law':
      return 'from-blue-500 to-indigo-700';
    case 'Politics':
      return 'from-purple-500 to-pink-600';
    case 'English':
      return 'from-green-500 to-emerald-700';
    case 'Economics':
      return 'from-amber-400 to-orange-600';
    case 'Mathematics':
      return 'from-red-500 to-rose-700';
    case 'Psychology':
      return 'from-teal-400 to-cyan-600';
    default:
      return 'from-gray-500 to-slate-700';
  }
};

const CoursePage = ({ params }) => {
  const unwrappedParams = use(params);
  const { courseId } = unwrappedParams;
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('lectures');
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedRecording, setSelectedRecording] = useState(null);
  const [selectedLab, setSelectedLab] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add these new states for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'pdf', 'ppt'
  const [filteredLectures, setFilteredLectures] = useState([]);

  // Get course data
  const courseData = enhancedCoursesData[courseId] || {
    name: searchParams.get('name') || 'Course',
    lecturer: 'Not Available',
    lecturerImage: '/placeholder.svg?height=40&width=40',
    progress: 0,
    category: 'default',
    lectures: [],
    assignments: [],
    quizzes: [],
    recordings: [],
    grades: [],
    labs: [],
  };

  // Add this useEffect to filter lectures based on search query and active filter
  useEffect(() => {
    if (!courseData.lectures) {
      setFilteredLectures([]);
      return;
    }

    let results = [...courseData.lectures];

    // Apply file type filter if not "all"
    if (activeFilter !== 'all') {
      results = results.filter((lecture) => lecture.fileType === activeFilter);
    }

    // Apply search query if it exists
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (lecture) =>
          lecture.title.toLowerCase().includes(query) ||
          lecture.date.toLowerCase().includes(query) ||
          lecture.fileType.toLowerCase().includes(query)
      );
    }

    setFilteredLectures(results);
  }, [courseData.lectures, searchQuery, activeFilter]);

  const handleDownload = (url, fileName) => {
    try {
      // In a real application, this would trigger a file download
      console.log(`Downloading ${fileName} from ${url}`);
      alert(`Downloading ${fileName}...`);

      // This is a mock implementation. In a real app, you'd use:
      // const link = document.createElement('a');
      // link.href = url;
      // link.download = fileName;
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download file. Please try again.');
    }
  };

  const handlePlayVideo = (lecture) => {
    setSelectedLecture(lecture);
    setSelectedRecording(null);
  };

  const handlePlayRecording = (recording) => {
    setSelectedRecording(recording);
    setSelectedLecture(null);
  };

  const handleLabDetails = (lab) => {
    setSelectedLab(lab);
  };

  // Calculate letter grade
  const getLetterGrade = (percentage) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  // Add this handler for search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Add this handler for filter button clicks
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-4 p-5">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">
            Error Loading Course
          </h2>
          <p className="mt-2 text-gray-600">{error}</p>
        </div>
        <Link
          href="/dashboard"
          className="flex items-center space-x-2 rounded-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-5">
      {/* Header with back button */}
      <div className="flex items-center space-x-4">
        <Link
          href="/dashboard/my-courses"
          className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-semibold">{courseData.name}</h1>
        {courseData.progress === 100 && (
          <span className="flex items-center space-x-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            <Icons.check className="h-4 w-4" />
            <span>Completed</span>
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-700 border-t-transparent"></div>
            <p>Loading course content...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Course header info */}
          <div className="rounded-lg bg-white p-6 shadow-custom">
            <div className="flex items-center space-x-6">
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${getCourseGradient(courseData.category)}`}
              >
                <span className="text-2xl font-bold text-white">
                  {courseData.name?.charAt(0) || 'C'}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="mb-1 text-xl font-semibold">
                  {courseData.name}
                </h2>
                <div className="mb-3 flex items-center space-x-2">
                  <span className="text-gray-600">Lecturer:</span>
                  <div className="flex items-center">
                    <Avatar className="mr-2 h-6 w-6">
                      <AvatarImage
                        src={courseData.lecturerImage}
                        alt={courseData.lecturer}
                      />
                      <AvatarFallback>
                        {courseData.lecturer
                          ?.split(' ')
                          .map((n) => n[0])
                          .join('') || 'LN'}
                      </AvatarFallback>
                    </Avatar>
                    <span>{courseData.lecturer}</span>
                  </div>
                </div>
                <div className="w-full">
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-gray-600">Course progress</span>
                    <span>{courseData.progress}%</span>
                  </div>
                  <Progress
                    value={courseData.progress}
                    className={`h-2 ${courseData.progress === 100 ? 'bg-green-200' : ''}`}
                  />
                </div>
                {courseData.overallGrade !== null && (
                  <div className="mt-3 flex items-center">
                    <span className="text-sm text-gray-600">
                      Overall Grade:
                    </span>
                    <span className="ml-2 rounded-md bg-blue-100 px-2 py-0.5 text-sm font-medium text-blue-800">
                      {courseData.overallGrade}% (
                      {getLetterGrade(courseData.overallGrade)})
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {courseData.progress === 100 && (
            <div className="rounded-lg bg-green-50 p-4 shadow-sm">
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <Icons.award className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">
                    Course Completed!
                  </h3>
                  <p className="text-sm text-green-600">
                    Congratulations! You've completed this course. A certificate
                    is available for download.
                  </p>
                </div>
                <Button className="ml-auto bg-green-600 hover:bg-green-700">
                  Download Certificate
                </Button>
              </div>
            </div>
          )}

          {/* Tabs for Lectures, Assignments, Quizzes, Labs, Recordings, and Grades */}
          <Tabs
            defaultValue="lectures"
            value={activeTab}
            onValueChange={setActiveTab}
            className="rounded-lg bg-white p-6 shadow-custom"
          >
            <TabsList className="mb-6 grid w-full grid-cols-6">
              <TabsTrigger value="lectures">Lectures</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
              <TabsTrigger value="labs">Labs</TabsTrigger>
              <TabsTrigger value="recordings">Recordings</TabsTrigger>
              <TabsTrigger value="grades">Grades</TabsTrigger>
            </TabsList>

            {/* Lectures Tab with Category Grouping and Search/Filter */}
            <TabsContent value="lectures" className="space-y-6">
              {selectedLecture ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                      {selectedLecture.title}
                    </h3>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedLecture(null)}
                    >
                      Back to all lectures
                    </Button>
                  </div>

                  {/* Video player (mock) */}
                  <div className="relative flex aspect-video flex-col items-center justify-center rounded-lg bg-gray-800">
                    <img
                      src={
                        selectedLecture.thumbnail ||
                        '/placeholder.svg?height=400&width=600'
                      }
                      alt={selectedLecture.title}
                      className="h-full w-full rounded-lg object-cover opacity-50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Video className="mx-auto mb-4 h-16 w-16" />
                        <p className="text-lg">
                          Video Player Would Appear Here
                        </p>
                        <p className="mt-2 text-sm text-gray-300">
                          Duration: {selectedLecture.duration}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">
                        Date: {selectedLecture.date}
                      </p>
                      <p className="text-gray-600">
                        Duration: {selectedLecture.duration}
                      </p>
                    </div>
                    <Button
                      onClick={() =>
                        handleDownload(
                          selectedLecture.fileUrl,
                          `${selectedLecture.title}.${selectedLecture.fileType}`
                        )
                      }
                      className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800"
                    >
                      <Download className="h-4 w-4" />
                      Download Lecture
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Course Materials</h3>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Icons.search className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            placeholder="Search materials..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-64 rounded-md border py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {searchQuery && (
                            <button
                              onClick={() => setSearchQuery('')}
                              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleFilterChange('all')}
                        className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                          activeFilter === 'all'
                            ? 'bg-blue-100 font-medium text-blue-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        All Materials
                      </button>
                      <button
                        onClick={() => handleFilterChange('pdf')}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ${
                          activeFilter === 'pdf'
                            ? 'bg-red-100 font-medium text-red-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Icons.pdf className="h-3.5 w-3.5" />
                        PDF Documents
                      </button>
                      <button
                        onClick={() => handleFilterChange('ppt')}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ${
                          activeFilter === 'ppt'
                            ? 'bg-orange-100 font-medium text-orange-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Icons.ppt className="h-3.5 w-3.5" />
                        Presentations
                      </button>
                    </div>
                  </div>

                  {filteredLectures.length > 0 ? (
                    <div className="space-y-8">
                      {/* Only show PDF section if we have PDFs or if filter is "all" */}
                      {(activeFilter === 'all' || activeFilter === 'pdf') &&
                        filteredLectures.some(
                          (lecture) => lecture.fileType === 'pdf'
                        ) && (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-red-100 p-1.5">
                                <Icons.pdf className="h-4 w-4 text-red-600" />
                              </div>
                              <h4 className="font-medium text-gray-800">
                                PDF Documents
                              </h4>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                              {filteredLectures
                                .filter((lecture) => lecture.fileType === 'pdf')
                                .map((lecture) => (
                                  <div
                                    key={lecture.id}
                                    className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-custom transition-all hover:shadow-md"
                                    onClick={() => handlePlayVideo(lecture)}
                                  >
                                    <div className="relative h-36 bg-gray-100">
                                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
                                        <Icons.pdf className="h-16 w-16 text-red-400" />
                                        <div className="absolute right-3 top-3 rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-600">
                                          PDF
                                        </div>
                                      </div>
                                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>

                                    <div className="p-4">
                                      <h4 className="font-medium group-hover:text-blue-600">
                                        {lecture.title}
                                      </h4>
                                      <div className="mt-2 flex items-center justify-between">
                                        <p className="text-xs text-gray-500">
                                          {lecture.date}
                                        </p>
                                        <p className="text-xs font-medium">
                                          {lecture.duration}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t bg-gray-50 px-4 py-2">
                                      <span className="text-xs text-gray-500">
                                        Document
                                      </span>
                                      <div className="flex gap-2">
                                        <button
                                          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(
                                              lecture.fileUrl,
                                              '_blank'
                                            );
                                          }}
                                        >
                                          <ExternalLink className="h-3.5 w-3.5" />
                                        </button>
                                        <button
                                          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleDownload(
                                              lecture.fileUrl,
                                              `${lecture.title}.${lecture.fileType}`
                                            );
                                          }}
                                        >
                                          <Download className="h-3.5 w-3.5" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                      {/* Only show PPT section if we have PPTs or if filter is "all" */}
                      {(activeFilter === 'all' || activeFilter === 'ppt') &&
                        filteredLectures.some(
                          (lecture) => lecture.fileType === 'ppt'
                        ) && (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-orange-100 p-1.5">
                                <Icons.ppt className="h-4 w-4 text-orange-600" />
                              </div>
                              <h4 className="font-medium text-gray-800">
                                PowerPoint Presentations
                              </h4>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                              {filteredLectures
                                .filter((lecture) => lecture.fileType === 'ppt')
                                .map((lecture) => (
                                  <div
                                    key={lecture.id}
                                    className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-custom transition-all hover:shadow-md"
                                    onClick={() => handlePlayVideo(lecture)}
                                  >
                                    <div className="relative h-36 bg-gray-100">
                                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
                                        <Icons.ppt className="h-16 w-16 text-orange-400" />
                                        <div className="absolute right-3 top-3 rounded bg-orange-100 px-1.5 py-0.5 text-xs font-medium text-orange-600">
                                          PPT
                                        </div>
                                      </div>
                                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>

                                    <div className="p-4">
                                      <h4 className="font-medium group-hover:text-blue-600">
                                        {lecture.title}
                                      </h4>
                                      <div className="mt-2 flex items-center justify-between">
                                        <p className="text-xs text-gray-500">
                                          {lecture.date}
                                        </p>
                                        <p className="text-xs font-medium">
                                          {lecture.duration}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t bg-gray-50 px-4 py-2">
                                      <span className="text-xs text-gray-500">
                                        Presentation
                                      </span>
                                      <div className="flex gap-2">
                                        <button
                                          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(
                                              lecture.fileUrl,
                                              '_blank'
                                            );
                                          }}
                                        >
                                          <ExternalLink className="h-3.5 w-3.5" />
                                        </button>
                                        <button
                                          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleDownload(
                                              lecture.fileUrl,
                                              `${lecture.title}.${lecture.fileType}`
                                            );
                                          }}
                                        >
                                          <Download className="h-3.5 w-3.5" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
                      <div className="mb-3 rounded-full bg-gray-100 p-3">
                        <File className="h-6 w-6 text-gray-400" />
                      </div>
                      <h4 className="font-medium text-gray-700">
                        No matching materials found
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        {searchQuery
                          ? `No results for "${searchQuery}"`
                          : 'No lecture materials have been uploaded for this course yet.'}
                      </p>
                      {(searchQuery || activeFilter !== 'all') && (
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setActiveFilter('all');
                          }}
                          className="mt-4 text-sm text-blue-600 hover:text-blue-800"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* Existing Assignments Tab */}
            <TabsContent value="assignments" className="space-y-4">
              {courseData.assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="rounded-lg bg-orange-100 p-2">
                      <Icons.assignments className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{assignment.title}</h3>
                      <p className="text-sm text-gray-500">
                        Deadline: {assignment.deadline}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-blue-50"
                      onClick={() =>
                        handleDownload(
                          assignment.pdfUrl,
                          `${assignment.title}.pdf`
                        )
                      }
                    >
                      <Download className="mr-1 h-4 w-4" />
                      Download
                    </Button>
                    <Button size="sm" className="bg-blue-700 hover:bg-blue-800">
                      Submit
                    </Button>
                  </div>
                </div>
              ))}
              {courseData.assignments.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  No assignments available for this course yet.
                </div>
              )}
            </TabsContent>

            {/* Existing Quizzes Tab */}
            <TabsContent value="quizzes" className="space-y-4">
              {courseData.quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="rounded-lg bg-purple-100 p-2">
                      <FileQuestion className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{quiz.title}</h3>
                      <p className="text-sm text-gray-500">
                        {quiz.date} • {quiz.questions} questions • {quiz.time}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Button
                      variant={
                        quiz.status === 'upcoming' ? 'outline' : 'default'
                      }
                      size="sm"
                      className={
                        quiz.status === 'upcoming'
                          ? 'hover:bg-blue-50'
                          : 'bg-blue-700 hover:bg-blue-800'
                      }
                    >
                      {quiz.status === 'upcoming'
                        ? 'Not Available Yet'
                        : 'Start Quiz'}
                    </Button>
                  </div>
                </div>
              ))}
              {courseData.quizzes.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  No quizzes available for this course yet.
                </div>
              )}
            </TabsContent>

            {/* Labs Tab (New) */}
            <TabsContent value="labs" className="space-y-6">
              {selectedLab ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">{selectedLab.title}</h3>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedLab(null)}
                    >
                      Back to all labs
                    </Button>
                  </div>

                  <div className="rounded-lg border bg-white p-6">
                    <div className="mb-4 space-y-2">
                      <p className="text-gray-700">{selectedLab.description}</p>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center">
                          <span className="mr-2 text-sm font-medium text-gray-500">
                            Deadline:
                          </span>
                          <span>{selectedLab.deadline}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2 text-sm font-medium text-gray-500">
                            Duration:
                          </span>
                          <span>{selectedLab.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2 text-sm font-medium text-gray-500">
                            Status:
                          </span>
                          <span
                            className={`rounded-full px-2 py-1 text-xs ${
                              selectedLab.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : selectedLab.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {selectedLab.status === 'completed'
                              ? 'Completed'
                              : selectedLab.status === 'pending'
                                ? 'Pending'
                                : 'Not Started'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Resources</h4>
                      <div className="space-y-2">
                        {selectedLab.resources?.map((resource, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border bg-gray-50 p-3"
                          >
                            <div className="flex items-center">
                              <div className="mr-3 rounded-full bg-blue-100 p-1.5">
                                <Icons.file className="h-4 w-4 text-blue-600" />
                              </div>
                              <span>{resource.name}</span>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleDownload(resource.url, resource.name)
                              }
                              className="flex items-center gap-1"
                            >
                              <Download className="h-3.5 w-3.5" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        size="lg"
                        className="bg-blue-700 hover:bg-blue-800"
                      >
                        {selectedLab.status === 'completed'
                          ? 'View Submission'
                          : 'Submit Lab'}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4">
                  {courseData.labs?.map((lab) => (
                    <div
                      key={lab.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="rounded-lg bg-cyan-100 p-2">
                          <Icons.labs className="h-6 w-6 text-cyan-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{lab.title}</h3>
                          <p className="text-sm text-gray-500">
                            Deadline: {lab.deadline} • {lab.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            lab.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : lab.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {lab.status === 'completed'
                            ? 'Completed'
                            : lab.status === 'pending'
                              ? 'Pending'
                              : 'Not Started'}
                        </span>
                        <Button size="sm" onClick={() => handleLabDetails(lab)}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                  {!courseData.labs?.length && (
                    <div className="py-8 text-center text-gray-500">
                      No labs available for this course yet.
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* Recordings Tab */}
            <TabsContent value="recordings" className="space-y-6">
              {selectedRecording ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                      {selectedRecording.title} Recording
                    </h3>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedRecording(null)}
                    >
                      Back to all recordings
                    </Button>
                  </div>

                  {/* Video player (mock) */}
                  <div className="relative flex aspect-video flex-col items-center justify-center rounded-lg bg-gray-800">
                    <img
                      src={
                        selectedRecording.thumbnail ||
                        '/placeholder.svg?height=400&width=600'
                      }
                      alt={selectedRecording.title}
                      className="h-full w-full rounded-lg object-cover opacity-50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Play className="mx-auto mb-4 h-16 w-16" />
                        <p className="text-lg">
                          Recording Player Would Appear Here
                        </p>
                        <p className="mt-2 text-sm text-gray-300">
                          Duration: {selectedRecording.duration} • Recorded:{' '}
                          {selectedRecording.date}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">
                        Date: {selectedRecording.date}
                      </p>
                      <p className="text-gray-600">
                        Duration: {selectedRecording.duration}
                      </p>
                    </div>
                    <Button
                      onClick={() =>
                        handleDownload(
                          selectedRecording.videoUrl,
                          `${selectedRecording.title}_Recording.mp4`
                        )
                      }
                      className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800"
                    >
                      <Download className="h-4 w-4" />
                      Download Recording
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4">
                  {courseData.recordings.map((recording) => (
                    <div
                      key={recording.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="rounded-lg bg-red-100 p-2">
                          <Icons.Recording className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {recording.title} Recording
                          </h3>
                          <div className="flex items-center">
                            <p className="text-sm text-gray-500">
                              {recording.date} • {recording.duration}
                            </p>
                            {recording.watched && (
                              <span className="ml-2 flex items-center space-x-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                                <Icons.check className="h-3 w-3" />
                                <span>Watched</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-blue-50"
                          onClick={() => handlePlayRecording(recording)}
                        >
                          Watch Recording
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-blue-50"
                          onClick={() =>
                            handleDownload(
                              recording.videoUrl,
                              `${recording.title}_Recording.mp4`
                            )
                          }
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {courseData.recordings.length === 0 && (
                    <div className="py-8 text-center text-gray-500">
                      No recordings available for this course yet.
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* Grades Tab (Redesigned) */}
            <TabsContent value="grades" className="space-y-4">
              {courseData.overallGrade !== null ? (
                <>
                  {/* Simplified letter grade display */}
                  <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex items-center space-x-6 rounded-lg bg-white p-6">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 text-center text-white shadow-lg">
                        <span className="text-4xl font-bold">
                          {getLetterGrade(courseData.overallGrade)}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col space-y-2">
                        <h3 className="text-lg font-medium">Final Grade</h3>
                        <p className="text-3xl font-semibold text-gray-800">
                          {courseData.overallGrade}%
                        </p>
                        <p className="text-sm text-gray-500">
                          {courseData.gradeCompletion
                            ? `${courseData.gradeCompletion}% of course completed`
                            : 'Course in progress'}
                        </p>
                      </div>
                    </div>

                    {/* Next steps card */}
                    <div className="rounded-lg bg-white p-6 shadow-custom">
                      <h3 className="mb-3 text-lg font-medium">Next Steps</h3>
                      <div className="text-sm text-gray-700">
                        <p className="mb-2">
                          {courseData.overallGrade >= 90
                            ? 'Continue your excellent work! Focus on maintaining your performance.'
                            : courseData.overallGrade >= 80
                              ? 'Good progress! Review feedback to improve on future assignments.'
                              : courseData.overallGrade >= 70
                                ? 'Focus on improving quiz and assignment scores.'
                                : 'Schedule a meeting with your instructor as soon as possible.'}
                        </p>
                        {courseData.gradeItems?.filter(
                          (item) => item.status === 'upcoming'
                        ).length > 0 && (
                          <div className="mt-3 rounded-lg bg-blue-50 p-3">
                            <p className="font-medium text-blue-700">
                              Upcoming Assessments:{' '}
                              {
                                courseData.gradeItems?.filter(
                                  (item) => item.status === 'upcoming'
                                ).length
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Category overview cards */}
                  <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {courseData.gradeCategories?.map((category) => {
                      // Find items in this category
                      const items =
                        courseData.gradeItems?.filter(
                          (item) => item.category === category.name
                        ) || [];
                      const completedItems = items.filter(
                        (item) => item.score !== null
                      );

                      // Calculate category average if items exist and are completed
                      let categoryAverage = null;
                      if (completedItems.length > 0) {
                        const totalScore = completedItems.reduce(
                          (sum, item) => sum + item.score / item.maxScore,
                          0
                        );
                        categoryAverage = Math.round(
                          (totalScore / completedItems.length) * 100
                        );
                      }

                      const categoryCompletion =
                        items.length > 0
                          ? (completedItems.length / items.length) * 100
                          : 0;

                      const getBgColor = () => {
                        if (categoryAverage === null) return 'bg-gray-100';
                        if (categoryAverage >= 90) return 'bg-green-50';
                        if (categoryAverage >= 80) return 'bg-blue-50';
                        if (categoryAverage >= 70) return 'bg-yellow-50';
                        return 'bg-red-50';
                      };

                      const getTextColor = () => {
                        if (categoryAverage === null) return 'text-gray-500';
                        if (categoryAverage >= 90) return 'text-green-700';
                        if (categoryAverage >= 80) return 'text-blue-700';
                        if (categoryAverage >= 70) return 'text-yellow-700';
                        return 'text-red-700';
                      };

                      return (
                        <div
                          key={category.id}
                          className={`rounded-lg ${getBgColor()} p-4 shadow-sm`}
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <h4 className="font-medium">{category.name}</h4>
                            <span className="text-sm text-gray-500">
                              {category.weight}%
                            </span>
                          </div>

                          {categoryAverage !== null ? (
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-sm">Average:</span>
                              <span className={`font-medium ${getTextColor()}`}>
                                {categoryAverage}%
                                {categoryAverage >= 0 && (
                                  <span className="ml-1">
                                    ({getLetterGrade(categoryAverage)})
                                  </span>
                                )}
                              </span>
                            </div>
                          ) : (
                            <div className="mb-2 text-sm text-gray-500">
                              No grades yet
                            </div>
                          )}

                          <div className="mb-1 flex justify-between text-xs">
                            <span>Completion</span>
                            <span>{Math.round(categoryCompletion)}%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                            <div
                              className={`h-2 ${
                                categoryAverage !== null
                                  ? categoryAverage >= 90
                                    ? 'bg-green-500'
                                    : categoryAverage >= 80
                                      ? 'bg-blue-500'
                                      : categoryAverage >= 70
                                        ? 'bg-yellow-500'
                                        : 'bg-red-500'
                                  : 'bg-gray-400'
                              }`}
                              style={{
                                width: `${categoryCompletion}%`,
                              }}
                            ></div>
                          </div>
                          <div className="mt-2 text-xs">
                            <span className="text-gray-500">
                              {completedItems.length}/{items.length} items
                              completed
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Category sections with detailed grades */}
                  {courseData.gradeCategories?.map((category) => {
                    const categoryItems =
                      courseData.gradeItems?.filter(
                        (item) => item.category === category.name
                      ) || [];

                    if (categoryItems.length === 0) return null;

                    return (
                      <div
                        key={category.id}
                        className="rounded-lg border bg-white shadow-sm"
                      >
                        <div className="border-b bg-gray-50 p-4">
                          <h3 className="flex items-center justify-between font-medium">
                            <span>{category.name}</span>
                            <span className="text-sm text-gray-500">
                              Weight: {category.weight}%
                            </span>
                          </h3>
                        </div>

                        <div className="divide-y">
                          {categoryItems.map((item) => {
                            // Define color based on score
                            const getScoreColor = () => {
                              if (item.score === null) return '';
                              const percent =
                                (item.score / item.maxScore) * 100;
                              if (percent >= 90) return 'text-green-600';
                              if (percent >= 80) return 'text-blue-600';
                              if (percent >= 70) return 'text-yellow-600';
                              return 'text-red-600';
                            };

                            // Define badge color based on score
                            const getBadgeColor = () => {
                              if (item.score === null) return '';
                              const percent =
                                (item.score / item.maxScore) * 100;
                              if (percent >= 90)
                                return 'bg-green-100 text-green-700';
                              if (percent >= 80)
                                return 'bg-blue-100 text-blue-700';
                              if (percent >= 70)
                                return 'bg-yellow-100 text-yellow-700';
                              return 'bg-red-100 text-red-700';
                            };

                            return (
                              <div key={item.id} className="p-4">
                                <div className="flex flex-wrap items-start justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div
                                      className={`rounded-full p-2 ${
                                        item.type === 'assignment'
                                          ? 'bg-orange-100'
                                          : item.type === 'quiz'
                                            ? 'bg-purple-100'
                                            : item.type === 'exam'
                                              ? 'bg-red-100'
                                              : item.type === 'project'
                                                ? 'bg-green-100'
                                                : 'bg-blue-100'
                                      }`}
                                    >
                                      {item.type === 'assignment' ? (
                                        <FileText className="h-4 w-4 text-orange-600" />
                                      ) : item.type === 'quiz' ? (
                                        <FileQuestion className="h-4 w-4 text-purple-600" />
                                      ) : item.type === 'exam' ? (
                                        <Icons.book className="h-4 w-4 text-red-600" />
                                      ) : item.type === 'project' ? (
                                        <Icons.layers className="h-4 w-4 text-green-600" />
                                      ) : (
                                        <Icons.users className="h-4 w-4 text-blue-600" />
                                      )}
                                    </div>
                                    <div>
                                      <h5 className="font-medium">
                                        {item.title}
                                      </h5>
                                      <p className="text-xs text-gray-500">
                                        {item.date} • Weight: {item.weight}%
                                      </p>
                                    </div>
                                  </div>
                                  <div className="mt-2 md:mt-0 md:text-right">
                                    {item.score !== null ? (
                                      <div className="flex flex-col items-end">
                                        <div className="flex items-center">
                                          <span
                                            className={`mr-2 text-lg font-medium ${getScoreColor()}`}
                                          >
                                            {Math.round(
                                              (item.score / item.maxScore) * 100
                                            )}
                                            %
                                          </span>
                                          <span
                                            className={`flex h-8 w-8 items-center justify-center rounded-full ${getBadgeColor()}`}
                                          >
                                            {getLetterGrade(
                                              (item.score / item.maxScore) * 100
                                            )}
                                          </span>
                                        </div>
                                        <p
                                          className={`text-sm ${getScoreColor()}`}
                                        >
                                          Score:{' '}
                                          <span className="font-medium">
                                            {item.score}/{item.maxScore}
                                          </span>
                                        </p>
                                      </div>
                                    ) : (
                                      <span
                                        className={`rounded-full px-3 py-1 text-sm ${
                                          item.status === 'upcoming'
                                            ? 'bg-blue-100 text-blue-700'
                                            : item.status === 'not-started'
                                              ? 'bg-gray-100 text-gray-700'
                                              : 'bg-yellow-100 text-yellow-700'
                                        }`}
                                      >
                                        {item.status === 'upcoming'
                                          ? 'Upcoming'
                                          : item.status === 'not-started'
                                            ? 'Not Started'
                                            : 'Pending'}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {item.feedback && (
                                  <div className="mt-3 rounded bg-gray-50 p-3 text-sm">
                                    <p className="font-medium">Feedback:</p>
                                    <p className="text-gray-600">
                                      {item.feedback}
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {/* Simplified grade summary */}
                  <div className="mt-6 rounded-lg bg-gray-50 p-4">
                    <h3 className="mb-3 font-medium">Assessment Summary</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="rounded-lg bg-white p-3 text-center shadow-custom">
                        <div className="text-sm text-gray-500">Completed</div>
                        <div className="text-xl font-medium">
                          {courseData.gradeItems?.filter(
                            (item) => item.score !== null
                          ).length || 0}
                          <span className="text-sm text-gray-400">
                            /{courseData.gradeItems?.length || 0}
                          </span>
                        </div>
                      </div>
                      <div className="rounded-lg bg-white p-3 text-center shadow-custom">
                        <div className="text-sm text-gray-500">Average</div>
                        <div
                          className={`text-xl font-medium ${
                            courseData.overallGrade >= 90
                              ? 'text-green-600'
                              : courseData.overallGrade >= 80
                                ? 'text-blue-600'
                                : courseData.overallGrade >= 70
                                  ? 'text-yellow-600'
                                  : 'text-red-600'
                          }`}
                        >
                          {courseData.overallGrade}%
                        </div>
                      </div>
                      <div className="rounded-lg bg-white p-3 text-center shadow-custom">
                        <div className="text-sm text-gray-500">
                          Highest Grade
                        </div>
                        <div className="text-xl font-medium text-green-600">
                          {Math.max(
                            ...(courseData.gradeItems
                              ?.filter((item) => item.score !== null)
                              .map((item) =>
                                Math.round((item.score / item.maxScore) * 100)
                              ) || [0])
                          )}
                          %
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="mb-4 rounded-full bg-gray-100 p-4">
                    <BarChart3 className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium">
                    No Grades Available Yet
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Complete assignments and quizzes to receive grades for this
                    course.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default CoursePage;
