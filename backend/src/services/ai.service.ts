import { Remark } from '../types/analysis.types';
export interface AiService { generateSummary(input: string): string; rewriteBullet(input: string): string; generateRemarks(input: string): Remark[]; improveResume(input: string): string; }
export const ruleBasedAiService: AiService = { generateSummary: input => input.trim(), rewriteBullet: input => input.trim(), generateRemarks: () => [], improveResume: input => input.trim() };
