import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "@tabler/icons-webfont/dist/tabler-icons.css";

export default function App({ Component, pageProps }) {
  return <Layout><Component {...pageProps} /></Layout>;
}
