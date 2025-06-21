import React, { useState } from 'react';
import { Search, Plus, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { EventRequest } from '../types';

interface EventRequestsProps {
  events: EventRequest[];
  onEventClick: (eventId: string) => void;
  onCreateNew: () => void;
}

const EventRequests: React.FC<EventRequestsProps> = ({ events, onEventClick, onCreateNew }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 15;

  const filteredEvents = events.filter(event =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex-1 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <h1 className="text-2xl font-bold text-white">Event Requests</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 w-full sm:w-64"
            />
          </div>
          
          {/* Add Button */}
          <button
            onClick={onCreateNew}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span className="sm:hidden">Add New</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-purple-500/30 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-purple-600/50 to-pink-600/50 px-6 py-4">
            <div className="grid grid-cols-7 gap-4 text-white font-medium">
              <div className="flex items-center space-x-2">
                <span>Event Name</span>
                <ChevronLeft className="w-4 h-4" />
              </div>
              <div>Event Start</div>
              <div className="flex items-center space-x-2">
                <span>Event End</span>
                <ChevronLeft className="w-4 h-4" />
              </div>
              <div className="flex items-center space-x-2">
                <span>Client Name</span>
                <ChevronLeft className="w-4 h-4" />
              </div>
              <div>Contact Info</div>
              <div>Venue</div>
              <div>Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-purple-500/20">
            {paginatedEvents.map((event) => (
              <div
                key={event.id}
                className="grid grid-cols-7 gap-4 px-6 py-4 text-gray-300 hover:bg-purple-600/10 transition-all duration-200 cursor-pointer"
                onClick={() => onEventClick(event.id)}
              >
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-white">{event.eventName}</span>
                </div>
                <div>{event.eventStart}</div>
                <div>{event.eventEnd}</div>
                <div className="text-white">{event.clientName}</div>
                <div>{event.contactInfo}</div>
                <div>{event.venue}</div>
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event.id);
                    }}
                    className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-purple-500/20">
          {paginatedEvents.map((event) => (
            <div
              key={event.id}
              className="p-4 hover:bg-purple-600/10 transition-all duration-200 cursor-pointer"
              onClick={() => onEventClick(event.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <h3 className="text-white font-medium">{event.eventName}</h3>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event.id);
                  }}
                  className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Client:</span>
                  <span className="text-white">{event.clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Start:</span>
                  <span className="text-gray-300">{event.eventStart}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">End:</span>
                  <span className="text-gray-300">{event.eventEnd}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Contact:</span>
                  <span className="text-gray-300">{event.contactInfo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Venue:</span>
                  <span className="text-gray-300">{event.venue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="bg-gray-800/50 px-4 lg:px-6 py-4 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-purple-600/20'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="text-gray-400 text-sm text-center sm:text-right">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredEvents.length)} of {filteredEvents.length} results
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRequests;