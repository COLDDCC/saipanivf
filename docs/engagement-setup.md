# 咨询路径统计启用

代码部署不会自动创建数据库。未绑定或未建表时，接口返回 configured:false，浏览器不发送操作记录，咨询邮件功能照常使用。

1. 在 Cloudflare 控制台创建 D1 数据库，建议名称 saipanivf-engagement。
2. 在数据库 Console 按编号顺序执行仓库 migrations/ 下的全部 SQL（0001 → 0005）。只执行 0001 会缺少 es/de/fr 语言，西、德、法页面的记录会被拒绝。已启用的数据库只需补执行尚未执行的编号。
3. 在 Pages 项目 saipanivf 的 Settings → Bindings 添加 D1 数据库绑定：变量名 ENGAGEMENT_DB，选择刚创建的数据库，应用到 Production。重新部署项目。预览环境可保持不绑定，避免测试操作混入。
4. 打开 /api/engagement，显示 {"configured":true} 即表示数据库及表可用。浏览器开启 DNT、GPC 或自动化模式时不会记录操作。

## 查看数据

在 D1 Console 执行：

```sql
SELECT day, event, language, count
FROM engagement_daily
ORDER BY day DESC, event, language;
```

日期按 UTC 汇总。treatment_view：治疗详情浏览；contact_open：点击咨询页链接；budget_use：修改预算选项；consult_start：开始填写；consult_draft：生成有效邮件草稿；email_open：点击邮件链接；consult_copy：成功复制咨询内容。

## 页面级流量统计（可选）

事件统计只覆盖咨询动作，不含页面浏览量。若需要按语种看流量，可接入 Cloudflare Web Analytics（免费、无 Cookie、不采集个人信息）：

1. 在 Cloudflare 控制台 Analytics & Logs → Web Analytics 添加站点 saipanivf.pages.dev，获得 JS beacon token。
2. 在 Pages 项目 saipanivf 的 Settings → Environment variables 添加 CF_BEACON_TOKEN，值为该 token，应用到 Production，重新部署。
3. 不设置该变量时构建不包含任何第三方脚本，行为与现在完全一致。

这是操作次数，不能视为独立访客数。开始填写、预算使用及治疗浏览在每次页面加载中最多记录一次，其余操作每次成功触发均计数。邮件链接点击不代表客户端已打开，更不代表邮件已发送或线索已收到。未来接入飞书后，真实提交成功应使用独立事件及服务端确认。

数据库仅存日期、事件、语言、次数，不存姓名、联系方式、咨询正文、完整网址、IP、访客标识或 Cookie。Cloudflare 托管服务本身的网络处理另受其政策约束。五种语言隐私页已加入相应说明。
