import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const propertyId = process.env.NEXT_PUBLIC_PROPERTY_ID;

    // In a real app, this would fetch from the database
    // const { data, error } = await supabase
    //   .from('properties')
    //   .select('*')
    //   .eq('id', propertyId)
    //   .single();
    
    // if (error) throw error;
    // if (!data) throw new Error('Property not found');

    // For demo purposes, return hardcoded property data
    return NextResponse.json({
      id: propertyId || "prop_123",
      name: "Beach House Retreat",
      description: "Welcome to our beautiful beach house retreat, nestled right on the shoreline with stunning ocean views. This spacious, modern property features 3 bedrooms, 2 bathrooms, and can comfortably accommodate up to 6 guests.",
      longDescription: "Enjoy your morning coffee on the private deck overlooking the ocean, take a short walk to the beach, or relax in the hot tub under the stars. Perfect for family vacations, romantic getaways, or a weekend escape with friends.",
      location: {
        address: "123 Oceanview Drive",
        city: "Beachside",
        state: "CA",
        zipCode: "90210",
        country: "United States",
        latitude: 34.0522,
        longitude: -118.2437,
      },
      images: [
        {
          id: 1,
          url: "/images/property-hero.jpg",
          alt: "Beach House Exterior",
        },
        {
          id: 2,
          url: "/images/living-room.jpg",
          alt: "Living Room",
        },
        {
          id: 3,
          url: "/images/kitchen.jpg",
          alt: "Modern Kitchen",
        },
        {
          id: 4,
          url: "/images/bedroom.jpg",
          alt: "Master Bedroom",
        },
        {
          id: 5,
          url: "/images/deck.jpg",
          alt: "Ocean View Deck",
        },
      ],
      amenities: [
        { id: 1, name: "Private pool", icon: "pool" },
        { id: 2, name: "Fireplace", icon: "fire" },
        { id: 3, name: "High-speed WiFi", icon: "wifi" },
        { id: 4, name: "Free parking", icon: "car" },
        { id: 5, name: "Hot tub", icon: "hot-tub" },
        { id: 6, name: "Washer & dryer", icon: "laundry" },
        { id: 7, name: "Air conditioning", icon: "snowflake" },
        { id: 8, name: "Coffee maker", icon: "coffee" },
        { id: 9, name: "Grill", icon: "grill" },
        { id: 10, name: "Beach access", icon: "beach" },
      ],
      host: {
        id: "host_123",
        name: "Sarah Johnson",
        since: "2019",
        avatar: "/images/host-avatar.jpg",
        bio: "Hi! I'm Sarah, and I love sharing my beach house with guests from around the world. I'm always available to answer questions and provide recommendations for local attractions.",
        responseRate: 98,
        responseTime: "within an hour",
      },
      pricing: {
        basePrice: 299,
        cleaningFee: 85,
        serviceFee: 120,
        minNights: 2,
        maxNights: 14,
      },
      reviews: [
        {
          id: "rev_1",
          guestName: "Michael T.",
          date: "October 2023",
          rating: 5,
          comment: "Amazing property with stunning views! Everything was clean and well-maintained. We especially loved the hot tub and proximity to the beach. Would definitely stay again.",
        },
        {
          id: "rev_2",
          guestName: "Jennifer L.",
          date: "September 2023",
          rating: 5,
          comment: "Perfect getaway for our family vacation. The house had everything we needed and Sarah was a wonderful host. The kids loved being so close to the beach!",
        },
        {
          id: "rev_3",
          guestName: "David R.",
          date: "August 2023",
          rating: 4,
          comment: "Great location and beautiful property. The only minor issue was that the WiFi was a bit slow, but we were there to disconnect anyway. Sarah was very responsive to our questions.",
        },
      ],
      averageRating: 4.8,
      reviewCount: 43,
    });
  } catch (error) {
    console.error("Error fetching property details:", error);
    return NextResponse.json(
      { error: "Failed to fetch property details" },
      { status: 500 }
    );
  }
} 