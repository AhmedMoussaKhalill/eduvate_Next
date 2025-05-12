'use client';

import { useChat } from '@/context/ChatContext';
import {
  formatDistanceToNow,
  isToday,
  isYesterday,
  isThisWeek,
  isThisMonth,
  isThisYear,
} from 'date-fns';
import {
  MessageSquare,
  Plus,
  Trash2,
  Clock,
  MoreVertical,
  Sparkles,
  Pin,
  Edit2,
} from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Icons } from './icons';
import { useState } from 'react';
import { Input } from './ui/input';
import { Caveat } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
  weight: '700',
});

const getTimeCategory = (date) => {
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  if (isThisWeek(date)) return 'This Week';
  if (isThisMonth(date)) return 'This Month';
  if (isThisYear(date)) return 'This Year';
  return 'Older';
};

export function ChatHistory() {
  const {
    chatHistory,
    currentChatId,
    startNewChat,
    loadChat,
    deleteChat,
    togglePinChat,
    updateChatName,
  } = useChat();
  const [editingChatId, setEditingChatId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleEditName = (chat) => {
    setEditingChatId(chat.id);
    setEditName(chat.name || '');
  };

  const handleSaveName = (chatId) => {
    if (editName.trim()) {
      updateChatName(chatId, editName.trim());
    }
    setEditingChatId(null);
    setEditName('');
  };

  const handleKeyPress = (e, chatId) => {
    if (e.key === 'Enter') {
      handleSaveName(chatId);
    } else if (e.key === 'Escape') {
      setEditingChatId(null);
      setEditName('');
    }
  };

  // Sort chats: pinned first, then by creation date
  const sortedChats = [...chatHistory].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Group chats by time category
  const groupedChats = sortedChats.reduce((groups, chat) => {
    const date = new Date(chat.createdAt);
    const category = getTimeCategory(date);
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(chat);
    return groups;
  }, {});

  return (
    <SidebarGroup>
      <div className="mb-4 flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <SidebarGroupLabel
            className={cn(
              'bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-2xl font-semibold text-transparent',
              caveat.className
            )}
          >
            Quira
          </SidebarGroupLabel>
        </div>
        <SidebarMenuButton
          onClick={startNewChat}
          className="h-8 w-8 p-0 transition-colors hover:bg-sidebar-accent/50"
          tooltip="New Chat"
        >
          <Plus className="h-4 w-4" />
        </SidebarMenuButton>
      </div>
      <SidebarGroupContent>
        <AnimatePresence mode="popLayout">
          <SidebarMenu>
            {Object.entries(groupedChats).map(([category, chats]) => (
              <div key={category}>
                <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
                  {category}
                </div>
                {chats.map((chat) => (
                  <motion.div
                    key={chat.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SidebarMenuItem>
                      <div
                        onClick={() => loadChat(chat.id)}
                        className={cn(
                          'group relative flex cursor-pointer items-center gap-2 p-3 transition-all duration-200',
                          'hover:bg-sidebar-accent/50',
                          currentChatId === chat.id && 'bg-sidebar-accent'
                        )}
                      >
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                'rounded-lg p-1.5 transition-colors duration-200',
                                currentChatId === chat.id
                                  ? 'bg-blue-500/10 text-blue-500'
                                  : 'bg-sidebar-accent/50'
                              )}
                            >
                              <Icons.chathistory className="size-4" />
                            </div>
                            <div className="line-clamp-1 text-sm">
                              {editingChatId === chat.id ? (
                                <Input
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  onBlur={() => handleSaveName(chat.id)}
                                  onKeyDown={(e) => handleKeyPress(e, chat.id)}
                                  onClick={(e) => e.stopPropagation()}
                                  className="h-7 text-sm"
                                  autoFocus
                                />
                              ) : (
                                chat.name ||
                                chat.messages[0]?.content ||
                                'Empty chat'
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePinChat(chat.id);
                              }}
                              className={cn(
                                'rounded-md p-1 opacity-0 transition-opacity hover:bg-sidebar-accent/50 group-hover:opacity-100',
                                chat.isPinned && 'text-blue-500 opacity-100'
                              )}
                            >
                              <svg
                                className="h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  fillRule="evenodd"
                                  d="m16.475 4.375l3.172 3.176c1.008 1.008 1.824 1.825 2.35 2.535c.541.73.891 1.5.701 2.377c-.19.879-.826 1.434-1.62 1.875c-.773.429-1.854.835-3.187 1.336l-1.977.743c-.795.298-1.011.391-1.172.53q-.12.106-.216.237c-.124.173-.197.397-.422 1.216l-.013.045c-.228.831-.417 1.517-.624 2.032c-.21.523-.493 1.018-1.002 1.309a2.34 2.34 0 0 1-1.16.307c-.587 0-1.078-.292-1.519-.642c-.434-.346-.936-.85-1.545-1.46l-1.588-1.588l-4.122 4.127a.75.75 0 0 1-1.062-1.06l4.124-4.128l-1.535-1.537C3.453 15.2 2.954 14.7 2.61 14.268c-.349-.438-.638-.926-.642-1.508a2.34 2.34 0 0 1 .313-1.182c.29-.505.782-.786 1.302-.995c.512-.205 1.193-.393 2.018-.62l.045-.013c.82-.226 1.045-.3 1.217-.424q.135-.097.242-.222c.138-.163.23-.38.523-1.18l.716-1.956c.495-1.349.895-2.442 1.32-3.222c.437-.803.99-1.448 1.872-1.642c.882-.195 1.655.158 2.389.702c.712.53 1.535 1.353 2.55 2.369M13.03 3.21c-.602-.448-.921-.498-1.171-.443s-.519.235-.878.895c-.365.67-.729 1.658-1.25 3.081L9.036 8.64l-.04.108c-.233.64-.414 1.136-.75 1.529q-.224.264-.506.467c-.42.302-.927.441-1.585.622l-.11.03c-.882.243-1.48.41-1.903.58c-.425.17-.527.29-.562.35a.84.84 0 0 0-.112.424c0 .07.03.225.316.584c.284.357.722.797 1.368 1.444l4.117 4.12c.65.652 1.093 1.093 1.452 1.38c.36.286.516.315.585.315a.83.83 0 0 0 .416-.11c.06-.034.181-.136.353-.564s.338-1.03.582-1.917l.03-.11c.18-.657.32-1.164.62-1.583q.197-.274.453-.496c.39-.337.882-.522 1.519-.76l.107-.04l1.917-.72c1.408-.53 2.383-.898 3.046-1.266c.651-.361.829-.63.883-.88c.054-.251.003-.57-.44-1.168c-.452-.61-1.187-1.349-2.251-2.413L15.459 5.48c-1.071-1.072-1.816-1.814-2.429-2.27"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <div className="cursor-pointer rounded-md p-1 opacity-0 transition-opacity hover:bg-sidebar-accent/50 group-hover:opacity-100">
                                  <MoreVertical className="h-4 w-4" />
                                </div>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditName(chat);
                                  }}
                                >
                                  <Icons.pen className="mr-2 h-4 w-4" />
                                  Edit name
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteChat(chat.id);
                                  }}
                                >
                                  <svg
                                    className="mr-2 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeWidth={1.5}
                                      d="M9.17 4a3.001 3.001 0 0 1 5.66 0m5.67 2h-17m15.333 2.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79s-2.196.81-4.856.81h-.774c-2.66 0-3.991 0-4.856-.81c-.865-.809-.954-2.136-1.13-4.79l-.46-6.9M9.5 11l.5 5m4.5-5l-.5 5"
                                    />
                                  </svg>
                                  Delete chat
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        {currentChatId === chat.id && (
                          <motion.div
                            layoutId="activeChatIndicator"
                            className="absolute bottom-0 left-0 top-0 w-1 rounded-r-full bg-blue-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                      </div>
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </div>
            ))}
          </SidebarMenu>
        </AnimatePresence>
        {chatHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground"
          >
            <div className="mb-3 rounded-full bg-sidebar-accent/50 p-3">
              <Sparkles className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium">No chat history yet</p>
            <p className="mt-1 text-xs">Start a new chat to begin</p>
          </motion.div>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
