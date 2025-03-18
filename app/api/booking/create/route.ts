import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// Will initialize Supabase client only at runtime
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase credentials not available");
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

// Will initialize Stripe only at runtime
function getStripeClient() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  
  if (!stripeKey) {
    throw new Error("Stripe key not available");
  }
  
  return new Stripe(stripeKey, {
    apiVersion: "2025-02-24.acacia", // Use the latest API version
  });
}

export async function POST(request: Request) {
  try {
    // Only initialize clients when function is actually called
    const supabase = getSupabaseClient();
    const stripe = getStripeClient();
    
    const body = await request.json();
    const { 
      checkIn, 
      checkOut, 
      guests, 
      name, 
      email, 
      phone, 
      specialRequests, 
      paymentMethodId 
    } = body;
    
    const propertyId = process.env.NEXT_PUBLIC_PROPERTY_ID;

    // Validate required fields
    if (!checkIn || !checkOut || !guests || !name || !email || !phone || !paymentMethodId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a real app, check availability first
    // const { data: availabilityData } = await supabase
    //   .from('bookings')
    //   .select('*')
    //   .eq('property_id', propertyId)
    //   .or(`start_date.lte.${checkOut},end_date.gte.${checkIn}`);
    
    // if (availabilityData && availabilityData.length > 0) {
    //   return NextResponse.json(
    //     { error: "Property is not available for the selected dates" },
    //     { status: 400 }
    //   );
    // }

    // Calculate booking price (in a real app, this would be more sophisticated)
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nightsCount = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const basePrice = 299;
    const cleaningFee = 85;
    const serviceFee = 120;
    const totalAmount = basePrice * nightsCount + cleaningFee + serviceFee;

    // Create a Stripe payment (in a real app)
    // const payment = await stripe.paymentIntents.create({
    //   amount: Math.round(totalAmount * 100), // Convert to cents
    //   currency: "usd",
    //   payment_method: paymentMethodId,
    //   confirm: true,
    //   description: `Booking for ${propertyId}`,
    //   receipt_email: email,
    // });

    // Create booking in database (in a real app)
    // const { data, error } = await supabase
    //   .from('bookings')
    //   .insert([{
    //     property_id: propertyId,
    //     start_date: checkIn,
    //     end_date: checkOut,
    //     guests: guests,
    //     guest_name: name,
    //     guest_email: email,
    //     guest_phone: phone,
    //     special_requests: specialRequests,
    //     payment_id: payment.id,
    //     total_amount: totalAmount,
    //     status: 'confirmed'
    //   }])
    //   .select();
    
    // if (error) throw error;

    // For demo purposes, just return a successful response
    return NextResponse.json({ 
      success: true,
      bookingId: "BH" + Math.floor(100000 + Math.random() * 900000),
      totalAmount: totalAmount,
      checkIn: checkIn,
      checkOut: checkOut,
      guests: guests,
      message: "Booking created successfully"
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
} 