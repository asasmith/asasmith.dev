import { Plugin } from 'vite';
import { readdir, readFile, writeFile } from 'fs/promises';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { matter } from 'vfile-matter';
import remarkStringify from 'remark-stringify';

interface FrontMatter {
    date: string;
    title: string;
    tags?: string[];
}

async function extractFrontmatter(path: string) {
    const processor = unified()
        .use(remarkParse)
        .use(remarkStringify)
        .use(remarkFrontmatter)
        .use(function extactFrontMatter() {
            return function(_, file) {
                matter(file);
            };
        });

    const fileContent = await readFile(path, 'utf-8');
    const { data } = await processor.process(fileContent);

    return data.matter;
}

export function vitePluginPostList(): Plugin {
    return {
        name: 'post-list',
        async buildStart() {
            const postData = [];
            const posts = await readdir('./src/posts');

            for (const file of posts) {
                if (file.endsWith('md')) {
                    const frontMatter = await extractFrontmatter(
                        `./src/posts/${file}`
                    );
                    const { date, title } = frontMatter as FrontMatter;
                    const data = {
                        path: file.split('.')[0],
                        title: title,
                        date: date,
                    };

                    postData.push(data);
                }
            }

            console.log(postData);

            try {
                await writeFile(
                    './public/posts.json',
                    JSON.stringify(postData)
                );
            } catch (e) {
                console.log(e);
            }
        },
    };
}
