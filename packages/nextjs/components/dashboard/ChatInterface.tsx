"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Address } from "~~/components/scaffold-eth";

// 工具调用类型定义
type ToolType =
  | "market_analysis"
  | "task_creation"
  | "contract_interaction"
  | "research"
  | "data_visualization"
  | "task_publishing";

interface Tool {
  id: string;
  name: string;
  description: string;
  type: ToolType;
  icon: string;
}

interface ToolCall {
  id: string;
  tool: Tool;
  input: string;
  output?: string;
  status: "running" | "completed" | "error";
  startTime: string;
  endTime?: string;
}

interface BotMessage {
  sender: string;
  text: string;
  timestamp: string;
  toolCalls?: ToolCall[];
  isToolCallDescription?: boolean;
}

export const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedContact, setSelectedContact] = useState("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
  const [activeTab, setActiveTab] = useState("human");
  const [showToolCallDetails, setShowToolCallDetails] = useState<{ [key: string]: boolean }>({});
  const [showPublishedTask, setShowPublishedTask] = useState(false);
  const [publishedTaskData, setPublishedTaskData] = useState<{
    id: string;
    title: string;
    description: string;
    reward: number;
    deadline: string;
    skills: string[];
    creator: string;
  } | null>(null);
  const [conversations, setConversations] = useState<Record<string, BotMessage[]>>({});

  // 工具定义
  const tools: Tool[] = [
    {
      id: "market-analysis",
      name: "Market Analysis Tool",
      description: "Analyzes current market trends in Web3 and identifies high-demand skills and opportunities",
      type: "market_analysis",
      icon: "📊",
    },
    {
      id: "task-creator",
      name: "Task Creator",
      description: "Creates optimized task listings based on market demand and user skills",
      type: "task_creation",
      icon: "✏️",
    },
    {
      id: "contract-reader",
      name: "Contract Reader",
      description: "Reads data from on-chain smart contracts to provide real-time information",
      type: "contract_interaction",
      icon: "📝",
    },
    {
      id: "blockchain-researcher",
      name: "Blockchain Researcher",
      description: "Gathers and analyzes information about recent blockchain developments",
      type: "research",
      icon: "🔍",
    },
    {
      id: "data-visualizer",
      name: "Data Visualizer",
      description: "Creates visual representations of complex blockchain data",
      type: "data_visualization",
      icon: "📈",
    },
    {
      id: "task-publisher",
      name: "Task Publisher",
      description: "Publishes tasks to the blockchain and makes them available in the marketplace",
      type: "task_publishing",
      icon: "🚀",
    },
  ];

  // Mock data - in real app would come from contract
  const contacts = [
    {
      address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      name: "Alex Thompson",
      lastMessage: "Thanks for completing the task!",
      unread: 2,
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Alex",
      status: "online",
    },
    {
      address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      name: "Maria Chen",
      lastMessage: "Can you provide more details?",
      unread: 0,
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Maria",
      status: "offline",
    },
    {
      address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
      name: "Sam Wilson",
      lastMessage: "I&apos;ll review your proposal",
      unread: 0,
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Sam",
      status: "away",
    },
    {
      address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
      name: "Elena Kowalski",
      lastMessage: "The deadline has been extended",
      unread: 1,
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Elena",
      status: "online",
    },
  ];

  // IdeaBot数据
  const ideaBot = {
    address: "0xIdeaBot",
    name: "IdeaBot AI",
    lastMessage: "I can find or create tasks matching your skills",
    unread: 0,
    avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=IdeaBot",
    status: "online",
  };

  // Mock conversation data - modify to use BotMessage type
  const conversationsData = useMemo<Record<string, BotMessage[]>>(() => {
    // IdeaBot初始对话数据
    const initialIdeaBotConversation: BotMessage[] = [
      {
        sender: "0xIdeaBot",
        text: "Hello! I'm IdeaBot. I can help you find suitable tasks based on your skills and market trends, or help you create new tasks.",
        timestamp: "Just now",
      },
    ];
    
    return {
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266": [
      {
        sender: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        text: "Hi, I saw your AI task solution. Can you provide some details on how you implemented it?",
        timestamp: "10:32 AM",
      },
        {
          sender: "me",
          text: "Hey Alex! Sure, I used a transformer-based approach with a custom training dataset.",
          timestamp: "10:35 AM",
        },
        {
          sender: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          text: "That&apos;s interesting. How did you handle the data preprocessing?",
          timestamp: "10:38 AM",
        },
        {
          sender: "me",
          text: "I created a pipeline that first cleans the input, removes bias, and then tokenizes everything with BytePair encoding.",
          timestamp: "10:40 AM",
        },
        {
          sender: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          text: "Great job! I&apos;d like to discuss potential collaboration on a similar project.",
          timestamp: "10:42 AM",
        },
        {
          sender: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          text: "Thanks for completing the task!",
          timestamp: "10:45 AM",
        },
      ],
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8": [
        {
          sender: "me",
          text: "Hi Maria, I&apos;ve completed the initial research for the DeFi project.",
          timestamp: "Yesterday",
        },
        {
          sender: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
          text: "Thanks for the update. Can you provide more details?",
          timestamp: "Yesterday",
        },
      ],
      "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC": [
        { sender: "me", text: "Hello Sam, here's my proposal for the smart contract audit.", timestamp: "Monday" },
        {
          sender: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
          text: "I'll review your proposal",
          timestamp: "Monday",
        },
      ],
      "0x90F79bf6EB2c4f870365E785982E1f101E93b906": [
        {
          sender: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
          text: "Just wanted to let you know that the ZK-proof task deadline has been extended by a week.",
          timestamp: "2 days ago",
        },
        { sender: "me", text: "That&apos;s great news, thanks for letting me know!", timestamp: "2 days ago" },
        {
          sender: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
          text: "The deadline has been extended",
          timestamp: "Yesterday",
        },
      ],
            "0xIdeaBot": initialIdeaBotConversation,
    };
  }, []); // 不需要依赖，因为 initialIdeaBotConversation 现在在回调内部定义

  // Mock contract write
  // const { writeContractAsync } = useScaffoldWriteContract({
  //   contractName: "ChatContract",
  // });

  const handleSendMessage = async () => {
    if (!message.trim()) {
      console.log("空消息，无法发送");
      return;
    }
    console.log("正在发送消息:", message);

    try {
      // For our mock, we'll just update the UI
      const newMessage = {
        sender: "me",
        text: message,
        timestamp: "Just now",
      };

      // 创建新的数组而不是直接修改原数组
      const updatedConversation = [...conversations[selectedContact], newMessage];
      setConversations({
        ...conversations,
        [selectedContact]: updatedConversation,
      });

      // 如果是发给IdeaBot的消息，模拟AI回复
      if (selectedContact === "0xIdeaBot") {
        // 检测特定关键字触发不同工具调用
        const lowerMsg = message.toLowerCase();

        // 初始思考回复
        setTimeout(() => {
          const botResponse: BotMessage = {
            sender: "0xIdeaBot",
            text: "Analyzing your request, please wait...",
            timestamp: "Just now",
          };

          const withBotResponse = [...updatedConversation, botResponse];
          setConversations({
            ...conversations,
            [selectedContact]: withBotResponse,
          });

          scrollToBottom();

          // 处理任务推荐请求
          if (
            lowerMsg.includes("recommend") ||
            lowerMsg.includes("suggest") ||
            lowerMsg.includes("find tasks") ||
            lowerMsg.includes("show me tasks") ||
            lowerMsg.includes("what tasks")
          ) {
            // 使用研究工具分析市场需求
            setTimeout(() => {
              const researchCall: BotMessage = {
                sender: "0xIdeaBot",
                text: "I'll research available tasks matching your skills...",
                timestamp: "Just now",
                isToolCallDescription: true,
                toolCalls: [
                  {
                    id: "tool-call-research-1",
                    tool: tools.find(t => t.id === "blockchain-researcher")!,
                    input: "Find tasks matching: frontend development, UI design, data visualization",
                    status: "running",
                    startTime: "Just now",
                  },
                ],
              };

              const withResearchCall = [...withBotResponse, researchCall];
              setConversations({
                ...conversations,
                [selectedContact]: withResearchCall,
              });

              scrollToBottom();

              // 研究结果
              setTimeout(() => {
                const researchResult: BotMessage = {
                  sender: "0xIdeaBot",
                  text: "Research complete! I found several tasks that match your skills.",
                  timestamp: "Just now",
                  toolCalls: [
                    {
                      id: "tool-call-research-1",
                      tool: tools.find(t => t.id === "blockchain-researcher")!,
                      input: "Find tasks matching: frontend development, UI design, data visualization",
                      output:
                        "Found 12 available tasks:\n1. DeFi Yield Farming Dashboard - 350 IDEA\n2. NFT Marketplace UI Redesign - 280 IDEA\n3. On-chain Data Analytics Platform - 420 IDEA\n4. Wallet Portfolio Tracker - 300 IDEA\n5. DEX Trading Interface - 380 IDEA\n...",
                      status: "completed",
                      startTime: "Just now",
                      endTime: "Just now",
                    },
                  ],
                };

                const withResearchResult = [...withResearchCall, researchResult];
                setConversations({
                  ...conversations,
                  [selectedContact]: withResearchResult,
                });

                scrollToBottom();

                // 分析任务适合度
                setTimeout(() => {
                  const analysisCall: BotMessage = {
                    sender: "0xIdeaBot",
                    text: "Now I'll analyze which tasks best match your specific skills and experience...",
                    timestamp: "Just now",
                    isToolCallDescription: true,
                    toolCalls: [
                      {
                        id: "tool-call-analysis-1",
                        tool: tools.find(t => t.id === "market-analysis")!,
                        input:
                          "Analyze skill match for user with frontend development, UI design, data visualization skills",
                        status: "running",
                        startTime: "Just now",
                      },
                    ],
                  };

                  const withAnalysisCall = [...withResearchResult, analysisCall];
                  setConversations({
                    ...conversations,
                    [selectedContact]: withAnalysisCall,
                  });

                  scrollToBottom();

                  // 分析结果
                  setTimeout(() => {
                    const analysisResult: BotMessage = {
                      sender: "0xIdeaBot",
                      text: "Analysis complete!",
                      timestamp: "Just now",
                      toolCalls: [
                        {
                          id: "tool-call-analysis-1",
                          tool: tools.find(t => t.id === "market-analysis")!,
                          input: "Analyze skill match for user profile",
                          output:
                            "Skill match analysis:\n1. DeFi Yield Farming Dashboard - 93% match\n2. Wallet Portfolio Tracker - 87% match\n3. NFT Marketplace UI Redesign - 85% match\n4. On-chain Data Analytics Platform - 82% match\n5. DEX Trading Interface - 79% match",
                          status: "completed",
                          startTime: "Just now",
                          endTime: "Just now",
                        },
                      ],
                    };

                    const withAnalysisResult = [...withAnalysisCall, analysisResult];
                    setConversations({
                      ...conversations,
                      [selectedContact]: withAnalysisResult,
                    });

                    scrollToBottom();

                    // 任务推荐
                    setTimeout(() => {
                      const taskRecommendation: BotMessage = {
                        sender: "0xIdeaBot",
                        text:
                          "Based on my analysis, here are the top 3 tasks that best match your skills:\n\n" +
                          "1. **DeFi Yield Farming Dashboard** (350 IDEA, 10 days)\n" +
                          "Design and develop an interactive dashboard for monitoring and analyzing yield farming opportunities across multiple DeFi protocols.\n\n" +
                          "2. **Wallet Portfolio Tracker** (300 IDEA, 7 days)\n" +
                          "Create a responsive interface to track crypto portfolio performance with historical data visualization.\n\n" +
                          "3. **NFT Marketplace UI Redesign** (280 IDEA, 5 days)\n" +
                          "Redesign an existing NFT marketplace interface with improved user experience and visual appeal.\n\n" +
                          "Would you like to accept any of these tasks or see more options?",
                        timestamp: "Just now",
                      };

                      const withRecommendation = [...withAnalysisResult, taskRecommendation];
                      setConversations({
                        ...conversations,
                        [selectedContact]: withRecommendation,
                      });

                      scrollToBottom();
                    }, 800);
                  }, 1200);
                }, 1000);
              }, 1500);
            }, 800);
          }
          // 处理任务接受请求
          else if (lowerMsg.includes("accept recommended task") || lowerMsg.includes("accept this recommended task")) {
            // 使用合约交互工具接受任务
            setTimeout(() => {
              const acceptCall: BotMessage = {
                sender: "0xIdeaBot",
                text: "I'll process your task acceptance...",
                timestamp: "Just now",
                isToolCallDescription: true,
                toolCalls: [
                  {
                    id: "tool-call-accept-1",
                    tool: tools.find(t => t.id === "contract-reader")!,
                    input: JSON.stringify(
                      {
                        action: "acceptTask",
                        taskId: "task-defi-yield",
                      },
                      null,
                      2,
                    ),
                    status: "running",
                    startTime: "Just now",
                  },
                ],
              };

              const withAcceptCall = [...withBotResponse, acceptCall];
              setConversations({
                ...conversations,
                [selectedContact]: withAcceptCall,
              });

              scrollToBottom();

              // 接受完成
              setTimeout(() => {
                const acceptResult: BotMessage = {
                  sender: "0xIdeaBot",
                  text: "Task has been accepted successfully!",
                  timestamp: "Just now",
                  toolCalls: [
                    {
                      id: "tool-call-accept-1",
                      tool: tools.find(t => t.id === "contract-reader")!,
                      input: JSON.stringify(
                        {
                          action: "acceptTask",
                          taskId: "task-defi-yield",
                        },
                        null,
                        2,
                      ),
                      output: JSON.stringify(
                        {
                          success: true,
                          taskId: "task-defi-yield",
                          transactionHash:
                            "0x" + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join(""),
                          blockNumber: 12345679,
                          timestamp: new Date().toISOString(),
                        },
                        null,
                        2,
                      ),
                      status: "completed",
                      startTime: "Just now",
                      endTime: "Just now",
                    },
                  ],
                };

                const withAcceptResult = [...withAcceptCall, acceptResult];
                setConversations({
                  ...conversations,
                  [selectedContact]: withAcceptResult,
                });

                scrollToBottom();

                // 显示任务卡片
                setPublishedTaskData({
                  id: "task-defi-yield",
                  title: "DeFi Yield Farming Dashboard",
                  description:
                    "Design and develop an interactive dashboard for monitoring and analyzing yield farming opportunities across multiple DeFi protocols.",
                  reward: 350,
                  deadline: "10 days",
                  skills: ["React", "D3.js", "Solidity", "Web3.js"],
                  creator: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
                });
                setShowPublishedTask(true);

                // 最终确认
                setTimeout(() => {
                  const finalResponse: BotMessage = {
                    sender: "0xIdeaBot",
                    text:
                      'You have successfully accepted the task "DeFi Yield Farming Dashboard"!\n\n' +
                      "Reward upon completion: 350 IDEA\n" +
                      "Deadline: 10 days\n\n" +
                      "Good luck with your work! You can submit your completed task through the task details page or by messaging me once you're done.\n\n" +
                      "The task details are now displayed at the top of this chat for your reference.",
                    timestamp: "Just now",
                  };

                  const withFinalResponse = [...withAcceptResult, finalResponse];
                  setConversations({
                    ...conversations,
                    [selectedContact]: withFinalResponse,
                  });

                  scrollToBottom();
                }, 1000);
              }, 1200);
            }, 800);
          }
          // 处理"发布任务"请求
          else if (lowerMsg.includes("publish this task") || lowerMsg.includes("publish task")) {
            setTimeout(() => {
              const publishCall: BotMessage = {
                sender: "0xIdeaBot",
                text: "I'll publish this task to the marketplace...",
                timestamp: "Just now",
                isToolCallDescription: true,
                toolCalls: [
                  {
                    id: "tool-call-publish-1",
                    tool: tools.find(t => t.id === "task-publisher")!,
                    input: JSON.stringify(
                      {
                        title: "Interactive DeFi Data Visualization Dashboard",
                        description:
                          "Create an interactive dashboard to visualize DeFi liquidity pools, trading volumes, and yield farming data with real-time updates.",
                        reward: 280,
                        deadline: "7 days",
                        skills: ["D3.js", "React", "Web3"],
                      },
                      null,
                      2,
                    ),
                    status: "running",
                    startTime: "Just now",
                  },
                ],
              };

              const withPublishCall = [...withBotResponse, publishCall];
              setConversations({
                ...conversations,
                [selectedContact]: withPublishCall,
              });

              scrollToBottom();

              // 发布完成
              setTimeout(() => {
                const publishResult: BotMessage = {
                  sender: "0xIdeaBot",
                  text: "Task has been published successfully!",
                  timestamp: "Just now",
                  toolCalls: [
                    {
                      id: "tool-call-publish-1",
                      tool: tools.find(t => t.id === "task-publisher")!,
                      input: JSON.stringify(
                        {
                          title: "Interactive DeFi Data Visualization Dashboard",
                          description: "Create an interactive dashboard...",
                          reward: 280,
                        },
                        null,
                        2,
                      ),
                      output: JSON.stringify(
                        {
                          success: true,
                          taskId: "task-" + Math.floor(Math.random() * 1000000),
                          transactionHash:
                            "0x" + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join(""),
                          blockNumber: 12345678,
                          timestamp: new Date().toISOString(),
                        },
                        null,
                        2,
                      ),
                      status: "completed",
                      startTime: "Just now",
                      endTime: "Just now",
                    },
                  ],
                };

                const withPublishResult = [...withPublishCall, publishResult];
                setConversations({
                  ...conversations,
                  [selectedContact]: withPublishResult,
                });

                scrollToBottom();

                // 最终确认
                setTimeout(() => {
                  const finalResponse: BotMessage = {
                    sender: "0xIdeaBot",
                    text:
                      'Your task "Interactive DeFi Data Visualization Dashboard" has been successfully published to the marketplace!\n\n' +
                      "Reward: 280 IDEA\n" +
                      "Deadline: 7 days\n" +
                      "Required skills: D3.js, React, Web3\n\n" +
                      "The task is now visible to all users on the marketplace. You'll be notified when someone applies for or completes your task.",
                    timestamp: "Just now",
                  };

                  const withFinalResponse = [...withPublishResult, finalResponse];
                  setConversations({
                    ...conversations,
                    [selectedContact]: withFinalResponse,
                  });

                  scrollToBottom();
                }, 1000);
              }, 1500);
            }, 1000);
          }
          // 处理"接受任务"请求
          else if (lowerMsg.includes("accept this task") || lowerMsg.includes("accept task")) {
            setTimeout(() => {
              const acceptCall: BotMessage = {
                sender: "0xIdeaBot",
                text: "I'll process your task acceptance...",
                timestamp: "Just now",
                isToolCallDescription: true,
                toolCalls: [
                  {
                    id: "tool-call-accept-1",
                    tool: tools.find(t => t.id === "contract-reader")!,
                    input: JSON.stringify(
                      {
                        action: "acceptTask",
                        taskId: publishedTaskData?.id || "unknown-task",
                      },
                      null,
                      2,
                    ),
                    status: "running",
                    startTime: "Just now",
                  },
                ],
              };

              const withAcceptCall = [...withBotResponse, acceptCall];
              setConversations({
                ...conversations,
                [selectedContact]: withAcceptCall,
              });

              scrollToBottom();

              // 接受完成
              setTimeout(() => {
                const acceptResult: BotMessage = {
                  sender: "0xIdeaBot",
                  text: "Task has been accepted successfully!",
                  timestamp: "Just now",
                  toolCalls: [
                    {
                      id: "tool-call-accept-1",
                      tool: tools.find(t => t.id === "contract-reader")!,
                      input: JSON.stringify(
                        {
                          action: "acceptTask",
                          taskId: publishedTaskData?.id || "unknown-task",
                        },
                        null,
                        2,
                      ),
                      output: JSON.stringify(
                        {
                          success: true,
                          taskId: publishedTaskData?.id || "unknown-task",
                          transactionHash:
                            "0x" + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join(""),
                          blockNumber: 12345679,
                          timestamp: new Date().toISOString(),
                        },
                        null,
                        2,
                      ),
                      status: "completed",
                      startTime: "Just now",
                      endTime: "Just now",
                    },
                  ],
                };

                const withAcceptResult = [...withAcceptCall, acceptResult];
                setConversations({
                  ...conversations,
                  [selectedContact]: withAcceptResult,
                });

                scrollToBottom();

                // 最终确认
                setTimeout(() => {
                  const finalResponse: BotMessage = {
                    sender: "0xIdeaBot",
                    text:
                      'You have successfully accepted the task "' +
                      (publishedTaskData?.title || "Interactive DeFi Data Visualization Dashboard") +
                      '"!\n\n' +
                      "Reward upon completion: " +
                      (publishedTaskData?.reward || 280) +
                      " IDEA\n" +
                      "Deadline: " +
                      (publishedTaskData?.deadline || "7 days") +
                      "\n\n" +
                      "Good luck with your work! You can submit your completed task through the task details page or by messaging me once you're done.",
                    timestamp: "Just now",
                  };

                  const withFinalResponse = [...withAcceptResult, finalResponse];
                  setConversations({
                    ...conversations,
                    [selectedContact]: withFinalResponse,
                  });

                  scrollToBottom();
                }, 1000);
              }, 1500);
            }, 1000);
          }
          // 根据消息内容确定使用哪些工具
          else if (
            lowerMsg.includes("create task") ||
            lowerMsg.includes("generate task") ||
            lowerMsg.includes("new task") ||
            lowerMsg.includes("data visualization") ||
            lowerMsg.includes("defi")
          ) {
            // 1. 首先使用市场分析工具
            setTimeout(() => {
              const marketAnalysisCall: BotMessage = {
                sender: "0xIdeaBot",
                text: "I'll analyze market trends for this type of task...",
                timestamp: "Just now",
                isToolCallDescription: true,
                toolCalls: [
                  {
                    id: "tool-call-market-1",
                    tool: tools.find(t => t.id === "market-analysis")!,
                    input: message,
                    status: "running",
                    startTime: "Just now",
                  },
                ],
              };

              const withMarketAnalysisCall = [...withBotResponse, marketAnalysisCall];
              setConversations({
                ...conversations,
                [selectedContact]: withMarketAnalysisCall,
              });

              scrollToBottom();

              // 2. 市场分析完成后的结果
              setTimeout(() => {
                const marketResult: BotMessage = {
                  sender: "0xIdeaBot",
                  text: "Market analysis complete. Here are the current trends:",
                  timestamp: "Just now",
                  toolCalls: [
                    {
                      id: "tool-call-market-1",
                      tool: tools.find(t => t.id === "market-analysis")!,
                      input: message,
                      output:
                        "DeFi data visualization market analysis:\n- Current demand: Very High (89/100)\n- Avg compensation: 250-350 IDEA\n- Required skills: D3.js, React, Web3 integration\n- Competition level: Medium",
                      status: "completed",
                      startTime: "Just now",
                      endTime: "Just now",
                    },
                  ],
                };

                const withMarketResult = [...withMarketAnalysisCall, marketResult];
                setConversations({
                  ...conversations,
                  [selectedContact]: withMarketResult,
                });

                scrollToBottom();

                // 3. 使用任务创建工具
                setTimeout(() => {
                  const taskCreationCall: BotMessage = {
                    sender: "0xIdeaBot",
                    text: "Now I'll generate an optimized task based on this analysis...",
                    timestamp: "Just now",
                    isToolCallDescription: true,
                    toolCalls: [
                      {
                        id: "tool-call-task-1",
                        tool: tools.find(t => t.id === "task-creator")!,
                        input: "Create DeFi data visualization task with market analysis results",
                        status: "running",
                        startTime: "Just now",
                      },
                    ],
                  };

                  const withTaskCreationCall = [...withMarketResult, taskCreationCall];
                  setConversations({
                    ...conversations,
                    [selectedContact]: withTaskCreationCall,
                  });

                  scrollToBottom();

                  // 4. 任务创建完成
                  setTimeout(() => {
                    const taskResult: BotMessage = {
                      sender: "0xIdeaBot",
                      text: "Task creation complete!",
                      timestamp: "Just now",
                      toolCalls: [
                        {
                          id: "tool-call-task-1",
                          tool: tools.find(t => t.id === "task-creator")!,
                          input: "Create DeFi data visualization task with market analysis results",
                          output:
                            'Task draft created:\nTitle: "Interactive DeFi Data Visualization Dashboard"\nDescription: "Create an interactive dashboard to visualize DeFi liquidity pools, trading volumes, and yield farming data with real-time updates."\nRequired skills: D3.js, React, Web3 integration\nEstimated compensation: 280 IDEA\nDifficulty: Intermediate\nEstimated completion time: 5-7 days',
                          status: "completed",
                          startTime: "Just now",
                          endTime: "Just now",
                        },
                      ],
                    };

                    const withTaskResult = [...withTaskCreationCall, taskResult];
                    setConversations({
                      ...conversations,
                      [selectedContact]: withTaskResult,
                    });

                    scrollToBottom();

                    // 5. 最终任务提议
                    setTimeout(() => {
                      const finalResponse: BotMessage = {
                        sender: "0xIdeaBot",
                        text: 'Based on my analysis, I\'ve created the following task:\n\n"Interactive DeFi Data Visualization Dashboard"\n\nThis task requires creating an interactive dashboard to visualize DeFi liquidity pools, trading volumes, and yield farming data with real-time updates. Required skills include D3.js, React, and Web3 integration.\n\nEstimated compensation: 280 IDEA\nDifficulty: Intermediate\nEstimated completion time: 5-7 days\n\nWould you like to publish this task?',
                        timestamp: "Just now",
                      };

                      const withFinalResponse = [...withTaskResult, finalResponse];
                      setConversations({
                        ...conversations,
                        [selectedContact]: withFinalResponse,
                      });

                      scrollToBottom();
                    }, 1000);
                  }, 1500);
                }, 1000);
              }, 1500);
            }, 1000);
          }
          // 上链交互流程
          else if (
            lowerMsg.includes("transaction") ||
            lowerMsg.includes("contract") ||
            lowerMsg.includes("blockchain")
          ) {
            setTimeout(() => {
              const contractCall: BotMessage = {
                sender: "0xIdeaBot",
                text: "I'll check the current contract state for you...",
                timestamp: "Just now",
                isToolCallDescription: true,
                toolCalls: [
                  {
                    id: "tool-call-contract-1",
                    tool: tools.find(t => t.id === "contract-reader")!,
                    input: "Read TaskRegistry contract state",
                    status: "running",
                    startTime: "Just now",
                  },
                ],
              };

              const withContractCall = [...withBotResponse, contractCall];
              setConversations({
                ...conversations,
                [selectedContact]: withContractCall,
              });

              scrollToBottom();

              setTimeout(() => {
                const contractResult: BotMessage = {
                  sender: "0xIdeaBot",
                  text: "Contract data retrieved!",
                  timestamp: "Just now",
                  toolCalls: [
                    {
                      id: "tool-call-contract-1",
                      tool: tools.find(t => t.id === "contract-reader")!,
                      input: "Read TaskRegistry contract state",
                      output:
                        "TaskRegistry contract state:\n- Total tasks: 128\n- Open tasks: 43\n- Your created tasks: 7\n- Your completed tasks: 12\n- Available IDEA balance: 840.5 IDEA\n- Transaction history: Last 5 transactions...",
                      status: "completed",
                      startTime: "Just now",
                      endTime: "Just now",
                    },
                  ],
                };

                const withContractResult = [...withContractCall, contractResult];
                setConversations({
                  ...conversations,
                  [selectedContact]: withContractResult,
                });

                scrollToBottom();

                setTimeout(() => {
                  const visualizeCall: BotMessage = {
                    sender: "0xIdeaBot",
                    text: "Let me visualize this data for better understanding...",
                    timestamp: "Just now",
                    isToolCallDescription: true,
                    toolCalls: [
                      {
                        id: "tool-call-viz-1",
                        tool: tools.find(t => t.id === "data-visualizer")!,
                        input: "Visualize TaskRegistry contract metrics",
                        status: "running",
                        startTime: "Just now",
                      },
                    ],
                  };

                  const withVisualizeCall = [...withContractResult, visualizeCall];
                  setConversations({
                    ...conversations,
                    [selectedContact]: withVisualizeCall,
                  });

                  scrollToBottom();

                  setTimeout(() => {
                    const vizResult: BotMessage = {
                      sender: "0xIdeaBot",
                      text: "Data visualization complete!",
                      timestamp: "Just now",
                      toolCalls: [
                        {
                          id: "tool-call-viz-1",
                          tool: tools.find(t => t.id === "data-visualizer")!,
                          input: "Visualize TaskRegistry contract metrics",
                          output: "[visualization data: task completion trends, earnings over time]",
                          status: "completed",
                          startTime: "Just now",
                          endTime: "Just now",
                        },
                      ],
                    };

                    const withVizResult = [...withVisualizeCall, vizResult];
                    setConversations({
                      ...conversations,
                      [selectedContact]: withVizResult,
                    });

                    scrollToBottom();

                    setTimeout(() => {
                      const finalResponse: BotMessage = {
                        sender: "0xIdeaBot",
                        text: "Based on the blockchain data, here's a summary of your activity:\n\n- You've created 7 tasks and completed 12 tasks\n- Your available balance is 840.5 IDEA\n- Task completion rate in the marketplace is currently 67%\n- Most popular task categories currently: Smart Contract Development, Frontend Design, and Data Analysis\n\nWould you like to see your detailed transaction history or explore open tasks in a specific category?",
                        timestamp: "Just now",
                      };

                      const withFinalResponse = [...withVizResult, finalResponse];
                      setConversations({
                        ...conversations,
                        [selectedContact]: withFinalResponse,
                      });

                      scrollToBottom();
                    }, 1000);
                  }, 1500);
                }, 1000);
              }, 1500);
            }, 1000);
          }
          // 研究和分析流程
          else if (
            lowerMsg.includes("research") ||
            lowerMsg.includes("analyze") ||
            lowerMsg.includes("trends") ||
            lowerMsg.includes("study") ||
            lowerMsg.includes("information")
          ) {
            setTimeout(() => {
              const researchCall: BotMessage = {
                sender: "0xIdeaBot",
                text: "I'm conducting on-chain research based on your query...",
                timestamp: "Just now",
                isToolCallDescription: true,
                toolCalls: [
                  {
                    id: "tool-call-research-1",
                    tool: tools.find(t => t.id === "blockchain-researcher")!,
                    input: message,
                    status: "running",
                    startTime: "Just now",
                  },
                ],
              };

              const withResearchCall = [...withBotResponse, researchCall];
              setConversations({
                ...conversations,
                [selectedContact]: withResearchCall,
              });

              scrollToBottom();

              setTimeout(() => {
                const researchResult: BotMessage = {
                  sender: "0xIdeaBot",
                  text: "Research complete! Here's what I found:",
                  timestamp: "Just now",
                  toolCalls: [
                    {
                      id: "tool-call-research-1",
                      tool: tools.find(t => t.id === "blockchain-researcher")!,
                      input: message,
                      output:
                        "Research findings:\n- Latest protocol developments in Layer 2 scaling solutions\n- New DeFi primitive trends: Real-World Assets (RWA) tokenization\n- Recent security incidents and mitigation strategies\n- Developer activity metrics across major protocols\n- Market sentiment analysis for Q2 2025",
                      status: "completed",
                      startTime: "Just now",
                      endTime: "Just now",
                    },
                  ],
                };

                const withResearchResult = [...withResearchCall, researchResult];
                setConversations({
                  ...conversations,
                  [selectedContact]: withResearchResult,
                });

                scrollToBottom();

                setTimeout(() => {
                  const finalResponse: BotMessage = {
                    sender: "0xIdeaBot",
                    text: "Based on my research, here are the key trends for 2025:\n\n1. **Layer 2 Evolution**: Zero-knowledge proofs are becoming the dominant L2 technology, with increased focus on interoperability between L2 networks.\n\n2. **Real-World Assets**: Traditional finance assets being tokenized and integrated into DeFi protocols, creating new yield opportunities.\n\n3. **Developer Activity**: Most active development is happening in modular blockchain ecosystems and cross-chain infrastructure.\n\n4. **Security Focus**: After several major exploits, there's increased demand for security auditors and formal verification specialists.\n\nWould you like me to recommend specific tasks based on these trends?",
                    timestamp: "Just now",
                  };

                  const withFinalResponse = [...withResearchResult, finalResponse];
                  setConversations({
                    ...conversations,
                    [selectedContact]: withFinalResponse,
                  });

                  scrollToBottom();
                }, 2000);
              }, 2000);
            }, 1000);
          }
          // 默认响应
          else {
            setTimeout(() => {
              const taskSuggestion: BotMessage = {
                sender: "0xIdeaBot",
                text: "I can help with several actions:\n\n1. Create tasks based on your skills and market demand\n2. Research blockchain trends and opportunities\n3. Analyze smart contract data\n4. Visualize on-chain metrics\n\nWhat would you like me to help with today?",
                timestamp: "Just now",
              };

              const withTaskSuggestion = [...withBotResponse, taskSuggestion];
              setConversations({
                ...conversations,
                [selectedContact]: withTaskSuggestion,
              });

              scrollToBottom();
            }, 1500);
          }
        }, 800);
      }

      setMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 处理工具调用按钮点击
  const handleToolButtonClick = (action: string) => {
    let responseText = "";

    switch (action) {
      case "publish-task":
        responseText = "I'd like to publish this task";
        // 显示任务卡片和发布流程
        setPublishedTaskData({
          id: "task-" + Math.floor(Math.random() * 1000000),
          title: "Interactive DeFi Data Visualization Dashboard",
          description:
            "Create an interactive dashboard to visualize DeFi liquidity pools, trading volumes, and yield farming data with real-time updates.",
          reward: 280,
          deadline: "7 days",
          skills: ["D3.js", "React", "Web3"],
          creator: "0xYourAddress", // 实际应用中应该是用户的地址
        });
        setShowPublishedTask(true);

        // 直接设置消息并调用发送函数
        setMessage(responseText);
        setTimeout(() => {
          handleSendMessage();
        }, 100);
        return; // 提前返回，不再设置消息
      case "recommend-tasks":
        responseText = "Please recommend some tasks for me";
        // 直接设置消息并调用发送函数
        setMessage(responseText);
        setTimeout(() => {
          handleSendMessage();
        }, 300);
        return;
      case "accept-task-recommendation":
        responseText = "I'd like to accept this recommended task";
        // 显示任务卡片
        setPublishedTaskData({
          id: "task-" + Math.floor(Math.random() * 1000000),
          title: "DeFi Yield Farming Dashboard",
          description:
            "Design and develop an interactive dashboard for monitoring and analyzing yield farming opportunities across multiple DeFi protocols.",
          reward: 350,
          deadline: "10 days",
          skills: ["React", "D3.js", "Solidity", "Web3.js"],
          creator: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        });
        setShowPublishedTask(true);

        // 直接设置消息并调用发送函数
        setMessage(responseText);
        setTimeout(() => {
          handleSendMessage();
        }, 300);
        return;
      case "accept-task":
        responseText = "I'd like to accept this task";
        setShowPublishedTask(false);

        // 直接设置消息并调用发送函数
        setMessage(responseText);
        setTimeout(() => {
          handleSendMessage();
        }, 300);
        return;
      case "explore-more-tasks":
        responseText = "Show me more available tasks";
        setMessage(responseText);
        setTimeout(() => {
          handleSendMessage();
        }, 300);
        return;
      case "modify-task":
        responseText = "I want to modify this task";
        setMessage(responseText);
        setTimeout(() => {
          handleSendMessage();
        }, 300);
        return;
      case "create-task":
        responseText = "Yes, please create this task";
        setMessage(responseText);
        setTimeout(() => {
          handleSendMessage();
        }, 300);
        return;
      case "transactions":
        responseText = "Show me my transaction history";
        setMessage(responseText);
        setTimeout(() => {
          handleSendMessage();
        }, 300);
        return;
      case "explore-tasks":
        responseText = "I want to explore tasks";
        setMessage(responseText);
        setTimeout(() => {
          handleSendMessage();
        }, 300);
        return;
      case "more-research":
        responseText = "I'd like more research on these topics";
        setMessage(responseText);
        setTimeout(() => {
          handleSendMessage();
        }, 300);
        return;
      default:
        responseText = action;
        setMessage(responseText);
        setTimeout(() => {
          handleSendMessage();
        }, 300);
        return;
    }
  };

  // 初始化对话数据
  useEffect(() => {
    setConversations(conversationsData);
  }, [conversationsData]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedContact, conversations]);

  return (
    <div className="w-full h-[calc(100vh-8rem)] flex flex-col">
      {/* SVG Background with patterns */}
      <div className="fixed top-0 left-0 w-full h-full -z-5 opacity-10 pointer-events-none">
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

      {/* 装饰光效 */}
      <div className="fixed top-0 left-[10%] w-[35%] h-[40vh] bg-blue-600/20 blur-[120px] rounded-full -z-1 pointer-events-none"></div>
      <div className="fixed top-[20%] right-[10%] w-[25%] h-[30vh] bg-indigo-600/20 blur-[100px] rounded-full -z-1 pointer-events-none"></div>
      <div className="fixed bottom-[10%] left-[20%] w-[30%] h-[30vh] bg-purple-600/20 blur-[100px] rounded-full -z-1 pointer-events-none"></div>

      <div className="w-full h-full flex flex-col overflow-hidden">
        {/* 发布的任务卡片 */}
        {showPublishedTask && publishedTaskData && (
          <div className="mb-3 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-indigo-600/30 rounded-xl"></div>
            <div className="absolute inset-0 border border-indigo-500/40 rounded-xl"></div>
            <div className="relative p-4 backdrop-blur-sm rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-white">{publishedTaskData.title}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm text-indigo-300">Published task</span>
                    <span className="text-gray-500 mx-1">•</span>
                    <span className="text-sm text-gray-400">ID: {publishedTaskData.id}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowPublishedTask(false)}
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-gray-300 mb-3">{publishedTaskData.description}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {publishedTaskData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-indigo-900/60 text-indigo-300 text-xs rounded-md border border-indigo-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Reward</span>
                    <span className="text-lg font-medium text-indigo-400">{publishedTaskData.reward} IDEA</span>
                  </div>
                  <div className="w-px h-10 bg-gray-700"></div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Deadline</span>
                    <span className="text-lg font-medium text-indigo-400">{publishedTaskData.deadline}</span>
                  </div>
                </div>

                <button
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
                  onClick={() => handleToolButtonClick("accept-task")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Accept Task
                </button>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <span>Created by:</span>
                  <span className="text-gray-400">{publishedTaskData.creator}</span>
                </div>
                <div>Just now</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col md:flex-row gap-3 h-full">
          {/* Contact List */}
          <div className="w-full md:w-1/3 lg:w-1/4 h-full">
            <div className="relative h-full flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-indigo-900/10 rounded-2xl"></div>
              <div className="absolute inset-0 border border-indigo-500/20 rounded-2xl"></div>

              <div className="relative p-3 z-10 backdrop-blur-sm h-full flex flex-col">
                {/* 联系人类型选择 */}
                <div className="mb-3">
                  <div className="relative p-1 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-purple-900/30 rounded-xl"></div>
                    <div className="absolute inset-0 border border-purple-500/20 rounded-xl"></div>

                    <div className="relative flex z-10 backdrop-blur-sm">
                      <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                          activeTab === "human"
                            ? "bg-purple-600/60 text-white"
                            : "bg-transparent text-gray-400 hover:text-gray-200"
                        }`}
                        onClick={() => setActiveTab("human")}
                      >
                        Human Contacts
                      </button>
                      <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                          activeTab === "ai"
                            ? "bg-cyan-600/60 text-white"
                            : "bg-transparent text-gray-400 hover:text-gray-200"
                        }`}
                        onClick={() => {
                          setActiveTab("ai");
                          setSelectedContact("0xIdeaBot");
                          // 确保对话数据已加载
                          if (!conversations["0xIdeaBot"]) {
                            setConversations({
                              ...conversations,
                              "0xIdeaBot": conversationsData["0xIdeaBot"],
                            });
                          }
                        }}
                      >
                        IdeaBot AI
                      </button>
                    </div>
                  </div>
                </div>

                {/* 搜索栏 */}
                <div className="mb-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search contacts..."
                      className="w-full py-2 px-4 bg-gray-900/40 border border-indigo-500/20 rounded-lg text-gray-200 focus:outline-none focus:border-indigo-400/40 placeholder-gray-500"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 absolute right-3 top-2.5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* 联系人列表 */}
                <div
                  className="flex-1 overflow-y-auto scrollbar-hide pr-1"
                  style={{ scrollbarWidth: "none", maxHeight: "calc(100% - 100px)" }}
                >
                  <div className="space-y-2">
                    {activeTab === "ai" ? (
                      <div
                        className={`p-3 rounded-xl cursor-pointer transition-all duration-200 relative group hover:scale-[1.02] bg-cyan-600/30 border border-cyan-400/30`}
                        onClick={() => setSelectedContact("0xIdeaBot")}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <Image
                              src={ideaBot.avatar}
                              alt={ideaBot.name}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full bg-gray-700"
                            />
                            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 bg-green-500"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-white truncate">{ideaBot.name}</h3>
                              <span className="text-xs text-cyan-300 whitespace-nowrap">AI Assistant</span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <p className="text-sm text-gray-400 truncate">{ideaBot.lastMessage}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      contacts.map(contact => (
                        <div
                          key={contact.address}
                          className={`p-3 rounded-xl cursor-pointer transition-all duration-200 relative group hover:scale-[1.02] ${
                            selectedContact === contact.address
                              ? "bg-indigo-600/30 border border-indigo-400/30"
                              : "bg-gray-800/40 border border-gray-700/40 hover:bg-gray-700/40"
                          }`}
                          onClick={() => {
                            setSelectedContact(contact.address);
                            // 确保对话数据已加载
                            if (!conversations[contact.address]) {
                              setConversations({
                                ...conversations,
                                [contact.address]: conversationsData[contact.address],
                              });
                            }
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative">
                              <Image
                                src={contact.avatar}
                                alt={contact.name}
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-full bg-gray-700"
                              />
                              <div
                                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
                                  contact.status === "online"
                                    ? "bg-green-500"
                                    : contact.status === "away"
                                      ? "bg-yellow-500"
                                      : "bg-gray-500"
                                }`}
                              ></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium text-white truncate">{contact.name}</h3>
                                <span className="text-xs text-gray-400 whitespace-nowrap">
                                  {contact.address === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
                                    ? "10:45 AM"
                                    : contact.address === "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
                                      ? "Yesterday"
                                      : contact.address === "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
                                        ? "Monday"
                                        : "2d ago"}
                                </span>
                              </div>
                              <div className="flex justify-between items-center mt-1">
                                <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
                                {contact.unread > 0 && (
                                  <span className="flex items-center justify-center min-w-[20px] h-5 rounded-full bg-indigo-600 text-white text-xs font-medium">
                                    {contact.unread}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 h-full">
            <div className="relative h-full flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-indigo-900/10 rounded-2xl"></div>
              <div className="absolute inset-0 border border-indigo-500/20 rounded-2xl"></div>

              {/* Chat Header */}
              <div className="relative z-10 p-3 border-b border-indigo-500/20 backdrop-blur-sm flex-shrink-0">
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      selectedContact === "0xIdeaBot"
                        ? ideaBot.avatar
                        : contacts.find(c => c.address === selectedContact)?.avatar || ""
                    }
                    alt={
                      selectedContact === "0xIdeaBot"
                        ? ideaBot.name
                        : contacts.find(c => c.address === selectedContact)?.name || ""
                    }
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full bg-gray-700"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-white">
                      {selectedContact === "0xIdeaBot"
                        ? ideaBot.name
                        : contacts.find(c => c.address === selectedContact)?.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      {selectedContact === "0xIdeaBot" ? (
                        <>
                          <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                          <span className="text-xs text-cyan-400">AI Assistant</span>
                          <span className="text-gray-500 mx-1">•</span>
                          <span className="text-xs text-gray-400">Can find and recommend tasks for you</span>
                        </>
                      ) : (
                        <>
                          <div
                            className={`w-2 h-2 rounded-full ${
                              contacts.find(c => c.address === selectedContact)?.status === "online"
                                ? "bg-green-500"
                                : contacts.find(c => c.address === selectedContact)?.status === "away"
                                  ? "bg-yellow-500"
                                  : "bg-gray-500"
                            }`}
                          ></div>
                          <span className="text-xs text-gray-400">
                            {contacts.find(c => c.address === selectedContact)?.status === "online"
                              ? "Online"
                              : contacts.find(c => c.address === selectedContact)?.status === "away"
                                ? "Away"
                                : "Offline"}
                          </span>
                          <span className="text-gray-500 mx-1">•</span>
                          <span className="text-xs text-gray-400">
                            <Address address={selectedContact} size="xs" format="short" />
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div
                className="relative z-10 flex-1 p-3 overflow-y-auto scrollbar-hide"
                style={{ scrollbarWidth: "none", maxHeight: "calc(100% - 130px)" }}
              >
                <div className="space-y-3">
                  {conversations[selectedContact]?.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[75%] relative group`}>
                        {msg.sender !== "me" &&
                          idx > 0 &&
                          conversations[selectedContact][idx - 1].sender !== msg.sender && (
                            <div className="absolute -left-12 top-1">
                              <Image
                                src={
                                  selectedContact === "0xIdeaBot"
                                    ? ideaBot.avatar
                                    : contacts.find(c => c.address === selectedContact)?.avatar || ""
                                }
                                alt="avatar"
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-full bg-gray-700"
                              />
                            </div>
                          )}

                        <div
                          className={`p-3 rounded-2xl ${
                            msg.sender === "me"
                              ? "bg-indigo-600/40 border border-indigo-400/30 text-white"
                              : msg.sender === "0xIdeaBot" && msg.isToolCallDescription
                                ? "bg-gray-800/60 border border-gray-700/40 text-cyan-200"
                                : msg.sender === "0xIdeaBot"
                                  ? "bg-cyan-800/40 border border-cyan-500/30 text-gray-200"
                                  : "bg-gray-800/60 border border-gray-700/40 text-gray-200"
                          }`}
                        >
                          <p className="whitespace-pre-line">{msg.text}</p>

                          {/* 工具调用展示 */}
                          {msg.toolCalls && msg.toolCalls.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {msg.toolCalls.map(toolCall => (
                                <div key={toolCall.id} className="rounded-lg border border-gray-700/60 overflow-hidden">
                                  {/* 工具调用头部 */}
                                  <div
                                    className="flex items-center justify-between p-2 text-xs bg-gray-800/80 border-b border-gray-700/60 cursor-pointer"
                                    onClick={() => {
                                      setShowToolCallDetails({
                                        ...showToolCallDetails,
                                        [toolCall.id]: !showToolCallDetails[toolCall.id],
                                      });
                                    }}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="flex items-center justify-center w-6 h-6 rounded-md bg-gray-700 text-white">
                                        {toolCall.tool.icon}
                                      </span>
                                      <span className="font-medium text-white">{toolCall.tool.name}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                          toolCall.status === "running"
                                            ? "bg-yellow-600/30 text-yellow-300"
                                            : toolCall.status === "completed"
                                              ? "bg-green-600/30 text-green-300"
                                              : "bg-red-600/30 text-red-300"
                                        }`}
                                      >
                                        {toolCall.status === "running" && (
                                          <svg
                                            className="animate-spin -ml-0.5 mr-1.5 h-2 w-2 text-yellow-300"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                          >
                                            <circle
                                              className="opacity-25"
                                              cx="12"
                                              cy="12"
                                              r="10"
                                              stroke="currentColor"
                                              strokeWidth="4"
                                            ></circle>
                                            <path
                                              className="opacity-75"
                                              fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                          </svg>
                                        )}
                                        {toolCall.status}
                                      </span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-4 w-4 ml-2 text-gray-400 transition-transform ${showToolCallDetails[toolCall.id] ? "rotate-180" : ""}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M19 9l-7 7-7-7"
                                        />
                                      </svg>
                                    </div>
                                  </div>

                                  {/* 工具调用详情 */}
                                  {showToolCallDetails[toolCall.id] && (
                                    <div className="p-2 text-xs bg-gray-900/60">
                                      <div className="mb-2">
                                        <div className="font-medium text-gray-400 mb-1">Tool Description:</div>
                                        <div className="text-gray-300">{toolCall.tool.description}</div>
                                      </div>

                                      <div className="mb-2">
                                        <div className="font-medium text-gray-400 mb-1">Input:</div>
                                        <div className="font-mono bg-gray-950/60 p-1.5 rounded text-gray-300 overflow-x-auto">
                                          {toolCall.input}
                                        </div>
                                      </div>

                                      {toolCall.output && (
                                        <div className="mb-1">
                                          <div className="font-medium text-gray-400 mb-1">Output:</div>
                                          <div className="font-mono bg-gray-950/60 p-1.5 rounded text-gray-300 overflow-x-auto whitespace-pre-line">
                                            {toolCall.output}
                                          </div>
                                        </div>
                                      )}

                                      <div className="flex justify-between text-gray-500 mt-2">
                                        <div>Started: {toolCall.startTime}</div>
                                        {toolCall.endTime && <div>Ended: {toolCall.endTime}</div>}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          <div
                            className={`text-xs mt-1 ${
                              msg.sender === "me"
                                ? "text-indigo-200/70"
                                : msg.sender === "0xIdeaBot"
                                  ? "text-cyan-200/70"
                                  : "text-gray-400"
                            } flex justify-between items-center`}
                          >
                            <span>{msg.timestamp}</span>
                            {msg.sender === "me" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-indigo-200/70 ml-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>

                          {/* 为IdeaBot回复添加任务创建按钮 */}
                          {msg.sender === "0xIdeaBot" && (
                            <>
                              {msg.text.includes("Would you like to publish this task?") && (
                                <div className="mt-2 flex gap-2">
                                  <button
                                    className="px-3 py-1 bg-cyan-600/70 hover:bg-cyan-500/70 text-white rounded-lg text-sm transition-colors"
                                    onClick={() => handleToolButtonClick("publish-task")}
                                  >
                                    Publish Task
                                  </button>
                                  <button
                                    className="px-3 py-1 bg-gray-800/70 hover:bg-gray-700/70 text-gray-300 rounded-lg text-sm transition-colors"
                                    onClick={() => handleToolButtonClick("modify-task")}
                                  >
                                    Modify Task
                                  </button>
                                </div>
                              )}

                              {msg.text.includes("Would you like to create this task?") && (
                                <div className="mt-2 flex gap-2">
                                  <button
                                    className="px-3 py-1 bg-cyan-600/70 hover:bg-cyan-500/70 text-white rounded-lg text-sm transition-colors"
                                    onClick={() => handleToolButtonClick("create-task")}
                                  >
                                    Create Task
                                  </button>
                                  <button
                                    className="px-3 py-1 bg-gray-800/70 hover:bg-gray-700/70 text-gray-300 rounded-lg text-sm transition-colors"
                                    onClick={() => handleToolButtonClick("modify-task")}
                                  >
                                    Modify Task
                                  </button>
                                </div>
                              )}

                              {msg.text.includes("Would you like to see your detailed transaction history") && (
                                <div className="mt-2 flex gap-2">
                                  <button
                                    className="px-3 py-1 bg-cyan-600/70 hover:bg-cyan-500/70 text-white rounded-lg text-sm transition-colors"
                                    onClick={() => handleToolButtonClick("transactions")}
                                  >
                                    View Transactions
                                  </button>
                                  <button
                                    className="px-3 py-1 bg-gray-800/70 hover:bg-gray-700/70 text-gray-300 rounded-lg text-sm transition-colors"
                                    onClick={() => handleToolButtonClick("explore-tasks")}
                                  >
                                    Explore Tasks
                                  </button>
                                </div>
                              )}

                              {msg.text.includes("Would you like me to recommend specific tasks") && (
                                <div className="mt-2 flex gap-2">
                                  <button
                                    className="px-3 py-1 bg-cyan-600/70 hover:bg-cyan-500/70 text-white rounded-lg text-sm transition-colors"
                                    onClick={() => handleToolButtonClick("recommend-tasks")}
                                  >
                                    Recommend Tasks
                                  </button>
                                  <button
                                    className="px-3 py-1 bg-gray-800/70 hover:bg-gray-700/70 text-gray-300 rounded-lg text-sm transition-colors"
                                    onClick={() => handleToolButtonClick("more-research")}
                                  >
                                    More Research
                                  </button>
                                </div>
                              )}

                              {msg.text.includes("Would you like to accept any of these tasks") && (
                                <div className="mt-2 flex gap-2">
                                  <button
                                    className="px-3 py-1 bg-cyan-600/70 hover:bg-cyan-500/70 text-white rounded-lg text-sm transition-colors"
                                    onClick={() => handleToolButtonClick("accept-task-recommendation")}
                                  >
                                    Accept First Task
                                  </button>
                                  <button
                                    className="px-3 py-1 bg-gray-800/70 hover:bg-gray-700/70 text-gray-300 rounded-lg text-sm transition-colors"
                                    onClick={() => handleToolButtonClick("explore-more-tasks")}
                                  >
                                    See More Tasks
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="relative z-10 p-3 border-t border-indigo-500/20 backdrop-blur-sm flex-shrink-0">
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    if (message.trim()) {
                      handleSendMessage();
                    }
                  }}
                  className="flex gap-2"
                >
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-gray-200 rounded-full hover:bg-gray-700/50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder={
                        selectedContact === "0xIdeaBot"
                          ? "Tell IdeaBot about your skills and interests..."
                          : "Type a message..."
                      }
                      className="w-full py-2 px-4 bg-gray-900/40 border border-indigo-500/20 rounded-lg text-gray-200 focus:outline-none focus:border-indigo-400/40 placeholder-gray-500"
                    />
                    <button type="button" className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    className={`p-2 ${selectedContact === "0xIdeaBot" ? "bg-cyan-600/60 hover:bg-cyan-500/70" : "bg-indigo-600/60 hover:bg-indigo-500/70"} text-white rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group/btn`}
                    disabled={!message.trim()}
                  >
                    <div
                      className={`absolute inset-0 ${selectedContact === "0xIdeaBot" ? "bg-gradient-to-r from-cyan-600/40 to-blue-600/40" : "bg-gradient-to-r from-indigo-600/40 to-blue-600/40"} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`}
                    ></div>
                    <div className="relative z-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
