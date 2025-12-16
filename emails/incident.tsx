import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';
import * as React from 'react';
import {
  Header,
  Footer,
  Button,
  StatusBadge,
  ComponentList,
  MarkdownContent,
  styles,
  colors,
  CONTAINER_WIDTH,
} from '../components';
import type { ComponentItem } from '../components';

interface IncidentEmailProps {
  // Preview mode data (for development)
  preview?: {
    logo: string;
    eventType: string;
    title: string;
    status: string;
    statusColor: string;
    startedAt: string;
    message: string;
    components: ComponentItem[];
    actionUrl: string;
    actionText: string;
    poweredByLogo: string;
    poweredByName: string;
    poweredByUrl: string;
    unsubscribeUrl: string;
  };
}

export const IncidentEmail: React.FC<IncidentEmailProps> = ({ preview }) => {
  const isPreview = !!preview;
  
  // Use preview data or Go template placeholders
  const eventType = preview?.eventType || '{{.EventType}}';
  const title = preview?.title || '{{.Change.Title}}';
  const status = preview?.status;
  const statusColor = preview?.statusColor;
  const startedAt = preview?.startedAt || '{{.StartedAt}}';
  const messageHtml = preview?.message; // HTML content for preview
  const actionText = preview?.actionText || '{{.ActionText}}';
  const actionUrl = preview?.actionUrl;

  return (
    <Html>
      <Head />
      <Preview>{isPreview ? `${eventType}: ${title}` : '{{.EventType}}: {{.Change.Title}}'}</Preview>
      <Body style={styles.body}>
        <Container
          style={{
            ...styles.container,
            maxWidth: `${CONTAINER_WIDTH}px`,
          }}
        >
          {/* Header with Logo */}
          <Header logo={preview?.logo} />
          
          {/* Divider */}
          <Hr style={styles.divider} />
          
          {/* Event Type Label */}
          <Text style={{ ...styles.textMuted, marginBottom: '8px' }}>
            {eventType}
          </Text>
          
          {/* Title */}
          <Text style={styles.heading}>
            {title}
          </Text>
          
          {/* Status Badge + Started At */}
          <Section style={{ marginBottom: '24px' }}>
            <StatusBadge status={status} statusColor={statusColor} />
            <Text
              style={{
                display: 'inline',
                color: colors.textMuted,
                fontSize: '14px',
                margin: 0,
              }}
            >
              Started {startedAt}
            </Text>
          </Section>
          
          {/* Divider */}
          <Hr style={{ ...styles.divider, marginTop: 0 }} />
          
          {/* Message (Markdown content) */}
          <MarkdownContent>{messageHtml}</MarkdownContent>
          
          {/* Affected Components */}
          <ComponentList
            components={preview?.components}
            useTemplate={!isPreview}
          />
          
          {/* Divider */}
          <Hr style={styles.divider} />
          
          {/* CTA Button */}
          <Section style={{ marginBottom: '16px' }}>
            <Button href={actionUrl}>
              {actionText || 'View incident'}
            </Button>
          </Section>
          
          {/* Footer */}
          <Footer
            poweredByLogo={preview?.poweredByLogo}
            poweredByName={preview?.poweredByName}
            poweredByUrl={preview?.poweredByUrl}
            unsubscribeUrl={preview?.unsubscribeUrl}
          />
        </Container>
      </Body>
    </Html>
  );
};

// Default export with preview data for React Email dev server
export default function IncidentEmailPreview() {
  return (
    <IncidentEmail
      preview={{
        logo: 'https://console.flashcat.cloud/image/saas-logo-s.png',
        eventType: 'Incident updated',
        title: 'Elevated API Error Rates',
        status: 'Monitoring',
        statusColor: '#F59E0B',
        startedAt: 'December 3, 2025 11:07 AM UTC',
        message: 'We are sorry but the services seem to be down again. We are trying with **best effort** to improve the situation.\n\nFor more details, check our [status page](https://status.example.com).',
        components: [
          { name: 'Console', status: 'Partial outage', statusColor: '#F97316', icon: 'warning' },
          { name: 'Website', status: 'Full outage', statusColor: '#DC2626', icon: 'error' },
          { name: 'API', status: 'Operational', statusColor: '#10B981', icon: 'operational' },
        ],
        actionUrl: 'https://status.example.com/incidents/123',
        actionText: 'View incident',
        poweredByName: 'Flashduty',
        poweredByUrl: 'https://flashcat.cloud',
        poweredByLogo: 'https://console.flashcat.cloud/image/saas-logo.png',
        unsubscribeUrl: 'https://status.example.com/unsubscribe',
      }}
    />
  );
}

