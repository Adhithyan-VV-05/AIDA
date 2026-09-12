import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Award, 
  FolderGit2, 
  BookOpen, 
  Sparkles, 
  Plus, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Bell, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  Zap,
  ExternalLink,
  Briefcase
} from 'lucide-react';
import { getSubmissions } from '../utils/submissionStorage';
import GlobalDotField from '../components/GlobalDotField';

export default function StudentDashboardPage({ onNavigate }) {
  const [submissions, setSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState('ALL');

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  const pendingCount = submissions.filter((s) => s.status === 'pending').length;

  return (
    <div className="relative min-h-screen bg-[#080808] text-white font-sans pt-6 pb-28 px-4 sm:px-6 selection:bg-red-600 selection:text-white">
      <GlobalDotField />

      <div className="relative z-10 max-w-5xl mx-auto space-y-6">
        
        {/* STUDENT PROFILE HEADER CARD */}
        <div className="bg-neutral-950/90 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/10 blur-3xl rounded-full pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            
            {/* Student Bio & Avatar */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 p-0.5 shadow-[0_0_25px_rgba(239,68,68,0.4)]">
                  <div className="w-full h-full bg-neutral-950 rounded-[22px] flex items-center justify-center overflow-hidden">
                    <span className="font-serif italic font-extrabold text-2xl sm:text-3xl text-red-500">
                      AV
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-neutral-950 flex items-center justify-center" title="Active Student Profile">
                  <CheckCircle2 size={12} className="text-black" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Adhithyan V V
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 font-mono text-[11px] font-bold">
                    JEC23AD004
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 font-medium mt-1">
                  B.Tech Artificial Intelligence &amp; Data Science • <span className="text-red-400">Semester 6</span>
                </p>

                <div className="flex items-center gap-3 mt-2 text-[11px] font-mono text-neutral-400 flex-wrap">
                  <span>Jyothi Engineering College (JECC)</span>
                  <span>•</span>
                  <span>Batch 2023–2027</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">SGPA: 9.20</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons (Minimal text, no line wrapping) */}
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
              <button
                type="button"
                onClick={() => window.location.hash = '#/upload'}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus size={15} />
                <span>Upload</span>
              </button>

              <button
                type="button"
                onClick={() => window.location.hash = '#/status'}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-neutral-900/90 border border-white/15 hover:border-red-500/50 text-neutral-200 hover:text-white text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
              >
                <Sparkles size={14} className="text-red-400" />
                <span>Status ({pendingCount})</span>
              </button>
            </div>

          </div>
        </div>

        {/* KTU ACTIVITY POINTS WIDGET & LIVE DEPT UPDATES ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* KTU Activity Points Summary Card (2 Cols on Desktop) */}
          <div className="md:col-span-2 bg-neutral-950/90 border border-white/15 rounded-3xl p-5 sm:p-6 backdrop-blur-3xl shadow-xl space-y-4 overflow-hidden">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-red-500 shrink-0" />
                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  KTU Activity Points Summary
                </h2>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 whitespace-nowrap">
                75 / 100 PTS
              </span>
            </div>

            {/* Main Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-neutral-400">
                <span>Degree Progress</span>
                <span className="text-white font-bold">75%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-neutral-900 border border-white/10 overflow-hidden p-0.5">
                <div className="h-full rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-emerald-400 transition-all duration-1000 w-[75%]" />
              </div>
            </div>

            {/* Points Category Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="bg-neutral-900/90 p-2.5 rounded-2xl border border-white/10 text-center">
                <Zap className="w-4 h-4 text-red-400 mx-auto mb-1" />
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">Hackathons</span>
                <span className="text-xs font-extrabold text-white">30 Pts</span>
              </div>
              <div className="bg-neutral-900/90 p-2.5 rounded-2xl border border-white/10 text-center">
                <Award className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">Tech Fests</span>
                <span className="text-xs font-extrabold text-white">25 Pts</span>
              </div>
              <div className="bg-neutral-900/90 p-2.5 rounded-2xl border border-white/10 text-center">
                <BookOpen className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">NPTEL</span>
                <span className="text-xs font-extrabold text-white">15 Pts</span>
              </div>
              <div className="bg-neutral-900/90 p-2.5 rounded-2xl border border-white/10 text-center">
                <TrendingUp className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">Sports/Arts</span>
                <span className="text-xs font-extrabold text-white">5 Pts</span>
              </div>
            </div>
          </div>

          {/* Live Department Updates & Announcements (Small Area) */}
          <div className="bg-neutral-950/90 border border-white/15 rounded-3xl p-5 sm:p-6 backdrop-blur-3xl shadow-xl space-y-3 overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-red-500 animate-bounce shrink-0" />
                <h2 className="text-xs font-bold text-white tracking-tight uppercase font-mono">
                  LIVE DEPT UPDATES
                </h2>
              </div>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            </div>

            {/* Ticker Feed */}
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-red-950/20 border border-red-500/20 text-xs space-y-1">
                <div className="flex items-center justify-between text-[10px] text-red-400 font-mono font-bold">
                  <span>ASTRA 2026</span>
                  <span>OCT 15</span>
                </div>
                <p className="text-white font-medium text-[11px] leading-tight">
                  State Level Hackathon registrations open.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-white/10 text-xs space-y-1">
                <div className="flex items-center justify-between text-[10px] text-blue-400 font-mono font-bold">
                  <span>YODHA 2.0</span>
                  <span>OCT 28</span>
                </div>
                <p className="text-white font-medium text-[11px] leading-tight">
                  National Hackathon problem statements out.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* MY UPLOADED CONTENTS & ACHIEVEMENTS SHOWCASE */}
        <div className="bg-neutral-950/90 border border-white/15 rounded-3xl p-5 sm:p-7 backdrop-blur-3xl shadow-xl space-y-5 overflow-hidden">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                My Uploaded Records
              </h2>
              <p className="text-[11px] text-neutral-400">
                Log of achievements, publications, placements &amp; projects
              </p>
            </div>

            {/* Overflow-safe filter pills */}
            <div className="w-full sm:w-auto overflow-x-auto no-scrollbar flex items-center gap-1.5 py-1">
              {['ALL', 'Projects', 'Hackathons', 'Publications', 'Placements'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap shrink-0 ${
                    activeTab === cat
                      ? 'bg-red-600 text-white font-bold shadow'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Submissions Display Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {submissions
              .filter((item) => activeTab === 'ALL' || item.tag === activeTab || item.category === activeTab.toLowerCase())
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-neutral-900/90 border border-white/10 rounded-2xl p-4 hover:border-red-500/40 transition-all flex gap-4 items-start group"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-xl border border-white/10 shrink-0 bg-neutral-950"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-neutral-950 border border-white/10 flex items-center justify-center shrink-0">
                      <FolderGit2 className="w-8 h-8 text-neutral-500" />
                    </div>
                  )}

                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider bg-red-500/10 px-2 py-0.5 rounded-md border border-red-500/20 whitespace-nowrap truncate max-w-[110px]">
                        {item.projectType || item.tag || item.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                        item.status === 'approved' 
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      }`}>
                        {item.status === 'approved' ? '✓ APPROVED' : '🟡 PENDING'}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {item.details || item.description}
                    </p>

                    <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                      <span>Log Date: {item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

        </div>

      </div>
    </div>
  );
}
