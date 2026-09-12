import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import BottomNav from './BottomNav';
import { siteConfig } from '../data/siteData';

export default function LoginPage({ onLoginSuccess, onSkip }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess({ email });
    } else if (onSkip) {
      onSkip();
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#050505] font-sans text-white flex flex-col items-center justify-center p-3 sm:p-6 selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* Background Image: Fullscreen on ALL Devices */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src="/app login bg.png"
          alt="Login Background"
          className="w-full h-full object-cover object-center scale-100"
        />
        <div className="absolute inset-0 bg-black/45 backdrop-brightness-95" />
      </div>

      {/* Top Right Guest Profile Switch Button */}
      <div className="fixed top-3 right-3 sm:top-6 sm:right-6 z-50">
        <button
          onClick={() => {
            if (onLoginSuccess) {
              onLoginSuccess({ name: 'Adhithyan V V', registerNumber: 'JEC23AD004' });
            } else if (onSkip) {
              onSkip();
            }
          }}
          type="button"
          className="group flex items-center gap-1.5 px-3 py-1.5 bg-black/85 hover:bg-neutral-900 text-[11px] sm:text-xs text-neutral-200 hover:text-white border border-red-500/40 hover:border-red-500 rounded-full backdrop-blur-md transition-all duration-300 shadow-md cursor-pointer whitespace-nowrap"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-semibold tracking-wide">Guest Login (Adhithyan V V)</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-red-500 shrink-0" />
        </button>
      </div>

      {/* Main Centered Container (Shifted down by 20vh as requested) */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] flex flex-col items-center text-center my-auto mt-[16vh] sm:mt-[20vh] py-4 sm:py-6 px-2 pb-28 sm:pb-32">
        
        {/* AIDA Site Theme Brand Logo */}
        <div className="mb-2 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <img
              src={siteConfig.logo}
              alt="AIDA Logo"
              className="w-7 h-7 sm:w-9 sm:h-9 object-contain drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]"
            />
            <span className="font-sans font-black text-xl sm:text-2xl tracking-tight uppercase text-white whitespace-nowrap">
              AIDA <span className="font-serif italic text-red-500 font-normal lowercase text-2xl sm:text-3xl">jecc</span>
            </span>
          </div>

          {/* Department Subtitle */}
          <p className="text-[9px] sm:text-[10px] tracking-wider font-medium text-neutral-300 uppercase mt-1 whitespace-nowrap">
            DEPARTMENT OF AI &amp; DATA SCIENCE
          </p>
        </div>

        {/* Welcome Back Heading (No Word Breaking!) */}
        <div className="mt-2 mb-3">
          <h1 className="text-sm sm:text-lg tracking-widest font-semibold text-white uppercase whitespace-nowrap">
            WELCOME BACK
          </h1>
          <p className="text-neutral-400 text-[11px] sm:text-xs font-normal mt-1 leading-snug">
            Continue your journey to learn, innovate and impact.
          </p>
        </div>

        {/* Compact Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-2.5">
          {/* Email / Roll Number Input */}
          <div className="relative flex items-center bg-[#0a0c10]/85 border border-neutral-800/90 focus-within:border-neutral-600 focus-within:ring-1 focus-within:ring-red-500/50 rounded-xl px-3 py-2.5 backdrop-blur-md transition-all duration-200 shadow-inner group">
            <User className="w-4 h-4 text-neutral-400 group-focus-within:text-red-400 transition-colors flex-shrink-0" />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email / Roll Number"
              className="w-full bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none ml-2.5 font-normal"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative flex items-center bg-[#0a0c10]/85 border border-neutral-800/90 focus-within:border-neutral-600 focus-within:ring-1 focus-within:ring-red-500/50 rounded-xl px-3 py-2.5 backdrop-blur-md transition-all duration-200 shadow-inner group">
            <Lock className="w-4 h-4 text-neutral-400 group-focus-within:text-red-400 transition-colors flex-shrink-0" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none ml-2.5 font-normal"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-neutral-400 hover:text-white transition-colors focus:outline-none p-1 ml-1"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-3.5 h-3.5 text-neutral-400 hover:text-white" />
              ) : (
                <Eye className="w-3.5 h-3.5 text-neutral-400 hover:text-white" />
              )}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end pt-0 pb-0.5">
            <button
              type="button"
              onClick={() => alert('Password reset instructions will be sent to your email.')}
              className="text-[11px] text-neutral-400 hover:text-white transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-2.5 px-5 rounded-full bg-gradient-to-r from-[#e50914] via-[#ef233c] to-[#d90429] hover:from-[#f10d19] hover:to-[#ed1136] text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,35,60,0.4)] hover:shadow-[0_0_28px_rgba(239,35,60,0.6)] active:scale-[0.99] transition-all duration-300 cursor-pointer border border-red-500/30"
          >
            <span>Sign In</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </form>

        {/* Divider */}
        <div className="w-full flex items-center gap-2.5 my-3.5">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-neutral-800" />
          <span className="text-[10px] sm:text-[11px] text-neutral-500 tracking-wider font-light uppercase whitespace-nowrap">
            or continue with
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-neutral-800 via-neutral-800 to-transparent" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex items-center justify-center gap-3 w-full">
          {/* Google */}
          <button
            type="button"
            onClick={() => onSkip && onSkip()}
            title="Sign in with Google"
            className="w-13 h-9 sm:w-16 sm:h-11 bg-[#0a0c10]/80 border border-neutral-800 hover:border-neutral-600 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-neutral-900/90 active:scale-95 shadow-sm cursor-pointer group"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          </button>

          {/* Microsoft */}
          <button
            type="button"
            onClick={() => onSkip && onSkip()}
            title="Sign in with Microsoft"
            className="w-13 h-9 sm:w-16 sm:h-11 bg-[#0a0c10]/80 border border-neutral-800 hover:border-neutral-600 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-neutral-900/90 active:scale-95 shadow-sm cursor-pointer group"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 23 23">
              <rect x="1" y="1" width="10" height="10" fill="#f25022" />
              <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
              <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
              <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
            </svg>
          </button>

          {/* GitHub */}
          <button
            type="button"
            onClick={() => onSkip && onSkip()}
            title="Sign in with GitHub"
            className="w-13 h-9 sm:w-16 sm:h-11 bg-[#0a0c10]/80 border border-neutral-800 hover:border-neutral-600 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-neutral-900/90 active:scale-95 shadow-sm cursor-pointer group"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-white" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </button>
        </div>

        {/* Create Account Link */}
        <p className="mt-3.5 text-[11px] sm:text-xs text-neutral-400">
          New here?{' '}
          <button
            type="button"
            onClick={() => onSkip && onSkip()}
            className="text-white font-medium hover:underline underline-offset-4 cursor-pointer"
          >
            Create an account
          </button>
        </p>

        {/* Bottom Tagline */}
        <div className="mt-4 text-[9px] sm:text-[10px] tracking-[0.28em] text-neutral-400 uppercase font-medium flex items-center justify-center gap-2 whitespace-nowrap">
          <span>LEARN</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_#ef4444] inline-block" />
          <span>INNOVATE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_#ef4444] inline-block" />
          <span>IMPACT</span>
        </div>
      </div>

      {/* Floating Glass Bottom Navigation Bar */}
      <BottomNav
        activeTab="profile"
        onTabSelect={(tabId, hash) => {
          if (tabId === 'profile') return;
          if (onSkip) onSkip();
          setTimeout(() => {
            window.location.hash = hash;
          }, 50);
        }}
      />
    </div>
  );
}
