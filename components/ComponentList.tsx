import { Section, Text, Row, Column } from '@react-email/components';
import * as React from 'react';
import { colors, styles } from './styles';

export interface ComponentItem {
  name: string;
  status: string;
  icon: 'operational' | 'under_maintenance' | 'degraded' | 'partial_outage' | 'full_outage';
}

type Locale = 'en-US' | 'zh-CN';

interface ComponentListProps {
  components?: ComponentItem[];
  useTemplate?: boolean;
  locale?: Locale;
}

const i18n = {
  'en-US': {
    affectedComponents: 'Affected Components',
    statusOperational: 'Operational',
    statusUnderMaintenance: 'Under Maintenance',
    statusDegraded: 'Degraded',
    statusPartialOutage: 'Partial Outage',
  },
  'zh-CN': {
    affectedComponents: '受影响组件',
    statusOperational: '运行正常',
    statusUnderMaintenance: '维护中',
    statusDegraded: '性能下降',
    statusPartialOutage: '部分中断',
  },
};

// SVG icons as data URI (URL encoded) for email compatibility
// Icons based on Lucide icon set, scaled to fit 16x16 with colored circular background
const iconUrls = {
  // Green checkmark for operational
  operational: "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='8' fill='%2310B981'/%3E%3Cpath d='M5 8L7 10L11 6' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E",
  // Blue wrench for under_maintenance (Lucide wrench icon, scaled with transform)
  under_maintenance: "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='8' fill='%233B82F6'/%3E%3Cg transform='translate(2.5,2.5) scale(0.45)'%3E%3Cpath d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z' stroke='white' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/g%3E%3C/svg%3E",
  // Yellow/Amber downward trend for degraded (Lucide trending-down icon, manually scaled)
  degraded: "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='8' fill='%23F59E0B'/%3E%3Cpath d='M9.5 10h2.5v-2.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3Cpath d='M12 10L8.5 6.5L6.5 8.5L4 6' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E",
  // Orange exclamation for partial_outage
  partial_outage: "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='8' fill='%23F97316'/%3E%3Cpath d='M8 4.5V8.5' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3Ccircle cx='8' cy='11' r='1' fill='white'/%3E%3C/svg%3E",
  // Red X for full_outage
  full_outage: "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='8' fill='%23DC2626'/%3E%3Cpath d='M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E",
};

const ComponentRow: React.FC<{ component: ComponentItem }> = ({ component }) => {
  return (
    <Row style={{ marginBottom: '8px' }}>
      <Column style={{ width: '24px', verticalAlign: 'middle' }}>
        <img
          src={iconUrls[component.icon]}
          width="16"
          height="16"
          alt={component.icon}
          style={{ display: 'block' }}
        />
      </Column>
      <Column style={{ verticalAlign: 'middle', paddingLeft: '8px' }}>
        <Text style={{ ...styles.text, fontWeight: 500, margin: 0, display: 'inline' }}>
          {component.name}
        </Text>
        <Text
          style={{
            ...styles.text,
            color: colors.textMuted,
            margin: 0,
            marginLeft: '12px',
            display: 'inline',
          }}
        >
          {component.status}
        </Text>
      </Column>
    </Row>
  );
};

export const ComponentList: React.FC<ComponentListProps> = ({
  components,
  useTemplate = true,
  locale = 'en-US',
}) => {
  const t = i18n[locale];

  // For preview mode with actual data
  if (components && components.length > 0) {
    return (
      <Section style={{ marginTop: '24px' }}>
        <Text
          style={{
            ...styles.text,
            color: colors.textSecondary,
            marginBottom: '12px',
          }}
        >
          {t.affectedComponents}
        </Text>
        {components.map((component, index) => (
          <ComponentRow key={index} component={component} />
        ))}
      </Section>
    );
  }

  // For template mode with Go template placeholders
  if (useTemplate) {
    return (
      <Section style={{ marginTop: '24px' }}>
        {/* Go template conditional: only show if Components exists */}
        {'{{if .ChangeAffectedComponents}}'}
        <Text
          style={{
            ...styles.text,
            color: '#6B7280',
            marginBottom: '12px',
          }}
        >
          {t.affectedComponents}
        </Text>
        {/* Go template range loop */}
        {'{{range .ChangeAffectedComponents}}'}
        <Row style={{ marginBottom: '8px' }}>
          <Column style={{ width: '24px', verticalAlign: 'middle' }}>
            {/* Conditional icon rendering based on Component Status field */}
            {/* Green checkmark for Operational */}
            {`{{if eq .Status "${t.statusOperational}"}}`}
            <img
              src={iconUrls.operational}
              width="16"
              height="16"
              alt="operational"
              style={{ display: 'block' }}
            />
            {`{{else if eq .Status "${t.statusUnderMaintenance}"}}`}
            <img
              src={iconUrls.under_maintenance}
              width="16"
              height="16"
              alt="under_maintenance"
              style={{ display: 'block' }}
            />
            {`{{else if eq .Status "${t.statusDegraded}"}}`}
            <img
              src={iconUrls.degraded}
              width="16"
              height="16"
              alt="degraded"
              style={{ display: 'block' }}
            />
            {`{{else if eq .Status "${t.statusPartialOutage}"}}`}
            <img
              src={iconUrls.partial_outage}
              width="16"
              height="16"
              alt="partial_outage"
              style={{ display: 'block' }}
            />
            {'{{else}}'}
            <img
              src={iconUrls.full_outage}
              width="16"
              height="16"
              alt="full_outage"
              style={{ display: 'block' }}
            />
            {'{{end}}'}
          </Column>
          <Column style={{ verticalAlign: 'middle', paddingLeft: '8px' }}>
            <span
              style={{
                color: '#111827',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              {'{{.Name}}'}
            </span>
            <span
              style={{
                color: '#9CA3AF',
                fontSize: '14px',
                marginLeft: '12px',
              }}
            >
              {'{{.Status}}'}
            </span>
          </Column>
        </Row>
        {'{{end}}'}
        {'{{end}}'}
      </Section>
    );
  }

  return null;
};

