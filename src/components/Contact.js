export default function Contact() {
  return (
    <section id="contact" className="max-w-[80vw] lg:max-w-[70vw] mx-auto py-24 lg:py-32 text-center">
      <h2 className="font-heading text-4xl lg:text-6xl font-bold mb-8 text-[#1E1E1E]">Get in Touch</h2>
      <p className="font-sans text-base lg:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
        Wanna chat? Just shoot me a dm on{" "}
        <a 
          href="https://www.linkedin.com/in/angelshinh/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#1E1E1E] hover:text-[#D94A2D] transition-colors duration-300 font-medium underline underline-offset-8 decoration-black/20 hover:decoration-[#D94A2D]"
        >
          LinkedIn
        </a>
        , check out my projects on{" "}
        <a 
          href="https://github.com/angelshinh1" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#1E1E1E] hover:text-[#D9A000] transition-colors duration-300 font-medium underline underline-offset-8 decoration-black/20 hover:decoration-[#D9A000]"
        >
          GitHub
        </a>
        , or send me an{" "}
        <a 
          href="mailto:shinh.maverick@gmail.com" 
          className="text-[#1E1E1E] hover:text-[#14A390] transition-colors duration-300 font-medium underline underline-offset-8 decoration-black/20 hover:decoration-[#14A390]"
        >
          email
        </a>
        .
      </p>
    </section>
  );
}
