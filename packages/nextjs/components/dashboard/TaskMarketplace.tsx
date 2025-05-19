"use client";

import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { notification } from "~~/utils/scaffold-eth";

export const TaskMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  // Get the connected wallet account
  const { isConnected } = useAccount();

  // 使用wagmi的signMessage钩子
  const { signMessageAsync } = useSignMessage();

  // 处理申请任务 - 调用钱包签名但不需要合约
  const handleApplyForTask = async (taskId: number) => {
    // Check if wallet is connected
    if (!isConnected) {
      notification.warning("Please connect your wallet first");
      return;
    }

    try {
      setIsApplying(true);
      setSelectedTaskId(taskId);

      notification.info("Please confirm the signature in your wallet...");

      // 创建一个签名消息
      const messageToSign = `I am applying for task #${taskId} on IdeaBar Marketplace.\n\nTimestamp: ${new Date().toISOString()}`;

      // 请求钱包签名 - 这会弹出钱包界面
      const signature = await signMessageAsync({ message: messageToSign });

      console.log("Task application signature:", signature);
      console.log("Message signed:", messageToSign);

      // 签名成功
      notification.success("Successfully signed task application!");

      // 模拟交易确认
      setTimeout(() => {
        const mockTxHash = "0x" + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2);
        notification.success(`Task application confirmed! Transaction: ${mockTxHash.slice(0, 10)}...`);
      }, 2000);

      return signature;
    } catch (error) {
      console.error("Signature failed:", error);
      notification.error("Failed to sign message: " + (error as Error).message);
    } finally {
      setIsApplying(false);
      setSelectedTaskId(null);
    }
  };

  // Mock task data
  const tasks = [
    {
      id: 1,
      title: "Smart Contract Audit for Project X",
      reward: 200,
      skills: ["Solidity", "Security"],
      description:
        "Perform a comprehensive security audit for a DeFi project. Look for vulnerabilities and provide recommendations for improvements.",
      category: "Dev",
      isHighReward: true,
      isAIRecommended: true,
      taskCount: 4,
      status: "Active",
    },
    {
      id: 2,
      title: "Create Marketing Copy for NFT Launch",
      reward: 70,
      skills: ["Writing", "Crypto"],
      description:
        "Write compelling marketing copy for an upcoming NFT collection launch. Should appeal to both crypto-natives and mainstream audiences.",
      category: "Writing",
      isHighReward: false,
      isAIRecommended: false,
      taskCount: 0,
      status: "Active",
    },
    {
      id: 3,
      title: "Design UI for Staking Dashboard",
      reward: 150,
      skills: ["UI/UX", "Design"],
      description:
        "Create user interface designs for a staking dashboard that displays rewards, APY, and allows users to stake/unstake their tokens.",
      category: "Design",
      isHighReward: true,
      isAIRecommended: true,
      taskCount: 0,
      status: "Active",
    },
    {
      id: 4,
      title: "Build NFT Marketplace Smart Contract",
      reward: 300,
      skills: ["Solidity", "NFT"],
      description:
        "Develop a secure and gas-optimized smart contract for an NFT marketplace with support for ERC-721 and ERC-1155 tokens.",
      category: "Dev",
      isHighReward: true,
      isAIRecommended: false,
      taskCount: 0,
      status: "Completed",
    },
  ];

  // Filter tasks based on active filter
  const filteredTasks = tasks.filter(task => {
    if (!searchQuery) return true;
    return (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-base-300/10 to-base-300/5">
      {/* 深色背景覆盖 */}
      <div className="fixed inset-0 bg-black/80 -z-10"></div>

      {/* SVG Background with better patterns */}
      <div className="fixed top-0 left-0 w-full h-full -z-5 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M0,0 L40,0 L40,40 L0,40 L0,0 Z M39,1 L1,1 L1,39 L39,39 L39,1 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.5" fill="currentColor" />
            </pattern>
            <mask id="gridMask">
              <rect width="100%" height="100%" fill="url(#grid)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
          <rect width="100%" height="100%" fill="currentColor" mask="url(#gridMask)" opacity="0.2" />
        </svg>
      </div>

      {/* 顶部装饰光效 */}
      <div className="fixed top-0 left-[10%] w-[35%] h-[40vh] bg-purple-600/20 blur-[120px] rounded-full -z-1"></div>
      <div className="fixed top-[20%] right-[10%] w-[25%] h-[30vh] bg-blue-600/20 blur-[100px] rounded-full -z-1"></div>
      <div className="fixed bottom-[10%] left-[20%] w-[30%] h-[30vh] bg-indigo-600/20 blur-[100px] rounded-full -z-1"></div>

      {/* Header Section with improved styling */}
      <div className="w-full pt-12 pb-0 relative">
        <div className="px-4 pt-8 pb-6 mx-auto max-w-6xl">
          <div className="relative">
            <h1 className="mb-2 text-4xl font-bold sm:text-5xl relative z-10 text-center animate-fade-in">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-200 font-extrabold">
                Task Marketplace
              </span>
            </h1>

            <div className="relative mb-8 max-w-3xl mx-auto text-center">
              <p className="text-lg opacity-80 delay-100 animate-fade-in">
                Discover innovative projects and contribute your skills to help bring them to life
              </p>
            </div>
          </div>

          {/* 只保留搜索框 */}
          <div className="flex flex-col w-full delay-200 animate-fade-in mb-8">
            {/* Search with improved styling */}
            <div className="w-full max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full shadow-lg input input-md bg-base-200/60 backdrop-blur-sm border-purple-900/30 focus:border-purple-500/50 text-lg pl-10 rounded-xl"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-300 opacity-80"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                {searchQuery && (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-circle text-purple-300"
                    onClick={() => setSearchQuery("")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 筛选标签 */}
      <div className="w-full mx-auto max-w-6xl px-4 mb-4">
        <div className="flex gap-2 justify-center flex-wrap">
          <button className="btn btn-sm bg-purple-900/80 text-purple-200 hover:bg-purple-800/80 border-none rounded-lg">
            All Projects
          </button>
          <button className="btn btn-sm bg-transparent hover:bg-purple-900/50 text-purple-300 border-none rounded-lg">
            Funding Open
          </button>
          <button className="btn btn-sm bg-transparent hover:bg-purple-900/50 text-purple-300 border-none rounded-lg">
            Tasks Available
          </button>
          <div className="ml-2"></div>
          <button className="btn btn-sm bg-green-900/80 text-green-200 hover:bg-green-800/80 border-none rounded-lg">
            All Status
          </button>
          <button className="btn btn-sm bg-transparent hover:bg-green-900/50 text-green-300 border-none rounded-lg">
            Active
          </button>
          <button className="btn btn-sm bg-transparent hover:bg-green-900/50 text-green-300 border-none rounded-lg">
            Completed
          </button>
        </div>
      </div>

      {/* Task List with improved card layout */}
      <div className="px-4 py-4 pb-16 mx-auto max-w-6xl">
        {/* Results summary */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-purple-300">
            {filteredTasks.length} {filteredTasks.length === 1 ? "Project" : "Projects"} Available
          </h2>

          {searchQuery && (
            <button
              className="btn btn-sm bg-purple-900/50 hover:bg-purple-800/60 text-purple-200 border-none"
              onClick={() => {
                setSearchQuery("");
              }}
            >
              <span className="text-sm">Clear Search</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTasks.length === 0 ? (
            <div className="py-12 text-center col-span-full bg-base-200/10 backdrop-blur-sm rounded-2xl border border-purple-900/20">
              <div className="p-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-purple-300/50 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 110-16 8 8 0 010 16z"
                  />
                </svg>
                <p className="text-2xl text-purple-200 opacity-80">No projects match your search criteria</p>
                <button
                  className="mx-auto mt-6 btn btn-sm bg-purple-700 hover:bg-purple-600 text-white border-none rounded-lg"
                  onClick={() => {
                    setSearchQuery("");
                  }}
                >
                  <span className="text-lg">View All Projects</span>
                </button>
              </div>
            </div>
          ) : (
            filteredTasks.map(task => (
              <div key={task.id} className="group h-full">
                <div className="relative card h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                  {/* 更改卡片背景样式 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
                  <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>

                  <div className="relative card-body p-6 z-10">
                    {/* 项目标题 */}
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="card-title text-xl font-bold text-white leading-tight">{task.title}</h2>
                      <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                        <span
                          className={`badge badge-sm text-xs font-medium ${task.status === "Active" ? "bg-green-500/40 text-green-100" : "bg-blue-500/40 text-blue-100"} border-0 px-2 py-2 backdrop-blur-sm`}
                        >
                          {task.status}
                        </span>
                        <span className="badge badge-sm text-xs font-medium bg-indigo-500/40 text-indigo-100 border-0 px-2 py-2 backdrop-blur-sm">
                          {task.taskCount} {task.taskCount === 1 ? "task" : "tasks"}
                        </span>
                      </div>
                    </div>

                    {/* 描述 */}
                    <p
                      className="text-sm text-gray-300 mb-4"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {task.description}
                    </p>

                    {/* 技能标签 */}
                    <div className="h-[36px] flex flex-wrap gap-1.5 mb-3 overflow-hidden">
                      {task.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="badge badge-sm bg-purple-600/30 text-purple-100 hover:bg-purple-500/40 transition-colors border-0 text-xs py-1 backdrop-blur-sm"
                        >
                          {skill}
                        </span>
                      ))}
                      <span className="badge badge-sm bg-blue-600/30 text-blue-100 hover:bg-blue-500/40 transition-colors border-0 text-xs py-1 backdrop-blur-sm">
                        {task.category}
                      </span>
                      {task.isAIRecommended && (
                        <span className="badge badge-sm bg-green-600/30 text-green-100 hover:bg-green-500/40 transition-colors border-0 text-xs py-1 backdrop-blur-sm">
                          AI Pick
                        </span>
                      )}
                    </div>

                    {/* 进度条 */}
                    <div className="w-full bg-purple-900/20 rounded-full h-2 mb-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${Math.min(100, 75)}%` }}
                      ></div>
                    </div>

                    {/* 奖励 */}
                    <div className="flex justify-between items-center text-xs text-gray-400 mb-4">
                      <span>{Math.floor(task.reward * 0.75)} USDC</span>
                      <span>Target: {task.reward} USDC</span>
                    </div>

                    {/* 评估 */}
                    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                      <div className="bg-purple-600/20 backdrop-blur-sm rounded p-1.5">
                        <div className="text-[0.65rem] text-purple-200 font-medium uppercase tracking-wide">Score</div>
                        <div className="font-bold text-sm text-white">8.5/10</div>
                      </div>
                      <div className="bg-blue-600/20 backdrop-blur-sm rounded p-1.5">
                        <div className="text-[0.65rem] text-blue-200 font-medium uppercase tracking-wide">Tech</div>
                        <div className="font-bold text-sm text-white">High</div>
                      </div>
                      <div className="bg-indigo-600/20 backdrop-blur-sm rounded p-1.5">
                        <div className="text-[0.65rem] text-indigo-200 font-medium uppercase tracking-wide">Value</div>
                        <div className="font-bold text-sm text-white">${task.reward / 10}K</div>
                      </div>
                    </div>

                    {/* 申请任务按钮 */}
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-sm relative overflow-hidden group/btn bg-purple-600/40 hover:bg-purple-500/50 border-none rounded-lg text-purple-100 gap-2 px-4 py-2 transition-all duration-300 backdrop-blur-sm"
                        onClick={() => handleApplyForTask(task.id)}
                        disabled={(isApplying && selectedTaskId === task.id) || task.status === "Completed"}
                      >
                        {/* 按钮背景光效 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        {/* 流光效果 */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 via-purple-300/30 to-purple-600/0 opacity-0 group-hover/btn:opacity-100 blur-sm transform translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-all duration-1000"></div>
                        {/* 边框效果 */}
                        <div className="absolute inset-0 border border-purple-400/20 rounded-lg pointer-events-none"></div>

                        <span className="text-xs z-10 relative">
                          {isApplying && selectedTaskId === task.id ? "Waiting for signature..." : "Apply for Task"}
                        </span>
                        {!(isApplying && selectedTaskId === task.id) && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 z-10 relative group-hover/btn:translate-x-0.5 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        )}
                        {isApplying && selectedTaskId === task.id && (
                          <svg
                            className="animate-spin h-3.5 w-3.5 text-white z-10"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
