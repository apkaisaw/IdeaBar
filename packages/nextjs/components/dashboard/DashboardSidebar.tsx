"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hardhat } from "viem/chains";
import { useAccount } from "wagmi";
import {
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  SparklesIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";

// 注入全局CSS动画与样式 - 添加滚动条隐藏
const globalStyles = `
@keyframes pulse-glow-1 {
  0% { opacity: 0.15; }
  50% { opacity: 0.35; }
  100% { opacity: 0.15; }
}

@keyframes pulse-glow-2 {
  0% { opacity: 0.2; }
  50% { opacity: 0.4; }
  100% { opacity: 0.2; }
}

@keyframes pulse-glow-3 {
  0% { opacity: 0.1; }
  50% { opacity: 0.3; }
  100% { opacity: 0.1; }
}

@keyframes subtle-pulse {
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
}

/* 隐藏滚动条但保留滚动功能 */
body, html {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

body::-webkit-scrollbar, html::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
  width: 0;
  height: 0;
}

/* 为所有可滚动元素应用无滚动条样式 */
.no-scrollbar, div {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.no-scrollbar::-webkit-scrollbar, div::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}
`;

// 用户信息组件 - 修复布局问题
const HeaderUserInfo = () => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="bg-gray-900/30 backdrop-blur-md rounded-xl p-3 shadow-md border border-purple-500/20">
        {/* 使用grid布局代替flex，确保均匀分布 */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="flex items-center justify-center bg-purple-800/20 text-purple-300 rounded-lg px-1.5 py-1.5 text-xs font-medium border border-purple-500/20 backdrop-blur-sm">
            <span className="mr-1">IDEA:</span>
            <span className="font-bold">55</span>
          </div>
          <div className="flex items-center justify-center bg-blue-800/20 text-blue-300 rounded-lg px-1.5 py-1.5 text-xs font-medium border border-blue-500/20 backdrop-blur-sm">
            <span className="mr-1">SC:</span>
            <span className="font-bold">160</span>
          </div>
        </div>
        <div className="flex items-center justify-center bg-green-800/20 text-green-300 rounded-lg px-1.5 py-1.5 text-xs font-medium border border-green-500/20 backdrop-blur-sm w-full">
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
    {
      name: "Upgrade",
      path: "/upgrade",
      icon: <SparklesIcon className="w-5 h-5 text-green-400" />,
      special: true,
    },
    { name: "Settings", path: "/settings", icon: <Cog6ToothIcon className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* 注入动画样式 */}
      <style jsx global>
        {globalStyles}
      </style>

      <aside className="bg-gradient-to-b from-gray-900/40 to-gray-800/30 w-72 h-screen sticky top-0 p-5 flex flex-col overflow-y-auto no-scrollbar shadow-xl border-r border-purple-500/20 backdrop-blur-xl relative">
        {/* 底层光效 */}
        <div className="absolute inset-0 bg-black/20 -z-10"></div>

        {/* 主要装饰光效 */}
        <div className="absolute top-0 right-0 w-full h-72 bg-purple-500/20 blur-[120px] rounded-full -z-1 pointer-events-none opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-full h-72 bg-blue-500/20 blur-[120px] rounded-full -z-1 pointer-events-none opacity-60"></div>

        {/* 固定位置的呼吸光晕 */}
        <div
          className="absolute top-[15%] right-[20%] w-24 h-24 bg-purple-500/30 blur-[25px] rounded-full pointer-events-none"
          style={{ animation: "pulse-glow-1 4s infinite ease-in-out" }}
        ></div>

        <div
          className="absolute top-[50%] left-[15%] w-20 h-20 bg-blue-500/30 blur-[20px] rounded-full pointer-events-none"
          style={{ animation: "pulse-glow-2 5s infinite ease-in-out" }}
        ></div>

        <div
          className="absolute bottom-[20%] right-[30%] w-28 h-28 bg-indigo-500/30 blur-[22px] rounded-full pointer-events-none"
          style={{ animation: "pulse-glow-3 6s infinite ease-in-out" }}
        ></div>

        <div className="relative mb-8 z-10">
          <Link href="/" passHref className="flex items-center gap-3 mb-6 px-2 group">
            <div className="flex relative w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/80 to-pink-500/80 p-0.5 shadow-lg group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
              <div className="bg-gray-900/60 backdrop-blur-md rounded-lg w-full h-full flex items-center justify-center overflow-hidden">
                <Image
                  alt="Logo"
                  className="cursor-pointer w-10 h-10 object-contain"
                  width={40}
                  height={40}
                  src="/bar-logo.png"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-300 to-pink-200 leading-tight group-hover:from-purple-200 group-hover:to-pink-100 transition-all duration-300">
                Idea Bar
              </span>
              <span className="text-xs text-gray-400/80">Task Marketplace</span>
            </div>
          </Link>
          <HeaderUserInfo />
          <div className="mt-4 bg-gray-900/30 backdrop-blur-xl rounded-xl p-3 shadow-lg flex flex-col items-center border border-purple-500/20">
            <RainbowKitCustomConnectButton />
            {isLocalNetwork && (
              <div className="mt-2">
                <FaucetButton />
              </div>
            )}
          </div>
        </div>
        <nav className="flex-1 relative z-10 overflow-y-auto no-scrollbar">
          <div className="text-xs font-semibold uppercase text-gray-400/80 mb-3 px-4 tracking-wider">Menu</div>
          <ul className="space-y-1.5 px-2">
            {navItems.map(item => (
              <li key={item.path}>
                {item.special ? (
                  // 特殊的升级专业版按钮 - 更轻盈的设计
                  <Link
                    href={item.path}
                    className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-base transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-green-800/10 backdrop-blur-sm border border-green-500/20 rounded-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/5 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative flex items-center gap-2.5 z-10">
                      <SparklesIcon
                        className="w-5 h-5 text-green-400"
                        style={{ animation: "subtle-pulse 2s infinite ease-in-out" }}
                      />
                      <span className="text-green-300 font-medium group-hover:text-green-200 transition-colors">
                        Upgrade
                      </span>
                    </div>
                    <span className="ml-auto inline-flex items-center justify-center px-2 py-0.5 text-2xs font-medium rounded-full bg-green-500/20 text-green-300 border border-green-500/20 backdrop-blur-sm relative z-10">
                      PRO
                    </span>
                  </Link>
                ) : (
                  // 常规菜单项
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-gradient-to-r from-purple-900/50 to-purple-700/40 text-purple-100 font-medium shadow-lg border border-purple-500/30 backdrop-blur-lg"
                        : "hover:bg-gray-800/40 text-gray-400/90 hover:text-gray-200/90 hover:border border-purple-500/10 backdrop-blur-sm"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-4 border-t border-purple-500/20 relative z-10">
          <div className="flex items-center justify-between px-2">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-base text-gray-400/90 hover:bg-gray-800/40 hover:text-gray-200/90 transition-all duration-300 hover:border border-purple-500/10 backdrop-blur-sm">
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              Logout
            </button>
            <SwitchTheme />
          </div>
        </div>
      </aside>
    </>
  );
};
