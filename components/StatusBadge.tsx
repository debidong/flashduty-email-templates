import { Text } from '@react-email/components';
import * as React from 'react';
import { colors } from './styles';

interface StatusBadgeProps {
  status?: string;
  statusColor?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  statusColor,
}) => {
  // Use Go template placeholders for dynamic values
  const displayStatus = status || '{{.Status}}';
  const color = statusColor || '{{.StatusColor}}';

  return (
    <Text
      style={{
        display: 'inline',
        color: color,
        fontSize: '14px',
        fontWeight: 400,
        margin: 0,
        marginRight: '12px',
      }}
    >
      {displayStatus}
    </Text>
  );
};

