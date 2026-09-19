export type ResumeItem = { id: string; title: string; detail: string; date?: string };
export type ResumeData = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  profilePhoto?: string;
  linkedin: string;
  github: string;
  portfolio: string;
  education: ResumeItem[];
  skills: string[];
  experience: ResumeItem[];
  projects: ResumeItem[];
  certifications: ResumeItem[];
  achievements: ResumeItem[];
  languages: ResumeItem[];
  attachments?: { name: string; size: number; type: string; dataUrl: string }[];
};

export const emptyResumeData: ResumeData = {
  fullName: '', jobTitle: '', email: '', phone: '', location: '', summary: '',
  profilePhoto: '', linkedin: '', github: '', portfolio: '', education: [], skills: [],
  experience: [], projects: [], certifications: [], achievements: [], languages: [], attachments: [],
};

export const demoResumeData: ResumeData = {
  ...emptyResumeData,
  fullName: 'Alex Morgan', jobTitle: 'Product Designer', email: '', phone: '', location: '',
  summary: 'Product designer who turns complex systems into clear, human experiences.', linkedin: 'linkedin.com/in/alexmorgan', github: 'github.com/alexmorgan', portfolio: 'alexmorgan.design',
  skills: ['Product strategy', 'Figma', 'Design systems', 'User research', 'Prototyping', 'Accessibility'],
  experience: [{ id: 'experience-1', title: 'Senior Product Designer · Northstar', detail: 'Led a redesign that improved activation by 30% across three product teams.', date: '2021 - Present' }],
  education: [{ id: 'education-1', title: 'B.Des. Interaction Design · Austin University', detail: 'Human-centered design and digital systems.', date: '2017 - 2021' }],
  projects: [{ id: 'project-1', title: 'Resume intelligence platform', detail: 'Designed the product experience for a structured resume analysis workflow.', date: '2024' }],
  certifications: [{ id: 'certification-1', title: 'Google UX Design Certificate', detail: 'Google', date: '2023' }],
  achievements: [{ id: 'achievement-1', title: 'Design systems lead', detail: 'Built a shared component library adopted by five product squads.', date: '2022' }],
  languages: [{ id: 'language-1', title: 'English', detail: 'Native proficiency' }],
};
