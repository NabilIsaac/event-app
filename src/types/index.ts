export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  price: string;
  category: string;
  organizer: string;
  organizerImage: string;
  time: string;
  isPromoted?: boolean;
  imageUrl: string;
  coordinate?: {
    latitude: number;
    longitude: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isVendor: boolean;
}

export interface SavedEvent extends Event {
  savedAt: Date;
}

export interface City {
  id: string;
  name: string;
  image: string;
}

export type EventFormData = Omit<Event, 'id' | 'isPromoted' | 'imageUrl'>;
