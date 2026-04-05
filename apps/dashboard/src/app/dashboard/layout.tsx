import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { 
  Bot, 
  Cpu, 
  Database, 
  Settings, 
  CreditCard, 
  LayoutDashboard,
  UserCircle,
  LogOut
} from 'lucide-react';
import Link from 'next/link';

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-card">
      <SidebarHeader className="p-4">
        <Link href="/dashboard/agents" className="flex items-center gap-2 font-bold px-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground min-w-[32px]">
            <Bot size={20} />
          </div>
          <span className="group-data-[collapsible=icon]:hidden">Botty Admin</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                { title: 'Agents', icon: Bot, url: '/dashboard/agents' },
                { title: 'Providers', icon: Cpu, url: '/dashboard/providers' },
                { title: 'Knowledge', icon: Database, url: '/dashboard/knowledge' },
              ].map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                { title: 'Billing', icon: CreditCard, url: '/dashboard/billing' },
                { title: 'Settings', icon: Settings, url: '/dashboard/settings' },
              ].map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <Link href="/logout" className="text-destructive hover:text-destructive">
                <LogOut size={20} />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center gap-2 px-2 mt-4 pt-4 border-t border-border/50">
          <UserCircle size={24} className="text-muted-foreground" />
          <div className="flex flex-col group-data-[collapsible=icon]:hidden text-left">
            <span className="text-xs font-bold">Admin User</span>
            <span className="text-[10px] text-muted-foreground">Pro Plan</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen bg-muted/20 w-full relative">
          <AppSidebar />
          <SidebarInset className="flex-1 flex flex-col min-w-0 bg-background">
            <header className="h-14 border-b border-border/50 bg-background/50 backdrop-blur-md sticky top-0 z-30 flex items-center px-4 justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div className="h-4 w-[1px] bg-border/50" />
                <nav className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                   <Link href="/dashboard/agents" className="hover:text-foreground">Dashboard</Link>
                   <span>/</span>
                   <span className="text-foreground">Current View</span>
                </nav>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="text-xs">Support</Button>
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                  AU
                </div>
              </div>
            </header>
            <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
