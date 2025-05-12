'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '@/components/icons';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Bell, X } from 'lucide-react';
import Link from 'next/link';

// Simple time formatter to replace date-fns
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

const mockNotifications = [
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
];

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
    <>
      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="relative z-40" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="relative flex items-center justify-center"
          aria-label="Notifications"
        >
          <Icons.notification className="size-6" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        {isOpen && (
          <div className="fixed right-[20px] top-[72px] z-50 w-[calc(100vw-40px)] rounded-lg border border-gray-200 bg-white p-4 shadow-xl md:absolute md:right-0 md:top-auto md:mt-2 md:w-80">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="max-h-[calc(100vh-250px)] overflow-y-auto md:max-h-80">
              {notifications.length > 0 ? (
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`relative flex gap-3 rounded-lg p-3 ${
                        notification.read ? 'bg-gray-50' : 'bg-blue-50'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between">
                          <p className="font-medium">{notification.title}</p>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="ml-2 text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          {notification.message}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="mr-1 h-4 w-4">
                              <AvatarImage
                                src={notification.avatar}
                                alt={notification.course}
                              />
                              <AvatarFallback>
                                {notification.course.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-500">
                              {notification.course}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(notification.time)}
                          </span>
                        </div>
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="mt-2 text-xs text-blue-600 hover:underline"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6">
                  <Bell className="mb-2 h-12 w-12 text-gray-300" />
                  <p className="text-gray-500">No notifications</p>
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="mt-3 text-center">
                <Link
                  href="/dashboard/notifications"
                  className="text-sm text-blue-600 hover:underline"
                >
                  View all notifications
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationDropdown;
