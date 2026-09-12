import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Upload, 
  Award, 
  BookOpen, 
  Briefcase, 
  FolderGit2, 
  CheckCircle2, 
  Trash2, 
  Sparkles,
  Layers,
  FileText,
  UserCheck,
  Plus
} from 'lucide-react';
import { addSubmission } from '../utils/submissionStorage';
import GlobalDotField from '../components/GlobalDotField';

export default function UploadPage({ onNavigate }) {
  // Navigation step: 'select_category' | 'select_project_type' | 'form' | 'success'
  const [step, setStep] = useState('select_category');
  
  // Category states
  const [selectedCategory, setSelectedCategory] = useState(null); // 'achievement' | 'publication' | 'internship' | 'project'
  const [projectSubType, setProjectSubType] = useState(null); // 'Main Project' | 'Mini Project' | 'Micro Project'
  
  const [submittedItem, setSubmittedItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // File preview states
  const [imagePreview, setImagePreview] = useState(null);
  const [demoImagePreview, setDemoImagePreview] = useState(null);

  // Forms data
  const [achievementForm, setAchievementForm] = useState({
    studentName: 'Adhithyan V V',
    registerNumber: 'JEC23AD004',
    semester: 'Semester 6',
    title: '',
    tag: 'Hackathons',
    level: '1st Prize',
    year: '2026',
    description: '',
  });

  const [publicationForm, setPublicationForm] = useState({
    paperTitle: '',
    authors: 'Adhithyan V V, Mr. Shine P Xavier',
    publicationType: 'Journal',
    venue: '',
    publisher: '',
    year: '2026',
    doiUrl: '',
    abstract: '',
  });

  const [internshipForm, setInternshipForm] = useState({
    studentName: 'Adhithyan V V',
    registerNumber: 'JEC23AD004',
    company: '',
    role: '',
    type: 'Internship',
    batch: '2023–2027',
    stipend: '',
    description: '',
  });

  const [projectForm, setProjectForm] = useState({
    title: '',
    batch: '2023–2027',
    techStack: 'React.js, Python, PyTorch, FastAPI',
    guideName: 'Shine P Xavier',
    githubUrl: '',
    contactEmail: 'adhithyanvv.ad23@jecc.ac.in',
    abstract: '',
  });

  const [teamMembers, setTeamMembers] = useState([
    { name: 'Adhithyan V V', registerNumber: 'JEC23AD004', isLeader: true }
  ]);

  // Image Upload Handler
  const handleImageChange = (e, setPreviewFn) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFn(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Team Member Handlers
  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: '', registerNumber: '', isLeader: false }]);
  };

  const removeTeamMember = (index) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const updateTeamMember = (index, field, value) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  // Category Selection
  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'project') {
      setStep('select_project_type');
    } else {
      setStep('form');
    }
  };

  // Project Type Selection
  const handleSelectProjectType = (type) => {
    setProjectSubType(type);
    setStep('form');
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      let submissionPayload = {
        category: selectedCategory,
        image: imagePreview || '/achievements/Astra 1st price.webp',
      };

      if (selectedCategory === 'achievement') {
        submissionPayload = { ...submissionPayload, ...achievementForm, tag: achievementForm.tag };
      } else if (selectedCategory === 'publication') {
        submissionPayload = { ...submissionPayload, ...publicationForm, title: publicationForm.paperTitle, tag: 'Publications' };
      } else if (selectedCategory === 'internship') {
        submissionPayload = { ...submissionPayload, ...internshipForm, title: `${internshipForm.role} at ${internshipForm.company}`, tag: 'Placements' };
      } else if (selectedCategory === 'project') {
        submissionPayload = { 
          ...submissionPayload, 
          ...projectForm, 
          projectType: projectSubType, 
          teamMembers,
          demoImage: demoImagePreview,
          tag: 'Projects'
        };
      }

      const created = addSubmission(submissionPayload);
      setSubmittedItem(created);
      setIsSubmitting(false);
      setStep('success');
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-white font-sans pt-6 pb-28 px-4 sm:px-6 selection:bg-red-600 selection:text-white">
      <GlobalDotField />

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <button
            type="button"
            onClick={() => {
              if (step === 'form' && selectedCategory === 'project') {
                setStep('select_project_type');
              } else if (step === 'select_project_type' || step === 'form') {
                setStep('select_category');
              } else {
                window.location.hash = '#/dashboard';
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-white/15 text-neutral-300 hover:text-white hover:border-white/30 transition-all text-xs font-semibold backdrop-blur-xl whitespace-nowrap"
          >
            <ArrowLeft size={15} />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2 bg-red-950/40 border border-red-500/30 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-red-400">
            <Sparkles size={14} />
            <span>AIDA UPLOAD PORTAL</span>
          </div>
        </div>

        {/* Page Title & Header Banner */}
        <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-red-600/10 blur-3xl rounded-full pointer-events-none" />
          <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
            Student Data & Content Upload Portal
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
            Submit your latest academic achievements, research publications, campus placements, or engineering projects for official department verification and site showcase.
          </p>
        </div>

        {/* STEP 1: CATEGORY SELECTION */}
        {step === 'select_category' && (
          <div className="space-y-4">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-neutral-400 px-1">
              Select Submission Category
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Achievement */}
              <button
                type="button"
                onClick={() => handleSelectCategory('achievement')}
                className="group relative p-6 rounded-3xl bg-neutral-900/80 border border-white/15 hover:border-red-500/60 hover:bg-neutral-900 transition-all text-left flex flex-col justify-between shadow-xl backdrop-blur-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 group-hover:scale-110 transition-transform">
                    <Award size={30} />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
                    HONORS & AWARDS
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                    Add New Achievement
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                    Upload certificates from Hackathons, Coding contests, Sports, NPTEL Elite badges, and Arts competitions.
                  </p>
                </div>
              </button>

              {/* Publications */}
              <button
                type="button"
                onClick={() => handleSelectCategory('publication')}
                className="group relative p-6 rounded-3xl bg-neutral-900/80 border border-white/15 hover:border-blue-500/60 hover:bg-neutral-900 transition-all text-left flex flex-col justify-between shadow-xl backdrop-blur-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 group-hover:scale-110 transition-transform">
                    <BookOpen size={30} />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                    RESEARCH PAPERS
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    Add Publications
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                    Submit published Scopus/IEEE conference papers, international journal articles, and book chapters.
                  </p>
                </div>
              </button>

              {/* Internship Details */}
              <button
                type="button"
                onClick={() => handleSelectCategory('internship')}
                className="group relative p-6 rounded-3xl bg-neutral-900/80 border border-white/15 hover:border-emerald-500/60 hover:bg-neutral-900 transition-all text-left flex flex-col justify-between shadow-xl backdrop-blur-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Briefcase size={30} />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    CAREER & OFFERS
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Add Internship Details
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                    Log company internships, full-time campus placement offers, PPO conversions, and industrial training.
                  </p>
                </div>
              </button>

              {/* Upload Project */}
              <button
                type="button"
                onClick={() => handleSelectCategory('project')}
                className="group relative p-6 rounded-3xl bg-neutral-900/80 border border-white/15 hover:border-purple-500/60 hover:bg-neutral-900 transition-all text-left flex flex-col justify-between shadow-xl backdrop-blur-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 group-hover:scale-110 transition-transform">
                    <FolderGit2 size={30} />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                    PROJECT SHOWCASE
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                    Upload Project
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                    Submit Main Capstone Projects, Mini Projects, or Micro Projects with source code & demo previews.
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROJECT SUB-TYPE SELECTION */}
        {step === 'select_project_type' && (
          <div className="bg-neutral-950/90 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-3xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" />
                Select Project Category Level
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Choose the scope of project you are submitting to the department showcase:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Main Project */}
              <button
                type="button"
                onClick={() => handleSelectProjectType('Main Project')}
                className="group p-6 rounded-2xl bg-neutral-900/80 border border-white/15 hover:border-purple-500 hover:bg-neutral-900 transition-all text-center flex flex-col items-center justify-center gap-3 shadow-lg"
              >
                <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                  <FolderGit2 size={32} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-purple-400">Main Project</h3>
                  <p className="text-xs text-neutral-400 mt-1">Final Year Capstone & AI Systems</p>
                </div>
              </button>

              {/* Mini Project */}
              <button
                type="button"
                onClick={() => handleSelectProjectType('Mini Project')}
                className="group p-6 rounded-2xl bg-neutral-900/80 border border-white/15 hover:border-blue-500 hover:bg-neutral-900 transition-all text-center flex flex-col items-center justify-center gap-3 shadow-lg"
              >
                <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                  <Layers size={32} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400">Mini Project</h3>
                  <p className="text-xs text-neutral-400 mt-1">Semester 5 & 6 Core Domain Work</p>
                </div>
              </button>

              {/* Micro Project */}
              <button
                type="button"
                onClick={() => handleSelectProjectType('Micro Project')}
                className="group p-6 rounded-2xl bg-neutral-900/80 border border-white/15 hover:border-amber-500 hover:bg-neutral-900 transition-all text-center flex flex-col items-center justify-center gap-3 shadow-lg"
              >
                <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                  <FileText size={32} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400">Micro Project</h3>
                  <p className="text-xs text-neutral-400 mt-1">Semester 3 & 4 Fundamental Prototypes</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DYNAMIC CATEGORY FORM */}
        {step === 'form' && (
          <div className="bg-neutral-950/90 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-3xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Form Category Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Submit {selectedCategory === 'project' ? projectSubType : selectedCategory.toUpperCase()} Record
                  </h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Logged under student profile <span className="text-white font-semibold">Adhithyan V V (JEC23AD004)</span>
                  </p>
                </div>

                {selectedCategory === 'project' && (
                  <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
                    {projectSubType}
                  </span>
                )}
              </div>

              {/* A. ACHIEVEMENT FORM */}
              {selectedCategory === 'achievement' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Student Full Name *</label>
                      <input
                        type="text"
                        required
                        value={achievementForm.studentName}
                        onChange={(e) => setAchievementForm({ ...achievementForm, studentName: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">KTU Register Number *</label>
                      <input
                        type="text"
                        required
                        value={achievementForm.registerNumber}
                        onChange={(e) => setAchievementForm({ ...achievementForm, registerNumber: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Semester *</label>
                      <select
                        value={achievementForm.semester}
                        onChange={(e) => setAchievementForm({ ...achievementForm, semester: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                      >
                        {['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'].map((s) => (
                          <option key={s} value={s} className="bg-neutral-900 text-white">{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Category Tag *</label>
                      <select
                        value={achievementForm.tag}
                        onChange={(e) => setAchievementForm({ ...achievementForm, tag: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                      >
                        {['Hackathons', 'Academic Achievement', 'Extracurricular', 'Arts', 'Sports', 'NPTEL', 'Workshop'].map((t) => (
                          <option key={t} value={t} className="bg-neutral-900 text-white">{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Award Level *</label>
                      <input
                        type="text"
                        required
                        value={achievementForm.level}
                        onChange={(e) => setAchievementForm({ ...achievementForm, level: e.target.value })}
                        placeholder="1st Prize / Gold Medal"
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Achievement Title *</label>
                    <input
                      type="text"
                      required
                      value={achievementForm.title}
                      onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })}
                      placeholder="e.g. 1st Prize – ASTRA State Level Hackathon 2026"
                      className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Detailed Description *</label>
                    <textarea
                      rows={3}
                      required
                      value={achievementForm.description}
                      onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })}
                      placeholder="Provide event details, host institution, cash prizes, and key project highlights..."
                      className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors resize-none"
                    />
                  </div>
                </>
              )}

              {/* B. PUBLICATION FORM */}
              {selectedCategory === 'publication' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Research Paper Title *</label>
                    <input
                      type="text"
                      required
                      value={publicationForm.paperTitle}
                      onChange={(e) => setPublicationForm({ ...publicationForm, paperTitle: e.target.value })}
                      placeholder="e.g. Intelligent AI Security Systems for Data Privacy in Edge Computing"
                      className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Authors / Contributors *</label>
                      <input
                        type="text"
                        required
                        value={publicationForm.authors}
                        onChange={(e) => setPublicationForm({ ...publicationForm, authors: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Publication Type *</label>
                      <select
                        value={publicationForm.publicationType}
                        onChange={(e) => setPublicationForm({ ...publicationForm, publicationType: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        {['Journal', 'IEEE Conference', 'Book Chapter', 'Workshop Paper'].map((t) => (
                          <option key={t} value={t} className="bg-neutral-900 text-white">{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Conference / Journal Venue *</label>
                      <input
                        type="text"
                        required
                        value={publicationForm.venue}
                        onChange={(e) => setPublicationForm({ ...publicationForm, venue: e.target.value })}
                        placeholder="e.g. IEEE ADSSSC 2026 Conference"
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Publisher *</label>
                      <input
                        type="text"
                        required
                        value={publicationForm.publisher}
                        onChange={(e) => setPublicationForm({ ...publicationForm, publisher: e.target.value })}
                        placeholder="IEEE / Springer / Elsevier"
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">DOI / Direct Link</label>
                      <input
                        type="url"
                        value={publicationForm.doiUrl}
                        onChange={(e) => setPublicationForm({ ...publicationForm, doiUrl: e.target.value })}
                        placeholder="https://doi.org/10.1109/..."
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Publication Year *</label>
                      <input
                        type="text"
                        required
                        value={publicationForm.year}
                        onChange={(e) => setPublicationForm({ ...publicationForm, year: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Abstract / Executive Summary</label>
                    <textarea
                      rows={3}
                      value={publicationForm.abstract}
                      onChange={(e) => setPublicationForm({ ...publicationForm, abstract: e.target.value })}
                      placeholder="Outline research contribution, algorithms used, and experimental results..."
                      className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>
                </>
              )}

              {/* C. INTERNSHIP FORM */}
              {selectedCategory === 'internship' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Company / Employer Name *</label>
                      <input
                        type="text"
                        required
                        value={internshipForm.company}
                        onChange={(e) => setInternshipForm({ ...internshipForm, company: e.target.value })}
                        placeholder="e.g. TechySpot LLP / Infosys"
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Job Role / Designation *</label>
                      <input
                        type="text"
                        required
                        value={internshipForm.role}
                        onChange={(e) => setInternshipForm({ ...internshipForm, role: e.target.value })}
                        placeholder="e.g. AI Research Engineer Intern"
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Engagement Type *</label>
                      <select
                        value={internshipForm.type}
                        onChange={(e) => setInternshipForm({ ...internshipForm, type: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      >
                        {['Internship', 'Full-time Placement', 'PPO Conversion', 'Industrial Training'].map((t) => (
                          <option key={t} value={t} className="bg-neutral-900 text-white">{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Batch *</label>
                      <input
                        type="text"
                        required
                        value={internshipForm.batch}
                        onChange={(e) => setInternshipForm({ ...internshipForm, batch: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Stipend / CTC Package</label>
                      <input
                        type="text"
                        value={internshipForm.stipend}
                        onChange={(e) => setInternshipForm({ ...internshipForm, stipend: e.target.value })}
                        placeholder="₹15,000 / mo or 6.5 LPA"
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Key Responsibilities & Summary</label>
                    <textarea
                      rows={3}
                      value={internshipForm.description}
                      onChange={(e) => setInternshipForm({ ...internshipForm, description: e.target.value })}
                      placeholder="Outline company projects, machine learning models deployed, and domain skills acquired..."
                      className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                    />
                  </div>
                </>
              )}

              {/* D. PROJECT FORM */}
              {selectedCategory === 'project' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="e.g. HireFlow AI – Job Recruiting Automation System"
                      className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Academic Batch *</label>
                      <input
                        type="text"
                        required
                        value={projectForm.batch}
                        onChange={(e) => setProjectForm({ ...projectForm, batch: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Faculty Mentor / Guide *</label>
                      <input
                        type="text"
                        required
                        value={projectForm.guideName}
                        onChange={(e) => setProjectForm({ ...projectForm, guideName: e.target.value })}
                        placeholder="e.g. Mr. Shine P Xavier"
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Tech Stack *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.techStack}
                      onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                      placeholder="React.js, Python, FastAPI, PyTorch, FAISS"
                      className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>

                  {/* Team Members List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-purple-400" />
                        Project Team Members ({teamMembers.length})
                      </label>
                      <button
                        type="button"
                        onClick={addTeamMember}
                        className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20"
                      >
                        <Plus size={14} /> Add Team Member
                      </button>
                    </div>

                    <div className="space-y-2">
                      {teamMembers.map((m, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-neutral-900 p-2.5 rounded-xl border border-white/10">
                          <input
                            type="text"
                            required
                            placeholder="Student Name"
                            value={m.name}
                            onChange={(e) => updateTeamMember(idx, 'name', e.target.value)}
                            className="flex-1 bg-neutral-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                          <input
                            type="text"
                            required
                            placeholder="Reg No (e.g. JEC23AD004)"
                            value={m.registerNumber}
                            onChange={(e) => updateTeamMember(idx, 'registerNumber', e.target.value)}
                            className="w-36 bg-neutral-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                          <label className="flex items-center gap-1 text-xs text-neutral-400 cursor-pointer select-none px-1">
                            <input
                              type="checkbox"
                              checked={m.isLeader}
                              onChange={(e) => updateTeamMember(idx, 'isLeader', e.target.checked)}
                              className="rounded border-white/20 bg-neutral-950 text-purple-500 focus:ring-0"
                            />
                            Leader
                          </label>
                          {teamMembers.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeTeamMember(idx)}
                              className="text-neutral-500 hover:text-red-400 p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">GitHub Repository URL</label>
                      <input
                        type="url"
                        value={projectForm.githubUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Contact Email *</label>
                      <input
                        type="email"
                        required
                        value={projectForm.contactEmail}
                        onChange={(e) => setProjectForm({ ...projectForm, contactEmail: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Project Abstract & Architecture *</label>
                    <textarea
                      rows={3}
                      required
                      value={projectForm.abstract}
                      onChange={(e) => setProjectForm({ ...projectForm, abstract: e.target.value })}
                      placeholder="Detailed project summary, problem statement, FAISS vector search, and web framework used..."
                      className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    />
                  </div>
                </>
              )}

              {/* IMAGE UPLOAD DROPZONE */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Upload Certificate / Main Image Preview *
                </label>
                {imagePreview ? (
                  <div className="relative rounded-2xl border border-white/20 bg-neutral-900 p-3 flex items-center gap-4">
                    <img
                      src={imagePreview}
                      alt="Upload Preview"
                      className="w-24 h-24 object-cover rounded-xl border border-white/10"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 size={16} /> Certificate Image Attached
                      </span>
                      <p className="text-xs text-neutral-400 mt-1">High resolution file cached for department verification</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ) : (
                  <label className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/20 hover:border-red-500/60 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 cursor-pointer transition-all group text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, setImagePreview)}
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 text-neutral-400 group-hover:text-red-400 group-hover:scale-110 transition-all mb-2" />
                    <span className="text-xs font-bold text-white">Click or drag certificate image file here</span>
                    <span className="text-[11px] text-neutral-400 mt-1">PNG, JPG, or WEBP images up to 10MB</span>
                  </label>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-[0_10px_35px_rgba(225,29,72,0.4)] border border-red-400/40 transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2 text-sm">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Logging Record on AIDA Portal...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-sm">
                      <Upload size={18} />
                      Submit {selectedCategory === 'project' ? projectSubType : selectedCategory} to Department
                    </span>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* STEP 4: SUCCESS PAGE */}
        {step === 'success' && submittedItem && (
          <div className="bg-neutral-950/90 border border-white/15 rounded-3xl p-8 backdrop-blur-3xl text-center space-y-6 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.3)]">
              <CheckCircle2 size={44} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">Record Successfully Submitted!</h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-lg mx-auto leading-relaxed">
                Your entry has been recorded under <span className="text-white font-semibold">Adhithyan V V</span> and queued for coordinator approval.
              </p>
            </div>

            {/* Submission Preview Card */}
            <div className="bg-neutral-900/90 border border-white/15 rounded-2xl p-5 text-left max-w-md mx-auto space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-neutral-400">Submission ID:</span>
                <span className="text-red-400 font-mono font-bold">{submittedItem.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Title:</span>
                <span className="text-white font-medium truncate max-w-[220px]">{submittedItem.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Status:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
                  🟡 PENDING REVIEW
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => window.location.hash = '#/status'}
                className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg"
              >
                Track Submission Status
              </button>
              <button
                type="button"
                onClick={() => window.location.hash = '#/dashboard'}
                className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold transition-all"
              >
                Return to Student Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
