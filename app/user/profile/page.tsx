"use client";
import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, ShoppingCart, FileText, Settings, Lock, LogOut, Trash2, Edit3, Save, X } from 'lucide-react';
import { toast } from 'sonner';


interface UserDto {
  id: string;
  username: string;
  password: string;
  email: string;
  address: string;
  phone: string;
  purchasedCourseIds: string[];
  orderIds: string[];
}

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserDto | null>(null);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('http://localhost:8080/public/user/api/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setUserData(data);
        setPhone(data.phone || '');
        setAddress(data.address || '');
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setIsEditing(false);
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8080/public/user/api/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ phone, address }),
    });
    if (res.ok) {
      toast.success('Profile updated!');
      setUserData(prev => prev ? { ...prev, phone, address } : prev);
    } else {
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (userData) {
      setPhone(userData.phone || '');
      setAddress(userData.address || '');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!userData) return <div>No user data</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
   
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Profile Management</h1>
                <p className="text-sm text-gray-500">Manage your account information and preferences</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-600 text-white rounded-lg hover:from-green-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancel}
                    className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Panel - Profile Card */}
          <div className="col-span-4">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Profile Header */}
              <div className="bg-[#7AC86B] px-8 py-12 text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <User className="w-16 h-16 text-[#7AC86B]" />
                  </div>
                  <div className="absolute bottom-6 right-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{userData.username}</h2>
                <p className="text-green-100 text-sm font-medium">User</p>
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-white/20 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-white text-sm">Active</span>
                </div>
              </div>

              {/* Profile Stats */}
              <div className="p-8">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <div className="bg-green-50 rounded-xl p-4 mb-3">
                      <ShoppingCart className="w-6 h-6 text-green-600 mx-auto" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{userData.orderIds ? userData.orderIds.length : 0}</div>
                    <div className="text-sm text-gray-500">Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-50 rounded-xl p-4 mb-3">
                      <FileText className="w-6 h-6 text-green-600 mx-auto" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{userData.purchasedCourseIds ? userData.purchasedCourseIds.length : 0}</div>
                    <div className="text-sm text-gray-500">Courses</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <button className="w-full flex items-center px-4 py-3 text-left text-sm font-medium text-green-600 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <User className="w-4 h-4 mr-3" />
                    Personal Information
                  </button>
                  <button className="w-full flex items-center px-4 py-3 text-left text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                    <Lock className="w-4 h-4 mr-3" />
                    Security Settings
                  </button>
                  <button className="w-full flex items-center px-4 py-3 text-left text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                    <Settings className="w-4 h-4 mr-3" />
                    Preferences
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="col-span-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                <p className="text-sm text-gray-500 mt-1">Update your personal details and contact information</p>
              </div>

              <div className="p-8">
                <div className="space-y-8">
                  {/* User ID */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">User ID</label>
                    <input
                      type="text"
                      value={userData.id}
                      disabled
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 text-sm font-medium"
                    />
                  </div>
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Name</label>
                    <input
                      type="text"
                      value={userData.username}
                      disabled
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 text-sm font-medium"
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
                    <input
                      type="email"
                      value={userData.email}
                      disabled
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 text-sm font-medium"
                    />
                  </div>
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-600 text-sm font-medium"
                    />
                  </div>
                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-600 text-sm font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;