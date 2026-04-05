"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Bot, 
  Settings, 
  MessageSquare, 
  FileText, 
  MoreHorizontal,
  Zap
} from "lucide-react";
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
      .then(data => setAgents(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Agent Fleet</h1>
          <p className="text-muted-foreground">Orchestrate and manage your specialized AI assistants.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="font-bold">Import Agent</Button>
          <Link href="/dashboard/agents/new">
            <Button className="font-bold">
              <Plus className="mr-2 h-4 w-4" /> Create New Agent
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map(agent => (
          <Card key={agent.id} className="border-none shadow-md hover:shadow-xl transition-all group relative overflow-hidden bg-card">
            {/* Visual accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Bot size={24} />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">{agent.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1.5 mt-0.5">
                    <Badge variant="secondary" className="px-1.5 py-0 text-[10px] uppercase font-bold tracking-tighter bg-primary/5 text-primary border-primary/10">
                      {agent.model.split('/').pop() || agent.model}
                    </Badge>
                  </CardDescription>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal size={16} /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem asChild><Link href={`/dashboard/agents/${agent.id}`} className="w-full">Edit Context</Link></DropdownMenuItem>
                  <DropdownMenuItem>View Logs</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>

            <CardContent className="pt-4 pb-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-1">
                    <MessageSquare size={10} /> Messages
                  </span>
                  <p className="text-lg font-bold">{agent._count?.messages || 0}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-1">
                    <FileText size={10} /> Documents
                  </span>
                  <p className="text-lg font-bold">{agent._count?.documents || 0}</p>
                </div>
              </div>

              {/* Status bar */}
              <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[11px] font-medium text-muted-foreground">Ready for deployment</span>
              </div>
            </CardContent>

            <CardFooter className="bg-muted/30 p-2 gap-2">
              <Link href={`/dashboard/agents/${agent.id}`} className="flex-1">
                <Button variant="ghost" className="w-full h-9 text-xs font-bold gap-2 hover:bg-background">
                  <Settings size={14} /> Configure
                </Button>
              </Link>
              <Button size="icon" variant="ghost" className="w-9 h-9 text-primary hover:bg-primary/10">
                <Zap size={14} fill="currentColor" />
              </Button>
            </CardFooter>
          </Card>
        ))}

        {agents.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-border/50 rounded-2xl bg-muted/20 text-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
              <Bot size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold">No agents found</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">Create your first AI assistant to start automating your business workflows.</p>
            </div>
            <Button className="font-bold">Deploy Your First Agent</Button>
          </div>
        )}
      </div>
    </div>
  );
}
