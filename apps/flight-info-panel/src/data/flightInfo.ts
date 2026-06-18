export interface FlightEndpoint {
  date: string;
  airport: string;
  timeLabel: string;
  time: string;
}

export interface FlightLeg {
  id: string;
  status: string;
  duration: string;
}

export interface FlightInfo {
  stage: string;
  callSign: string;
  aircraft: string;
  registration: string;
  departure: FlightEndpoint;
  arrival: FlightEndpoint;
  departureFob: string;
  currentUtc: string;
  arrivalFob: string;
  legs: FlightLeg[];
  activeLegIndex: number;
  taxiDepartureTime: string;
  taxiDuration: string;
  position: {
    latitude: string;
    longitude: string;
    altitude: string;
    groundSpeed: string;
    heading: string;
  };
}

export const sampleFlight: FlightInfo = {
  stage: 'In flight',
  callSign: 'AAL532',
  aircraft: 'B737-8',
  registration: 'N823NN',
  departure: {
    date: '24 Jan 2025',
    airport: 'JFK',
    timeLabel: 'STD',
    time: '11:58',
  },
  arrival: {
    date: '24 Jan 2025',
    airport: 'ORD',
    timeLabel: 'STA',
    time: '14:28',
  },
  departureFob: '8.30 t',
  currentUtc: '14:00',
  arrivalFob: '1.90 t',
  legs: [
    { id: 'leg-1', status: 'Inflight', duration: '57min' },
    { id: 'leg-2', status: 'Cruise', duration: '42min' },
    { id: 'leg-3', status: 'Approach', duration: '18min' },
    { id: 'leg-4', status: 'Taxi', duration: '09min' },
  ],
  activeLegIndex: 0,
  taxiDepartureTime: '12:00 h',
  taxiDuration: '09 min',
  position: {
    latitude: '41.8781° N',
    longitude: '87.6298° W',
    altitude: '34,200 ft',
    groundSpeed: '452 kts',
    heading: '278°',
  },
};
