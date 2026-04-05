"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  CreditCard, 
  ArrowUpRight, 
  Download,
  ShieldCheck,
  Zap
} from "lucide-react";

export default function BillingPage() {
  const plans = [
    { 
      name: "Starter", 
      price: "$0", 
      description: "For individuals exploring AI automation.",
      features: ["1 AI Agent", "1,000 Messages/mo", "Basic Knowledge Base"], 
      current: true 
    },
    { 
      name: "Pro", 
      price: "$49", 
      description: "For teams scaling their AI operations.",
      features: ["5 AI Agents", "10,000 Messages/mo", "Advanced RAG", "Custom Tools"], 
      current: false,
      popular: true
    },
    { 
      name: "Enterprise", 
      price: "$199", 
      description: "For organizations with custom needs.",
      features: ["Unlimited Agents", "Unlimited Messages", "MCP Integration", "SLA Support"], 
      current: false 
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Subscription & Billing</h1>
        <p className="text-muted-foreground">Manage your plan, payment methods, and view your billing history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <Card key={plan.name} className={`border-none shadow-md relative overflow-hidden flex flex-col ${plan.current ? 'ring-2 ring-primary bg-card/50' : 'bg-card'}`}>
            {plan.popular && (
              <div className="absolute top-0 right-0 p-3">
                <Badge className="bg-primary text-primary-foreground font-bold uppercase text-[10px]">Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
              <CardDescription className="text-xs uppercase font-bold tracking-widest text-muted-foreground">{plan.description}</CardDescription>
              <div className="pt-4">
                 <span className="text-4xl font-bold">{plan.price}</span>
                 <span className="text-sm text-muted-foreground font-medium">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="space-y-2">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                     <CheckCircle2 size={14} className="text-primary" />
                     {f}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 p-6">
              <Button variant={plan.current ? "outline" : "default"} className="w-full font-bold uppercase tracking-tighter" disabled={plan.current}>
                {plan.current ? "Current Plan" : "Upgrade Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card className="border-none shadow-sm bg-card">
            <CardHeader>
               <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <CreditCard size={20} className="text-primary" /> Payment Method
               </CardTitle>
               <CardDescription>Your primary card for subscription renewals.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="border border-border/50 rounded-xl p-4 flex items-center justify-between bg-muted/20">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-7 bg-foreground/10 rounded flex items-center justify-center font-bold text-[10px]">VISA</div>
                     <div>
                        <p className="text-sm font-bold tracking-tight">•••• •••• •••• 4242</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Expires 12/2028</p>
                     </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-xs font-bold">Update</Button>
               </div>
            </CardContent>
         </Card>

         <Card className="border-none shadow-sm bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
               <div>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                     <ShieldCheck size={20} className="text-primary" /> Billing History
                  </CardTitle>
                  <CardDescription>View and download your recent invoices.</CardDescription>
               </div>
               <Button variant="ghost" size="sm" className="h-8 text-xs gap-1 font-bold">View All <ArrowUpRight size={14} /></Button>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {[
                    { date: 'Apr 01, 2026', amount: '$49.00', status: 'Paid' },
                    { date: 'Mar 01, 2026', amount: '$49.00', status: 'Paid' },
                  ].map((inv, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b last:border-0 border-border/50">
                       <span className="text-xs font-medium">{inv.date}</span>
                       <div className="flex items-center gap-4">
                          <span className="text-xs font-bold">{inv.amount}</span>
                          <Badge variant="secondary" className="px-1.5 py-0 text-[10px] uppercase font-bold bg-green-500/10 text-green-600 border-green-500/20">{inv.status}</Badge>
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Download size={14} /></Button>
                       </div>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
