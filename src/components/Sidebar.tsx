import React from 'react';
import { ChevronDown, ChevronRight, Users, Calendar, FileText, User, LogOut, X } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  expandedSections: { [key: string]: boolean };
  onToggleSection: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  expandedSections, 
  onToggleSection,
  isOpen,
  onClose
}) => {
  const menuItems = [
    {
      id: 'events',
      label: 'Events',
      icon: Calendar,
      hasSubmenu: true,
      submenu: [
        { id: 'new-requests', label: 'New Requests', badge: '6' },
        { id: 'estimate', label: 'Estimate' },
        { id: 'events-list', label: 'Events' },
        { id: 'partial-requests', label: 'Partial Requests' }
      ]
    },
    {
      id: 'positions',
      label: 'Positions',
      icon: FileText,
      hasSubmenu: false
    },
    {
      id: 'contractors',
      label: 'Contractors',
      icon: Users,
      hasSubmenu: false
    },
    {
      id: 'users',
      label: 'Users',
      icon: User,
      hasSubmenu: true,
      submenu: [
        { id: 'admins', label: 'Admins' },
        { id: 'clients', label: 'Clients' },
        { id: 'coordinators', label: 'Coordinators' }
      ]
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      hasSubmenu: false
    }
  ];

  const handleMenuClick = (item: any) => {
    if (item.hasSubmenu) {
      onToggleSection(item.id);
    } else {
      onSectionChange(item.id);
      // Close sidebar on mobile after selection
      if (window.innerWidth < 1024) {
        onClose();
      }
    }
  };

  const handleSubmenuClick = (subItem: any) => {
    onSectionChange(subItem.id);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900/95 backdrop-blur-sm border-r border-purple-500/30 
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col h-screen
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden absolute top-4 right-4">
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-purple-600/20 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Logo */}
        <div className="p-6 border-b border-purple-500/30">
          <div className="flex items-center space-x-3">
            <img src="/logo2.png" alt="Logo" className="w-10 h-10" />
            <span className="text-white font-semibold text-lg">EventPro</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id || (item.hasSubmenu && expandedSections[item.id])
                    ? 'bg-purple-600/30 text-white border border-purple-500/50'
                    : 'text-gray-300 hover:bg-purple-600/20 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.hasSubmenu && (
                  expandedSections[item.id] ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {/* Submenu */}
              {item.hasSubmenu && expandedSections[item.id] && (
                <div className="ml-4 mt-2 space-y-1">
                  {item.submenu?.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => handleSubmenuClick(subItem)}
                      className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                        activeSection === subItem.id
                          ? 'bg-purple-500/40 text-white'
                          : 'text-gray-400 hover:bg-purple-600/20 hover:text-white'
                      }`}
                    >
                      <span>{subItem.label}</span>
                      {subItem.badge && (
                        <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                          {subItem.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-purple-500/30">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-red-600/20 hover:text-red-400 rounded-lg transition-all duration-200">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;