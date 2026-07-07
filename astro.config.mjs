import { defineConfig } from 'astro/config';
// 导入 sitemap 插件：构建时自动生成 sitemap-index.xml，
// 搜索引擎通过它了解网站有哪些页面需要收录
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // site 字段：告诉 Astro 网站的最终线上地址。
  // sitemap、canonical 链接、Open Graph 等都依赖这个值。
  // 如果域名变了，改这里一处即可。
  site: 'https://paperactgames.com',
  base: '/',
  // integrations：Astro 插件列表。sitemap() 会扫描 src/pages/ 下所有页面，
  // 自动生成 /sitemap-index.xml，无需手动维护。
  integrations: [sitemap()],
});
