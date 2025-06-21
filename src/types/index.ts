export interface EventRequest {
  id: string;
  eventName: string;
  eventStart: string;
  eventEnd: string;
  clientName: string;
  contactInfo: string;
  venue: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Position {
  id: string;
  position: string;
  time: string;
  info: string;
  quantity: number;
  contractorId?: string;
}

export interface MeetingRoom {
  id: string;
  name: string;
  positions: number;
  startDate: string;
  endDate: string;
}

export interface EventDetails {
  id: string;
  eventName: string;
  venueDetails: string;
  startDate: string;
  endDate: string;
  venueAddress: string;
  coordinator?: string;
  meetingRooms: MeetingRoom[];
  positions: Position[];
}