import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const propertyId = process.env.NEXT_PUBLIC_PROPERTY_ID;

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "Start date and end date are required" },
        { status: 400 }
      );
    }

    // In a real app, this would query a bookings table to check availability
    // For now, we'll simulate a response
    
    // This would be your actual query to check overlapping bookings
    // const { data, error } = await supabase
    //   .from('bookings')
    //   .select('*')
    //   .eq('property_id', propertyId)
    //   .or(`start_date.lte.${endDate},end_date.gte.${startDate}`);
    
    // if (error) throw error;
    
    // const isAvailable = data.length === 0;

    // For demo purposes, just return some sample data
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);
    
    // Generate dates for the next 60 days
    const datesArray = [];
    for (let i = 0; i < 60; i++) {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);
      
      // Make some random dates unavailable
      const isAvailable = Math.random() > 0.2; // 20% chance of being unavailable
      const formattedDate = currentDate.toISOString().split('T')[0];
      
      // Generate a random price with some variation
      const basePrice = 299;
      const variation = Math.floor(Math.random() * 50) - 25; // -25 to +25
      const price = basePrice + variation;
      
      datesArray.push({
        date: formattedDate,
        available: isAvailable,
        price: isAvailable ? price : null,
      });
    }

    return NextResponse.json({ 
      available: true, // Overall availability for the range
      dates: datesArray,
      basePricePerNight: 299,
      cleaningFee: 85,
      serviceFee: 120
    });
  } catch (error) {
    console.error("Error checking availability:", error);
    return NextResponse.json(
      { error: "Failed to check availability" },
      { status: 500 }
    );
  }
} 