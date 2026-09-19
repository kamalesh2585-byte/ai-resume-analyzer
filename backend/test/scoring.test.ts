import assert from 'node:assert/strict';
import test from 'node:test';
import { analyzeResume } from '../src/services/analysis.service';

test('scores a structured resume from its actual content', () => {
  const result = analyzeResume('Jane Doe\njane@example.com | +1 555 123 4567 | Austin, TX\n\nSummary\nProduct engineer building web products.\n\nSkills\nTypeScript React Next.js Node.js PostgreSQL AWS Docker Git\n\nExperience\nBuilt a React platform and improved delivery by 30%.\n\nEducation\nB.Tech Computer Science 2020\n\nProjects\nBuilt an analyzer with Next.js and PostgreSQL.');
  assert.equal(result.success, true);
  assert.equal(result.scores.keywordMatch, null);
  assert.ok(result.scores.overall >= 0 && result.scores.overall <= 100);
  assert.equal(result.parsedResume.summary, 'Product engineer building web products.');
});

test('calculates job keyword matches without fabricated values', () => {
  const result = analyzeResume('Jane Doe\njane@example.com\nSkills\nReact TypeScript Next.js', 'React TypeScript Next.js AWS Docker');
  assert.deepEqual(result.keywords.matched, ['react', 'typescript', 'next.js']);
  assert.equal(result.keywords.percentage, 60);
  assert.ok(result.keywords.missing.includes('aws'));
});

test('generates issues for a weak resume', () => {
  const result = analyzeResume('Jane Doe\njane@example.com');
  assert.ok(result.scores.overall < 70);
  assert.ok(result.remarks.improvements.length > 0);
  assert.ok(result.remarks.watchOuts.some(remark => remark.category === 'contact'));
});
