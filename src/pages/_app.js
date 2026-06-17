import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "@tabler/icons-webfont/dist/tabler-icons.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), { ssr: false });

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <LoadingScreen onDone={() => setLoading(false)} />
      ) : (
        <Layout><Component {...pageProps} /></Layout>
      )}
    </>
  );
}
