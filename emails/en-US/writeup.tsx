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

interface WriteupEmailProps {
  preview?: {
    pageLogo: string;
    writeupTitle: string;
    writeupMessage: string;
    goToDetailURL: string;
    poweredByLogo: string;
    poweredByName: string;
    poweredByURL: string;
    unsubscribeURL: string;
  };
}

export const WriteupEmail: React.FC<WriteupEmailProps> = ({ preview }) => {
  const isPreview = !!preview;
  
  const writeupTitle = preview?.writeupTitle || '{{.WriteupTitle}}';
  const writeupMessage = preview?.writeupMessage || '{{.WriteupMessage}}';
  const goToDetailURL = preview?.goToDetailURL;

  return (
    <Html>
      <Head />
      <Preview>{isPreview ? writeupTitle : '{{.WriteupTitle}}'}</Preview>
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
            {writeupTitle}
          </Text>
          
          <Section>
            <Text style={{ ...styles.text, marginBottom: '24px' }}>
              {writeupMessage}
            </Text>
          </Section>
          
          <Section style={{ marginBottom: '16px' }}>
            <Button href={goToDetailURL}>
              View write-up
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

export default function WriteupEmailPreview() {
  return (
    <WriteupEmail
      preview={{
        pageLogo: 'https://console.flashcat.cloud/image/saas-logo-s.png',
        writeupTitle: 'A new write-up was added',
        writeupMessage: 'A new public write-up was shared in the incident Elevated API error on the Bowen Limitless status page.',
        goToDetailURL: 'https://status.example.com/writeups/123',
        poweredByLogo: 'https://console.flashcat.cloud/image/saas-logo.png',
        poweredByName: 'Flashduty',
        poweredByURL: 'https://flashcat.cloud',
        unsubscribeURL: 'https://status.example.com/unsubscribe',
      }}
    />
  );
}

