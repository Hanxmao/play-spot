export interface CustomPlace {
  id: string;
  name: string;
  vicinity: string;
  lat: number;
  lng: number;
  crowdedness?: 'full' | 'crowded' | 'moderate' | 'available';
  sport?: string;
}
