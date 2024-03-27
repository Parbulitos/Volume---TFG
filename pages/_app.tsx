import type { AppProps } from "next/app";

import "../app/globals.css";
import Footer from "./layout/footer";
import Navbar from "./layout/navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
