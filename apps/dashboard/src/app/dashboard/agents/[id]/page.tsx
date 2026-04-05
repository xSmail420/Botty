"use client";

import { useState, useEffect, useRef, use } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bot, 
  Save, 
  Trash2, 
  Send, 
  History, 
  Settings2, 
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Database
} from "lucide-react";
import Link from 'next/link';

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [agent, setAgent] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/agents/${id}`)
      .then(res => res.json())
      .then(data => {
        setAgent(data);
        setMessages([{ role: 'assistant', content: `Hello! I'm ${data.name}. You can test my persona here.` }]);
      });
  }, [id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleTestChat = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId: id, messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, data.message]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection failed.' }]);
    }
  };

  if (!agent) return <div className="p-8">Loading agent...</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b pb-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/agents">
            <Button variant="ghost" size="icon" className="rounded-full"><ArrowLeft size={18} /></Button>
          </Link>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <Bot size={22} />
             </div>
             <div>
                <h1 className="text-2xl font-bold tracking-tight">{agent.name}</h1>
                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase font-bold tracking-widest">
                   ID: {id.slice(0, 8)}... <ChevronRight size={10} /> {agent.model}
                </div>
             </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
            <Trash2 size={16} className="mr-2" /> Delete
          </Button>
          <Button size="sm" className="font-bold gap-2">
            <Save size={16} /> Save Changes
          </Button>
        </div>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Left: Configuration (60%) */}
        <div className="flex-[3] space-y-6 overflow-y-auto pr-2 pb-8">
           <Tabs defaultValue="identity" className="w-full">
              <TabsList className="bg-muted/50 p-1 mb-6">
                <TabsTrigger value="identity" className="gap-2 font-bold"><Bot size={14} /> Identity</TabsTrigger>
                <TabsTrigger value="knowledge" className="gap-2 font-bold"><Database size={14} /> Knowledge</TabsTrigger>
                <TabsTrigger value="advanced" className="gap-2 font-bold"><Settings2 size={14} /> Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="identity" className="space-y-6 mt-0">
                 <Card className="border-none shadow-sm bg-card/50">
                    <CardHeader>
                       <CardTitle className="text-lg font-bold">General Information</CardTitle>
                       <CardDescription>Basic personality and visual brand of your assistant.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="space-y-2">
                          <Label>Agent Name</Label>
                          <Input defaultValue={agent.name} className="bg-background" />
                       </div>
                       <div className="space-y-2">
                          <Label>System Persona / Instructions</Label>
                          <Textarea 
                            defaultValue={agent.persona} 
                            placeholder="You are a helpful assistant that..." 
                            className="min-h-[200px] leading-relaxed resize-none bg-background shadow-inner"
                          />
                          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter italic italic">Craft a detailed persona to improve response quality.</p>
                       </div>
                    </CardContent>
                 </Card>

                 <Card className="border-none shadow-sm bg-card/50">
                    <CardHeader>
                       <CardTitle className="text-lg font-bold">Model Orchestration</CardTitle>
                       <CardDescription>Select the brain and provider for this specific agent.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <Label>Provider</Label>
                          <Select defaultValue={agent.model?.split('/')[0] || 'openai'}>
                             <SelectTrigger className="bg-background">
                                <SelectValue />
                             </SelectTrigger>
                             <SelectContent>
                                <SelectItem value="openai">OpenAI</SelectItem>
                                <SelectItem value="anthropic">Anthropic</SelectItem>
                                <SelectItem value="google">Google AI</SelectItem>
                                <SelectItem value="openrouter">OpenRouter</SelectItem>
                             </SelectContent>
                          </Select>
                       </div>
                       <div className="space-y-2">
                          <Label>Core Model</Label>
                          <Select defaultValue={agent.model}>
                             <SelectTrigger className="bg-background">
                                <SelectValue />
                             </SelectTrigger>
                             <SelectContent>
                                <SelectItem value="gpt-4o">GPT-4o (Superior Reasoning)</SelectItem>
                                <SelectItem value="claude-3-5-sonnet">Claude 3.5 Sonnet</SelectItem>
                                <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                             </SelectContent>
                          </Select>
                       </div>
                    </CardContent>
                 </Card>
              </TabsContent>

              <TabsContent value="knowledge" className="mt-0">
                 <Card className="border-none shadow-sm bg-card/50">
                    <CardHeader className="flex flex-row items-center justify-between">
                       <div>
                          <CardTitle className="text-lg font-bold text-foreground">Knowledge Base (RAG)</CardTitle>
                          <CardDescription>Connect data sources to ground the AI's responses.</CardDescription>
                       </div>
                       <Button size="sm" variant="outline" className="font-bold">+ Link Source</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="border border-dashed border-border/50 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-3 bg-muted/20">
                           <Database className="text-muted-foreground" size={32} />
                           <p className="text-sm text-muted-foreground font-medium">No knowledge sources linked to this agent yet.</p>
                           <Button variant="link" className="text-primary font-bold">Manage Knowledge Base</Button>
                        </div>
                    </CardContent>
                 </Card>
              </TabsContent>
           </Tabs>
        </div>

        {/* Right: Live Preview (40%) */}
        <div className="flex-[2] bg-card border border-border/50 rounded-2xl flex flex-col overflow-hidden shadow-2xl relative">
           <div className="absolute top-0 right-0 p-3 z-10">
              <Badge variant="secondary" className="gap-1 px-2 py-0.5 font-bold uppercase text-[10px] bg-primary/10 text-primary border-primary/20">
                <Sparkles size={10} fill="currentColor" /> Web Widget Preview
              </Badge>
           </div>
           
           <div className="p-4 border-b border-border/50 flex items-center justify-between bg-muted/30">
              <span className="text-sm font-bold tracking-tight">Test Interaction</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><History size={16} /></Button>
           </div>

           <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/5">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                     m.role === 'user' 
                       ? 'bg-primary text-primary-foreground font-medium' 
                       : 'bg-background border border-border/50 text-foreground'
                   }`}>
                      {m.content}
                   </div>
                </div>
              ))}
              <div ref={scrollRef} />
           </div>

           <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-sm">
              <div className="relative">
                 <Input 
                   value={input}
                   onChange={e => setInput(e.target.value)}
                   onKeyDown={e => e.key === 'Enter' && handleTestChat()}
                   placeholder="Type to test persona..."
                   className="pr-12 h-11 bg-background border-border/50 shadow-sm" 
                 />
                 <Button 
                   onClick={handleTestChat}
                   size="icon" 
                   className="absolute right-1 top-1 h-9 w-9 bg-primary hover:bg-primary/90 text-primary-foreground"
                 >
                    <Send size={16} />
                 </Button>
              </div>
              <p className="text-[10px] text-center text-muted-foreground mt-3 uppercase font-bold tracking-tighter opacity-50 italic">Preview mode mimics the widget experience.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
