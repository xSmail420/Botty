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
} from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { 
  Home,
  Bot, 
  Database, 
  Settings, 
  MessageSquare,
  Users,
  CheckSquare,
  Phone,
  MessageCircle,
  Send,
  HelpCircle,
  LogOut,
  ChevronDown,
  Zap,
  Puzzle
} from 'lucide-react';
import Link from 'next/link';

const AppSidebar = () => {
  return (
    <Sidebar className="border-r border-border/30 bg-white">
      {/* Header with Logo and Workspace */}
      <SidebarHeader className="p-4 border-b border-border/30">
        <div className="space-y-4">
          {/* Logo */}
          <Link href="/dashboard" className="text-lg font-bold text-black">
            IIElevenLabs
          </Link>
          
          {/* Workspace Selector */}
          <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-border/50 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>ElevenAgents</span>
            </div>
            <ChevronDown size={16} />
          </button>
        </div>
      </SidebarHeader>

      {/* Navigation Content */}
      <SidebarContent className="px-2">
        {/* Home */}
        <SidebarGroup className="pb-3">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="h-10">
                  <Link href="/dashboard" className="gap-3">
                    <Home size={20} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Configure Section */}
        <SidebarGroup className="pb-3">
          <SidebarGroupLabel className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-2">Configure</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                { title: 'Agents', icon: Bot, url: '/dashboard/agents' },
                { title: 'Knowledge Base', icon: Database, url: '/dashboard/knowledge' },
                { title: 'Tools', icon: Zap, url: '/dashboard/tools' },
                { title: 'Integrations', icon: Puzzle, url: '/dashboard/integrations', badge: 'Alpha' },
              ].map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <Link href={item.url} className="gap-3">
                      <item.icon size={20} className="text-gray-600" />
                      <div className="flex items-center justify-between gap-2 flex-1">
                        <span className="text-sm font-medium text-gray-900">{item.title}</span>
                        {item.badge && (
                          <span className="text-[10px] font-bold bg-gray-900 text-white px-1.5 py-0.5 rounded">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {/* Voice Submenu Placeholder */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="h-10">
                  <button className="gap-3 w-full text-left">
                    <Settings size={20} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Voices</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Monitor Section */}
        <SidebarGroup className="pb-3">
          <SidebarGroupLabel className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-2">Monitor</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                { title: 'Conversations', icon: MessageSquare, url: '/dashboard/conversations' },
                { title: 'Users', icon: Users, url: '/dashboard/users' },
                { title: 'Tests', icon: CheckSquare, url: '/dashboard/tests' },
              ].map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <Link href={item.url} className="gap-3">
                      <item.icon size={20} className="text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Deploy Section */}
        <SidebarGroup className="pb-3">
          <SidebarGroupLabel className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-2">Deploy</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                { title: 'Phone Numbers', icon: Phone, url: '/dashboard/phone' },
                { title: 'WhatsApp', icon: MessageCircle, url: '/dashboard/whatsapp' },
                { title: 'Outbound', icon: Send, url: '/dashboard/outbound' },
              ].map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <Link href={item.url} className="gap-3">
                      <item.icon size={20} className="text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-3 border-t border-border/30 space-y-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-10">
              <Link href="/dashboard/help" className="gap-3">
                <HelpCircle size={20} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Help</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-10">
              <Link href="/dashboard/settings" className="gap-3">
                <Settings size={20} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        {/* Logout at bottom */}
        <div className="pt-2 border-t border-border/30">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen bg-white w-full">
          <AppSidebar />
          <SidebarInset className="flex-1 flex flex-col min-w-0 bg-white">
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
