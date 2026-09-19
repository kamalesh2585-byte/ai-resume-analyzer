# byteforce

Full-stack resume analysis and resume-building workspace. The analyzer uses real file extraction and a transparent rule-based scoring engine. No paid AI provider, authentication, or database is required.

## Installation

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

Copy `backend/.env.example` to `backend/.env` and `frontend/.env.example` to `frontend/.env.local` when changing defaults.

## Run

Run both applications from the repository root:

```bash
npm run dev
```

Or run them separately:

```bash
npm run start:dev --prefix backend
npm run dev --prefix frontend
```

Frontend: http://localhost:3000  
Backend: http://localhost:5000

## API

- `GET /api/health`
- `POST /api/resume/upload` with multipart field `resume`
- `POST /api/resume/extract` with multipart field `resume`
- `POST /api/resume/analyze` with `{ "resumeText": "...", "jobDescription": "..." }`
- `POST /api/resume/generate` with `{ "templateId": "...", "resumeData": {} }`
- `GET /api/templates`
- `GET /api/templates/:id`

Supported uploads are PDF, DOC, DOCX, TXT, RTF, ODT, PNG, JPG, JPEG, and WEBP. Files are limited to 10 MB, validated by extension and MIME type, kept in memory, and never exposed as public files. PDF uses `pdf-parse`, DOCX uses `mammoth`, DOC uses `word-extractor`, ODT uses `adm-zip`, text formats use UTF-8 parsing, and images use a replaceable Tesseract.js OCR adapter.

## Scoring methodology

The engine cleans extracted text, detects normalized resume sections, extracts contact information, recognizes an expandable technical skill dictionary, and evaluates actual content signals.

With a job description, the overall score is:

`overall = ATS * 20% + content * 20% + skills * 15% + experience * 15% + education * 10% + formatting * 10% + keyword match * 10%`

Without a job description, the keyword weight is removed and the remaining weights are normalized proportionally. Keyword matching lowercases and normalizes punctuation, deduplicates terms, and reports matched and missing terms. `keywordMatch` is `null` when no job description is provided.

Remarks are generated from detected conditions such as missing summary, incomplete contact details, low skill coverage, unquantified experience bullets, missing projects, and missing job-description keywords. Every remark includes severity and category.

## Tests and builds

```bash
npm run test --prefix backend
npm run build --prefix backend
npm run build --prefix frontend
```

The rule-engine tests cover structured and weak resumes, job-description matching, and the no-job-description path. To test a supplied `sample_resume_test.pdf`, start the backend and upload it through `/analyze`; the response from `/api/resume/upload` must contain extracted text before analysis is requested.

## Adding an AI provider later

`backend/src/services/ai.service.ts` exposes `generateSummary`, `rewriteBullet`, `generateRemarks`, and `improveResume`. Replace the rule-based implementation behind that interface with Gemini, Hugging Face, or another provider while retaining the parser, scoring, and fallback path.
