"use client";
import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingCart,
  FileText,
  Settings,
  Lock,
  LogOut,
  Trash2,
  Edit3,
  Save,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

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
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("https://greprepcoach-service-177259961249.asia-south1.run.app/public/user/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setPhone(data.phone || "");
        setAddress(data.address || "");
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setIsEditing(false);
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://greprepcoach-service-177259961249.asia-south1.run.app/public/user/api/update-profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone, address }),
      }
    );
    if (res.ok) {
      toast.success("Profile updated!");
      setUserData((prev) => (prev ? { ...prev, phone, address } : prev));
    } else {
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (userData) {
      setPhone(userData.phone || "");
      setAddress(userData.address || "");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/user/auth";
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">
    <div className="text-lg">Loading...</div>
  </div>;
  
  if (!userData) return <div className="flex items-center justify-center min-h-screen">
    <div className="text-lg">No user data</div>
  </div>;

  return (
<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
  {/* Header */}
  <Navbar />

  {/* Page Header */}
  <div className="bg-white shadow-sm border-b mt-16 lg:mt-18 border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3 lg:space-x-4">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm lg:text-lg">P</span>
          </div>
          <div>
            <h1 className="text-lg lg:text-2xl font-bold text-gray-900">
              Profile Management
            </h1>
            <p className="text-xs lg:text-sm text-gray-500">
              Manage your account information and preferences
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 lg:space-x-3">
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              size="sm"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2 lg:space-x-3">
              <Button
                onClick={handleCancel}
                variant="outline"
                size="sm"
                className="hover:bg-gray-50"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                size="sm"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>

  {/* Main Content */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Profile Card - This will appear first on small screens and second on larger screens */}
      <div className="lg:col-span-4 order-1 lg:order-2">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-[#7AC86B] px-6 lg:px-8 py-8 lg:py-12 text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-2xl">
                <User className="w-12 h-12 lg:w-16 lg:h-16 text-[#7AC86B]" />
              </div>
              <div className="absolute bottom-4 lg:bottom-6 right-0 w-6 h-6 lg:w-8 lg:h-8 bg-green-500 rounded-full flex items-center justify-center border-2 lg:border-4 border-white shadow-lg">
                <span className="text-white text-xs lg:text-sm font-bold">✓</span>
              </div>
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-2 truncate">
              {userData.username}
            </h2>
            <p className="text-green-100 text-sm font-medium">User</p>
            <div className="mt-4 inline-flex items-center px-3 lg:px-4 py-2 bg-white/20 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-white text-sm">Active</span>
            </div>
          </div>
          {/* Profile Stats */}
          <div className="p-6 lg:p-8">
            <div className="grid grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <div className="text-center">
                <div className="bg-green-50 rounded-xl p-3 lg:p-4 mb-3">
                  <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 text-green-600 mx-auto" />
                </div>
                <div className="text-xl lg:text-2xl font-bold text-gray-900">
                  {userData.orderIds ? userData.orderIds.length : 0}
                </div>
                <div className="text-sm text-gray-500">Orders</div>
              </div>
              <div className="text-center">
                <div className="bg-green-50 rounded-xl p-3 lg:p-4 mb-3">
                  <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-green-600 mx-auto" />
                </div>
                <div className="text-xl lg:text-2xl font-bold text-gray-900">
                  {userData.purchasedCourseIds ? userData.purchasedCourseIds.length : 0}
                </div>
                <div className="text-sm text-gray-500">Courses</div>
              </div>
            </div>
            {/* Quick Actions - Only for larger screens */}
            <div className="space-y-2 lg:space-y-3 lg:block hidden">
              <Button
                variant="ghost"
                className="w-full justify-start text-green-600 bg-green-50 hover:bg-green-100 rounded-xl"
                size="sm"
              >
                <User className="w-4 h-4 mr-3" />
                Personal Information
              </Button>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:bg-gray-50 rounded-xl"
                size="sm"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Panel - This will appear second on small screens and first on larger screens */}
      <div className="lg:col-span-8 order-2 lg:order-1">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 lg:px-8 py-4 lg:py-6 border-b border-gray-100">
            <h3 className="text-lg lg:text-xl font-bold text-gray-900">
              Personal Information
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Update your personal details and contact information
            </p>
          </div>
          <div className="p-6 lg:p-8">
            <div className="space-y-6 lg:space-y-8">
              {/* User ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 lg:mb-3">
                  User ID
                </label>
                <input
                  type="text"
                  value={userData.id}
                  disabled
                  className="w-full px-3 lg:px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 text-sm font-medium"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 lg:mb-3">
                  Name
                </label>
                <input
                  type="text"
                  value={userData.username}
                  disabled
                  className="w-full px-3 lg:px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 text-sm font-medium"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 lg:mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  value={userData.email}
                  disabled
                  className="w-full px-3 lg:px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 text-sm font-medium"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 lg:mb-3">
                  Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 lg:px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-600 text-sm font-medium transition-colors"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 lg:mb-3">
                  Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 lg:px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-600 text-sm font-medium resize-none transition-colors"
                />
              </div>

              {/* Mobile Edit Buttons - Show only on mobile when form is visible */}
              <div className="block lg:hidden">
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex space-x-3">
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="flex-1 hover:bg-gray-50"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Quick Actions - Only for smaller screens */}
          <div className="p-6 lg:p-8 space-y-2 lg:space-y-3 lg:hidden">
            <Button
              variant="ghost"
              className="w-full justify-start text-green-600 bg-green-50 hover:bg-green-100 rounded-xl"
              size="sm"
            >
              <User className="w-4 h-4 mr-3" />
              Personal Information
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:bg-gray-50 rounded-xl"
              size="sm"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>




  );
};

export default UserProfile;