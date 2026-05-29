import Head from "next/head";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import FunStuff from "@/components/FunStuff";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home(){
  return (
    <>
      <Head>
        <title>Angel Shinh | Portfolio</title>
      </Head>
      <div>
        <Hero />
        <Experience />
        <Projects />
        <FunStuff />
        <Contact />
      </div>
    </>
  )
}