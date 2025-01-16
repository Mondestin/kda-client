import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight, MapPin } from 'lucide-react';
import { cityCoordinates } from '../App';
import { DatePickerDemo } from './DatePickerDemo';

interface SearchFormProps {
  fromLocation: string;
  toLocation: string;
  date: string;
  onFromLocationChange: (value: string) => void;
  onToLocationChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onSearch: () => void;
}

interface ValidationErrors {
  from: boolean;
  to: boolean;
  date: boolean;
}

function SearchForm({
  fromLocation,
  toLocation,
  date,
  onFromLocationChange,
  onToLocationChange,
  onDateChange,
  onSearch
}: SearchFormProps) {
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({
    from: false,
    to: false,
    date: false
  });
  
  const fromInputRef = useRef<HTMLDivElement>(null);
  const toInputRef = useRef<HTMLDivElement>(null);

  const cities = Object.keys(cityCoordinates);

  const filteredFromCities = cities.filter(city => 
    city.toLowerCase().includes(fromLocation.toLowerCase()) && 
    city.toLowerCase() !== fromLocation.toLowerCase()
  );

  const filteredToCities = cities.filter(city => 
    city.toLowerCase().includes(toLocation.toLowerCase()) && 
    city.toLowerCase() !== toLocation.toLowerCase()
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fromInputRef.current && !fromInputRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false);
      }
      if (toInputRef.current && !toInputRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {
      from: false,
      to: false,
      date: false
    };
    let isValid = true;

    if (!fromLocation.trim() || !cities.includes(fromLocation)) {
      newErrors.from = true;
      isValid = false;
    }

    if (!toLocation.trim() || !cities.includes(toLocation) || toLocation === fromLocation) {
      newErrors.to = true;
      isValid = false;
    }

    if (!date) {
      newErrors.date = true;
      isValid = false;
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = true;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSearch();
    }
  };

  const handleSwapCities = () => {
    const tempFrom = fromLocation;
    onFromLocationChange(toLocation);
    onToLocationChange(tempFrom);
  };

  return (
    <div className="relative">
      <div className="bg-white shadow-md rounded-lg p-4 max-w-5xl mx-auto">
        <form className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:gap-4" onSubmit={handleSubmit}>
          {/* From Field */}
          <div className="flex-grow relative" ref={fromInputRef}>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="From city"
                value={fromLocation}
                onChange={(e) => {
                  onFromLocationChange(e.target.value);
                  setShowFromSuggestions(true);
                  setErrors(prev => ({ ...prev, from: false }));
                }}
                onFocus={() => {
                  setShowFromSuggestions(true);
                  setErrors(prev => ({ ...prev, from: false }));
                }}
                className={`w-full border ${errors.from ? 'border-red-500' : 'border-gray-300'} rounded-lg pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 hover:border-gray-400 focus:ring ${errors.from ? 'focus:ring-red-200' : 'focus:ring-red-100'} focus:border-red-500 focus:outline-none transition-colors`}
              />
            </div>
            {showFromSuggestions && filteredFromCities.length > 0 && (
              <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                {filteredFromCities.map((city, index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    onClick={() => {
                      onFromLocationChange(city);
                      setShowFromSuggestions(false);
                      setErrors(prev => ({ ...prev, from: false }));
                    }}
                  >
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      {city}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Cities Button */}
          <button
            type="button"
            onClick={handleSwapCities}
            className="hidden md:flex items-center justify-center p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Swap cities"
          >
            <ArrowLeftRight className="h-6 w-6 text-gray-400 hover:text-gray-600" />
          </button>

          {/* To Field */}
          <div className="flex-grow relative" ref={toInputRef}>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="To city"
                value={toLocation}
                onChange={(e) => {
                  onToLocationChange(e.target.value);
                  setShowToSuggestions(true);
                  setErrors(prev => ({ ...prev, to: false }));
                }}
                onFocus={() => {
                  setShowToSuggestions(true);
                  setErrors(prev => ({ ...prev, to: false }));
                }}
                className={`w-full border ${errors.to ? 'border-red-500' : 'border-gray-300'} rounded-lg pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 hover:border-gray-400 focus:ring ${errors.to ? 'focus:ring-red-200' : 'focus:ring-red-100'} focus:border-red-500 focus:outline-none transition-colors`}
              />
            </div>
            {showToSuggestions && filteredToCities.length > 0 && (
              <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                {filteredToCities.map((city, index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    onClick={() => {
                      onToLocationChange(city);
                      setShowToSuggestions(false);
                      setErrors(prev => ({ ...prev, to: false }));
                    }}
                  >
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      {city}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Picker */}
          <div className="flex-grow md:flex-grow-0 md:w-64">
            <DatePickerDemo
              date={date}
              onDateChange={onDateChange}
              error={errors.date}
            />
          </div>

          {/* Search Button */}
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg px-6 py-3 focus:ring focus:ring-red-300 focus:outline-none transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;