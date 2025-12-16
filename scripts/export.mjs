#!/usr/bin/env node

/**
 * Export React Email templates to static HTML files with Go template placeholders.
 * 
 * Usage: npm run export
 * Output: out/incident.html, out/simple.html
 */

import { mkdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const outDir = join(rootDir, 'out');

// Template configurations
const templates = [
  {
    name: 'incident',
    description: 'Detailed incident notification (with affected components)',
  },
  {
    name: 'simple', 
    description: 'Simple notification (title + message + button)',
  },
];

async function exportTemplates() {
  console.log('📧 Exporting email templates...\n');

  // Create output directory
  await mkdir(outDir, { recursive: true });

  for (const template of templates) {
    try {
      console.log(`  Processing: ${template.name}.tsx`);
      
      // Dynamic import the email component
      const modulePath = join(rootDir, 'emails', `${template.name}.tsx`);
      
      // We need to use tsx or ts-node to handle TypeScript
      // For now, we'll use a workaround with react-email's built-in export
      console.log(`  → Use: npx react-email export to generate HTML`);
      
    } catch (error) {
      console.error(`  ✗ Error processing ${template.name}:`, error.message);
    }
  }

  console.log('\n📝 Note: Run the following command to export HTML templates:');
  console.log('   npx react-email export --outDir out\n');
  console.log('   Then manually adjust the output to include Go template placeholders.\n');
}

// Alternative: Generate HTML template structure directly
async function generateTemplateStructure() {
  console.log('📧 Generating HTML template structure...\n');

  await mkdir(outDir, { recursive: true });

  // Generate incident.html template with Go placeholders
  const incidentHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{.EventType}}: {{.Title}}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #F9FAFB;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
  </style>
</head>
<body style="background-color: #F9FAFB; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F9FAFB;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="465" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; max-width: 465px;">
          <tr>
            <td style="padding: 40px 20px;">
              
              <!-- Logo -->
              {{if .Logo}}
              <img src="{{.Logo}}" height="60" alt="Logo" style="height: 60px; width: auto; display: block; margin-bottom: 24px;">
              {{end}}
              
              <!-- Divider -->
              <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;">
              
              <!-- Event Type -->
              <p style="color: #6B7280; font-size: 14px; line-height: 24px; margin: 0 0 8px 0;">
                {{.EventType}}
              </p>
              
              <!-- Title -->
              <h1 style="color: #111827; font-size: 24px; font-weight: 700; line-height: 32px; margin: 0 0 8px 0;">
                {{.Title}}
              </h1>
              
              <!-- Status + Started At -->
              <p style="margin: 0 0 24px 0;">
                <span style="color: {{.StatusColor}}; font-size: 14px; font-weight: 600; margin-right: 12px;">
                  {{.Status}}
                </span>
                <span style="color: #9CA3AF; font-size: 14px;">
                  Started {{.StartedAt}}
                </span>
              </p>
              
              <!-- Divider -->
              <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 0 0 24px 0;">
              
              <!-- Message -->
              <p style="color: #111827; font-size: 14px; line-height: 24px; margin: 0;">
                {{.Message}}
              </p>
              
              <!-- Affected Components -->
              {{if .Components}}
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 24px;">
                <tr>
                  <td style="font-size: 14px; color: #6B7280; font-weight: 600; padding-bottom: 12px;">
                    Affected Components:
                  </td>
                </tr>
                {{range .Components}}
                <tr>
                  <td style="padding: 8px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 24px; vertical-align: middle;">
                          {{if eq .Icon "operational"}}
                          <img src="data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='8' fill='%2310B981'/%3E%3Cpath d='M5 8L7 10L11 6' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E" width="16" height="16" alt="operational" style="display: block;">
                          {{else if eq .Icon "warning"}}
                          <img src="data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='8' fill='%23F97316'/%3E%3Cpath d='M8 5V9' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3Ccircle cx='8' cy='11.5' r='0.75' fill='white'/%3E%3C/svg%3E" width="16" height="16" alt="warning" style="display: block;">
                          {{else}}
                          <img src="data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='8' fill='%23DC2626'/%3E%3Cpath d='M8 5V9' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3Ccircle cx='8' cy='11.5' r='0.75' fill='white'/%3E%3C/svg%3E" width="16" height="16" alt="error" style="display: block;">
                          {{end}}
                        </td>
                        <td style="padding-left: 8px; vertical-align: middle;">
                          <span style="color: #111827; font-size: 14px; font-weight: 500;">{{.Name}}</span>
                          <span style="color: {{.StatusColor}}; font-size: 14px; margin-left: 12px;">{{.Status}}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                {{end}}
              </table>
              {{end}}
              
              <!-- Divider -->
              <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;">
              
              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                <tr>
                  <td>
                    <a href="{{.ActionUrl}}" style="display: inline-block; padding: 12px 24px; background-color: #FFFFFF; color: #111827; font-size: 14px; font-weight: 500; text-decoration: none; border-radius: 6px; border: 1px solid #E5E7EB;">
                      {{if .ActionText}}{{.ActionText}}{{else}}View incident{{end}}
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Footer -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px;">
                <tr>
                  <td style="padding-bottom: 12px;">
                    <span style="color: #9CA3AF; font-size: 13px;">
                      Powered by 
                      <a href="{{.PoweredByUrl}}" style="color: #6B7280; text-decoration: none; font-weight: 500;">
                        {{.PoweredByName}}
                      </a>
                    </span>
                  </td>
                </tr>
                {{if .UnsubscribeUrl}}
                <tr>
                  <td>
                    <a href="{{.UnsubscribeUrl}}" style="color: #9CA3AF; font-size: 13px; text-decoration: none;">
                      Unsubscribe
                    </a>
                  </td>
                </tr>
                {{end}}
              </table>
              
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  // Generate simple.html template with Go placeholders
  const simpleHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{.Title}}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #F9FAFB;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
  </style>
