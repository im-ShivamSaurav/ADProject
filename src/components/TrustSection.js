import React from 'react';
import image from '../assets/homePageCircularImage.png';

const TrustSection = () => {
  return (
    <div className="trust-section bg-white py-12 px-6 md:px-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
        Trust with confidence
      </h2>

      <div className="trust-content flex flex-col md:flex-row md:gap-12">

        <div className="trust-text md:w-1/2 space-y-8">
          <div className="trust-item">
            <h3 className="text-xl font-semibold text-gray-900">Customer-first always</h3>
            <p className="text-gray-600">
              That’s why 1.5+ crore customers trust Zerodha with ₹4.5+ lakh crores of equity
              investments and contribute to 15% of daily retail exchange volumes in India.
            </p>
          </div>
          <div className="trust-item">
            <h3 className="text-xl font-semibold text-gray-900">No spam or gimmicks</h3>
            <p className="text-gray-600">
              No gimmicks, spam, "gamification," or annoying push notifications. High-quality apps
              that you use at your pace, the way you like.
            </p>
          </div>
          <div className="trust-item">
            <h3 className="text-xl font-semibold text-gray-900">The Zerodha universe</h3>
            <p className="text-gray-600">
              Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer
              you tailored services specific to your needs.
            </p>
          </div>
          <div className="trust-item">
            <h3 className="text-xl font-semibold text-gray-900">Do better with money</h3>
            <p className="text-gray-600">
              With initiatives like Nudge and Kill Switch, we don’t just facilitate transactions but
              actively help you do better with your money.
            </p>
          </div>
        </div>

        <img src={image} alt="Logo " width={500} height={100}></img>
      </div>


      <div className="trust-links flex justify-center space-x-8 mt-10">
        <a href="#products" className="text-blue-600 font-semibold hover:underline">
          Explore our products →
        </a>
        <a href="#kite-demo" className="text-blue-600 font-semibold hover:underline">
          Try Kite demo →
        </a>
      </div>


      <div className="trust-partners flex justify-center space-x-4 mt-8 text-gray-500 text-sm">
        <span>The Economic Times</span>
        <span>Forbes</span>
        <span>Business Line</span>
        <span>The Hindu</span>
        <span>Live Mint</span>
      </div>
    </div>
  );
};

export default TrustSection;
