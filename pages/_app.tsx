import type { AppProps } from "next/app";

import "../app/globals.css";
import { Footer, Navbar } from './layout/exports'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <div className="flex-grow">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
