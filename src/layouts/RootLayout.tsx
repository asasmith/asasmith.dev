import { JSX } from 'react';
import { Header } from '../Header';

interface RootLayoutProps {
    children: JSX.Element
}

export const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
};
