'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bot, ArrowRight, Zap, Database, ShieldCheck, Cpu } from 'lucide-react';

export default function RootPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 selection:bg-black selection:text-white">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

      <div className="relative z-10 w-full max-w-4xl text-center space-y-12">
        {/* Branding */}
        <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center text-white shadow-2xl rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <Bot size={40} />
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-black lowercase">
            Botty<span className="text-gray-400">AI</span>
          </h1>
        </div>

        {/* Hero Text */}
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight max-w-2xl mx-auto leading-tight">
            The next-generation <span className="underline decoration-4 decoration-gray-200 underline-offset-4">agentic layer</span> for your business infrastructure.
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto font-medium">
            Managed RAG, Multi-Provider LLM Orchestration, and Shadow DOM isolated widgets in one unified platform.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <Link href="/dashboard">
            <Button size="lg" className="h-14 px-10 text-lg font-bold bg-black text-white hover:bg-gray-800 rounded-full group">
              Launch Dashboard
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline" size="lg" className="h-14 px-12 text-lg font-bold border-gray-200 text-gray-900 hover:bg-gray-50 rounded-full">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Feature Pills */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-1000 delay-500">
          {[
            { label: 'GPT-4o & Claude 3.5', icon: Cpu },
            { label: 'Managed RAG', icon: Database },
            { label: 'Enterprise Security', icon: ShieldCheck },
            { label: 'Real-time API', icon: Zap },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 uppercase tracking-tight">
              <item.icon size={14} className="text-gray-400" />
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="absolute bottom-10 text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
        © 2026 Botty AI Corp / Build with Precision
      </footer>
    </div>
  );
}

