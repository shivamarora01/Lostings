// src/components/HomePage.js
import React from "react";
import lostingImg from "../../media/lostingsImage.png";
import HowItWorks from "../Shared/HowItWorks";
function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white h-screen flex items-center text-gray-800">
        <div className="container mx-auto text-center items-center grid grid-cols-2">
          <div className="mb-8 mx-auto max-w-full">
            <h1 className="text-4xl md:text-6xl text-sky font-bold mb-4">
              Welcome to the Lost and Found University App
            </h1>
            <p className="text-lg md:text-xl mb-8 text-navy font-medium">
              Never lose your items on campus again!
            </p>
          </div>
          <img
            src={lostingImg}
            alt="Lost and Found University App"
            className="mb-8 mx-auto max-w-full"
          />
        </div>
      </section>

      <div className="p-4">
        <h2 className="text-3xl md:text-4xl font-bold text-navy text-center m-4">
          How It Works
        </h2>
        <HowItWorks />
      </div>
    </div>
  );
}

export default HomePage;
