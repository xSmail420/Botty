import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import WidgetConfig from './pages/WidgetConfig';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <WidgetConfig />
      </main>
    </div>
  );
}
