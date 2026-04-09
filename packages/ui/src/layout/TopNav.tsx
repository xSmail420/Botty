"use client";

import { PagePath, PAGE_TITLES } from "@botty/shared";

interface TopNavProps {
  currentPage: PagePath;
  breadcrumb?: string[];
}

export function TopNav({ currentPage, breadcrumb }: TopNavProps) {
  const breadcrumbs = breadcrumb || ["Agent Studio", PAGE_TITLES[currentPage]];

  return (
    <header className="sticky top-0 z-30 h-14 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-md bg-violet-600" />
        <span className="font-bold text-sm text-gray-900 tracking-tight">
          AI Curator
        </span>
      </div>

      <nav className="flex items-center gap-1 text-sm text-gray-600">
        {breadcrumbs.map((crumb, i) => (
          <div key={i} className="flex items-center gap-1">
            {i > 0 && <span className="text-gray-400">/</span>}
            <span className={i === breadcrumbs.length - 1 ? "font-bold text-gray-900" : ""}>
              {crumb}
            </span>
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <button className="h-8 w-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth={2} />
            <path d="M12 16v-4M12 8h.01" strokeWidth={2} />
          </svg>
        </button>
        <button className="h-8 w-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <button className="h-8 px-3 rounded-lg bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition-colors">
          Deploy
        </button>
      </div>
    </header>
  );
}
