import { NetworkOptions } from "./NetworkOptions";
import { useDisconnect } from "wagmi";
import { ArrowLeftOnRectangleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export const WrongNetworkDropdown = () => {
  const { disconnect } = useDisconnect();

  // 紫色半透明主题样式
  const purpleStyle = {
    button: {
      backgroundColor: 'rgba(255, 99, 132, 0.7)', // 错误状态使用红色半透明背景
      borderColor: 'rgba(255, 120, 150, 0.5)',
      boxShadow: '0 4px 6px rgba(255, 99, 132, 0.2)'
    },
    dropdownContent: {
      backgroundColor: 'rgba(30, 10, 60, 0.85)', 
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(147, 87, 252, 0.3)'
    }
  };

  return (
    <div className="dropdown dropdown-end mr-2">
      <label 
        tabIndex={0} 
        className="btn btn-error btn-sm dropdown-toggle gap-1 backdrop-blur-sm"
        style={purpleStyle.button}
      >
        <span>Wrong network</span>
        <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 mt-1 shadow-center shadow-accent rounded-box gap-1"
        style={purpleStyle.dropdownContent}
      >
        <NetworkOptions />
        <li>
          <button
            className="menu-item text-error btn-sm rounded-xl! flex gap-3 py-3 hover:bg-opacity-20"
            type="button"
            onClick={() => disconnect()}
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" />
            <span>Disconnect</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
