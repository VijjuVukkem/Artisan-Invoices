// src/pages/Login.tsx

import React from "react";

export default function Login() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/background.png')", // replace with your image path
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00000080] to-[#00000040] backdrop-blur-sm"></div>

      {/* Login Card */}
      <div className="z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20">
        <div className="flex flex-col items-center space-y-4">
          <img src="/logo.png" alt="Artisan Logo" className="w-24 h-24" />
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
        </div>
        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-white mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-white mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold shadow-lg"
          >
            Sign In
          </button>
          {/* <p className="text-center text-white text-sm mt-4">
            Don't have an account?{' '}
            <a href="/register" className="underline hover:text-blue-300">
              Sign up
            </a>
          </p> */}
        </form>
      </div>
    </div>
  );
}