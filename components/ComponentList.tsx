import { Section, Text, Row, Column } from '@react-email/components';
import * as React from 'react';
import { colors, styles } from './styles';

export interface ComponentItem {
  name: string;
  status: string;
  statusColor: string;
  icon: 'operational' | 'warning' | 'error';
}

interface ComponentListProps {
  components?: ComponentItem[];
  useTemplate?: boolean;
}

// SVG icons as data URI (URL encoded) for email compatibility
const iconUrls = {
  // Green checkmark for operational
  operational: "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='8' fill='%2310B981'/%3E%3Cpath d='M5 8L7 10L11 6' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E",
  // Orange circle with exclamation for warning/partial_outage
  warning: "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='8' fill='%23F97316'/%3E%3Cpath d='M8 4.5V8.5' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3Ccircle cx='8' cy='11' r='1' fill='white'/%3E%3C/svg%3E",
  // Red circle with exclamation for error/full_outage
  error: "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='8' fill='%23DC2626'/%3E%3Cpath d='M8 4.5V8.5' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3Ccircle cx='8' cy='11' r='1' fill='white'/%3E%3C/svg%3E",
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
}) => {
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
          Affected Components:
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
        {'{{if .Change.AffectedComponents}}'}
        <Text
          style={{
            ...styles.text,
            color: '#6B7280',
            marginBottom: '12px',
          }}
        >
          Affected Components:
        </Text>
        {/* Go template range loop */}
        {'{{range .Change.AffectedComponents}}'}
        <Row style={{ marginBottom: '8px' }}>
          <Column style={{ width: '24px', verticalAlign: 'middle' }}>
            {/* Conditional icon rendering based on Status field */}
            {'{{if eq .Status "operational"}}'}
            <img
              src="data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='8' fill='%2310B981'/%3E%3Cpath d='M5 8L7 10L11 6' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
              width="16"
              height="16"
              alt="operational"
              style={{ display: 'block' }}
            />
            {'{{else if eq .Status "degraded"}}'}
            <img
              src="data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='8' fill='%23F59E0B'/%3E%3Cpath d='M8 4.5V8.5' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3Ccircle cx='8' cy='11' r='1' fill='white'/%3E%3C/svg%3E"
              width="16"
              height="16"
              alt="degraded"
              style={{ display: 'block' }}
            />
            {'{{else if eq .Status "partial_outage"}}'}
            <img
              src="data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='8' fill='%23F97316'/%3E%3Cpath d='M8 4.5V8.5' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3Ccircle cx='8' cy='11' r='1' fill='white'/%3E%3C/svg%3E"
              width="16"
              height="16"
              alt="partial_outage"
              style={{ display: 'block' }}
            />
            {'{{else}}'}
            <img
              src="data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='8' fill='%23DC2626'/%3E%3Cpath d='M8 4.5V8.5' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3Ccircle cx='8' cy='11' r='1' fill='white'/%3E%3C/svg%3E"
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
              {'{{.StatusText}}'}
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

