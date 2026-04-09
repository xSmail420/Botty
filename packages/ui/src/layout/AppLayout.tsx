"use client";

import { ReactNode } from "react";
import { PagePath } from "@botty/shared";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

interface AppLayoutProps {
  currentPage: PagePath;
  breadcrumb?: string[];
  children: ReactNode;
}

export function AppLayout({ currentPage, breadcrumb, children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-foreground">
      <Sidebar currentPage={currentPage} />
      <div className="flex-1 ml-56 flex flex-col">
        <TopNav currentPage={currentPage} breadcrumb={breadcrumb} />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
