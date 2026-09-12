import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  Plus, 
  FileText, 
  Award, 
  BookOpen, 
  Briefcase, 
  FolderGit2,
  AlertCircle
} from 'lucide-react';
import { getSubmissions } from '../utils/submissionStorage';
import GlobalDotField from '../components/GlobalDotField';

export default function SubmissionStatusPage({ onNavigate }) {
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'pending' | 'approved' | 'rejected'

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  const filteredSubmissions = submissions.filter((item) => {
    if (filter === 'ALL') return true;
    return item.status === filter;
  });

  const countPending = submissions.filter((s) => s.status === 'pending').length;
  const countApproved = submissions.filter((s) => s.status === 'approved').length;
  const countRejected = submissions.filter((s) => s.status === 'rejected').length;

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'achievement': return <Award className="w-5 h-5 text-red-400" />;
      case 'publication': return <BookOpen className="w-5 h-5 text-blue-400" />;
      case 'internship': return <Briefcase className="w-5 h-5 text-emerald-400" />;
      case 'project': return <FolderGit2 className="w-5 h-5 text-purple-400" />;
      default: return <FileText className="w-5 h-5 text-neutral-400" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-white font-sans pt-6 pb-28 px-4 sm:px-6 selection:bg-red-600 selection:text-white">
      <GlobalDotField />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10">
          <button
            type="button"
            onClick={() => window.location.hash = '#/dashboard'}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-neutral-900/90 border border-white/15 text-neutral-300 hover:text-white hover:border-white/30 transition-all text-xs font-semibold backdrop-blur-xl whitespace-nowrap"
          >
            <ArrowLeft size={15} />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={() => window.location.hash = '#/upload'}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md whitespace-nowrap"
          >
            <Plus size={15} />
            <span>Upload</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-white/15 rounded-3xl p-5 sm:p-7 backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-wider">
              <Sparkles size={15} />
              <span>CONTENT VERIFICATION LOG</span>
            </div>
            <h1 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
              Submission Status &amp; Approvals
            </h1>
            <p className="text-xs text-neutral-400 max-w-xl">
              Real-time department verification status for uploaded records.
            </p>
          </div>

          {/* Quick Counter Pills */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold whitespace-nowrap">
              <Clock size={13} />
              <span>{countPending} Pending</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold whitespace-nowrap">
              <CheckCircle2 size={13} />
              <span>{countApproved} Approved</span>
            </div>
          </div>
        </div>

        {/* Status Filter Tabs (Overflow Safe) */}
        <div className="w-full overflow-x-auto no-scrollbar flex items-center gap-1.5 py-1">
          {[
            { id: 'ALL', label: `All (${submissions.length})` },
            { id: 'pending', label: `🟡 Pending (${countPending})` },
            { id: 'approved', label: `🟢 Approved (${countApproved})` },
            { id: 'rejected', label: `🔴 Rejected (${countRejected})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                filter === tab.id
                  ? 'bg-white text-black font-bold shadow'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {filteredSubmissions.length === 0 ? (
            <div className="bg-neutral-950/80 border border-white/10 rounded-3xl p-10 text-center space-y-3">
              <AlertCircle size={40} className="text-neutral-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No submissions found</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                No items match the selected filter criteria. Use the Upload Portal to log your achievements.
              </p>
              <button
                type="button"
                onClick={() => window.location.hash = '#/upload'}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 text-white text-xs font-bold hover:bg-red-500 transition-all shadow-md"
              >
                <Plus size={16} /> Submit Content Now
              </button>
            </div>
          ) : (
            filteredSubmissions.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-950/90 border border-white/15 rounded-3xl p-5 sm:p-6 backdrop-blur-3xl shadow-xl flex flex-col sm:flex-row gap-5 items-start justify-between group hover:border-white/30 transition-all"
              >
                <div className="flex gap-4 items-start flex-1">
                  {/* Thumbnail / Category Badge */}
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl border border-white/15 shrink-0 bg-neutral-900"
                    />
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-neutral-900 border border-white/15 flex items-center justify-center shrink-0">
                      {getCategoryIcon(item.category)}
                    </div>
                  )}

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                        {item.projectType || item.category}
                      </span>
                      <span className="text-[11px] text-neutral-500 font-mono">
                        Submitted: {item.date}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>

                    {item.details && (
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {item.details}
                      </p>
                    )}

                    {/* Status Feedback Note */}
                    <div className="pt-1.5 flex items-center gap-2 text-xs">
                      <span className="text-neutral-400">Coordinator Note:</span>
                      <span className="text-neutral-200 font-medium italic">"{item.statusNote}"</span>
                    </div>
                  </div>
                </div>

                {/* Status Indicator Badge */}
                <div className="shrink-0 sm:self-center">
                  {item.status === 'pending' && (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                      <Clock size={14} className="animate-spin text-amber-400" />
                      PENDING REVIEW
                    </span>
                  )}
                  {item.status === 'approved' && (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      APPROVED
                    </span>
                  )}
                  {item.status === 'rejected' && (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(239,68,68,0.2)]">
                      <XCircle size={14} className="text-red-400" />
                      REJECTED
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
