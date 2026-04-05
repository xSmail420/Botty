'use client';

import { Button } from '@/components/ui/button';
import { Plus, Zap, FileText } from 'lucide-react';

export default function ToolsPage() {
  const tools = [
    { id: '1', name: 'API Request', description: 'Make HTTP API requests', status: 'active' },
    { id: '2', name: 'Email Sender', description: 'Send emails via SMTP', status: 'active' },
    { id: '3', name: 'Database Query', description: 'Execute SQL queries', status: 'active' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 z-40 bg-white">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tools</h1>
            <p className="text-gray-600 mt-1">Manage tools and capabilities available to your agents</p>
          </div>
          <Button className="bg-black text-white hover:bg-gray-900 gap-2 font-bold">
            <Plus size={18} /> Create Tool
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.length > 0 ? (
            tools.map((tool) => (
              <div key={tool.id} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                    <Zap size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{tool.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs font-medium text-gray-600">{tool.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <Zap size={48} className="text-gray-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">No tools created</h3>
              <p className="text-gray-600 mt-2 text-center">Create your first custom tool to extend agent capabilities</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
