import Image from "next/image";
import Link from "next/link";
import PropertyGallery from "@/components/PropertyGallery";
import AmenitiesList from "@/components/AmenitiesList";
import HostInfo from "@/components/HostInfo";
import BookingWidget from "@/components/BookingWidget";

export default function Home() {
  // Sample data for components
  const propertyImages = [
    "/images/property-hero.jpg",
    "/images/living-room.jpg",
    "/images/kitchen.jpg",
    "/images/bedroom.jpg",
    "/images/deck.jpg"
  ];
  
  const propertyAmenities = [
    "wifi", 
    "tv", 
    "kitchen", 
    "parking", 
    "air conditioning", 
    "washing machine", 
    "pet friendly", 
    "pool"
  ];
  
  const propertyId = "sample-property-123";
  const basePrice = 199;

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section with Image Carousel */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src="/images/property-hero.jpg"
          alt="Beach House Retreat"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/40 p-6 text-center text-white rounded-lg max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">Beach House Retreat</h1>
            <p className="text-xl mb-4">Your perfect getaway destination</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Property Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-4">Beachfront Paradise</h2>
            <p className="text-gray-700 mb-6">
              Experience the ultimate beach getaway at our luxurious waterfront property. 
              Nestled along pristine shorelines, our beach house offers breathtaking views, 
              modern amenities, and unparalleled comfort for your perfect vacation.
            </p>
            
            {/* Property Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="font-semibold">4 Bedrooms</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="font-semibold">3 Bathrooms</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="font-semibold">8 Guests</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="font-semibold">Pool</p>
              </div>
            </div>

            {/* Property Gallery */}
            <PropertyGallery images={propertyImages} />
            
            {/* Amenities */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-4">Amenities</h3>
              <AmenitiesList amenities={propertyAmenities} />
            </div>
          </div>
          
          <div>
            {/* Booking Widget */}
            <div className="bg-white shadow-lg rounded-lg p-6 sticky top-4">
              <BookingWidget propertyId={propertyId} basePrice={basePrice} />
            </div>
          </div>
        </div>
        
        {/* Host Information */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <h3 className="text-2xl font-bold mb-4">Meet Your Host</h3>
          <HostInfo propertyId={propertyId} />
        </div>
        
        {/* Call to Action */}
        <div className="bg-blue-50 rounded-lg p-8 text-center mt-12">
          <h3 className="text-2xl font-bold mb-3">Ready for your dream vacation?</h3>
          <p className="text-gray-700 mb-6">Book now to secure your dates</p>
          <Link 
            href="/booking" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            tabIndex={0}
            aria-label="Book your stay now"
          >
            Book Your Stay
          </Link>
        </div>
      </div>
    </div>
  );
} 