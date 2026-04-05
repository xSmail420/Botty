'use client';

import { Phone, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ConversationsPage() {
  const conversations = [
    { id: 1, agent: 'Front Desk Receptionist', caller: '+1 (555) 123-4567', duration: '5m 23s', status: 'completed', date: '2024-04-05' },
    { id: 2, agent: 'Customer Support Bot', caller: '+1 (555) 987-6543', duration: '8m 15s', status: 'completed', date: '2024-04-05' },
    { id: 3, agent: 'Sales Assistant', caller: '+1 (555) 456-7890', duration: '3m 45s', status: 'completed', date: '2024-04-04' },
    { id: 4, agent: 'Support Bot', caller: '+1 (555) 234-5678', duration: '2m 10s', status: 'completed', date: '2024-04-04' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 z-40 bg-white">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Conversations</h1>
          <p className="text-gray-600 mt-1">View and analyze all agent conversations</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search conversations..."
              className="pl-10 border-gray-300 bg-white text-gray-900"
            />
          </div>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 gap-2 font-bold">
            <Filter size={18} /> Filters
          </Button>
        </div>

        {/* Conversations Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Agent</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Caller</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Duration</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody>
              {conversations.map((conv) => (
                <tr key={conv.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{conv.agent}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    {conv.caller}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{conv.duration}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{conv.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">
                      {conv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
          <span>Showing 4 of 42 conversations</span>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Previous
            </Button>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
