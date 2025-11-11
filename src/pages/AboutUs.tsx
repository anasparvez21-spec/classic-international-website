import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import React from "react";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* Hero Section with Overlay Text */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/leather-craft.jpg')",
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        {/* Overlay Text */}
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center text-white flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-bold font-cormorant mb-4 mt-8 md:mt-0 text-leather-tan drop-shadow-lg uppercase tracking-wide" style={{letterSpacing: '0.1em', color: '#f5e3c3'}}>
            About Us
          </h1>
          <div className="space-y-6 text-lg md:text-xl font-lato leading-relaxed w-full">
            <p className="text-2xl md:text-3xl font-semibold mb-8">
              Passion for quality Leather, a cornerstone of the leather industry for generations.
            </p>
            <p className="text-lg md:text-xl mb-6">
              As one of the oldest manufacturers and suppliers, we have built our reputation on two unwavering principles: exceptional quality and absolute honesty.
            </p>
            <p className="text-lg md:text-xl">
              Our time-honored expertise allows us to deliver consistent, superior products that meet the most demanding standards. We believe in building lasting partnerships with our clients, founded on trust and a shared passion for quality leather.
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="relative rounded-lg shadow-lg overflow-hidden min-h-[280px] flex items-center justify-center">
              {/* Background Image */}
              <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('/heritage-bg.jpg')"}}></div>
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              {/* Content */}
              <div className="relative z-10 p-8 text-white text-center w-full">
                <h2 className="text-2xl font-semibold mb-4 font-cormorant">Our Heritage</h2>
                <p className="text-lg font-lato leading-relaxed">
                  {/* Heritage content can go here */}
                </p>
              </div>
            </div>

            <div className="relative rounded-lg shadow-lg overflow-hidden min-h-[280px] flex items-center justify-center">
              {/* Background Image */}
              <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('/mission-bg.jpg')"}}></div>
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              {/* Content */}
              <div className="relative z-10 p-8 text-white text-center w-full">
                <h2 className="text-2xl font-semibold mb-4 font-cormorant">Our Mission</h2>
                <p className="text-lg font-lato leading-relaxed">
                  To provide the finest leather products that combine traditional craftsmanship with modern innovation, ensuring every piece meets the highest standards of quality and durability.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg shadow-sm mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-gray-800 font-cormorant text-center">Our Product Range</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2 text-lg">Luxury Leather Carpets</h3>
                <p className="text-gray-600">Premium authentic fur carpets</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2 text-lg">Premium Leather Bags</h3>
                <p className="text-gray-600">Handcrafted bags and briefcases</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2 text-lg">Leather Footwear</h3>
                <p className="text-gray-600">Quality shoes and boots</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2 text-lg">Prayer Mats</h3>
                <p className="text-gray-600">Traditional Janamaz</p>
              </div>
            </div>
          </div>

          <div className="text-center bg-white border border-gray-200 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800 font-cormorant">Why Choose Us?</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="p-6">
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">Quality Assurance</h3>
                <p className="text-gray-600">Every product undergoes rigorous quality checks</p>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">Traditional Craftsmanship</h3>
                <p className="text-gray-600">Time-tested techniques passed down through generations</p>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">Global Reach</h3>
                <p className="text-gray-600">Serving customers worldwide with reliable shipping</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-2xl font-semibold text-gray-800 mb-6 font-cormorant">
              Partner with us and experience the difference that a true legacy in leather can make.
            </p>
            
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
              <a 
                href="https://wa.me/919721457228" 
                className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition font-semibold text-lg shadow-lg"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Contact via WhatsApp
              </a>
              <a 
                href="mailto:classicinternationalknp@gmail.com" 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;