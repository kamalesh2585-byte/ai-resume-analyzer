'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Download, Edit3 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ResumeData, emptyResumeData } from '@/lib/resume-types';
import { TemplateCanvas } from '@/components/resume-templates/TemplateCanvas';

export default function PreviewPage() {
  const [data, setData] = useState<ResumeData>(emptyResumeData);
  const [templateId, setTemplateId] = useState('modern');
  const [downloading, setDownloading] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('byteforce-resume-data');
    const template = localStorage.getItem('byteforce-selected-template');
    if (saved) setData(JSON.parse(saved) as ResumeData);
    if (template) setTemplateId(template);
  }, []);

  async function downloadPdf() {
    if (!resumeRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(resumeRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageHeight = canvas.height * pageWidth / canvas.width;
      let offset = 0;
      while (offset < imageHeight) {
        if (offset > 0) pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, -offset, pageWidth, imageHeight);
        offset += pageHeight;
      }
      pdf.save(`${(data.fullName || 'resume').trim().replace(/\s+/g, '-').toLowerCase()}.pdf`);
    } finally {
      setDownloading(false);
    }
  }

  return <main className="page preview-page">
    <div className="section-head"><div><span className="eyebrow">Final resume</span><h1>Ready to move.</h1><p className="muted">{data.fullName || 'Your resume'} · {templateId}</p></div><div className="actions"><Link className="button secondary" href="/builder"><Edit3 size={15} /> Edit resume</Link><button type="button" className="button" onClick={downloadPdf} disabled={downloading}><Download size={15} /> {downloading ? 'Preparing PDF...' : 'Download PDF'}</button></div></div>
    <div className="builder-preview final-preview" ref={resumeRef}><TemplateCanvas templateId={templateId} data={data} /></div>
  </main>;
}
