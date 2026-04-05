'use client';

import { useState } from 'react';
import { Database, Plus, Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function KnowledgeBasePage() {
  const [docs] = useState([
    { id: '1', name: 'Company_Handbook.pdf', type: 'PDF', status: 'indexed', tokens: '45.2k' },
    { id: '2', name: 'Product_Catalog_2026.csv', type: 'CSV', status: 'indexed', tokens: '128.9k' },
    { id: '3', name: 'Q4_Support_Logs.txt', type: 'TXT', status: 'processing', tokens: '12.4k' },
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 z-40 bg-white">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
            <p className="text-gray-600 mt-1">Manage documents and knowledge sources for your agents</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 gap-2">
              <Upload size={18} /> Bulk Upload
            </Button>
            <Button className="bg-black text-white hover:bg-gray-900 gap-2">
              <Plus size={18} /> Add Document
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Tokens', value: '186.5k' },
            { label: 'Documents', value: '12' },
            { label: 'Sync Status', value: 'All Clear' },
            { label: 'Storage Used', value: '4.2 MB' },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Documents Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 p-4 flex gap-4">
            <div className="flex-1 relative">
              <Input
                placeholder="Search documents..."
                className="border-gray-300 bg-white text-gray-900 pl-10"
              />
            </div>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Filter
            </Button>
          </div>

          <table className="w-full">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Document Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">Tokens</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => (
                <tr key={doc.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-600">
                      <FileText size={16} />
                    </div>
                    <span className="font-medium text-gray-900">{doc.name}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-700">{doc.type}</span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        doc.status === 'indexed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{doc.tokens}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
