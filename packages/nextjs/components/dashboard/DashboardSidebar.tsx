"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const DashboardSidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    { name: "Overview", path: "/overview" },
    { name: "Chat", path: "/chat" },
    { name: "Tasks", path: "/tasks" },
    { name: "Community", path: "/community" },
    { name: "My Profile", path: "/profile" },
    { name: "Upgrade Pro", path: "/upgrade" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="bg-base-200 w-64 min-h-full p-4 flex flex-col">
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center p-3 rounded-lg text-lg ${
                  isActive(item.path)
                    ? "bg-primary text-primary-content font-bold"
                    : "hover:bg-base-300"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-base-300">
        <button className="w-full p-3 rounded-lg text-lg hover:bg-base-300 text-left">
          Logout
        </button>
      </div>
    </aside>
  );
}; 