import SectionHeader from "./SectionHeader";
import { Paper } from "./scrapbook";

// One line per role — the detail lives in the resume and case studies
const experiencesData = {
    RBC: {
        company: "RBC",
        logo: "/rbc-logo.png",
        fallback: "RBC",
        roles: [
            {
                title: "Software Developer",
                period: "Jan – Apr 2026",
                year: "2026",
                summary: "open banking apis — jose cryptography, spring boot on openshift",
            },
            {
                title: "Technical Systems Analyst",
                period: "Sep – Dec 2025",
                year: "2025",
                summary: "iam automation + dashboards for global cyber security",
            },
        ],
    },
    "META TRADING CLUB": {
        company: "Meta Trading Club",
        logo: "/metatrading-logo.png",
        fallback: "MTC",
        roles: [
            {
                title: "ML Engineer & Data Science Intern",
                period: "Jan – Apr 2025",
                year: "2025",
                summary: "predictive models + python pipelines, +10% simulated returns",
            },
        ],
    },
    "GOOGLE DEVELOPER GROUPS": {
        company: "Google Developer Groups",
        logo: "/gdg-logo.png",
        fallback: "GDG",
        roles: [
            {
                title: "VP of Technology",
                period: "Jan 2026 – Present",
                year: "present",
                summary: "4+ workshops a term, 150+ developers through the door",
            },
        ],
    },
    CUSEC: {
        company: "CUSEC",
        logo: "/cusec-logo.png",
        fallback: "CSC",
        roles: [
            {
                title: "Director of Technology",
                period: "Feb 2026 – Present",
                year: "present",
                summary: "building cusec 2027, leading tech general & tech growth",
            },
            {
                title: "Director of UI/UX",
                period: "May 2025 – Jan 2026",
                year: "2025",
                summary: "designed cusec 2026 end to end",
            },
        ],
    },
    LOGICFUSION: {
        company: "LogicFusion",
        logo: "/logicfusion-logo.png",
        fallback: "LF",
        roles: [
            {
                title: "Computer Science Instructor",
                period: "Jul – Sep 2025",
                year: "2025",
                summary: "robotics & game dev — lego ev3, roblox, python + c++",
            },
        ],
    },
    "SENECA POLYTECHNIC": {
        company: "Seneca Polytechnic",
        logo: "/seneca-logo.png",
        fallback: "SEN",
        roles: [
            {
                title: "Lab Assistant",
                period: "Aug 2024 – Present",
                year: "present",
                summary: "60+ students a semester, class average up 30%",
            },
        ],
    },
    "BEAVER CREEK": {
        company: "Beaver Creek Kids Club",
        logo: "/beavercreek-logo.png",
        fallback: "BC",
        roles: [
            {
                title: "Coding Tutor",
                period: "Aug 2024 – Jun 2025",
                year: "2024",
                summary: "20+ kids a week on c++ and python fundamentals",
            },
        ],
    },
};

function RoleRow({ exp }) {
    return (
        <li className="group/row relative flex items-start gap-4 md:gap-5 py-4 md:py-[1.1rem]">
            {/* Company mark — a little round sticker */}
            <span className="flex-shrink-0 mt-[0.1rem]">
                <span
                    className="relative flex w-10 h-10 md:w-11 md:h-11 items-center justify-center overflow-hidden rounded-full bg-[var(--bg-surface)] font-mono text-[8px] text-[var(--text-muted)]"
                    style={{ border: "3px solid #fff", boxShadow: "0 1px 2px rgba(62,44,30,0.16), 0 3px 8px rgba(62,44,30,0.12)" }}
                >
                    <span className="absolute z-0">{exp.fallback}</span>
                    <img
                        src={exp.logo}
                        alt=""
                        className="relative z-10 w-full h-full object-cover bg-[var(--bg-surface)]"
                        onError={(e) => { e.target.style.display = "none"; }}
                    />
                </span>
            </span>

            {/* Role, company, one-liner */}
            <span className="min-w-0 flex-1">
                <span className="block">
                    <span
                        className="highlight-swipe text-[var(--text-primary)]"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontWeight: 600,
                            fontSize: "clamp(1.05rem, 1.6vw, 1.22rem)",
                            letterSpacing: "-0.011em",
                        }}
                    >
                        {exp.title}
                    </span>
                    <span
                        className="ml-2 text-[var(--text-muted)]"
                        style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.98rem" }}
                    >
                        @ {exp.company}
                    </span>
                </span>
                <span
                    className="mt-1 block text-[var(--text-muted)] transition-colors duration-200 group-hover/row:text-[var(--text-secondary)]"
                    style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.9rem", lineHeight: 1.5 }}
                >
                    {exp.summary}
                </span>
            </span>

            {/* Year, jotted in the margin — the full period is there for anyone who hovers it */}
            <span
                className="font-hand flex-shrink-0 self-start mt-[0.05rem] text-[1.35rem] leading-none text-[var(--ink-sepia)] whitespace-nowrap transition-colors duration-200 group-hover/row:text-[var(--green-deep)]"
                title={exp.period}
            >
                {exp.year}
            </span>
        </li>
    );
}

export default function Experience() {
    const flatExperiences = [];
    Object.values(experiencesData).forEach((companyData) => {
        companyData.roles.forEach((role) => {
            flatExperiences.push({
                company: companyData.company,
                logo: companyData.logo,
                fallback: companyData.fallback,
                ...role,
            });
        });
    });

    return (
        <section
            id="experience"
            className="relative max-w-[88vw] lg:max-w-[64rem] mx-auto px-1 py-24 lg:py-28"
        >
            <SectionHeader title="Experience" className="mb-12 lg:mb-14" />

            {/* A page torn out of a notebook, clipped to the board */}
            <Paper
                variant="lined"
                tear={["bottom"]}
                seed={11}
                depth={7}
                rotate={0.6}
                className="max-md:![rotate:0deg] max-md:![filter:none]"
                innerClassName="paper-holes max-md:!bg-transparent max-md:!bg-none max-md:![clip-path:none] md:pl-[6rem] md:pr-10 md:pt-12 md:pb-14"
                style={{ "--hole": "var(--bg-grain)" }}
                decor={
                    <>
                        {/* Sticky note stuck to the page's corner — desktop only */}
                        <a
                            href="/Angel_Resume_swe.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="scrap scrap-hover sticky-note absolute -top-16 -right-14 w-40 p-4 pt-5 hidden xl:block"
                            style={{ "--r": "5deg" }}
                        >
                            <span className="font-hand block text-[1.4rem] leading-[1.05] text-[var(--ink-brown)]">
                                the long description lives in my resume &rarr;
                            </span>
                        </a>
                    </>
                }
            >
                <ul className="flex flex-col">
                    {flatExperiences.map((exp) => (
                        <RoleRow key={`${exp.company}-${exp.title}`} exp={exp} />
                    ))}
                </ul>
            </Paper>
        </section>
    );
}
