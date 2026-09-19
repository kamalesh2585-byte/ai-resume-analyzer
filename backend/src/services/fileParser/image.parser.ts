import { createWorker } from 'tesseract.js';
import { cleanResumeText } from './cleanResumeText';
import { ExtractedResumeText } from './types';
export async function parseImage(buffer: Buffer, fileType: 'png' | 'jpg' | 'jpeg' | 'webp'): Promise<ExtractedResumeText> { const worker = await createWorker('eng'); try { const result = await worker.recognize(buffer); return { text: cleanResumeText(result.data.text), fileType, pageCount: 1 }; } finally { await worker.terminate(); } }
