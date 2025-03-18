'use client';

import Image from 'next/image';

interface PropertyGalleryProps {
  images: string[];
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-200 aspect-video w-full flex items-center justify-center rounded-lg">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  const mainImage = images[0];
  const otherImages = images.slice(1, 5); // Show up to 4 additional images

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="col-span-1 md:col-span-2 row-span-2">
        <div className="relative aspect-video w-full h-full overflow-hidden rounded-lg">
          <Image 
            src={mainImage} 
            alt="Main property image" 
            fill
            className="object-cover"
          />
        </div>
      </div>
      
      {otherImages.map((image, index) => (
        <div key={index} className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image 
            src={image} 
            alt={`Property image ${index + 2}`} 
            fill
            className="object-cover"
          />
        </div>
      ))}
      
      {otherImages.length < 4 && Array.from({ length: 4 - otherImages.length }).map((_, index) => (
        <div key={`placeholder-${index}`} className="bg-gray-200 aspect-video w-full rounded-lg"></div>
      ))}
    </div>
  );
} 