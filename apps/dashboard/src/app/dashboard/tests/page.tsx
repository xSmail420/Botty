'use client';

import { Button } from '@/components/ui/button';
import { Plus, TestTube2 } from 'lucide-react';

export default function TestsPage() {
  const tests = [
    { id: '1', name: 'Support Bot Greeting', agent: 'Support Bot', status: 'passed', date: '2024-04-01' },
    { id: '2', name: 'Escalation Flow', agent: 'Support Bot', status: 'passed', date: '2024-04-01' },
    { id: '3', name: 'FAQ Response', agent: 'Support Bot', status: 'failed', date: '2024-03-31' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 z-40 bg-white">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tests</h1>
            <p className="text-gray-600 mt-1">Create and manage test cases for your agents</p>
          </div>
          <Button className="bg-black text-white hover:bg-gray-900 gap-2 font-bold">
            <Plus size={18} /> Create Test
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Test Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Agent</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{test.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{test.agent}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded ${
                        test.status === 'passed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {test.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{test.date}</td>
                  <td className="px-6 py-4">
                    <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
