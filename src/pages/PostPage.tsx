import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loadPost } from '../posts/index';

interface Metadata {
    title: string;
    subtitle?: string;
    date: string;
    tags?: string[];
}

export function PostPage() {
    const { slug } = useParams<{ slug: string }>();
    const [html, setHtml] = useState<string | null>(null);
    const [metadata, setMetadata] = useState<Metadata | null>(null);

    useEffect(() => {
        if (!slug) return;

        async function fetchPostData(slug: string): Promise<void> {
            const { html, metadata } = await loadPost(slug);

            setHtml(html);
            setMetadata(metadata);
        }

        fetchPostData(slug);
    }, [slug]);

    return (
        <div className="prose prose-xl m-auto rounded-2xl bg-white shadow-xl p-4 lg:p-12 md:max-w-11/12 xl:max-w-3xl">
            <h1 className="text-blue">{metadata?.title}</h1>
            {metadata?.subtitle && (
                <h2 className="text-blue">{metadata?.subtitle}</h2>
            )}
            <div
                dangerouslySetInnerHTML={{ __html: html || 'Loading...' }}
                className="prose-headings:text-black prose-body:text-black prose-pre:bg-black prose-pre:text-white"
            />
        </div>
    );
}
