'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { Icons } from '@/components/icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Textarea } from '@/components/ui/textarea';
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ArrowBigUp, ArrowUp } from 'lucide-react';
import { Caveat } from 'next/font/google';
import { ChatProvider, useChat } from '@/context/ChatContext';
import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const font = Caveat({
  subsets: ['latin'],
  weight: '700',
});

function ChatContent() {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    startNewChat,
    chatHistory,
    currentChatId,
  } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const currentChat = chatHistory.find((chat) => chat.id === currentChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCardClick = (message) => {
    startNewChat();
    sendMessage(message);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    {currentChat ? currentChat.name : 'New Chat'}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-3 px-3">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Icons.newchat
                    className="size-6 cursor-pointer text-zinc-600"
                    onClick={startNewChat}
                  />
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>New Chat</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="rounded-full border border-gray-500/5 bg-sidebar px-3 py-1.5 text-xs">
              Powered by <b>llama 3.1</b>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">
          <div className="relative flex-1">
            <div
              ref={chatContainerRef}
              className="absolute inset-0 overflow-y-auto pb-32"
            >
              <div className="mx-auto grid w-full max-w-3xl space-y-10">
                {messages.length === 0 ? (
                  <>
                    <div className="space-y-5 text-center">
                      <h2 className="text-3xl md:text-4xl">
                        Hi, I'm{' '}
                        <span
                          className={cn(
                            'bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500 bg-clip-text pr-1 text-4xl font-bold text-transparent md:text-5xl',
                            font.className
                          )}
                        >
                          Quira
                        </span>
                      </h2>
                      <p className="text-muted-foreground">
                        How can I help you today?
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-0 md:gap-6">
                      <div
                        className="mx-auto h-fit w-full cursor-pointer rounded-xl p-4 shadow-custom transition-colors hover:bg-sidebar md:p-5"
                        onClick={() =>
                          handleCardClick(
                            'What are the advantages of using ChatGPT?'
                          )
                        }
                      >
                        <div className="space-y-2">
                          <h2 className="text-base md:text-lg">
                            What are the advantages
                          </h2>
                          <p className="text-xs text-muted-foreground md:text-sm">
                            of using ChatGPT?
                          </p>
                        </div>
                      </div>
                      <div
                        className="mx-auto h-fit w-full cursor-pointer rounded-xl p-4 shadow-custom transition-colors hover:bg-sidebar md:p-5"
                        onClick={() =>
                          handleCardClick('How can I improve my coding skills?')
                        }
                      >
                        <div className="space-y-2">
                          <h2 className="text-base md:text-lg">
                            How can I improve
                          </h2>
                          <p className="text-xs text-muted-foreground md:text-sm">
                            my coding skills?
                          </p>
                        </div>
                      </div>
                      <div
                        className="mx-auto h-fit w-full cursor-pointer rounded-xl p-4 shadow-custom transition-colors hover:bg-sidebar md:p-5"
                        onClick={() =>
                          handleCardClick(
                            'What are the best practices for project management?'
                          )
                        }
                      >
                        <div className="space-y-2">
                          <h2 className="text-base md:text-lg">
                            What are the best practices
                          </h2>
                          <p className="text-xs text-muted-foreground md:text-sm">
                            for project management?
                          </p>
                        </div>
                      </div>
                      <div
                        className="mx-auto h-fit w-full cursor-pointer rounded-xl p-4 shadow-custom transition-colors hover:bg-sidebar md:p-5"
                        onClick={() =>
                          handleCardClick(
                            'How can I learn a new programming language effectively?'
                          )
                        }
                      >
                        <div className="space-y-2">
                          <h2 className="text-base md:text-lg">
                            How can I learn
                          </h2>
                          <p className="text-xs text-muted-foreground md:text-sm">
                            a new programming language effectively?
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={cn(
                          'flex gap-4',
                          message.role === 'assistant'
                            ? 'flex-row'
                            : 'flex-row-reverse'
                        )}
                      >
                        <Avatar className="size-8">
                          <AvatarImage
                            src={
                              message.role === 'assistant'
                                ? '/quira-avatar.png'
                                : '/user-avatar.png'
                            }
                            alt={
                              message.role === 'assistant' ? 'Quira' : 'User'
                            }
                          />
                          <AvatarFallback>
                            {message.role === 'assistant' ? 'Q' : 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={cn(
                            'justify-center rounded-xl p-2.5',
                            message.role === 'assistant'
                              ? message.isError
                                ? 'bg-red-100 text-red-700'
                                : 'bg-sidebar'
                              : 'bg-blue-600 text-white'
                          )}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-4">
                        <Avatar className="size-8">
                          <AvatarImage src="/quira-avatar.png" alt="Quira" />
                          <AvatarFallback>Q</AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg bg-sidebar p-4">
                          <div className="flex gap-2">
                            <div className="size-2 animate-bounce rounded-full bg-blue-600"></div>
                            <div className="size-2 animate-bounce rounded-full bg-blue-600 [animation-delay:0.2s]"></div>
                            <div className="size-2 animate-bounce rounded-full bg-blue-600 [animation-delay:0.4s]"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-background via-background/80 to-transparent pt-20">
              <div className="mx-auto w-full max-w-3xl">
                <div className="relative w-full">
                  <div className="absolute bottom-0 left-3 flex -translate-y-1/2">
                    <Button size="sm" className="rounded-full bg-black">
                      <Icons.world
                        className="-ms-1 me-0.5"
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      Search
                    </Button>
                  </div>
                  <Icons.attach className="absolute bottom-0 right-12 size-7 -translate-y-1/2 transform text-muted-foreground" />
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-3 size-7 -translate-y-1/2 items-center rounded-full bg-black"
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                  >
                    <ArrowUp className="size-5" />
                  </Button>
                  <Textarea
                    className="resize-none rounded-[1.2rem] bg-sidebar p-3"
                    rows={4}
                    placeholder="Type your message here."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function Page() {
  return (
    <ChatProvider>
      <ChatContent />
    </ChatProvider>
  );
}
