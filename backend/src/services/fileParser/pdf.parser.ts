import pdfParse from 'pdf-parse';
import { cleanResumeText } from './cleanResumeText';
import { ExtractedResumeText } from './types';
export async function parsePdf(buffer: Buffer): Promise<ExtractedResumeText> { const result = await pdfParse(buffer); return { text: cleanResumeText(result.text), fileType: 'pdf', pageCount: result.numpages || 1 }; }
