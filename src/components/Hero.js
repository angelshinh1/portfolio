import Image from "next/image";
import { useState } from "react";

export default function Hero() {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleImageClick = () => {
        setShowTooltip(!showTooltip);
        // Auto-hide after 3 seconds on mobile
        if (!showTooltip) {
            setTimeout(() => setShowTooltip(false), 3000);
        }
    };

    return (
        <div id="about" className="max-w-[80vw] lg:max-w-[60vw] mx-auto pt-8 pb-24 md:pt-12 md:pb-32 flex flex-col gap-10 lg:gap-14 min-h-[85vh] justify-center">
            
            {/* Header Section: Avatar (Left) + Title (Right) */}
            <div className="flex flex-col md:flex-row items-center md:items-center gap-8 lg:gap-12">
                
                {/* Circular Avatar */}
                <div className="relative group flex-shrink-0">
                    <div 
                        className="relative w-40 h-40 md:w-48 md:h-48 rounded-full shadow-lg overflow-hidden cursor-pointer bg-white border border-black/5" 
                        onClick={handleImageClick}
                    >
                        <Image
                            src="/profile.jpg"
                            alt="Angel Shinh profile"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 rounded-full border border-black/10 group-hover:border-black/20 transition-all duration-300 pointer-events-none z-20"></div>
                    </div>
                    
                    {/* Hover/Click tooltip */}
                    <div className={`font-sans absolute left-1/2 -translate-x-1/2 top-full mt-4 px-4 py-2.5 rounded-xl bg-white backdrop-blur-md border border-black/10 text-[#1E1E1E] text-xs transition-all duration-300 whitespace-nowrap shadow-xl z-40 ${
                        showTooltip ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'
                    }`}>
                        Ts guy got W rizz. Should ask him out <span className="inline-block">✌️🥀</span>
                        {/* Arrow pointing up */}
                        <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-black/10"></div>
                        <div className="absolute left-1/2 -translate-x-1/2 -top-[7px] w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-transparent border-b-white"></div>
                    </div>
                </div>

                {/* Greeting & Subtitle */}
                <div className="space-y-3 lg:space-y-4 text-center md:text-left">
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E1E1E]">
                        Hi, I&apos;m Angel
                    </h1>
                    <div className="flex flex-col space-y-1">
                        <p className="font-sans text-base md:text-lg lg:text-xl text-gray-700 font-medium">
                            Software Developer Intern @ RBC
                        </p>
                        <p className="font-sans text-sm md:text-base text-gray-500">
                            Passionate about building innovative solutions & blending tech with art
                        </p>
                    </div>
                </div>

            </div>

            {/* About Section */}
            <div className="space-y-5 lg:space-y-6">
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#1E1E1E]">About</h2>
                <div className="font-sans text-sm lg:text-base text-gray-700 leading-relaxed space-y-4">
                    <p>
                        I&apos;m really into exploring new technologies and staying up-to-date with the latest trends in software development. When I&apos;m not coding, I absolutely love photography and playing guitar.
                    </p>
                    <p>
                        Currently, I&apos;m working at RBC as a SWE Intern, diving deep into secure data exchange and backend systems. Feel free to contact me as I am always down to make new friends and collaborate on cool projects!
                    </p>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                    <a 
                        href="#contact" 
                        className="px-6 py-2.5 bg-[#1E1E1E] hover:bg-black text-white rounded-xl transition-all duration-300 font-medium text-center shadow-md text-sm"
                    >
                        Get in Touch
                    </a>
                    <a 
                        href="./Angel_Resume.pdf" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 bg-black/5 hover:bg-black/10 border border-black/10 text-[#1E1E1E] rounded-xl transition-all duration-300 font-medium text-center text-sm"
                    >
                        View Resume
                    </a>
                </div>
            </div>
        </div>
    );
}