"use client";

import { useEffect, useState } from "react";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useInitializeNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

// 创建自定义紫色半透明主题
const purpleTransparentTheme = (isDarkMode: boolean) => {
  const baseTheme = isDarkMode ? darkTheme : lightTheme;
  return baseTheme({
    accentColor: 'rgba(123, 63, 228, 0.8)', // 紫色半透明
    accentColorForeground: 'white',
    borderRadius: 'medium',
    overlayBlur: 'small', // 添加模糊效果增强半透明感
    // 可自定义更多主题属性
    colors: {
      connectButtonBackground: 'rgba(123, 63, 228, 0.6)', // 紫色半透明背景
      modalBackground: 'rgba(30, 10, 60, 0.85)', // 深紫色半透明背景
    },
  });
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  useInitializeNativeCurrencyPrice();

  return (
    <>
      <div className={`flex flex-col min-h-screen `}>
        <main className="relative flex flex-col flex-1">{children}</main>
      </div>
      <Toaster />
    </>
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ProgressBar height="3px" color="#2299dd" />
        <RainbowKitProvider
          avatar={BlockieAvatar}
          theme={mounted ? purpleTransparentTheme(isDarkMode) : purpleTransparentTheme(false)}
        >
          <ScaffoldEthApp>{children}</ScaffoldEthApp>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
