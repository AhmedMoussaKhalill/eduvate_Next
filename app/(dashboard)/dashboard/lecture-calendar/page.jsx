'use client';
import React, { useState, useEffect } from 'react';
import { Icons } from '@/components/icons';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Course gradient colors
const getCourseGradient = (category) => {
  switch (category) {
    case 'Law':
      return {
        bg: 'bg-blue-100 text-blue-700 border-blue-300',
        accent: 'bg-blue-600',
      };
    case 'Politics':
      return {
        bg: 'bg-purple-100 text-purple-700 border-purple-300',
        accent: 'bg-purple-600',
      };
    case 'English':
      return {
        bg: 'bg-green-100 text-green-700 border-green-300',
        accent: 'bg-green-600',
      };
    case 'Economics':
      return {
        bg: 'bg-amber-100 text-amber-700 border-amber-300',
        accent: 'bg-amber-600',
      };
    case 'Mathematics':
      return {
        bg: 'bg-red-100 text-red-700 border-red-300',
        accent: 'bg-red-600',
      };
    case 'Psychology':
      return {
        bg: 'bg-teal-100 text-teal-700 border-teal-300',
        accent: 'bg-teal-600',
      };
    default:
      return {
        bg: 'bg-gray-100 text-gray-700 border-gray-300',
        accent: 'bg-gray-600',
      };
  }
};

// Mock data for all enrolled lectures across courses
const mockEnrolledLectures = [
  {
    id: 'lec-1',
    title: 'Introduction to Law',
    courseId: 'law101',
    courseName: 'Law Class',
    category: 'Law',
    date: '2023-08-15',
    startTime: '10:00',
    endTime: '11:30',
    lecturer: 'Gut Alexen',
    location: 'Room 101',
    description: 'Fundamental concepts of law and legal systems',
    isRecorded: true,
    hasAttendanceCheck: true,
  },
  {
    id: 'lec-2',
    title: 'Legal Systems',
    courseId: 'law101',
    courseName: 'Law Class',
    category: 'Law',
    date: '2023-08-17',
    startTime: '10:00',
    endTime: '11:45',
    lecturer: 'Gut Alexen',
    location: 'Room 101',
    description: 'Comparative overview of different legal systems worldwide',
    isRecorded: true,
    hasAttendanceCheck: true,
  },
  {
    id: 'lec-3',
    title: 'Introduction to Political Science',
    courseId: 'politics101',
    courseName: 'Politics Class',
    category: 'Politics',
    date: '2023-08-16',
    startTime: '13:00',
    endTime: '14:20',
    lecturer: 'Ramirez Huts',
    location: 'Room 203',
    description: 'Foundations of political theory and governance',
    isRecorded: true,
    hasAttendanceCheck: true,
  },
  {
    id: 'lec-4',
    title: 'Calculus Fundamentals',
    courseId: 'mathematics101',
    courseName: 'Mathematics Advanced',
    category: 'Mathematics',
    date: '2023-08-15',
    startTime: '14:30',
    endTime: '16:00',
    lecturer: 'Sarah Wilson',
    location: 'Math Hall 2',
    description: 'Introduction to differential calculus and its applications',
    isRecorded: true,
    hasAttendanceCheck: true,
  },
  {
    id: 'lec-5',
    title: 'Microeconomics Principles',
    courseId: 'economics101',
    courseName: 'Economics 101',
    category: 'Economics',
    date: '2023-08-18',
    startTime: '09:00',
    endTime: '10:30',
    lecturer: 'John Davis',
    location: 'Business Building 305',
    description: 'Fundamental principles of microeconomics and market behavior',
    isRecorded: true,
    hasAttendanceCheck: true,
  },
  {
    id: 'lec-6',
    title: 'Advanced Grammar',
    courseId: 'english101',
    courseName: 'English Class',
    category: 'English',
    date: '2023-08-14',
    startTime: '11:00',
    endTime: '12:30',
    lecturer: 'Emma Larson',
    location: 'Arts Building 120',
    description: 'Advanced concepts in English grammar and usage',
    isRecorded: true,
    hasAttendanceCheck: false,
  },
  {
    id: 'lec-7',
    title: 'Academic Writing',
    courseId: 'english101',
    courseName: 'English Class',
    category: 'English',
    date: '2023-08-19',
    startTime: '11:00',
    endTime: '12:30',
    lecturer: 'Emma Larson',
    location: 'Arts Building 120',
    description: 'Techniques and practices for effective academic writing',
    isRecorded: true,
    hasAttendanceCheck: true,
  },
  {
    id: 'lec-8',
    title: 'Psychology Introduction',
    courseId: 'psychology101',
    courseName: 'Introduction to Psychology',
    category: 'Psychology',
    date: '2023-08-21',
    startTime: '13:30',
    endTime: '15:00',
    lecturer: 'Michael Brown',
    location: 'Sciences Building 405',
    description: 'Introduction to core psychological concepts and theories',
    isRecorded: true,
    hasAttendanceCheck: true,
  },
];

