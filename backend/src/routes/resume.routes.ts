import { Router } from 'express';
import multer from 'multer';
import { extractTextFromFile, isSupportedExtension } from '../services/fileParser';
import { analyzeResume } from '../services/analysis.service';
import { generateResume } from '../services/resume.service';

const router = Router();
const allowedMimeTypes = new Set(['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/rtf', 'text/rtf', 'application/vnd.oasis.opendocument.text', 'image/png', 'image/jpeg', 'image/webp']);
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 }, fileFilter: (_req, file, callback) => { if (!isSupportedExtension(file.originalname) || (file.mimetype && !allowedMimeTypes.has(file.mimetype) && file.mimetype !== 'application/octet-stream')) return callback(new Error('Unsupported file type.')); callback(null, true); } });

async function extract(file: Express.Multer.File) { const result = await extractTextFromFile(file); if (!result.text.trim()) throw new Error('Unable to extract text from this file.'); return result; }
router.post('/upload', upload.single('resume'), async (req, res, next) => { try { if (!req.file) return res.status(400).json({ success: false, message: 'Resume file is required.' }); return res.json({ success: true, fileName: req.file.originalname, ...(await extract(req.file)) }); } catch (error) { return next(error); } });
router.post('/extract', upload.single('resume'), async (req, res, next) => { try { if (!req.file) return res.status(400).json({ success: false, message: 'Resume file is required.' }); return res.json({ success: true, ...(await extract(req.file)) }); } catch (error) { return next(error); } });
router.post('/analyze', (req, res, next) => { try { const resumeText = String(req.body?.resumeText || req.body?.text || ''); const jobDescription = String(req.body?.jobDescription || ''); return res.json(analyzeResume(resumeText, jobDescription)); } catch (error) { return next(error); } });
router.post('/generate', (req, res) => res.json({ success: true, resume: generateResume(String(req.body?.templateId || '1'), req.body?.resumeData || {}) }));
export default router;
