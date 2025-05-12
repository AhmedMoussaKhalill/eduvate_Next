'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { chatApi } from '@/lib/api';
import toast from 'react-hot-toast';

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [error, setError] = useState(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  const sendMessage = async (content) => {
    if (!content.trim()) return;

    const newMessage = {
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);
    setError(null);

    try {
      console.log('Sending message:', content);
      const response = await chatApi.sendMessage(content, currentChatId);
      console.log('Received response:', response);

      if (!response || !response.content) {
        throw new Error('Invalid response from server');
      }

      const assistantMessage = {
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Update chat history
      if (currentChatId) {
        setChatHistory((prev) =>
          prev.map((chat) =>
            chat.id === currentChatId
              ? {
                  ...chat,
                  messages: [...chat.messages, newMessage, assistantMessage],
                }
              : chat
          )
        );
      } else {
        const newChat = {
          id: Date.now().toString(),
          name: content.slice(0, 30) + (content.length > 30 ? '...' : ''),
          messages: [...messages, newMessage, assistantMessage],
          createdAt: new Date().toISOString(),
          isPinned: false,
        };
        setChatHistory((prev) => [newChat, ...prev]);
        setCurrentChatId(newChat.id);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error.message || 'Failed to send message');
      toast.error(error.message || 'Failed to send message', {
        duration: 4000,
        position: 'top-right',
      });

      // Add error message to chat
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    setError(null);
  };

  const loadChat = (chatId) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);
      setError(null);
    }
  };

  const deleteChat = (chatId) => {
    setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) {
      startNewChat();
    }
  };

  const togglePinChat = (chatId) => {
    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, isPinned: !chat.isPinned } : chat
      )
    );
  };

  const updateChatName = (chatId, newName) => {
    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, name: newName } : chat
      )
    );
  };

  const value = {
    messages,
    isLoading,
    error,
    sendMessage,
    startNewChat,
    chatHistory,
    currentChatId,
    loadChat,
    deleteChat,
    togglePinChat,
    updateChatName,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
