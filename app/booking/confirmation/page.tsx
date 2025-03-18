import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";

export default function BookingConfirmationPage() {
  // In a real app, this would fetch the booking details from the database
  const bookingDetails = {
    bookingId: "BH" + Math.floor(100000 + Math.random() * 900000),
    propertyName: "Beach House Retreat",
    checkIn: "2023-07-15",
    checkOut: "2023-07-20",
    guests: 2,
    totalAmount: "$1,700",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link 
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to property
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">Your reservation has been successfully confirmed.</p>
          
          <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h2 className="text-lg font-semibold mb-4 text-center">Booking Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-medium">{bookingDetails.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Property:</span>
                <span>{bookingDetails.propertyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in:</span>
                <span>{bookingDetails.checkIn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out:</span>
                <span>{bookingDetails.checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guests:</span>
                <span>{bookingDetails.guests}</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="text-gray-600 font-medium">Total amount:</span>
                <span className="font-medium">{bookingDetails.totalAmount}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            We've sent a confirmation email with all the details to your email address.
            If you have any questions, please contact us.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Back to property
            </Link>
            <button
              className="border border-gray-300 bg-white text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Download receipt
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4">What's next?</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Check-in instructions</h3>
              <p className="text-gray-600 text-sm">
                You'll receive detailed check-in instructions 2 days before your arrival.
                The property features a keyless entry system with a code that will be provided.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">House rules</h3>
              <p className="text-gray-600 text-sm">
                Check-in time is 3:00 PM - 8:00 PM. Check-out time is 11:00 AM.
                No smoking, parties, or pets allowed. Please be respectful of neighbors.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Need to make changes?</h3>
              <p className="text-gray-600 text-sm">
                You can modify or cancel your booking up to 5 days before your check-in date.
                Please contact us if you need to make any changes to your reservation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 