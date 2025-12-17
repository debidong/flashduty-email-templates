import { Link, Section, Text, Img, Row, Column } from '@react-email/components';
import * as React from 'react';
import { colors, styles } from './styles';

type Locale = 'en-US' | 'zh-CN';

interface FooterProps {
  poweredByLogo?: string;
  poweredByName?: string;
  poweredByUrl?: string;
  unsubscribeUrl?: string;
  showUnsubscribe?: boolean;
  locale?: Locale;
}

const i18n = {
  'en-US': {
    poweredBy: 'Powered by',
    unsubscribe: 'Unsubscribe',
  },
  'zh-CN': {
    poweredBy: 'Powered by',
    unsubscribe: '取消订阅',
  },
};

export const Footer: React.FC<FooterProps> = ({
  poweredByLogo,
  poweredByName,
  poweredByUrl,
  unsubscribeUrl,
  showUnsubscribe = true,
  locale = 'en-US',
}) => {
  const t = i18n[locale];

  // Use Go template placeholders for dynamic values
  const brandName = poweredByName || '{{.PoweredByName}}';
  const brandUrl = poweredByUrl || '{{.PoweredByURL}}';
  const brandLogo = poweredByLogo || '{{.PoweredByLogo}}';
  const unsubscribe = unsubscribeUrl || '{{.UnsubscribeURL}}';

  return (
    <Section style={{ marginTop: '32px' }}>
      {/* Powered by */}
      <Row style={{ marginBottom: '12px' }}>
        <Column>
          <Text style={{ ...styles.textMuted, fontSize: '13px', margin: 0 }}>
            {t.poweredBy}{' '}
            <Link
              href={brandUrl}
              style={{
                color: colors.textSecondary,
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              {brandLogo ? (
                <Img
                  src={brandLogo}
                  height={16}
                  alt={brandName}
                  style={{
                    height: '16px',
                    width: 'auto',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    marginLeft: '4px',
                  }}
                />
              ) : (
                brandName
              )}
            </Link>
          </Text>
        </Column>
      </Row>
      
      {/* Unsubscribe */}
      {showUnsubscribe && (
        <Row>
          <Column>
            <Link
              href={unsubscribe}
              style={{
                color: colors.textMuted,
                fontSize: '13px',
                textDecoration: 'none',
              }}
            >
              {t.unsubscribe}
            </Link>
          </Column>
        </Row>
      )}
    </Section>
  );
};

