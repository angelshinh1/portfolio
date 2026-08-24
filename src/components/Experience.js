import SectionHeader from "./SectionHeader";

// One line per role. The long-form detail lives in the resume and the case
// studies — this section is a glance, not a document.
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
                title: "Lead Developer (Volunteer) - DDP Hunt",
                period: "Jan – Apr 2026",
                year: "2026",
                summary: "real-time scavenger hunt platform, next.js + mongodb, 30+ players live",
            },
            {
                title: "Technical Systems Analyst",
                period: "Sep – Dec 2025",
                year: "2025",
                summary: "iam automation + dashboards for global cyber security",
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
};

function RoleRow({ exp }) {
    const inner = (
        <>
            {/* Company mark */}
            <span className="flex-shrink-0 mt-[0.15rem]">
                <span className="relative flex w-9 h-9 md:w-10 md:h-10 items-center justify-center overflow-hidden rounded-full border border-[var(--line)] bg-[var(--bg-surface)] font-mono text-[8px] text-[var(--text-muted)] transition-[transform,box-shadow] duration-300 ease-[var(--spring)] group-hover/row:scale-105 group-hover/row:shadow-[var(--lift-1)]">
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
                        className="text-[var(--text-primary)] transition-colors duration-200 group-hover/row:text-[var(--green-deep)]"
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

            {/* Year — the full period is there for anyone who hovers it */}
            <span
                className="flex-shrink-0 self-start mt-[0.35rem] font-mono text-[0.7rem] tracking-tight text-[var(--text-muted)] whitespace-nowrap opacity-70 transition-opacity duration-200 group-hover/row:opacity-100"
                title={exp.period}
            >
                {exp.year}
            </span>
        </>
    );

    const rowClass =
        "group/row relative flex items-start gap-4 md:gap-5 rounded-xl px-3 md:px-4 py-3.5 md:py-4 " +
        "transition-colors duration-300 ease-[var(--spring)] hover:bg-[rgba(200,228,176,0.28)]";

    return (
        <li className={rowClass}>
            {inner}
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
            <SectionHeader title="Experience" className="mb-8 lg:mb-10" />

            <ul className="flex flex-col -mx-3 md:-mx-4">
                {flatExperiences.map((exp) => (
                    <RoleRow key={`${exp.company}-${exp.title}`} exp={exp} />
                ))}
            </ul>
        </section>
    );
}
