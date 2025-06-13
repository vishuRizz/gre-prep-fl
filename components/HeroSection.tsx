// components/HeroSection.tsx
import React from "react";
import { Button } from "@/components/ui/button"
const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[750px] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 brightness-50"
        style={{
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "auto",
        }}
      >
        <source src="/video1.mp4" type="video/mp4" />
        <source src="/video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Content */}
      <div className="relative h-[350px] z-20 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl  text-white mb-4 leading-tight">
          TOP-RATED GRE TEST PREP
        </h1>

        <div className="flex items-center justify-center mb-2">
          <div className="flex text-green-400 mr-4">
            {[...Array(3)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-white text-xl mt-5 md:text-2xl">
            Earn your best score in Quant and Verbal
          </p>
          <div className="flex text-green-400 ml-4">
            {[...Array(3)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        <p className="text-white text-xl md:text-2xl mb-10  ">
          with TTP's GRE prep course
        </p>

        <Button className="bg-[#2f835d] text-white font-semibold py-4 px-12 text-lg  ">
          FULL-ACCESS TRIAL FOR FREE
        </Button>

        <div className="text-white text-center">
          {/* Wrapper with inline-block to size to content */}
          <div className="inline-block">
            {/* Horizontal line matching text width */}
            <div className="h-px bg-white mb-4 mt-4 w-full" />

            {/* Text */}
            <p className="text-md md:text-2xl font-bold ">
              SCORE <span className="text-md">320</span> OR HIGHER ON THE GRE.{" "}
              <span className="text-white">GUARANTEED.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div
          className="bg-gradient-to-r from-green-200 via-white to-green-300
 text-center py-2"
        >
          <p className="text-gray-800 text-lg font-semibold">
            The TTP course has everything you need to study for the{" "}
            <span className="font-bold">NEW GRE!</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
