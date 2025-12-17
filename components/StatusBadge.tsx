import * as React from 'react';
import { colors } from './styles';

type Locale = 'en-US' | 'zh-CN';

interface StatusBadgeProps {
  status?: string;
  locale?: Locale;
}

// Status to color mapping for preview mode
const statusColors: Record<string, string> = {
  // English - Incident statuses
  'Investigating': colors.fullOutage,
  'Identified': colors.fullOutage,
  'Monitoring': colors.degradedPerformance,
  'Resolved': colors.operational,
  // English - Maintenance statuses
  'Scheduled': colors.underMaintenance,
  'Ongoing': colors.underMaintenance,
  'Completed': colors.operational,
  // Chinese - Incident statuses
  '排查中': colors.fullOutage,
  '已定位': colors.fullOutage,
  '监控中': colors.degradedPerformance,
  '已恢复': colors.operational,
  // Chinese - Maintenance statuses
  '已排期': colors.underMaintenance,
  '进行中': colors.underMaintenance,
  '已完成': colors.operational,
};

// i18n status values for Go template conditions
const i18nStatuses = {
  'en-US': {
    resolved: 'Resolved',
    completed: 'Completed',
    scheduled: 'Scheduled',
    ongoing: 'Ongoing',
    monitoring: 'Monitoring',
  },
  'zh-CN': {
    resolved: '已恢复',
    completed: '已完成',
    scheduled: '已排期',
    ongoing: '进行中',
    monitoring: '监控中',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  locale = 'en-US',
}) => {
  const t = i18nStatuses[locale];

  // Preview mode: use status to determine color
  if (status) {
    const color = statusColors[status] || colors.fullOutage;
    return (
      <p
        style={{
          display: 'inline',
          color: color,
          fontSize: '14px',
          lineHeight: '24px',
          fontWeight: 400,
          margin: 0,
          marginRight: '12px',
        }}
      >
        {status}
      </p>
    );
  }

  // Template mode: output raw HTML with Go template conditional for color
  // Green for resolved/completed, Blue for scheduled/ongoing, Yellow for monitoring, Red for others
  const goTemplateHtml = `<p style="font-size:14px;line-height:24px;margin:0;display:inline;color:{{if or (eq .ChangeStatus "${t.resolved}") (eq .ChangeStatus "${t.completed}")}}${colors.operational}{{else if or (eq .ChangeStatus "${t.scheduled}") (eq .ChangeStatus "${t.ongoing}")}}${colors.underMaintenance}{{else if eq .ChangeStatus "${t.monitoring}"}}${colors.degradedPerformance}{{else}}${colors.fullOutage}{{end}};font-weight:400;margin-right:12px">{{.ChangeStatus}}</p>`;

  return <span dangerouslySetInnerHTML={{ __html: goTemplateHtml }} />;
};
