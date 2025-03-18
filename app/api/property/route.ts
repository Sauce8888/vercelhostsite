import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Will initialize Supabase client only at runtime
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase credentials not available");
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

export async function GET(request: Request) {
  try {
    // Only initialize client when function is actually called
    const supabase = getSupabaseClient();
    
    const propertyId = process.env.NEXT_PUBLIC_PROPERTY_ID;
    
    // Placeholder response - in a real app this would fetch from Supabase
    return NextResponse.json({
      id: propertyId || "sample-property-123",
      title: "Luxurious Beachfront Villa",
      description: "Experience paradise in this stunning beachfront villa with panoramic ocean views. Perfect for families or groups seeking a luxurious getaway.",
      location: "Malibu, California",
      price: 299,
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
      images: [
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"
      ],
      amenities: [
        { name: "Wifi", icon: "wifi" },
        { name: "Air Conditioning", icon: "wind" },
        { name: "Kitchen", icon: "utensils" },
        { name: "Free Parking", icon: "car" },
        { name: "Pool", icon: "droplet" },
        { name: "TV", icon: "tv" },
        { name: "Washer", icon: "refresh-cw" },
        { name: "Beachfront", icon: "umbrella" }
      ],
      rating: 4.9,
      reviewCount: 124
    });
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json(
      { error: "Failed to fetch property details" },
      { status: 500 }
    );
  }
} 