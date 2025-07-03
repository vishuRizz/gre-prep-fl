"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  Play,
  Clock,
  Users,
  Award,
  BookOpen,
  Star,
  Check,
  ArrowLeft,
  Globe,
  Headphones,
  Download,
  Shield,
  Trophy,
  Target,
  TrendingUp,
  PlayCircle,
  Calendar,
  CheckCircle,
  User,
  BarChart3,
  GraduationCap,
  Languages,
  Timer,
  Zap,
} from "lucide-react";
import Footer from "@/components/Footer";
import DismissibleBanner from "@/components/DismissibleBanner";
import Navbar from "@/components/Navbar";
import FaqComponent from "@/components/FaqComponent";
import AbstractShapes from "@/components/AbstractShapes";

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

const testimonials = [
  {
    name: "Felipe M.",
    since: "Learner since 2018",
    quote:
      "To be able to take courses at my own pace and rhythm has been an amazing experience. I can learn whenever it fits my schedule and mood.",
    imageUrl: "/test1.png", // Replace with actual image URL
  },
  {
    name: "Jennifer J.",
    since: "Learner since 2020",
    quote:
      "I directly applied the concepts and skills I learned from my courses to an exciting new project at work.",
    imageUrl: "/test2.png", // Replace with actual image URL
  },
  {
    name: "Larry W.",
    since: "Learner since 2021",
    quote:
      "When I need courses on topics that my university doesn't offer, Coursera is one of the best places to go.",
    imageUrl: "/test3.png", // Replace with actual image URL
  },
  {
    name: "Chaitanya A.",
    since: "Learner since 2019",
    quote:
      "Learning isn't just about being better at your job; it's so much more than that. Coursera allows me to learn without limits.",
    imageUrl: "/test4.png", // Replace with actual image URL
  },
];

const businessUpiId = "q305666833@ybl";
const businessName = "Delhi Wala Halwai";
const transactionNote = "Course Payment from GRE Prep FL";

