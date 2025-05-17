import { ReactNode } from "react";
import { DashboardSidebar } from "~~/components/dashboard";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1">
      <DashboardSidebar />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
