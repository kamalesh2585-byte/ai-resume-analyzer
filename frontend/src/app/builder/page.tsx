'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, FileUp, ImagePlus, Plus, RefreshCw, Sparkles, Trash2 } from 'lucide-react';
import { ResumeData, ResumeItem, emptyResumeData } from '@/lib/resume-types';
import { templateRegistry } from '@/components/resume-templates';
import { TemplateCanvas } from '@/components/resume-templates/TemplateCanvas';

const sections = ['Personal Information', 'Professional Summary', 'Experience', 'Education', 'Skills', 'Projects', 'Certifications', 'Achievements', 'Languages', 'Social Links'];
const storageKey = 'byteforce-resume-data';
const templateKey = 'byteforce-selected-template';
const keyFor = (section: string): keyof ResumeData | null => ({ Experience: 'experience', Education: 'education', Projects: 'projects', Certifications: 'certifications', Achievements: 'achievements', Languages: 'languages' }[section] as keyof ResumeData) || null;

export default function BuilderPage() {
  const router = useRouter();
  const [active, setActive] = useState(sections[0]);
  const [templateId, setTemplateId] = useState('modern');
  const [data, setData] = useState<ResumeData>(emptyResumeData);
  const [error, setError] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setData(saved ? JSON.parse(saved) as ResumeData : emptyResumeData);
    const params = new URLSearchParams(window.location.search);
    setTemplateId(params.get('template') || localStorage.getItem(templateKey) || 'modern');
  }, []);

  useEffect(() => {
    if (data.fullName || data.email || data.summary || data.attachments?.length) localStorage.setItem(storageKey, JSON.stringify(data));
  }, [data]);

  useEffect(() => { localStorage.setItem(templateKey, templateId); }, [templateId]);

  const update = (key: keyof ResumeData, value: string) => setData(current => ({ ...current, [key]: value }));
  const updateItem = (key: keyof ResumeData, id: string, field: keyof ResumeItem, value: string) => setData(current => ({ ...current, [key]: (current[key] as ResumeItem[]).map(item => item.id === id ? { ...item, [field]: value } : item) }));
  const addItem = (key: keyof ResumeData) => setData(current => ({ ...current, [key]: [...(current[key] as ResumeItem[]), { id: `${String(key)}-${Date.now()}`, title: '', detail: '', date: '' }] }));
  const removeItem = (key: keyof ResumeData, id: string) => setData(current => ({ ...current, [key]: (current[key] as ResumeItem[]).filter(item => item.id !== id) }));
  const removeAttachment = (name: string, size: number) => setData(current => ({ ...current, attachments: (current.attachments || []).filter(item => item.name !== name || item.size !== size) }));
  const moveItem = (key: keyof ResumeData, index: number, direction: -1 | 1) => setData(current => { const list = [...(current[key] as ResumeItem[])]; const target = index + direction; if (target < 0 || target >= list.length) return current; [list[index], list[target]] = [list[target], list[index]]; return { ...current, [key]: list }; });

  function attach(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { setError('Attachment must be 10MB or smaller.'); return; }
    const reader = new FileReader();
    reader.onload = () => setData(current => ({ ...current, attachments: [...(current.attachments || []), { name: file.name, size: file.size, type: file.type, dataUrl: String(reader.result) }] }));
    reader.onerror = () => setError('Unable to read this file.');
    reader.readAsDataURL(file);
  }

  function generateProfileImage() {
    const prompt = imagePrompt.trim();
    if (!prompt) {
      setImageError('Describe the image you want first.');
      return;
    }
    const safePrompt = `professional resume profile portrait, ${prompt}, clean neutral background, natural lighting, head and shoulders, no text`;
    const seed = Math.floor(Math.random() * 1_000_000);
    setImageError('');
    setImageLoading(true);
    setImageReady(false);
    setGeneratedImage(`https://image.pollinations.ai/prompt/${encodeURIComponent(safePrompt)}?model=flux&width=768&height=768&seed=${seed}&nologo=true&enhance=true`);
  }

  const selected = templateRegistry.find(item => item.id === templateId) || templateRegistry[0];
  const itemKey = keyFor(active);
  const itemList = itemKey ? data[itemKey] as ResumeItem[] : [];

  return <main className="page builder-page">
    <div className="page-header"><span className="eyebrow">Resume builder</span><h1>Build it in your voice.</h1><p>Edit your content and watch the selected template update instantly.</p></div>
    <div className="builder-workspace">
      <section className="panel builder-editor">
        <div className="section-head"><div><span className="eyebrow">Editing</span><h2 style={{ fontSize: 28 }}>{active}</h2></div></div>
        <nav className="editor-nav" aria-label="Resume sections">{sections.map(section => <button type="button" className={active === section ? 'active' : ''} onClick={() => { setActive(section); setError(''); }} key={section}>{section}</button>)}</nav>
        {active === 'Personal Information' && <>
          <div className="form-grid">{([['fullName', 'Full name'], ['jobTitle', 'Job title'], ['email', 'Email'], ['phone', 'Phone'], ['location', 'Location'], ['profilePhoto', 'Profile photo URL']] as const).map(([key, label]) => <div className="field" key={key}><label htmlFor={key}>{label}</label><input id={key} value={String(data[key] || '')} onChange={event => update(key, event.target.value)} /></div>)}</div>
          <section className="image-generator" aria-labelledby="image-generator-title">
            <div className="image-generator-heading"><span className="image-generator-icon"><Sparkles size={17} /></span><div><h3 id="image-generator-title">AI profile image</h3><p>Describe a professional portrait. Generation is free and may take a moment.</p></div></div>
            <div className="field"><label htmlFor="image-prompt">Image prompt</label><textarea id="image-prompt" rows={3} value={imagePrompt} onChange={event => setImagePrompt(event.target.value)} placeholder="Example: friendly software developer wearing a navy shirt, simple studio portrait" /></div>
            <div className="image-generator-actions"><button type="button" className="button secondary" onClick={generateProfileImage} disabled={imageLoading}>{generatedImage ? <RefreshCw size={15} /> : <ImagePlus size={15} />}{imageLoading ? 'Generating...' : generatedImage ? 'Generate another' : 'Generate image'}</button><span>No API key required</span></div>
            {imageError && <p className="form-error" role="alert">{imageError}</p>}
            {generatedImage && <div className="generated-image-result"><div className="generated-image-frame">{imageLoading && <span>Creating your image...</span>}<img className={imageReady ? 'ready' : ''} src={generatedImage} alt="Generated profile preview" onLoad={() => { setImageLoading(false); setImageReady(true); setImageError(''); }} onError={() => { setImageLoading(false); setImageReady(false); setGeneratedImage(''); setImageError('The free image service did not respond. Click generate to try again.'); }} /></div>{imageReady && <button type="button" className="button" onClick={() => update('profilePhoto', generatedImage)}>Use in resume</button>}</div>}
          </section>
        </>}
        {active === 'Professional Summary' && <div className="field"><label htmlFor="summary">Summary</label><textarea id="summary" rows={8} value={data.summary} onChange={event => update('summary', event.target.value)} /></div>}
        {active === 'Skills' && <div className="field"><label htmlFor="skills">Skills, separated by commas</label><textarea id="skills" rows={6} value={data.skills.join(', ')} onChange={event => setData(current => ({ ...current, skills: event.target.value.split(',').map(skill => skill.trim()).filter(Boolean) }))} /></div>}
        {active === 'Social Links' && <div className="form-grid">{([['linkedin', 'LinkedIn'], ['github', 'GitHub'], ['portfolio', 'Portfolio']] as const).map(([key, label]) => <div className="field" key={key}><label htmlFor={key}>{label}</label><input id={key} value={data[key]} onChange={event => update(key, event.target.value)} /></div>)}</div>}
        {itemKey && <div className="entry-list">
          {itemList.map((item, index) => <article className="glass" key={item.id}><div className="form-grid"><div className="field"><label htmlFor={`${item.id}-title`}>Title</label><input id={`${item.id}-title`} value={item.title} onChange={event => updateItem(itemKey, item.id, 'title', event.target.value)} /></div><div className="field"><label htmlFor={`${item.id}-date`}>Date</label><input id={`${item.id}-date`} value={item.date || ''} onChange={event => updateItem(itemKey, item.id, 'date', event.target.value)} /></div><div className="field full"><label htmlFor={`${item.id}-detail`}>Details</label><textarea id={`${item.id}-detail`} rows={3} value={item.detail} onChange={event => updateItem(itemKey, item.id, 'detail', event.target.value)} /></div></div><div className="entry-actions"><button type="button" aria-label="Move up" onClick={() => moveItem(itemKey, index, -1)} disabled={index === 0}><ChevronUp size={16} /></button><button type="button" aria-label="Move down" onClick={() => moveItem(itemKey, index, 1)} disabled={index === itemList.length - 1}><ChevronDown size={16} /></button><button type="button" aria-label="Delete" onClick={() => removeItem(itemKey, item.id)}><Trash2 size={16} /></button></div></article>)}
          <button type="button" className="button secondary" onClick={() => addItem(itemKey)}><Plus size={15} /> Add {active.toLowerCase()}</button>
          {(active === 'Certifications' || active === 'Achievements') && <><label className="attachment-drop"><FileUp size={22} /><strong>Upload {active.toLowerCase()}</strong><span>Images or documents · max 10MB</span><input type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp" onChange={attach} /></label>{(data.attachments || []).map(attachment => <div className="attachment-item" key={`${attachment.name}-${attachment.size}`}><div><strong>{attachment.name}</strong><small>{(attachment.size / 1024 / 1024).toFixed(2)} MB</small></div><button type="button" aria-label={`Remove ${attachment.name}`} onClick={() => removeAttachment(attachment.name, attachment.size)}><Trash2 size={16} /></button></div>)}</>}
        </div>}
        {error && <p className="form-error" role="alert">{error}</p>}
      </section>
      <aside className="panel builder-live"><div className="section-head"><div><span className="eyebrow">Live preview</span><h2 style={{ fontSize: 25 }}>{selected.name}</h2></div></div><div className="builder-preview"><TemplateCanvas templateId={templateId} data={data} /></div><button type="button" className="button" onClick={() => router.push('/preview')}>Open full preview</button></aside>
    </div>
  </main>;
}
