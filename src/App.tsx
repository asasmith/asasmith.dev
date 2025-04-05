import './App.css';
// import { PostPage } from './pages/PostPage';

import { Link } from 'react-router-dom';
// import { ReactComponent as PostContent } from './posts/ember-generate-component-pod-structure.md';
// import './posts/test-post.md';

// const postFiles = import.meta.glob('./posts/*.md', {
//     eager: true,
//     query: 'raw',
// });
// console.log(postFiles);

// const posts = Object.entries(postFiles).map(([path, post]) => {
//     const { metadata, default: content } = post as any;

//     console.log(metadata);
//     return path;
// });

function App() {
    return (
        <>
            <h1>hi</h1>
            <Link to="/posts/test-post">test-post</Link>
            <Link to="/posts/ember-generate-component-pod-structure">ember generate</Link>
            <Link to="/posts/tailwindcss-v3-emberjs-setup">tailwind</Link>
        </>
    );
}

export default App;
