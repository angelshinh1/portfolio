import Image from "next/image";

export default function Hero() {
    return (
        <div id="about" className="max-w-[70vw] mx-auto flex flex-col lg:flex-row items-center justify-center py-12 gap-12 lg:gap-16 min-h-screen -mt-12">
            {/* Text Content */}
            <div className="medievalsharp-regular text-justify lg:text-left text-base lg:text-2xl flex-1 space-y-3 lg:space-y-6">
                <div className="space-y-2 lg:space-y-4">
                    <p>
                        Hi, I&apos;m <span className="text-white font-bold">Angel Shinh</span>, a passionate developer and designer who loves building stuff.
                    </p>
                    
                    <p>
                        I am a lot into brainrot memes <span className="text-red-500 font-semibold">*6 7*</span> and I&apos;ve got W rizz, I think... Also, I absolutely love photography and playing guitar. I&apos;m very whimsical too...
                    </p>
                    
                    <p>
                        Currently, I&apos;m working at RBC as a <span className="text-purple-500 font-semibold">TS</span> Analyst, I mean Technical Systems Analyst.
                    </p>
                    
                    <p className="text-white/70 text-lg lg:text-xl italic">
                        You see how I put <span className="text-purple-500 not-italic font-semibold">TS</span> over there?
                    </p>
                    
                    <p className="pt-2">
                        Anyways, feel free to contact me as I am always down to make new friends.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3 lg:gap-4 justify-center lg:justify-start pt-4">
                    <a 
                        href="#contact" 
                        className="flex-1 lg:flex-none px-4 lg:px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm font-medium text-center"
                    >
                        Get in Touch
                    </a>
                    <a 
                        href="#projects" 
                        className="flex-1 lg:flex-none px-4 lg:px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 rounded-xl transition-all duration-300 backdrop-blur-sm font-medium text-center"
                    >
                        View Projects
                    </a>
                </div>
            </div>

            {/* Profile Image */}
            <div className="flex-1 flex justify-center lg:justify-end">
                <div className="relative group">
                    {/* Animated gradient background */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-4xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500 group-hover:duration-200"></div>
                    
                    <div className="relative">
                        <Image
                            src="/profile.jpg"
                            alt="Angel Shinh profile"
                            width={320}
                            height={320}
                            className="rounded-4xl object-cover shadow-2xl relative z-10"
                        />
                        
                        {/* Border overlay */}
                        <div className="absolute inset-0 rounded-4xl border-2 border-white/20 group-hover:border-white/40 transition-all duration-300 pointer-events-none z-20"></div>
                    </div>
                    
                    {/* Hover tooltip */}
                    <div className="nova-oval-regular absolute left-1/2 -translate-x-1/2 top-full mt-3 px-5 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-xl">
                        Ts guy got W rizz. Should ask him out <span className="inline-block">✌️🥀</span>
                        {/* Arrow pointing up */}
                        <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white/10"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}