const CourseDetailsPage: React.FC = () => {
  const params = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("about");
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      question: "What is included in this course?",
      answer:
        "This comprehensive course includes video lectures, practice exercises, downloadable resources, assignments, and lifetime access to course materials.",
      isOpen: false,
    },
    {
      question: "Who is this course for?",
      answer:
        "This course is designed for students preparing for GRE exams, professionals looking to enhance their skills, and anyone seeking structured learning in this domain.",
      isOpen: false,
    },
    {
      question: "How do I access the course after enrolling?",
      answer:
        "Once payment is confirmed, you'll receive instant access to the course dashboard where you can start learning immediately. All materials are available 24/7.",
      isOpen: false,
    },
    {
      question: "Is this course enough to clear my placement aptitude test?",
      answer:
        "Yes, this course covers all essential topics and provides extensive practice materials specifically designed to help you excel in placement tests.",
      isOpen: false,
    },
    {
      question: "What payment methods are available?",
      answer:
        "We accept UPI payments for instant processing. Simply click the 'Enroll Now' button and you'll be redirected to complete your payment securely.",
      isOpen: false,
    },
    {
      question:
        "Why should I buy this course instead of watching free YouTube videos?",
      answer:
        "This course offers structured learning, expert guidance, practice exercises, personalized feedback, and a complete curriculum designed for your success - not available in free videos.",
      isOpen: false,
    },
  ]);

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
    if (!course) return "";
    return `upi://pay?pa=${businessUpiId}&pn=${encodeURIComponent(
      businessName
    )}&am=${course.price.toFixed(2)}&cu=INR&tn=${encodeURIComponent(
      transactionNote
    )}`;
  }, [course]);

  const handleBuyClick = (): void => {
    if (!course) return;

    console.log("💰 UPI Payment Details:", {
      courseName: course.courseName,
      coursePrice: course.price,
      userWillPay: course.price.toFixed(2),
      upiUrl: generateUPIUrl(),
    });

    window.location.href = generateUPIUrl();

    if (window.innerWidth > 768) {
      alert(
        "UPI payment links work best on mobile devices. Please use your mobile phone to complete the payment."
      );
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center  p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-4xl mb-4">🚫</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Course Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ml-14  mr-14">
      <Navbar />
      <DismissibleBanner />
      {/* Header Navigation */}

      {/* Main Content */}
      <div className="w-full mx-auto sm:mt-12 lg:mt-0 px-4 sm:px-6 lg:px-8  ">
        <div className="flex flex-col">
          {/* Course Title Section */}

          <div className="w-full">
            {/* Full-width Course Header */}

            <div className="flex  flex-col lg:flex-row w-full  rounded-lg border-gray-200 p-8 mb-6">
              {/* LEFT SIDE – Course Info with background image */}
              <div className="pt-20 w-[950px]">
                <h1 className="text-4xl lg:text-7xl font-bold text-gray-600 mb-4">
                  {course.courseName}
                </h1>
                <p className="text-lg max-w-full lg:max-w-3/4 text-gray-600 mb-6 leading-relaxed">
                  {course.courseDescription}
                </p>

                {/* Instructor */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#7AC86B] rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-md text-gray-600">Instructor:</p>
                    <p className="font-semibold text-lg text-gray-700">
                      GRE Prep Expert
                    </p>
                  </div>
                </div>

                {/* Enrollment Count */}
                <div className="text-sm text-gray-600 mb-4">
                  <span className="font-semibold text-gray-900">10,847</span>{" "}
                  already enrolled
                </div>

                {/* Enroll Button */}
                <button
                  onClick={handleBuyClick}
                  className="bg-[#7AC86B] text-2xl hover:bg-green-500 text-white font-semibold py-6 px-10 transition-colors mb-4"
                >
                  Enroll Now
                </button>
              </div>

              {/* RIGHT SIDE – Expanded Image */}
              <div className="w-full lg:w-3/5 flex justify-center items-center">
                <div
                  className="w-[70%] aspect-square"
                  style={{
                    backgroundColor: "#E6F6E2",
                    WebkitMaskImage: "url('/bg.png')",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",
                    maskImage: "url('/bg.png')",
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    maskPosition: "center",
                  }}
                />
              </div>
            </div>

            {/* Course Stats - 80% width and positioned slightly above */}
            <div className="flex justify-center">
              <div className="w-4/5  rounded-lg shadow-2xl border border-gray-200 p-6 -mt-12 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">3</div>
                    <div className="text-sm text-gray-600">course series</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Get in-depth knowledge of a subject
                    </div>
                  </div>
                  <div className="text-center relative">
                    <div className="absolute inset-y-0 left-0 flex items-center -ml-3">
                      <div className="h-12 w-px "></div>
                    </div>
                    <div className="flex items-center justify-center mb-1">
                      <span className="text-2xl font-bold text-gray-900">
                        4.7
                      </span>
                      <Star className="w-4 h-4 text-yellow-400 ml-1 fill-current" />
                    </div>
                    <div className="text-xs text-gray-500">(3,608 reviews)</div>
                  </div>
                  <div className="text-center relative">
                    <div className="absolute inset-y-0 left-0 flex items-center -ml-3">
                      <div className="h-12 w-px "></div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">All</div>
                    <div className="text-sm text-gray-600">level</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Recommended experience
                    </div>
                  </div>
                  <div className="text-center relative">
                    <div className="absolute inset-y-0 left-0 flex items-center -ml-3">
                      <div className="h-12 w-px "></div>
                    </div>
                    <div className="text-2xl fnt-bold text-gray-900">
                      2 months
                    </div>
                    <div className="text-sm text-gray-600">
                      at 10 hours a week
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Flexible schedule
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className=" mt-10 overflow-hidden mb-6">
            <div>
              <nav className="flex">
                {[
                  { id: "about", label: "About" },
                  { id: "outcomes", label: "Outcomes" },

                  { id: "testimonials", label: "Testimonials" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-[#7AC86B] text-[#7AC86B]"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "about" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      What you'll learn
                    </h3>
                    <div className="space-y-3">
                      {course.courseSubjects &&
                      course.courseSubjects.length > 0 ? (
                        course.courseSubjects.map((subject, index) => (
                          <div key={index} className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{subject}</span>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            You will learn how to work more collaboratively and
                            more effectively using a suite of
                            productivity-enhancing applications.
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Skills you'll gain
                    </h3>
                    <div className="flex flex-wrap gap-2 max-w-1/2">
                      {[
                        "CI/CD",
                        "Debugging",
                        "Git (Version Control System)",
                        "Unit Testing",
                        "Technical Communication",
                        "Cloud Computing",
                        "Automation",
                        "GitHub",
                        "Interviewing Skills",
                        "Programming Principles",
                        "Configuration Management",
                      ].map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm whitespace-nowrap"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Details to know
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start space-x-3">
                        <Award className="w-6 h-6 text-gray-400 mt-1" />
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Shareable certificate
                          </h4>
                          <p className="text-sm text-gray-600">
                            Add to your LinkedIn profile
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Languages className="w-6 h-6 text-gray-400 mt-1" />
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Taught in English
                          </h4>
                          <p className="text-sm text-gray-600">
                            24 languages available
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "outcomes" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Learning Outcomes
                    </h3>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h4 className="font-semibold text-lg text-gray-900 mb-3">
                          Master GRE Fundamentals
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          Develop a strong foundation in all GRE sections
                          including Verbal, Quantitative, and Analytical
                          Writing.
                        </p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h4 className="font-semibold text-lg text-gray-900 mb-3">
                          Test-Taking Strategies
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          Learn proven strategies to maximize your score and
                          manage time effectively during the exam.
                        </p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h4 className="font-semibold text-lg text-gray-900 mb-3">
                          Practice & Assessment
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          Get extensive practice with real GRE-style questions
                          and receive detailed feedback on your performance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "testimonials" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      What Students Say
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          id: 1,
                          review:
                            "This course exceeded my expectations! The content is well-structured, and the instructor explains complex concepts in an easy-to-understand manner. Highly recommended for GRE prep!",
                          time: "2 weeks ago",
                        },
                        {
                          id: 2,
                          review:
                            "I found the course to be incredibly helpful. The practice exercises were particularly useful in reinforcing what I learned.",
                          time: "1 month ago",
                        },
                        {
                          id: 3,
                          review:
                            "The instructor was very knowledgeable and responsive. The course material was comprehensive and well-organized.",
                          time: "3 weeks ago",
                        },
                      ].map((testimonial) => (
                        <div
                          key={testimonial.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img
                                src={`/test${testimonial.id + 4}.jpeg`} // Assuming images are named test5.jpg, test6.jpg, test7.jpg
                                alt={`Student ${testimonial.id}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <h5 className="font-medium text-gray-900 mr-2">
                                  Student {testimonial.id}
                                </h5>
                                <div className="flex text-yellow-400">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className="w-4 h-4 fill-current"
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-700 mb-2">
                                {testimonial.review}
                              </p>
                              <p className="text-sm text-gray-500">
                                {testimonial.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enrollment Card */}
          <div className="flex flex-col md:flex-row items-center justify-around  p-6">
            <div className="w-full md:w-1/2 p-4">
              <h2 className="text-3xl font-bold mb-6">
                Advance your subject-matter expertise
              </h2>
              <ul className="list-disc pl-5 space-y-3">
                <li className="text-lg">
                  Learn in-demand skills from university and industry experts
                </li>
                <li className="text-lg">
                  Master a subject or tool with hands-on projects
                </li>
                <li className="text-lg">
                  Develop a deep understanding of key concepts
                </li>
                <li className="text-lg">
                  Earn a career certificate from Microsoft
                </li>
              </ul>
            </div>
            <div className="w-1/3 ">
              <img
                src="/courses.jpg" // Replace with your image URL
                alt="Person working on a laptop"
                className="w-1/ h-auto rounded-lg"
              />
            </div>
          </div>

          <div className="p-6 ">
            <h2 className="text-3xl font-bold text-center mb-8">
              Why people choose Us for their career
            </h2>
            <div className="flex justify-center overflow-x-auto">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className=" rounded-lg shadow-md p-6 mx-2 flex-shrink-0"
                  style={{ width: "300px" }}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">
                        {testimonial.since}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>

          <FaqComponent />
          {/* FAQ Section */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetailsPage;
