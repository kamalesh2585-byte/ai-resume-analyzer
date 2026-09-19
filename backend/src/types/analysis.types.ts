export type Remark = { message: string; severity: 'low' | 'medium' | 'high'; category: string };
export type KeywordResult = { matched: string[]; missing: string[]; percentage: number | null };
export type AnalysisScores = { overall: number; ats: number; content: number; skills: number; experience: number; education: number; formatting: number; keywordMatch: number | null };
export type ResumeAnalysisResponse = { success: true; scores: AnalysisScores; breakdown: Record<string, number>; remarks: { strengths: Remark[]; improvements: Remark[]; watchOuts: Remark[] }; keywords: KeywordResult; parsedResume: import('./resume.types').ParsedResume };
