import { Router } from 'express';
const router = Router();
const templates = [
  { id: 'modern', name: 'Modern Professional', category: 'Professional' },
  { id: 'minimal', name: 'Minimal', category: 'Minimal' },
  { id: 'classic', name: 'Classic', category: 'Classic' },
  { id: 'creative', name: 'Creative', category: 'Creative' },
  { id: 'developer', name: 'Developer / Tech', category: 'Developer' },
  { id: 'student', name: 'Student / Fresher', category: 'Student' },
  { id: 'ats', name: 'ATS Friendly', category: 'ATS' },
];
router.get('/', (_req, res) => res.json({ success: true, templates }));
router.get('/:id', (req, res) => { const template = templates.find(item => item.id === req.params.id); if (!template) return res.status(404).json({ success: false, message: 'Template not found.' }); return res.json({ success: true, template }); });
export default router;
