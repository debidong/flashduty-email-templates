import { Link } from '@react-email/components';
import * as React from 'react';

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
}

// Bulletproof button using table layout for email client compatibility
export const Button: React.FC<ButtonProps> = ({ href, children }) => {
  const buttonUrl = href || '{{.GoToDetailURL}}';

  return (
    <table
      cellPadding="0"
      cellSpacing="0"
      border={0}
      style={{
        borderCollapse: 'collapse',
      }}
    >
      <tbody>
        <tr>
          <td
            style={{
              backgroundColor: '#F3F4F6',
              borderRadius: '6px',
              padding: '10px 20px',
            }}
          >
            <Link
              href={buttonUrl}
              style={{
                color: '#111827',
                fontSize: '14px',
                fontWeight: 400,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              {children}
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

