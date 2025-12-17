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
      <Preview>{isPreview ? `确认您对 ${pageTitle} 状态页的订阅` : '确认您对 {{.PageTitle}} 状态页的订阅'}</Preview>
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
            确认您的订阅
          </Text>
          
          <Section>
            <Text style={{ ...styles.text, marginBottom: '24px' }}>
              请点击下面的按钮确认您对 <strong>{pageTitle} 状态页</strong>的订阅。
            </Text>
          </Section>
          
          <Section style={{ marginBottom: '16px' }}>
            <Button href={confirmURL}>
              确认订阅
            </Button>
          </Section>
          
          <Footer
            poweredByLogo={preview?.poweredByLogo}
            poweredByName={preview?.poweredByName}
            poweredByUrl={preview?.poweredByURL}
            showUnsubscribe={false}
            locale="zh-CN"
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

