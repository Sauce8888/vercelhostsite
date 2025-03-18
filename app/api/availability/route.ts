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
    
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const propertyId = process.env.NEXT_PUBLIC_PROPERTY_ID;

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "Missing required parameters: startDate and endDate" },
        { status: 400 }
      );
    }

    // For demo purposes, return availability for all dates
    // In a real app, this would query the database
    
    // Simulate a booked date in the middle
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 2);
    
    // Sample booked dates
    const bookedDates = [
      tomorrow.toISOString().split('T')[0]
    ];

    // Return available and booked dates
    return NextResponse.json({
      propertyId,
      startDate,
      endDate,
      bookedDates,
      available: true
    });
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
} 