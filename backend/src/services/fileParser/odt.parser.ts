import AdmZip from 'adm-zip';
import { cleanResumeText } from './cleanResumeText';
import { ExtractedResumeText } from './types';
export function parseOdt(buffer: Buffer): ExtractedResumeText { const xml = new AdmZip(buffer).readAsText('content.xml'); if (!xml) throw new Error('ODT content is missing.'); const text = xml.replace(/<text:tab\s*\/>/g, '\t').replace(/<text:line-break\s*\/>/g, '\n').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'); return { text: cleanResumeText(text), fileType: 'odt', pageCount: 1 }; }
