import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { vitePluginRemark } from './plugins/vite-plugin-remark';
import { vitePluginPostList } from './plugins/vite-plugin-post-list';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), vitePluginRemark(), vitePluginPostList()],
});
