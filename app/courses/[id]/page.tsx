"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { ChevronDown, ChevronUp, Play, Clock, Users, Award, BookOpen, Star, Check, ArrowLeft, Globe, Headphones, Download, Shield, Trophy, Target, TrendingUp } from "lucide-react";
import Footer from "@/components/Footer";
interface Course {
  id: string;
  courseName: string;
  courseDescription: string;
  courseSubjects: string[];
  status: string;
  courseDuration: number;
  price: number;
  createdAt: string;
}

interface FAQ {
  question: string;
  answer: string;
  isOpen?: boolean;
}

// UPI Payment Configuration
const businessUpiId = 'q305666833@ybl';
const businessName = 'Delhi Wala Halwai';
const transactionNote = 'Course Payment from GRE Prep FL';

const CourseDetailsPage: React.FC = () => {
  const params = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      question: "What is included in this course?",
      answer: "This comprehensive course includes video lectures, practice exercises, downloadable resources, assignments, and lifetime access to course materials.",
      isOpen: false
    },
    {
      question: "Who is this course for?",
      answer: "This course is designed for students preparing for GRE exams, professionals looking to enhance their skills, and anyone seeking structured learning in this domain.",
      isOpen: false
    },
    {
      question: "How do I access the course after enrolling?",
      answer: "Once payment is confirmed, you'll receive instant access to the course dashboard where you can start learning immediately. All materials are available 24/7.",
      isOpen: false
    },
    {
      question: "Is this course enough to clear my placement aptitude test?",
      answer: "Yes, this course covers all essential topics and provides extensive practice materials specifically designed to help you excel in placement tests.",
      isOpen: false
    },
    {
      question: "What payment methods are available?",
      answer: "We accept UPI payments for instant processing. Simply click the 'Enroll Now' button and you'll be redirected to complete your payment securely.",
      isOpen: false
    },
    {
      question: "Why should I buy this course instead of watching free YouTube videos?",
      answer: "This course offers structured learning, expert guidance, practice exercises, personalized feedback, and a complete curriculum designed for your success - not available in free videos.",
      isOpen: false
    }
  ]);

  const highlights = [
    { icon: <Award className="w-5 h-5" />, label: "Endorsed by leading MNCs", color: "text-green-600" },
    { icon: <Globe className="w-5 h-5" />, label: "Available in Hindi & English", color: "text-green-600" },
    { icon: <Users className="w-5 h-5" />, label: "Expert Instructor", color: "text-purple-600" },
    { icon: <BookOpen className="w-5 h-5" />, label: "100% Placement-Focused", color: "text-orange-600" },
  ];

  const courseFeatures = [
    { icon: <Play className="w-5 h-5" />, label: "HD Video Lectures", desc: "Crystal clear video content" },
    { icon: <Download className="w-5 h-5" />, label: "Downloadable Resources", desc: "PDFs, notes & more" },
    { icon: <Headphones className="w-5 h-5" />, label: "Audio Lectures", desc: "Learn on the go" },
    { icon: <Award className="w-5 h-5" />, label: "Certificate of Completion", desc: "Industry recognized" },
    { icon: <BookOpen className="w-5 h-5" />, label: "Practice Exercises", desc: "Hands-on learning" },
    { icon: <Users className="w-5 h-5" />, label: "Community Access", desc: "Connect with peers" }
  ];

  const stats = [
    { label: "Students Enrolled", value: "10,000+", icon: <Users className="w-6 h-6" /> },
    { label: "Course Rating", value: "4.8/5", icon: <Star className="w-6 h-6" /> },
    { label: "Success Rate", value: "95%", icon: <Award className="w-6 h-6" /> },
    { label: "Hours of Content", value: "50+", icon: <Clock className="w-6 h-6" /> }
  ];

  const guarantees = [
    { icon: <Shield className="w-5 h-5" />, label: "30-day money back guarantee" },
    { icon: <Trophy className="w-5 h-5" />, label: "Industry-recognized certificate" },
    { icon: <Target className="w-5 h-5" />, label: "Placement assistance included" },
    { icon: <TrendingUp className="w-5 h-5" />, label: "Regular content updates" }
  ];

  useEffect(() => {
    const fetchCourse = async (): Promise<void> => {
      try {
        const res = await fetch(
          `http://localhost:8080/public/getCourseById?courseId=${params.id}`,
          { cache: "no-store" }
        );
        if (res.ok) {
          setCourse(await res.json());
        } else {
          setCourse(null);
        }
      } catch (e) {
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchCourse();
  }, [params.id]);

  const generateUPIUrl = useCallback((): string => {
    if (!course) return '';
    return `upi://pay?pa=${businessUpiId}&pn=${encodeURIComponent(businessName)}&am=${course.price.toFixed(2)}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
  }, [course]);

  const handleBuyClick = (): void => {
    if (!course) return;
    
    console.log('💰 UPI Payment Details:', {
      courseName: course.courseName,
      coursePrice: course.price,
      userWillPay: course.price.toFixed(2),
      upiUrl: generateUPIUrl()
    });

    window.location.href = generateUPIUrl();
    
    if (window.innerWidth > 768) {
      alert('UPI payment links work best on mobile devices. Please use your mobile phone to complete the payment.');
    }
  };

  const toggleFAQ = (index: number): void => {
    setFaqs(prev => prev.map((faq, i) => 
      i === index ? { ...faq, isOpen: !faq.isOpen } : faq
    ));
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getOriginalPrice = (price: number): number => {
    return Math.round(price * 1.6);
  };

  const getDiscountPercentage = (price: number): number => {
    const original = getOriginalPrice(price);
    return Math.round(((original - price) / original) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading course details...</h2>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl max-w-md border border-gray-100">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-indigo-50">
      {/* Navigation Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4 text-sm">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center text-gray-500 hover:text-gray-700 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Courses
            </button>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-900 font-semibold truncate">{course.courseName}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Hero Section */}
            <div className="bg-[#7AC86B] text-white rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent"></div>
                
                {/* Course Hero Image */}
                <div className="absolute top-4 right-4 w-32 h-20 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="w-8 h-8 mx-auto mb-1 text-green-200" />
                    <div className="text-xs font-medium">Course Preview</div>
                  </div>
                </div>

                <div className="relative p-8 sm:p-12">
                  <div className="mb-4">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800 mb-4">
                      ✨ {course.status === 'ACTIVE' ? 'Live Course' : 'Self-Paced Learning'}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    {course.courseName}
                  </h1>
                  
                  <p className="text-lg sm:text-xl text-green-100 mb-8 leading-relaxed max-w-3xl">
                    {course.courseDescription}
                  </p>

                  {/* Course Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <div className={`${highlight.color} bg-white rounded-lg p-2 mr-3`}>
                          {highlight.icon}
                        </div>
                        <span className="font-medium text-sm sm:text-base">{highlight.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <div className="flex justify-center mb-2 text-green-200">
                          {stat.icon}
                        </div>
                        <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                        <div className="text-xs sm:text-sm text-green-200">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content Tabs */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 bg-gray-50/50">
                <nav className="flex space-x-0">
                  {[
                    { id: 'overview', label: 'Overview', icon: <BookOpen className="w-4 h-4" /> },
                    { id: 'curriculum', label: 'Curriculum', icon: <Award className="w-4 h-4" /> },
                    { id: 'instructor', label: 'Instructor', icon: <Users className="w-4 h-4" /> },
                    { id: 'reviews', label: 'Reviews', icon: <Star className="w-4 h-4" /> }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-4 px-4 font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2 ${
                        activeTab === tab.id
                          ? 'text-green-600 bg-white border-b-2 border-green-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                      }`}
                    >
                      {tab.icon}
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6 sm:p-8">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                        <BookOpen className="w-6 h-6 mr-2 text-green-600" />
                        About This Course
                      </h3>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed mb-6">
                          {course.courseDescription}
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          This comprehensive course is designed to provide you with all the knowledge and skills needed to excel in your chosen field. 
                          Our expert-crafted curriculum combines theoretical foundations with practical applications, ensuring you gain both 
                          understanding and hands-on experience.
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-gradient-to-br from-green-50 to-indigo-50 rounded-xl p-6 border border-green-100">
                        <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                          <Target className="w-5 h-5 mr-2 text-green-600" />
                          What You'll Learn
                        </h4>
                        <ul className="space-y-3">
                          {course.courseSubjects.map((subject, index) => (
                            <li key={index} className="flex items-start">
                              <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                                <Check className="w-3 h-3 text-green-600" />
                              </div>
                              <span className="text-gray-700 font-medium">{subject}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                        <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                          <Shield className="w-5 h-5 mr-2 text-purple-600" />
                          Prerequisites
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <div className="bg-purple-100 rounded-full p-1 mr-3 mt-0.5">
                              <Check className="w-3 h-3 text-purple-600" />
                            </div>
                            <span className="text-gray-700 font-medium">Basic understanding of mathematics</span>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-purple-100 rounded-full p-1 mr-3 mt-0.5">
                              <Check className="w-3 h-3 text-purple-600" />
                            </div>
                            <span className="text-gray-700 font-medium">Access to computer and internet</span>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-purple-100 rounded-full p-1 mr-3 mt-0.5">
                              <Check className="w-3 h-3 text-purple-600" />
                            </div>
                            <span className="text-gray-700 font-medium">Motivation to learn and practice</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Award className="w-6 h-6 mr-2 text-green-600" />
                      Course Curriculum
                    </h3>
                    <div className="space-y-4">
                      {course.courseSubjects.map((subject, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-green-200 bg-gradient-to-r from-white to-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="bg-gradient-to-br from-green-500 to-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold mr-4 shadow-lg">
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900">{subject}</h4>
                                <p className="text-gray-600 text-sm">Module {index + 1} • Interactive Learning</p>
                              </div>
                            </div>
                            <div className="flex items-center text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                              <Clock className="w-4 h-4 mr-1" />
                              <span className="text-sm font-medium">{Math.round(course.courseDuration / course.courseSubjects.length)} hrs</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Users className="w-6 h-6 mr-2 text-green-600" />
                      Meet Your Instructor
                    </h3>
                    <div className="bg-gradient-to-br from-green-50 to-indigo-50 rounded-2xl p-8 border border-green-100">
                      <div className="flex items-start space-x-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                          EI
                        </div>
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-gray-900 mb-2">Expert Instructor</h4>
                          <p className="text-gray-700 mb-6 leading-relaxed">
                            With over 10 years of experience in the industry, our expert instructor brings real-world 
                            knowledge and practical insights to every lesson. They have helped thousands of students 
                            achieve their career goals through comprehensive and engaging teaching methods.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg p-4 text-center border border-green-200">
                              <div className="text-2xl font-bold text-green-600">4.9</div>
                              <div className="text-sm text-gray-600">Rating</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center border border-green-200">
                              <div className="text-2xl font-bold text-green-600">15K+</div>
                              <div className="text-sm text-gray-600">Students</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center border border-purple-200">
                              <div className="text-2xl font-bold text-purple-600">25+</div>
                              <div className="text-sm text-gray-600">Courses</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Star className="w-6 h-6 mr-2 text-green-600" />
                      Student Reviews
                    </h3>
                    <div className="space-y-6">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-white to-gray-50 hover:shadow-lg transition-shadow">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                              U{review}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <h5 className="font-semibold text-gray-900 mr-3">Student {review}</h5>
                                <div className="flex text-yellow-400">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-700 mb-3 leading-relaxed">
                                This course exceeded my expectations! The content is well-structured, and the instructor 
                                explains complex concepts in an easy-to-understand manner. Highly recommended!
                              </p>
                              <p className="text-gray-500 text-sm">2 weeks ago</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Main Pricing Card */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                {/* Course Preview Image */}
                <div className="relative rounded-t-2xl overflow-hidden" style={{ minHeight: 180 }}>
                  <img
                    src="/image1.jpg"
                    alt="Course Preview"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">38% OFF</span>
                </div>

                <div className="p-6">
                  {/* Pricing */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-gray-400 line-through text-lg mr-3">
                        {formatPrice(getOriginalPrice(course.price))}
                      </span>
                      <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-1 rounded-lg">
                        Limited Time
                      </span>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {formatPrice(course.price)}
                    </div>
                    <p className="text-gray-600 text-sm">One-time payment • Lifetime access</p>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={handleBuyClick}
                    className="w-full bg-[#7AC86B] hover:[#7AC86B] text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg mb-4 relative overflow-hidden"
                  >
                    <span className="relative z-10">🚀 Enroll Now</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
                  </button>

                  {/* Course Details */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Duration:
                        </span>
                        <span className="font-semibold">{course.courseDuration}h</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center">
                          <Globe className="w-4 h-4 mr-1" />
                          Language:
                        </span>
                        <span className="font-semibold">EN/HI</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          Level:
                        </span>
                        <span className="font-semibold">All Levels</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center">
                          <Award className="w-4 h-4 mr-1" />
                          Certificate:
                        </span>
                        <span className="font-semibold">Yes</span>
                      </div>
                    </div>
                  </div>

                  {/* What's Included Section */}
               
<div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
  <div className="p-4">
    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
      <Check className="w-5 h-5 mr-2" style={{ color: "#7AC86B" }} />
      What's Included
    </h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {courseFeatures.map((feature, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-3 border border-gray-100 shadow-xs transition hover:shadow-sm"
        >
          <div
            className="rounded-full flex items-center justify-center mb-2"
            style={{ background: "#E9F8EC", width: 40, height: 40 }}
          >
            {React.cloneElement(feature.icon, { className: "w-5 h-5", style: { color: "#7AC86B" } })}
          </div>
          <div className="font-medium text-gray-900 text-center text-sm">{feature.label}</div>
          <div className="text-gray-500 text-xs text-center">{feature.desc}</div>
        </div>
      ))}
    </div>
  </div>
</div>


<div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
  <div className="p-4">
    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
      <Shield className="w-5 h-5 mr-2" style={{ color: "#7AC86B" }} />
      Our Guarantees
    </h3>
    <div className="grid grid-cols-2 gap-3">
      {guarantees.map((g, idx) => (
        <div
          key={idx}
          className="flex items-center bg-gray-50 rounded-lg p-3 border border-gray-100 shadow-xs"
        >
          <div
            className="rounded-full p-1.5 mr-2 flex items-center justify-center"
            style={{ background: "#E9F8EC" }}
          >
            {React.cloneElement(g.icon, { className: "w-4 h-4", style: { color: "#7AC86B" } })}
          </div>
          <span className="font-medium text-gray-700 text-sm">{g.label}</span>
        </div>
      ))}
    </div>
  </div>
</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mt-10">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <ChevronDown className="w-6 h-6 mr-2 text-green-600" />
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => toggleFAQ(idx)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-medium">{faq.question}</span>
                    {faq.isOpen ? <ChevronUp className="w-5 h-5 text-green-500" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                  {faq.isOpen && (
                    <div className="mt-2 text-gray-700">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CourseDetailsPage;
