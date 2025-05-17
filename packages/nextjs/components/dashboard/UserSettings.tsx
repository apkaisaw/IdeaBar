"use client";

import { useState } from "react";
import { Address } from "~~/components/scaffold-eth";
import { useAccount } from "wagmi";

export const UserSettings = () => {
  const { address } = useAccount();
  
  // Mock settings state
  const [settings, setSettings] = useState({
    displayName: "@Blockchain_Builder",
    email: "user@example.com",
    profileVisibility: "public",
    taskNotifications: true,
    marketplaceUpdates: true,
    communityNotifications: false,
    theme: "system",
    language: "english",
  });
  
  const handleChange = (field: string, value: any) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };
  
  const handleSave = () => {
    // Mock save functionality
    alert("Settings saved successfully!");
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      {/* Account Settings */}
      <section className="bg-base-200 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Account Settings</h2>
        
        <div className="space-y-4">
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Connected Wallet</span>
            </label>
            <div className="input-group">
              <Address address={address} />
            </div>
          </div>
          
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Display Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={settings.displayName}
              onChange={(e) => handleChange("displayName", e.target.value)}
            />
            <label className="label">
              <span className="label-text-alt">This is how others will see you in the marketplace</span>
            </label>
          </div>
          
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={settings.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <label className="label">
              <span className="label-text-alt">For notifications and updates (not visible to others)</span>
            </label>
          </div>
          
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Profile Visibility</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={settings.profileVisibility}
              onChange={(e) => handleChange("profileVisibility", e.target.value)}
            >
              <option value="public">Public - Everyone can see my profile</option>
              <option value="limited">Limited - Only show to task creators</option>
              <option value="private">Private - Only show to approved connections</option>
            </select>
          </div>
        </div>
      </section>
      
      {/* Notification Settings */}
      <section className="bg-base-200 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
        
        <div className="space-y-4">
          <div className="form-control">
            <label className="cursor-pointer label justify-start gap-4">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={settings.taskNotifications}
                onChange={(e) => handleChange("taskNotifications", e.target.checked)}
              />
              <span className="label-text">Task notifications</span>
            </label>
            <p className="text-sm opacity-70 ml-12">Get notified about new AI-recommended tasks and task updates</p>
          </div>
          
          <div className="form-control">
            <label className="cursor-pointer label justify-start gap-4">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={settings.marketplaceUpdates}
                onChange={(e) => handleChange("marketplaceUpdates", e.target.checked)}
              />
              <span className="label-text">Marketplace updates</span>
            </label>
            <p className="text-sm opacity-70 ml-12">Get notified about new tasks that match your skills</p>
          </div>
          
          <div className="form-control">
            <label className="cursor-pointer label justify-start gap-4">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={settings.communityNotifications}
                onChange={(e) => handleChange("communityNotifications", e.target.checked)}
              />
              <span className="label-text">Community notifications</span>
            </label>
            <p className="text-sm opacity-70 ml-12">Get notified about activities from creators you subscribe to</p>
          </div>
        </div>
      </section>
      
      {/* Appearance */}
      <section className="bg-base-200 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Appearance</h2>
        
        <div className="space-y-4">
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Theme</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={settings.theme}
              onChange={(e) => handleChange("theme", e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System default</option>
            </select>
          </div>
          
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Language</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={settings.language}
              onChange={(e) => handleChange("language", e.target.value)}
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="chinese">Chinese</option>
              <option value="russian">Russian</option>
            </select>
          </div>
        </div>
      </section>
      
      {/* Subscription & Billing */}
      <section className="bg-base-200 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Subscription & Billing</h2>
        
        <div className="alert shadow-lg mb-4">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
              <h3 className="font-bold">Pro Plan - Yearly</h3>
              <div className="text-xs">Next renewal: Jan 15, 2024</div>
            </div>
          </div>
          <div className="flex-none">
            <button className="btn btn-sm">Manage Subscription</button>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-lg mb-4">
          <div className="card-body">
            <h3 className="card-title">Payment Methods</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="font-mono bg-base-300 p-2 rounded">0x1a2...3b4c</div>
                <span>Primary Wallet</span>
              </div>
              <span className="badge badge-success">Active for billing</span>
            </div>
          </div>
        </div>
        
        <button className="btn btn-error btn-outline">Cancel Subscription</button>
      </section>
      
      {/* Save Button */}
      <div className="flex justify-end">
        <button className="btn btn-primary btn-lg" onClick={handleSave}>
          Save Settings
        </button>
      </div>
    </div>
  );
}; 