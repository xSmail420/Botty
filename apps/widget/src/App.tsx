import { useState } from 'react';
import './App.css';
import { Sidebar } from './components/Sidebar';
import { WidgetConfig } from './pages/WidgetConfig';

export default function App() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <WidgetConfig />
      </main>
    </div>
  );
}
