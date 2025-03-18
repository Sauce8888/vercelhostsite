// src/app/page.tsx - Main property display page
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import BookingWidget from '@/components/BookingWidget';
import PropertyGallery from '@/components/PropertyGallery';
import AmenitiesList from '@/components/AmenitiesList';
import HostInfo from '@/components/HostInfo';
import LocationMap from '@/components/LocationMap';

// This ensures the page always gets the latest data
export const revalidate = 3600; // Revalidate every hour

export default async function PropertyPage() {
  // Get the property ID from environment variable
  const propertyId = process.env.NEXT_PUBLIC_PROPERTY_ID || "1";
  
  // Create a Supabase client for server components
  const supabase = createServerComponentClient({ cookies });
  
  // Fetch property data
  try {
    const { data: property, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', propertyId)
      .single();
    
    if (error) {
      console.error('Error fetching property:', error);
      return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-semibold">Property not found</h1>
            <p className="mt-4">Sorry, we couldn't find the property you're looking for.</p>
          </div>
        </main>
      );
    }
    
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Property Name */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{property.name}</h1>
        
        {/* Property Gallery */}
        <PropertyGallery images={property.images || []} />
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">About this place</h2>
              <div className="prose max-w-none">
                <p>{property.description || 'No description available'}</p>
              </div>
            </section>
            
            {/* Amenities */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">What this place offers</h2>
              <AmenitiesList amenities={property.amenities || []} />
            </section>
            
            {/* Location */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <p className="mb-4">{property.location || 'Location not specified'}</p>
              <LocationMap location={property.location || ''} />
            </section>
            
            {/* Host Information */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">About your host</h2>
              <HostInfo propertyId={property.id} />
            </section>
          </div>
          
          {/* Right Column: Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BookingWidget 
                propertyId={property.id} 
                basePrice={property.base_price || 0} 
              />
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error:', error);
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="mt-4">Sorry, we encountered an error while loading the property.</p>
        </div>
      </main>
    );
  }
} 