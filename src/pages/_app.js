import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "@tabler/icons-webfont/dist/tabler-icons.css";
import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

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
