import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Bot, 
  Cpu, 
  Database, 
  Layers, 
  ShieldCheck, 
  Zap,
  Github,
  Twitter
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/10">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              <Bot size={20} />
            </div>
            Botty AI
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground transition-colors">
            <Link href="#features" className="hover:text-primary">Features</Link>
            <Link href="#pricing" className="hover:text-primary">Pricing</Link>
            <Link href="#docs" className="hover:text-primary">Docs</Link>
            <Link href="/blog" className="hover:text-primary">Blog</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="font-semibold">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge variant="outline" className="px-3 py-1 text-sm font-medium border-primary/20 bg-primary/5 text-primary animate-in fade-in slide-in-from-bottom-3 duration-500">
                Phase 3: AI Runtime is live 🚀
              </Badge>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight lg:leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                Deploy Business-Grade <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                  AI Agents in Minutes
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
                The ultimate agentic layer for multi-tenant SaaS. Support all major LLMs, 
                ingest your knowledge base, and deploy embeddable widgets with Shadow DOM isolation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
                <Link href="/signup">
                  <Button size="lg" className="h-12 px-8 text-base font-semibold group">
                    Build Your Agent
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                  View Demo
                </Button>
              </div>

              {/* Trusted By / Subtitle */}
              <div className="pt-8 text-sm font-medium text-muted-foreground uppercase tracking-widest animate-in fade-in duration-1000 delay-500">
                Compatible with
              </div>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="font-bold text-lg italic">OpenAI</span>
                <span className="font-bold text-lg italic tracking-tighter uppercase">Anthropic</span>
                <span className="font-bold text-lg italic tracking-widest text-[10px]">Google AI</span>
                <span className="font-bold text-lg italic">Meta</span>
                <span className="font-bold text-lg italic">Ollama</span>
              </div>
            </div>
          </div>
          
          {/* Background Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">Everything you need to scale</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Built for performance, scalability, and security from day one.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Multi-Provider Brain',
                  description: 'Switch between GPT-4o, Claude 3.5, and Local Ollama models per agent with one click.',
                  icon: Cpu,
                },
                {
                  title: 'RAG Knowledge Base',
                  description: 'Ingest PDF, CSV, and Web content. Our deduplicated vector storage ensures near-instant recall.',
                  icon: Database,
                },
                {
                  title: 'Shadow DOM Widget',
                  description: 'Embeddable chat widget with zero CSS leakage. Works perfectly on any website.',
                  icon: Layers,
                },
                {
                  title: 'MCP Integration',
                  description: 'Connect your agents to 10,000+ tools via the Model Context Protocol native client.',
                  icon: Zap,
                },
                {
                  title: 'Multi-Tenant Security',
                  description: 'Enterprise-grade isolation for your customers with dedicated tenant environments.',
                  icon: ShieldCheck,
                },
                {
                  title: 'Agentic Layer',
                  description: 'Not just a chatbot, but a reasoning engine that can handle complex multi-step tasks.',
                  icon: Bot,
                }
              ].map((feature, i) => (
                <Card key={i} className="border-none shadow-md hover:shadow-xl transition-all duration-300 group bg-card">
                  <CardContent className="pt-8 pb-6 px-8 space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <feature.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold max-w-3xl mx-auto">
              Ready to give your business high-fidelity intelligence?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold">
                  Start Building for Free
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-primary-foreground/20 hover:bg-primary-foreground/10">
                Contact Sales
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48 blur-3xl" />
        </section>
      </main>

      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Bot className="text-primary" size={24} />
            Botty AI
          </div>
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Privacy</Link>
            <Link href="/" className="hover:text-foreground">Terms</Link>
            <Link href="/" className="hover:text-foreground">Twitter</Link>
            <Link href="/" className="hover:text-foreground">GitHub</Link>
          </div>
          <div className="text-sm text-muted-foreground opacity-70">
            © 2026 Botty AI Corp. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
