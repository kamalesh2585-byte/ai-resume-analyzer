import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import resumeRoutes from './routes/resume.routes';
import templateRoutes from './routes/template.routes';

const app = express();
const port = Number(process.env.PORT || 5000);
const configuredOrigin = process.env.FRONTEND_ORIGIN;
app.use(cors({ origin: (origin, callback) => { const isLocalFrontend = !origin || /^https?:\/\/localhost:\d+$/.test(origin); const isConfiguredFrontend = configuredOrigin && origin === configuredOrigin; callback(null, Boolean(isLocalFrontend || isConfiguredFrontend)); } }));
app.use(express.json({ limit: '1mb' }));
app.get('/api/health', (_req, res) => res.json({ success: true, service: 'byteforce-api', status: 'ok' }));
app.use('/api/resume', resumeRoutes);
app.use('/api/templates', templateRoutes);
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => { const message = err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE' ? 'File is larger than 10MB.' : err instanceof Error ? err.message : 'Something went wrong. Please try again.'; const status = message.includes('Unsupported') ? 415 : message.includes('10MB') ? 413 : message.includes('empty') || message.includes('extract') ? 422 : 500; return res.status(status).json({ success: false, message }); });
app.listen(port, () => console.log(`byteforce API running on http://localhost:${port}`));
