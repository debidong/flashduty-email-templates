# Status Page Email Templates

基于 [React Email](https://react.email/) 构建的 Status Page 邮件 HTML 模板，供后端（Go）动态渲染使用。

## 🎯 项目目标

- 输出**静态 HTML 模板**，使用 Go template 语法占位符
- 后端同学可直接使用 `html/template` 渲染
- 兼容主流邮件客户端（Gmail、Outlook、Apple Mail 等）
- 布局清晰，占位符语义明确，易于维护
- 支持多语言（en-US / zh-CN）

## 📧 模板清单

| 模板文件 | 布局类型 | 适用场景 |
|---------|---------|---------|
| `update_email.html` | 详细布局 | 新事件、事件更新、维护通知（含状态、受影响组件、Markdown 描述） |
| `writeup_email.html` | 简单布局 | 复盘报告通知 |
| `confirmation_email.html` | 确认布局 | 订阅确认（无退订链接） |

## 🏗️ 模板结构

> **布局规范：** 邮件宽度 `465px`，整体居中，圆角 `16px`

### 1. 事件/维护更新模板 (`update_email.html`)

```
┌─────────────────────────────────────┐
│  [Logo]                             │  ← {{.PageLogo}}
├─────────────────────────────────────┤
│  New Incident / Incident Update     │  ← 根据 {{.IsCreation}} 和 {{.IsRetrospective}} 判断
│  / Retrospective Incident           │
│                                     │
│  {{.ChangeTitle}}                   │  ← 事件/维护标题（大字）
│                                     │
│  [StatusBadge] Started {{.ChangeStartAt}}│  ← 状态标签 + 开始时间
├─────────────────────────────────────┤
│                                     │
│  {{.ChangeDescriptionHTML}}         │  ← Markdown 转 HTML 内容
│                                     │
│  Affected Components:               │
│  ├─ ✓ Component1  Operational       │  ← {{range .ChangeAffectedComponents}}
│  ├─ 🔧 Component2  Under Maintenance│
│  └─ ! Component3  Full outage       │
│                                     │
├─────────────────────────────────────┤
│  [ View Detail ]                    │  ← {{.GoToDetailURL}}
│                                     │
├─────────────────────────────────────┤
│  Powered by [BrandLogo]             │  ← {{.PoweredByLogo}} / {{.PoweredByName}}
│  Unsubscribe                        │  ← {{.UnsubscribeURL}}
└─────────────────────────────────────┘
```

### 2. 复盘报告模板 (`writeup_email.html`)

```
┌─────────────────────────────────────┐
│  [Logo]                             │  ← {{.PageLogo}}
├─────────────────────────────────────┤
│                                     │
│  {{.WriteupTitle}}                  │  ← 复盘标题
│                                     │
│  {{.WriteupMessage}}                │  ← 复盘消息
│                                     │
│  [ View write-up ]                  │  ← {{.GoToDetailURL}}
│                                     │
├─────────────────────────────────────┤
│  Powered by [BrandLogo]             │
│  Unsubscribe                        │  ← {{.UnsubscribeURL}}
└─────────────────────────────────────┘
```

### 3. 订阅确认模板 (`confirmation_email.html`)

```
┌─────────────────────────────────────┐
│  [Logo]                             │  ← {{.PageLogo}}
├─────────────────────────────────────┤
│                                     │
│  Confirm your subscription          │  ← 固定标题
│                                     │
│  Please click the button below...   │  ← 包含 {{.PageTitle}}
│                                     │
│  [ Confirm ]                        │  ← {{.ConfirmURL}}
│                                     │
├─────────────────────────────────────┤
│  Powered by [BrandLogo]             │  ← 无退订链接
└─────────────────────────────────────┘
```

## 📋 Go Template 占位符

### 事件/维护更新模板 (`update_email.html`)

| 占位符 | 类型 | 必填 | 说明 |
|-------|------|-----|------|
| `{{.PageLogo}}` | string | 否 | Logo 图片 URL（高度 48px，宽度自适应） |
| `{{.IsCreation}}` | bool | 是 | 是否是新创建的事件/维护（用于显示 "New" 前缀） |
| `{{.IsRetrospective}}` | bool | 是 | 是否是回顾性事件（用于显示 "Retrospective" 前缀） |
| `{{.ChangeTitle}}` | string | 是 | 事件/维护标题 |
| `{{.ChangeType}}` | string | 是 | 事件类型（已翻译），如 "Incident" / "Maintenance" |
| `{{.ChangeStatus}}` | string | 是 | 状态文字（已翻译），如 "Investigating" / "Scheduled" / "Completed"，模板会根据状态自动确定颜色 |
| `{{.ChangeStartAt}}` | string | 是 | 格式化后的开始时间 |
| `{{.ChangeDescriptionHTML}}` | template.HTML | 是 | Markdown 转 HTML 后的内容（后端处理） |
| `{{.ChangeAffectedComponents}}` | []Component | 否 | 受影响组件列表，为空时自动隐藏 |
| `{{.GoToDetailURL}}` | string | 是 | 查看详情链接 |
| `{{.UnsubscribeURL}}` | string | 是 | 退订链接 |
| `{{.PoweredByLogo}}` | string | 否 | Powered by Logo URL |
| `{{.PoweredByName}}` | string | 否 | Powered by 名称 |
| `{{.PoweredByURL}}` | string | 否 | Powered by 链接 |

#### 标题显示逻辑

**英文模板 (en-US):**
```html
{{if .IsCreation}}New {{.ChangeType}}{{else if .IsRetrospective}}Retrospective {{.ChangeType}}{{else}}{{.ChangeType}} Update{{end}}
```

- 新创建：`New Incident` / `New Maintenance`
- 回顾性：`Retrospective Incident` / `Retrospective Maintenance`
- 更新：`Incident Update` / `Maintenance Update`

**中文模板 (zh-CN):**
```html
{{if .IsCreation}}新{{.ChangeType}}{{else if .IsRetrospective}}回溯{{.ChangeType}}{{else}}{{.ChangeType}}更新{{end}}
```

- 新创建：`新故障` / `新维护`
- 回顾性：`回溯故障` / `回溯维护`
- 更新：`故障更新` / `维护更新`

#### 状态颜色自动映射

模板会根据 `ChangeStatus` 的值自动确定颜色，无需传入 `ChangeStatusColor`：

**英文状态:**

| Status | 颜色 | 说明 |
|--------|------|------|
| `Resolved` / `Completed` | 绿色 #10B981 | 已解决/已完成 |
| `Scheduled` | 蓝色 #3B82F6 | 已计划 |
| `Monitoring` | 黄色 #F59E0B | 监控中 |
| 其他 (`Investigating` / `Identified` / `In Progress`) | 红色 #DC2626 | 进行中 |

**中文状态:**

| Status | 颜色 | 说明 |
|--------|------|------|
| `已解决` / `已完成` | 绿色 #10B981 | 已解决/已完成 |
| `已计划` | 蓝色 #3B82F6 | 已计划 |
| `监控中` | 黄色 #F59E0B | 监控中 |
| 其他 (`调查中` / `已确认` / `进行中`) | 红色 #DC2626 | 进行中 |

#### Component 结构（受影响组件）

| 字段 | 类型 | 说明 |
|-----|------|------|
| `{{.Name}}` | string | 组件名称，如 "Console" / "Website" |
| `{{.Status}}` | string | 状态（已翻译），同时用于图标判断和文字显示 |

> **注意：** Status 字段是翻译后的值，需要在模板中用翻译后的文本进行判断。

#### Change 状态颜色（用于 StatusBadge）

Change 分为 Incident（故障）和 Maintenance（维护）两种类型：

**Incident 状态:**

| 英文 | 中文 | 颜色 |
|------|------|------|
| `Investigating` | `排查中` | 红色 #DC2626 |
| `Identified` | `已定位` | 红色 #DC2626 |
| `Monitoring` | `监控中` | 黄色 #F59E0B |
| `Resolved` | `已恢复` | 绿色 #10B981 |

**Maintenance 状态:**

| 英文 | 中文 | 颜色 |
|------|------|------|
| `Scheduled` | `已排期` | 蓝色 #3B82F6 |
| `Ongoing` | `进行中` | 蓝色 #3B82F6 |
| `Completed` | `已完成` | 绿色 #10B981 |

#### 组件状态图标对照（用于 ComponentList）

每个组件状态都有独特的图标设计（基于 Lucide 图标）：

**Incident 相关组件状态:**

| 英文 | 中文 | 图标 | 颜色 |
|------|------|------|------|
| `Operational` | `运行正常` | ✓ 勾选 | 绿色 #10B981 |
| `Degraded` | `性能下降` | 📉 下降趋势 | 黄色 #F59E0B |
| `Partial Outage` | `部分中断` | ⚠ 感叹号 | 橙色 #F97316 |
| `Full Outage` | `完全中断` | ✕ 叉号 | 红色 #DC2626 |

**Maintenance 相关组件状态:**

| 英文 | 中文 | 图标 | 颜色 |
|------|------|------|------|
| `Operational` | `运行正常` | ✓ 勾选 | 绿色 #10B981 |
| `Under Maintenance` | `维护中` | 🔧 扳手 | 蓝色 #3B82F6 |

### 复盘报告模板 (`writeup_email.html`)

| 占位符 | 类型 | 必填 | 说明 |
|-------|------|-----|------|
| `{{.PageLogo}}` | string | 否 | Logo 图片 URL |
| `{{.WriteupTitle}}` | string | 是 | 复盘标题 |
| `{{.WriteupMessage}}` | string | 是 | 复盘消息内容 |
| `{{.GoToDetailURL}}` | string | 是 | 查看复盘详情链接 |
| `{{.UnsubscribeURL}}` | string | 是 | 退订链接 |
| `{{.PoweredByLogo}}` | string | 否 | Powered by Logo URL |
| `{{.PoweredByName}}` | string | 否 | Powered by 名称 |
| `{{.PoweredByURL}}` | string | 否 | Powered by 链接 |

### 订阅确认模板 (`confirmation_email.html`)

| 占位符 | 类型 | 必填 | 说明 |
|-------|------|-----|------|
| `{{.PageLogo}}` | string | 否 | Logo 图片 URL |
| `{{.PageTitle}}` | string | 是 | 状态页名称（显示在确认文案中） |
| `{{.ConfirmURL}}` | string | 是 | 确认订阅链接 |
| `{{.PoweredByLogo}}` | string | 否 | Powered by Logo URL |
| `{{.PoweredByName}}` | string | 否 | Powered by 名称 |
| `{{.PoweredByURL}}` | string | 否 | Powered by 链接 |

> **注意：** 订阅确认邮件不显示退订链接

## 🎨 预定义样式常量

```go
// 组件状态显示文字（英文）
var ComponentStatusTextEN = map[string]string{
    "operational":       "Operational",
    "degraded":          "Degraded",
    "partial_outage":    "Partial Outage",
    "full_outage":       "Full Outage",
    "under_maintenance": "Under Maintenance",
}

// 组件状态显示文字（中文）
var ComponentStatusTextZH = map[string]string{
    "operational":       "运行正常",
    "degraded":          "性能下降",
    "partial_outage":    "部分中断",
    "full_outage":       "完全中断",
    "under_maintenance": "维护中",
}
```

## 📁 项目结构

```
flashduty-email-templates/
├── emails/                     # React Email 源码
│   ├── en-US/
│   │   ├── incident.tsx        # 事件/维护更新模板
│   │   ├── writeup.tsx         # 复盘报告模板
│   │   └── confirm.tsx         # 订阅确认模板
│   └── zh-CN/
│       ├── incident.tsx
│       ├── writeup.tsx
│       └── confirm.tsx
├── components/                 # 共享组件
│   ├── Header.tsx             # 顶部 Logo
│   ├── Footer.tsx             # 底部 Powered by + Unsubscribe
│   ├── Button.tsx             # CTA 按钮（bulletproof 实现）
│   ├── StatusBadge.tsx        # 状态标签
│   ├── ComponentList.tsx      # 受影响组件列表
│   ├── Markdown.tsx           # Markdown 内容渲染
│   ├── styles.ts              # 共享样式常量
│   └── index.ts               # 组件导出
├── scripts/
│   └── export.ts              # 导出脚本
├── out/                        # 构建输出 ⭐ 后端使用这些文件
│   ├── en-US/
│   │   ├── update_email.html
│   │   ├── writeup_email.html
│   │   └── confirmation_email.html
│   └── zh-CN/
│       ├── update_email.html
│       ├── writeup_email.html
│       └── confirmation_email.html
├── package.json
└── README.md
```

## 🚀 开发命令

```bash
# 安装依赖
npm install

# 启动预览服务（开发时使用）
npm run dev
# 访问 http://localhost:3001

# 导出 HTML 模板（给后端使用）
npm run export
```

## 💡 后端使用示例

### 数据结构定义

```go
package tmpl

import "html/template"

// UpdateEmailData 事件/维护更新邮件数据
type UpdateEmailData struct {
    PageLogo                 string
    IsCreation               bool          // len(change.Updates) <= 1
    IsRetrospective          bool
    ChangeTitle              string
    ChangeType               string        // 已翻译: "Incident" / "Maintenance" / "故障" / "维护"
    ChangeStatus             string        // 已翻译: "Investigating" / "Scheduled" 等（模板自动判断颜色）
    ChangeStartAt            string        // 格式化的开始时间
    ChangeDescriptionHTML    template.HTML // Markdown 转 HTML
    ChangeAffectedComponents []AffectedComponentItem
    GoToDetailURL            string
    UnsubscribeURL           string
    PoweredByLogo            string
    PoweredByURL             string
    PoweredByName            string
}

type AffectedComponentItem struct {
    Name   string
    Status string // 已翻译: "Operational" / "运行正常" 等
}

// WriteupEmailData 复盘报告邮件数据
type WriteupEmailData struct {
    PageLogo       string
    WriteupTitle   string
    WriteupMessage string
    GoToDetailURL  string
    UnsubscribeURL string
    PoweredByLogo  string
    PoweredByURL   string
    PoweredByName  string
}

// ConfirmationEmailData 订阅确认邮件数据
type ConfirmationEmailData struct {
    PageLogo      string
    PageTitle     string
    ConfirmURL    string
    PoweredByLogo string
    PoweredByURL  string
    PoweredByName string
}
```

### 渲染示例

```go
func FormatUpdateEmail(page *types.StatusPageItem, change *types.StatusChangeItem, token, locale string) (subject, content string, err error) {
    tmpl, err := types.GetTemplate("update_email", locale)
    if err != nil {
        return "", "", err
    }

    data := map[string]interface{}{
        "PageLogo":                 page.Logo,
        "IsCreation":               len(change.Updates) <= 1,
        "IsRetrospective":          change.IsRetrospective,
        "ChangeTitle":              change.Title,
        "ChangeType":               i18nChangeType(locale, change.Type),
        "ChangeStatus":             i18nChangeStatus(locale, change.Status),
        "ChangeStartAt":            i18nTime(locale, change.StartAtSeconds),
        "ChangeDescriptionHTML":    template.HTML(types.MdToHTML([]byte(change.Description))),
        "ChangeAffectedComponents": i18nAffectedComponents(locale, change.AffectedComponents),
        "GoToDetailURL":            formatChangeURL(page.CustomDomain, page.URLName, change.ChangeID),
        "UnsubscribeURL":           unsubscribeURL,
        "PoweredByLogo":            types.FlashdutyLogoURL,
        "PoweredByURL":             types.FlashdutyURL,
        "PoweredByName":            types.Flashduty,
    }

    var buf bytes.Buffer
    if err := tmpl.Execute(&buf, data); err != nil {
        return "", "", fmt.Errorf("failed to execute template: %w", err)
    }

    return subject, buf.String(), nil
}
```

## 📝 设计决策

1. **状态颜色由后端传入**：直接传入 CSS 颜色值（如 `#10B981`），保持灵活性
2. **时间格式由后端处理**：不同 locale 可能需要不同格式
3. **Markdown 由后端转 HTML**：Go 模板无法运行 React 组件，使用 `template.HTML` 类型防止转义
4. **组件状态已翻译**：Status 字段直接包含翻译后的文本，模板中用翻译后的值判断图标
5. **使用 bulletproof button**：确保按钮在所有邮件客户端正确显示（包括 Outlook）
6. **图标使用 Data URI**：内联 SVG 避免外部图片加载问题
7. **使用 table 布局**：确保邮件客户端兼容性

## ✅ 已确认规范

| 项目 | 规范 |
|-----|------|
| **邮件宽度** | 465px，整体居中 |
| **容器圆角** | 16px |
| **Logo 尺寸** | 高度 48px，宽度自适应 |
| **Powered by** | Flashduty |
| **组件列表** | 通过 `{{if .ChangeAffectedComponents}}` 控制显示/隐藏 |
| **按钮样式** | 灰色背景 #F3F4F6，圆角 6px，内边距 10px 20px |
| **分割线颜色** | #F3F4F6 |
