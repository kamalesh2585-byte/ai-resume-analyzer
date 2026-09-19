import { ComponentType } from 'react';
import { ResumeData } from '@/lib/resume-types';
import { ModernTemplate } from './ModernTemplate'; import { MinimalTemplate } from './MinimalTemplate'; import { ClassicTemplate } from './ClassicTemplate'; import { CreativeTemplate } from './CreativeTemplate'; import { DeveloperTemplate } from './DeveloperTemplate'; import { StudentTemplate } from './StudentTemplate'; import { AtsTemplate } from './AtsTemplate';
export type ResumeTemplate = { id: string; name: string; category: string; description: string; component: ComponentType<{ data: ResumeData }> };
export const templateRegistry: ResumeTemplate[] = [
  { id: 'modern', name: 'Modern Professional', category: 'Professional', description: 'A confident, structured layout for experienced professionals.', component: ModernTemplate },
  { id: 'minimal', name: 'Minimal', category: 'Minimal', description: 'Quiet typography and generous space for a clean first impression.', component: MinimalTemplate },
  { id: 'classic', name: 'Classic', category: 'Classic', description: 'A timeless, ATS-friendly format built for clarity.', component: ClassicTemplate },
  { id: 'creative', name: 'Creative', category: 'Creative', description: 'A distinctive editorial layout for design-led careers.', component: CreativeTemplate },
  { id: 'developer', name: 'Developer / Tech', category: 'Developer', description: 'A technical layout that puts your stack and projects forward.', component: DeveloperTemplate },
  { id: 'student', name: 'Student / Fresher', category: 'Student', description: 'A focused format for early-career experience and projects.', component: StudentTemplate },
  { id: 'ats', name: 'ATS Friendly', category: 'ATS', description: 'A single-column, text-first format designed for parsing systems.', component: AtsTemplate },
];
export function getTemplate(id: string) { return templateRegistry.find(template => template.id === id) || templateRegistry[0]; }
