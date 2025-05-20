"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hardhat } from "viem/chains";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick, useTargetNetwork } from "~~/hooks/scaffold-eth";

// 用户信息组件
export const HeaderUserInfo = () => {
  // 只在仪表盘相关路径显示
  const pathname = usePathname();
  if (
    !pathname.startsWith("/overview") &&
    !pathname.includes("/chat") &&
    !pathname.includes("/tasks") &&
    !pathname.includes("/community") &&
    !pathname.includes("/profile") &&
    !pathname.includes("/upgrade") &&
    !pathname.includes("/settings")
  ) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center bg-base-200 rounded-full px-3 py-1 text-xs">
        <span className="mr-1">IDEA:</span>
        <span className="font-bold">55</span>
      </div>
      <div className="flex items-center bg-base-200 rounded-full px-3 py-1 text-xs">
        <span className="mr-1">SC:</span>
        <span className="font-bold">160</span>
      </div>
      <div className="flex items-center bg-base-200 rounded-full px-3 py-1 text-xs">
        <span className="mr-1">Pro:</span>
        <span className="font-bold">Yes</span>
      </div>
    </div>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  const burgerMenuRef = useRef<HTMLDetailsElement>(null);
  useOutsideClick(burgerMenuRef, () => {
    burgerMenuRef?.current?.removeAttribute("open");
  });

  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-1/2">
        <Link href="/" passHref className="flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-10 h-10">
            <Image alt="Logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Idea Bar</span>
            <span className="text-xs">Task Marketplace</span>
          </div>
        </Link>
      </div>
      <div className="navbar-end grow mr-4 flex items-center gap-2">
        <HeaderUserInfo />
        <RainbowKitCustomConnectButton />
        {isLocalNetwork && <FaucetButton />}
      </div>
    </div>
  );
};
