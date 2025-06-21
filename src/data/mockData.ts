import { EventRequest, EventDetails, MeetingRoom, Position } from '../types';

export const generateMockEventRequests = (): EventRequest[] => {
  const events: EventRequest[] = [];
  const eventNames = [
    'Annual Tech Conference', 'Product Launch Event', 'Corporate Training', 
    'Marketing Summit', 'Team Building Workshop', 'Client Presentation',
    'Board Meeting', 'Quarterly Review', 'Innovation Workshop', 'Sales Conference'
  ];
  
  const clientNames = [
    'Muhammad Asad', 'Sarah Johnson', 'David Chen', 'Emily Rodriguez', 
    'Michael Brown', 'Lisa Wang', 'James Wilson', 'Anna Martinez',
    'Robert Taylor', 'Jennifer Lee'
  ];

  const venues = [
    'Grand Convention Center', 'Tech Hub Auditorium', 'Business Plaza',
    'Innovation Center', 'Corporate Tower', 'Conference Hall A',
    'Meeting Center B', 'Executive Boardroom', 'Training Facility',
    'Event Space Downtown'
  ];

  for (let i = 1; i <= 50; i++) {
    const startDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const endDate = new Date(startDate.getTime() + (Math.floor(Math.random() * 5) + 1) * 24 * 60 * 60 * 1000);
    
    events.push({
      id: `event-${i}`,
      eventName: eventNames[Math.floor(Math.random() * eventNames.length)],
      eventStart: startDate.toLocaleDateString(),
      eventEnd: endDate.toLocaleDateString(),
      clientName: clientNames[Math.floor(Math.random() * clientNames.length)],
      contactInfo: `+1 234 567 ${String(7890 + i).padStart(4, '0')}`,
      venue: venues[Math.floor(Math.random() * venues.length)],
      status: ['pending', 'approved', 'rejected'][Math.floor(Math.random() * 3)] as 'pending' | 'approved' | 'rejected'
    });
  }
  
  return events;
};

export const mockMeetingRooms: MeetingRoom[] = [
  {
    id: 'room-1',
    name: 'Meeting Room 1',
    positions: 12,
    startDate: '12 Jan, 2023',
    endDate: '15 Jan, 2023'
  },
  {
    id: 'room-2',
    name: 'Meeting Room 2',
    positions: 12,
    startDate: '12 Jan, 2023',
    endDate: '15 Jan, 2023'
  },
  {
    id: 'room-3',
    name: 'Meeting Room 3',
    positions: 12,
    startDate: '12 Jan, 2023',
    endDate: '15 Jan, 2023'
  },
  {
    id: 'room-4',
    name: 'Meeting Room 4',
    positions: 12,
    startDate: '12 Jan, 2023',
    endDate: '15 Jan, 2023'
  },
  {
    id: 'room-5',
    name: 'Meeting Room 5',
    positions: 12,
    startDate: '12 Jan, 2023',
    endDate: '15 Jan, 2023'
  }
];

export const mockPositions: Position[] = [
  {
    id: 'pos-1',
    position: 'Camera 1 (Video)',
    time: '9 am - 7 pm',
    info: 'LP default',
    quantity: 20
  },
  {
    id: 'pos-2',
    position: 'Camera 1 (Video)',
    time: '9 am - 7 pm',
    info: 'LP default',
    quantity: 20
  },
  {
    id: 'pos-3',
    position: 'Camera 1 (Video)',
    time: '9 am - 7 pm',
    info: 'LP default',
    quantity: 20
  },
  {
    id: 'pos-4',
    position: 'Camera 1 (Video)',
    time: '9 am - 7 pm',
    info: 'LP default',
    quantity: 20
  },
  {
    id: 'pos-5',
    position: 'Camera 1 (Video)',
    time: '9 am - 7 pm',
    info: 'LP default',
    quantity: 20
  },
  {
    id: 'pos-6',
    position: 'Camera 1 (Video)',
    time: '9 am - 7 pm',
    info: 'LP default',
    quantity: 20
  },
  {
    id: 'pos-7',
    position: 'Camera 1 (Video)',
    time: '9 am - 7 pm',
    info: 'LP default',
    quantity: 20
  },
  {
    id: 'pos-8',
    position: 'Camera 1 (Video)',
    time: '9 am - 7 pm',
    info: 'LP default',
    quantity: 20
  }
];