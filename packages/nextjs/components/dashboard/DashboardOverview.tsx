"use client";

export const DashboardOverview = () => {
  // Mock data
  const stats = {
    activeTasks: 3,
    pendingReview: 1,
    ideaBalance: 55,
    soulCoinValue: 12.5,
    reputation: 750,
    nextRenewal: "2023-12-31",
  };

  const skills = [
    { name: "Coding", value: 0.4 },
    { name: "Design", value: 0.8 },
    { name: "Writing", value: 0.6 },
  ];

  const recommendedTasks = [
    { id: 1, title: "Build ERC20 Token on Base Network", reward: 100, category: "Dev", skills: ["Solidity", "EVM"] },
    { id: 2, title: "Design 3D NFT Collection", reward: 150, category: "Design", skills: ["3D", "Blender"] },
  ];

  const communityHighlights = [
    { user: "CryptoWiz", task: "Created On-Chain Game Tutorial", link: "#", category: "Tutorial" },
    { user: "DesignMaster", task: "Logo Design for Airstack", link: "#", category: "Design" },
  ];

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

      <div className="w-full pt-12 pb-16 px-4 sm:px-6 relative max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-200 font-extrabold">
            Dashboard Overview
          </span>
        </h1>

        {/* Quick Stats */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6 text-purple-200">Quick Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
              <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>
              <div className="stat relative z-10 p-5 backdrop-blur-sm">
                <div className="stat-title text-purple-300 opacity-80">My Active Tasks</div>
                <div className="stat-value text-white">{stats.activeTasks}</div>
                <div className="stat-desc text-blue-200">In Progress</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
              <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>
              <div className="stat relative z-10 p-5 backdrop-blur-sm">
                <div className="stat-title text-purple-300 opacity-80">Pending Review</div>
                <div className="stat-value text-white">{stats.pendingReview}</div>
                <div className="stat-desc text-blue-200">Waiting for approval</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
              <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>
              <div className="stat relative z-10 p-5 backdrop-blur-sm">
                <div className="stat-title text-purple-300 opacity-80">IDEA Balance</div>
                <div className="stat-value text-white">{stats.ideaBalance}</div>
                <div className="stat-desc text-blue-200">Available tokens</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
              <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>
              <div className="stat relative z-10 p-5 backdrop-blur-sm">
                <div className="stat-title text-purple-300 opacity-80">SoulCoin Value (Est.)</div>
                <div className="stat-value text-white">${stats.soulCoinValue}</div>
                <div className="stat-desc text-blue-200">Based on recent transactions</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
              <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>
              <div className="stat relative z-10 p-5 backdrop-blur-sm">
                <div className="stat-title text-purple-300 opacity-80">Reputation</div>
                <div className="stat-value text-white">{stats.reputation}</div>
                <div className="stat-desc text-blue-200">Community standing</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
              <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>
              <div className="stat relative z-10 p-5 backdrop-blur-sm">
                <div className="stat-title text-purple-300 opacity-80">Next Pro Renewal</div>
                <div className="stat-value text-white">{stats.nextRenewal}</div>
                <div className="stat-desc text-blue-200">Subscription date</div>
              </div>
            </div>
          </div>
        </section>

        {/* Skill Radar */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6 text-purple-200">My Skill Radar</h2>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
            <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>
            <div className="relative z-10 p-6 backdrop-blur-sm space-y-5">
              {skills.map(skill => (
                <div key={skill.name} className="w-full">
                  <div className="flex justify-between mb-2">
                    <span className="text-purple-200">{skill.name}</span>
                    <span className="text-blue-200">{skill.value * 100}%</span>
                  </div>
                  <div className="w-full bg-gray-700/40 rounded-full h-3 backdrop-blur-sm">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                      style={{ width: `${skill.value * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Tasks */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6 text-purple-200">Recently Recommended Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedTasks.map(task => (
              <div key={task.id} className="group h-full">
                <div className="relative card h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
                  <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>

                  <div className="relative card-body p-6 z-10">
                    <h3 className="card-title text-white mb-2">{task.title}</h3>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {task.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="badge badge-sm bg-purple-600/30 text-purple-100 backdrop-blur-sm text-xs py-1"
                        >
                          {skill}
                        </span>
                      ))}
                      <span className="badge badge-sm bg-blue-600/30 text-blue-100 backdrop-blur-sm text-xs py-1">
                        {task.category}
                      </span>
                    </div>

                    <div className="text-sm text-gray-300 mb-4">Reward: {task.reward} IDEA</div>

                    <div className="card-actions justify-end">
                      <button className="btn btn-sm relative overflow-hidden group/btn bg-purple-600/40 hover:bg-purple-500/50 border-none rounded-lg text-purple-100 gap-2 px-4 py-2 transition-all duration-300 backdrop-blur-sm">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 via-purple-300/30 to-purple-600/0 opacity-0 group-hover/btn:opacity-100 blur-sm transform translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-all duration-1000"></div>
                        <div className="absolute inset-0 border border-purple-400/20 rounded-lg pointer-events-none"></div>

                        <span className="text-xs z-10 relative">View Details</span>
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
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Highlights */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-purple-200">Latest Community Highlights</h2>
          <div className="space-y-5">
            {communityHighlights.map((highlight, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
                <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>
                <div className="relative z-10 p-5 backdrop-blur-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="font-bold text-purple-200">{highlight.user}</span>
                    <span className="text-gray-300"> completed &quot;</span>
                    <span className="text-white">{highlight.task}</span>
                    <span className="text-gray-300">&quot;</span>
                    <div className="mt-1">
                      <span className="badge badge-sm bg-blue-600/30 text-blue-100 backdrop-blur-sm text-xs py-1">
                        {highlight.category}
                      </span>
                    </div>
                  </div>
                  <a
                    href={highlight.link}
                    className="btn btn-sm relative overflow-hidden group/btn bg-purple-600/40 hover:bg-purple-500/50 border-none rounded-lg text-purple-100 gap-2 px-4 py-2 transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 border border-purple-400/20 rounded-lg pointer-events-none"></div>

                    <span className="text-xs z-10 relative">View in Community</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
