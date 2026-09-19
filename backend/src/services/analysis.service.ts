import { ResumeAnalysisResponse } from '../types/analysis.types';
import { parseResumeText } from './resumeParser.service';
import { analyzeParsedResume } from './scoring.service';

export function analyzeResume(resumeText: string, jobDescription = ''): ResumeAnalysisResponse {
  if (!resumeText.trim()) throw new Error('Resume text is empty.');
  return analyzeParsedResume(parseResumeText(resumeText), resumeText, jobDescription);
}
