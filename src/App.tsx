import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import EventRequests from './components/EventRequests';
import EventDetails from './components/EventDetails';
import CreateEventModal from './components/CreateEventModal';
import { generateMockEventRequests } from './data/mockData';
import { EventRequest } from './types';

function App() {
  const [activeSection, setActiveSection] = useState('new-requests');
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    events: true,
    users: false
  });
  const [currentView, setCurrentView] = useState<'list' | 'details'>('list');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [events, setEvents] = useState<EventRequest[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setEvents(generateMockEventRequests());
  }, []);

  const handleToggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentView('details');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedEventId(null);
  };

  const handleCreateEvent = (eventData: Omit<EventRequest, 'id'>) => {
    const newEvent: EventRequest = {
      ...eventData,
      id: `event-${Date.now()}`
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    if (currentView === 'details' && selectedEventId) {
      return (
        <EventDetails
          eventId={selectedEventId}
          onBack={handleBackToList}
        />
      );
    }

    switch (activeSection) {
      case 'new-requests':
        return (
          <EventRequests
            events={events}
            onEventClick={handleEventClick}
            onCreateNew={() => setIsCreateModalOpen(true)}
          />
        );
      default:
        return (
          <div className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace('-', ' ')}
              </h2>
              <p className="text-gray-400">This section is under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          expandedSections={expandedSections}
          onToggleSection={handleToggleSection}
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={handleMenuClick} />
          <div className="flex-1 overflow-auto">
            {renderContent()}
          </div>
        </div>
      </div>

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateEvent}
      />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(17, 24, 39, 0.95)',
            color: '#fff',
            border: '1px solid rgba(147, 51, 234, 0.3)',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;