</head>
<body style="background-color: #F9FAFB; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F9FAFB;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="465" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; max-width: 465px;">
          <tr>
            <td style="padding: 40px 20px;">
              
              <!-- Logo -->
              {{if .Logo}}
              <img src="{{.Logo}}" height="60" alt="Logo" style="height: 60px; width: auto; display: block; margin-bottom: 24px;">
              {{end}}
              
              <!-- Divider -->
              <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;">
              
              <!-- Title -->
              <h1 style="color: #111827; font-size: 24px; font-weight: 700; line-height: 32px; margin: 16px 0;">
                {{.Title}}
              </h1>
              
              <!-- Message -->
              <p style="color: #111827; font-size: 14px; line-height: 24px; margin: 0 0 24px 0;">
                {{.Message}}
              </p>
              
              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                <tr>
                  <td>
                    <a href="{{.ActionUrl}}" style="display: inline-block; padding: 12px 24px; background-color: #FFFFFF; color: #111827; font-size: 14px; font-weight: 500; text-decoration: none; border-radius: 6px; border: 1px solid #E5E7EB;">
                      {{.ActionText}}
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Footer -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px;">
                <tr>
                  <td style="padding-bottom: 12px;">
                    <span style="color: #9CA3AF; font-size: 13px;">
                      Powered by 
                      <a href="{{.PoweredByUrl}}" style="color: #6B7280; text-decoration: none; font-weight: 500;">
                        {{.PoweredByName}}
                      </a>
                    </span>
                  </td>
                </tr>
                {{if .UnsubscribeUrl}}
                <tr>
                  <td>
                    <a href="{{.UnsubscribeUrl}}" style="color: #9CA3AF; font-size: 13px; text-decoration: none;">
                      Unsubscribe
                    </a>
                  </td>
                </tr>
                {{end}}
              </table>
              
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  // Write files
  await writeFile(join(outDir, 'incident.html'), incidentHtml, 'utf-8');
  console.log('  ✓ out/incident.html');
  
  await writeFile(join(outDir, 'simple.html'), simpleHtml, 'utf-8');
  console.log('  ✓ out/simple.html');

  console.log('\n✅ Templates exported successfully!\n');
  console.log('📁 Output directory: out/');
  console.log('   - incident.html  (detailed incident notification)');
  console.log('   - simple.html    (simple notification)\n');
}

// Run export
generateTemplateStructure().catch(console.error);

