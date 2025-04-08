import { Header } from '../Header';

export const RootLayout = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
};
