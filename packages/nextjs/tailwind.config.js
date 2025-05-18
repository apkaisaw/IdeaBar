module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 亮模式颜色
        primary: {
          DEFAULT: '#4F46E5', // 主题色（亮模式）
        },
        secondary: {
          DEFAULT: '#06B6D4', // 次要色（亮模式）
        },
        accent: {
          DEFAULT: '#10B981', // 强调色（亮模式）
        },
        // 暗模式颜色将通过CSS变量实现
        'neon-volt': '#8B5CF6', // 主题色（暗模式）
        'plasma-bolt': '#3B82F6', // 次要色（暗模式）
        'neo-green': '#14F195', // 霓虹绿色（暗模式）
        
        // 背景色
        light: {
          bg: '#F8FAFC', // 亮模式浅灰背景
        },
        dark: {
          bg: '#0F172A', // 暗模式深蓝黑色
          secondary: '#1E293B', // 暗蓝灰
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--neon-volt), #1e90ff)',
        'gradient-secondary': 'linear-gradient(135deg, var(--plasma-bolt), #ff8c00)',
        'gradient-text': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#4F46E5",
          secondary: "#06B6D4",
          accent: "#10B981",
          "base-100": "#FFFFFF",
          "base-200": "#F8FAFC",
          "base-300": "#E2E8F0",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#8B5CF6",
          secondary: "#3B82F6",
          accent: "#14F195",
          "base-100": "#0F172A",
          "base-200": "#1E293B",
          "base-300": "#334155",
        },
      },
    ],
  },
}; 