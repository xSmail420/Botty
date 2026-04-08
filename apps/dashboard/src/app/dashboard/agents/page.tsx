"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Bot, Settings, MessageSquare, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Agent {
  id: string;
  name: string;
  model: string;
  _count?: { messages: number; documents: number };
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const tenantId = "default-tenant";

  useEffect(() => {
    fetch(`/api/agents?tenantId=${tenantId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAgents(data);
        } else {
          setAgents([]);
        }
      })
      .catch(err => {
        console.error("Failed to fetch agents", err);
        setAgents([]);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this agent?')) return;
    try {
      await fetch(`/api/agents/${id}`, { method: 'DELETE' });
      setAgents(agents.filter(a => a.id !== id));
    } catch (err) {
      console.error("Failed to delete agent", err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 z-40 bg-white">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agents</h1>
            <p className="text-gray-600 mt-1">Manage your AI agents and their configurations</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 font-bold">
              Import Agent
            </Button>
            <Link href="/dashboard/agents/new">
              <Button className="bg-black text-white hover:bg-gray-900 font-bold gap-2">
                <Plus size={18} /> Create Agent
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Link key={agent.id} href={`/dashboard/agents/${agent.id}`}>
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer group overflow-hidden relative">
                {/* Accent line on hover */}
                <div className="absolute top-0 left-0 w-1 h-full bg-black opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 group-hover:bg-black group-hover:text-white transition-all">
                      <Bot size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate">{agent.name}</h3>
                      <p className="text-xs text-gray-600 uppercase tracking-wider font-bold mt-1">
                        {agent.model.split('/').pop() || agent.model}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <button className="p-1 rounded hover:bg-gray-100 text-gray-600">
                        <MoreHorizontal size={18} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(agent.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 uppercase font-bold tracking-wider">Conversations</span>
                    <span className="text-lg font-bold text-gray-900">{agent._count?.messages || 0}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium text-gray-600">Active</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button variant="ghost" className="w-full text-gray-700 hover:bg-gray-100 justify-start gap-2 font-bold h-9">
                  <Settings size={16} /> Configure
                </Button>
              </div>
            </Link>
          ))}

          {agents.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-400 border border-gray-200">
                <Bot size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-900">No agents created</h3>
                <p className="text-gray-600 max-w-xs mx-auto">Create your first AI assistant to start managing conversations.</p>
              </div>
              <Link href="/dashboard/agents/new">
                <Button className="bg-black text-white hover:bg-gray-900 font-bold gap-2 mt-2">
                  <Plus size={18} /> Create First Agent
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
