'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HelpCircle, Mail, MessageCircle, ChevronRight } from 'lucide-react';

export default function HelpPage() {
  const articles = [
    { id: '1', title: 'Getting Started', description: 'Learn the basics of creating your first AI agent', icon: HelpCircle },
    { id: '2', title: 'Agent Configuration', description: 'Detailed guide on configuring agent behavior and responses', icon: HelpCircle },
    { id: '3', title: 'Deployment Options', description: 'Explore different ways to deploy your agents', icon: HelpCircle },
    { id: '4', title: 'Integration Guide', description: 'Connect your agents with external services', icon: HelpCircle },
    { id: '5', title: 'Best Practices', description: 'Tips and strategies for optimal agent performance', icon: HelpCircle },
    { id: '6', title: 'Troubleshooting', description: 'Common issues and how to resolve them', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 z-40 bg-white">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-gray-600 mt-1">Find answers and get support for your questions</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Search */}
        <div className="mb-12">
          <div className="relative">
            <Input
              placeholder="Search help articles, documentation..."
              className="border-gray-300 bg-white text-gray-900 text-lg py-3 pl-12 max-w-2xl"
            />
            <HelpCircle size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-lg transition-all">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 mb-4">
              <MessageCircle size={20} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600 mb-4">Chat with our support team in real-time</p>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 w-full font-bold">
              Start Chat
            </Button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-lg transition-all">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 mb-4">
              <Mail size={20} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
            <p className="text-sm text-gray-600 mb-4">Get help via email at your convenience</p>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 w-full font-bold">
              Send Email
            </Button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-lg transition-all">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 mb-4">
              <HelpCircle size={20} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Documentation</h3>
            <p className="text-sm text-gray-600 mb-4">Browse our complete documentation</p>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 w-full font-bold">
              View Docs
            </Button>
          </div>
        </div>

        {/* Articles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Knowledge Base</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-lg transition-all group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                    <article.icon size={20} />
                  </div>
                  <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-sm text-gray-600">{article.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
