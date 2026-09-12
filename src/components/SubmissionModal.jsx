import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowLeft, 
  Plus, 
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
  UserCheck
} from 'lucide-react';

export default function SubmissionModal({ isOpen, onClose }) {
  // Navigation states: 'select_category' | 'select_project_type' | 'form' | 'success'
  const [step, setStep] = useState('select_category');
  
  // Selected category details
  const [selectedCategory, setSelectedCategory] = useState(null); // 'achievement' | 'publication' | 'internship' | 'project'
  const [projectSubType, setProjectSubType] = useState(null); // 'Main Project' | 'Mini Project' | 'Micro Project'
  
  // Form submission feedback state
  const [submittedData, setSubmittedData] = useState(null);

  // Common Form States
  const [imagePreview, setImagePreview] = useState(null);
  const [demoImagePreview, setDemoImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Category-specific form data
  const [achievementForm, setAchievementForm] = useState({
    studentName: '',
    registerNumber: '',
    semester: 'Semester 6',
    title: '',
    tag: 'Hackathons',
    level: '1st Prize',
    year: new Date().getFullYear().toString(),
    description: '',
  });

  const [publicationForm, setPublicationForm] = useState({
    paperTitle: '',
    authors: '',
    publicationType: 'Journal',
    venue: '',
    publisher: '',
    year: new Date().getFullYear().toString(),
    doiUrl: '',
    abstract: '',
  });

  const [internshipForm, setInternshipForm] = useState({
    studentName: '',
    registerNumber: '',
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
    techStack: '',
    guideName: '',
    githubUrl: '',
    contactEmail: '',
    abstract: '',
  });

  const [teamMembers, setTeamMembers] = useState([
    { name: '', registerNumber: '', isLeader: true }
  ]);

  if (!isOpen) return null;

  // Reset modal state
  const handleClose = () => {
    setStep('select_category');
    setSelectedCategory(null);
    setProjectSubType(null);
    setImagePreview(null);
    setDemoImagePreview(null);
    setSubmittedData(null);
    onClose();
  };

  // Handle Image File Selection & Preview
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

  // Dynamic Team Member Handlers for Projects
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

  // Category Selection Handler
  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'project') {
      setStep('select_project_type');
    } else {
      setStep('form');
    }
  };

  // Project Type Selection Handler
  const handleSelectProjectType = (type) => {
    setProjectSubType(type);
    setStep('form');
  };

  // Submit Form Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      let finalSubmission = {
        category: selectedCategory,
        timestamp: new Date().toLocaleString(),
        image: imagePreview,
      };

      if (selectedCategory === 'achievement') {
        finalSubmission = { ...finalSubmission, ...achievementForm, typeLabel: 'Achievement Record' };
      } else if (selectedCategory === 'publication') {
        finalSubmission = { ...finalSubmission, ...publicationForm, typeLabel: 'Publication Paper' };
      } else if (selectedCategory === 'internship') {
        finalSubmission = { ...finalSubmission, ...internshipForm, typeLabel: 'Internship / Placement' };
      } else if (selectedCategory === 'project') {
        finalSubmission = { 
          ...finalSubmission, 
          ...projectForm, 
          projectType: projectSubType, 
          teamMembers,
          demoImage: demoImagePreview,
          typeLabel: `${projectSubType} Submission`
        };
      }

      setSubmittedData(finalSubmission);
      setIsSubmitting(false);
      setStep('success');
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-2xl animate-fadeIn">
      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="relative w-full max-w-2xl bg-neutral-950/90 border border-white/20 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-3xl overflow-hidden my-auto flex flex-col max-h-[90vh]"
      >
        {/* Top Highlight Line */}
        <div className="absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0 bg-neutral-900/50">
          <div className="flex items-center gap-3">
            {step !== 'select_category' && step !== 'success' && (
              <button
                type="button"
                onClick={() => {
                  if (step === 'form' && selectedCategory === 'project') {
                    setStep('select_project_type');
                  } else {
                    setStep('select_category');
                  }
                }}
                className="p-1.5 rounded-full bg-neutral-800/80 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-500" />
                Student Content Submission
              </h2>
              <p className="text-xs text-neutral-400">
                {step === 'select_category' && 'Select the content category you want to upload'}
                {step === 'select_project_type' && 'Select the category of project to upload'}
                {step === 'form' && `Provide complete details for your ${selectedCategory === 'project' ? projectSubType : selectedCategory}`}
                {step === 'success' && 'Submission complete'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/15 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          
          {/* STEP 1: CATEGORY SELECTION */}
          {step === 'select_category' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
              {/* Option 1: Achievements */}
              <button
                type="button"
                onClick={() => handleSelectCategory('achievement')}
                className="group relative p-5 rounded-2xl bg-neutral-900/70 border border-white/10 hover:border-red-500/50 hover:bg-neutral-900 transition-all text-left flex flex-col justify-between shadow-lg hover:shadow-red-950/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 group-hover:scale-110 transition-transform">
                    <Award size={26} />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                    ACHIEVEMENT
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                    Add New Achievement
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Upload certificates & prize honors from Hackathons, Arts, Sports, or NPTEL courses.
                  </p>
                </div>
              </button>

              {/* Option 2: Publications */}
              <button
                type="button"
                onClick={() => handleSelectCategory('publication')}
                className="group relative p-5 rounded-2xl bg-neutral-900/70 border border-white/10 hover:border-blue-500/50 hover:bg-neutral-900 transition-all text-left flex flex-col justify-between shadow-lg hover:shadow-blue-950/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                    <BookOpen size={26} />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                    RESEARCH
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                    Add Publications
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Submit published journals, IEEE conference papers, book chapters, and research work.
                  </p>
                </div>
              </button>

              {/* Option 3: Internship Details */}
              <button
                type="button"
                onClick={() => handleSelectCategory('internship')}
                className="group relative p-5 rounded-2xl bg-neutral-900/70 border border-white/10 hover:border-emerald-500/50 hover:bg-neutral-900 transition-all text-left flex flex-col justify-between shadow-lg hover:shadow-emerald-950/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Briefcase size={26} />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    CAREER
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Add Internship Details
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Log industry training, full-time campus placements, PPOs, and internship offers.
                  </p>
                </div>
              </button>

              {/* Option 4: Upload Project */}
              <button
                type="button"
                onClick={() => handleSelectCategory('project')}
                className="group relative p-5 rounded-2xl bg-neutral-900/70 border border-white/10 hover:border-purple-500/50 hover:bg-neutral-900 transition-all text-left flex flex-col justify-between shadow-lg hover:shadow-purple-950/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
                    <FolderGit2 size={26} />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                    PROJECTS
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">
                    Upload Project
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Submit Main Projects, Mini Projects, or Micro Projects with code links and demo screenshots.
                  </p>
                </div>
              </button>
            </div>
          )}

          {/* STEP 2: PROJECT SUB-TYPE SELECTION */}
          {step === 'select_project_type' && (
            <div className="space-y-4 py-2">
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-purple-200 text-xs flex items-center gap-3">
                <Layers className="w-5 h-5 text-purple-400 shrink-0" />
                <span>Please specify the project category you are uploading to the AIDA portal:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Main Project */}
                <button
                  type="button"
                  onClick={() => handleSelectProjectType('Main Project')}
                  className="group p-4 rounded-2xl bg-neutral-900/80 border border-white/10 hover:border-purple-500 hover:bg-neutral-900 transition-all text-center flex flex-col items-center justify-center gap-2"
                >
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                    <FolderGit2 size={28} />
                  </div>
                  <span className="text-sm font-bold text-white group-hover:text-purple-400">Main Project</span>
                  <span className="text-[11px] text-neutral-400">Final Year Capstone / AI Models</span>
                </button>

                {/* Mini Project */}
                <button
                  type="button"
                  onClick={() => handleSelectProjectType('Mini Project')}
                  className="group p-4 rounded-2xl bg-neutral-900/80 border border-white/10 hover:border-blue-500 hover:bg-neutral-900 transition-all text-center flex flex-col items-center justify-center gap-2"
                >
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                    <Layers size={28} />
                  </div>
                  <span className="text-sm font-bold text-white group-hover:text-blue-400">Mini Project</span>
                  <span className="text-[11px] text-neutral-400">Semester 5 & 6 Implementations</span>
                </button>

                {/* Micro Project */}
                <button
                  type="button"
                  onClick={() => handleSelectProjectType('Micro Project')}
                  className="group p-4 rounded-2xl bg-neutral-900/80 border border-white/10 hover:border-amber-500 hover:bg-neutral-900 transition-all text-center flex flex-col items-center justify-center gap-2"
                >
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                    <FileText size={28} />
                  </div>
                  <span className="text-sm font-bold text-white group-hover:text-amber-400">Micro Project</span>
                  <span className="text-[11px] text-neutral-400">Semester 3 & 4 Lab Projects</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CATEGORY-SPECIFIC FORM */}
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* A. ACHIEVEMENT FORM */}
              {selectedCategory === 'achievement' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Student Full Name *</label>
                      <input
                        type="text"
                        required
                        value={achievementForm.studentName}
                        onChange={(e) => setAchievementForm({ ...achievementForm, studentName: e.target.value })}
                        placeholder="e.g. Adhithyan V V"
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">KTU Register Number *</label>
                      <input
                        type="text"
                        required
                        value={achievementForm.registerNumber}
                        onChange={(e) => setAchievementForm({ ...achievementForm, registerNumber: e.target.value })}
                        placeholder="e.g. JEC23AD004"
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Semester *</label>
                      <select
                        value={achievementForm.semester}
                        onChange={(e) => setAchievementForm({ ...achievementForm, semester: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                      >
                        {['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'].map((sem) => (
                          <option key={sem} value={sem} className="bg-neutral-900 text-white">{sem}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Category / Tag *</label>
                      <select
                        value={achievementForm.tag}
                        onChange={(e) => setAchievementForm({ ...achievementForm, tag: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                      >
                        {['Hackathons', 'Academic Achievement', 'Extracurricular', 'Arts', 'Sports', 'NPTEL', 'Workshop'].map((tag) => (
                          <option key={tag} value={tag} className="bg-neutral-900 text-white">{tag}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Award Level *</label>
                      <input
                        type="text"
                        required
                        value={achievementForm.level}
                        onChange={(e) => setAchievementForm({ ...achievementForm, level: e.target.value })}
                        placeholder="e.g. 1st Prize / Gold Medal"
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Achievement Title *</label>
                    <input
                      type="text"
                      required
                      value={achievementForm.title}
                      onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })}
                      placeholder="e.g. 1st Prize – ASTRA State Level Hackathon"
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Detailed Description *</label>
                    <textarea
                      rows={3}
                      required
                      value={achievementForm.description}
                      onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })}
                      placeholder="Provide details about the competition, event location, cash prizes, and key highlights..."
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors resize-none"
                    />
                  </div>
                </>
              )}

              {/* B. PUBLICATION FORM */}
              {selectedCategory === 'publication' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Paper Title *</label>
                    <input
                      type="text"
                      required
                      value={publicationForm.paperTitle}
                      onChange={(e) => setPublicationForm({ ...publicationForm, paperTitle: e.target.value })}
                      placeholder="e.g. Intelligent AI Security Systems for Data Privacy"
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Authors / Contributors *</label>
                      <input
                        type="text"
                        required
                        value={publicationForm.authors}
                        onChange={(e) => setPublicationForm({ ...publicationForm, authors: e.target.value })}
                        placeholder="e.g. Adhithyan V V, Mr. Bineesh M"
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Publication Type *</label>
                      <select
                        value={publicationForm.publicationType}
                        onChange={(e) => setPublicationForm({ ...publicationForm, publicationType: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        {['Journal', 'IEEE Conference', 'Book Chapter', 'National Conference', 'Workshop Paper'].map((pt) => (
                          <option key={pt} value={pt} className="bg-neutral-900 text-white">{pt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Venue / Conference Name *</label>
                      <input
                        type="text"
                        required
                        value={publicationForm.venue}
                        onChange={(e) => setPublicationForm({ ...publicationForm, venue: e.target.value })}
                        placeholder="e.g. International Conference on Smart Cities 2026"
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Publisher *</label>
                      <input
                        type="text"
                        required
                        value={publicationForm.publisher}
                        onChange={(e) => setPublicationForm({ ...publicationForm, publisher: e.target.value })}
                        placeholder="e.g. IEEE / Springer / Elsevier"
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">DOI / Web URL</label>
                      <input
                        type="url"
                        value={publicationForm.doiUrl}
                        onChange={(e) => setPublicationForm({ ...publicationForm, doiUrl: e.target.value })}
                        placeholder="https://doi.org/10.1109/..."
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Publication Year *</label>
                      <input
                        type="text"
                        required
                        value={publicationForm.year}
                        onChange={(e) => setPublicationForm({ ...publicationForm, year: e.target.value })}
                        placeholder="2026"
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Abstract Summary</label>
                    <textarea
                      rows={3}
                      value={publicationForm.abstract}
                      onChange={(e) => setPublicationForm({ ...publicationForm, abstract: e.target.value })}
                      placeholder="Brief abstract explaining methodology, results, and AI models used..."
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>
                </>
              )}

              {/* C. INTERNSHIP FORM */}
              {selectedCategory === 'internship' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Student Full Name *</label>
                      <input
                        type="text"
                        required
                        value={internshipForm.studentName}
                        onChange={(e) => setInternshipForm({ ...internshipForm, studentName: e.target.value })}
                        placeholder="e.g. Yasin Muhammed PM"
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">KTU Register Number *</label>
                      <input
                        type="text"
                        required
                        value={internshipForm.registerNumber}
                        onChange={(e) => setInternshipForm({ ...internshipForm, registerNumber: e.target.value })}
                        placeholder="e.g. JEC23AD059"
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Company / Organization *</label>
                      <input
                        type="text"
                        required
                        value={internshipForm.company}
                        onChange={(e) => setInternshipForm({ ...internshipForm, company: e.target.value })}
                        placeholder="e.g. TechySpot LLP / Infosys"
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Job Role / Designation *</label>
                      <input
                        type="text"
                        required
                        value={internshipForm.role}
                        onChange={(e) => setInternshipForm({ ...internshipForm, role: e.target.value })}
                        placeholder="e.g. AI Engineer Intern"
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Engagement Type *</label>
                      <select
                        value={internshipForm.type}
                        onChange={(e) => setInternshipForm({ ...internshipForm, type: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      >
                        {['Internship', 'Full-time Placement', 'PPO', 'Industrial Training'].map((t) => (
                          <option key={t} value={t} className="bg-neutral-900 text-white">{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Batch / Class *</label>
                      <input
                        type="text"
                        required
                        value={internshipForm.batch}
                        onChange={(e) => setInternshipForm({ ...internshipForm, batch: e.target.value })}
                        placeholder="2023–2027"
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Stipend / Package</label>
                      <input
                        type="text"
                        value={internshipForm.stipend}
                        onChange={(e) => setInternshipForm({ ...internshipForm, stipend: e.target.value })}
                        placeholder="e.g. ₹15,000 / mo"
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Key Learnings & Summary</label>
                    <textarea
                      rows={3}
                      value={internshipForm.description}
                      onChange={(e) => setInternshipForm({ ...internshipForm, description: e.target.value })}
                      placeholder="Outline your project work, technologies used during internship..."
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                    />
                  </div>
                </>
              )}

              {/* D. PROJECT FORM (Main, Mini, Micro) */}
              {selectedCategory === 'project' && (
                <>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-purple-950/40 border border-purple-500/30">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-semibold text-white">Project Category:</span>
                    </div>
                    <span className="text-xs font-bold font-mono text-purple-300 bg-purple-500/20 px-2.5 py-1 rounded-full border border-purple-500/30">
                      {projectSubType}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="e.g. HireFlow AI – Job Recruiting Automation System"
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Batch / Academic Year *</label>
                      <input
                        type="text"
                        required
                        value={projectForm.batch}
                        onChange={(e) => setProjectForm({ ...projectForm, batch: e.target.value })}
                        placeholder="2023–2027"
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Faculty Guide / Mentor *</label>
                      <input
                        type="text"
                        required
                        value={projectForm.guideName}
                        onChange={(e) => setProjectForm({ ...projectForm, guideName: e.target.value })}
                        placeholder="e.g. Mr. Shine P Xavier"
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Tech Stack (comma separated) *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.techStack}
                      onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                      placeholder="e.g. React.js, Python, PyTorch, FastAPI, Sentence Transformers"
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>

                  {/* Team Members Dynamic List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                        Team Members ({teamMembers.length})
                      </label>
                      <button
                        type="button"
                        onClick={addTeamMember}
                        className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 bg-purple-500/10 px-2 py-0.5 rounded-lg border border-purple-500/20"
                      >
                        <Plus size={14} /> Add Member
                      </button>
                    </div>

                    <div className="space-y-2 max-h-36 overflow-y-auto custom-scrollbar p-1">
                      {teamMembers.map((member, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-neutral-900/90 p-2 rounded-xl border border-white/5">
                          <input
                            type="text"
                            required
                            placeholder="Student Name"
                            value={member.name}
                            onChange={(e) => updateTeamMember(idx, 'name', e.target.value)}
                            className="flex-1 bg-neutral-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                          />
                          <input
                            type="text"
                            required
                            placeholder="Reg No (e.g. JEC23AD004)"
                            value={member.registerNumber}
                            onChange={(e) => updateTeamMember(idx, 'registerNumber', e.target.value)}
                            className="w-32 bg-neutral-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                          />
                          <label className="flex items-center gap-1 text-[11px] text-neutral-400 cursor-pointer select-none px-1">
                            <input
                              type="checkbox"
                              checked={member.isLeader}
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
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">GitHub / Code Repository URL</label>
                      <input
                        type="url"
                        value={projectForm.githubUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Contact Email *</label>
                      <input
                        type="email"
                        required
                        value={projectForm.contactEmail}
                        onChange={(e) => setProjectForm({ ...projectForm, contactEmail: e.target.value })}
                        placeholder="student@jecc.ac.in"
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Project Abstract *</label>
                    <textarea
                      rows={3}
                      required
                      value={projectForm.abstract}
                      onChange={(e) => setProjectForm({ ...projectForm, abstract: e.target.value })}
                      placeholder="Detailed project summary, problem statement, and technical execution..."
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    />
                  </div>
                </>
              )}

              {/* IMAGE UPLOAD DROPZONE FOR ALL CATEGORIES */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Upload Image / Certificate / Cover Photo *
                </label>

                {imagePreview ? (
                  <div className="relative rounded-2xl border border-white/20 overflow-hidden bg-neutral-900 p-2 flex items-center gap-3">
                    <img
                      src={imagePreview}
                      alt="Upload Preview"
                      className="w-20 h-20 object-cover rounded-xl border border-white/10"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 size={14} /> Image Loaded Successfully
                      </span>
                      <p className="text-[11px] text-neutral-400 mt-1">Ready for high-res rendering on site</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors mr-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="relative flex flex-col items-center justify-center p-5 border-2 border-dashed border-white/15 hover:border-red-500/50 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900 cursor-pointer transition-all group text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, setImagePreview)}
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 text-neutral-400 group-hover:text-red-400 group-hover:scale-110 transition-all mb-2" />
                    <span className="text-xs font-semibold text-white">Click or drag image file here</span>
                    <span className="text-[10px] text-neutral-400 mt-1">Supports PNG, JPG, WEBP certificate images</span>
                  </label>
                )}
              </div>

              {/* ADDITIONAL SECONDARY IMAGE UPLOAD FOR PROJECTS */}
              {selectedCategory === 'project' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Upload Working Demo / Output Screenshot
                  </label>
                  {demoImagePreview ? (
                    <div className="relative rounded-2xl border border-white/20 overflow-hidden bg-neutral-900 p-2 flex items-center gap-3">
                      <img
                        src={demoImagePreview}
                        alt="Demo Preview"
                        className="w-20 h-20 object-cover rounded-xl border border-white/10"
                      />
                      <div className="flex-1">
                        <span className="text-xs font-bold text-purple-400 flex items-center gap-1">
                          <CheckCircle2 size={14} /> Demo Screenshot Attached
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDemoImagePreview(null)}
                        className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors mr-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="relative flex flex-col items-center justify-center p-4 border-2 border-dashed border-white/15 hover:border-purple-500/50 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900 cursor-pointer transition-all group text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, setDemoImagePreview)}
                        className="hidden"
                      />
                      <Upload className="w-6 h-6 text-neutral-400 group-hover:text-purple-400 transition-all mb-1" />
                      <span className="text-xs text-neutral-300">Upload Demo Screenshot (Optional)</span>
                    </label>
                  )}
                </div>
              )}

              {/* FORM ACTION SUBMIT BUTTON */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-[0_10px_30px_rgba(225,29,72,0.4)] border border-red-400/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2 text-sm">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting Record to AIDA Portal...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-sm">
                      <Upload size={18} />
                      Submit {selectedCategory === 'project' ? projectSubType : selectedCategory} Details
                    </span>
                  )}
                </button>
              </div>

            </form>
          )}

          {/* STEP 4: SUCCESS VIEW */}
          {step === 'success' && submittedData && (
            <div className="py-6 text-center space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Submission Successfully Received!
                </h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto leading-relaxed">
                  Your <span className="text-white font-semibold">{submittedData.typeLabel}</span> has been logged and queued for department verification on the AIDA portal.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-4 text-left space-y-2 text-xs max-w-md mx-auto">
                <div className="flex justify-between text-neutral-400 pb-2 border-b border-white/10">
                  <span>Record Type:</span>
                  <span className="text-white font-mono font-bold">{submittedData.typeLabel}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Title / Name:</span>
                  <span className="text-white font-medium truncate max-w-[200px]">
                    {submittedData.title || submittedData.paperTitle || submittedData.studentName}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Submitted At:</span>
                  <span className="text-neutral-300 font-mono text-[11px]">{submittedData.timestamp}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep('select_category')}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold transition-all"
                >
                  Submit Another Item
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg"
                >
                  Done & Close
                </button>
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
