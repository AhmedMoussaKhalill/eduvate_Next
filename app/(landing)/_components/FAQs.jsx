// // Dependencies: pnpm install lucide-react

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
// } from "@/components/ui/accordion";
// import * as AccordionPrimitive from "@radix-ui/react-accordion";

// import { Courgette } from "next/font/google";
// import { cn } from "@/lib/utils";

// import { AtSign, Command, Eclipse, Plus, Zap } from "lucide-react";
// import AnimatedShinyText from "@/components/ui/animated-shiny-text";

// const items = [
//   {
//     id: "1",
//     icon: Command,
//     title: "What makes Origin UI different?",
//     content:
//       "Origin UI focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
//   },
//   {
//     id: "2",
//     icon: Eclipse,
//     title: "How can I customize the components?",
//     content:
//       "Use our CSS variables for global styling, or className and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
//   },
//   {
//     id: "3",
//     icon: Zap,
//     title: "Is Origin UI optimized for performance?",
//     content:
//       "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
//   },
//   {
//     id: "4",
//     icon: AtSign,
//     title: "How accessible are the components?",
//     content:
//       "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
//   },
//   {
//     id: "5",
//     icon: AtSign,
//     title: "How accessible are the components?",
//     content:
//       "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
//   },
// ];

// const courgette = Courgette({
//   subsets: ["latin"],
//   weight: "400",
// });

// export default function FAQs() {
//   return (
//     <div className="space-y-10">
//       <div className="flex flex-col items-center justify-center space-y-5 text-center">
//         <div
//           className={cn(
//             "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
//             courgette.className,
//           )}
//         >
//           <AnimatedShinyText className="inline-flex items-center justify-center px-5 py-[3px] transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
//             <span>✨ FAQs</span>
//           </AnimatedShinyText>
//         </div>
//         <div className="space-y-3">
//           <h2 className={cn("text-4xl font-bold", courgette.className)}>
//             Frequently Asked Questions
//           </h2>
//           <p className="text-sm">
//             Our FAQ section makes finding solutions simple. Quickly access
//             common questions, resolve your <br />
//             doubts, and focus on what truly matters—your learning experience.
//           </p>
//         </div>
//       </div>
//       <div className="mx-auto max-w-3xl space-y-4">
//         <Accordion
//           type="single"
//           collapsible
//           className="w-full"
//           defaultValue="3"
//         >
//           {items.map((item) => (
//             <AccordionItem value={item.id} key={item.id} className="py-2">
//               <AccordionPrimitive.Header className="flex">
//                 <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
//                   <span className="flex items-center gap-3">
//                     <item.icon
//                       size={16}
//                       strokeWidth={2}
//                       className="shrink-0 opacity-60"
//                       aria-hidden="true"
//                     />
//                     <span>{item.title}</span>
//                   </span>
//                   <Plus
//                     size={16}
//                     strokeWidth={2}
//                     className="shrink-0 opacity-60 transition-transform duration-200"
//                     aria-hidden="true"
//                   />
//                 </AccordionPrimitive.Trigger>
//               </AccordionPrimitive.Header>
//               <AccordionContent className="pb-2 ps-7 text-muted-foreground">
//                 {item.content}
//               </AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       </div>
//     </div>
//   );
// }


// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { ScrollArea } from '@/components/ui/scroll-area';



// const Feature = ({ icon: Icon, title, description }) => {
//   return (
//     <Card className="flex flex-col items-center p-4 md:p-6 lg:p-8">
//       {/* <Icon className="w-12 h-12 text-primary" /> */}
//       <CardTitle className="mt-4 text-xl font-semibold">{title}</CardTitle>
//       <CardContent className="text-center text-sm text-muted-foreground">
//         {description}
//       </CardContent>
//     </Card>
//   );
// };

// const FeaturesSection = () => {
//   return (
//     <section id="features" className="py-12 md:py-24">
//       <div className="container mx-auto">
//         <div className="max-w-3xl mx-auto text-center mb-12">
//           <h2 className="text-3xl font-bold mb-4">Key Features</h2>
//           <p className="text-muted-foreground">
//             Elevate your learning experience with our cutting-edge AI-powered education platform.
//           </p>
//         </div>
//         <ScrollArea className="w-full h-[400px] md:h-[500px] lg:h-[600px] p-4 md:p-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <Feature
//               title="Personalized Learning Paths"
//               description="Our AI tailors a unique learning journey based on your skills, goals, and pace."
//             />
//             <Feature
//               title="Interactive Lessons"
//               description="Engage with interactive content, quizzes, and real-world projects to reinforce your knowledge."
//             />
//             <Feature
//               title="AI-Powered Feedback"
//               description="Get instant, detailed feedback on your work from our AI tutors."
//             />
//             <Feature
//               title="Community Collaboration"
//               description="Connect with peers and experts in our vibrant community forums."
//             />
//             <Feature
//               title="Comprehensive Resources"
//               description="Access a vast library of articles, videos, and tutorials on various topics."
//             />
//             <Feature
//               title=" hands-on Practice"
//               description="Apply what you've learned with hands-on coding exercises and challenges."
//             />
//           </div>
//         </ScrollArea>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;







