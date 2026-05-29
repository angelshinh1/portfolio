import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const hobbies = [
    { icon: "ti-guitar-pick", title: "Guitar", desc: "Jamming since forever" },
    { icon: "ti-device-gamepad-2", title: "Gaming", desc: "Just finished RDR2" },
    { icon: "ti-pizza", title: "Pizza", desc: "Fuel for coding" },
    { icon: "ti-bulb", title: "Learning", desc: "Always curious" },
    { icon: "ti-camera", title: "Photography", desc: "Capturing moments" },
    { icon: "ti-music", title: "Music", desc: "All genres welcome" },
];

const randomFacts = [
    "I once tried to build a game engine in C++... now it’s just a very expensive calculator",
    "My guitar has more commits than some of my repos",
    "I LOVEE MATCHAA and listen to Clario all the time (totally not being performative)",
    "I can solve a Rubik's cube",
    "I lowkey get confused at some math problems which my high-school self would've solved in seconds",
    "Oh, did I mentioned I'm 6' 2\" 👀",
];

// Each snapshot gets a deterministic tilt + vertical offset so the
// wall reads like a scattered pile of prints rather than a tidy grid.
const snapshots = [
    { n: 1, r: -6, y: 10 },
    { n: 2, r: 4, y: -8 },
    { n: 3, r: -3, y: 16 },
    { n: 4, r: 7, y: -2 },
    { n: 5, r: -5, y: 8 },
    { n: 6, r: 3, y: -12 },
    { n: 7, r: -7, y: 12 },
    { n: 8, r: 5, y: -4 },
];

export default function FunStuff() {
    return (
        <section
            id="fun-stuff"
            className="relative max-w-[88vw] lg:max-w-[72rem] mx-auto px-1 py-24 lg:py-28"
        >
            <SectionHeader
                title="Fun stuff"
                intro={<>The whimsical side - <mark>guitars, gaming, matcha</mark>, and a few facts nobody asked for.</>}
                className="mb-14 lg:mb-16"
            />

            {/* Guitar feature - asymmetric split with offset tinted backing */}
            <Reveal className="mb-20 lg:mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1fr] gap-10 lg:gap-14 items-center">
                    <div className="relative w-full max-w-[300px] mx-auto lg:mx-0">
                        <div className="absolute -inset-3 rounded-3xl bg-[var(--bg-2)]" aria-hidden="true" />
                        <div className="relative rounded-2xl overflow-hidden border border-[var(--line)] shadow-[0_4px_6px_rgba(0,0,0,0.04),0_20px_40px_rgba(0,0,0,0.08)]">
                            <video
                                src="/guitar-video.mp4"
                                controls
                                loop
                                playsInline
                                preload="metadata"
                                className="object-cover w-full aspect-square block"
                                poster="/poster.jpg"
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-heading text-3xl lg:text-4xl text-[var(--ink)] leading-tight">
                            Two years, one <span className="italic">stress reliever</span>.
                        </h3>
                        <p className="font-sans text-base lg:text-lg leading-relaxed text-[var(--ink-2)] mt-5 max-w-[46ch]">
                            Been playing guitar for 2 years and it&apos;s my{" "}
                            <mark>go-to way to unwind</mark>. The song in this video is{" "}
                            <a
                                className="text-[var(--ink)] underline decoration-[var(--line-strong)] underline-offset-4 hover:text-[var(--accent)] hover:decoration-[var(--accent)] transition-colors"
                                href="https://www.youtube.com/watch?v=Hth8kTDTh3g"
                                target="_blank" rel="noopener noreferrer"
                            >
                                Gratitude by Amin Toofani
                            </a>
                            . Currently learning{" "}
                            <a
                                className="text-[var(--ink)] underline decoration-[var(--line-strong)] underline-offset-4 hover:text-[var(--accent)] hover:decoration-[var(--accent)] transition-colors"
                                href="https://www.youtube.com/watch?v=7gphiFVVtUI"
                                target="_blank" rel="noopener noreferrer"
                            >
                                The Song of the Golden Dragon
                            </a>
                            .
                        </p>
                        <div className="flex flex-wrap gap-2 pt-6">
                            {["Classic", "Jazz", "Spanish"].map((g) => (
                                <span
                                    key={g}
                                    className="font-mono text-[0.7rem] px-2.5 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] tracking-tight"
                                >
                                    {g}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Reveal>

            {/* Hobbies + Facts - two-column editorial */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 mb-20 lg:mb-24">
                {/* Hobbies */}
                <div>
                    <Reveal>
                        <h3 className="font-heading text-2xl lg:text-3xl text-[var(--ink)] mb-8">
                            Hobbies &amp; interests
                        </h3>
                    </Reveal>
                    <div className="grid grid-cols-2 gap-3">
                        {hobbies.map((hobby, index) => (
                            <Reveal
                                key={index}
                                delay={Math.min(index * 0.04, 0.2)}
                                className="group flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3.5 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                            >
                                <i className={`ti ${hobby.icon} text-2xl text-[var(--ink-2)] transition-[transform,color] duration-300 ease-[var(--ease-out)] group-hover:scale-110 group-hover:text-[var(--accent)]`} aria-hidden="true" />
                                <div className="min-w-0">
                                    <h4 className="font-sans font-semibold text-sm text-[var(--ink)] leading-tight">
                                        {hobby.title}
                                    </h4>
                                    <p className="font-sans text-xs text-[var(--ink-3)] mt-0.5 truncate">
                                        {hobby.desc}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* Random facts */}
                <div>
                    <Reveal>
                        <h3 className="font-heading text-2xl lg:text-3xl text-[var(--ink)] mb-8">
                            Random facts you didn&apos;t ask for
                        </h3>
                    </Reveal>
                    <ul className="space-y-1">
                        {randomFacts.map((fact, index) => (
                            <li
                                key={index}
                                className="py-3.5 border-t border-[var(--line)]"
                            >
                                <p className="font-sans text-sm lg:text-[0.95rem] leading-relaxed text-[var(--ink-2)]">
                                    {fact}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Gallery */}
            <div>
                <Reveal>
                    <h3 className="font-heading text-2xl lg:text-3xl text-[var(--ink)] mb-8">
                        Life in snapshots 📸
                    </h3>
                </Reveal>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-10 sm:gap-y-12 justify-items-center px-2 py-4">
                    {snapshots.map((s) => (
                        <div
                            key={s.n}
                            style={{ "--r": `${s.r}deg`, "--ty": `${s.y}px` }}
                            className="group/photo relative w-full max-w-[190px] cursor-pointer [transform:rotate(var(--r))_translateY(var(--ty))] transition-transform duration-300 ease-[var(--ease-out)] hover:z-20 hover:[transform:rotate(0deg)_translateY(-8px)_scale(1.05)]"
                        >
                            {/* Print frame */}
                            <div className="rounded-[3px] bg-white p-2.5 pb-5 shadow-[0_2px_4px_rgba(0,0,0,0.06),0_12px_28px_rgba(0,0,0,0.14)] transition-shadow duration-300 ease-[var(--ease-out)] group-hover/photo:shadow-[0_4px_8px_rgba(0,0,0,0.08),0_26px_52px_rgba(0,0,0,0.22)]">
                                <div className="relative aspect-square overflow-hidden rounded-[2px] bg-[var(--bg-2)]">
                                    <Image
                                        src={`/gallery-${s.n}.jpg`}
                                        alt={`Snapshot ${s.n}`}
                                        fill
                                        loading="eager"
                                        className="object-cover"
                                        sizes="(max-width: 768px) 45vw, 190px"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
