#!/usr/bin/env npx tsx

/**
 * Export React Email templates to static HTML files with Go template placeholders.
 * 
 * Usage: npm run export
 * Output: out/incident.html, out/simple.html
 */

import { render } from '@react-email/render';
import { mkdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as React from 'react';

// Import email components
import { IncidentEmail } from '../emails/incident';
import { SimpleEmail } from '../emails/simple';
import { ConfirmEmail } from '../emails/confirm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const outDir = join(rootDir, 'out');

async function exportTemplates() {
  console.log('📧 Exporting email templates from React components...\n');

  // Create output directory
  await mkdir(outDir, { recursive: true });

  // Export incident template (without preview data = Go template placeholders)
  console.log('  Processing: incident.tsx');
  const incidentHtml = await render(React.createElement(IncidentEmail, {}));
  await writeFile(join(outDir, 'incident.html'), incidentHtml, 'utf-8');
  console.log('  ✓ out/incident.html');

  // Export simple template (without preview data = Go template placeholders)
  console.log('  Processing: simple.tsx');
  const simpleHtml = await render(React.createElement(SimpleEmail, {}));
  await writeFile(join(outDir, 'simple.html'), simpleHtml, 'utf-8');
  console.log('  ✓ out/simple.html');

  // Export confirm template (without preview data = Go template placeholders)
  console.log('  Processing: confirm.tsx');
  const confirmHtml = await render(React.createElement(ConfirmEmail, {}));
  await writeFile(join(outDir, 'confirm.html'), confirmHtml, 'utf-8');
  console.log('  ✓ out/confirm.html');

  console.log('\n✅ Templates exported successfully!\n');
  console.log('📁 Output directory: out/');
  console.log('   - incident.html  (detailed incident notification)');
  console.log('   - simple.html    (simple notification)');
  console.log('   - confirm.html   (subscription confirmation)\n');
}

// Run export
exportTemplates().catch(console.error);