// Generate calendar days for the current month
const generateCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push({ day: null, isCurrentMonth: false });
  }

  // Add days of the current month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({ day, isCurrentMonth: true });
  }

  // Add empty cells to complete the last week row if needed
  const totalCells = Math.ceil((startingDayOfWeek + daysInMonth) / 7) * 7;
  for (let i = days.length; i < totalCells; i++) {
    days.push({ day: null, isCurrentMonth: false });
  }

  return days;
};

// Format date for display
const formatDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

// Format time for display
const formatTime = (time) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${period}`;
};

const LectureCalendarPage = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.getMonth().toString()
  );
  const [selectedYear, setSelectedYear] = useState(
    currentDate.getFullYear().toString()
  );

  // Update month and year selects when currentDate changes
  useEffect(() => {
    setSelectedMonth(currentDate.getMonth().toString());
    setSelectedYear(currentDate.getFullYear().toString());
  }, [currentDate]);

  // Format the current month and year for display
  const monthYearString = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  // Generate calendar days
  const days = generateCalendarDays(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  // Filter lectures for the current month
  const currentMonthLectures = mockEnrolledLectures.filter((lecture) => {
    const lectureDate = new Date(lecture.date);
    return (
      lectureDate.getMonth() === currentDate.getMonth() &&
      lectureDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Group lectures by date
  const lecturesByDate = currentMonthLectures.reduce((acc, lecture) => {
    const day = new Date(lecture.date).getDate();
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(lecture);
    return acc;
  }, {});

  // Get lectures for selected date
  const getSelectedDateLectures = () => {
    if (!selectedDate) return [];

    return mockEnrolledLectures.filter((lecture) => {
      const lectureDate = new Date(lecture.date);
      const selected = new Date(selectedDate);
      return (
        lectureDate.getDate() === selected.getDate() &&
        lectureDate.getMonth() === selected.getMonth() &&
        lectureDate.getFullYear() === selected.getFullYear()
      );
    });
  };

  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Handle date selection
  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      );
    }
  };

  // Handle lecture click
  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
  };

  // Navigation to course page
  const navigateToCourse = (courseId, courseName) => {
    router.push(
      `/dashboard/courses/${courseId}?name=${encodeURIComponent(courseName)}`
    );
  };

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Lecture Calendar</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setActiveTab('calendar')}>
            <Icons.Calendar className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
          <Button variant="outline" onClick={() => setActiveTab('list')}>
            <Icons.list className="mr-2 h-4 w-4" />
            List View
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="calendar" className="space-y-4">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-2">
              <div className="flex items-center gap-4">
                <CardTitle>{monthYearString}</CardTitle>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrevMonth}
                    className="h-8 w-8"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-8 px-2 text-sm"
                    onClick={() => setCurrentDate(new Date())}
                  >
                    Today
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNextMonth}
                    className="h-8 w-8"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex space-x-2">
                <Select
                  value={selectedMonth}
                  onValueChange={(value) => {
                    setSelectedMonth(value);
                    const newDate = new Date(currentDate);
                    newDate.setMonth(parseInt(value));
                    setCurrentDate(newDate);
                  }}
                >
                  <SelectTrigger className="w-[110px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                      'December',
                    ].map((month, index) => (
                      <SelectItem key={month} value={index.toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={selectedYear}
                  onValueChange={(value) => {
                    setSelectedYear(value);
                    const newDate = new Date(currentDate);
                    newDate.setFullYear(parseInt(value));
                    setCurrentDate(newDate);
                  }}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(
                      { length: 5 },
                      (_, i) => new Date().getFullYear() - 2 + i
                    ).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              {/* Calendar Grid - Day Headers */}
              <div className="mb-2 grid grid-cols-7 gap-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                  (day) => (
                    <div key={day} className="py-2 text-center font-medium">
                      {day}
                    </div>
                  )
                )}
              </div>

              {/* Calendar Grid - Days */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  const isToday =
                    day.isCurrentMonth &&
                    day.day === new Date().getDate() &&
                    currentDate.getMonth() === new Date().getMonth() &&
                    currentDate.getFullYear() === new Date().getFullYear();

                  const isSelected =
                    selectedDate &&
                    day.isCurrentMonth &&
                    day.day === selectedDate.getDate() &&
                    currentDate.getMonth() === selectedDate.getMonth() &&
                    currentDate.getFullYear() === selectedDate.getFullYear();

                  const hasLectures =
                    day.isCurrentMonth && lecturesByDate[day.day]?.length > 0;

                  return (
                    <div
                      key={index}
                      className={`min-h-32 rounded-md border p-2 ${
                        !day.isCurrentMonth
                          ? 'bg-gray-50 text-gray-400'
                          : isSelected
                            ? 'border-blue-300 bg-blue-50'
                            : isToday
                              ? 'border-yellow-300 bg-yellow-50'
                              : 'cursor-pointer hover:bg-gray-50'
                      }`}
                      onClick={() =>
                        day.isCurrentMonth && handleDateClick(day.day)
                      }
                    >
                      {day.day && (
                        <div className="flex h-full flex-col">
                          <div className="flex justify-between">
                            <span
                              className={`${
                                isToday
                                  ? 'flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white'
                                  : ''
                              }`}
                            >
                              {day.day}
                            </span>
                            {hasLectures && (
                              <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                            )}
                          </div>
                          <div className="mt-1 max-h-28 space-y-1 overflow-y-auto">
                            {lecturesByDate[day.day]
                              ?.sort((a, b) =>
                                a.startTime.localeCompare(b.startTime)
                              )
                              .map((lecture) => (
                                <div
                                  key={lecture.id}
                                  className={`relative flex cursor-pointer overflow-hidden rounded-md border py-1 pl-1 pr-2 text-xs transition-all hover:shadow-md ${lecture.category ? 'border-transparent' : 'border-gray-200'}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleLectureClick(lecture);
                                    setSelectedDate(new Date(lecture.date));
                                  }}
                                >
                                  <div
                                    className={`absolute left-0 top-0 h-full w-1 ${getCourseGradient(lecture.category).accent}`}
                                  ></div>
                                  <div className="ml-1 flex w-full flex-col">
                                    <div className="truncate font-medium">
                                      {lecture.title}
                                    </div>
                                    <div className="mt-1 flex items-center text-xs">
                                      <Clock className="mr-1 h-3 w-3 text-gray-500" />
                                      <span className="font-medium text-gray-600">
                                        {formatTime(lecture.startTime)} -{' '}
                                        {formatTime(lecture.endTime)}
                                      </span>
                                    </div>
                                    <div className="mt-1 flex items-center truncate text-xs">
                                      <Icons.book className="mr-1 h-3 w-3 text-gray-500" />
                                      <span className="truncate text-gray-600">
                                        {lecture.location}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            {lecturesByDate[day.day]?.length > 3 && (
                              <div
                                className="cursor-pointer rounded py-1 text-center text-xs font-medium text-gray-500 hover:bg-gray-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDateClick(day.day);
                                }}
                              >
                                +{lecturesByDate[day.day].length - 3} more
                                lectures
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Selected Day Detail */}
          {selectedDate && (
            <Card>
              <CardHeader className="border-b pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      Lectures for {formatDate(selectedDate)}
                    </CardTitle>
                    <CardDescription>
                      {getSelectedDateLectures().length} lecture
                      {getSelectedDateLectures().length !== 1 ? 's' : ''}{' '}
                      scheduled
                    </CardDescription>
                  </div>
                  {getSelectedDateLectures().length > 0 && (
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Add to Calendar
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getSelectedDateLectures().length > 0 ? (
                    getSelectedDateLectures().map((lecture) => (
                      <div
                        key={lecture.id}
                        className={`relative overflow-hidden rounded-lg border p-4 ${
                          selectedLecture?.id === lecture.id
                            ? 'ring-2 ring-blue-500'
                            : ''
                        }`}
                        onClick={() => handleLectureClick(lecture)}
                      >
                        <div
                          className={`absolute left-0 top-0 h-full w-1 ${getCourseGradient(lecture.category).accent}`}
                        ></div>
                        <div className="mb-2 flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{lecture.title}</h3>
                            <p className="text-sm text-gray-500">
                              {lecture.courseName}
                            </p>
                          </div>
                          <Badge
                            className={getCourseGradient(lecture.category).bg}
                          >
                            {lecture.category}
                          </Badge>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div className="flex items-center text-sm">
                            <Clock className="mr-2 h-4 w-4 text-gray-500" />
                            <span>
                              {formatTime(lecture.startTime)} -{' '}
                              {formatTime(lecture.endTime)}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Icons.user className="mr-2 h-4 w-4 text-gray-500" />
                            <span>{lecture.lecturer}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Icons.book className="mr-2 h-4 w-4 text-gray-500" />
                            <span>{lecture.location}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            {lecture.isRecorded ? (
                              <Badge
                                variant="outline"
                                className="border-green-200 bg-green-50 text-green-700"
                              >
                                <Icons.Recording className="mr-1 h-3 w-3" />
                                Recorded
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="border-gray-200 bg-gray-50 text-gray-700"
                              >
                                <Icons.Recording className="mr-1 h-3 w-3" />
                                Not Recorded
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              navigateToCourse(
                                lecture.courseId,
                                lecture.courseName
                              )
                            }
                          >
                            Go to Course
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center">
                      <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-lg font-medium">
                        No lectures scheduled
                      </h3>
                      <p className="text-sm text-gray-500">
                        There are no lectures scheduled for this day.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Upcoming Lectures</CardTitle>
              <CardDescription>
                Showing all scheduled lectures for all courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEnrolledLectures
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((lecture) => (
                    <div
                      key={lecture.id}
                      className="relative overflow-hidden rounded-lg border p-4 hover:bg-gray-50"
                    >
                      <div
                        className={`absolute left-0 top-0 h-full w-1 ${getCourseGradient(lecture.category).accent}`}
                      ></div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{lecture.title}</h3>
                          <p className="text-sm text-gray-500">
                            {lecture.courseName}
                          </p>
                        </div>
                        <Badge
                          className={getCourseGradient(lecture.category).bg}
                        >
                          {lecture.category}
                        </Badge>
                      </div>
                      <div className="mt-3 text-sm text-gray-700">
                        <div className="mb-2 flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                          <span>{formatDate(lecture.date)}</span>
                        </div>
                        <div className="mb-2 flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-gray-500" />
                          <span>
                            {formatTime(lecture.startTime)} -{' '}
                            {formatTime(lecture.endTime)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Icons.user className="mr-2 h-4 w-4 text-gray-500" />
                          <span>{lecture.lecturer}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigateToCourse(
                              lecture.courseId,
                              lecture.courseName
                            )
                          }
                        >
                          Go to Course
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LectureCalendarPage;
