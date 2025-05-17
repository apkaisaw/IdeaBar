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
    },
    {
      id: 2,
      title: "Pixel Art Character Set",
      creator: "@PixelPioneer",
      score: 90,
      xForwarded: false,
      isSubscribed: true,
    },
    {
      id: 3,
      title: "In-depth Analysis of Solana vs Ethereum for Gaming",
      creator: "@BlockchainGamer",
      score: 88,
      xForwarded: true,
      isSubscribed: false,
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
    },
    {
      id: 2,
      username: "@DesignMaster",
      skills: ["UI/UX", "Branding"],
      completedTasks: 28,
      averageScore: 96,
      isSubscribed: true,
    },
    {
      id: 3,
      username: "@CryptoExplainer",
      skills: ["Writing", "Education"],
      completedTasks: 35,
      averageScore: 91,
      isSubscribed: false,
    },
  ];

  const mySubscriptions = trendingCreators.filter(creator => creator.isSubscribed);

  // Dynamic content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "latest":
        return (
          <div className="space-y-4">
            {latestCompletions.map(completion => (
              <div key={completion.id} className="bg-base-200 p-6 rounded-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold">"{completion.title}"</h3>
                    <p className="text-sm">by {completion.creator} (Score: {completion.score})</p>
                    
                    {completion.xForwarded && (
                      <div className="mt-2 badge badge-info">X-Forwarded: Yes</div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="btn btn-sm">View Task</button>
                    <button className="btn btn-sm btn-outline">View Profile</button>
                    <button className="btn btn-sm btn-primary">
                      {completion.isSubscribed ? "Subscribed" : "Buy SoulCoin"}
                    </button>
                    <button className="btn btn-sm btn-outline">Tip</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
        
      case "trending":
        return (
          <div className="space-y-4">
            {trendingCreators.map(creator => (
              <div key={creator.id} className="bg-base-200 p-6 rounded-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">{creator.username}</h3>
                    <p className="text-sm">Skills: {creator.skills.join(", ")}</p>
                    <p className="text-xs mt-1">
                      Completed {creator.completedTasks} tasks with average score of {creator.averageScore}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="btn btn-sm btn-outline">View Profile</button>
                    <button className="btn btn-sm btn-primary">
                      {creator.isSubscribed ? "Subscribed" : "Subscribe"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
        
      case "subscriptions":
        return mySubscriptions.length === 0 ? (
          <div className="bg-base-200 p-6 rounded-xl text-center">
            <p>You haven't subscribed to any creators yet.</p>
            <button className="btn btn-primary mt-4">Discover Creators</button>
          </div>
        ) : (
          <div className="space-y-4">
            {mySubscriptions.map(creator => (
              <div key={creator.id} className="bg-base-200 p-6 rounded-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">{creator.username}</h3>
                    <p className="text-sm">Skills: {creator.skills.join(", ")}</p>
                    <p className="text-xs mt-1">
                      Completed {creator.completedTasks} tasks with average score of {creator.averageScore}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="btn btn-sm">View Latest Work</button>
                    <button className="btn btn-sm btn-outline">Manage Subscription</button>
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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Community Showcase & Activity</h1>
      
      {/* Tabs */}
      <div className="tabs tabs-boxed bg-base-200 p-2">
        <button 
          className={`tab ${activeTab === "latest" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("latest")}
        >
          Latest Completions
        </button>
        <button 
          className={`tab ${activeTab === "trending" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("trending")}
        >
          Trending Creators
        </button>
        <button 
          className={`tab ${activeTab === "subscriptions" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("subscriptions")}
        >
          My Subscriptions
        </button>
      </div>
      
      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
}; 