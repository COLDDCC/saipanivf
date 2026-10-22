# 咨询表单与后续飞书接入

当前七语共用 `LocalizedConsultation.astro`；中文入口为 `Consultation.astro`，繁体由构建生成。收件邮箱仍为 `info@saipan-ivf.com`。

当前只在浏览器生成邮件草稿，不接收线索，不调用飞书，不写入 localStorage，也不声称已提交。用户需要自行确认发送。必填项只有一种联系方式；称呼、项目、时间、问题均可留空。没有 JavaScript 时保留邮件链接，隐藏表单，避免 URL 泄露表单内容。

## 预留字段

生成草稿时构造的 `payload` 可作为后续同源 `POST /api/consultation` 的请求体：

- `schemaVersion`: 1
- `locale`: 文档语言（zh-CN / zh-TW / en / ja / ko / es / de）
- `sourcePath`: 当前页面路径，不含查询参数或 hash
- `contactMethod`: email / wechat / phone / whatsapp / line / telegram
- `contactValue`: 去除首尾空白的联系方式
- `name`: 可选称呼
- `treatment`: ivf / icsi / egg-freezing / frozen-embryo-transfer 或空
- `topic`: 本地化项目名称或空
- `timing`: 可选计划时间
- `message`: 可选问题

## 后续接入位置

在现有 submit 处理器校验并构建 payload 后，改为调用同源服务端接口。飞书 webhook / App Secret / 多维表格凭据只放服务端环境变量，不进入公开源码或 PUBLIC_ 环境变量。先在服务端确认字段校验、限流、重复提交保护、隐私告知与有权接收资料的飞书空间，再启用接收。

只有服务端确认写入并返回唯一 receiptId 后，才展示“已收到咨询”。请求超时、飞书写入失败均不能显示成功，保留重试与邮件备用入口。禁用按钮防止重复点击；服务端用幂等键避免重试重复建档。联系方式和问题不得发送到分析事件或写入访问日志。确定实际回复团队后再公布响应时限。
