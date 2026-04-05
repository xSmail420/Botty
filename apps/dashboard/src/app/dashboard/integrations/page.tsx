'use client';

import { Button } from '@/components/ui/button';
import { Plus, Puzzle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function IntegrationsPage() {
  const integrations = [
    { id: '1', name: 'Stripe', status: 'connected', category: 'Payments' },
    { id: '2', name: 'Slack', status: 'available', category: 'Communication' },
    { id: '3', name: 'Google Sheets', status: 'available', category: 'Productivity' },
    { id: '4', name: 'Salesforce', status: 'available', category: 'CRM' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 z-40 bg-white">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              Integrations
              <Badge className="bg-gray-900 text-white">Alpha</Badge>
            </h1>
            <p className="text-gray-600 mt-1">Connect your favorite tools and services</p>
          </div>
          <Button className="bg-black text-white hover:bg-gray-900 gap-2 font-bold">
            <Plus size={18} /> Explore Integrations
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-lg transition-all text-center"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto text-gray-600 mb-4">
                <Puzzle size={24} />
              </div>
              <h3 className="font-bold text-gray-900">{integration.name}</h3>
              <p className="text-xs text-gray-600 mt-2 uppercase tracking-widest">{integration.category}</p>
              <div className="mt-4">
                {integration.status === 'connected' ? (
                  <div className="flex items-center justify-center gap-2 p-2 bg-green-50 rounded text-xs font-bold text-green-700">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                    Connected
                  </div>
                ) : (
                  <Button variant="outline" size="sm" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-bold">
                    Connect
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
