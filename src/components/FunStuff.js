import Image from "next/image";
import dynamic from "next/dynamic";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import StringLink from "./StringLink";

const GuitarStrings = dynamic(() => import("./GuitarStrings"), { ssr: false });

const hobbies = [
    { icon: "ti-guitar-pick", title: "Guitar", desc: "Jamming since forever", highlight: true },
    { icon: "ti-device-gamepad-2", title: "Gaming", desc: "Just finished RDR2" },
    { icon: "ti-pizza", title: "Pizza", desc: "Fuel for coding" },
    { icon: "ti-bulb", title: "Learning", desc: "Always curious" },
    { icon: "ti-camera", title: "Photography", desc: "Capturing moments" },
    { icon: "ti-music", title: "Music", desc: "All genres welcome" },
];

const randomFacts = [
    "I once tried to build a game engine in C++... now it's just a very expensive calculator",
    "My guitar has more commits than some of my repos",
    "I LOVEE MATCHAA and listen to Clario all the time (totally not being performative)",
    "I can solve a Rubik's cube",
    "I lowkey get confused at some math problems which my high-school self would've solved in seconds",
    "Oh, did I mentioned I'm 6' 2\" 👀",
];

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

// Decorative note positions scattered in the section
const AMBIENT_NOTES = [
    { symbol: '♪', right: '2%',  top: '6%',  size: '1.4rem', opacity: 0.14 },
    { symbol: '♫', left:  '1%',  top: '28%', size: '1.1rem', opacity: 0.12 },
    { symbol: '♩', right: '3%',  top: '52%', size: '1rem',   opacity: 0.13 },
    { symbol: '♬', left:  '2%',  top: '74%', size: '1.2rem', opacity: 0.11 },
];

