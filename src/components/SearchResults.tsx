import React, { useState, useEffect } from 'react';
import { ArrowUpNarrowWide, MapPin, Filter, Bus, Car } from 'lucide-react';
import Map, { Marker, Source, Layer, LineLayer } from 'react-map-gl';
import { useLocation, useNavigate } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import SearchForm from './SearchForm';
import BusCard from './BusCard';
import { cityCoordinates } from '../App';

type TransportationType = 'all' | 'carpool' | 'bus';

interface RouteOption {
  id: string;
  company: string;
  departureTime: string;
  arrivalTime: string;
  from: string;
  to: string;
  duration: string;
  distance: string;
  price: number;
  transfers: number;
  type: TransportationType;
  coordinates: {
    from: [number, number];
    to: [number, number];
  };
}

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic3lkbmV5bW9uZGVzdGluIiwiYSI6ImNtNTdldzJ1azE3bWgybHNnaDVhdm53NXQifQ.x5L6gip1eLQNajQobU9bgw';

const COMPANIES = {
  bus: ['FLIXBUS', 'EUROLINES', 'ALSA'],
  carpool: ['BLABLACAR', 'CARPOOL24', 'RIDESHARE']
};

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [date, setDate] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<RouteOption | null>(null);
  const [allRoutes, setAllRoutes] = useState<RouteOption[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<RouteOption[]>([]);
  const [selectedTransportType, setSelectedTransportType] = useState<TransportationType>('all');

  useEffect(() => {
    const state = location.state as { fromLocation: string; toLocation: string; date: string } | null;
    if (state) {
      setFromLocation(state.fromLocation || '');
      setToLocation(state.toLocation || '');
      setDate(state.date || '');
    }
  }, [location.state]);

  // Generate route options based on selected cities
  const generateRouteOptions = (from: string, to: string): RouteOption[] => {
    if (!from || !to || !cityCoordinates[from] || !cityCoordinates[to]) {
      return [];
    }

    const routes: RouteOption[] = [];
    const times = ['06:00 AM', '09:00 AM', '12:00 PM', '03:00 PM', '06:00 PM'];

    // Generate bus routes
    times.forEach((time, index) => {
      const hoursDuration = Math.floor(Math.random() * 4) + 2;
      const arrivalHour = (parseInt(time.split(':')[0]) + hoursDuration) % 12;
      const arrivalTime = `${arrivalHour === 0 ? 12 : arrivalHour}:00 ${parseInt(time.split(':')[0]) + hoursDuration >= 12 ? 'PM' : 'AM'}`;
      const basePrice = Math.floor(Math.random() * 30) + 30;

      routes.push({
        id: `bus-${index}`,
        company: COMPANIES.bus[Math.floor(Math.random() * COMPANIES.bus.length)],
        departureTime: time,
        arrivalTime: arrivalTime,
        from,
        to,
        duration: `${hoursDuration}h 0m`,
        distance: calculateDistance(cityCoordinates[from], cityCoordinates[to]),
        price: basePrice + (index * 5),
        transfers: 0,
        type: 'bus',
        coordinates: {
          from: cityCoordinates[from],
          to: cityCoordinates[to]
        }
      });
    });

    // Generate carpool routes
    times.slice(0, 3).forEach((time, index) => {
      const hoursDuration = Math.floor(Math.random() * 3) + 3;
      const arrivalHour = (parseInt(time.split(':')[0]) + hoursDuration) % 12;
      const arrivalTime = `${arrivalHour === 0 ? 12 : arrivalHour}:00 ${parseInt(time.split(':')[0]) + hoursDuration >= 12 ? 'PM' : 'AM'}`;
      const basePrice = Math.floor(Math.random() * 20) + 20;

      routes.push({
        id: `carpool-${index}`,
        company: COMPANIES.carpool[Math.floor(Math.random() * COMPANIES.carpool.length)],
        departureTime: time,
        arrivalTime: arrivalTime,
        from,
        to,
        duration: `${hoursDuration}h 0m`,
        distance: calculateDistance(cityCoordinates[from], cityCoordinates[to]),
        price: basePrice + (index * 3),
        transfers: 0,
        type: 'carpool',
        coordinates: {
          from: cityCoordinates[from],
          to: cityCoordinates[to]
        }
      });
    });

    return routes;
  };

  useEffect(() => {
    if (fromLocation && toLocation) {
      const options = generateRouteOptions(fromLocation, toLocation);
      setAllRoutes(options);
      filterRoutes(options, selectedTransportType);
    }
  }, [fromLocation, toLocation]);

  const filterRoutes = (routes: RouteOption[], type: TransportationType) => {
    let filtered = routes;
    if (type !== 'all') {
      filtered = routes.filter(route => route.type === type);
    }
    setFilteredRoutes(filtered);
    if (filtered.length > 0) {
      setSelectedRoute(filtered[0]);
    }
  };

  const handleTransportTypeChange = (type: TransportationType) => {
    setSelectedTransportType(type);
    filterRoutes(allRoutes, type);
  };

  const handleSearch = () => {
    if (fromLocation && toLocation) {
      const options = generateRouteOptions(fromLocation, toLocation);
      setAllRoutes(options);
      filterRoutes(options, selectedTransportType);
    }
  };

  const handleLocationChange = (newFrom: string, newTo: string, newDate: string) => {
    setFromLocation(newFrom);
    setToLocation(newTo);
    setDate(newDate);
  };

  // Calculate distance between two coordinates in km
  function calculateDistance(from: [number, number], to: [number, number]): string {
    const R = 6371;
    const dLat = (to[1] - from[1]) * Math.PI / 180;
    const dLon = (to[0] - from[0]) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(from[1] * Math.PI / 180) * Math.cos(to[1] * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return `${Math.round(distance)} km`;
  }

  const routeLayer: LineLayer = {
    id: 'route',
    type: 'line',
    paint: {
      'line-color': '#007cbf',
      'line-width': 3
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <SearchForm
            fromLocation={fromLocation}
            toLocation={toLocation}
            date={date}
            onFromLocationChange={(value) => handleLocationChange(value, toLocation, date)}
            onToLocationChange={(value) => handleLocationChange(fromLocation, value, date)}
            onDateChange={(value) => handleLocationChange(fromLocation, toLocation, value)}
            onSearch={handleSearch}
          />
        </div>

        {/* Transportation Tabs */}
        <div className="bg-white rounded-full shadow-sm mb-6 p-1">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => handleTransportTypeChange('all')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-full text-gray-900 hover:bg-gray-50 font-medium ${
                selectedTransportType === 'all' ? 'bg-red-50 text-red-600' : ''
              }`}
            >
              <span className={selectedTransportType === 'all' ? 'text-red-600' : 'text-gray-400'}>Tout</span>
              <span className={selectedTransportType === 'all' ? 'text-red-600' : 'text-gray-900'}>· {allRoutes.length}</span>
            </button>
            <button 
              onClick={() => handleTransportTypeChange('carpool')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-full text-gray-900 hover:bg-gray-50 font-medium ${
                selectedTransportType === 'carpool' ? 'bg-red-50 text-red-600' : ''
              }`}
            >
              <Car className={`h-5 w-5 ${selectedTransportType === 'carpool' ? 'text-red-600' : 'text-gray-400'}`} />
              <span className={selectedTransportType === 'carpool' ? 'text-red-600' : 'text-gray-400'}>Covoiturage</span>
              <span className={selectedTransportType === 'carpool' ? 'text-red-600' : 'text-gray-900'}>
                · {allRoutes.filter(r => r.type === 'carpool').length}
              </span>
            </button>
            <button 
              onClick={() => handleTransportTypeChange('bus')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-full text-gray-900 hover:bg-gray-50 font-medium ${
                selectedTransportType === 'bus' ? 'bg-red-50 text-red-600' : ''
              }`}
            >
              <Bus className={`h-5 w-5 ${selectedTransportType === 'bus' ? 'text-red-600' : 'text-gray-400'}`} />
              <span className={selectedTransportType === 'bus' ? 'text-red-600' : 'text-gray-400'}>Bus</span>
              <span className={selectedTransportType === 'bus' ? 'text-red-600' : 'text-gray-900'}>
                · {allRoutes.filter(r => r.type === 'bus').length}
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left side - Route list */}
          <div className="flex-1">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h1 className="text-xl font-semibold mb-4">
                {filteredRoutes.length > 0 
                  ? `${filteredRoutes.length} routes found from ${fromLocation} to ${toLocation}`
                  : 'No routes found'}
              </h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <button className="flex items-center space-x-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                  <ArrowUpNarrowWide className="h-4 w-4" />
                  <span>Sort: Departure time</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                  <MapPin className="h-4 w-4" />
                  <span>Stops</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                  <span>Price</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  <span>Show all filters</span>
                </button>
              </div>

              <div className="space-y-4">
                {filteredRoutes.map((route) => (
                  <BusCard
                    key={route.id}
                    company={route.company}
                    price={route.price}
                    departureTime={route.departureTime}
                    arrivalTime={route.arrivalTime}
                    from={route.from}
                    to={route.to}
                    duration={route.duration}
                    distance={route.distance}
                    transfers={route.transfers}
                    onSelect={() => setSelectedRoute(route)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Map */}
          <div className="hidden lg:block w-[400px]">
            <div className="sticky top-20" style={{ height: 'calc(100vh - 84px)' }}>
              <div className="bg-white rounded-lg overflow-hidden h-full">
                {selectedRoute && (
                  <Map
                    mapboxAccessToken={MAPBOX_TOKEN}
                    initialViewState={{
                      longitude: (selectedRoute.coordinates.from[0] + selectedRoute.coordinates.to[0]) / 2,
                      latitude: (selectedRoute.coordinates.from[1] + selectedRoute.coordinates.to[1]) / 2,
                      zoom: 5
                    }}
                    style={{ width: '100%', height: '100%' }}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                  >
                    <Marker
                      longitude={selectedRoute.coordinates.from[0]}
                      latitude={selectedRoute.coordinates.from[1]}
                      color="#22c55e"
                    />
                    <Marker
                      longitude={selectedRoute.coordinates.to[0]}
                      latitude={selectedRoute.coordinates.to[1]}
                      color="#ef4444"
                    />
                    <Source
                      type="geojson"
                      data={{
                        type: 'Feature',
                        properties: {},
                        geometry: {
                          type: 'LineString',
                          coordinates: [
                            selectedRoute.coordinates.from,
                            selectedRoute.coordinates.to
                          ]
                        }
                      }}
                    >
                      <Layer {...routeLayer} />
                    </Source>
                  </Map>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;