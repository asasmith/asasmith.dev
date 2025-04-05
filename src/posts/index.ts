const markdownFiles = import.meta.glob('./*.md');

interface MarkdownModule {
    html: string;
    metadata: any;
}

export async function loadPost(slug: string): Promise<{ html: string, metadata: any }> {
    const filePath = `./${slug}.md`;

    const moduleImportFn = markdownFiles[filePath];

    if (!moduleImportFn) {
        throw new Error(`Post ${slug} not found`);
    }

    const { html, metadata } = await moduleImportFn() as MarkdownModule;

    return {
        html,
        metadata,
    };
}
