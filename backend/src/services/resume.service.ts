import { ResumeData } from '../types/resume.types';
export function generateResume(templateId: string, resumeData: ResumeData) { return { templateId, ...resumeData, generatedAt: new Date().toISOString() }; }
