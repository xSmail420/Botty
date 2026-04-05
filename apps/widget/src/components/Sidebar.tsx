import { Home, Bot, Database, Settings, MessageSquare, Users, CheckSquare, Phone, MessageCircle, Send, HelpCircle, LogOut, ChevronDown, Zap, Puzzle } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 space-y-4">
        <h1 className="text-lg font-bold text-gray-900">IIElevenLabs</h1>
        <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-300 text-sm font-medium text-gray-900">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>ElevenAgents</span>
          </div>
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {/* Home */}
        <NavItem icon={Home} label="Home" href="#" />

        {/* Configure Section */}
        <NavSection title="Configure">
          <NavItem icon={Bot} label="Agents" href="#" />
          <NavItem icon={Database} label="Knowledge Base" href="#" />
          <NavItem icon={Zap} label="Tools" href="#" />
          <NavItem icon={Puzzle} label="Integrations" href="#" badge="Alpha" />
          <NavItem icon={Settings} label="Voices" href="#" />
        </NavSection>

        {/* Monitor Section */}
        <NavSection title="Monitor">
          <NavItem icon={MessageSquare} label="Conversations" href="#" />
          <NavItem icon={Users} label="Users" href="#" />
          <NavItem icon={CheckSquare} label="Tests" href="#" />
        </NavSection>

        {/* Deploy Section */}
        <NavSection title="Deploy">
          <NavItem icon={Phone} label="Phone Numbers" href="#" />
          <NavItem icon={MessageCircle} label="WhatsApp" href="#" />
          <NavItem icon={Send} label="Outbound" href="#" />
        </NavSection>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 space-y-2">
        <NavItem icon={HelpCircle} label="Help" href="#" />
        <NavItem icon={Settings} label="Settings" href="#" />
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

function NavSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-2">
      <h3 className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function NavItem({ icon: Icon, label, href, badge }: { icon: any; label: string; href: string; badge?: string }) {
  return (
    <a
      href={href}
      className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center gap-3 flex-1">
        <Icon size={20} className="text-gray-600" />
        <span>{label}</span>
      </div>
      {badge && <span className="text-[10px] font-bold bg-gray-900 text-white px-1.5 py-0.5 rounded">{badge}</span>}
    </a>
  );
}
