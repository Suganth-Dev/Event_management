import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { EventDetails as EventDetailsType, Position, MeetingRoom } from '../types';
import { mockMeetingRooms, mockPositions } from '../data/mockData';
import toast from 'react-hot-toast';

interface EventDetailsProps {
  eventId: string;
  onBack: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventId, onBack }) => {
  const [activeTab, setActiveTab] = useState('assign-coordinator');
  const [selectedCoordinator, setSelectedCoordinator] = useState('');
  const [positions, setPositions] = useState<Position[]>(mockPositions);
  const [meetingRooms] = useState<MeetingRoom[]>(mockMeetingRooms);
  const [selectedRoom, setSelectedRoom] = useState<string>(meetingRooms[0]?.id || '');

  const tabs = [
    { id: 'event-details', label: 'Event Details' },
    { id: 'assign-coordinator', label: 'Assign Coordinator' },
    { id: 'session-management', label: 'Session Management' },
    { id: 'generate-sow', label: 'Generate SOW' }
  ];

  const handleAddPosition = () => {
    const newPosition: Position = {
      id: `pos-${Date.now()}`,
      position: 'Camera 1 (Video)',
      time: '9 am - 7 pm',
      info: 'LP default',
      quantity: 20
    };
    setPositions([...positions, newPosition]);
    toast.success('New position added successfully!');
  };

  const handleRemovePosition = (id: string) => {
    setPositions(positions.filter(pos => pos.id !== id));
    toast.success('Position removed successfully!');
  };

  const handleQuantityChange = (id: string, change: number) => {
    setPositions(positions.map(pos => 
      pos.id === id 
        ? { ...pos, quantity: Math.max(0, pos.quantity + change) }
        : pos
    ));
  };

  const handleContractorChange = (positionId: string, contractorId: string) => {
    setPositions(positions.map(pos => 
      pos.id === positionId 
        ? { ...pos, contractorId }
        : pos
    ));
  };

  const handleSaveEdits = () => {
    // Check if any contractors are selected
    const hasContractors = positions.some(pos => pos.contractorId);
    
    if (hasContractors) {
      toast.success('Event details saved successfully! Contractors assigned.');
    } else {
      toast.success('Event details saved successfully!');
    }
  };

  return (
    <div className="flex-1 p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 text-gray-300 hover:text-white hover:bg-purple-600/20 rounded-lg transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl lg:text-2xl font-bold text-white">
          Event Name <span className="text-gray-400 font-normal">(Venue Details)</span>
        </h1>
      </div>

      {/* Tabs */}
      <div className="mb-6 bg-gray-800/50 rounded-lg p-1 overflow-x-auto">
        <div className="flex space-x-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-purple-600/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left Column - Coordinator Assignment */}
        <div className="space-y-6">
          {/* Assign Coordinator */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-purple-500/30 p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Assign Coordinator</h3>
            <div className="relative">
              <select
                value={selectedCoordinator}
                onChange={(e) => setSelectedCoordinator(e.target.value)}
                className="w-full bg-gray-800/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 appearance-none"
              >
                <option value="">Search Coordinator</option>
                <option value="coordinator-1">John Smith</option>
                <option value="coordinator-2">Sarah Johnson</option>
                <option value="coordinator-3">Mike Davis</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
            <button className="mt-4 text-purple-400 hover:text-purple-300 text-sm transition-colors duration-200">
              Add New Coordinator
            </button>
          </div>

          {/* Assign Contractor */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-purple-500/30 p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Assign Contractor</h3>
            
            {/* Meeting Rooms */}
            <div className="space-y-3 max-h-64 lg:max-h-96 overflow-y-auto">
              {meetingRooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedRoom === room.id
                      ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-purple-500'
                      : 'bg-gray-800/30 border-purple-500/30 hover:bg-purple-600/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">{room.name}</h4>
                      <p className="text-gray-400 text-sm">
                        Start from {room.startDate} - Ends at {room.endDate}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-400 text-sm">{room.positions} Positions</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Event Details & Positions */}
        <div className="space-y-6">
          {/* Event Info */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-purple-500/30 p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Event Name (Venue Here)</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Start:</span>
                  <div className="text-white">12-12-2023</div>
                </div>
                <div>
                  <span className="text-gray-400">Ends:</span>
                  <div className="text-white">15-12-2023</div>
                </div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Venue Address:</span>
                <p className="text-white text-sm mt-1">Some Location 12, Name Here, City, State.</p>
              </div>
            </div>
          </div>

          {/* Positions Table */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-purple-500/30 overflow-hidden">
            <div className="p-4 border-b border-purple-500/30">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Positions</h3>
                <button
                  onClick={handleAddPosition}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-2 rounded-lg transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block">
              {/* Table Header */}
              <div className="bg-purple-600/20 px-4 py-3">
                <div className="grid grid-cols-5 gap-4 text-white font-medium text-sm">
                  <div>Position</div>
                  <div>Time</div>
                  <div>Info</div>
                  <div>Quantity</div>
                  <div>Contractor</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="max-h-64 overflow-y-auto">
                {positions.map((position) => (
                  <div key={position.id} className="grid grid-cols-5 gap-4 px-4 py-3 border-b border-purple-500/20 text-sm">
                    <div className="text-white">{position.position}</div>
                    <div className="text-gray-300">{position.time}</div>
                    <div className="text-gray-300">{position.info}</div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(position.id, -1)}
                        className="p-1 text-gray-400 hover:text-white hover:bg-purple-600/20 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-white w-8 text-center">{position.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(position.id, 1)}
                        className="p-1 text-gray-400 hover:text-white hover:bg-purple-600/20 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="relative">
                      <select 
                        value={position.contractorId || ''}
                        onChange={(e) => handleContractorChange(position.id, e.target.value)}
                        className="w-full bg-gray-800/50 border border-purple-500/30 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-purple-500 appearance-none"
                      >
                        <option value="">Select Contractor</option>
                        <option value="contractor-1">Contractor 1</option>
                        <option value="contractor-2">Contractor 2</option>
                        <option value="contractor-3">Contractor 3</option>
                      </select>
                      <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden max-h-64 overflow-y-auto">
              {positions.map((position) => (
                <div key={position.id} className="p-4 border-b border-purple-500/20">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-white font-medium">{position.position}</div>
                        <div className="text-gray-300 text-sm">{position.time}</div>
                        <div className="text-gray-300 text-sm">{position.info}</div>
                      </div>
                      <button
                        onClick={() => handleRemovePosition(position.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-sm">Quantity:</span>
                        <button
                          onClick={() => handleQuantityChange(position.id, -1)}
                          className="p-1 text-gray-400 hover:text-white hover:bg-purple-600/20 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white w-8 text-center">{position.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(position.id, 1)}
                          className="p-1 text-gray-400 hover:text-white hover:bg-purple-600/20 rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="relative">
                      <select 
                        value={position.contractorId || ''}
                        onChange={(e) => handleContractorChange(position.id, e.target.value)}
                        className="w-full bg-gray-800/50 border border-purple-500/30 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500 appearance-none"
                      >
                        <option value="">Select Contractor</option>
                        <option value="contractor-1">Contractor 1</option>
                        <option value="contractor-2">Contractor 2</option>
                        <option value="contractor-3">Contractor 3</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="bg-gray-800/50 px-4 py-3 flex items-center justify-center space-x-4">
              <button className="p-1 text-gray-400 hover:text-white">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex space-x-2">
                <button className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs">1</button>
                <button className="w-6 h-6 rounded-full text-gray-400 hover:text-white text-xs">2</button>
                <button className="w-6 h-6 rounded-full text-gray-400 hover:text-white text-xs">3</button>
              </div>
              <button className="p-1 text-gray-400 hover:text-white">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button 
            onClick={handleSaveEdits}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg font-medium transition-all duration-200"
          >
            Save Edits
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;