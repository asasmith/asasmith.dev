import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Post {
    date: string;
    path: string;
    title: string;
    tags?: string[];
}

export const PostList = () => {
    const [posts, setPosts] = useState<Post[]>();
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/posts.json');
            const data = await response.json();
            const sortedPosts = data.toSorted(
                (a: Post, b: Post) => Date.parse(b.date) - Date.parse(a.date)
            );

            setPosts(sortedPosts);
        }

        fetchData();
    }, []);

    if (!posts) return <h1>no posts found</h1>;

    const postLinks = posts.map((post) => {
        const { date, path, title } = post;
        return (
            <Link to={`/posts/${path}`} className="inline-flex flex-col w-fit mb-4" key={path}>
                <span className="font-heading-alt font-extrabold text-4xl text-blue mb-2">{title}</span>
                <span className="font-heading-alt text-2xl text-black">{date}</span>
            </Link>
        );
    });

    return <ul className="flex flex-col">{postLinks}</ul>;
};
