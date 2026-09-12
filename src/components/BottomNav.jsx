import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, LayoutDashboard, Plus, Sparkles, User } from 'lucide-react';

export default function BottomNav({ activeTab = 'home', onTabSelect }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', icon: Home, hash: '#home', label: 'Home' },
    { id: 'dashboard', icon: LayoutDashboard, hash: '#/dashboard', label: 'Student Dashboard' },
    { id: 'add', icon: Plus, hash: '#/upload', isAdd: true, label: 'Upload Content' },
    { id: 'status', icon: Sparkles, hash: '#/status', isStatus: true, label: 'Submissions & Status' },
    { id: 'profile', icon: User, hash: '#/login', label: 'Account Profile' },
  ];

  const handleItemClick = (e, item) => {
    e.preventDefault();

    if (onTabSelect) {
      onTabSelect(item.id, item.hash);
    } else {
      if (item.hash.startsWith('#/')) {
        window.location.hash = item.hash;
      } else {
        if (window.location.hash.startsWith('#/')) {
          window.location.hash = item.hash;
        } else {
          const el = document.getElementById(item.id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.hash = item.hash;
          }
        }
      }
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[88vw] max-w-[320px] pointer-events-auto">
      <nav
        aria-label="Apple Glass Bottom Navigation"
        className="relative bg-neutral-950/80 border border-white/15 rounded-full px-2 py-1.5 backdrop-blur-3xl backdrop-saturate-200 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_0_rgba(255,255,255,0.22)] flex items-center justify-between overflow-hidden"
      >
        {/* Apple Glass Top Specular Highlight */}
        <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isAddBtn = item.isAdd;

          return (
            <button
              key={item.id}
              onClick={(e) => handleItemClick(e, item)}
              type="button"
              title={item.label}
              className={`relative w-11 h-11 flex items-center justify-center transition-all duration-300 group cursor-pointer select-none rounded-full ${
                isAddBtn ? 'bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 shadow-[0_0_12px_rgba(239,68,68,0.25)]' : ''
              }`}
            >
              {/* Apple Sliding Glass Active Pill Indicator */}
              {isActive && !isAddBtn && (
                <motion.div
                  layoutId="appleNavActivePill"
                  className="absolute inset-0 bg-white/[0.12] border border-white/20 rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}

              {/* Icon Only */}
              <div className="relative z-10 flex items-center justify-center">
                {isAddBtn ? (
                  <div
                    style={{
                      transform: `rotate(${scrollY * 0.45}deg)`,
                      transformOrigin: 'center center',
                    }}
                    className="flex items-center justify-center text-red-500 group-hover:text-red-400 group-hover:scale-110 transition-transform duration-100 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                  >
                    <Plus className="w-6 h-6 stroke-[2.5]" />
                  </div>
                ) : item.isStatus ? (
                  <Icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive
                        ? 'text-red-500 stroke-[2.25] scale-110 drop-shadow-[0_0_10px_rgba(239,68,68,0.9)]'
                        : 'text-red-400/80 group-hover:text-red-400 stroke-[1.75]'
                    }`}
                  />
                ) : (
                  <Icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive
                        ? 'text-red-500 stroke-[2.25] scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]'
                        : 'text-neutral-400 group-hover:text-white stroke-[1.75]'
                    }`}
                  />
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}


