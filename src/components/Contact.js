import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formStatus, setFormStatus] = useState({ submitting: false, submitted: false, error: null });
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });
  
    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, 
      form.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setFormStatus({ submitting: false, submitted: true, error: null });
        form.current.reset();
        
        // Reset form status after 5 seconds
        setTimeout(() => setFormStatus({ submitting: false, submitted: false, error: null }), 5000);
      }, (error) => {
        console.error('Failed to send email:', error.text);
        setFormStatus({ submitting: false, submitted: false, error: 'Failed to send message. Please try again.' });
      });
  };

  return (
    <section id="contact" className="max-w-[90vw] lg:max-w-[70vw] mx-auto py-16">
      {/* Header */}
      <div className="medievalsharp-regular mb-10 text-center">
        <h2 className="text-2xl lg:text-5xl font-bold mb-3">Get In Touch</h2>
        <p className="text-base lg:text-xl text-gray-400">Let&apos;s connect</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
            <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 className="medievalsharp-regular text-lg font-semibold text-white mb-2">Location</h4>
              <p className="nova-oval-regular text-gray-300">Markham, Ontario, Canada</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
            <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="medievalsharp-regular text-lg font-semibold text-white mb-2">Email</h4>
              <p className="nova-oval-regular text-gray-300">shinh.maverick@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
            <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h4 className="medievalsharp-regular text-lg font-semibold text-white mb-2">Phone</h4>
              <p className="nova-oval-regular text-gray-300">+1 437-430-6774</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 pt-4">
            <a 
              href="https://www.linkedin.com/in/angelshinh/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="https://github.com/angelshinh1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="mailto:shinh.maverick@gmail.com" 
              className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label htmlFor="name" className="block medievalsharp-regular text-white font-medium mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                name="user_name" 
                placeholder="Your Name" 
                required 
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors nova-oval-regular"
              />
            </div>

            <div>
              <label htmlFor="email" className="block medievalsharp-regular text-white font-medium mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                name="user_email" 
                placeholder="Your Email" 
                required 
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors nova-oval-regular"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block medievalsharp-regular text-white font-medium mb-2">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                placeholder="Subject" 
                required 
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors nova-oval-regular"
              />
            </div>

            <div>
              <label htmlFor="message" className="block medievalsharp-regular text-white font-medium mb-2">Message</label>
              <textarea 
                id="message" 
                name="message" 
                placeholder="Your Message" 
                required 
                rows="5"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors nova-oval-regular resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={formStatus.submitting}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 disabled:bg-white/5 border border-white/20 hover:border-white/40 disabled:border-white/10 rounded-lg text-white disabled:text-gray-400 font-medium transition-all duration-300 medievalsharp-regular"
            >
              {formStatus.submitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </>
              )}
            </button>
            
            {formStatus.submitted && (
              <div className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="nova-oval-regular">Message sent successfully!</span>
              </div>
            )}
            
            {formStatus.error && (
              <div className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="nova-oval-regular">{formStatus.error}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
