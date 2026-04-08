"use client";

import { useState, useEffect, use } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Bot, 
  ArrowLeft,
  FileText,
  BarChart3,
  Wrench,
  TestTube2,
  Layout,
  Lock,
  Zap,
  Settings,
  Plus,
  Copy,
  CopyCheck,
  Radio,
  Loader2
} from "lucide-react";
import Link from 'next/link';

interface TabNavProps {
  tabs: Array<{ id: string; label: string; icon?: React.ReactNode }>;
  active: string;
  onTabChange: (tab: string) => void;
}

function TabNav({ tabs, active, onTabChange }: TabNavProps) {
  return (
    <div className="flex items-center gap-0 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-all ${
            active === tab.id
              ? 'border-black text-black'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [agent, setAgent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('agent');
  const [isSaving, setIsSaving] = useState(false);
  const [docs, setDocs] = useState<any[]>([]);
  const [isIngesting, setIsIngesting] = useState(false);

  useEffect(() => {
    if (activeTab === 'knowledge') {
      fetch(`/api/rag/documents?agentId=${id}`)
        .then(res => res.json())
        .then(data => setDocs(Array.isArray(data) ? data : []));
    }
  }, [activeTab, id]);

  const handleIngest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsIngesting(true);
    const formData = new FormData(e.currentTarget);
    const payload = {
      agentId: id,
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
        setDocs(prev => [...prev, newDoc]);
      }
      (e.target as any).reset();
    } finally {
      setIsIngesting(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch(`/api/agents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: agent.name,
          persona: agent.persona,
          model: agent.model
        })
      });
    } catch (err) {
      console.error("Failed to save agent", err);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetch(`/api/agents/${id}`)
      .then(res => res.json())
      .then(data => {
        setAgent(data);
      })
      .catch(() => {
        setAgent({ name: 'Front Desk Receptionist', model: 'gpt-4', id });
      });
  }, [id]);

  if (!agent) return <div className="p-8">Loading agent...</div>;

  const tabs = [
    { id: 'agent', label: 'Agent' },
    { id: 'workflow', label: 'Workflow' },
    { id: 'knowledge', label: 'Knowledge Base' },
    { id: 'analysis', label: 'Analysis' },
    { id: 'tools', label: 'Tools' },
    { id: 'tests', label: 'Tests' },
    { id: 'widget', label: 'Widget' },
    { id: 'security', label: 'Security' },
    { id: 'advanced', label: 'Advanced' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 z-40 bg-white">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/agents" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft size={20} />
            </Link>
            <Input 
              value={agent.name || ''} 
              onChange={(e) => setAgent({ ...agent, name: e.target.value })}
              className="text-xl font-bold text-gray-900 max-w-[300px] border-transparent hover:border-gray-300 focus:border-black px-2 h-auto py-1 shadow-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="text-gray-700">Public</Button>
            <Button variant="outline" size="sm" className="text-gray-700">Variables</Button>
            <Button variant="outline" size="sm" className="text-gray-700">Enable Versioning</Button>
            <Button size="sm" onClick={handleSave} disabled={isSaving} className="bg-black text-white hover:bg-gray-900">
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            <Button size="sm" className="bg-white text-black border border-gray-200 hover:bg-gray-50">Preview</Button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <Settings size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <TabNav tabs={tabs} active={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Agent Tab */}
          {activeTab === 'agent' && (
            <div className="space-y-8">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Agent</h2>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gray-900 text-white">New</Badge>
                    <span className="text-gray-600">View new features</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                {/* Left: Configuration */}
                <div className="col-span-2 space-y-6">
                  {/* System Prompt */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">System prompt</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 underline">Type {'{{'} to add variables</span>
                      </div>
                      <Textarea 
                        value={agent.persona || ''}
                        onChange={(e) => setAgent({ ...agent, persona: e.target.value })}
                        className="min-h-[200px] border-gray-300 bg-white text-gray-900"
                      />
                    </div>
                  </div>

                  {/* First Message */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">First message</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      The first message the agent will say. If empty, the agent will wait for the user to start the conversation.
                    </p>
                    <Textarea 
                      defaultValue="Hi, thanks for calling... this is Sam, how can I help you?"
                      className="min-h-[100px] border-gray-300 bg-white text-gray-900"
                    />
                  </div>
                </div>

                {/* Right: Voices */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Voices</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Select the ElevenLabs voices you want to use for the agent.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <Radio className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Siren - natural realistic...</p>
                          <p className="text-xs text-gray-600">Primary</p>
                        </div>
                      </div>
                      <button className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">
                        <Plus size={16} /> Add additional voice
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-bold text-gray-900 mb-3">Language</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Choose the default and additional languages the agent will communicate in.
                    </p>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
                      <div className="flex items-center gap-2">
                        <span>🇺🇸 English</span>
                        <Badge variant="outline">Default</Badge>
                      </div>
                      <ChevronRight size={16} />
                    </div>
                    <button className="w-full mt-3 text-sm text-gray-600 hover:text-gray-900">
                      + Add additional languages
                    </button>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-bold text-gray-900 mb-3">LLM</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Select which provider and model to use for the LLM.
                    </p>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
                      <span className="font-medium">{agent.model || 'gpt-4o'}</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Workflow Tab */}
          {activeTab === 'workflow' && (
            <div className="text-center py-12">
              <Wrench size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Workflow Configuration</h3>
              <p className="text-gray-600">Workflow setup coming soon</p>
            </div>
          )}

          {/* Knowledge Base Tab */}
          {activeTab === 'knowledge' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Knowledge Base</h2>
                  <p className="text-gray-600">These documents are used to ground the agent's responses.</p>
                </div>
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
                        <DialogDescription>Ingest new text data into this agent's knowledge base.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Document Title</Label>
                          <Input id="title" name="title" placeholder="Context Reference" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="sourceUrl">Source URL (Optional)</Label>
                          <Input id="sourceUrl" name="sourceUrl" placeholder="https://..." />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="content">Content</Label>
                          <Textarea id="content" name="content" placeholder="Paste data here..." className="min-h-[200px]" required />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" disabled={isIngesting}>
                          {isIngesting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Ingest
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {docs.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white hover:shadow-sm transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-50 rounded flex items-center justify-center text-gray-500">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{doc.title}</p>
                        <p className="text-xs text-gray-400">Added {new Date(doc.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 uppercase text-[10px] font-bold">Indexed</Badge>
                  </div>
                ))}
                {docs.length === 0 && (
                  <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-xl">
                    <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium">No documents connected yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <div className="text-center py-12">
              <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Analysis & Analytics</h3>
              <p className="text-gray-600">View analytics and insights</p>
            </div>
          )}

          {/* Tools Tab */}
          {activeTab === 'tools' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Agent Tools</h2>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-full font-medium text-gray-900">
                  Tools
                </span>
                <span className="px-4 py-2 border border-gray-300 rounded-full font-medium text-gray-900">
                  MCP
                </span>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
                <Wrench size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">No MCP servers found</h3>
                <p className="text-gray-600 mb-6">This agent has no connected MCP servers yet.</p>
                <Button className="bg-black text-white hover:bg-gray-900">Add server</Button>
              </div>

              <div className="flex justify-end">
                <Button className="bg-black text-white hover:bg-gray-900">Add server</Button>
              </div>
            </div>
          )}

          {/* Tests Tab */}
          {activeTab === 'tests' && (
            <div className="text-center py-12">
              <TestTube2 size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Test Cases</h3>
              <p className="text-gray-600">Create and manage test cases</p>
            </div>
          )}

          {/* Widget Tab */}
          {activeTab === 'widget' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900">Widget</h2>

              <div className="grid grid-cols-2 gap-8">
                {/* Setup */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Setup</h3>
                  <p className="text-gray-600 mb-4">Attach the widget on your website.</p>
                  <Button variant="outline" className="gap-2">
                    <FileText size={16} />
                    Learn how to embed your voice agent anywhere
                  </Button>
                </div>

                {/* Embed Code */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Embed code</h3>
                  <p className="text-gray-600 mb-4">
                    Add the following snippet to the pages where you want the conversation widget to be.
                  </p>
                  <div className="bg-gray-900 text-white p-4 rounded font-mono text-sm overflow-x-auto mb-4">
                    &lt;elevenlabs-convai agent-id=&quot;agent_061kfab5b6fma91d7vqpy1&quot;&gt;&lt;/elevenlabs-convai&gt;
                  </div>
                  <Button variant="outline" className="gap-2" size="sm">
                    <CopyCheck  size={16} />
                    Copy
                  </Button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Interface</h3>
                <p className="text-gray-600 mb-6">Configure the parts of the widget interface.</p>

                <div className="space-y-4">
                  {[
                    { label: 'Feedback collection', desc: 'Callers can rate their satisfaction from 1 to 5 and optionally leave a comment after the conversation.' },
                    { label: 'Chat (text-only) mode', desc: '' },
                    { label: 'Send text while on call', desc: '' },
                    { label: 'Realtime transcript of the call', desc: '' },
                    { label: 'Language dropdown', desc: '' },
                    { label: 'Mute button', desc: '' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.label}</p>
                        {item.desc && <p className="text-sm text-gray-600 mt-1">{item.desc}</p>}
                      </div>
                      <Toggle className="ml-4" defaultPressed={i < 2} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="text-center py-12">
              <Lock size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Security Settings</h3>
              <p className="text-gray-600">Manage security and access controls</p>
            </div>
          )}

          {/* Advanced Tab */}
          {activeTab === 'advanced' && (
            <div className="text-center py-12">
              <Zap size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Advanced Settings</h3>
              <p className="text-gray-600">Configure advanced options</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChevronRight({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}
