"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, User, Shield, BookOpen, Target, TrendingUp, Users, Award, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/components/AuthContext';
import { toast } from 'sonner';

interface FormData {
  email: string;
  password: string;
  isAdmin: boolean;
}

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    isAdmin: false  
  });
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState<string>('');
  const [showReset, setShowReset] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (mode === 'signup' && name === 'username') {
      setUsername(value);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);
    
    let endpoint = '';
    let payload: any = {};
    
    if (mode === 'login') {
      endpoint = 'http://localhost:8080/api/user/login';
      payload = { email: formData.email, password: formData.password };
    } else {
      endpoint = formData.isAdmin
        ? 'http://localhost:8080/admin/create'
        : 'http://localhost:8080/public/user/create';
      payload = { username, email: formData.email, password: formData.password };
    }
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) throw new Error('Request failed');
      
      const data = mode === 'login' ? await res.json() : await res.text();
      
      if (mode === 'login' && formData.isAdmin && !data.adminDto) {
        toast.error('Not an admin account.');
      } else {
        if (mode === 'login') {
          toast.success('Login successful!');
          if (data.token) {
            login(data.token, formData.isAdmin && data.adminDto ? data.adminDto : undefined);
            if (formData.isAdmin && data.adminDto) {
              router.push("/admin/users");
            } else {
              router.push('/user/profile');
            }
          }
        } else {
          toast.success('Signup successful! Please verify your email.');
          router.push('/user/verify-email');
        }
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: Target, text: "Personalized Study Plans" },
    { icon: TrendingUp, text: "Track Your Progress" },
    { icon: BookOpen, text: "Expert-Designed Content" },
    { icon: Users, text: "Community Support" },
  ];

  const stats = [
    { number: "10K+", label: "Students Enrolled" },
    { number: "95%", label: "Success Rate" },
    { number: "320+", label: "Average Score Increase" },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      <AnimatePresence mode="wait">
        {mode === 'login' ? (
          // Sign In Layout
          <>
            {/* Left Side - Form */}
            <motion.div 
              className="flex-1 lg:w-1/2 flex flex-col justify-center p-8 bg-white relative"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-green-50/30 pointer-events-none"></div>
              
              <div className="w-full max-w-md mx-auto relative z-10">
                {/* Header */}
                <div className="mb-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#7AC86B] to-[#69b55a] rounded-2xl mb-4">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                  <p className="text-gray-600 text-sm">Continue your GRE preparation journey</p>
                </div>
              
                {/* Motivational Stats */}
                <div className="grid grid-cols-3 gap-2 mb-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-lg font-bold text-gray-800">{stat.number}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:border-transparent bg-gray-50/50 transition-all"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:border-transparent bg-gray-50/50 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  {/* Admin Login & Forgot Password */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="isAdmin"
                        checked={formData.isAdmin}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#7AC86B] border-gray-300 rounded focus:ring-[#7AC86B]"
                      />
                      <label className="ml-2 text-sm text-gray-700 flex items-center">
                        <Shield className="w-4 h-4 mr-1" />
                        Admin Login
                      </label>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-[#7AC86B] hover:text-[#69b55a] font-medium transition-colors"
                      onClick={() => setShowReset(true)}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#7AC86B] to-[#69b55a] text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Signing In...
                      </div>
                    ) : (
                      'Sign In & Continue Learning'
                    )}
                  </button>
                </form>
                
                {/* Message */}
                {message && (
                  <div className={`mt-6 text-center p-3 rounded-xl ${
                    message.includes('successful') 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {message}
                  </div>
                )}
                
                {/* Toggle Mode */}
                <div className="text-center pt-6">
                  <p className="text-gray-600 text-sm">
                    New to GRE Prep?{' '}
                    <button
                      type="button"
                      className="text-[#7AC86B] hover:text-[#69b55a] font-semibold transition-colors"
                      onClick={() => setMode('signup')}
                    >
                      Start Your Journey
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Right Side - Welcome Banner */}
            <motion.div 
              className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#7AC86B] to-[#69b55a] flex-col justify-center items-center p-8 relative overflow-hidden"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-20 left-10 w-24 h-24 bg-white/10 rounded-full"></div>
              
              <div className="max-w-md text-center text-white relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Achieve Your GRE Goals</h1>
                <p className="mb-8 text-white/90 leading-relaxed">
                  Join thousands of successful students who achieved their dream scores with our comprehensive preparation platform.
                </p>
                
                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center text-left">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm">
                        <feature.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white/90">{feature.text}</span>
                    </div>
                  ))}
                </div>
                
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="bg-white text-[#7AC86B] py-3 px-8 rounded-xl font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
                >
                  Start Free Trial
                </button>
                
                <p className="text-xs text-white/70 mt-4">No credit card required</p>
              </div>
            </motion.div>
          </>
        ) : (
          // Sign Up Layout
          <>
            {/* Left Side - Welcome Banner */}
            <motion.div 
              className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#7AC86B] to-[#69b55a] flex-col justify-center items-center p-8 relative overflow-hidden"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full"></div>
              
              <div className="max-w-md text-center text-white relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Welcome Back, Champion!</h1>
                <p className="mb-8 text-white/90 leading-relaxed">
                  Ready to continue your GRE preparation? Sign in to access your personalized study dashboard and track your progress.
                </p>
                
                {/* Success Stories */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8">
                  <p className="text-sm text-white/90 italic mb-2">
                    "I improved my score by 50+ points in just 3 months!"
                  </p>
                  <p className="text-xs text-white/70">- Sarah M, Harvard Graduate School</p>
                </div>
                
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="bg-white text-[#7AC86B] py-3 px-8 rounded-xl font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
                >
                  Sign In to Dashboard
                </button>
              </div>
            </motion.div>
            
            {/* Right Side - Form */}
            <motion.div 
              className="flex-1 lg:w-1/2 flex flex-col justify-center p-8 bg-white relative"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-blue-50/30 pointer-events-none"></div>
              
              <div className="w-full max-w-md mx-auto relative z-10">
                {/* Header */}
                <div className="mb-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#7AC86B] to-[#69b55a] rounded-2xl mb-4">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Start Your GRE Journey</h2>
                  <p className="text-gray-600 text-sm">Join the community of successful GRE achievers</p>
                </div>
                
                {/* Benefits */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-8">
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm">What you'll get:</h3>
                  <div className="space-y-2">
                    {[
                      "Adaptive practice tests",
                      "Detailed performance analytics",
                      "24/7 expert support",
                      "Mobile app access"
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-[#7AC86B] mr-2" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:border-transparent bg-gray-50/50 transition-all"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:border-transparent bg-gray-50/50 transition-all"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Create Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a strong password"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:border-transparent bg-gray-50/50 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  {/* Admin Option */}
                  {/* <div className="flex items-center bg-gray-50 rounded-xl p-3">
                    <input
                      type="checkbox"
                      name="isAdmin"
                      checked={formData.isAdmin}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#7AC86B] border-gray-300 rounded focus:ring-[#7AC86B]"
                    />
                    <label className="ml-2 text-sm text-gray-700 flex items-center">
                      <Shield className="w-4 h-4 mr-1" />
                      Register as Admin
                    </label>
                  </div> */}
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#7AC86B] to-[#69b55a] text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Creating Account...
                      </div>
                    ) : (
                      'Start Your GRE Prep Journey'
                    )}
                  </button>
                </form>
                
                {/* Message */}
                {message && (
                  <div className={`mt-6 text-center p-3 rounded-xl ${
                    message.includes('successful') 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {message}
                  </div>
                )}
                
                {/* Toggle Mode - Mobile Only */}
                <div className="text-center pt-6">
                  <p className="text-gray-600 text-sm">
                    Already have an account?{' '}
                    <button
                      type="button"
                      className="text-[#7AC86B] hover:text-[#69b55a] font-semibold transition-colors lg:hidden"
                      onClick={() => setMode('login')}
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Forgot Password Modal */}
      {showReset && (
        <ForgotPasswordModal onClose={() => setShowReset(false)} />
      )}
    </div>
  );
};

interface ForgotPasswordModalProps {
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);
    
    const endpoint = isAdmin
      ? 'http://localhost:8080/admin/api/request-password-reset'
      : 'http://localhost:8080/user/api/request-password-reset';
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const text = await res.text();
      setMessage(text);
    } catch {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-[#7AC86B] to-[#69b55a] rounded-xl flex items-center justify-center mr-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Reset Password</h2>
              <p className="text-sm text-gray-600">We'll send you a reset link</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:border-transparent bg-gray-50/50"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center bg-gray-50 rounded-xl p-3">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="w-4 h-4 text-[#7AC86B] border-gray-300 rounded focus:ring-[#7AC86B]"
              />
              <label className="ml-2 text-sm text-gray-700 flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                I am an admin
              </label>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#7AC86B] to-[#69b55a] text-white py-3 rounded-xl font-semibold hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Sending...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>
            
            {message && (
              <div className={`text-center p-3 rounded-xl text-sm ${
                message.includes('error') || message.includes('failed')
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                {message}
              </div>
            )}
            
            <button
              type="button"
              onClick={onClose}
              className="w-full text-gray-600 hover:text-gray-800 py-2 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const ResetPasswordPage: React.FC = () => {
  const router = useRouter();
  const [token, setToken] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleReset = async () => {
    if (!token) {
      setMessage('Invalid reset token');
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:8080/user/api/reset-password-with-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const text = await res.text();
      setMessage(text);
    } catch {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-[#e6f7e3] rounded-lg flex items-center justify-center mr-3">
            <Lock className="w-6 h-6 text-[#7AC86B]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); handleReset(); }} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reset Token
            </label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter reset token"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#7AC86B] text-white py-3 rounded-lg font-medium hover:bg-[#69b55a] focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Resetting...
              </div>
            ) : (
              'Reset Password'
            )}
          </button>
          
          {message && (
            <div className={`text-center p-3 rounded-lg ${
              message.includes('error') || message.includes('failed')
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthPage;