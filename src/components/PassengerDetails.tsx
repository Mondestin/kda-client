import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Share2, Info } from 'lucide-react';

function PassengerDetails() {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+33');
  const [dateOfBirth, setDateOfBirth] = useState({ day: '', month: '', year: '' });
  const [country, setCountry] = useState('France');
  const [createAccount, setCreateAccount] = useState(false);

  const location = useLocation();
  const { route } = location.state || {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Sign Up */}
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Quick sign up</h2>
                  <p className="text-gray-600">Skip filling in all your details by signing up through Facebook or Google</p>
                </div>
                <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=200&h=200&q=80" alt="Illustration" className="w-32 h-32 object-cover rounded-lg" />
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <span className="text-blue-600">f</span>
                  Sign up with Facebook
                </button>
                <button className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <span className="text-red-500">G</span>
                  Sign up with Google
                </button>
              </div>
            </div>

            {/* Main Passenger Form */}
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-md">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-900">Main passenger</h2>
                <span className="text-sm text-gray-500 uppercase">Adult</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="We'll send your tickets here"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <div className="w-1/4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <select
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Mr">Mr</option>
                      <option value="Mrs/Ms">Mrs/Ms</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First name *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last name *
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone number *
                    </label>
                    <div className="flex gap-3">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="+33">+33</option>
                        <option value="+44">+44</option>
                        <option value="+49">+49</option>
                      </select>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of birth *
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="MM"
                        value={dateOfBirth.month}
                        onChange={(e) => setDateOfBirth({ ...dateOfBirth, month: e.target.value })}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        maxLength={2}
                        required
                      />
                      <input
                        type="text"
                        placeholder="DD"
                        value={dateOfBirth.day}
                        onChange={(e) => setDateOfBirth({ ...dateOfBirth, day: e.target.value })}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        maxLength={2}
                        required
                      />
                      <input
                        type="text"
                        placeholder="YYYY"
                        value={dateOfBirth.year}
                        onChange={(e) => setDateOfBirth({ ...dateOfBirth, year: e.target.value })}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country/region of residence *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 p-6 bg-blue-50 rounded-lg">
                  <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <p className="text-sm text-blue-700">
                    Your data is safe with us. Want to know more about how we use it?{' '}
                    <a href="#" className="underline">Click here.</a>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      checked={createAccount}
                      onChange={(e) => setCreateAccount(e.target.checked)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                  </div>
                  <span className="text-sm text-gray-700">
                    Create an account for faster booking.{' '}
                    <a href="#" className="text-red-500">See benefits</a>
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-500 text-white font-semibold py-4 px-8 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Continue to payment
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            {/* Journey Details */}
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium text-blue-500">OUTBOUND</span>
              </div>
              <p className="text-sm text-gray-600">
                {route?.departureTime} – {route?.arrivalTime}
              </p>
              <p className="font-medium">
                {route?.from} – {route?.to}
              </p>
              <p className="text-green-600 font-medium mt-1">{route?.company}</p>
              <p className="text-sm text-gray-500 mt-2">
                {route?.duration} · {route?.transfers} transfer
              </p>
            </div>

            {/* Share Journey */}
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-md">
              <h3 className="font-semibold text-lg mb-2">Travelling with someone?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Share your journey details with them now.
              </p>
              <button className="text-red-500 font-medium text-sm hover:text-red-600 flex items-center gap-2 transition-colors">
                Share ticket details
                <Share2 className="h-4 w-4" />
              </button>
            </div>

            {/* Price Summary */}
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-md">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">1 passenger</span>
                <span className="font-medium">Tickets × 1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Service fee</span>
                <span>€0.70</span>
              </div>
              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <div>
                  <span className="text-gray-600">Total</span>
                  <span className="text-xs text-gray-500 block">(taxes included)</span>
                </div>
                <span className="text-xl font-bold">€{(route?.price + 0.70).toFixed(2)}</span>
              </div>
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-500 text-center px-4">
              By continuing, you agree to our{' '}
              <a href="#" className="underline">Terms of use</a>{' '}
              and{' '}
              <a href="#" className="underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PassengerDetails;