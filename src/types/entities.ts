export interface Location {
  locationId: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  sports: any[];
  locationActivities: string[];
  fullnessScore?: number;
}

export interface Sport {
  sportId: number;
  name: string;
  description: string;
  imageUrl: string;
}