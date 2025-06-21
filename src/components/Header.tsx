import React from 'react';
import { Bell, MessageSquare, User, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-purple-500/30 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-purple-600/20 rounded-lg transition-all duration-200"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop Spacer */}
        <div className="hidden lg:block"></div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Notifications */}
          <button className="p-2 text-gray-300 hover:text-white hover:bg-purple-600/20 rounded-lg transition-all duration-200">
            <MessageSquare className="w-5 h-5" />
          </button>
          
          <button className="p-2 text-gray-300 hover:text-white hover:bg-purple-600/20 rounded-lg transition-all duration-200">
            <Bell className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-2 lg:space-x-3 bg-purple-600/20 rounded-lg px-2 lg:px-4 py-2 border border-purple-500/30">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm hidden sm:block">
              <div className="text-white font-medium">Hi, Muhammad Asad</div>
              <div className="text-gray-400">welcome back!</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;