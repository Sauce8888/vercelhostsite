import { 
  Wifi, 
  Tv, 
  Utensils, 
  Car, 
  Thermometer, 
  WashingMachine,
  DogIcon,
  Waves
} from 'lucide-react';

interface AmenitiesListProps {
  amenities: string[];
}

const amenityIcons: Record<string, any> = {
  wifi: Wifi,
  tv: Tv,
  kitchen: Utensils,
  parking: Car,
  'air conditioning': Thermometer,
  'washing machine': WashingMachine,
  'pet friendly': DogIcon,
  pool: Waves,
};

export default function AmenitiesList({ amenities }: AmenitiesListProps) {
  if (!amenities || amenities.length === 0) {
    return <p>No amenities listed</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {amenities.map((amenity) => {
        const IconComponent = amenityIcons[amenity.toLowerCase()] || null;
        
        return (
          <div key={amenity} className="flex items-center gap-2">
            {IconComponent && <IconComponent className="h-5 w-5 text-gray-700" />}
            <span>{amenity}</span>
          </div>
        );
      })}
    </div>
  );
} 