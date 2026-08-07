import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "@tabler/icons-webfont/dist/tabler-icons.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), { ssr: false });

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  const handleLoadingDone = () => {
    setLoading(false);
    window.__appReady = true;
    window.dispatchEvent(new Event("app:ready"));
  };

  return (
    <>
      <Layout><Component {...pageProps} /></Layout>
      {loading && <LoadingScreen onDone={handleLoadingDone} />}
    </>
  );
}
