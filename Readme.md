# Act! 细胞调律 — 游戏官网

> 技术栈：Astro → 纯静态 HTML/CSS/JS → GitHub Pages 自动部署
> 域名：paperactgames.com

---

## 项目结构

```
act_page/
├── astro.config.mjs       ← Astro 配置（网站地址等）
├── package.json           ← 项目依赖声明
├── tsconfig.json          ← TypeScript 配置
├── .gitignore             ← Git 排除规则
├── .npmrc                 ← npm 镜像源（国内加速）
├── .github/workflows/
│   └── deploy.yml         ← GitHub Actions 自动部署脚本
├── public/                ← 静态资源（直接复制到网站根目录）
│   └── Resources/
│       ├── icon.png       ← 网页图标
│       ├── KV1080P.png    ← 首页背景大图
│       └── logo.png       ← 游戏 Logo
├── src/
│   └── pages/
│       └── index.astro    ← 首页（目前唯一的页面）
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
