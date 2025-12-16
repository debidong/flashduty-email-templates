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

interface ConfirmEmailProps {
  // Preview mode data (for development)
  preview?: {
    logo: string;
    pageName: string;
    actionUrl: string;
    poweredByLogo: string;
    poweredByName: string;
    poweredByUrl: string;
  };
}

export const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ preview }) => {
  const isPreview = !!preview;
  
  // Use preview data or Go template placeholders
  const pageName = preview?.pageName || '{{.PageName}}';
  const actionUrl = preview?.actionUrl;

  return (
    <Html>
      <Head />
      <Preview>{isPreview ? `Confirm your subscription to ${pageName}` : 'Confirm your subscription to {{.PageName}}'}</Preview>
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
            Confirm your subscription
          </Text>
          
          {/* Message */}
          <Section>
            <Text style={{ ...styles.text, marginBottom: '24px' }}>
              Please click the button below to confirm your subscription to the {pageName} status page.
            </Text>
          </Section>
          
          {/* CTA Button */}
          <Section style={{ marginBottom: '16px' }}>
            <Button href={actionUrl}>
              Confirm
            </Button>
          </Section>
          
          {/* Footer - no unsubscribe link for confirmation email */}
          <Footer
            poweredByLogo={preview?.poweredByLogo}
            poweredByName={preview?.poweredByName}
            poweredByUrl={preview?.poweredByUrl}
            showUnsubscribe={false}
          />
        </Container>
      </Body>
    </Html>
  );
};

// Default export with preview data for React Email dev server
export default function ConfirmEmailPreview() {
  return (
    <ConfirmEmail
      preview={{
        logo: 'https://console.flashcat.cloud/image/saas-logo-s.png',
        pageName: 'Flashduty',
        actionUrl: 'https://status.example.com/confirm?token=abc123',
        poweredByLogo: 'https://console.flashcat.cloud/image/saas-logo.png',
        poweredByName: 'Flashduty',
        poweredByUrl: 'https://flashcat.cloud',
      }}
    />
  );
}

