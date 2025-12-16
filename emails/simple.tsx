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
  styles,
  CONTAINER_WIDTH,
} from '../components';

interface SimpleEmailProps {
  // Preview mode data (for development)
  preview?: {
    logo: string;
    title: string;
    message: string;
    actionUrl: string;
    actionText: string;
    poweredByLogo: string;
    poweredByName: string;
    poweredByUrl: string;
    unsubscribeUrl: string;
  };
}

export const SimpleEmail: React.FC<SimpleEmailProps> = ({ preview }) => {
  const isPreview = !!preview;
  
  // Use preview data or Go template placeholders
  const title = preview?.title || '{{.Title}}';
  const message = preview?.message || '{{.Message}}';
  const actionText = preview?.actionText || '{{.ActionText}}';
  const actionUrl = preview?.actionUrl;

  return (
    <Html>
      <Head />
      <Preview>{isPreview ? title : '{{.Title}}'}</Preview>
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
          
          {/* Title */}
          <Text style={{ ...styles.heading, marginBottom: '16px', marginTop: '16px' }}>
            {title}
          </Text>
          
          {/* Message - supports HTML via Go template.HTML */}
          <Section>
            <Text style={{ ...styles.text, marginBottom: '24px' }}>
              {message}
            </Text>
          </Section>
          
          {/* CTA Button */}
          <Section style={{ marginBottom: '16px' }}>
            <Button href={actionUrl}>
              {actionText}
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
export default function SimpleEmailPreview() {
  return (
    <SimpleEmail
      preview={{
        logo: 'https://console.flashcat.cloud/image/saas-logo-s.png',
        title: 'A new write-up was added',
        message: 'A new public write-up was shared in the incident Elevated API error on the Bowen Limitless status page.',
        actionUrl: 'https://status.example.com/writeups/123',
        actionText: 'View write-up',
        poweredByLogo: 'https://console.flashcat.cloud/image/saas-logo.png',
        poweredByName: 'Flashduty',
        poweredByUrl: 'https://flashcat.cloud',
        unsubscribeUrl: 'https://status.example.com/unsubscribe',
      }}
    />
  );
}

