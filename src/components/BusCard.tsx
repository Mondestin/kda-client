import React from 'react';
import { ChevronDown, Wifi, Power, Coffee, Snowflake, Tv, Accessibility } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BusCardProps {
  company: string;
  price: number;
  departureTime: string;
  arrivalTime: string;
  from: string;
  to: string;
  duration: string;
  distance: string;
  transfers: number;
  onSelect: () => void;
}

function BusCard({
  company,
  price,
  departureTime,
  arrivalTime,
  from,
  to,
  duration,
  distance,
  transfers,
  onSelect
}: BusCardProps) {
  const navigate = useNavigate();

  const handleSelect = () => {
    onSelect();
    navigate('/route-details', {
      state: {
        route: {
          company,
          price,
          departureTime,
          arrivalTime,
          from,
          to,
          duration,
          transfers
        }
      }
    });
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="text-xs text-orange-600 font-medium mb-2">Alternative route</div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-bold text-green-500">{company}</div>
          <div className="text-2xl font-bold">€{price}</div>
        </div>

        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-4">
            <div className="text-xl font-bold">{departureTime}</div>
            <div className="text-sm text-gray-600 truncate">{from}</div>
          </div>

          <div className="col-span-4 flex flex-col items-center">
            <div className="text-sm text-gray-500">{duration}</div>
            <div className="w-full h-0.5 bg-gray-200 relative">
              <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-gray-400" />
              <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-gray-400" />
            </div>
            <div className="text-xs text-orange-600">{distance}</div>
          </div>

          <div className="col-span-4">
            <div className="text-xl font-bold">{arrivalTime}</div>
            <div className="text-sm text-gray-600 truncate">{to}</div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4 flex-1">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-sm text-gray-500">
              <span>{transfers} Transfers</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>

            {/* Centered Amenities Section */}
            <div className="flex-1 flex items-center justify-center gap-3">
              <div className="group relative">
                <Wifi className="h-4 w-4 text-green-500" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Free WiFi
                </div>
              </div>

              <div className="group relative">
                <Power className="h-4 w-4 text-green-500" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Power outlets
                </div>
              </div>

              <div className="group relative">
                <Coffee className="h-4 w-4 text-green-500" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Snacks & drinks
                </div>
              </div>

              <div className="group relative">
                <Snowflake className="h-4 w-4 text-green-500" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Air conditioning
                </div>
              </div>

              <div className="group relative">
                <Tv className="h-4 w-4 text-green-500" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Entertainment system
                </div>
              </div>

              <div className="group relative">
                <Accessibility className="h-4 w-4 text-green-500" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Wheelchair accessible
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600 ml-auto">
              <span className="mr-1">👤</span> 1 • One-way
            </div>
          </div>

          <button
            onClick={handleSelect}
            className="ml-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 bg-accent hover:bg-accent/90"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}

export default BusCard;