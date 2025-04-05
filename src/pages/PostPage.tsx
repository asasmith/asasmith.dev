import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loadPost } from '../posts/index';

interface Metadata {
    title: string;
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
            setMetadata(metadata)
        }

        fetchPostData(slug);
        setMetadata(metadata);
    }, [slug]);

    return (
        <>
            <Link to="/">home</Link>
            <h1>{metadata?.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: html || 'Loading...' }} />
        </>
    );
}
