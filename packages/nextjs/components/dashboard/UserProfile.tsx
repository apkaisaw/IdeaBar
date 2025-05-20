"use client";

import Image from "next/image";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

export const UserProfile = () => {
  const { address } = useAccount();

  // Mock user data
  const userData = {
    username: "@Blockchain_Builder",
    bio: "Passionate blockchain developer and designer focused on creating web3 experiences. Always learning, always building.",
    skills: ["Solidity", "React", "TypeScript", "UI/UX"],
    reputation: 750,
    completedTasks: 35,
    totalEarned: 1250,
    portfolioItems: [
      {
        id: 1,
        title: "DeFi Dashboard",
        description: "A complete dashboard for tracking DeFi investments and yield farming.",
        imageUrl: "https://placehold.co/600x400/png",
        link: "#",
        category: "Development",
      },
      {
        id: 2,
        title: "NFT Collection",
        description: "A generative art NFT collection with 5,000 unique items.",
        imageUrl: "https://placehold.co/600x400/png",
        link: "#",
        category: "Art",
      },
      {
        id: 3,
        title: "Smart Contract Audits",
        description: "Performed security audits for 10+ projects in the ecosystem.",
        imageUrl: "https://placehold.co/600x400/png",
        link: "#",
        category: "Security",
      },
    ],
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

      <div className="w-full pt-12 pb-16 px-4 sm:px-6 relative max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-200 font-extrabold">
            My Profile
          </span>
        </h1>

        {/* Profile Header */}
        <section className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
            <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>

            <div className="relative p-6 z-10 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                {/* Avatar & Basic Info */}
                <div className="text-center md:text-left">
                  <div className="avatar mb-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/80 to-pink-500/80 p-1">
                      <div className="rounded-full w-full h-full bg-gray-900/60 backdrop-blur-md flex items-center justify-center text-white">
                        <span className="text-3xl font-bold">BB</span>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white">{userData.username}</h2>
                  <div className="my-2 text-purple-200">
                    <Address address={address} />
                  </div>
                </div>

                {/* Stats & Bio */}
                <div className="flex-1">
                  <p className="text-gray-300 mb-6">{userData.bio}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-purple-800/40 to-purple-900/30 rounded-xl"></div>
                      <div className="absolute inset-0 border border-purple-500/20 rounded-xl"></div>
                      <div className="relative p-4 backdrop-blur-sm">
                        <div className="text-sm text-purple-300 opacity-80">Reputation</div>
                        <div className="text-2xl font-bold text-white">{userData.reputation}</div>
                        <div className="text-xs text-blue-200">Top 5%</div>
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-blue-800/40 to-blue-900/30 rounded-xl"></div>
                      <div className="absolute inset-0 border border-blue-500/20 rounded-xl"></div>
                      <div className="relative p-4 backdrop-blur-sm">
                        <div className="text-sm text-blue-300 opacity-80">Tasks Completed</div>
                        <div className="text-2xl font-bold text-white">{userData.completedTasks}</div>
                        <div className="text-xs text-blue-200">Last month: +5</div>
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-indigo-800/40 to-indigo-900/30 rounded-xl"></div>
                      <div className="absolute inset-0 border border-indigo-500/20 rounded-xl"></div>
                      <div className="relative p-4 backdrop-blur-sm">
                        <div className="text-sm text-indigo-300 opacity-80">Total Earned</div>
                        <div className="text-2xl font-bold text-white">{userData.totalEarned} IDEA</div>
                        <div className="text-xs text-blue-200">≈ $350</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-purple-200">Skills & Expertise</h2>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
            <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>

            <div className="relative p-6 z-10 backdrop-blur-sm">
              <div className="flex flex-wrap gap-2">
                {userData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="badge badge-sm bg-purple-600/30 text-purple-100 backdrop-blur-sm text-xs px-3 py-2 border-purple-500/20"
                  >
                    {skill}
                  </span>
                ))}
                <button className="badge badge-sm bg-gray-800/40 text-gray-200 hover:bg-gray-700/50 backdrop-blur-sm text-xs px-3 py-2 border border-gray-500/20 transition-colors">
                  + Add Skill
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-purple-200">Portfolio & Work Showcase</h2>
            <button className="btn btn-sm relative overflow-hidden group/btn bg-purple-600/40 hover:bg-purple-500/50 border-none rounded-lg text-purple-100 gap-1 px-3 py-2 transition-all duration-300 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 border border-purple-400/20 rounded-lg pointer-events-none"></div>
              <span className="text-xs z-10 relative">Add New Item</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userData.portfolioItems.map(item => (
              <div key={item.id} className="group">
                <div className="relative card h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
                  <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>

                  <div className="relative z-10">
                    <figure className="px-3 pt-3">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={400}
                        height={192}
                        className="rounded-xl h-48 w-full object-cover"
                      />
                    </figure>
                    <div className="card-body p-5">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="card-title text-white text-lg">{item.title}</h3>
                        <span className="badge badge-sm bg-blue-600/30 text-blue-100 backdrop-blur-sm text-xs py-1">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                      <div className="card-actions justify-end">
                        <a
                          href={item.link}
                          className="btn btn-sm relative overflow-hidden group/btn bg-purple-600/40 hover:bg-purple-500/50 border-none rounded-lg text-purple-100 gap-1 px-3 py-2 transition-all duration-300 backdrop-blur-sm"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 border border-purple-400/20 rounded-lg pointer-events-none"></div>
                          <span className="text-xs z-10 relative">View Project</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Connected Accounts */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-purple-200">Connected Accounts</h2>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
            <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>

            <div className="relative p-6 z-10 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-300"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    <span className="text-gray-200">GitHub</span>
                  </div>
                  <button className="btn btn-sm relative overflow-hidden group/btn bg-purple-600/40 hover:bg-purple-500/50 border-none rounded-lg text-purple-100 gap-1 px-3 py-2 transition-all duration-300 backdrop-blur-sm">
                    <div className="absolute inset-0 border border-purple-400/20 rounded-lg pointer-events-none"></div>
                    <span className="text-xs z-10 relative">Connect</span>
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-300"
                    >
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                    <span className="text-gray-200">Twitter/X</span>
                  </div>
                  <div className="badge badge-sm bg-green-600/40 text-green-100 backdrop-blur-sm px-3 py-2 border border-green-500/20">
                    Connected
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-300"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    <span className="text-gray-200">LinkedIn</span>
                  </div>
                  <button className="btn btn-sm relative overflow-hidden group/btn bg-purple-600/40 hover:bg-purple-500/50 border-none rounded-lg text-purple-100 gap-1 px-3 py-2 transition-all duration-300 backdrop-blur-sm">
                    <div className="absolute inset-0 border border-purple-400/20 rounded-lg pointer-events-none"></div>
                    <span className="text-xs z-10 relative">Connect</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
