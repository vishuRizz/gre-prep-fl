"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, User, Shield } from 'lucide-react';
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

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      <AnimatePresence mode="wait">
        {mode === 'login' ? (
          // Sign In Layout
          <>
            {/* Left Side - Form */}
            <motion.div 
              className="flex-1 lg:w-1/2 flex flex-col justify-center p-8 bg-white"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full max-w-md mx-auto">
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign in</h2>
                </div>
                
                {/* Social Login */}
                <div className="flex space-x-4 mb-6">
                  <button type="button" className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <span className="text-xl">f</span>
                  </button>
                  <button type="button" className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <span className="text-xl">G+</span>
                  </button>
                  <button type="button" className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <span className="text-xl">in</span>
                  </button>
                </div>
                
                <p className="text-gray-600 mb-6">or use your account</p>
                
                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
                      required
                    />
                  </div>
                  
                  {/* Password */}
                  <div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
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
                  
                  {/* Forgot Password */}
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
                      className="text-sm text-[#7AC86B] hover:text-[#69b55a] font-medium"
                      onClick={() => setShowReset(true)}
                    >
                      Forgot your password?
                    </button>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#7AC86B] text-white py-3 px-4 rounded-full font-medium hover:bg-[#69b55a] focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      'SIGN IN'
                    )}
                  </button>
                </form>
                
                {/* Message */}
                {message && (
                  <div className={`mt-6 text-center p-3 rounded-lg ${
                    message.includes('successful') 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {message}
                  </div>
                )}
                
                {/* Toggle Mode */}
                <div className="text-center pt-6">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-800 font-medium"
                    onClick={() => setMode('signup')}
                  >
                    Don't have an account? Sign up
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Right Side - Welcome Banner */}
            <motion.div 
              className="hidden lg:flex lg:w-1/2 bg-[#7AC86B] flex-col justify-center items-center p-8"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-md text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Hello, Friend!</h1>
                <p className="mb-8">Enter your personal details and start journey with us</p>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="border-2 border-white text-white py-3 px-8 rounded-full font-medium hover:bg-white hover:text-[#7AC86B] transition-colors"
                >
                  SIGN UP
                </button>
              </div>
            </motion.div>
          </>
        ) : (
          // Sign Up Layout
          <>
            {/* Left Side - Welcome Banner */}
            <motion.div 
              className="hidden lg:flex lg:w-1/2 bg-[#7AC86B] flex-col justify-center items-center p-8"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-md text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                <p className="mb-8">To keep connected with us please login with your personal info</p>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="border-2 border-white text-white py-3 px-8 rounded-full font-medium hover:bg-white hover:text-[#7AC86B] transition-colors"
                >
                  SIGN IN
                </button>
              </div>
            </motion.div>
            
            {/* Right Side - Form */}
            <motion.div 
              className="flex-1 lg:w-1/2 flex flex-col justify-center p-8 bg-white"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full max-w-md mx-auto">
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                </div>
                
                {/* Social Login */}
                <div className="flex space-x-4 mb-6">
                  <button type="button" className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <span className="text-xl">f</span>
                  </button>
                  <button type="button" className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <span className="text-xl">G+</span>
                  </button>
                  <button type="button" className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <span className="text-xl">in</span>
                  </button>
                </div>
                
                <p className="text-gray-600 mb-6">or use your email for registration</p>
                
                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Username */}
                  <div>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      onChange={handleInputChange}
                      placeholder="Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
                      required
                    />
                  </div>
                  
                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
                      required
                    />
                  </div>
                  
                  {/* Password */}
                  <div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
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
                      Admin Signup
                    </label>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#7AC86B] text-white py-3 px-4 rounded-full font-medium hover:bg-[#69b55a] focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      'SIGN UP'
                    )}
                  </button>
                </form>
                
                {/* Message */}
                {message && (
                  <div className={`mt-6 text-center p-3 rounded-lg ${
                    message.includes('successful') 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {message}
                  </div>
                )}
                
                {/* Toggle Mode - Mobile Only */}
                <div className="text-center pt-6 lg:hidden">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-800 font-medium"
                    onClick={() => setMode('login')}
                  >
                    Already have an account? Sign in
                  </button>
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-[#e6f7e3] rounded-lg flex items-center justify-center mr-3">
              <Lock className="w-5 h-5 text-[#7AC86B]" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Reset Password</h2>
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center">
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
              className="w-full bg-[#7AC86B] text-white py-3 rounded-lg font-medium hover:bg-[#69b55a] focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              <div className={`text-center p-3 rounded-lg text-sm ${
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