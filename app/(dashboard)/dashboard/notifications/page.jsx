'use client';
import React, { useState } from 'react';
import { Icons } from '@/components/icons';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bell, X } from 'lucide-react';
import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';
import { Input } from '@/components/ui/input';

// Simple time formatter
const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1)
    return `${interval} minute${interval === 1 ? '' : 's'} ago`;

  return `${Math.floor(seconds)} second${seconds === 1 ? '' : 's'} ago`;
};

// Mock notifications data - same as in the dropdown component
const initialNotifications = [
  {
    id: 1,
    title: 'Assignment Due',
    message: 'Your "Law Ethics" assignment is due in 24 hours',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    type: 'assignment',
    course: 'Law Class',
    avatar: '/placeholder.svg',
  },
  {
    id: 2,
    title: 'Quiz Result',
    message: 'You scored 92% on your Politics midterm exam',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    type: 'result',
    course: 'Politics Class',
    avatar: '/placeholder.svg',
  },
  {
    id: 3,
    title: 'New Course Material',
    message: 'New lecture slides have been uploaded for English Class',
    time: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: false,
    type: 'material',
    course: 'English Class',
    avatar: '/placeholder.svg',
  },
  {
    id: 4,
    title: 'Upcoming Session',
    message:
      "Don't forget your live session for Law Class tomorrow at 10:00 AM",
    time: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    read: true,
    type: 'reminder',
    course: 'Law Class',
    avatar: '/placeholder.svg',
  },
  {
    id: 5,
    title: 'Grade Updated',
    message: 'Your English Class paper has been graded. You received an A-.',
    time: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
    read: true,
    type: 'result',
    course: 'English Class',
    avatar: '/placeholder.svg',
  },
  {
    id: 6,
    title: 'New Discussion',
    message:
      'Join the discussion topic "Future of Artificial Intelligence in Law" in your Law Class forum.',
    time: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5 days ago
    read: false,
    type: 'material',
    course: 'Law Class',
    avatar: '/placeholder.svg',
  },
  {
    id: 7,
    title: 'System Maintenance',
    message:
      'The learning platform will be down for maintenance on Sunday from 2-4 AM EST.',
    time: new Date(Date.now() - 1000 * 60 * 60 * 144), // 6 days ago
    read: true,
    type: 'reminder',
    course: 'System',
    avatar: '/placeholder.svg',
  },
  {
    id: 8,
    title: 'New Course Available',
    message:
      'A new elective course "Introduction to Data Science" is now available for registration.',
    time: new Date(Date.now() - 1000 * 60 * 60 * 168), // 7 days ago
    read: true,
    type: 'material',
    course: 'System',
    avatar: '/placeholder.svg',
  },
];

const NotificationsPage = () => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications
    .filter((notification) => {
      if (filter === 'all') return true;
      if (filter === 'unread') return !notification.read;
      return notification.type === filter;
    })
    .filter((notification) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query) ||
        notification.course.toLowerCase().includes(query)
      );
    });

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'assignment':
        return <Icons.bookopen className="h-6 w-6 text-blue-600" />;
      case 'result':
        return <Icons.gradreport className="h-6 w-6 text-green-600" />;
      case 'material':
        return <Icons.alltutorial className="h-6 w-6 text-purple-600" />;
      case 'reminder':
        return <Icons.watch className="h-6 w-6 text-orange-600" />;
      default:
        return <Icons.notification className="h-6 w-6 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-sm text-gray-500">Manage your notifications</p>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <div className="relative w-80">
            <Icons.search className="absolute left-3 top-1/2 size-[18px] -translate-y-1/2 transform text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-full border-gray-800/10 pl-10"
              placeholder="Quick Search"
            />
          </div>
          <div className="flex items-center space-x-3">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: '35px',
                    height: '35px',
                  },
                },
              }}
            />
            {user ? (
              <div className="flex flex-col space-y-0.5">
                <h2 className="text-sm">{user.fullName || 'User'}</h2>
                <p className="text-xs text-neutral-500">
                  {user.primaryEmailAddress?.emailAddress || 'No email'}
                </p>
              </div>
            ) : (
              <div className="flex flex-col space-y-0.5">
                <h2 className="text-sm">Loading...</h2>
                <p className="text-xs text-neutral-500">Loading email...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filters and actions */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            className={filter === 'all' ? '' : 'hover:bg-gray-200'}
          >
            All
          </Button>
          <Button
            onClick={() => setFilter('unread')}
            variant={filter === 'unread' ? 'default' : 'outline'}
            className={filter === 'unread' ? '' : 'hover:bg-gray-200'}
          >
            Unread ({unreadCount})
          </Button>
          <Button
            onClick={() => setFilter('assignment')}
            variant={filter === 'assignment' ? 'default' : 'outline'}
            className={filter === 'assignment' ? '' : 'hover:bg-gray-200'}
          >
            Assignments
          </Button>
          <Button
            onClick={() => setFilter('result')}
            variant={filter === 'result' ? 'default' : 'outline'}
            className={filter === 'result' ? '' : 'hover:bg-gray-200'}
          >
            Results
          </Button>
        </div>
        {unreadCount > 0 && (
          <Button
            onClick={markAllAsRead}
            variant="link"
            className="h-auto p-0 text-blue-600"
          >
            <Icons.check className="mr-2 h-5 w-5" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Notifications list */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-lg border p-4 ${
                notification.read ? 'bg-white' : 'border-blue-200 bg-blue-50'
              }`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  {getTypeIcon(notification.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{notification.title}</h3>
                      <p className="mt-1 text-gray-600">
                        {notification.message}
                      </p>
                    </div>
                    <Button
                      onClick={() => deleteNotification(notification.id)}
                      variant="ghost"
                      size="icon"
                      className="ml-2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={notification.avatar}
                          alt={notification.course}
                        />
                        <AvatarFallback>
                          {notification.course.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-500">
                        {notification.course}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatTimeAgo(notification.time)}
                    </span>
                  </div>
                  {!notification.read && (
                    <Button
                      onClick={() => markAsRead(notification.id)}
                      variant="link"
                      className="mt-2 h-auto p-0 text-sm text-blue-600"
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border bg-white py-12 text-center">
            <Bell className="mx-auto mb-3 h-12 w-12 text-gray-300" />
            <h3 className="mb-1 text-lg font-medium text-gray-700">
              No notifications found
            </h3>
            <p className="text-gray-500">
              {searchQuery
                ? `No results match "${searchQuery}"`
                : filter !== 'all'
                  ? 'Try changing the filter'
                  : 'You have no notifications at the moment'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
