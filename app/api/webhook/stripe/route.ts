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
    apiVersion: "2025-02-24.acacia"
  });
}

export async function POST(request: Request) {
  try {
    // Only initialize clients when function is actually called
    const supabase = getSupabaseClient();
    const stripe = getStripeClient();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      throw new Error("Stripe webhook secret not available");
    }
    
    const body = await request.text();
    const signature = request.headers.get("stripe-signature") || "";

    // This would verify the webhook in a real application
    // let event;
    // try {
    //   event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    // } catch (err: any) {
    //   return NextResponse.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 });
    // }

    // For demo purposes, assume we received a valid payment_intent.succeeded event
    const event = {
      type: "payment_intent.succeeded",
      data: {
        object: {
          id: "pi_" + Math.random().toString(36).substring(2, 15),
          amount: 170000, // $1,700.00
          metadata: {
            bookingId: "BH" + Math.floor(100000 + Math.random() * 900000),
          },
        },
      },
    };

    // Handle different event types
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log(`Payment succeeded: ${paymentIntent.id}`);
        
        // In a real app, update the booking status in the database
        // const bookingId = paymentIntent.metadata.bookingId;
        // const { error } = await supabase
        //   .from('bookings')
        //   .update({ status: 'confirmed', payment_status: 'paid' })
        //   .eq('id', bookingId);
        
        // if (error) throw error;
        
        // Optional: Send confirmation email to guest
        break;
        
      case "payment_intent.payment_failed":
        // Handle failed payment
        // const failedPaymentIntent = event.data.object;
        // console.log(`Payment failed: ${failedPaymentIntent.id}`);
        
        // Update booking status
        // Send notification to guest
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
} 