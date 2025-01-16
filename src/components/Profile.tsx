import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Camera, Download, Save, X } from 'lucide-react';
import { DatePickerDemo } from './DatePickerDemo';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  profileImage: string;
}

interface Trip {
  id: string;
  date: string;
  from: string;
  to: string;
  company: string;
  price: string;
  status: 'Completed' | 'Upcoming' | 'Cancelled';
  ticketNumber: string;
}

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+33 6 12 34 56 78',
    dateOfBirth: '1990-05-15',
    address: 'Paris, France',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });

  const [trips] = useState<Trip[]>([
    {
      id: '1',
      date: '2024-03-15',
      from: 'Paris',
      to: 'London',
      company: 'FLIXBUS',
      price: '€45',
      status: 'Upcoming',
      ticketNumber: 'TK123456'
    },
    {
      id: '2',
      date: '2024-02-28',
      from: 'London',
      to: 'Berlin',
      company: 'FLIXBUS',
      price: '€65',
      status: 'Completed',
      ticketNumber: 'TK123457'
    },
    {
      id: '3',
      date: '2024-02-14',
      from: 'Berlin',
      to: 'Prague',
      company: 'FLIXBUS',
      price: '€35',
      status: 'Cancelled',
      ticketNumber: 'TK123458'
    }
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the changes to a backend
    console.log('Saving user info:', userInfo);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset any unsaved changes
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo(prev => ({
          ...prev,
          profileImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadHistory = () => {
    // Here you would typically generate and download a PDF or CSV of the trip history
    console.log('Downloading trip history');
    const csvContent = trips
      .map(trip => 
        `${trip.date},${trip.from},${trip.to},${trip.company},${trip.price},${trip.status}`
      )
      .join('\n');
    
    const blob = new Blob([`Date,From,To,Company,Price,Status\n${csvContent}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trip-history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadTicket = (ticketNumber: string) => {
    // Here you would typically download the ticket PDF
    console.log('Downloading ticket:', ticketNumber);
    alert(`Downloading ticket ${ticketNumber}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* User Info Card */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Image */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <img
                    src={userInfo.profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer">
                      <Camera className="h-5 w-5 text-gray-600" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* User Details */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  ) : (
                    <div className="mt-1 flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-900">{userInfo.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  ) : (
                    <div className="mt-1 flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-900">{userInfo.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  ) : (
                    <div className="mt-1 flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-900">{userInfo.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  {isEditing ? (
                    <div className="mt-1">
                      <DatePickerDemo
                        date={userInfo.dateOfBirth}
                        onDateChange={(date) => setUserInfo(prev => ({ ...prev, dateOfBirth: date }))}
                      />
                    </div>
                  ) : (
                    <div className="mt-1 flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-900">{new Date(userInfo.dateOfBirth).toLocaleDateString('fr-FR')}</span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.address}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, address: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  ) : (
                    <div className="mt-1 flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-900">{userInfo.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trips Card */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Your Trips</h2>
              <button
                onClick={handleDownloadHistory}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download History
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-200">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-200">From</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-200">To</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-200">Company</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-200">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-200">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-200">Ticket</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {trips.map((trip, index) => (
                    <tr 
                      key={trip.id} 
                      className={`${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      } hover:bg-gray-100 transition-colors`}
                    >
                      <td className="px-4 py-4 text-sm text-gray-900 border-x border-gray-200">{trip.date}</td>
                      <td className="px-4 py-4 text-sm text-gray-900 border-x border-gray-200">{trip.from}</td>
                      <td className="px-4 py-4 text-sm text-gray-900 border-x border-gray-200">{trip.to}</td>
                      <td className="px-4 py-4 text-sm text-gray-900 border-x border-gray-200">{trip.company}</td>
                      <td className="px-4 py-4 text-sm text-gray-900 border-x border-gray-200">{trip.price}</td>
                      <td className="px-4 py-4 text-sm border-x border-gray-200">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          trip.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          trip.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {trip.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm border-x border-gray-200">
                        {trip.status !== 'Cancelled' && (
                          <button
                            onClick={() => handleDownloadTicket(trip.ticketNumber)}
                            className="flex items-center gap-1 text-red-500 hover:text-red-600"
                          >
                            <Download className="h-4 w-4" />
                            Ticket
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;