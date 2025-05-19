import { ReactNode } from "react";
import { DashboardSidebar } from "~~/components/dashboard";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 h-screen">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-auto">{children}</main>
        <footer className="py-4 px-6 text-center text-sm text-base-content/70">
          IdeaBar © 2025 · Built at ETH Beijing
        </footer>
      </div>
    </div>
  );
}
