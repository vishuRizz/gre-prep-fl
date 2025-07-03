import React, { useState } from 'react';

const DismissibleBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-gray-100 p-4  mt-24 flex justify-between items-center">
      <div className="text-center flex-grow">
        <p className="text-gray-800">
        Ace the GRE with expert-led coaching, smart strategies, and personalized prep.{' '}
         
        </p>
      </div>
      <button
        onClick={handleDismiss}
        className="text-gray-500 hover:text-gray-800 ml-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default DismissibleBanner;
