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
} from '../../components';

interface ConfirmEmailProps {
  preview?: {
    pageLogo: string;
    pageTitle: string;
    confirmURL: string;
    poweredByLogo: string;
    poweredByName: string;
    poweredByURL: string;
  };
}

export const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ preview }) => {
  const isPreview = !!preview;
  
  const pageTitle = preview?.pageTitle || '{{.PageTitle}}';
  const confirmURL = preview?.confirmURL || '{{.ConfirmURL}}';

  return (
    <Html>
      <Head />
      <Preview>{isPreview ? `Confirm your subscription to ${pageTitle} Status Page` : 'Confirm your subscription to {{.PageTitle}} Status Page'}</Preview>
      <Body style={styles.body}>
        <Container
          style={{
            ...styles.container,
            maxWidth: `${CONTAINER_WIDTH}px`,
          }}
        >
          <Header logo={preview?.pageLogo} />
          
          <Hr style={styles.divider} />
          
          <Text style={{ ...styles.heading, marginBottom: '16px', marginTop: '16px' }}>
            Confirm your subscription
          </Text>
          
          <Section>
            <Text style={{ ...styles.text, marginBottom: '24px' }}>
              Please click the button below to confirm your subscription to the <strong>{pageTitle} Status Page</strong>.
            </Text>
          </Section>
          
          <Section style={{ marginBottom: '16px' }}>
            <Button href={confirmURL}>
              Confirm
            </Button>
          </Section>
          
          <Footer
            poweredByLogo={preview?.poweredByLogo}
            poweredByName={preview?.poweredByName}
            poweredByUrl={preview?.poweredByURL}
            showUnsubscribe={false}
            locale="en-US"
          />
        </Container>
      </Body>
    </Html>
  );
};

export default function ConfirmEmailPreview() {
  return (
    <ConfirmEmail
      preview={{
        pageLogo: 'https://console.flashcat.cloud/image/saas-logo-s.png',
        pageTitle: 'Flashduty',
        confirmURL: 'https://status.example.com/confirm?token=abc123',
        poweredByLogo: 'https://console.flashcat.cloud/image/saas-logo.png',
        poweredByName: 'Flashduty',
        poweredByURL: 'https://flashcat.cloud',
      }}
    />
  );
}

