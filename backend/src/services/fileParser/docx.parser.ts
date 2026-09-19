import mammoth from 'mammoth';
import { cleanResumeText } from './cleanResumeText';
import { ExtractedResumeText } from './types';
export async function parseDocx(buffer: Buffer): Promise<ExtractedResumeText> { const result = await mammoth.extractRawText({ buffer }); return { text: cleanResumeText(result.value), fileType: 'docx', pageCount: 1 }; }
