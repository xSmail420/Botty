import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

// Simple implementation of class names helper if needed or use inline styles for shadow DOM
const ChatWidget = ({ agentId }: { agentId: string }) => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [agent, setAgent] = useState<any>(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !agent) {
      fetch(`http://localhost:3001/api/agents/${agentId}`)
        .then(res => res.json())
        .then(data => {
          setAgent(data);
          const config = data.widgetConfig || {};
          const welcomeMsg = config.welcomeMessage || `Hello! I'm ${data.name}. How can I assist you today?`;
          setMessages([{ role: 'assistant', content: welcomeMsg }]);
        });
    }
  }, [isOpen, agentId, agent]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId, messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, data.message]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const primaryColor = agent?.widgetConfig?.primaryColor || '#5d5dff';
  const botName = agent?.name || 'Assistant';

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px',
          width: '64px', height: '64px', borderRadius: '32px',
          backgroundColor: primaryColor, color: 'white', fontSize: '28px',
          border: 'none', cursor: 'pointer', boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
          zIndex: 2147483647, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <span style={{ transform: 'translateY(-2px)' }}>💬</span>
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed', bottom: '24px', right: '24px',
      width: '400px', height: '600px', backgroundColor: '#ffffff',
      borderRadius: '24px', display: 'flex', flexDirection: 'column',
      boxShadow: '0 24px 48px rgba(0,0,0,0.18)', border: '1px solid rgba(0,0,0,0.08)',
      overflow: 'hidden', zIndex: 2147483647, fontFamily: 'Inter, system-ui, sans-serif',
      animation: 'slideUp 0.3s ease-out'
    }}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes blink {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
      `}</style>
      
      {/* Header */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: `linear-gradient(135deg, ${primaryColor}, #818cf8)`, color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
            🤖
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '15px' }}>{botName}</div>
            <div style={{ fontSize: '11px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '3px', backgroundColor: '#4ade80' }}></div>
              Ready to help
            </div>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(0,0,0,0.1)', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '12px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          ✕
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#f9fafb' }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '80%', padding: '12px 18px', borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
            backgroundColor: m.role === 'user' ? primaryColor : '#ffffff',
            color: m.role === 'user' ? '#ffffff' : '#1f2937',
            fontSize: '14px', lineHeight: '1.6', boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            border: m.role === 'user' ? 'none' : '1px solid rgba(0,0,0,0.05)'
          }}>
            {m.content}
          </div>
        ))}
        {isTyping && (
          <div style={{ alignSelf: 'flex-start', background: '#ffffff', padding: '12px 18px', borderRadius: '18px 18px 18px 4px', display: 'flex', gap: '4px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '3px', backgroundColor: '#94a3b8', animation: 'blink 1s infinite' }}></div>
            <div style={{ width: '6px', height: '6px', borderRadius: '3px', backgroundColor: '#94a3b8', animation: 'blink 1s infinite 0.2s' }}></div>
            <div style={{ width: '6px', height: '6px', borderRadius: '3px', backgroundColor: '#94a3b8', animation: 'blink 1s infinite 0.4s' }}></div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '20px 24px 24px 24px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', gap: '12px', background: '#f3f4f6', padding: '6px', borderRadius: '16px' }}>
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            style={{ flex: 1, padding: '10px 14px', border: 'none', background: 'transparent', fontSize: '14px', outline: 'none', color: '#1f2937' }}
          />
          <button 
            onClick={handleSend} 
            style={{ 
              backgroundColor: primaryColor, color: 'white', border: 'none', 
              borderRadius: '12px', width: '40px', height: '40px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            ➤
          </button>
        </div>
        <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '10px', color: '#94a3b8', fontWeight: '500' }}>
          Powered by Botty AI
        </div>
      </div>
    </div>
  );
};

class BottyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const agentId = this.getAttribute('agent-id') || 'default-agent';
    const root = ReactDOM.createRoot(this.shadowRoot!);
    root.render(<ChatWidget agentId={agentId} />);
  }
}

if (!customElements.get('my-ai-agent')) {
  customElements.define('my-ai-agent', BottyElement);
}
