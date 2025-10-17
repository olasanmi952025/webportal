import React, { useState } from 'react';
import { cn } from '../../../utils';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabPanelProps {
  tabs: TabItem[];
  defaultTab?: string;
  className?: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ 
  tabs, 
  defaultTab, 
  className 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className={cn("w-full", className)}>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2",
                activeTab === tab.id
                  ? "text-blue-600 border-blue-600 bg-blue-50"
                  : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default TabPanel;
