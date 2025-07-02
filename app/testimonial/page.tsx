'use client';

import Navbar from '@/components/Navbar';
import { Star, Users } from 'lucide-react';
import CrunchPrepMap from '@/components/CrunchPrepMap';
import Footer from '@/components/Footer';
interface Testimonial {
  id: number;
  name: string;
  score: string;
  avatar: string;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Anita",
    score: "321/166Q",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9efab02?w=150&h=150&fit=crop&crop=face",
    review: "The CrunchPrep course helped strengthen my foundation in math. Being from a medical background, GRE math seemed like a daunting task to me. But your strategy lessons were crisp and on point. I joined your course to improve my math score, and I am very glad I did. It was totally worth it"
  },
  {
    id: 2,
    name: "Justin",
    score: "324/160V",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    review: "To be honest, RC used to be a nightmare to me previously. Now it's more like my strong area. The techniques I learnt from the strategy lessons helped me improve my accuracy in practice tests. The number of correct answers increased as I started using your concepts and shortcut methods. I wouldn't have got 160 in verbal if it wasn't for you"
  },
  {
    id: 3,
    name: "Nikhita",
    score: "327/170Q",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    review: "The amount of detail the lessons provide, and the plenty of practice questions that are available, are the two things that I liked the most. The tips and strategies on breaking up sentences in TC, forming logical structures in RC, and guessing word meanings, have helped me a lot. The high frequency flashcards were also very helpful and fun to learn. I owe my verbal score to your lessons"
  },
  {
    id: 4,
    name: "Gloria",
    score: "319/162Q",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    review: "The way the lessons are divided into small and understandable concepts, is very good. It helped me understand my weak areas and improve on it before moving to the next concept. I thought studying for 3 months would be boring, but there is so much to do and learn, that made it all the more fun"
  },
  {
    id: 5,
    name: "Bala",
    score: "328/170Q",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    review: "If there is one thing that no other course could provide me, it is the Review part. The kind of in depth analysis into questions that I answer, and the statistics and data were monumental in my prep. After every test, I could easily pin point my weak areas and start working on them immediately"
  },
  {
    id: 6,
    name: "Liu",
    score: "317/162Q",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    review: "The way there was a solution and an explanation for all the quiz questions was impressive, because analyzing the question and answer choices is the best way to know the process of solving the questions, and to identify where you went wrong"
  },
  {
    id: 7,
    name: "Xuan",
    score: "322/169Q",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    review: "I scored 309 last year, and decided to retake it. I scored 322 yesterday, and I can say that this improvement in my score can be attributed to you. I am very elated, and proud to be a student of CrunchPrep, which helped me so much in achieving my goal. Thank you so much!"
  },
  {
    id: 8,
    name: "Ganesh",
    score: "321/167Q",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    review: "I improved my verbal score by 7 points and my math by 4 points. This allowed me to score 320+. I'm really happy with the score and I just wanted to thank you for offering the course. Your RC lessons are probably the best on the planet. They helped me crack almost every RC question on the test"
  },
  {
    id: 9,
    name: "Adit",
    score: "315/158Q",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
    review: "I had only 25 days to prepare and I didn't think it would be enough. But with your help, I could get a good score in such short time. Also, thank you for making this the most affordable course in the world. Because of you, I was able to get a good score without spending a lot of time and money. I recommended CrunchPrep to all my friends who are taking the GRE"
  },
  {
    id: 10,
    name: "Safira",
    score: "317/164Q",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    review: "This course is such a blessing to me. There aren't many coaching centers in Ghana, so I was looking for an online program. Loved the course you offered, at such a good price. The questions were of great quality. My high GRE score would not have been possible otherwise"
  },
  {
    id: 11,
    name: "Rachel",
    score: "323/165V",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9efab02?w=150&h=150&fit=crop&crop=face",
    review: "The practice tests were incredibly realistic and helped me understand the actual test format. The detailed explanations for each question made all the difference in my preparation. I especially loved the adaptive nature of the quizzes that focused on my weak areas"
  },
  {
    id: 12,
    name: "Ahmed",
    score: "326/168Q",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    review: "The quantitative section used to intimidate me, but the step-by-step approach in your lessons made complex problems seem manageable. The variety of practice questions and the immediate feedback helped me build confidence and improve my speed significantly"
  },
  {
    id: 13,
    name: "Maya",
    score: "318/163V",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    review: "What impressed me most was the personalized study plan. The system tracked my progress and adjusted the difficulty level accordingly. The vocabulary builder tool was fantastic, and I saw immediate improvement in my verbal scores within just a few weeks"
  },
  {
    id: 14,
    name: "Carlos",
    score: "320/159Q",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    review: "The writing section preparation was outstanding. The sample essays and detailed feedback helped me understand exactly what the graders were looking for. I went from struggling with essays to confidently writing well-structured arguments"
  },
  {
    id: 15,
    name: "Priya",
    score: "314/156V",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    review: "The mobile app was a game-changer for me. I could practice during my commute and review flashcards during breaks. The offline mode ensured I never missed a study session. This flexibility was crucial for someone with a busy work schedule like mine"
  },
  {
    id: 16,
    name: "Jake",
    score: "329/170Q",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    review: "The diagnostic tests at the beginning perfectly identified my strengths and weaknesses. The customized study plan saved me months of unfocused preparation. Every minute spent on the platform was productive and targeted"
  },
  {
    id: 17,
    name: "Sophie",
    score: "316/161V",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    review: "The video explanations were clear and engaging. Complex concepts were broken down into digestible parts. I particularly appreciated the alternative solution methods shown for quantitative problems, which helped me find the approach that worked best for me"
  },
  {
    id: 18,
    name: "Daniel",
    score: "325/167Q",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    review: "The peer comparison feature motivated me to stay consistent with my studies. Seeing how I ranked among other students pushed me to work harder. The discussion forums were also helpful for clearing doubts and learning from others' experiences"
  },
  {
    id: 19,
    name: "Emma",
    score: "312/154V",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    review: "The time management strategies taught in the course were invaluable. I learned to pace myself effectively during the actual test. The timed practice sessions helped me develop the stamina needed for the 4-hour exam"
  },
  {
    id: 20,
    name: "Kevin",
    score: "331/169Q",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
    review: "Achieving a 331 seemed impossible when I started, but the comprehensive curriculum and excellent support made it happen. The regular progress assessments kept me on track, and the final score exceeded my wildest expectations. Highly recommended!"
  }
];

export default function TestimonialsPage() {
  const studentsOver315 = testimonials.filter(t => {
    const score = parseInt(t.score.split('/')[0]);
    return score >= 315;
  }).length;
  const percentageOver315 = Math.round((studentsOver315 / testimonials.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
     <Navbar />
    <CrunchPrepMap/>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-[#7AC86B] mt-6 px-4 py- rounded-full text-sm font-medium mb-4">
            <Users className="h-4 w-4" />
            <span>120,000+ students around the world have used</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            <span className="text-[#7AC86B]">CrunchPrep</span> to ace their GRE
          </h1>
        </div>

        {/* Stats Banner */}
        <div className="text-center mb-8">
          <div className="inline-block bg-[#7AC86B] text-white px-8 py-4 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold">
              Over {percentageOver315}% of our students have scored 315+
            </h2>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl   transition-shadow duration-300 p-6 "
            >
              <div className="flex items-start space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-base">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        GRE Score: <span className="font-medium text-green-600">{testimonial.score}</span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed italic">
                    "{testimonial.review}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

     
       
      </div>
      <Footer/>
    </div>
  );
}