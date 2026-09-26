import dynamic from "next/dynamic";
import SectionHeader from "./SectionHeader";
import StringLink from "./StringLink";
import PhotoBoard from "./PhotoBoard";
import { Paper, Tape, Polaroid, DoodleArrow } from "./scrapbook";

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

// One guitar-string color per hobby icon (low E → high e)
const HOBBY_ACCENTS = [
    'var(--string-E)',
    'var(--string-D)',
    'var(--string-B)',
    'var(--string-G)',
    'var(--string-A)',
    'var(--string-e)',
];

// Paper tags cut from the same stock, set down at slightly different angles
const TAGS = [
    { r: 2,    seed: 41 },
    { r: -1.5, seed: 42 },
    { r: 1,    seed: 43 },
    { r: -2,   seed: 44 },
    { r: 1.5,  seed: 45 },
    { r: -1,   seed: 46 },
];

// The fact that gets a highlighter pass
const CALLOUT_FACT = 1;

export default function FunStuff() {
    return (
        <section
            id="fun-stuff"
            className="relative max-w-[88vw] lg:max-w-[72rem] mx-auto px-1 pt-24 pb-24 lg:pt-28 lg:pb-28"
        >
            <SectionHeader
                title="Fun stuff"
                intro={<>The whimsical side — <mark>guitars, gaming, matcha</mark>, and a few facts nobody asked for.</>}
                className="mb-16 lg:mb-20"
            />

            {/* Guitar feature — the video is a snapshot taped into the book */}
            <div className="mb-28 lg:mb-32 grid grid-cols-1 lg:grid-cols-[0.75fr_1fr] gap-14 lg:gap-16 items-center">
                <div className="relative w-full max-w-[320px] mx-auto lg:mx-0">
                    <Polaroid
                        rotate={2.5}
                        tape="kraft"
                        tapeRotate={4}
                        caption="Gratitude — Amin Toofani ♪"
                        hover={false}
                    >
                        <video
                            src="/guitar-video.mp4"
                            controls
                            loop
                            playsInline
                            preload="metadata"
                            className="absolute inset-0 object-cover w-full h-full block"
                            poster="/poster.jpg"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </Polaroid>
                </div>

                <div>
                    <h3 className="type-heading text-[var(--text-primary)]">
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

                    <p className="font-body type-lead text-[var(--text-secondary)] max-w-[46ch]">
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
                    <div className="flex flex-wrap gap-3 pt-7">
                        {["Classic", "Jazz", "Spanish"].map((g, i) => (
                            <span
                                key={g}
                                className="label-dymo"
                                style={{ rotate: `${[-2, 1.5, -1][i]}deg` }}
                            >
                                {g}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hobbies + Facts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-16 items-start">
                {/* Hobbies — small paper tags */}
                <div>
                    <h3 className="type-heading text-[var(--text-primary)] mb-10">
                        Hobbies &amp; interests
                    </h3>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-8 pt-2">
                        {hobbies.map((hobby, index) => {
                            const t = TAGS[index % TAGS.length];
                            return (
                                <Paper
                                    key={hobby.title}
                                    as="li"
                                    variant="cream"
                                    seed={t.seed}
                                    depth={4}
                                    rotate={t.r}
                                    innerClassName="flex flex-col items-center text-center gap-2 px-3 py-5"
                                >
                                    <i
                                        className={`ti ${hobby.icon} text-[1.8rem]`}
                                        style={{ color: HOBBY_ACCENTS[index % HOBBY_ACCENTS.length] }}
                                        aria-hidden="true"
                                    />
                                    <div>
                                        <h4 className="font-type text-[0.78rem] uppercase tracking-[0.14em] text-[var(--ink-brown)] leading-tight">
                                            {hobby.title}
                                            {hobby.highlight && (
                                                <span className="ml-1 text-[var(--green-deep)]" aria-hidden>♪</span>
                                            )}
                                        </h4>
                                        <p className="font-hand text-[1.15rem] text-[var(--ink-sepia)] mt-1.5 leading-none">
                                            {hobby.desc}
                                        </p>
                                    </div>
                                </Paper>
                            );
                        })}
                    </ul>
                </div>

                {/* Random facts — jotted on a torn notebook page */}
                <div>
                    <h3 className="type-heading text-[var(--text-primary)] mb-10">
                        Random facts you didn&apos;t ask for
                    </h3>
                    <Paper
                        variant="lined"
                        tear={["top", "bottom"]}
                        seed={31}
                        depth={6}
                        rotate={-1.2}
                        innerClassName="pl-[4.25rem] md:pl-[5.5rem] pr-5 md:pr-8 pt-8 pb-10"
                        decor={<Tape variant="washi" rotate={-4} className="-top-2 left-1/2 -translate-x-1/2" />}
                    >
                        <ol className="flex flex-col">
                            {randomFacts.map((fact, index) => (
                                <li key={index} className="relative py-2.5">
                                    <span
                                        className="font-hand absolute -left-10 md:-left-12 top-1.5 text-[1.5rem] leading-none text-[var(--ink-sepia)]"
                                        aria-hidden
                                    >
                                        {index + 1}.
                                    </span>
                                    <p className="font-body type-small text-[var(--text-secondary)]">
                                        {index === CALLOUT_FACT ? <mark>{fact}</mark> : fact}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </Paper>
                </div>
            </div>

            {/* Photo board */}
            <div className="mt-28 lg:mt-32">
                <div className="flex flex-wrap items-end gap-x-6 gap-y-2 mb-12">
                    <h3 className="type-heading text-[var(--text-primary)]">
                        Around Toronto
                    </h3>
                    <p className="font-hand hidden lg:flex items-center gap-2 text-[1.5rem] leading-none text-[var(--ink-brown)] pb-1" style={{ rotate: "-2deg" }}>
                        go ahead, move them around
                        <DoodleArrow className="w-12 rotate-[35deg] translate-y-3" />
                    </p>
                </div>
                <PhotoBoard />
            </div>
        </section>
    );
}
