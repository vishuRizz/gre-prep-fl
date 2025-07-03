import React from 'react';

const AbstractShapes = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="relative w-full max-w-screen-lg h-full">
        <svg
          className="w-full h-full"
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
        >
          {/* Abstract shapes */}
          <path
            d="M0,0 L100,0 L150,200 L50,250 Z"
            fill="rgba(147, 197, 253, 0.3)"
            stroke="rgba(147, 197, 253, 0.5)"
            strokeWidth="1"
          />
          <path
            d="M200,50 L300,50 L350,250 L250,300 Z"
            fill="rgba(165, 214, 167, 0.3)"
            stroke="rgba(165, 214, 167, 0.5)"
            strokeWidth="1"
          />
          <path
            d="M400,100 L500,100 L550,300 L450,350 Z"
            fill="rgba(252, 213, 180, 0.3)"
            stroke="rgba(252, 213, 180, 0.5)"
            strokeWidth="1"
          />
          <path
            d="M600,150 L700,150 L750,350 L650,400 Z"
            fill="rgba(204, 204, 204, 0.3)"
            stroke="rgba(204, 204, 204, 0.5)"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
};

export default AbstractShapes;
