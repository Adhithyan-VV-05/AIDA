// Helper module for managing student submissions in local storage and initial mock pending data

const STORAGE_KEY = 'aida_student_submissions';

// Initial sample records for student Adhithyan V V to demonstrate pending, approved, and rejected statuses
const INITIAL_SUBMISSIONS = [
  {
    id: 'sub-101',
    category: 'project',
    projectType: 'Mini Project',
    title: 'HireFlow AI – Job Recruiting Automation System',
    studentName: 'Adhithyan V V',
    registerNumber: 'JEC23AD004',
    date: '10 Sep 2026',
    status: 'approved', // 'pending' | 'approved' | 'rejected'
    statusNote: 'Approved by Dept HOD & Published on site showcase',
    tag: 'Projects',
    image: '/cover page/hireflow%201%20-%2012317004%20ADHITHYAN%20V%20V.webp',
    details: 'Mini Project featuring FAISS vector search, NLP parsing, and automated interviews.'
  },
  {
    id: 'sub-102',
    category: 'achievement',
    title: '1st Prize (₹15,000 Cash Prize) – ASTRA State Hackathon',
    studentName: 'Adhithyan V V',
    registerNumber: 'JEC23AD004',
    date: '02 Sep 2026',
    status: 'approved',
    statusNote: 'Verified by Staff Coordinator',
    tag: 'Hackathons',
    image: '/achievements/Astra 1st price.webp',
    details: 'Secured 1st Prize along with ₹15,000 cash prize for innovative project solution.'
  },
  {
    id: 'sub-103',
    category: 'publication',
    title: 'Semantic Embedding & RRF in Automated Candidate Screening',
    studentName: 'Adhithyan V V',
    registerNumber: 'JEC23AD004',
    date: '11 Sep 2026',
    status: 'pending',
    statusNote: 'Pending review by Research & Publication Committee',
    tag: 'Publications',
    image: '/achievements/AYUSH_V_S_Certificate_of_Volunteering__24_Hour_National_Level_YODHA_Hackathon_AIDA.webp',
    details: 'IEEE International Conference Paper on RRF and NLP candidate ranking.'
  },
  {
    id: 'sub-104',
    category: 'internship',
    title: 'AI Engineering Intern – TechySpot LLP',
    studentName: 'Adhithyan V V',
    registerNumber: 'JEC23AD004',
    date: '28 Aug 2026',
    status: 'pending',
    statusNote: 'Under verification with Training & Placement Cell',
    tag: 'Placements',
    image: '/achievements/Mehfil_Vattathoor_Certificate_for_Completion_Data_Analytics_Basics_Bootcamp.webp',
    details: '6-week hands-on internship working on computer vision and predictive modeling.'
  }
];

export function getSubmissions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to parse saved submissions', e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SUBMISSIONS));
  return INITIAL_SUBMISSIONS;
}

export function addSubmission(newSub) {
  const current = getSubmissions();
  const submissionRecord = {
    id: `sub-${Date.now()}`,
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: 'pending',
    statusNote: 'Submission logged. Pending verification by AIDA Staff Coordinator.',
    studentName: 'Adhithyan V V',
    registerNumber: 'JEC23AD004',
    ...newSub
  };
  const updated = [submissionRecord, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return submissionRecord;
}
