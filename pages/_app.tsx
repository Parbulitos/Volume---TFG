import type { AppProps } from "next/app";

import "../app/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <div className="flex-grow">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
