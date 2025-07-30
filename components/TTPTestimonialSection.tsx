import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  rating: number;
  quote: string;
  name: string;
  position: string;
  avatar: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ rating, quote, name, position, avatar }) => {
  return (
    <div className="flex flex-col space-y-4">
      {/* Star Rating */}
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-gray-700 text-base leading-relaxed font-normal">
        "{quote}"
      </p>

      {/* Person Info */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          <img
            src={avatar}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-base">{name}</h4>
          <p className="text-gray-600 text-sm">{position}</p>
        </div>
      </div>
    </div>
  );
};

const TTPTestimonialsPage: React.FC = () => {
  const testimonials: TestimonialProps[] = [
    {
      rating: 5,
      quote: "Working with this team has transformed our hiring process. We found the perfect candidates faster than ever before!",
      name: "Sara Thompson",
      position: "HR Manager",
      avatar: "https://tse2.mm.bing.net/th/id/OIP.FazzLhnblsPZrvbY_cXRdgHaJ4?r=0&w=600&h=800&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      rating: 5,
      quote: "Their tailored approach made all the difference. We filled critical roles with minimal effort on our part.",
      name: "David Lee",
      position: "CEO",
      avatar: "https://media.istockphoto.com/id/1318928248/photo/portrait-of-a-young-man.jpg?s=612x612&w=0&k=20&c=ayy0fWfzLoC20BlYXDQmle1vz0a9Qrv8ssSwE3dLpzA="
    },
    {
      rating: 5,
      quote: "From start to finish, their support was outstanding. We felt confident every step of the way.",
      name: "Emily Roberts",
      position: "Talent Acquisition Specialist",
      avatar: "https://tse2.mm.bing.net/th/id/OIP.W6Cbox-gD8bIcZaY4PR0wQAAAA?r=0&w=410&h=410&rs=1&pid=ImgDetMain&o=7&rm=3"
    }
  ];

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            What Our Clients Are Saying
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed max-w-2xl">
            Don't just take our word for it—hear from the companies who have 
            experienced the difference in their hiring process with our services. 
            Here's what they have to say:
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              rating={testimonial.rating}
              quote={testimonial.quote}
              name={testimonial.name}
              position={testimonial.position}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TTPTestimonialsPage;