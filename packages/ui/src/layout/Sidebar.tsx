"use client";

import { PagePath, NAV_ITEMS } from "@botty/shared";

interface SidebarProps {
  currentPage: PagePath;
  LinkComponent?: any;
}

export function Sidebar({ currentPage, LinkComponent = "a" }: SidebarProps) {
  const Link = LinkComponent;

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 border-r border-gray-200 bg-white p-4 flex flex-col">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-violet-600" />
        <div>
          <div className="text-sm font-bold text-gray-900">AI Curator</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Technical Editorial</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {NAV_ITEMS.map((item: any) => {
          const isActive = currentPage === item.path;
          return (
            <Link
              key={item.path}
              href={`/${item.path}`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-violet-50 text-violet-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center text-base">📊</div>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            JD
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">Jordan Developer</div>
            <div className="text-[10px] text-gray-500">Enterprise Tier</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
