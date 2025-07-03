import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FaqComponent = () => {
  const [faqs, setFaqs] = useState([
    {
      question: "How long does it take to complete the Specialization?",
      answer: "The time it takes to complete a specialization varies, but most learners complete it in 2 to 3 months.",
      isOpen: false,
    },
    {
      question: "What background knowledge is necessary?",
      answer: "No specific background knowledge is required, but a basic understanding of the subject matter can be helpful.",
      isOpen: false,
    },
    {
      question: "Do I need to take the courses in a specific order?",
      answer: "Courses within a specialization are designed to be taken in a specific order to build your knowledge progressively.",
      isOpen: false,
    },
    // Add more FAQs as needed
  ]);

  const toggleFAQ = (index: number) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) =>
        i === index ? { ...faq, isOpen: !faq.isOpen } : faq
      )
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6">
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-900 py-4"
              >
                <span>{faq.question}</span>
                {faq.isOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {faq.isOpen && (
                <div className="mt-2 text-gray-700">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
         
        </div>
      </div>
      <div className="w-full h-1/2 md:w-1/3 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">More questions</h3>
        <p className="mb-4">
          <a href="#" className="text-[#7AC86B] hover:text-green-500">
            Visit the learner help center
          </a>
        </p>
        <hr className="my-4" />
        <p>
          <a href="#" className="text-[#7AC86B] hover:text-green-600">
            Financial aid available, learn more
          </a>
        </p>
      </div>
    </div>
  );
};

export default FaqComponent;
