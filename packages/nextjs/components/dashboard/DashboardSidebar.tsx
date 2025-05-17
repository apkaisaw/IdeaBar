"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hardhat } from "viem/chains";
import { 
  ChartBarIcon, 
  ChatBubbleLeftRightIcon, 
  ClipboardDocumentListIcon, 
  UserGroupIcon, 
  UserCircleIcon, 
  SparklesIcon, 
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";
import { Address, FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";

// 用户信息组件
const HeaderUserInfo = () => {
  const { address } = useAccount();

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex items-center justify-between bg-base-100/80 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-base-300/30">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium border border-primary/20">
            <span className="mr-1">IDEA:</span>
            <span className="font-bold">55</span>
          </div>
          <div className="flex items-center bg-secondary/10 text-secondary rounded-full px-3 py-1 text-xs font-medium border border-secondary/20">
            <span className="mr-1">SC:</span>
            <span className="font-bold">160</span>
          </div>
        </div>
        <div className="flex items-center bg-accent/10 text-accent rounded-full px-3 py-1 text-xs font-medium border border-accent/20">
          <span className="mr-1">Pro:</span>
          <span className="font-bold">Yes</span>
        </div>
      </div>
    </div>
  );
};

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    { name: "Overview", path: "/overview", icon: <ChartBarIcon className="w-5 h-5" /> },
    { name: "Chat", path: "/chat", icon: <ChatBubbleLeftRightIcon className="w-5 h-5" /> },
    { name: "Tasks", path: "/tasks", icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
    { name: "Community", path: "/community", icon: <UserGroupIcon className="w-5 h-5" /> },
    { name: "My Profile", path: "/profile", icon: <UserCircleIcon className="w-5 h-5" /> },
    { name: "Upgrade Pro", path: "/upgrade", icon: <SparklesIcon className="w-5 h-5 text-accent" /> },
    { name: "Settings", path: "/settings", icon: <Cog6ToothIcon className="w-5 h-5" /> },
  ];

  return (
    <aside className="bg-gradient-to-b from-base-200 to-base-100 w-72 h-screen sticky top-0 p-5 flex flex-col overflow-y-auto shadow-md border-r border-base-300/30">
      <div className="mb-8">
        <Link href="/" passHref className="flex items-center gap-3 mb-6 px-2">
          <div className="flex relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-md">
            <div className="bg-base-100 rounded-lg w-full h-full flex items-center justify-center overflow-hidden">
              <Image alt="Logo" className="cursor-pointer w-10 h-10 object-contain" width={40} height={40} src="/bar-logo.png" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-primary to-secondary leading-tight">Idea Bar</span>
            <span className="text-xs text-base-content/60">Task Marketplace</span>
          </div>
        </Link>
        <HeaderUserInfo />
        <div className="mt-4 bg-base-100/80 backdrop-blur-sm rounded-xl p-3 shadow-sm flex flex-col items-center border border-base-300/30">
          <RainbowKitCustomConnectButton />
          {isLocalNetwork && <div className="mt-2"><FaucetButton /></div>}
        </div>
      </div>
      <nav className="flex-1">
        <div className="text-xs font-semibold uppercase text-base-content/50 mb-3 px-4 tracking-wider">Menu</div>
        <ul className="space-y-1.5 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base transition-colors ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-primary/90 to-primary text-primary-content font-medium shadow-md"
                    : "hover:bg-base-300/50 text-base-content/70 hover:text-base-content"
                }`}
              >
                {item.icon}
                {item.name}
                {item.name === "Upgrade Pro" && (
                  <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-2xs font-medium rounded-full bg-accent/20 text-accent border border-accent/30">PRO</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-base-300/30">
        <div className="flex items-center justify-between px-2">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-base text-base-content/70 hover:bg-base-300/50 hover:text-base-content transition-colors">
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
          <SwitchTheme />
        </div>
      </div>
    </aside>
  );
}; 