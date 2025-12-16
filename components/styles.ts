import { CSSProperties } from 'react';

// Email width: 465px, centered
export const CONTAINER_WIDTH = 465;
export const LOGO_HEIGHT = 48;

export const colors = {
  // Text colors
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  
  // Status colors (incident)
  investigating: '#DC2626',
  identified: '#F97316',
  monitoring: '#F59E0B',
  resolved: '#10B981',
  
  // Component status colors
  operational: '#10B981',
  degradedPerformance: '#F59E0B',
  partialOutage: '#F97316',
  fullOutage: '#DC2626',
  underMaintenance: '#3B82F6',
  
  // UI colors
  border: '#E5E7EB',
  background: '#FFFFFF',
};

export const fonts = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

export const styles: Record<string, CSSProperties> = {
  body: {
    backgroundColor: '#F9FAFB',
    fontFamily: fonts.sans,
    margin: 0,
    padding: '40px 0',
  },
  
  container: {
    backgroundColor: colors.background,
    margin: '0 auto',
    padding: '40px 20px',
    borderRadius: '16px',
    maxWidth: `${CONTAINER_WIDTH}px`,
  },
  
  divider: {
    borderTop: '1px solid #F3F4F6',
    margin: '24px 0',
  },
  
  heading: {
    color: colors.textPrimary,
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '32px',
    margin: '0 0 8px 0',
  },
  
  text: {
    color: colors.textPrimary,
    fontSize: '14px',
    lineHeight: '24px',
    margin: '0',
  },
  
  textMuted: {
    color: colors.textSecondary,
    fontSize: '14px',
    lineHeight: '24px',
    margin: '0',
  },
  
  link: {
    color: colors.textSecondary,
    textDecoration: 'underline',
  },
};

