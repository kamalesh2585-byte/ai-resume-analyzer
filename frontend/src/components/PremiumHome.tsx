import Link from 'next/link';
import { ArrowUpRight, BrainCircuit, CheckCircle2, FileText, Sparkles, WandSparkles } from 'lucide-react';
import { Footer } from './Footer';

export function PremiumHome() {
  return <main className="premium-home">
    <section className="premium-hero">
      <div className="premium-hero-card">
        <div className="premium-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="premium-hero-copy">
          <span className="eyebrow">AI career intelligence</span>
          <h1>Build a resume that <em>gets noticed.</em></h1>
          <p>Turn your experience into a sharper story with practical analysis, focused feedback, and polished templates built for your next opportunity.</p>
          <div className="actions"><Link className="button" href="/analyze">Analyze Resume <ArrowUpRight size={17} /></Link><Link className="button secondary" href="/builder">Create Resume</Link></div>
          <div className="premium-proof"><CheckCircle2 size={16} /><span>Designed for clearer, more confident applications</span></div>
        </div>
        <div className="premium-resume-visual" aria-label="Resume analysis preview">
          <div className="resume-sheet"><div className="sheet-heading"><span className="sheet-avatar">AM</span><div><strong>Alex Morgan</strong><small>Product designer</small></div><span className="sheet-score">86</span></div><div className="sheet-lines"><i /><i /><i /><i /><i /><i /></div><div className="sheet-tags"><span>Impact</span><span>Clarity</span><span>ATS ready</span></div></div>
          <div className="signal-card"><span className="signal-dot" /><span>Resume signal</span><strong>Strong</strong></div>
        </div>
      </div>
      <div className="premium-side-cards">
        <article className="premium-feature-card"><div className="premium-logo"><BrainCircuit size={22} /></div><div className="premium-feature-title"><span>AI Resume Analyzer</span><span className="live-dot">Live</span></div><p>One workspace for every version of your career story.</p><div className="feature-chips"><span>Analyze</span><span>Improve</span><span>Create</span></div><div className="glow-track"><span /></div></article>
        <article className="premium-cta-card"><WandSparkles size={22} /><span className="eyebrow">Make the next move</span><h2>Make every application count.</h2><p>Find the gaps, keep the signal, and move from draft to direction.</p><Link className="text-link" href="/analyze">Get started <ArrowUpRight size={15} /></Link></article>
      </div>
    </section>
    <section className="premium-benefits page" id="how-it-works"><div className="section-head"><div><span className="eyebrow">A clearer next step</span><h2>Everything your resume needs.</h2></div><p>Upload once, then use the same workspace to understand, improve, and build your strongest version.</p></div><div className="premium-benefit-grid"><article><FileText size={20} /><strong>Resume upload</strong><span>Bring PDF, DOCX, or image files into the analyzer.</span></article><article><Sparkles size={20} /><strong>Resume score</strong><span>See the signals recruiters and screening systems notice first.</span></article><article><WandSparkles size={20} /><strong>Feedback that moves</strong><span>Turn what is good and what needs work into a sharper resume.</span></article></div></section>
    <Footer />
  </main>;
}