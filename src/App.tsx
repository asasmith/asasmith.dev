import { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
    const [posts, setPosts] = useState();
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/posts.json');
            const data = await response.json();

            const sortedPosts = data.toSorted((a, b) => Date.parse(b.date) - Date.parse(a.date))

            // const sortedPosts = data.toSorted((a, b) => {
            //     const dateA = new Date(a.date);
            //     const dateB = new Date(b.date);

            //     console.log(dateA > dateB);

            //     if (dateA > dateB) {
            //         return a - b;
            //     } else {
            //         return b - a;
            //     }
            // });

            setPosts(sortedPosts);
        }

        fetchData();
    }, []);

    if (!posts) return <h1>no posts found</h1>;

    const postLinks = posts.map((post) => {
        return (
            <Link to={`/posts/${post.path}`} key={post.path}>
                {post.title}
            </Link>
        );
    });

    return <ul className="flex flex-col">{postLinks}</ul>;
}

export default App;
