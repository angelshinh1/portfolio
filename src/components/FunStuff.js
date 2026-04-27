import { useState } from "react";
import Image from "next/image";

export default function FunStuff() {
    const [currentMeme, setCurrentMeme] = useState(0);
    const [showVolumeModal, setShowVolumeModal] = useState(false);
    
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
        "Oh, did I mentioned I'm 6' 2\" btw",
    ];

    const nextMeme = () => {
        setCurrentMeme((prev) => (prev + 1) % memes.length);
    };

    const handleFartButtonClick = () => {
        // Create a test audio to check volume
        const audio = new Audio('/dry-fart.m4a');
        
        // Check if volume is too low (using a simple heuristic)
        // We'll try to play a brief test and detect if system volume might be low
        const testAudio = () => {
            audio.volume = 1.0; // Set to max
            
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // Audio is playing, add animation
                        const btn = document.getElementById('fart-btn');
                        if (btn) {
                            btn.classList.add('animate-pulse');
                            setTimeout(() => btn.classList.remove('animate-pulse'), 500);
                        }
                    })
                    .catch((error) => {
                        console.log('Audio play failed:', error);
                        // If autoplay is blocked, show volume warning
                        setShowVolumeModal(true);
                    });
            }
        };

        // Simple volume check: if user hasn't interacted yet, show modal
        // Or we can just show it first time as a courtesy
        const hasShownVolumeWarning = sessionStorage.getItem('volumeWarningShown');
        
        if (!hasShownVolumeWarning) {
            setShowVolumeModal(true);
            sessionStorage.setItem('volumeWarningShown', 'true');
            // Play after they acknowledge
        } else {
            testAudio();
        }
    };

    return (
        <section id="fun-stuff" className="max-w-[90vw] lg:max-w-[70vw] mx-auto py-16">
            {/* Header */}
            <div className="font-sans mb-12 text-center">
                <h2 className="font-heading text-2xl lg:text-5xl font-bold mb-3 text-[#1E1E1E]">Fun Stuff</h2>
                <p className="text-sm lg:text-base text-gray-600">The whimsical side of ts developer</p>
            </div>

            <div className="space-y-12">
                {/* Guitar/Music Section */}
                <div className="bg-black/5 backdrop-blur-sm border border-black/10 rounded-2xl p-6 lg:p-8 shadow-sm">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="lg:w-1/2">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-gray-300 via-gray-200 to-white rounded-2xl opacity-50 group-hover:opacity-70 blur-sm transition-all duration-300"></div>
                                <div className="relative border border-black/10 rounded-xl overflow-hidden">
                                    <video
                                        src="/guitar-video.mp4"
                                        controls
                                        loop
                                        playsInline
                                        preload="metadata"
                                        className="object-cover w-full aspect-square"
                                        poster="/poster.jpg"
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 space-y-4">
                            <h3 className="font-heading text-xl lg:text-3xl font-bold flex items-center gap-3 text-[#1E1E1E]">
                                🎸 Music & Guitar
                            </h3>
                            <p className="font-sans text-sm text-gray-700 leading-relaxed">
                                Been playing guitar for 2 years and it&apos;s my go-to stress reliever. The song I&apos;m playing in this video is <a className="underline hover:text-black font-medium" href="https://www.youtube.com/watch?v=Hth8kTDTh3g">Gratitude by Amin Toofani</a> Currently trying to learn <a className="underline hover:text-black font-medium" href="https://www.youtube.com/watch?v=7gphiFVVtUI">The song of the golden dragon</a>.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                <span className="font-sans px-3 py-1 bg-black/5 border border-black/10 rounded-full text-xs font-medium text-[#1E1E1E]">Classic</span>
                                <span className="font-sans px-3 py-1 bg-black/5 border border-black/10 rounded-full text-xs font-medium text-[#1E1E1E]">Jazz</span>
                                <span className="font-sans px-3 py-1 bg-black/5 border border-black/10 rounded-full text-xs font-medium text-[#1E1E1E]">Spanish</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hobbies Grid */}
                <div>
                    <h3 className="font-heading text-xl lg:text-2xl font-bold mb-6 text-center text-[#1E1E1E]">Hobbies & Interests</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {hobbies.map((hobby, index) => (
                            <div 
                                key={index}
                                className="bg-black/5 hover:bg-black/10 backdrop-blur-sm border border-black/10 hover:border-black/20 rounded-xl p-4 lg:p-6 text-center transition-all duration-300 hover:scale-105 group"
                            >
                                <div className="text-3xl lg:text-4xl mb-2 group-hover:scale-110 transition-transform duration-300 text-black">
                                    {hobby.icon}
                                </div>
                                <h4 className="font-heading font-semibold text-sm lg:text-base mb-1 text-[#1E1E1E]">{hobby.title}</h4>
                                <p className="font-sans text-xs text-gray-600">{hobby.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Random Facts */}
                <div>
                    <h3 className="font-heading text-xl lg:text-2xl font-bold mb-6 text-center text-[#1E1E1E]">
                        Random Facts You Didn&apos;t Ask For 🤷‍♂️
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {randomFacts.map((fact, index) => (
                            <div 
                                key={index}
                                className="bg-black/5 backdrop-blur-sm border border-black/10 rounded-xl p-4 lg:p-5 hover:bg-black/10 transition-all duration-300"
                            >
                                <p className="font-sans text-xs lg:text-sm text-gray-700 leading-relaxed">
                                    {fact}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Photos/Moments Section */}
                <div>
                    <h3 className="font-heading text-xl lg:text-2xl font-bold mb-6 text-center text-[#1E1E1E]">
                        Life in Snapshots 📸
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                            <div key={index} className="relative group border border-black/10 rounded-lg p-1 bg-white">
                                <div className="absolute -inset-1 bg-gradient-to-r from-gray-300 to-gray-200 rounded-lg opacity-0 group-hover:opacity-50 transition-all duration-300 blur-sm"></div>
                                <div className="relative bg-black/5 rounded-md aspect-square flex items-center justify-center transition-all duration-300 overflow-hidden">
                                    <Image
                                        src={`/gallery-${index}.jpg`}
                                        alt={`Gallery photo ${index}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interesting stuff */}
                {/* <div>
                    <h3 className="font-heading text-xl lg:text-2xl font-bold mb-6 text-center">
                        Interesting Stuff
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <button
                            onClick={handleFartButtonClick}
                            id="fart-btn"
                            className="glass-border-effect font-sans px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-xl backdrop-blur-sm text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Click Me !!
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>

                        <a
                            href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-border-effect font-sans px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-xl backdrop-blur-sm text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Click Me!!
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-gray-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </a>
                    </div>
                </div> */}
            </div>

            {/* Volume Warning Modal */}
            {showVolumeModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 lg:p-8 max-w-md w-full shadow-2xl">
                        <div className="text-center">
                            <div className="text-5xl mb-4">🔊</div>
                            <h3 className="font-heading text-xl lg:text-2xl font-bold text-white mb-3">
                                Volume Check
                            </h3>
                            <p className="font-sans text-sm lg:text-base text-gray-300 mb-6">
                                Please make sure your volume is turned up to enjoy the full experience! 
                            </p>
                            <button
                                onClick={() => {
                                    setShowVolumeModal(false);
                                    // Play the sound after they acknowledge
                                    const audio = new Audio('/dry-fart.m4a');
                                    audio.volume = 1.0;
                                    audio.play().catch(() => console.log('Audio play failed'));
                                    const btn = document.getElementById('fart-btn');
                                    if (btn) {
                                        btn.classList.add('animate-pulse');
                                        setTimeout(() => btn.classList.remove('animate-pulse'), 500);
                                    }
                                }}
                                className="font-sans w-full px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
                            >
                                Got it! Play Sound
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}