import React from "react";
import Hero from "./_components/Hero";
import Features from "./_components/Features";


const page = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-7">
      <div className="space-y-32">
        <Hero />
        <Features />
      </div>
    </div>
  );
};

export default page;
