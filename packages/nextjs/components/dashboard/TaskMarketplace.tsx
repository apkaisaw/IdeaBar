"use client";

import { useState } from "react";

export const TaskMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Category:Dev", "Category:Design", "Category:Writing", "Reward:High", "AI Recommended"];

  // Mock task data
  const tasks = [
    {
      id: 1,
      title: "Smart Contract Audit for Project X",
      reward: 200,
      skills: ["Solidity", "Security"],
      description: "Perform a comprehensive security audit for a DeFi project. Look for vulnerabilities and provide recommendations for improvements.",
      category: "Dev",
      isHighReward: true,
      isAIRecommended: true,
    },
    {
      id: 2,
      title: "Create Marketing Copy for NFT Launch",
      reward: 70,
      skills: ["Writing", "Crypto"],
      description: "Write compelling marketing copy for an upcoming NFT collection launch. Should appeal to both crypto-natives and mainstream audiences.",
      category: "Writing",
      isHighReward: false,
      isAIRecommended: false,
    },
    {
      id: 3,
      title: "Design UI for Staking Dashboard",
      reward: 150,
      skills: ["UI/UX", "Design"],
      description: "Create user interface designs for a staking dashboard that displays rewards, APY, and allows users to stake/unstake their tokens.",
      category: "Design",
      isHighReward: true,
      isAIRecommended: true,
    },
    {
      id: 4,
      title: "Build NFT Marketplace Smart Contract",
      reward: 300,
      skills: ["Solidity", "NFT"],
      description: "Develop a secure and gas-optimized smart contract for an NFT marketplace with support for ERC-721 and ERC-1155 tokens.",
      category: "Dev",
      isHighReward: true,
      isAIRecommended: false,
    },
  ];

  // Filter tasks based on active filter
  const filteredTasks = tasks.filter(task => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Category:Dev") return task.category === "Dev";
    if (activeFilter === "Category:Design") return task.category === "Design";
    if (activeFilter === "Category:Writing") return task.category === "Writing";
    if (activeFilter === "Reward:High") return task.isHighReward;
    if (activeFilter === "AI Recommended") return task.isAIRecommended;
    return true;
  }).filter(task => {
    if (!searchQuery) return true;
    return task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           task.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Task Marketplace</h1>
      
      {/* Filters and Search */}
      <div className="bg-base-200 p-4 rounded-xl">
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.map(filter => (
            <button 
              key={filter} 
              className={`btn btn-sm ${activeFilter === filter ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="form-control">
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Search tasks by title, skills or description..." 
              className="input input-bordered w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-square">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Task List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Available Tasks</h2>
        
        {filteredTasks.length === 0 ? (
          <div className="bg-base-200 p-6 rounded-xl text-center">
            <p>No tasks match your search criteria</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className="bg-base-200 p-6 rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{task.title}</h3>
                  <p className="text-sm mt-1">{task.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {task.skills.map(skill => (
                      <span key={skill} className="badge badge-outline">{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-lg text-primary">
                    Reward: {task.reward} IDEA
                  </div>
                  <button className="btn btn-primary btn-sm mt-2">View Details</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}; 