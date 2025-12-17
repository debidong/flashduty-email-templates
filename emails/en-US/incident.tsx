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
} from '../../components';
import type { ComponentItem } from '../../components';

interface IncidentEmailProps {
  preview?: {
    pageLogo: string;
    changeType: string;
    changeTitle: string;
    changeStatus: string;
    changeStartAt: string;
    changeDescriptionHTML: string;
    changeAffectedComponents: ComponentItem[];
    goToDetailURL: string;
    isCreation?: boolean;
    isRetrospective?: boolean;
    poweredByLogo: string;
    poweredByName: string;
    poweredByURL: string;
    unsubscribeURL: string;
  };
}

export const IncidentEmail: React.FC<IncidentEmailProps> = ({ preview }) => {
  const isPreview = !!preview;
  
  const changeType = preview?.changeType || '{{.ChangeType}}';
  const changeTitle = preview?.changeTitle || '{{.ChangeTitle}}';
  const changeStatus = preview?.changeStatus;
  const changeStartAt = preview?.changeStartAt || '{{.ChangeStartAt}}';
  const changeDescriptionHTML = preview?.changeDescriptionHTML;
  const goToDetailURL = preview?.goToDetailURL;

  const getEventTypeLabel = () => {
    if (isPreview) {
      if (preview?.isCreation) return `New ${changeType}`;
      if (preview?.isRetrospective) return `Retrospective ${changeType}`;
      return `${changeType} Update`;
    }
    return '{{if .IsCreation}}New {{.ChangeType}}{{else if .IsRetrospective}}Retrospective {{.ChangeType}}{{else}}{{.ChangeType}} Update{{end}}';
  };

  return (
    <Html>
      <Head />
      <Preview>{isPreview ? `${changeType}: ${changeTitle}` : '{{.ChangeType}}: {{.ChangeTitle}}'}</Preview>
      <Body style={styles.body}>
        <Container
          style={{
            ...styles.container,
            maxWidth: `${CONTAINER_WIDTH}px`,
          }}
        >
          <Header logo={preview?.pageLogo} />
          
          <Hr style={styles.divider} />
          
          <Text style={{ ...styles.textMuted, marginBottom: '8px' }}>
            {getEventTypeLabel()}
          </Text>
          
          <Text style={styles.heading}>
            {changeTitle}
          </Text>
          
          <Section style={{ marginBottom: '24px' }}>
            <StatusBadge status={changeStatus} locale="en-US" />
            <Text
              style={{
                display: 'inline',
                color: colors.textMuted,
                fontSize: '14px',
                margin: 0,
              }}
            >
              Started at {changeStartAt}
            </Text>
          </Section>
          
          <Hr style={{ ...styles.divider, marginTop: 0 }} />
          
          <MarkdownContent>{changeDescriptionHTML}</MarkdownContent>
          
          <ComponentList
            components={preview?.changeAffectedComponents}
            useTemplate={!isPreview}
            locale="en-US"
          />
          
          <Hr style={styles.divider} />
          
          <Section style={{ marginBottom: '16px' }}>
            <Button href={goToDetailURL}>
              View Detail
            </Button>
          </Section>
          
          <Footer
            poweredByLogo={preview?.poweredByLogo}
            poweredByName={preview?.poweredByName}
            poweredByUrl={preview?.poweredByURL}
            unsubscribeUrl={preview?.unsubscribeURL}
            locale="en-US"
          />
        </Container>
      </Body>
    </Html>
  );
};

export default function IncidentEmailPreview() {
  return (
    <IncidentEmail
      preview={{
        pageLogo: 'https://console.flashcat.cloud/image/saas-logo-s.png',
        changeType: 'Incident',
        changeTitle: 'Elevated API Error Rates',
        changeStatus: 'Monitoring',
        changeStartAt: 'December 3, 2025 11:07 AM UTC',
        changeDescriptionHTML: 'We are sorry but the services seem to be down again. We are trying with **best effort** to improve the situation.\n\nFor more details, check our [status page](https://status.example.com).',
        changeAffectedComponents: [
          { name: 'API', status: 'Operational', icon: 'operational' },
          { name: 'Database', status: 'Under Maintenance', icon: 'under_maintenance' },
          { name: 'Console', status: 'Degraded', icon: 'degraded' },
          { name: 'CDN', status: 'Partial Outage', icon: 'partial_outage' },
          { name: 'Website', status: 'Full Outage', icon: 'full_outage' },
        ],
        goToDetailURL: 'https://status.example.com/incidents/123',
        isCreation: false,
        isRetrospective: false,
        poweredByName: 'Flashduty',
        poweredByURL: 'https://flashcat.cloud',
        poweredByLogo: 'https://console.flashcat.cloud/image/saas-logo.png',
        unsubscribeURL: 'https://status.example.com/unsubscribe',
      }}
    />
  );
}

