"use client";

import { useState } from "react";

export const CommunityShowcase = () => {
  const [activeTab, setActiveTab] = useState("latest");

  // Mock data
  const latestCompletions = [
    {
      id: 1,
      title: "Amazing DeFi Explainer Video",
      creator: "@CreativeSoul",
      score: 95,
      xForwarded: true,
      isSubscribed: false,
      category: "Content",
      skills: ["Video", "DeFi"],
    },
    {
      id: 2,
      title: "Pixel Art Character Set",
      creator: "@PixelPioneer",
      score: 90,
      xForwarded: false,
      isSubscribed: true,
      category: "Design",
      skills: ["Pixel Art", "NFT"],
    },
    {
      id: 3,
      title: "In-depth Analysis of Solana vs Ethereum for Gaming",
      creator: "@BlockchainGamer",
      score: 88,
      xForwarded: true,
      isSubscribed: false,
      category: "Research",
      skills: ["Gaming", "Analysis"],
    },
  ];

  const trendingCreators = [
    {
      id: 1,
      username: "@AI_Whiz",
      skills: ["AI", "Python"],
      completedTasks: 42,
      averageScore: 93,
      isSubscribed: false,
      category: "Development",
    },
    {
      id: 2,
      username: "@DesignMaster",
      skills: ["UI/UX", "Branding"],
      completedTasks: 28,
      averageScore: 96,
      isSubscribed: true,
      category: "Design",
    },
    {
      id: 3,
      username: "@CryptoExplainer",
      skills: ["Writing", "Education"],
      completedTasks: 35,
      averageScore: 91,
      isSubscribed: false,
      category: "Content",
    },
  ];

  const mySubscriptions = trendingCreators.filter(creator => creator.isSubscribed);

  // Dynamic content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "latest":
        return (
          <div className="space-y-5">
            {latestCompletions.map(completion => (
              <div key={completion.id} className="group">
                <div className="relative rounded-2xl hover:scale-[1.01] transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
                  <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>

                  <div className="relative p-6 z-10 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">&quot;{completion.title}&quot;</h3>
                        <p className="text-sm text-purple-200">by {completion.creator}</p>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {completion.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="badge badge-sm bg-purple-600/30 text-purple-100 backdrop-blur-sm text-xs py-1"
                            >
                              {skill}
                            </span>
                          ))}
                          <span className="badge badge-sm bg-blue-600/30 text-blue-100 backdrop-blur-sm text-xs py-1">
                            {completion.category}
                          </span>
                          <span className="badge badge-sm bg-green-600/30 text-green-100 backdrop-blur-sm text-xs py-1">
                            Score: {completion.score}
                          </span>
                          {completion.xForwarded && (
                            <span className="badge badge-sm bg-indigo-600/30 text-indigo-100 backdrop-blur-sm text-xs py-1">
                              X-Forwarded
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button className="btn btn-sm relative overflow-hidden group/btn bg-purple-600/40 hover:bg-purple-500/50 border-none rounded-lg text-purple-100 gap-1 px-3 py-2 transition-all duration-300 backdrop-blur-sm">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 border border-purple-400/20 rounded-lg pointer-events-none"></div>
                          <span className="text-xs z-10 relative">View Task</span>
                        </button>

                        <button className="btn btn-sm relative overflow-hidden group/btn bg-gray-800/40 hover:bg-gray-700/50 border-none rounded-lg text-gray-200 gap-1 px-3 py-2 transition-all duration-300 backdrop-blur-sm">
                          <div className="absolute inset-0 border border-gray-400/20 rounded-lg pointer-events-none"></div>
                          <span className="text-xs z-10 relative">View Profile</span>
                        </button>

                        <button className="btn btn-sm relative overflow-hidden group/btn bg-blue-600/40 hover:bg-blue-500/50 border-none rounded-lg text-blue-100 gap-1 px-3 py-2 transition-all duration-300 backdrop-blur-sm">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 border border-blue-400/20 rounded-lg pointer-events-none"></div>
                          <span className="text-xs z-10 relative">
                            {completion.isSubscribed ? "Subscribed" : "Buy SoulCoin"}
                          </span>
                        </button>

                        <button className="btn btn-sm relative overflow-hidden group/btn bg-green-600/40 hover:bg-green-500/50 border-none rounded-lg text-green-100 gap-1 px-3 py-2 transition-all duration-300 backdrop-blur-sm">
                          <div className="absolute inset-0 border border-green-400/20 rounded-lg pointer-events-none"></div>
                          <span className="text-xs z-10 relative">Tip</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "trending":
        return (
          <div className="space-y-5">
            {trendingCreators.map(creator => (
              <div key={creator.id} className="group">
                <div className="relative rounded-2xl hover:scale-[1.01] transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
                  <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>

                  <div className="relative p-6 z-10 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">{creator.username}</h3>

                        <div className="flex flex-wrap gap-1.5 mt-2 mb-2">
                          {creator.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="badge badge-sm bg-purple-600/30 text-purple-100 backdrop-blur-sm text-xs py-1"
                            >
                              {skill}
                            </span>
                          ))}
                          <span className="badge badge-sm bg-blue-600/30 text-blue-100 backdrop-blur-sm text-xs py-1">
                            {creator.category}
                          </span>
                        </div>

                        <div className="flex gap-3 text-xs mt-1">
                          <span className="text-purple-200">
                            <span className="font-semibold text-white">{creator.completedTasks}</span> Tasks
                          </span>
                          <span className="text-green-200">
                            <span className="font-semibold text-white">{creator.averageScore}</span> Avg Score
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="btn btn-sm relative overflow-hidden group/btn bg-gray-800/40 hover:bg-gray-700/50 border-none rounded-lg text-gray-200 gap-1 px-3 py-2 transition-all duration-300 backdrop-blur-sm">
                          <div className="absolute inset-0 border border-gray-400/20 rounded-lg pointer-events-none"></div>
                          <span className="text-xs z-10 relative">View Profile</span>
                        </button>

                        <button className="btn btn-sm relative overflow-hidden group/btn bg-blue-600/40 hover:bg-blue-500/50 border-none rounded-lg text-blue-100 gap-1 px-3 py-2 transition-all duration-300 backdrop-blur-sm">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 border border-blue-400/20 rounded-lg pointer-events-none"></div>
                          <span className="text-xs z-10 relative">
                            {creator.isSubscribed ? "Subscribed" : "Subscribe"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "subscriptions":
        return mySubscriptions.length === 0 ? (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
            <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>

            <div className="relative p-8 z-10 backdrop-blur-sm text-center">
              <p className="text-gray-300 mb-4">You haven&apos;t subscribed to any creators yet.</p>
              <button className="btn btn-sm relative overflow-hidden group/btn bg-purple-600/40 hover:bg-purple-500/50 border-none rounded-lg text-purple-100 gap-1 px-4 py-2 transition-all duration-300 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 border border-purple-400/20 rounded-lg pointer-events-none"></div>
                <span className="text-xs z-10 relative">Discover Creators</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {mySubscriptions.map(creator => (
              <div key={creator.id} className="group">
                <div className="relative rounded-2xl hover:scale-[1.01] transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
                  <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>

                  <div className="relative p-6 z-10 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">{creator.username}</h3>

                        <div className="flex flex-wrap gap-1.5 mt-2 mb-2">
                          {creator.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="badge badge-sm bg-purple-600/30 text-purple-100 backdrop-blur-sm text-xs py-1"
                            >
                              {skill}
                            </span>
                          ))}
                          <span className="badge badge-sm bg-blue-600/30 text-blue-100 backdrop-blur-sm text-xs py-1">
                            {creator.category}
                          </span>
                        </div>

                        <div className="flex gap-3 text-xs mt-1">
                          <span className="text-purple-200">
                            <span className="font-semibold text-white">{creator.completedTasks}</span> Tasks
                          </span>
                          <span className="text-green-200">
                            <span className="font-semibold text-white">{creator.averageScore}</span> Avg Score
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="btn btn-sm relative overflow-hidden group/btn bg-purple-600/40 hover:bg-purple-500/50 border-none rounded-lg text-purple-100 gap-1 px-3 py-2 transition-all duration-300 backdrop-blur-sm">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 border border-purple-400/20 rounded-lg pointer-events-none"></div>
                          <span className="text-xs z-10 relative">View Latest Work</span>
                        </button>

                        <button className="btn btn-sm relative overflow-hidden group/btn bg-gray-800/40 hover:bg-gray-700/50 border-none rounded-lg text-gray-200 gap-1 px-3 py-2 transition-all duration-300 backdrop-blur-sm">
                          <div className="absolute inset-0 border border-gray-400/20 rounded-lg pointer-events-none"></div>
                          <span className="text-xs z-10 relative">Manage Subscription</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

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

      <div className="w-full pt-12 pb-16 px-4 sm:px-6 relative max-w-6xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center mb-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-200 font-extrabold">
            Community Showcase
          </span>
        </h1>

        {/* Tabs */}
        <div className="relative py-2 px-1 rounded-xl mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-gray-800/60 to-purple-900/20 rounded-xl"></div>
          <div className="absolute inset-0 border border-purple-500/20 rounded-xl"></div>

          <div className="relative z-10 flex flex-wrap justify-center gap-2 backdrop-blur-sm py-1">
            <button
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                activeTab === "latest"
                  ? "bg-purple-600/40 text-white font-medium"
                  : "bg-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/30"
              }`}
              onClick={() => setActiveTab("latest")}
            >
              Latest Completions
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                activeTab === "trending"
                  ? "bg-purple-600/40 text-white font-medium"
                  : "bg-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/30"
              }`}
              onClick={() => setActiveTab("trending")}
            >
              Trending Creators
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                activeTab === "subscriptions"
                  ? "bg-purple-600/40 text-white font-medium"
                  : "bg-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/30"
              }`}
              onClick={() => setActiveTab("subscriptions")}
            >
              My Subscriptions
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};
