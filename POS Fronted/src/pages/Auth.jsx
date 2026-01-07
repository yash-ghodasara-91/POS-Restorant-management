import React, { useState } from 'react'
import restaurant from '../assets/images/restaurant-img.jpg'
import logo from '../assets/images/logo.png'
import Register from '../components/auth/Register'
import Login from '../components/auth/Login'

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">

      {/* LEFT SECTION (same design, hide on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">

        <img
          className="w-full h-full object-cover"
          src={restaurant}
          alt="Restaurant"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80"></div>

        {/* Quote */}
        <blockquote className="absolute bottom-10 px-10 mb-10 text-2xl italic text-white leading-relaxed">
          "Serve customers the best food with prompt and
          friendly service in a welcoming atmosphere, and they'll keep coming back."
          <br />
          <span className="block mt-4 text-yellow-400">
            - Founder of Restro
          </span>
        </blockquote>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/2 min-h-screen bg-[#1a1a1a] p-8 flex flex-col justify-center">

        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={logo}
            alt="Restro Logo"
            className="h-14 w-14 border-2 rounded-full p-1"
          />
          <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">
            Restro
          </h1>
        </div>

        {/* Heading */}
        <h2 className="text-4xl text-center mt-10 font-semibold text-yellow-400 mb-10">
          {isRegister ? "Employee Registration" : "Employee Login"}
        </h2>

        {/* FORM AREA (INPUT SIZE SAME) */}
        <div className="w-full max-w-xl mx-auto">
          {isRegister ? (
            <Register setIsRegister={setIsRegister} />
          ) : (
            <Login />
          )}
        </div>

        {/* Toggle */}
        <div className="flex justify-center mt-6">
          <p className="text-sm text-[#ababab]">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-yellow-400 pl-1 font-semibold hover:underline"
            >
              {isRegister ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Auth
