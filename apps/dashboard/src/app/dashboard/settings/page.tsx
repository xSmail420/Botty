"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  UserCircle, 
  Mail, 
  Shield, 
  Clock, 
  LogOut,
  Bell,
  Globe,
  Settings2
} from "lucide-react";
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your personal information, security preferences, and account notifications.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar (Local) */}
        <aside className="lg:col-span-1 space-y-2">
           <Button variant="secondary" className="w-full justify-start gap-2 font-bold bg-primary/10 text-primary border-primary/20">
              <UserCircle size={18} /> Profile Info
           </Button>
           <Button variant="ghost" className="w-full justify-start gap-2 font-medium text-muted-foreground hover:bg-muted/50">
              <Shield size={18} /> Security
           </Button>
           <Button variant="ghost" className="w-full justify-start gap-2 font-medium text-muted-foreground hover:bg-muted/50">
              <Bell size={18} /> Notifications
           </Button>
           <Button variant="ghost" className="w-full justify-start gap-2 font-medium text-muted-foreground hover:bg-muted/50">
              <Globe size={18} /> Organization
           </Button>
        </aside>

        <div className="lg:col-span-3 space-y-6">
           <Card className="border-none shadow-sm bg-card overflow-hidden">
              <CardHeader className="bg-muted/20 pb-6 border-b border-border/50">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-bold text-2xl">
                       AU
                    </div>
                    <div>
                       <CardTitle className="text-xl font-bold">Admin User</CardTitle>
                       <CardDescription className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Admin Access</span>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span className="text-xs font-bold text-primary uppercase tracking-widest uppercase tracking-widest">Pro Tier</span>
                       </CardDescription>
                    </div>
                 </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label htmlFor="name">Full Name</Label>
                       <Input id="name" defaultValue="Admin User" className="bg-background" />
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="email">Email Address</Label>
                       <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                          <Input id="email" defaultValue="admin@botty.ai" className="pl-10 bg-background" disabled />
                       </div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="bio">User Role</Label>
                    <Input defaultValue="Chief Orchestrator" className="bg-background" />
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest italic pt-1">This role will be visible across your organization.</p>
                 </div>
              </CardContent>
              <CardFooter className="bg-muted/10 border-t border-border/50 px-6 py-4 flex justify-between items-center">
                 <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                    <Clock size={12} /> Account created April 2026
                 </span>
                 <Button size="sm" className="font-bold">Save Profile</Button>
              </CardFooter>
           </Card>

           <Card className="border-none shadow-sm bg-card">
              <CardHeader>
                 <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Shield size={20} className="text-primary" /> Two-Factor Authentication
                 </CardTitle>
                 <CardDescription>Secure your account with an additional layer of protection.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between pb-6">
                 <div className="space-y-1">
                    <p className="text-sm font-bold">2FA is currently disabled</p>
                    <p className="text-xs text-muted-foreground">Protect your account and your agents from unauthorized access.</p>
                 </div>
                 <Button variant="outline" size="sm" className="font-bold">Enable</Button>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
