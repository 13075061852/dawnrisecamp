# Dawnrise Camp

一个面向海外客户的双语外贸官网脚手架：

- 前端：React + Vite，部署到 Cloudflare Pages
- 后端：Cloudflare Worker
- 数据：D1 存结构化内容，R2 存视频与图片
- 语言：英文 / 中文切换

## 项目结构

```text
apps/
  web/   React + Vite 前端
  api/   Cloudflare Worker + D1 + R2
design/
  concepts/  视觉概念图
```

## 本地预览（默认连接云端数据）

```bash
npm install
npm run preview:cloud
```

然后访问：

```text
http://127.0.0.1:5173
```

本地前端默认直接请求线上 Worker：

```text
https://dawnrisecamp-api.1308715689.workers.dev
```

因此你在本地看到的产品、新闻、询盘数据，默认就是云端 D1 / R2 的数据。

## Cloudflare 初始化

```bash
cd apps/api
npx wrangler d1 create dawnrisecamp-db
npx wrangler r2 bucket create dawnrisecamp-media
npx wrangler d1 migrations apply dawnrisecamp-db --remote
npx wrangler deploy
```

随后将 `apps/api/wrangler.jsonc` 中的 D1 `database_id` 替换为真实值，并把企业介绍视频上传到 R2：

```bash
npx wrangler r2 object put dawnrisecamp-media/about-video.mp4 --file ./about-video.mp4 --content-type video/mp4
```

前端可在 Cloudflare Pages 中配置：

- Build command: `npm run build --workspace apps/web`
- Build output directory: `apps/web/dist`
- Environment variable: `VITE_API_BASE_URL=https://<your-worker-domain>`

## 当前云端资源

- Worker API: `https://dawnrisecamp-api.1308715689.workers.dev`
- Pages 站点: `https://dawnrisecamp-web.pages.dev`
- D1: `dawnrisecamp-db`
- R2: `dawnrisecamp-media`

## 现在的同步方式

后端与数据库（默认同步云端）：

```bash
npm run sync:backend
```

它等价于：

```bash
npm run sync:db
npm run sync:worker
```

前端仍然可以先在本地预览。只有你确认要发布时，再执行：

```bash
npm run deploy:web
```

这个命令会把前端同步到 Cloudflare Pages；按照本项目约定，前端部署前需要先由你确认。

## 数据与媒体

- 产品分类、新闻、询盘记录都在 D1 中。
- 企业视频、图像等大文件应放在 R2；当前已验证 `about-poster.webp` 可通过 Worker 的 `/media/*` 路由读取。
- 还需要把真实企业介绍视频上传为 `about-video.mp4`，视频弹窗就会自动开始播放：

```bash
cd apps/api
npx wrangler r2 object put dawnrisecamp-media/about-video.mp4 --file ./about-video.mp4 --content-type video/mp4 --remote
```
