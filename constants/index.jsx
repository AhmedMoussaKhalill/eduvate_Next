import { Icons } from "@/components/icons";
import { ArrowBigDown } from "lucide-react";

export const sideBarLinks = [
  {
    label: "Dashboard",
    route: "/",
    icon: <Icons.dashboard className="h-[23px] w-[23px]" />,
  },
  {
    label: "Quira Chat",
    route: "/chat",
    icon: <Icons.chatai className="h-[23px] w-[23px]" />,
  },
  {
    label: "Tutorials AI",
    route: "/prompt-box",
    icon: <Icons.tutorials className="h-[23px] w-[23px]" />,
  },

  {
    label: "All Tutorials",
    route: "/all-tools",
    icon: <Icons.alltutorial className="h-[23px] w-[23px]" />,
  },
  {
    label: "My Courses",
    route: "/image",
    icon: <Icons.prompt className="h-[23px] w-[23px]" />,
  },
  {
    label: "Grade Report",
    route: "/grade-report",
    icon: <Icons.gradreport className="h-[23px] w-[23px]" />,
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
    label: "Settings",
    route: "/settings",
    icon: <Icons.settings className="h-[23px] w-[23px]" />,
  },
  {
    label: "Help Center",
    route: "/help-center",
    icon: <Icons.help className="h-[23px] w-[23px]" />,
  },
];
