"use client";

import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";

export const UpgradePro = () => {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  
  // Mock data
  const plans = {
    monthly: {
      price: 50,
      priceUSD: 15,
      period: "Month",
      features: [
        "Access to all premium tasks",
        "Priority support",
        "100 IDEA tokens for task submission fees",
        "SoulCoin transactions with no fees",
        "Advanced AI task recommendations",
      ],
      popular: false,
    },
    yearly: {
      price: 500,
      priceUSD: 150,
      period: "Year",
      features: [
        "All monthly features",
        "2 months free (compared to monthly plan)",
        "1200 IDEA tokens for task submission fees",
        "Custom profile badge",
        "Early access to new features",
      ],
      popular: true,
    },
  };

  // Mock contract write
  const { writeContractAsync, isLoading } = useScaffoldWriteContract({
    contractName: "YourContract",
  });

  const handleUpgrade = async () => {
    try {
      await writeContractAsync({
        functionName: "subscribeToPro",
        args: [selectedPlan === "yearly"],
        value: 0, // This would be the actual ETH value if needed
      });
      
      alert("Subscription successful! Welcome to Pro!");
    } catch (error) {
      console.error("Error upgrading to Pro:", error);
      alert("There was an error processing your subscription. Please try again.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Upgrade to IdeaBar Pro</h1>
        <p className="text-lg opacity-70">
          Unlock premium features and boost your earning potential
        </p>
      </div>
      
      {/* Plan Selector */}
      <div className="flex justify-center mb-8">
        <div className="btn-group">
          <button
            className={`btn ${selectedPlan === "monthly" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setSelectedPlan("monthly")}
          >
            Monthly
          </button>
          <button
            className={`btn ${selectedPlan === "yearly" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setSelectedPlan("yearly")}
          >
            Yearly (Save 17%)
          </button>
        </div>
      </div>
      
      {/* Selected Plan */}
      <div className="card bg-base-200 shadow-xl max-w-2xl mx-auto">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h2 className="card-title text-2xl">
              Pro {selectedPlan === "monthly" ? "Monthly" : "Annual"} Plan
              {plans[selectedPlan].popular && (
                <div className="badge badge-primary ml-2">Most Popular</div>
              )}
            </h2>
            <div className="text-right">
              <div className="text-3xl font-bold">{plans[selectedPlan].price} IDEA</div>
              <div className="text-sm opacity-70">≈ ${plans[selectedPlan].priceUSD} / {plans[selectedPlan].period}</div>
            </div>
          </div>
          
          <div className="divider"></div>
          
          <ul className="space-y-4">
            {plans[selectedPlan].features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="card-actions justify-center mt-6">
            <button 
              className="btn btn-primary btn-lg w-full"
              onClick={handleUpgrade}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : `Upgrade Now for ${plans[selectedPlan].price} IDEA`}
            </button>
          </div>
          
          <div className="text-center mt-4 text-sm opacity-70">
            <p>Uses EIP-7702 auto-deduction for seamless subscription renewal</p>
            <p className="mt-1">Cancel anytime from your account settings</p>
          </div>
        </div>
      </div>
      
      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Premium Tasks</h3>
            <p>Get exclusive access to high-paying tasks before they reach the public marketplace.</p>
          </div>
        </div>
        
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">AI-Powered Recommendations</h3>
            <p>Our advanced AI will suggest the perfect tasks based on your skills and past performance.</p>
          </div>
        </div>
        
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">SoulCoin Benefits</h3>
            <p>Zero fees on SoulCoin transactions and priority access to top creators.</p>
          </div>
        </div>
      </div>
      
      {/* FAQ */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
        
        <div className="collapse collapse-plus bg-base-200 mb-2">
          <input type="radio" name="faq-accordion" checked /> 
          <div className="collapse-title text-lg font-medium">
            What happens when my subscription renews?
          </div>
          <div className="collapse-content"> 
            <p>Your subscription will automatically renew using EIP-7702's auto-deduction feature. This means you won't have to manually approve transactions for each renewal period.</p>
          </div>
        </div>
        
        <div className="collapse collapse-plus bg-base-200 mb-2">
          <input type="radio" name="faq-accordion" /> 
          <div className="collapse-title text-lg font-medium">
            Can I upgrade or downgrade my plan?
          </div>
          <div className="collapse-content"> 
            <p>Yes, you can upgrade to annual at any time. If you switch from annual to monthly, the change will take effect at the end of your current billing period.</p>
          </div>
        </div>
        
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="faq-accordion" /> 
          <div className="collapse-title text-lg font-medium">
            How do I cancel my subscription?
          </div>
          <div className="collapse-content"> 
            <p>You can cancel anytime from your account settings. After cancellation, you'll continue to have access to Pro features until the end of your current billing period.</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 