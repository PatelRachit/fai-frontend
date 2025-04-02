import React from "react";
import diabetesImage from "../../assets/image.jpg";

const UserDetailsForm = () => {
  return (
    <>
      <section className="relative w-full h-screen flex items-center justify-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={diabetesImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Container */}
        <div className="relative z-10 bg-white bg-opacity-80 rounded-lg p-8 shadow-lg w-full max-w-md right-16">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font text-center">
            Diabetes Prediction 
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600 text-center">
          Know Your Risk, Take Control – Predict Diabetes Before It Strikes!
          </p>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-600"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Submit
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Chicharrones blog helvetica normcore iceland tousled brook viral
            artisan.
          </p>
        </div>
      </section>
    </>
  );
};

export default UserDetailsForm;
