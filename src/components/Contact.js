export default function Contact() {
  return (
    <section id="contact" className="max-w-[80vw] lg:max-w-[70vw] mx-auto py-24 lg:py-32 text-center">
      <h2 className="font-heading text-4xl lg:text-6xl font-bold mb-8">Get in Touch</h2>
      <p className="font-sans text-lg lg:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
        Wanna chat? Just shoot me a dm on{" "}
        <a 
          href="https://www.linkedin.com/in/angelshinh/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-[#FF7A5C] transition-colors duration-300 font-medium underline underline-offset-8 decoration-white/20 hover:decoration-[#FF7A5C]"
        >
          LinkedIn
        </a>
        , check out my projects on{" "}
        <a 
          href="https://github.com/angelshinh1" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-[#FFE7A5] transition-colors duration-300 font-medium underline underline-offset-8 decoration-white/20 hover:decoration-[#FFE7A5]"
        >
          GitHub
        </a>
        , or send me an{" "}
        <a 
          href="mailto:shinh.maverick@gmail.com" 
          className="text-white hover:text-[#7ce0d3] transition-colors duration-300 font-medium underline underline-offset-8 decoration-white/20 hover:decoration-[#7ce0d3]"
        >
          email
        </a>
        .
      </p>
    </section>
  );
}
