import { Img, Section } from '@react-email/components';
import * as React from 'react';
import { LOGO_HEIGHT } from './styles';

interface HeaderProps {
  logo?: string;
}

export const Header: React.FC<HeaderProps> = ({ logo }) => {
  const logoUrl = logo || '{{.PageLogo}}';
  
  return (
    <Section style={{ marginBottom: '24px' }}>
      <Img
        src={logoUrl}
        height={LOGO_HEIGHT}
        alt="Logo"
        style={{
          height: `${LOGO_HEIGHT}px`,
          width: 'auto',
          display: 'block',
        }}
      />
    </Section>
  );
};

