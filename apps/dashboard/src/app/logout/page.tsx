"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Simulate logout logic
    const timer = setTimeout(() => {
      router.push('/');
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <Loader2 className="animate-spin" size={24} />
        </div>
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-bold tracking-tight">Signing you out...</h2>
          <p className="text-sm text-muted-foreground">Thank you for using Botty AI. See you soon!</p>
        </div>
      </div>
    </div>
  );
}
