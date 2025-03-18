'use client';

import { MapPin } from 'lucide-react';

interface LocationMapProps {
  location: string;
}

export default function LocationMap({ location }: LocationMapProps) {
  // In a real application, you would use a proper map API like Google Maps, Mapbox, etc.
  // For now, we'll create a simple placeholder that visually represents a map
  
  return (
    <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gray-200 opacity-50"></div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-10 w-10 text-red-500 mx-auto" />
          <p className="font-medium mt-2">{location}</p>
          <p className="text-sm text-gray-600 mt-1">Map data would be displayed here</p>
        </div>
      </div>
    </div>
  );
} 