import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-lg border-none">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground">
              <Bot size={28} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@company.com" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Link href="/dashboard/agents">
            <Button className="w-full mt-2 font-bold" size="lg">Sign In</Button>
          </Link>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-2">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs uppercase text-muted-foreground"><span className="bg-card px-2 italic">Or continue with</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full font-medium">Google</Button>
            <Button variant="outline" className="w-full font-medium">GitHub</Button>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Don't have an account? <Link href="/signup" className="text-primary hover:underline font-bold">Sign Up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
