import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  location: string;
  score: string;
  education: string;
  additionalInfo?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "I am very happy with my Final GMAT Score of 750, I excelled the GMAT Prep & Test with a lot of hard work coupled with 'The GMAT Coach' Prep Sessions. I have scored a 48 in Quant; thanks to the personalized one-on-one prep classes which had excellent course work and sharp focus on smart teaching methods. I worked with 'The GMAT Coach' for about 18-20 hours over a period of 3 weeks to ace the GMAT Test.",
    name: "Matt G.,",
    location: "San Diego, CA",
    score: "750 GMAT Score",
    education: "MBA from Stanford University"
  },
  {
    id: 2,
    quote: "It was very helpful in providing tools and tips on solving more difficult problems in a short amount of time. I will certainly recommend ‘The GMAT Coach’ Perp Services to all folks shooting for 700+ ",
    name: "Rashaan C.,",
    location: "Director at RBC Capital Markets",
    score: "",
    education: "MBA from Harvard Business School (HBS)"
  },
  {
    id: 3,
    quote: "I would recommend this GMAT Math preparation to anyone planning to take the GMAT Test soon. After only a few short weeks of this tutoring (‘The GMAT Coach’ Prep Sessions), I was able to improve my GMAT Math scores by approximately 50% (530 to a 690). As a result, I was able to gain acceptance at all 4 top 15 business schools. Without this help, this success would not have been a possibility.",
    name: "Chris R.,",
    location: "",
    score: "740 GMAT Score",
    education: "MBA from UCLA Anderson School of Management"
  },
  {
    id: 4,
    quote: "The GMAT Coach's methods are truly exceptional. I improved my score from 650 to 720 in just 6 weeks of intensive preparation. The focus on time management and problem-solving techniques was invaluable.",
    name: "John P.,",
    location: "Portman Holdings,",
    score: "LLC. Atlanta, GA",
    education: "MBA from Emory University"
  },
  {
    id: 5,
    quote: "Outstanding preparation program! The one-on-one sessions helped me identify my weak areas and develop targeted strategies. I achieved my goal score of 760 and got admitted to my dream school.",
    name: "David R.,",
    location: "Atlanta,",
    score: "GA",
    education: "MBA from Georgia Tech. University, College of Management"
  },
  {
    id: 6,
    quote: "score in Verbal = 42 he would have touched a 740+!!!   I have improved my Quant score significantly with The GMAT Coach Prep Course where I have worked very hard with the team for about 2.5 weeks and came out with Flying Colors.    The Course Structure was so extensive that really help me improve my confidence levels & Math skills. 6 - 7 Questions in the Final GMAT Test were very similar to ones that were discussed in the Prep Sessions.Overall, I am VERY HAPPY with the Course & the SUCCESS!!!",
    name: "Michael T.,",
    location: "Charlotte, NC",
    score: "730 GMAT Score",
    education: "MBA from UCLA Anderson"
  },
  {
    id: 7,
    quote: "It was great having the one-on-one help as well as having someone to encourage me as I worked through the process. The confidence building as well as the help going over mistakes made in tests helped me a lot I am extremely happy with my score",
    name: "Mayowa A.,",
    location: "Chicago,",
    score: "IL",
    education: "MBA from Kellogg School of Management at Northwestern University"
  },
  {
    id: 8,
    quote: "Dealing with each individual topic and a range of problems with varying difficulty in one shot was very helpful. These were the best things that I liked from this program. The course structure is very impressive & I surely recommend this",
    name: "Shruti S.,",
    location: "",
    score: "(Scored 700 in her GMAT & 47/60 in Quant)",
    education: "Admitted into all Top-5 Business Schools in the USA"
  },
  {
    id: 9,
    quote: "I learned to simplify the problems and to look for the smart way of solving. Definitely I would recommend this Prep Services as this is much more economical than the more well-known courses like Kaplan and Princeton Review and has so much more one on one time without the distractions of a large class environment. I think these sessions provided me with a wonderful service and my rating is 9.5/10",
    name: "Brett R.,",
    location: "Atlanta, GA",
    score: "",
    education: "MBA from University of Texas, Austin"
  },
  {
    id: 10,
    quote: "Some of the approaches were much, much simpler than those offered by other preparatory courses like Kaplan, Manhattan GMAT etc. Also, this course challenged me to use my “common sense. I am very happy with my score (730 & Quant score of 48) & absolutely recommended ‘The GMAT Coach’ Prep Courses to my friends!!",
    name: "Ameer S.,",
    location: "Chicago, IL",
    score: "",
    education: "MBA from The University of Chicago Booth School of Busin"
  },
  {
    id: 11,
    quote: "I liked the personal attention and focus on the things that I needed. The ability to make very complex things very simple was impressive and I was also impressed that you seemed to have an entire program and plan in place for areas that needed to be learned. I am very happy with my score & would definitely recommend this to others and rate is like 12/10…….‘The GMAT Coach’ was off the charts!!!",
    name: "Andrew M., CPA",
    location: "Atlanta, Georgia",
    score: "",
    education: "MBA from Emory University,"
  },
  {
    id: 12,
    quote: "I gained a valuable approach towards solving the questions, and understood more what kind of an answer the test writers were looking for & My Rating is 10/10",
    name: "Jonathan C.,",
    location: "TechnicalDirector, Amazon,",
    score: "",
    education: "MBA from Univ.of Georgia, Atlanta"
  },
  {
    id: 13,
    quote: "The correction of my methodology, the way to deconstruct & simplify problems that appeared complex was the best things that I learnt in these sessions. I will recommend these sessions to other potential MBA aspirants and GMAT Test takers.(In fact I already have!)",
    name: "Erin C.,",
    location: "Product Management at Sun Trust Bank",
    score: "",
    education: ""
  },
  {
    id: 14,
    quote: "A quicker & smarter approach to solving GMAT Quant problems was the best things that I learnt on these sessions. I will absolutely recommend this tutoring for friends & others and rate this at 9/10.",
    name: "Jennifer D.,",
    location: "Dalmatian Books Inc.,",
    score: "",
    education: "Atlanta,GA."
  },
  {
    id: 15,
    quote: "This Tutoring Sessions have helped me tremendously with the math part of the GMAT Test. I had taken the test once before this help and achieved a 9 percentile. With this help,a month later I reached 69 percentiles on the MATH part. In another words, I strongly recommended this.",
    name: "Caio A.,",
    location: "Atlanta, GA",
    score: "",
    education: "MBA from Georgia State University"
  },
  {
    id: 16,
    quote: "Unlike the Kaplan’s and Manhattan GMAT’s prep classes, this service from “The GMAT Coach” is unique because it does not burden the student with too much information about math principles and solving tricks. It makes the GMAT Quant seem very straightforward/simple and manageable. Also, it was great to establish a goal at the beginning and have realistic tracking toward that goal. I truly appreciated “The GMAT Coach” taking a personal interest in my success. I believe that is what sets this service apart! Communication is excellent and it is a very organized service. I am very happy with the improved score and rate “The GMAT Coach” a 9/10",
    name: "Adam P.,",
    location: "Nashville, TN",
    score: "730 GMAT Score",
    education: "MBA from Vanderbilt Owen"
  },
  {
    id: 17,
    quote: "Learning how to approach the problem and finding the short/smart way to tackle things also gaining more confidence in my abilities to tackle the problems was the best thing that I gained from these sessions. Explanation of problems and thorough review of the approach helped me a lot.",
    name: "Tyeise H,",
    location: "Georgia Power Inc.,",
    score: "",
    education: "MBA from Cornell University"
  },
  {
    id: 18,
    quote: "Learning the quickest way to answer the question was the best thing I learnt from these sessions. I am very pleased with my Quant. Score. (27 to a 41 in just a few weeks’ time) If I know anyone who is struggling in the Math section, I absolutely would recommend this tutoring. These sessions were of very good value, worth the time and money. I rate it 9/10.",
    name: "Sarah D,",
    location: "Ernst & Young Vancouver,",
    score: "",
    education: "Canada"
  },
  {
    id: 19,
    quote: "A deeper understanding of how to approach questions on the GMAT was the best thing that I learnt from this course. I feel like I could attempt almost any type of questions asked of me with confidence. I was very happy with my experience and I rate this 9/10.",
    name: "Katie G,",
    location: "Strategist, Fitch Inc.,",
    score: "",
    education: "Seattle, WA"
  },
  {
    id: 20,
    quote: "Review, improvement of math skills & problem-solving techniques are the best things that I picked up. ‘The GMAT Coach’ is very knowledgeable about the topics and has Excellent Quant. Skills, makes intimidating problems appear approachable & easy by showing neat math tricks I didn’t know I could do. My rating is a 10/10. I definitely recommend this to other GMAT Test takers.",
    name: "Natalie M,",
    location: "Duke Reality Corp.,",
    score: "",
    education: "MBA from Duke"
  }
];

const TestimonialsPage: React.FC = () => {
  return (
    <div>
      <Navbar/>
  
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')`
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">
            <span className="text-yellow-400">REFERENCES & TESTIMONIALS</span>
          </h1>
          <p className="text-xl md:text-2xl font-light">
            Testimonials from our Successful Students
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white py-4 shadow-sm">
  <div className="container mx-auto px-4">
    <nav className="flex items-center justify-center space-x-2 text-sm">
      <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">
        Home
      </a>
      <span className="text-gray-400">•</span>
      <span className="text-gray-400">References & Testimonials</span>
    </nav>
  </div>
</div>


      {/* Testimonials List */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="space-y-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-8 border border-gray-100"
            >
              <div className="mb-6">
                <p className="text-black leading-relaxed text-base">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-green-600 font-semibold text-lg mb-2">
                  {testimonial.name}
                </h3>
                <div className="space-y-1 text-gray-600 text-sm">
                  <p>
                    {testimonial.location}
                    {testimonial.score && (
                      <span className="font-medium"> ({testimonial.score})</span>
                    )}
                  </p>
                  <p className="font-medium">{testimonial.education}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default TestimonialsPage;