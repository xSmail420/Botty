import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Check } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4 py-12">
      <Card className="w-full max-w-lg shadow-lg border-none">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground">
              <Bot size={28} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription>
            Join 1,000+ businesses building AI agents with Botty
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" placeholder="Ismail" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" placeholder="" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <Input id="email" type="email" placeholder="name@company.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          
          <div className="space-y-3 pt-2">
            {[
              'Unlimited Agents (Dev Mode)',
              'Multi-Model Orchestration',
              'RAG Knowledge Base (100MB)',
              'Shadow DOM Widget'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Check size={10} strokeWidth={4} />
                </div>
                {feature}
              </div>
            ))}
          </div>

          <Link href="/dashboard/agents">
            <Button className="w-full mt-2 font-bold" size="lg">Create Account</Button>
          </Link>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-2">
          <p className="text-center text-xs text-muted-foreground px-8 leading-relaxed">
            By clicking "Create Account", you agree to our <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
          </p>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account? <Link href="/login" className="text-primary hover:underline font-bold">Login</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
