'use client';

import { Button } from '@/components/ui/button';
import { Plus, Send } from 'lucide-react';

export default function OutboundPage() {
  const campaigns = [
    { id: '1', name: 'Monthly Follow-up', agent: 'Support Bot', contacts: 250, status: 'completed', date: '2024-04-01' },
    { id: '2', name: 'Survey Campaign', agent: 'Sales Bot', contacts: 500, status: 'running', date: '2024-04-05' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 z-40 bg-white">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Outbound Campaigns</h1>
            <p className="text-gray-600 mt-1">Make outbound calls with your AI agents</p>
          </div>
          <Button className="bg-black text-white hover:bg-gray-900 gap-2 font-bold">
            <Plus size={18} /> Create Campaign
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {campaigns.length > 0 ? (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Campaign</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Agent</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Contacts</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{campaign.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{campaign.agent}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{campaign.contacts}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded ${
                          campaign.status === 'running'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{campaign.date}</td>
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
        ) : (
          <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <Send size={48} className="text-gray-400 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No campaigns</h3>
            <p className="text-gray-600 mt-2 text-center">Create your first outbound campaign to reach your contacts</p>
          </div>
        )}
      </div>
    </div>
  );
}
