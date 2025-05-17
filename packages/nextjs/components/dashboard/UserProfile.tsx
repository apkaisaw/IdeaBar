"use client";

import { Address } from "~~/components/scaffold-eth";
import { useAccount } from "wagmi";

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
      },
      {
        id: 2,
        title: "NFT Collection",
        description: "A generative art NFT collection with 5,000 unique items.",
        imageUrl: "https://placehold.co/600x400/png",
        link: "#",
      },
      {
        id: 3,
        title: "Smart Contract Audits",
        description: "Performed security audits for 10+ projects in the ecosystem.",
        imageUrl: "https://placehold.co/600x400/png",
        link: "#",
      },
    ],
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Profile</h1>
      
      {/* Profile Header */}
      <section className="bg-base-200 p-6 rounded-xl">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Avatar & Basic Info */}
          <div className="text-center md:text-left">
            <div className="avatar placeholder mb-4">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                <span className="text-3xl">BB</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold">{userData.username}</h2>
            <div className="my-2">
              <Address address={address} />
            </div>
          </div>
          
          {/* Stats & Bio */}
          <div className="flex-1">
            <p className="text-base-content/80 mb-4">{userData.bio}</p>
            
            <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
              <div className="stat">
                <div className="stat-title">Reputation</div>
                <div className="stat-value">{userData.reputation}</div>
                <div className="stat-desc">Top 5%</div>
              </div>
              
              <div className="stat">
                <div className="stat-title">Tasks Completed</div>
                <div className="stat-value">{userData.completedTasks}</div>
                <div className="stat-desc">Last month: +5</div>
              </div>
              
              <div className="stat">
                <div className="stat-title">Total Earned</div>
                <div className="stat-value">{userData.totalEarned} IDEA</div>
                <div className="stat-desc">≈ $350</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills */}
      <section className="bg-base-200 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Skills & Expertise</h2>
        <div className="flex flex-wrap gap-2">
          {userData.skills.map((skill, index) => (
            <div key={index} className="badge badge-lg badge-primary">{skill}</div>
          ))}
          <button className="badge badge-lg badge-outline">+ Add Skill</button>
        </div>
      </section>
      
      {/* Portfolio */}
      <section className="bg-base-200 p-6 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Portfolio & Work Showcase</h2>
          <button className="btn btn-primary btn-sm">Add New Item</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userData.portfolioItems.map(item => (
            <div key={item.id} className="card bg-base-100 shadow-xl">
              <figure>
                <img src={item.imageUrl} alt={item.title} />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{item.title}</h3>
                <p>{item.description}</p>
                <div className="card-actions justify-end">
                  <a href={item.link} className="btn btn-primary btn-sm">View Project</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Connected Accounts */}
      <section className="bg-base-200 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Connected Accounts</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              <span>GitHub</span>
            </div>
            <button className="btn btn-sm btn-primary">Connect</button>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              <span>Twitter/X</span>
            </div>
            <div className="badge badge-success gap-2">Connected</div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              <span>LinkedIn</span>
            </div>
            <button className="btn btn-sm btn-primary">Connect</button>
          </div>
        </div>
      </section>
    </div>
  );
}; 