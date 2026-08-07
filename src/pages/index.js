import dynamic from "next/dynamic";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import FunStuff from "@/components/FunStuff";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Seo from "@/components/Seo";

const GuitarDivider = dynamic(() => import("@/components/GuitarDivider"), { ssr: false });

export default function Home() {
  return (
    <>
      <Seo
        title="Angel Shinh | Portfolio"
        description="Portfolio of Angel Shinh - software developer blending tech with art. Python, C++, JavaScript, and a guitar."
        path="/"
      />

      {/* Hero — warm paper background */}
      <div className="section-base">
        <Hero />
      </div>

      {/* Guitar string divider */}
      <GuitarDivider />

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
