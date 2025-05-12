'use client';
import React, { useState } from 'react';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const allFaqs = [
    {
      question: 'How do I get started?',
      answer:
        'To get started, navigate to the dashboard and follow the onboarding steps. You can access all features from the sidebar menu.',
    },
    {
      question: 'How can I contact support?',
      answer:
        'You can reach our support team through the contact form below or email us at support@example.com',
    },
    {
      question: 'What are the system requirements?',
      answer:
        'Our platform works best on modern browsers like Chrome, Firefox, Safari, or Edge. Make sure you have JavaScript enabled.',
    },
    {
      question: 'How do I reset my password?',
      answer:
        'Go to the login page and click on "Forgot Password". Follow the instructions sent to your email to reset your password.',
    },
    {
      question: 'Can I export my data?',
      answer:
        'Yes, you can export your data in CSV or JSON format from the Settings page under the "Data Management" section.',
    },
    {
      question: 'How do I upgrade my subscription?',
      answer:
        'You can upgrade your subscription from the Settings page under "Billing". Choose the plan that suits your needs and follow the payment instructions.',
    },
  ];

  // Filter FAQs based on search query
  const faqs =
    searchQuery.trim() !== ''
      ? allFaqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : showAllFaqs
        ? allFaqs
        : allFaqs.slice(0, 3); // Show only first 3 FAQs when not searching and not showing all

  // Resources data
  const resources = [
    {
      title: 'Quick Start Guide',
      category: 'Getting Started',
      url: '#quick-start',
    },
    {
      title: 'Account Setup',
      category: 'Getting Started',
      url: '#account-setup',
    },
    {
      title: 'Basic Features',
      category: 'Getting Started',
      url: '#basic-features',
    },
    {
      title: 'Contact Support',
      category: 'Support',
      url: '#contact-support',
    },
    {
      title: 'Report an Issue',
      category: 'Support',
      url: '#report-issue',
    },
    {
      title: 'System Status',
      category: 'Support',
      url: '#system-status',
    },
  ];

  // Filter resources based on search query
  const filteredResources =
    searchQuery.trim() === ''
      ? {
          'Getting Started': resources.filter(
            (r) => r.category === 'Getting Started'
          ),
          Support: resources.filter((r) => r.category === 'Support'),
        }
      : resources
          .filter(
            (resource) =>
              resource.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              resource.category
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
          .reduce((acc, resource) => {
            if (!acc[resource.category]) {
              acc[resource.category] = [];
            }
            acc[resource.category].push(resource);
            return acc;
          }, {});

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() === '') {
      setShowAllFaqs(false); // Reset to showing only 3 FAQs when search is cleared
    }
  };

  const handleShowAllFaqs = () => {
    setShowAllFaqs(true);
    setSearchQuery('');
  };

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Help Center</h1>

      {/* Search Section */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search for help..."
            className="w-full rounded-lg border border-gray-300 p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {searchQuery.trim() !== '' && (
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            {Object.values(filteredResources).flat().length + faqs.length}{' '}
            results for "{searchQuery}"
          </p>
        </div>
      )}

      {/* Quick Links */}
      {Object.keys(filteredResources).length > 0 && (
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {Object.entries(filteredResources).map(
            ([category, categoryResources]) =>
              categoryResources.length > 0 && (
                <div
                  key={category}
                  className="rounded-lg bg-white p-6 shadow-custom"
                >
                  <h2 className="mb-4 text-xl font-semibold">{category}</h2>
                  <ul className="space-y-2">
                    {categoryResources.map((resource, idx) => (
                      <li key={idx}>
                        <a
                          href={resource.url}
                          className="text-blue-600 hover:underline"
                        >
                          {resource.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
          )}
        </div>
      )}

      {/* FAQs Section */}
      {faqs.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-semibold">
            {searchQuery.trim() === ''
              ? 'Frequently Asked Questions'
              : 'Search Results'}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-6 shadow-custom"
              >
                <h3 className="mb-2 text-lg font-medium">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          {!showAllFaqs && searchQuery.trim() === '' && allFaqs.length > 3 && (
            <div className="mt-4 text-center">
              <button
                onClick={handleShowAllFaqs}
                className="text-blue-600 hover:underline"
              >
                View all {allFaqs.length} FAQs
              </button>
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {searchQuery.trim() !== '' &&
        faqs.length === 0 &&
        Object.values(filteredResources).flat().length === 0 && (
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
            <p className="text-gray-600">
              No results found for "{searchQuery}"
            </p>
            <p className="mt-2 text-gray-500">
              Try different keywords or check out our FAQs below
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-blue-600 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

      {/* Contact Section */}
      <div className="rounded-lg bg-white p-6 shadow-custom">
        <h2 className="mb-6 text-2xl font-semibold">Contact Support</h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="subject"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpCenter;
