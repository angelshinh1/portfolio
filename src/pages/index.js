import Head from "next/head";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import FunStuff from "@/components/FunStuff";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <>
      <Head>
        <title>Angel Shinh | Portfolio</title>
      </Head>

      {/* Hero — warm paper background */}
      <div className="section-base">
        <Hero />
      </div>

      {/* Ornament divider */}
      <div className="ornament-divider" aria-hidden="true">✦ ❧ ✦</div>

      {/* Experience — subtle grain */}
      <div className="section-grain">
        <Experience />
      </div>

      {/* Projects — mint-tinted green section */}
      <div className="section-green">
        <Projects />
      </div>

      {/* Fun Stuff — back to warm base */}
      <div className="section-base">
        <FunStuff />
      </div>

      {/* Contact — grain section */}
      <div className="section-grain">
        <Contact />
      </div>
    </>
  );
}
