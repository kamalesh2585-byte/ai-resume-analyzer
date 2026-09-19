import { cleanResumeText } from './cleanResumeText';
import { ExtractedResumeText } from './types';
export function parseText(buffer: Buffer, fileType: 'txt' | 'rtf'): ExtractedResumeText { let value = buffer.toString('utf8'); if (fileType === 'rtf') value = value.replace(/\\[a-z]+\d* ?/gi, '').replace(/[{}]/g, ''); return { text: cleanResumeText(value), fileType, pageCount: 1 }; }
