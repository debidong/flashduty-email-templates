# Status Page Email Templates

基于 [React Email](https://react.email/) 构建的 Status Page 邮件 HTML 模板，供后端（Go）动态渲染使用。

## 🎯 项目目标

- 输出**静态 HTML 模板**，使用 Go template 语法占位符
- 后端同学可直接使用 `html/template` 渲染
- 兼容主流邮件客户端（Gmail、Outlook、Apple Mail 等）
- 布局清晰，占位符语义明确，易于维护

## 📧 模板清单

| 模板文件 | 布局类型 | 适用场景 |
|---------|---------|---------|
| `incident.html` | 详细布局 | 新事件、事件更新、事件恢复（含状态、受影响组件、Markdown 描述） |
| `simple.html` | 简洁布局 | Write-up 通知等（标题+描述+按钮） |
| `confirm.html` | 确认布局 | 订阅确认（无退订链接） |

## 🏗️ 模板结构

> **布局规范：** 邮件宽度 `465px`，整体居中，圆角 `16px`

### 1. 详细事件模板 (`incident.html`)

```
┌─────────────────────────────────────┐
│  [Logo]                             │  ← {{.StatusPage.Logo}}
├─────────────────────────────────────┤
│  {{.EventType}}                     │  ← "New incident" / "Incident updated"
│                                     │
│  {{.Change.Title}}                  │  ← 事件标题（大字）
│                                     │
│  [StatusBadge] Started {{.StartedAt}}│  ← 状态标签 + 开始时间
├─────────────────────────────────────┤
│                                     │
│  {{.Update.DescriptionHTML}}        │  ← Markdown 转 HTML 内容
│                                     │
│  Affected Components:               │
│  ├─ ✓ Component1  Operational       │  ← {{range .Change.AffectedComponents}}
│  ├─ ! Component2  Partial outage    │
│  └─ ! Component3  Full outage       │
│                                     │
├─────────────────────────────────────┤
│  [ View incident ]                  │  ← {{.ActionUrl}} / {{.ActionText}}
│                                     │
├─────────────────────────────────────┤
│  Powered by [BrandLogo]             │  ← {{.PoweredByLogo}} / {{.PoweredByName}}
│  Unsubscribe                        │  ← {{.ManageSubscriptionsURL}}
└─────────────────────────────────────┘
```

### 2. 简洁通知模板 (`simple.html`)

```
┌─────────────────────────────────────┐
│  [Logo]                             │  ← {{.StatusPage.Logo}}
├─────────────────────────────────────┤
│                                     │
│  {{.Title}}                         │  ← 通知标题
│                                     │
│  {{.Message}}                       │  ← 通知内容
│                                     │
│  [ {{.ActionText}} ]                │  ← 按钮文字和链接
│                                     │
├─────────────────────────────────────┤
│  Powered by [BrandLogo]             │
│  Unsubscribe                        │
└─────────────────────────────────────┘
```

### 3. 订阅确认模板 (`confirm.html`)

```
┌─────────────────────────────────────┐
│  [Logo]                             │  ← {{.StatusPage.Logo}}
├─────────────────────────────────────┤
│                                     │
│  Confirm your subscription          │  ← 固定标题
│                                     │
│  Please click the button below...   │  ← 包含 {{.PageName}}
│                                     │
│  [ Confirm ]                        │  ← {{.ActionUrl}}
│                                     │
├─────────────────────────────────────┤
│  Powered by [BrandLogo]             │  ← 无退订链接
└─────────────────────────────────────┘
```

## 📋 Go Template 占位符

### 详细事件模板 (`incident.html`)

| 占位符 | 类型 | 必填 | 说明 |
|-------|------|-----|------|
| `{{.StatusPage.Logo}}` | string | 否 | Logo 图片 URL（高度 60px，宽度自适应） |
| `{{.EventType}}` | string | 是 | 事件类型文案，如 "New incident" / "Incident updated" |
| `{{.Change.Title}}` | string | 是 | 事件标题 |
| `{{.Status}}` | string | 是 | 状态文字，如 "Investigating" / "Monitoring" / "Resolved" |
| `{{.StatusColor}}` | string | 是 | 状态颜色代码，如 "#F59E0B" |
| `{{.StartedAt}}` | string | 是 | 格式化后的开始时间 |
| `{{.Update.DescriptionHTML}}` | template.HTML | 是 | Markdown 转 HTML 后的内容（后端处理） |
| `{{.Change.AffectedComponents}}` | []Component | 否 | 受影响组件列表，为空时自动隐藏 |
| `{{.ActionUrl}}` | string | 是 | 查看详情链接 |
| `{{.ActionText}}` | string | 否 | 按钮文字，默认 "View incident" |
| `{{.PoweredByLogo}}` | string | 否 | Powered by Logo URL |
| `{{.PoweredByName}}` | string | 否 | Powered by 名称 |
| `{{.PoweredByUrl}}` | string | 否 | Powered by 链接 |
| `{{.ManageSubscriptionsURL}}` | string | 否 | 管理订阅/退订链接 |

#### Component 结构（受影响组件）

| 字段 | 类型 | 说明 |
|-----|------|------|
| `{{.Name}}` | string | 组件名称，如 "Console" / "Website" |
| `{{.Status}}` | string | 状态标识，决定图标：`operational` / `degraded` / `partial_outage` / `full_outage` |
| `{{.StatusText}}` | string | 状态显示文字，如 "Operational" / "Partial outage" |

#### 组件状态图标对照

| Status 值 | 图标 | 颜色 |
|----------|------|------|
| `operational` | ✓ 绿色勾选 | #10B981 |
| `degraded` | ! 黄色感叹号 | #F59E0B |
| `partial_outage` | ! 橙色感叹号 | #F97316 |
| 其他（full_outage 等） | ! 红色感叹号 | #DC2626 |

### 简洁通知模板 (`simple.html`)

| 占位符 | 类型 | 必填 | 说明 |
|-------|------|-----|------|
| `{{.StatusPage.Logo}}` | string | 否 | Logo 图片 URL |
| `{{.Title}}` | string | 是 | 通知标题 |
| `{{.Message}}` | template.HTML | 是 | 通知内容（支持 HTML） |
| `{{.ActionUrl}}` | string | 是 | 按钮链接 |
| `{{.ActionText}}` | string | 是 | 按钮文字 |
| `{{.PoweredBy*}}` | - | 否 | 同上 |
| `{{.ManageSubscriptionsURL}}` | string | 否 | 管理订阅链接 |

### 订阅确认模板 (`confirm.html`)

| 占位符 | 类型 | 必填 | 说明 |
|-------|------|-----|------|
| `{{.StatusPage.Logo}}` | string | 否 | Logo 图片 URL |
| `{{.PageName}}` | string | 是 | 状态页名称（显示在确认文案中） |
| `{{.ActionUrl}}` | string | 是 | 确认订阅链接 |
| `{{.PoweredBy*}}` | - | 否 | 同上 |

> **注意：** 订阅确认邮件不显示退订链接

## 🎨 预定义样式常量

```go
// 事件状态颜色
var IncidentStatusColors = map[string]string{
    "investigating": "#DC2626", // 红色
    "identified":    "#F97316", // 橙色  
    "monitoring":    "#F59E0B", // 黄色
    "resolved":      "#10B981", // 绿色
}

// 组件状态 -> 显示文字
var ComponentStatusText = map[string]string{
    "operational":      "Operational",
    "degraded":         "Degraded performance",
    "partial_outage":   "Partial outage",
    "full_outage":      "Full outage",
    "under_maintenance": "Under maintenance",
}
```

## 📁 项目结构

```
status-page-email/
├── emails/                     # React Email 源码
│   ├── incident.tsx           # 详细事件模板
│   ├── simple.tsx             # 简洁通知模板
│   └── confirm.tsx            # 订阅确认模板
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
│   ├── incident.html
│   ├── simple.html
│   └── confirm.html
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
package email

import "html/template"

// IncidentEmailData 事件通知邮件数据
type IncidentEmailData struct {
    StatusPage struct {
        Logo string
    }
    EventType   string          // "New incident" / "Incident updated" / "Incident resolved"
    Change      ChangeData
    Update      UpdateData
    Status      string          // 状态文字
    StatusColor string          // 状态颜色
    StartedAt   string          // 格式化的开始时间
    ActionUrl   string
    ActionText  string
    PoweredByLogo  string
    PoweredByName  string
    PoweredByUrl   string
    ManageSubscriptionsURL string
}

type ChangeData struct {
    Title              string
    AffectedComponents []ComponentData
}

type UpdateData struct {
    DescriptionHTML template.HTML // Markdown 转 HTML，使用 template.HTML 防止转义
}

type ComponentData struct {
    Name       string // 组件名称
    Status     string // 状态标识：operational / degraded / partial_outage / full_outage
    StatusText string // 显示文字：Operational / Partial outage 等
}
```

### 渲染示例

```go
package main

import (
    "bytes"
    "html/template"
    
    "github.com/russross/blackfriday/v2" // Markdown 转 HTML
)

func RenderIncidentEmail(incident Incident) (string, error) {
    // 1. Markdown 转 HTML
    descHTML := blackfriday.Run([]byte(incident.LatestUpdate.Description))
    
    // 2. 构建数据
    data := IncidentEmailData{
        StatusPage: struct{ Logo string }{
            Logo: "https://cdn.example.com/logo.png",
        },
        EventType: "Incident updated",
        Change: ChangeData{
            Title: incident.Title,
            AffectedComponents: buildComponents(incident.Components),
        },
        Update: UpdateData{
            DescriptionHTML: template.HTML(descHTML), // 重要：使用 template.HTML
        },
        Status:      "Monitoring",
        StatusColor: "#F59E0B",
        StartedAt:   incident.StartedAt.Format("January 2, 2006 3:04 PM MST"),
        ActionUrl:   "https://status.example.com/incidents/" + incident.ID,
        ActionText:  "View incident",
        PoweredByName: "Flashduty",
        PoweredByUrl:  "https://flashcat.cloud",
        PoweredByLogo: "https://console.flashcat.cloud/image/saas-logo.png",
    }
    
    // 3. 渲染模板
    tmpl, err := template.ParseFiles("templates/incident.html")
    if err != nil {
        return "", err
    }
    
    var buf bytes.Buffer
    if err := tmpl.Execute(&buf, data); err != nil {
        return "", err
    }
    
    return buf.String(), nil
}

func buildComponents(components []Component) []ComponentData {
    result := make([]ComponentData, len(components))
    for i, c := range components {
        result[i] = ComponentData{
            Name:       c.Name,
            Status:     c.Status, // operational / degraded / partial_outage / full_outage
            StatusText: ComponentStatusText[c.Status],
        }
    }
    return result
}
```

### 订阅确认邮件示例

```go
type ConfirmEmailData struct {
    StatusPage struct {
        Logo string
    }
    PageName      string
    ActionUrl     string
    PoweredByName string
    PoweredByUrl  string
    PoweredByLogo string
}

func RenderConfirmEmail(pageName, confirmUrl string) (string, error) {
    data := ConfirmEmailData{
        StatusPage: struct{ Logo string }{
            Logo: "https://cdn.example.com/logo.png",
        },
        PageName:      pageName,
        ActionUrl:     confirmUrl,
        PoweredByName: "Flashduty",
        PoweredByUrl:  "https://flashcat.cloud",
        PoweredByLogo: "https://console.flashcat.cloud/image/saas-logo.png",
    }
    
    tmpl, err := template.ParseFiles("templates/confirm.html")
    if err != nil {
        return "", err
    }
    
    var buf bytes.Buffer
    if err := tmpl.Execute(&buf, data); err != nil {
        return "", err
    }
    
    return buf.String(), nil
}
```

## 📝 设计决策

1. **状态颜色由后端传入**：保持模板简单，不在模板内做条件判断
2. **时间格式由后端处理**：不同场景可能需要不同格式/时区
3. **Markdown 由后端转 HTML**：Go 模板无法运行 React 组件，使用 `template.HTML` 类型防止转义
4. **组件图标通过 Status 字段判断**：模板内使用 `{{if eq .Status "operational"}}` 等条件渲染对应图标
5. **使用 bulletproof button**：确保按钮在所有邮件客户端正确显示（包括 Outlook）
6. **图标使用 Data URI**：内联 SVG 避免外部图片加载问题
7. **使用 table 布局**：确保邮件客户端兼容性

## ✅ 已确认规范

| 项目 | 规范 |
|-----|------|
| **邮件宽度** | 465px，整体居中 |
| **容器圆角** | 16px |
| **Logo 尺寸** | 高度 60px，宽度自适应 |
| **Powered by** | Flashduty |
| **组件列表** | 通过 `{{if .Change.AffectedComponents}}` 控制显示/隐藏 |
| **按钮样式** | 灰色背景 #F3F4F6，圆角 6px，内边距 10px 20px |
| **分割线颜色** | #F3F4F6 |
