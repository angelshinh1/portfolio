import { useState } from "react";
import Image from "next/image";

export default function FunStuff() {
    const [currentMeme, setCurrentMeme] = useState(0);
    
    const memes = [
        { title: "When your code works on the first try", image: "/memes/meme1.jpg" },
        { title: "Me debugging at 3 AM", image: "/memes/meme2.jpg" },
        { title: "CSS be like...", image: "/memes/meme3.jpg" },
    ];

    const hobbies = [
        { icon: "🎸", title: "Guitar", desc: "Jamming since forever" },
        { icon: "🎮", title: "Gaming", desc: "Just finished RDR2" },
        { icon: "🍕", title: "Pizza", desc: "Fuel for coding" },
        { icon: "📚", title: "Learning", desc: "Always curious" },
        { icon: "📷", title: "Photography", desc: "Capturing moments" },
        { icon: "🎵", title: "Music", desc: "All genres welcome" },
    ];

    const randomFacts = [
        "I once tried to build a game engine in C++... now it’s just a very expensive calculator",
        "My guitar has more commits than some of my repos",
        "i LOVEE MATCHAA and listen to Clario all the time (totally not being performative)",
        "I can solve a Rubik's cube",
        "I lowkey get confused at some math problems which my high-school self would've solved in seconds",
        "Oh, did I mentioned I'm 6' 3\" btw",
    ];

    const nextMeme = () => {
        setCurrentMeme((prev) => (prev + 1) % memes.length);
    };

    return (
        <section id="fun-stuff" className="max-w-[90vw] lg:max-w-[70vw] mx-auto py-16">
            {/* Header */}
            <div className="ubuntu-mono-regular mb-12 text-center">
                <h2 className="text-2xl lg:text-5xl font-bold mb-3">Fun Stuff</h2>
                <p className="text-base lg:text-xl text-gray-400">The whimsical side of ts developer</p>
            </div>

            <div className="space-y-12">
                {/* Guitar/Music Section */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="lg:w-1/2">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl opacity-30 group-hover:opacity-50 blur-sm transition-all duration-300"></div>
                                <div className="relative">
                                    <video
                                        src="/guitar-video.mp4"
                                        controls
                                        loop
                                        playsInline
                                        preload="metadata"
                                        className="rounded-xl object-cover w-full aspect-square"
                                        poster="/profile.jpg"
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 space-y-4">
                            <h3 className="ubuntu-mono-regular text-xl lg:text-3xl font-bold flex items-center gap-3">
                                🎸 Music & Guitar
                            </h3>
                            <p className="nova-oval-regular text-sm lg:text-base text-gray-300">
                                Been playing guitar for 2 years and it&apos;s my go-to stress reliever. The song I&apos;m playing in this video is <a className="underline" href="https://www.youtube.com/watch?v=Hth8kTDTh3g">Gratitude by Amin Toofani</a> Currently trying to learn <a className="underline" href="https://www.youtube.com/watch?v=7gphiFVVtUI">The song of the golden dragon</a>.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="ubuntu-mono-regular px-3 py-1 bg-white/10 rounded-full text-xs lg:text-sm">Classic</span>
                                <span className="ubuntu-mono-regular px-3 py-1 bg-white/10 rounded-full text-xs lg:text-sm">Jazz</span>
                                <span className="ubuntu-mono-regular px-3 py-1 bg-white/10 rounded-full text-xs lg:text-sm">Spanish</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hobbies Grid */}
                <div>
                    <h3 className="ubuntu-mono-regular text-xl lg:text-2xl font-bold mb-6 text-center">Hobbies & Interests</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {hobbies.map((hobby, index) => (
                            <div 
                                key={index}
                                className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-xl p-4 lg:p-6 text-center transition-all duration-300 hover:scale-105 group"
                            >
                                <div className="text-3xl lg:text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                    {hobby.icon}
                                </div>
                                <h4 className="ubuntu-mono-regular font-semibold text-sm lg:text-base mb-1">{hobby.title}</h4>
                                <p className="nova-oval-regular text-xs lg:text-sm text-gray-400">{hobby.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Random Facts */}
                <div>
                    <h3 className="ubuntu-mono-regular text-xl lg:text-2xl font-bold mb-6 text-center">
                        Random Facts You Didn&apos;t Ask For 🤷‍♂️
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {randomFacts.map((fact, index) => (
                            <div 
                                key={index}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 lg:p-5 hover:bg-white/10 transition-all duration-300"
                            >
                                <p className="nova-oval-regular text-sm lg:text-base text-gray-300">
                                    {fact}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Photos/Moments Section */}
                <div>
                    <h3 className="ubuntu-mono-regular text-xl lg:text-2xl font-bold mb-6 text-center">
                        Life in Snapshots 📸
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((index) => (
                            <div key={index} className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-30 transition-all duration-300 blur-sm"></div>
                                <div className="relative bg-white/10 rounded-lg aspect-square flex items-center justify-center hover:bg-white/15 transition-all duration-300">
                                    <div className="text-4xl">📷</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="nova-oval-regular text-center text-sm text-gray-400 mt-4">
                        Photos coming soon... still figuring out which ones don&apos;t make me look like a potato
                    </p>
                </div>
            </div>
        </section>
    );
}