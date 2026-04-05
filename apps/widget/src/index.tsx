import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

const ChatWidget = ({ agentId }: { agentId: string }) => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [agent, setAgent] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !agent) {
      fetch(`http://localhost:3001/api/agents/${agentId}`)
        .then(res => res.json())
        .then(data => {
          setAgent(data);
          setMessages([{ role: 'assistant', content: `Hello! I'm ${data.name}. How can I help you?` }]);
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
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: '20px', right: '20px',
          width: '60px', height: '60px', borderRadius: '30px',
          backgroundColor: '#5d5dff', color: 'white', fontSize: '24px',
          border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: 2147483647
        }}
      >
        💬
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed', bottom: '20px', right: '20px',
      width: '380px', height: '600px', backgroundColor: 'white',
      borderRadius: '16px', display: 'flex', flexDirection: 'column',
      boxShadow: '0 12px 24px rgba(0,0,0,0.15)', border: '1px solid #e2e8f0',
      overflow: 'hidden', zIndex: 2147483647, fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#5d5dff', color: 'white' }}>
        <span style={{ fontWeight: 'bold' }}>{agent?.name || 'Assistant'}</span>
        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '18px' }}>✕</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%', padding: '10px 14px', borderRadius: '12px',
            backgroundColor: m.role === 'user' ? '#5d5dff' : '#f1f5f9',
            color: m.role === 'user' ? 'white' : '#1e293b',
            fontSize: '14px', lineHeight: '1.5'
          }}>
            {m.content}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div style={{ padding: '16px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px' }}>
        <input 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
        />
        <button onClick={handleSend} style={{ backgroundColor: '#5d5dff', color: 'white', border: 'none', borderRadius: '8px', padding: '0 16px', cursor: 'pointer', fontWeight: '600' }}>
          Send
        </button>
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
