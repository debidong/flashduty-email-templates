import { Markdown as ReactEmailMarkdown } from '@react-email/components';
import * as React from 'react';
import { colors } from './styles';

interface MarkdownContentProps {
  children?: string;
}

// Custom styles for markdown elements
const markdownCustomStyles = {
  p: {
    color: colors.textPrimary,
    fontSize: '14px',
    lineHeight: '24px',
    margin: '0 0 16px 0',
  },
  a: {
    color: '#2563EB',
    textDecoration: 'underline',
  },
  strong: {
    fontWeight: 600,
  },
  em: {
    fontStyle: 'italic' as const,
  },
  code: {
    backgroundColor: '#F3F4F6',
    padding: '2px 6px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '13px',
  },
  h1: {
    color: colors.textPrimary,
    fontSize: '20px',
    fontWeight: 700,
    margin: '0 0 16px 0',
  },
  h2: {
    color: colors.textPrimary,
    fontSize: '18px',
    fontWeight: 600,
    margin: '0 0 12px 0',
  },
  h3: {
    color: colors.textPrimary,
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 8px 0',
  },
  ul: {
    margin: '0 0 16px 0',
    paddingLeft: '24px',
  },
  ol: {
    margin: '0 0 16px 0',
    paddingLeft: '24px',
  },
  li: {
    marginBottom: '4px',
  },
  blockquote: {
    borderLeft: '3px solid #E5E7EB',
    paddingLeft: '16px',
    margin: '16px 0',
    color: colors.textSecondary,
  },
};

// Wrapper for React Email's official Markdown component
// In preview mode: pass markdown string as children
// In template mode: output Go template placeholder
export const MarkdownContent: React.FC<MarkdownContentProps> = ({ children }) => {
  // For preview mode with actual markdown content
  if (children) {
    return (
      <ReactEmailMarkdown
        markdownCustomStyles={markdownCustomStyles}
      >
        {children}
      </ReactEmailMarkdown>
    );
  }

  // Template mode: output Go template placeholder
  // Backend passes markdown string, we wrap it in Markdown component
  // But since Go template can't be processed by React, we output raw placeholder
  // Backend should pre-render markdown to HTML and use {{.ChangeDescriptionHTML}}
  return (
    <div
      style={{
        color: colors.textPrimary,
        fontSize: '14px',
        lineHeight: '24px',
      }}
      dangerouslySetInnerHTML={{
        __html: '{{.ChangeDescriptionHTML}}',
      }}
    />
  );
};

