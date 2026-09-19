import { ResumeData } from '@/lib/resume-types';
import { getTemplate } from './index';
export function TemplateCanvas({ templateId, data }: { templateId: string; data: ResumeData }) { const Template = getTemplate(templateId).component; return <Template data={data} />; }
