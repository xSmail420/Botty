"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Upload, 
  Search, 
  MoreVertical, 
  Database,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'indexed' | 'processing' | 'failed';
  tokens: string;
}

export default function KnowledgePage() {
  const [docs, setDocs] = useState<Document[]>([
    { id: '1', name: 'Company_Handbook.pdf', type: 'PDF', status: 'indexed', tokens: '45.2k' },
    { id: '2', name: 'Product_Catalog_2026.csv', type: 'CSV', status: 'indexed', tokens: '128.9k' },
    { id: '3', name: 'Q4_Support_Logs.txt', type: 'TXT', status: 'processing', tokens: '12.4k' },
  ]);

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Knowledge Base</h1>
          <p className="text-muted-foreground">Manage the unstructured data that fuels your agents' retrieval-augmented generation (RAG).</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="font-bold gap-2">
            <Upload size={16} /> Bulk Upload
          </Button>
          <Button className="font-bold gap-2">
            <Plus size={16} /> Add Document
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: 'Total Tokens', value: '186.5k', icon: Database },
           { label: 'Documents', value: '12', icon: FileText },
           { label: 'Sync Status', value: 'All Clear', icon: CheckCircle2 },
           { label: 'Storage Used', value: '4.2 MB', icon: Clock },
         ].map((stat, i) => (
           <Card key={i} className="border-none shadow-sm bg-card">
              <CardContent className="p-4 flex items-center gap-4">
                 <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <stat.icon size={20} />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">{stat.label}</p>
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                 </div>
              </CardContent>
           </Card>
         ))}
      </div>

      <Card className="border-none shadow-md bg-card overflow-hidden">
        <CardHeader className="bg-muted/30 pb-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input placeholder="Search documents..." className="pl-10 bg-background border-border/50" />
            </div>
            <Button variant="outline" size="sm">Filter</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border/50 text-[10px] font-bold uppercase text-muted-foreground tracking-widest">
                  <th className="px-6 py-4">Document Name</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Tokens</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {docs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-muted/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted rounded flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <FileText size={16} />
                        </div>
                        <span className="text-sm font-semibold text-foreground">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="text-[10px] bg-muted/30 border-border/50">{doc.type}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         {doc.status === 'indexed' ? (
                           <CheckCircle2 size={14} className="text-green-500" />
                         ) : doc.status === 'processing' ? (
                           <Clock size={14} className="text-yellow-500 animate-spin-slow" />
                         ) : (
                           <AlertCircle size={14} className="text-destructive" />
                         )}
                         <span className="text-xs font-medium capitalize text-muted-foreground">{doc.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-foreground">{doc.tokens}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted text-muted-foreground"><MoreVertical size={16} /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/10 py-3 px-6 flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase">
          <span>Displaying {docs.length} of 12 documents</span>
          <div className="flex gap-2">
             <Button variant="outline" size="sm" disabled className="h-7 text-[10px] px-3 font-bold bg-muted/50">Previous</Button>
             <Button variant="outline" size="sm" className="h-7 text-[10px] px-3 font-bold hover:bg-background">Next</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
