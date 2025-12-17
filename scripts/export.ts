#!/usr/bin/env npx tsx

/**
 * Export React Email templates to static HTML files with Go template placeholders.
 * 
 * Usage: npm run export
 * Output: out/en-US/*.html, out/zh-CN/*.html
 */

import { render } from '@react-email/render';
import { mkdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as React from 'react';

// Import en-US email components
import { IncidentEmail as IncidentEmailEN } from '../emails/en-US/incident';
import { WriteupEmail as WriteupEmailEN } from '../emails/en-US/writeup';
import { ConfirmEmail as ConfirmEmailEN } from '../emails/en-US/confirm';

// Import zh-CN email components
import { IncidentEmail as IncidentEmailZH } from '../emails/zh-CN/incident';
import { WriteupEmail as WriteupEmailZH } from '../emails/zh-CN/writeup';
import { ConfirmEmail as ConfirmEmailZH } from '../emails/zh-CN/confirm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const outDir = join(rootDir, 'out');

interface TemplateConfig {
  component: React.ComponentType<Record<string, never>>;
  outputName: string;
}

// Post-process HTML to restore Go template syntax that gets escaped during rendering
function postProcessHtml(html: string): string {
  // Find all Go template expressions {{...}} and restore &quot; to " within them
  return html.replace(/\{\{.*?\}\}/g, (match) => {
    return match.replace(/&quot;/g, '"');
  });
}

async function exportLocale(locale: string, templates: TemplateConfig[]) {
  const localeOutDir = join(outDir, locale);
  await mkdir(localeOutDir, { recursive: true });

  console.log(`\n📁 ${locale}/`);
  
  for (const { component, outputName } of templates) {
    console.log(`  Processing: ${outputName}`);
    let html = await render(React.createElement(component, {}));
    html = postProcessHtml(html);
    await writeFile(join(localeOutDir, outputName), html, 'utf-8');
    console.log(`  ✓ ${outputName}`);
  }
}

async function exportTemplates() {
  console.log('📧 Exporting email templates from React components...');

  // Export en-US templates
  await exportLocale('en-US', [
    { component: IncidentEmailEN, outputName: 'update_email.html' },
    { component: WriteupEmailEN, outputName: 'writeup_email.html' },
    { component: ConfirmEmailEN, outputName: 'confirmation_email.html' },
  ]);

  // Export zh-CN templates
  await exportLocale('zh-CN', [
    { component: IncidentEmailZH, outputName: 'update_email.html' },
    { component: WriteupEmailZH, outputName: 'writeup_email.html' },
    { component: ConfirmEmailZH, outputName: 'confirmation_email.html' },
  ]);

  console.log('\n✅ Templates exported successfully!\n');
  console.log('📁 Output directory: out/');
  console.log('   ├── en-US/');
  console.log('   │   ├── update_email.html       (incident/maintenance notification)');
  console.log('   │   ├── writeup_email.html      (write-up notification)');
  console.log('   │   └── confirmation_email.html (subscription confirmation)');
  console.log('   └── zh-CN/');
  console.log('       ├── update_email.html');
  console.log('       ├── writeup_email.html');
  console.log('       └── confirmation_email.html\n');
}

// Run export
exportTemplates().catch(console.error);
