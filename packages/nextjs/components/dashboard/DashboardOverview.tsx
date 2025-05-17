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
    { id: 1, title: "Build ERC20 Token on Base Network", reward: 100 },
    { id: 2, title: "Design 3D NFT Collection", reward: 150 },
  ];

  const communityHighlights = [
    { user: "CryptoWiz", task: "Created On-Chain Game Tutorial", link: "#" },
    { user: "DesignMaster", task: "Logo Design for Airstack", link: "#" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      {/* Quick Stats */}
      <section className="bg-base-200 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat bg-base-100 rounded-lg p-4">
            <div className="stat-title">My Active Tasks</div>
            <div className="stat-value">{stats.activeTasks}</div>
            <div className="stat-desc">In Progress</div>
          </div>
          <div className="stat bg-base-100 rounded-lg p-4">
            <div className="stat-title">Pending Review</div>
            <div className="stat-value">{stats.pendingReview}</div>
            <div className="stat-desc">Waiting for approval</div>
          </div>
          <div className="stat bg-base-100 rounded-lg p-4">
            <div className="stat-title">IDEA Balance</div>
            <div className="stat-value">{stats.ideaBalance}</div>
            <div className="stat-desc">Available tokens</div>
          </div>
          <div className="stat bg-base-100 rounded-lg p-4">
            <div className="stat-title">SoulCoin Value (Est.)</div>
            <div className="stat-value">${stats.soulCoinValue}</div>
            <div className="stat-desc">Based on recent transactions</div>
          </div>
          <div className="stat bg-base-100 rounded-lg p-4">
            <div className="stat-title">Reputation</div>
            <div className="stat-value">{stats.reputation}</div>
            <div className="stat-desc">Community standing</div>
          </div>
          <div className="stat bg-base-100 rounded-lg p-4">
            <div className="stat-title">Next Pro Renewal</div>
            <div className="stat-value">{stats.nextRenewal}</div>
            <div className="stat-desc">Subscription date</div>
          </div>
        </div>
      </section>

      {/* Skill Radar */}
      <section className="bg-base-200 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">My Skill Radar</h2>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name} className="w-full">
              <div className="flex justify-between mb-1">
                <span>{skill.name}</span>
                <span>{skill.value * 100}%</span>
              </div>
              <div className="w-full bg-base-300 rounded-full h-4">
                <div
                  className="bg-primary h-4 rounded-full"
                  style={{ width: `${skill.value * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Tasks */}
      <section className="bg-base-200 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Recently Recommended Tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedTasks.map((task) => (
            <div key={task.id} className="bg-base-100 p-4 rounded-lg">
              <div className="font-bold">{task.title}</div>
              <div className="text-sm">Reward: {task.reward} IDEA</div>
              <button className="btn btn-primary btn-sm mt-2">View Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* Community Highlights */}
      <section className="bg-base-200 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Latest Community Highlights</h2>
        <div className="space-y-4">
          {communityHighlights.map((highlight, index) => (
            <div key={index} className="bg-base-100 p-4 rounded-lg flex justify-between items-center">
              <div>
                <span className="font-bold">{highlight.user}</span> completed "{highlight.task}"
              </div>
              <a href={highlight.link} className="btn btn-primary btn-sm">
                View in Community
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}; 