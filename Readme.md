# Act! 细胞调律 — 游戏官网

> 技术栈：Astro → 纯静态 HTML/CSS/JS → GitHub Pages 自动部署
> 域名：paperactgames.com

---

## 项目结构

```
act_page/
├── astro.config.mjs       ← Astro 配置（网站地址、sitemap 插件等）
├── package.json           ← 项目依赖声明
├── tsconfig.json          ← TypeScript 配置
├── .gitignore             ← Git 排除规则
├── .npmrc                 ← npm 镜像源（国内加速）
├── .github/workflows/
│   └── deploy.yml         ← GitHub Actions 自动部署脚本
├── public/                ← 静态资源（直接复制到网站根目录）
│   ├── robots.txt         ← 搜索引擎爬虫指令（引导收录）
│   └── Resources/
│       ├── icon.png       ← 网页图标
│       ├── KV1080P.png    ← 首页背景大图（也用作社交分享预览图）
│       └── logo.png       ← 游戏 Logo
├── src/
│   ├── layouts/
│   │   └── Layout.astro   ← 全局布局（含 SEO meta 标签、导航栏、全局样式）
│   ├── components/         ← 可复用组件
│   │   ├── Navbar.astro
│   │   ├── HeroSection.astro
│   │   ├── CharacterSection.astro
│   │   ├── SongSection.astro
│   │   ├── GameplaySection.astro
│   │   └── CommunitySection.astro
│   └── pages/
│       └── index.astro    ← 首页（组装所有组件）
├── node_modules/          ← 依赖包（npm install 生成，git 忽略）
├── dist/                  ← 构建产出（npm run build 生成，git 忽略）
```

---

## 三个核心命令

| 命令 | 作用 | 什么时候用 |
|------|------|-----------|
| `npm run dev` | 启动开发服务器，实时预览 | 改代码时。浏览器打开 localhost:4321，改了文件页面自动刷新 |
| `npm run build` | 构建，生成 dist/ 产出物 | 想看最终效果，或准备部署前验证 |
| `npm run preview` | 本地预览构建后的网站 | build 之后，模拟真实部署效果 |

---

## 日常开发流程

```
改代码 → npm run dev 看效果 → git push 部署上线
```

### 1. 开始工作

```bash
cd "E:\Act!\Act_OfficialPage\act_page"
npm run dev
```

浏览器打开 `http://localhost:4321`，修改代码后页面自动更新。

### 2. 修改页面

- 编辑 `src/pages/index.astro` — 改首页内容
- 添加新页面：在 `src/pages/` 下创建新文件，比如 `characters.astro` → 自动对应 `/characters` 路径
- 添加图片：放到 `public/` 下，网页中用 `/Resources/图片名.png` 引用

### 3. 完成修改后

```bash
git add -A
git commit -m "描述你改了什么"
git push
```

推送后 GitHub Actions 自动构建部署，1~2 分钟后网站更新。

---

## .astro 文件速写参考

每个 `.astro` 文件由三段组成：

```astro
---
// 第1段：frontmatter（构建时执行的逻辑）
// 定义变量、导入组件、写 JavaScript
const title = "新页面";
---

<!-- 第2段：HTML 模板 -->
<!-- 用 {变量名} 插入 frontmatter 里定义的值 -->
<h1>{title}</h1>

<style>
/* 第3段：CSS（默认自动隔离，只影响本组件） */
h1 { color: #00f3ff; }
</style>
```

---

## 在新电脑上开始工作

```bash
git clone https://github.com/paperlens02/act_page.git
cd act_page
npm install
npm run dev
```

---

## 常见问题速查

| 问题 | 解决 |
|------|------|
| `npm run dev` 报错找不到模块 | 跑一次 `npm install` |
| 推送后网站没更新 | 去 GitHub 仓库 Actions 标签页看是否构建成功（绿色勾） |
| 本地预览端口被占用 | `npm run dev` 会自动尝试下一个端口（4322、4323…） |
| 改了代码但浏览器没变化 | 硬刷新：Ctrl+Shift+R |
| 想改网站域名配置 | 编辑 `astro.config.mjs` 里的 `site` 字段 |
| GitHub Pages 显示 404 | 检查 Settings → Pages → Source 是否选了 "GitHub Actions" |

---

## SEO（搜索引擎优化）

网站要让搜索引擎搜到，需要三个层面的工作：网页标签、站点文件、主动提交。

### 已完成的优化

#### 1. meta 标签（`src/layouts/Layout.astro`）

在全局布局的 `<head>` 中配置了以下标签，所有页面自动生效：

| 标签 | 作用 |
|------|------|
| `<meta name="description">` | 搜索结果中显示的页面摘要 |
| `<meta name="keywords">` | 关键词（Google 已忽略，百度仍参考） |
| `<meta name="author">` | 作者信息 |
| `<link rel="canonical">` | 页面标准地址，防止重复收录 |
| Open Graph (`og:*`) | QQ/微信/Discord 分享时的预览卡片（标题+描述+大图） |
| Twitter Card (`twitter:*`) | Twitter/X 分享时的预览卡片 |

> 修改文案：编辑 `src/layouts/Layout.astro` 顶部的 `description`、`ogImage` 等变量即可。

#### 2. robots.txt（`public/robots.txt`）

放在 `public/` 目录下，构建后自动复制到网站根目录。内容：
- 允许所有搜索引擎爬虫抓取全站
- 指向 sitemap 地址

#### 3. sitemap.xml（`@astrojs/sitemap` 插件自动生成）

在 `astro.config.mjs` 中集成了 `@astrojs/sitemap` 插件。每次 `npm run build` 时：
- 自动扫描 `src/pages/` 下所有页面
- 生成 `sitemap-index.xml` 和 `sitemap-0.xml`
- 新增页面后无需手动维护，sitemap 自动更新

### 还需要你手动做的（搜索引擎提交）

网站上线 + 域名解析生效后，去以下平台提交站点：

#### Google Search Console（最重要）
1. 打开 https://search.google.com/search-console
2. 添加域名 `paperactgames.com`
3. 通过 DNS TXT 记录验证所有权
4. 提交 sitemap：`https://paperactgames.com/sitemap-index.xml`
5. 在"网址检查"中手动请求收录首页

#### Bing Webmaster Tools
1. 打开 https://www.bing.com/webmasters
2. 可直接从 Google Search Console 导入数据
3. 提交 sitemap

#### 百度站长平台
1. 打开 https://ziyuan.baidu.com
2. 添加站点，DNS 验证
3. 提交 sitemap

| 平台 | 提交入口 | 要提交的 Sitemap URL |
|---|---|---|
| Google Search Console | https://search.google.com/search-console | `https://paperactgames.com/sitemap-index.xml` |
| Bing Webmaster Tools | https://www.bing.com/webmasters | `https://paperactgames.com/sitemap-index.xml` |
| 百度站长平台 | https://ziyuan.baidu.com | `https://paperactgames.com/sitemap-index.xml` |

> 提交后通常需要 1~4 周才能在搜索结果中出现。