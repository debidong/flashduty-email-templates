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
      if (preview?.isCreation) return `新${changeType}`;
      if (preview?.isRetrospective) return `回溯${changeType}`;
      return `${changeType}更新`;
    }
    return '{{if .IsCreation}}新{{.ChangeType}}{{else if .IsRetrospective}}回溯{{.ChangeType}}{{else}}{{.ChangeType}}更新{{end}}';
  };

  return (
    <Html>
      <Head />
      <Preview>{isPreview ? `${changeType}：${changeTitle}` : '{{.ChangeType}}：{{.ChangeTitle}}'}</Preview>
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
            <StatusBadge status={changeStatus} locale="zh-CN" />
            <Text
              style={{
                display: 'inline',
                color: colors.textMuted,
                fontSize: '14px',
                margin: 0,
              }}
            >
              开始于 {changeStartAt}
            </Text>
          </Section>
          
          <Hr style={{ ...styles.divider, marginTop: 0 }} />
          
          <MarkdownContent>{changeDescriptionHTML}</MarkdownContent>
          
          <ComponentList
            components={preview?.changeAffectedComponents}
            useTemplate={!isPreview}
            locale="zh-CN"
          />
          
          <Hr style={styles.divider} />
          
          <Section style={{ marginBottom: '16px' }}>
            <Button href={goToDetailURL}>
              查看详情
            </Button>
          </Section>
          
          <Footer
            poweredByLogo={preview?.poweredByLogo}
            poweredByName={preview?.poweredByName}
            poweredByUrl={preview?.poweredByURL}
            unsubscribeUrl={preview?.unsubscribeURL}
            locale="zh-CN"
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
        changeType: '故障',
        changeTitle: 'API 错误率上升',
        changeStatus: '监控中',
        changeStartAt: '2025年12月3日 11:07 UTC',
        changeDescriptionHTML: '很抱歉，服务似乎再次出现故障。我们正在**全力**改善情况。\n\n更多详情请查看我们的[状态页面](https://status.example.com)。',
        changeAffectedComponents: [
          { name: 'API', status: '运行正常', icon: 'operational' },
          { name: '数据库', status: '维护中', icon: 'under_maintenance' },
          { name: '控制台', status: '性能下降', icon: 'degraded' },
          { name: 'CDN', status: '部分中断', icon: 'partial_outage' },
          { name: '网站', status: '完全中断', icon: 'full_outage' },
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