export default function FunStuff() {
    return (
        <section
            id="fun-stuff"
            className="relative max-w-[88vw] lg:max-w-[72rem] mx-auto px-1 pt-24 pb-12 lg:pt-28 lg:pb-14"
        >
            {/* Ambient musical notes — desktop only */}
            {AMBIENT_NOTES.map((n, i) => (
                <span
                    key={i}
                    className="absolute pointer-events-none select-none font-body hidden lg:block"
                    style={{
                        left: n.left,
                        right: n.right,
                        top: n.top,
                        fontSize: n.size,
                        opacity: n.opacity,
                        color: 'var(--green-deep)',
                    }}
                    aria-hidden
                >
                    {n.symbol}
                </span>
            ))}

            <SectionHeader
                title="Fun stuff"
                intro={<>The whimsical side — <mark>guitars, gaming, matcha</mark>, and a few facts nobody asked for.</>}
                className="mb-14 lg:mb-16"
            />

            {/* Guitar feature */}
            <Reveal className="mb-20 lg:mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1fr] gap-10 lg:gap-14 items-center">
                    <div className="relative w-full max-w-[300px] mx-auto lg:mx-0">
                        <div className="absolute -inset-3 rounded-3xl bg-[var(--bg-grain)]" aria-hidden="true" />
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
                        <h3 className="font-heading text-3xl lg:text-4xl text-[var(--text-primary)] leading-tight">
                            Two years, one <span style={{ fontStyle: "italic" }}>stress reliever</span>.
                        </h3>

                        {/* Decorative mini string strip under heading */}
                        <div className="mt-3 mb-5 w-40 overflow-hidden" style={{ height: 16 }}>
                            <GuitarStrings
                                width={160}
                                height={16}
                                count={3}
                                opacity={0.4}
                                interactive={false}
                                droneOnMount
                                droneAmplitude={4}
                            />
                        </div>

                        <p className="font-body text-base lg:text-lg leading-relaxed text-[var(--text-secondary)] max-w-[46ch]">
                            Been playing guitar for 2 years and it&apos;s my{" "}
                            <mark>go-to way to unwind</mark>. The song in this video is{" "}
                            <StringLink
                                href="https://www.youtube.com/watch?v=Hth8kTDTh3g"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Gratitude by Amin Toofani
                            </StringLink>
                            . Currently learning{" "}
                            <StringLink
                                href="https://www.youtube.com/watch?v=7gphiFVVtUI"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                The Song of the Golden Dragon
                            </StringLink>
                            .
                        </p>
                        <div className="flex flex-wrap gap-2 pt-6">
                            {["Classic", "Jazz", "Spanish"].map((g) => (
                                <span
                                    key={g}
                                    className="font-mono text-[0.7rem] px-2.5 py-1 bg-[var(--bg-green)] text-[var(--green-deep)] tracking-tight"
                                    style={{ borderRadius: '2px' }}
                                >
                                    {g}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Reveal>

            {/* Hobbies + Facts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
                {/* Hobbies */}
                <div>
                    <Reveal>
                        <h3 className="font-heading text-2xl lg:text-3xl text-[var(--text-primary)] mb-8">
                            <span className="initial">H</span>obbies &amp; interests
                        </h3>
                    </Reveal>
                    <div className="grid grid-cols-2 gap-3">
                        {hobbies.map((hobby, index) => (
                            <Reveal
                                key={index}
                                delay={Math.min(index * 0.04, 0.2)}
                                className={`group flex items-center gap-3 border bg-[var(--bg-surface)] px-4 py-3.5 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${
                                    hobby.highlight
                                        ? 'border-[var(--green-muted)]'
                                        : 'border-[var(--line)]'
                                }`}
                                style={{ borderRadius: '4px' }}
                            >
                                <i className={`ti ${hobby.icon} text-2xl text-[var(--text-secondary)] transition-[transform,color] duration-300 ease-[var(--ease-out)] group-hover:scale-110 group-hover:text-[var(--green-deep)]`} aria-hidden="true" />
                                <div className="min-w-0">
                                    <h4 className="font-body font-semibold text-sm text-[var(--text-primary)] leading-tight">
                                        {hobby.title}
                                        {hobby.highlight && (
                                            <span className="ml-1.5 font-body font-normal text-[var(--green-deep)] text-xs" aria-hidden>♪</span>
                                        )}
                                    </h4>
                                    <p className="font-mono text-xs text-[var(--text-muted)] mt-0.5 truncate">
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
                        <h3 className="font-heading text-2xl lg:text-3xl text-[var(--text-primary)] mb-8">
                            <span className="initial">R</span>andom facts you didn&apos;t ask for
                        </h3>
                    </Reveal>
                    <ul className="space-y-1">
                        {randomFacts.map((fact, index) => (
                            <Reveal
                                key={index}
                                delay={Math.min(index * 0.04, 0.2)}
                                as="li"
                                className="py-3.5 border-t border-[var(--line)]"
                            >
                                <p className="font-body text-sm lg:text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                                    {/* Guitar fact gets a note prefix */}
                                    {index === 1 && (
                                        <span className="mr-1.5 text-[var(--green-deep)] opacity-60" aria-hidden>♩</span>
                                    )}
                                    {fact}
                                </p>
                            </Reveal>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Gallery — photos hanging from guitar strings */}
            {/* <div>
                <Reveal>
                    <h3 className="font-heading text-2xl lg:text-3xl text-[var(--text-primary)] mb-10">
                        <span className="initial">H</span>anging on the strings{" "}
                        <span style={{ color: "var(--green-deep)", opacity: 0.55 }} aria-hidden>♪</span>
                    </h3>
                </Reveal>

                {[snapshots.slice(0, 4), snapshots.slice(4)].map((row, rowIdx) => (
                    <div key={rowIdx} className={rowIdx > 0 ? "mt-16" : ""}>
                        <svg
                            width="100%"
                            height="8"
                            viewBox="0 0 1000 8"
                            preserveAspectRatio="none"
                            aria-hidden
                            className="block"
                        >
                            <line
                                x1="0" y1="4" x2="1000" y2="4"
                                stroke={rowIdx === 0 ? "var(--string-A)" : "var(--string-D)"}
                                strokeWidth={rowIdx === 0 ? 2.5 : 1.5}
                                strokeLinecap="round"
                                opacity={0.6}
                            />
                        </svg>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-8 justify-items-center px-2 pt-2">
                            {row.map((s) => (
                                <Reveal key={s.n} delay={s.n * 0.03} className="relative w-full max-w-[170px]">
                                    <div
                                        className="absolute left-1/2 -translate-x-1/2 -top-[14px]"
                                        aria-hidden
                                        style={{ width: 1.5, height: 14, background: "var(--green-deep)", opacity: 0.3 }}
                                    />
                                    <div
                                        style={{ "--r": `${s.r}deg`, "--ty": `${Math.round(s.y * 0.5)}px` }}
                                        className="group/photo cursor-pointer [transform:rotate(var(--r))_translateY(var(--ty))] transition-transform duration-300 ease-[var(--ease-out)] hover:z-20 hover:[transform:rotate(0deg)_translateY(-6px)_scale(1.04)]"
                                    >
                                        <div className="rounded-[3px] bg-white p-2.5 pb-5 shadow-[0_2px_4px_rgba(0,0,0,0.06),0_12px_28px_rgba(0,0,0,0.14)] transition-shadow duration-300 ease-[var(--ease-out)] group-hover/photo:shadow-[0_4px_8px_rgba(0,0,0,0.08),0_26px_52px_rgba(0,0,0,0.22)]">
                                            <div className="relative aspect-square overflow-hidden rounded-[2px] bg-[var(--bg-grain)]">
                                                <Image
                                                    src={`/gallery-${s.n}.jpg`}
                                                    alt={`Snapshot ${s.n}`}
                                                    fill
                                                    loading="eager"
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 45vw, 170px"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                ))}
            </div> */}
        </section>
    );
}
