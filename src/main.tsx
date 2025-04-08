import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { PostPage } from './pages/PostPage.tsx';
import { RootLayout } from './layouts/RootLayout.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <RootLayout>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/posts/:slug" element={<PostPage />} />
                </Routes>
            </RootLayout>
        </BrowserRouter>
    </StrictMode>
);
