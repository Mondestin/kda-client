import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Bus, Train, Plane } from 'lucide-react';
import SearchResults from './components/SearchResults';
import SearchForm from './components/SearchForm';
import RouteDetails from './components/RouteDetails';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import TypedText from './components/TypedText';
import PassengerDetails from './components/PassengerDetails';
import Profile from './components/Profile';

export const cityCoordinates: { [key: string]: [number, number] } = {
  'Paris': [2.3522, 48.8566],
  'London': [-0.1276, 51.5074],
  'Berlin': [13.4050, 52.5200],
  'Rome': [12.4964, 41.9028],
  'Madrid': [-3.7038, 40.4168],
  'Amsterdam': [4.9041, 52.3676],
  'Brussels': [4.3517, 50.8503],
  'Vienna': [16.3738, 48.2082],
  'Prague': [14.4378, 50.0755],
  'Barcelona': [2.1734, 41.3851],
  'Milan': [9.1900, 45.4642],
  'Munich': [11.5820, 48.1351],
  'Copenhagen': [12.5683, 55.6761],
  'Stockholm': [18.0686, 59.3293],
  'Oslo': [10.7522, 59.9139]
};

function LandingPage() {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    navigate('/search', { 
      state: { 
        fromLocation, 
        toLocation, 
        date 
      } 
    });
  };

  return (
    <div className="relative min-h-screen">
      {/* Hero Section with background image */}
      <div 
        className="relative h-[600px] overflow-hidden z-20"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1513862153653-f8b7324e1779?auto=format&fit=crop&w=2000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Photo Grid Section */}
        <div className="absolute inset-0 flex justify-end p-4">
          <div className="grid grid-cols-2 gap-4 w-2/5">
            {/* Left Column - Moving Up */}
            <div className="space-y-4 animate-slideUp">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=300&q=80"
                  alt="European Architecture"
                  className="w-full h-28 rounded-lg object-cover shadow-lg"
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?auto=format&fit=crop&w=300&q=80"
                  alt="London Bridge"
                  className="w-full h-28 rounded-lg object-cover shadow-lg"
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1534313314376-a72289b6181e?auto=format&fit=crop&w=300&q=80"
                  alt="Amsterdam Canals"
                  className="w-full h-28 rounded-lg object-cover shadow-lg"
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1601749680454-30a864002a87?auto=format&fit=crop&w=300&q=80"
                  alt="Prague Castle"
                  className="w-full h-28 rounded-lg object-cover shadow-lg"
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1541343672885-9be56236302a?auto=format&fit=crop&w=300&q=80"
                  alt="Barcelona Architecture"
                  className="w-full h-28 rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>

            {/* Right Column - Moving Down */}
            <div className="space-y-4 animate-slideDown">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=300&q=80"
                  alt="Paris Streets"
                  className="w-full h-28 rounded-lg object-cover shadow-lg"
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=300&q=80"
                  alt="Rome Colosseum"
                  className="w-full h-28 rounded-lg object-cover shadow-lg"
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?auto=format&fit=crop&w=300&q=80"
                  alt="Berlin Architecture"
                  className="w-full h-28 rounded-lg object-cover shadow-lg"
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=300&q=80"
                  alt="Vienna Opera House"
                  className="w-full h-28 rounded-lg object-cover shadow-lg"
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=300&q=80"
                  alt="Stockholm Old Town"
                  className="w-full h-28 rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center mt-28">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <TypedText />
            </h1>
            <p className="mt-2 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-3 md:text-xl md:max-w-3xl">
              Find the best bus and train routes across Europe. Compare prices, book tickets, and start your journey.
            </p>
          </div>

          <div className="mt-12 mb-16">
            <SearchForm
              fromLocation={fromLocation}
              toLocation={toLocation}
              date={date}
              onFromLocationChange={setFromLocation}
              onToLocationChange={setToLocation}
              onDateChange={setDate}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>

      {/* Features Section with lower z-index */}
      <div className="py-16 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why Choose TravelEase?
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative group">
              <div className="relative p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-red-100 rounded-md">
                    <Bus className="h-6 w-6 text-red-500" />
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Bus Routes
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Extensive network of bus routes connecting major European cities at affordable prices.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-red-100 rounded-md">
                    <Train className="h-6 w-6 text-red-500" />
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Train Connections
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Fast and comfortable train services with multiple daily departures.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-red-100 rounded-md">
                    <Plane className="h-6 w-6 text-red-500" />
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Easy Booking
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Simple and secure booking process with instant confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/route-details" element={<RouteDetails />} />
            <Route path="/passenger-details" element={<PassengerDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;