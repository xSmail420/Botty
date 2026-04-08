'use client';
import { useState, useEffect } from 'react';
import { Database, Plus, Upload, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function KnowledgeBasePage() {
  const [docs, setDocs] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isIngesting, setIsIngesting] = useState(false);
  const tenantId = 'default-tenant';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docsRes, agentsRes] = await Promise.all([
          fetch(`/api/rag/documents?tenantId=${tenantId}`),
          fetch(`/api/agents?tenantId=${tenantId}`),
        ]);
        const documents = await docsRes.json();
        const agentsList = await agentsRes.json();
        setDocs(Array.isArray(documents) ? documents : []);
        setAgents(Array.isArray(agentsList) ? agentsList : []);
      } catch (err) {
        console.error('Failed to fetch knowledge data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleIngest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsIngesting(true);
    const formData = new FormData(e.currentTarget);
    const payload = {
      agentId: formData.get('agentId'),
      title: formData.get('title'),
      content: formData.get('content'),
      sourceUrl: formData.get('sourceUrl'),
    };

    try {
      const res = await fetch('/api/rag/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const newDoc = await res.json();
      if (newDoc.id) {
        setDocs((prev) => [...prev, newDoc]);
      }
      (e.target as any).reset();
    } finally {
      setIsIngesting(false);
    }
  };

  if (loading)
    return (
      <div className="p-8">
        <Loader2 className="animate-spin" /> Loading Knowledge Base...
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 z-40 bg-white">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
            <p className="text-gray-600 mt-1">
              Manage documents and knowledge sources for your agents
            </p>
          </div>
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-black text-white hover:bg-gray-900 gap-2 font-bold">
                  <Plus size={18} /> Add Document
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <form onSubmit={handleIngest}>
                  <DialogHeader>
                    <DialogTitle>Add Document</DialogTitle>
                    <DialogDescription>
                      Ingest new text data into an agent's knowledge base.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="agentId">Target Agent</Label>
                      <Select name="agentId" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an agent" />
                        </SelectTrigger>
                        <SelectContent>
                          {agents.map((agent) => (
                            <SelectItem key={agent.id} value={agent.id}>
                              {agent.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="title">Document Title</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Company Overview"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="sourceUrl">Source URL (Optional)</Label>
                      <Input
                        id="sourceUrl"
                        name="sourceUrl"
                        placeholder="https://example.com/about"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        name="content"
                        placeholder="Paste your document content here..."
                        className="min-h-[200px]"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={isIngesting}>
                      {isIngesting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Ingest Document
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">
              Total Documents
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {docs.length}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">
              Sync Status
            </p>
            <p className="text-2xl font-bold text-green-600 mt-2">
              Operational
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">
              Total Agents
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {agents.length}
            </p>
          </div>
        </div>

        {/* Documents Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-gray-50 border-b border-gray-200 p-4 flex gap-4">
            <div className="flex-1 relative">
              <Input
                placeholder="Search documents by title..."
                className="border-gray-300 bg-white text-gray-900 pl-4"
              />
            </div>
          </div>

          <table className="w-full">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">
                  Document Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-widest">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-600">
                      <FileText size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{doc.title}</p>
                      {doc.sourceUrl && (
                        <p className="text-[10px] text-gray-400 truncate max-w-[200px]">
                          {doc.sourceUrl}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-bold text-gray-700">
                      TEXT
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 rounded text-[10px] font-bold bg-green-100 text-green-700">
                      INDEXED
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-tight">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {docs.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-20 text-center text-gray-400">
                    No documents found in the knowledge base.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
