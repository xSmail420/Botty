'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, ArrowRight, Zap, MessageSquare, Phone } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 z-40 bg-white">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to ElevenLabs. Manage your AI agents and integrations.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Active Agents', value: '5', icon: Zap },
            { label: 'Total Conversations', value: '1,234', icon: MessageSquare },
            { label: 'Avg Rating', value: '4.8', icon: '⭐' },
            { label: 'API Calls', value: '45.2K', icon: Phone },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className="text-3xl opacity-20">{typeof stat.icon === 'string' ? stat.icon : '📊'}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {[
            {
              title: 'Create Your First Agent',
              description: 'Set up an AI agent to handle customer interactions',
              action: 'Get Started',
              icon: '🤖',
            },
            {
              title: 'Embed Widget',
              description: 'Add the ElevenLabs widget to your website',
              action: 'Learn More',
              icon: '🔧',
            },
            {
              title: 'API Documentation',
              description: 'Integrate ElevenLabs with your application',
              action: 'Explore',
              icon: '📖',
            },
          ].map((card, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{card.description}</p>
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                {card.action}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          ))}
        </div>

        {/* Recent Agents */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Agents</h2>
            <Link href="/dashboard/agents/new">
              <Button className="bg-black text-white hover:bg-gray-900 gap-2">
                <Plus size={18} /> Create Agent
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[
              { name: 'Front Desk Receptionist', status: 'Active', conversations: 234 },
              { name: 'Customer Support Bot', status: 'Active', conversations: 156 },
              { name: 'Sales Assistant', status: 'Inactive', conversations: 89 },
            ].map((agent, i) => (
              <Link key={i} href={`/dashboard/agents/${i}`}>
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-gray-900">{agent.name}</h3>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded ${
                        agent.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {agent.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{agent.conversations} conversations</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
