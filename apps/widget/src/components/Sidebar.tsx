interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

export default function Sidebar({ activePage, onPageChange }: SidebarProps) {
  return (
    <aside style={{ width: '256px', borderRight: '1px solid #e5e7eb', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', margin: 0 }}>IIElevenLabs</h1>
        <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', fontSize: '14px', fontWeight: '500', color: '#111827', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
            <span>ElevenAgents</span>
          </div>
          <span>▼</span>
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NavItem label="Home" />

        <NavSection title="Configure">
          <NavItem label="Agents" />
          <NavItem label="Knowledge Base" />
          <NavItem label="Tools" />
          <NavItem label="Integrations" badge="Alpha" />
          <NavItem label="Voices" />
        </NavSection>

        <NavSection title="Monitor">
          <NavItem label="Conversations" />
          <NavItem label="Users" />
          <NavItem label="Tests" />
        </NavSection>

        <NavSection title="Deploy">
          <NavItem label="Phone Numbers" />
          <NavItem label="WhatsApp" />
          <NavItem label="Outbound" />
        </NavSection>
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px', borderTop: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NavItem label="Help" />
        <NavItem label="Settings" />
        <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', fontSize: '14px', fontWeight: '500', color: '#dc2626', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

function NavSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ paddingY: '8px' }}>
      <h3 style={{ padding: '8px 12px', fontSize: '11px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

function NavItem({ label, badge }: { label: string; badge?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '8px 12px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', color: '#111827', cursor: 'pointer', backgroundColor: 'transparent', border: 'none', width: '100%', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
        <span style={{ width: '20px', height: '20px', color: '#4b5563' }}>•</span>
        <span>{label}</span>
      </div>
      {badge && <span style={{ fontSize: '10px', fontWeight: 'bold', backgroundColor: '#1f2937', color: '#ffffff', padding: '2px 6px', borderRadius: '4px' }}>{badge}</span>}
    </div>
  );
}
