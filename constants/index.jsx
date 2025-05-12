import { Icons } from '@/components/icons';
import { ArrowBigDown } from 'lucide-react';

export const sideBarLinks = [
  {
    label: 'Dashboard',
    route: '/dashboard',
    icon: <Icons.dashboard className="h-[23px] w-[23px]" />,
  },
  {
    label: 'My Courses',
    route: '/dashboard/my-courses',
    icon: <Icons.prompt className="h-[23px] w-[23px]" />,
  },
  {
    label: 'Lecture Calendar',
    route: '/dashboard/lecture-calendar',
    icon: <Icons.Calendar className="h-[23px] w-[23px]" />,
  },
  {
    label: 'Quira Chat',
    route: '/chat',
    icon: <Icons.chatai className="h-[23px] w-[23px]" />,
  },
  {
    label: 'Tutorials AI',
    route: '/tutorials-ai',
    icon: <Icons.tutorials className="h-[23px] w-[23px]" />,
  },
  {
    label: 'All Tutorials',
    route: '/all-tools',
    icon: <Icons.alltutorial className="h-[23px] w-[23px]" />,
  },
  {
    label: 'Grade Report',
    route: '/grade-report',
    icon: <Icons.gradreport className="h-[23px] w-[23px]" />,
  },
  {
    label: 'Quiz Maker',
    route: '/quiz-maker',
    icon: <Icons.bookopen className="h-[23px] w-[23px]" />,
  },
  // {
  //   label: "تحميل المصحف كاملاً",
  //   route: "/image",
  //   icon: <Icons.download className="h-[23px] w-[23px]" />,
  // },
  // {
  //   label: "التطبيقات",
  //   route: "/image",
  //   icon: <Icons.dashboard className="h-[23px] w-[23px]" />,
  // },
];
export const sideBarLinks1 = [
  {
    label: 'Help Center',
    route: '/dashboard/help-center',
    icon: <Icons.help className="h-[23px] w-[23px]" />,
  },
];
