import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { readFile } from 'fs/promises';
import { Plugin } from 'vite';
import { matter } from 'vfile-matter';

const processMarkdown = async (filePath: string): Promise<any> => {
    const processor = unified()
        .use(remarkParse)
        .use(remarkFrontmatter)
        .use(function extactFrontMatter() {
            return function(_, file) {
                matter(file);
            };
        })
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeStringify);

    const fileContent = await readFile(filePath, 'utf-8');

    const { value, data } = await processor.process(fileContent);

    return {
        html: value,
        metadata: data.matter,
    };
};

export function vitePluginRemark(): Plugin {
    return {
        name: 'markdown-to-html',
        async transform(_src, id) {
            if (id.endsWith('.md')) {
                console.log(`[markdown-plugin] Transforming: ${id}`);

                const { html, metadata } = await processMarkdown(id);

                return {
                    code: `
                        export const html = ${JSON.stringify(html)};
                        export const metadata = ${JSON.stringify(metadata)};
                    `,
                    map: null,
                };
            }
        },
    };
}
