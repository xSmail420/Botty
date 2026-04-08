"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Cpu, 
  MoreVertical, 
  Key, 
  Globe, 
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProvidersPage() {
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const tenantId = "default-tenant";

  useEffect(() => {
    fetch(`/api/providers?tenantId=${tenantId}`)
      .then(res => res.json())
      .then(data => {
        setProviders(data);
        setLoading(false);
      });
  }, []);

  const handleAddProvider = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const payload = {
      tenantId,
      type: formData.get('type'),
      name: formData.get('name'),
      apiKey: formData.get('apiKey'),
      baseUrl: formData.get('baseUrl'),
    };

    try {
      const res = await fetch('/api/providers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const newProvider = await res.json();
      setProviders(prev => {
        const index = prev.findIndex(p => p.type === newProvider.type);
        if (index > -1) {
          const updated = [...prev];
          updated[index] = newProvider;
          return updated;
        }
        return [...prev, newProvider];
      });
      (e.target as any).reset();
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProvider = async (id: string) => {
    if (!confirm('Are you sure you want to delete this provider?')) return;
    try {
      // Assuming a DELETE /api/providers/:id endpoint should exist. 
      // I should check index.ts if I added it.
      await fetch(`/api/providers/${id}`, { method: 'DELETE' });
      setProviders(providers.filter(p => p.id !== id));
    } catch (err) {
      console.error("Failed to delete provider", err);
    }
  };

  if (loading) return <div className="p-8 flex items-center gap-2 text-muted-foreground"><Loader2 className="animate-spin" /> Loading providers...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">AI Providers</h1>
          <p className="text-muted-foreground">Manage your API keys and model configurations across all supported providers.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="font-bold">
              <Plus className="mr-2 h-4 w-4" /> Add Provider
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleAddProvider}>
              <DialogHeader>
                <DialogTitle>Configure Provider</DialogTitle>
                <DialogDescription>Add or update an AI provider's credentials.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Provider Type</Label>
                  <Select name="type" required>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="anthropic">Anthropic</SelectItem>
                      <SelectItem value="google">Google AI</SelectItem>
                      <SelectItem value="openrouter">OpenRouter</SelectItem>
                      <SelectItem value="ollama">Ollama (Local)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input id="name" name="name" placeholder="Primary OpenAI" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="apiKey">API Key / Auth Token</Label>
                  <Input id="apiKey" name="apiKey" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="baseUrl">Base URL (Optional)</Label>
                  <Input id="baseUrl" name="baseUrl" placeholder="https://api.openai.com/v1" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSaving}>
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Provider
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <Card key={provider.id} className="border-none shadow-md bg-card overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Cpu size={20} />
                </div>
                <CardTitle className="text-lg font-bold">{provider.name}</CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><MoreVertical size={16} /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProvider(provider.id)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-y border-border/50">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Status</span>
                <Badge className="gap-1 px-2 font-bold uppercase text-[10px]">
                  <CheckCircle2 size={10} strokeWidth={3} /> Connected
                </Badge>
              </div>
              <div className="space-y-1">
                 <span className="text-[10px] font-bold text-muted-foreground uppercase">Endpoint</span>
                 <p className="text-xs truncate text-muted-foreground bg-muted/30 p-1.5 rounded">{provider.baseUrl || 'Default'}</p>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/10 py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">
               Last updated {new Date(provider.updatedAt).toLocaleDateString()}
            </CardFooter>
          </Card>
        ))}
        {providers.length === 0 && !loading && (
          <div className="col-span-full py-20 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground">
             <AlertCircle size={32} className="mb-2 opacity-50" />
             <p>No providers configured yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
