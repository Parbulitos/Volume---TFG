import type { AppProps } from 'next/app';

import '../app/globals.css';
import Navbar from '../layout/navbar';
import Footer from '../layout/footer';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-900">
            <Navbar />
            <div className="flex-grow">
                <Component {...pageProps} />
            </div>
            <Footer />
        </div>
    );
}
