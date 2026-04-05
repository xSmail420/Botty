'use client';

import { Button } from '@/components/ui/button';
import { Plus, Phone } from 'lucide-react';

export default function PhonePage() {
  const numbers = [
    { id: '1', number: '+1 (555) 123-4567', agent: 'Support Bot', status: 'active', provider: 'Twilio' },
    { id: '2', number: '+1 (555) 234-5678', agent: 'Sales Bot', status: 'active', provider: 'Twilio' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 z-40 bg-white">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Phone Numbers</h1>
            <p className="text-gray-600 mt-1">Deploy your agents as phone numbers</p>
          </div>
          <Button className="bg-black text-white hover:bg-gray-900 gap-2 font-bold">
            <Plus size={18} /> Add Phone Number
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {numbers.length > 0 ? (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Phone Number</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Agent</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Provider</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody>
                {numbers.map((num) => (
                  <tr key={num.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{num.number}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{num.agent}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs font-bold text-gray-700">{num.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{num.provider}</td>
                    <td className="px-6 py-4">
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        Manage
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <Phone size={48} className="text-gray-400 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No phone numbers</h3>
            <p className="text-gray-600 mt-2 text-center">Add a phone number to deploy your agent for voice calls</p>
          </div>
        )}
      </div>
    </div>
  );
}
