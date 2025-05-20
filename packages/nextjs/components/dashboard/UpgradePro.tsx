"use client";

import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";

export const UpgradePro = () => {
  const [selectedPlan, setSelectedPlan] = useState<keyof PlansType>("monthly");
  const [isLoading, setIsLoading] = useState(false);

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

  // 定义计划类型
  type PlanType = {
    price: number;
    priceUSD: number;
    period: string;
    features: string[];
    popular: boolean;
  };

  type PlansType = {
    monthly: PlanType;
    yearly: PlanType;
  };

  // Mock contract write
  const { writeContractAsync } = useScaffoldWriteContract({
    contractName: "YourContract",
  });

  const handleUpgrade = async () => {
    try {
      setIsLoading(true);
      await writeContractAsync({
        functionName: "subscribeToPro",
        args: [selectedPlan === "yearly"],
        value: BigInt(0), // This would be the actual ETH value if needed
      });

      alert("Subscription successful! Welcome to Pro!");
    } catch (error) {
      console.error("Error upgrading to Pro:", error);
      alert("There was an error processing your subscription. Please try again.");
    } finally {
      setIsLoading(false);
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

      <div className="w-full pt-12 pb-16 px-4 sm:px-6 relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-200 font-extrabold">
              Upgrade to IdeaBar Pro
            </span>
          </h1>
          <p className="text-lg text-gray-300">Unlock premium features and boost your earning potential</p>
        </div>

        {/* Plan Selector */}
        <div className="flex justify-center mb-8">
          <div className="relative p-1 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/30 rounded-xl"></div>
            <div className="absolute inset-0 border border-purple-500/20 rounded-xl"></div>

            <div className="relative flex z-10 backdrop-blur-sm">
              <button
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  selectedPlan === "monthly"
                    ? "bg-purple-600/60 text-white"
                    : "bg-transparent text-gray-400 hover:text-gray-200"
                }`}
                onClick={() => setSelectedPlan("monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  selectedPlan === "yearly"
                    ? "bg-purple-600/60 text-white"
                    : "bg-transparent text-gray-400 hover:text-gray-200"
                }`}
                onClick={() => setSelectedPlan("yearly")}
              >
                <span className="flex items-center gap-2">
                  Yearly
                  <span className="badge badge-sm bg-green-600/40 text-green-100 backdrop-blur-sm text-xs py-1 border border-green-500/20">
                    Save 17%
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Selected Plan */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
            <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>

            <div className="relative p-6 z-10 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  Pro {selectedPlan === "monthly" ? "Monthly" : "Annual"} Plan
                  {plans[selectedPlan].popular && (
                    <span className="badge badge-sm bg-purple-600/40 text-purple-100 backdrop-blur-sm text-xs py-1 ml-2 border border-purple-500/20">
                      Most Popular
                    </span>
                  )}
                </h2>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">
                    {plans[selectedPlan].price} <span className="text-purple-300">IDEA</span>
                  </div>
                  <div className="text-sm text-blue-200">
                    ≈ ${plans[selectedPlan].priceUSD} / {plans[selectedPlan].period}
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-purple-500/20 my-4"></div>

              <ul className="space-y-4 mb-6">
                {plans[selectedPlan].features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className="btn relative overflow-hidden group/btn bg-purple-600/60 hover:bg-purple-500/70 border-none rounded-lg text-white gap-2 w-full py-3 transition-all duration-300 backdrop-blur-sm"
                onClick={handleUpgrade}
                disabled={false}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-indigo-600/40 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 via-purple-300/30 to-purple-600/0 opacity-0 group-hover/btn:opacity-100 blur-sm transform translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-all duration-1000"></div>
                <div className="absolute inset-0 border border-purple-400/30 rounded-lg pointer-events-none"></div>

                <span className="text-base font-medium z-10 relative">
                  {isLoading ? "Processing..." : `Upgrade Now for ${plans[selectedPlan].price} IDEA`}
                </span>
              </button>

              <div className="text-center mt-4 text-sm text-gray-400">
                <p>Uses EIP-7702 auto-deduction for seamless subscription renewal</p>
                <p className="mt-1">Cancel anytime from your account settings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Premium Tasks",
              description: "Get exclusive access to high-paying tasks before they reach the public marketplace.",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-purple-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              ),
            },
            {
              title: "AI-Powered Recommendations",
              description: "Our advanced AI will suggest the perfect tasks based on your skills and past performance.",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              ),
            },
            {
              title: "SoulCoin Benefits",
              description: "Zero fees on SoulCoin transactions and priority access to top creators.",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-indigo-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
            },
          ].map((benefit, index) => (
            <div key={index} className="group">
              <div className="relative h-full hover:scale-[1.02] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-2xl"></div>
                <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>

                <div className="relative p-6 z-10 backdrop-blur-sm h-full flex flex-col">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-purple-200">Frequently Asked Questions</h3>

          {[
            {
              question: "What happens when my subscription renews?",
              answer:
                "Your subscription will automatically renew using EIP-7702's auto-deduction feature. This means you won't have to manually approve transactions for each renewal period.",
            },
            {
              question: "Can I upgrade or downgrade my plan?",
              answer:
                "Yes, you can upgrade to annual at any time. If you switch from annual to monthly, the change will take effect at the end of your current billing period.",
            },
            {
              question: "How do I cancel my subscription?",
              answer:
                "You can cancel anytime from your account settings. After cancellation, you'll continue to have access to Pro features until the end of your current billing period.",
            },
          ].map((faq, index) => (
            <div key={index} className="mb-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/10 rounded-xl"></div>
                <div className="absolute inset-0 border border-purple-500/20 rounded-xl"></div>

                <details className="relative z-10 backdrop-blur-sm">
                  <summary className="p-4 cursor-pointer text-lg font-medium text-white flex items-center justify-between">
                    {faq.question}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-purple-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 pt-0 text-gray-300 border-t border-purple-500/20">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
