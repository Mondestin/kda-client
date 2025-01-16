import React from 'react';
import { Share2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface RouteDetailsProps {
  route?: {
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
    transfers: number;
    company: string;
  };
}

function RouteDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { route } = location.state || {};

  if (!route) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Fare Conditions */}
            <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">Fare conditions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-blue-100 text-blue-600 font-semibold py-2 px-4 rounded-lg border border-blue-300">
                  Standard<br/><span className="text-sm">+€0</span>
                </button>
                <button className="bg-gray-100 text-gray-400 font-semibold py-2 px-4 rounded-lg border border-gray-300">
                  There is only 1 fare available for this journey
                </button>
              </div>
              <h4 className="mt-6 font-semibold text-gray-800 text-sm">Fare terms</h4>
              <p className="text-sm text-gray-500 mt-2">
                Standard<br/>
                Ticket is only valid for the chosen bus/train. Luggage allowance included per traveller: one handbag 
                (max 42 x 30 x 18cm), one piece of cabin luggage (max 80 x 50 x 30cm).<br/><br/>
                Ticket can be cancelled for free up to 30 days before departure. Ticket can be cancelled for a fee of: 
                30% of the original price up to 7 days before departure, 60% of the original price up to 2 days before departure, 
                and 90% of the ticket price up to 15 minutes before departure. Ticket will be refunded as Flixbus voucher and will be 
                valid for 12 months. (Additional fees charged by the provider may apply.)
              </p>
            </div>

            {/* Seat Reservation */}
            <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">Seat reservation</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Seat preferences</p>
                  <p className="font-semibold text-gray-800">No preference</p>
                </div>
                <button className="text-blue-600 font-semibold text-sm hover:underline">
                  Change seating preferences
                </button>
              </div>
              <p className="text-sm text-green-600 mt-4 font-semibold">Included</p>
            </div>

            {/* CTA */}
            <div className="text-center py-4">
              <button 
                onClick={() => navigate('/passenger-details', { state: { route } })}
                className="bg-red-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-red-600 transition-colors"
              >
                Go to passenger details
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Outbound Journey */}
            <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">OUTBOUND</h3>
              <p className="text-sm text-gray-600">Fri, Mar 07 · {route.departureTime} – {route.arrivalTime}</p>
              <p className="text-sm text-gray-800 font-semibold">{route.from} – {route.to}</p>
              <p className="text-sm text-green-600 font-semibold">{route.company}</p>
              <p className="text-sm text-gray-500 mt-4">{route.duration} · {route.transfers} transfer</p>
              <hr className="my-4 border-gray-200"/>
              <div className="space-y-4">
                <div className="flex items-center">
                  <p className="text-sm text-gray-500">{route.departureTime}</p>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-800">{route.from}</p>
                    <p className="text-sm text-gray-500">{route.company}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-500">1:20 PM</p>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-800">Milano, Autostazione Lampugnano</p>
                    <p className="text-sm text-gray-500">Transfer, 1h55m</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-500">3:15 PM</p>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-800">Milano, Autostazione Lampugnano</p>
                    <p className="text-sm text-gray-500">{route.company}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-500">{route.arrivalTime}</p>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-800">{route.to}</p>
                    <p className="text-sm text-gray-500">Your destination</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Traveling with Someone */}
            <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">Traveling with someone?</h3>
              <p className="text-sm text-gray-500 mb-2">
                Share your journey details with them now.
              </p>
              <button className="text-red-500 font-semibold text-sm hover:text-red-600 flex items-center gap-2 transition-colors">
                Share ticket details
                <Share2 className="h-4 w-4" />
              </button>
            </div>

            {/* Total Price */}
            <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-800 font-semibold">1 passenger</p>
                <p className="text-sm text-gray-800 font-semibold">Tickets × 1</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">Total (taxes included)</p>
                <p className="text-xl font-bold text-gray-800">€{route.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RouteDetails;