import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const GuitarStrings = dynamic(() => import("./GuitarStrings"), { ssr: false });

const experiencesData = {
    RBC: {
        company: "RBC",
        logo: "/rbc-logo.png",
        fallback: "RBC",
        roles: [
            {
                title: "Software Developer",
                period: "Jan – Apr 2026",
                description: "Developed and optimized backend services for RBC's Data Sharing API platform, enabling secure data exchange for Open Banking.",
                details: [
                    "Designed and implemented a Cryptography service following JOSE standards for secure data transmission.",
                    "Improved application startup performance by 80% through multithreading and parallel initialization.",
                    "Built and deployed Java Spring Boot APIs on OpenShift for scalable and modular service architecture."
                ]
            },
            {
                title: "Lead Developer — DDP Hunt",
                period: "Jan – Apr 2026",
                description: "Led the development of DDP Hunt, an interactive scavenger hunt platform for internal events.",
                details: [
                    "Built a scalable real-time points system using Next.js and MongoDB.",
                    "Hosted a live event with 30+ participants, driving engagement through gamification."
                ]
            },
            {
                title: "Technical Systems Analyst",
                period: "Sep – Dec 2025",
                details: [
                    "Optimized automation processes within Identity & Access Management (IAM).",
                    "Built dashboards for data-driven decision-making in Global Cyber Security."
                ]
            }
        ]
    },
    "GOOGLE DEVELOPER GROUPS": {
        company: "Google Developer Groups",
        logo: "/gdg-logo.png",
        fallback: "GDG",
        roles: [
            {
                title: "Vice President of Technology",
                period: "Jan 2026 – Present",
                details: [
                    "Spearhead 4+ technical workshops per term, driving 150+ attendees.",
                    "Foster a hands-on developer learning community at Seneca Polytechnic."
                ]
            }
        ]
    },
    CUSEC: {
        company: "CUSEC",
        logo: "/cusec-logo.png",
        fallback: "CSC",
        roles: [
            {
                title: "Director of Technology",
                period: "Feb 2026 – Present",
                details: [
                    "Developing the conference website for CUSEC 2027.",
                    "Leading Tech General & Tech Growth teams to coordinate technology at CUSEC."
                ]
            },
            {
                title: "Director of UI/UX",
                period: "May 2025 – Jan 2026",
                details: [
                    "Designed the UI and UX for CUSEC 2026 (https://2026.cusec.net)."
                ]
            }
        ]
    },
    LOGICFUSION: {
        company: "LogicFusion",
        logo: "/logicfusion-logo.png",
        fallback: "LF",
        roles: [
            {
                title: "Computer Science Instructor",
                period: "Jul – Sep 2025",
                details: [
                    "Taught robotics and game development using LEGO EV3 and Roblox Studio.",
                    "Instructed Python and C++ programming fundamentals to various age groups."
                ]
            }
        ]
    },
    "SENECA POLYTECHNIC": {
        company: "Seneca Polytechnic",
        logo: "/seneca-logo.png",
        fallback: "SEN",
        roles: [
            {
                title: "Lab Assistant",
                period: "Aug 2024 – Present",
                details: [
                    "Supported 60+ students per semester with assignments and lab activities.",
                    "Helped raise the class average by 30% through one-on-one guidance."
                ]
            }
        ]
    },
    "BEAVER CREEK": {
        company: "Beaver Creek Kids Club",
        logo: "/beavercreek-logo.png",
        fallback: "BC",
        roles: [
            {
                title: "Coding Tutor",
                period: "Aug 2024 – Jun 2025",
                details: [
                    "Mentored 20+ students weekly in C++ and Python fundamentals.",
                    "Created interactive debugging sessions and coding challenges."
                ]
            }
        ]
    },
    "META TRADING CLUB": {
        company: "Meta Trading Club",
        logo: "/metatrading-logo.png",
        fallback: "MTC",
        roles: [
            {
                title: "ML Engineer & Data Science Intern",
                period: "Jan – Apr 2025",
                details: [
                    "Developed predictive models leading to a 10% increase in simulated returns.",
                    "Built data pipelines in Python and JavaScript to automate extraction."
                ]
            }
        ]
    }
};

export default function Experience() {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const sectionRef = useRef(null);
    const pluckApi = useRef(null);
    const [sectionHeight, setSectionHeight] = useState(0);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => setSectionHeight(el.offsetHeight));
        ro.observe(el);
        setSectionHeight(el.offsetHeight);
        return () => ro.disconnect();
    }, []);

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

    const toggleExpand = (index) => {
        const newIndex = expandedIndex === index ? null : index;
        setExpandedIndex(newIndex);
        if (newIndex !== null) {
            pluckApi.current?.pluckString(newIndex % 3, 16);
        }
    };

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="relative max-w-[88vw] lg:max-w-[64rem] mx-auto px-1 py-24 lg:py-28"
        >
            {/* Left-margin vertical accent strings — desktop only */}
            {sectionHeight > 0 && (
                <div
                    className="absolute left-[-1.25rem] top-24 pointer-events-none hidden lg:block"
                    aria-hidden="true"
                    style={{ width: 24, height: sectionHeight - 96 }}
                >
                    <GuitarStrings
                        onReady={api => { pluckApi.current = api; }}
                        width={24}
                        height={sectionHeight - 96}
                        count={3}
                        orientation="vertical"
                        opacity={0.3}
                        interactive={false}
                    />
                </div>
            )}

            <SectionHeader title="Experience" className="mb-10 lg:mb-12" />

            <div className="flex flex-col">
                {flatExperiences.map((exp, index) => {
                    const isExpanded = expandedIndex === index;
                    const num = String(index + 1).padStart(2, "0");

                    return (
                        <Reveal
                            key={index}
                            delay={Math.min(index * 0.04, 0.2)}
                        >
                            <div
                                className="border-t border-[var(--line)] transition-colors duration-300"
                                style={{ background: isExpanded ? "rgba(200, 228, 176, 0.18)" : "transparent" }}
                            >
                                {/* Clickable row */}
                                <button
                                    onClick={() => toggleExpand(index)}
                                    className="w-full text-left cursor-pointer group/row py-7 md:py-9 px-2 md:px-4"
                                    aria-expanded={isExpanded}
                                >
                                    <div className="flex items-start justify-between gap-4 md:gap-8">

                                        {/* Left: logo + number + title + company */}
                                        <div className="flex items-start gap-4 md:gap-5 min-w-0">
                                            {/* Company logo */}
                                            <div className="flex-shrink-0 mt-0.5">
                                                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[var(--bg-surface)] flex items-center justify-center overflow-hidden border border-[var(--line)] font-mono text-[9px] text-[var(--text-muted)] relative">
                                                    <span className="absolute z-0">{exp.fallback}</span>
                                                    <img
                                                        src={exp.logo}
                                                        alt={`${exp.company} logo`}
                                                        className="w-full h-full object-cover relative z-10 bg-[var(--bg-surface)]"
                                                        onError={(e) => { e.target.style.display = "none"; }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="font-heading text-xl md:text-2xl leading-snug text-[var(--text-primary)] transition-colors duration-200 group-hover/row:text-[var(--green-deep)]">
                                                    {exp.title}
                                                </h3>
                                                <p
                                                    className="mt-1"
                                                    style={{
                                                        fontFamily: "'IM Fell English', Georgia, serif",
                                                        fontStyle: "italic",
                                                        fontSize: "1rem",
                                                        color: "var(--green-deep)",
                                                        opacity: 0.8,
                                                    }}
                                                >
                                                    {exp.company}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right: period + toggle */}
                                        <div className="flex-shrink-0 flex items-center gap-3 md:gap-4 mt-0.5">
                                            <span className="font-mono text-[0.74rem] md:text-[0.82rem] text-[var(--text-secondary)] whitespace-nowrap tracking-tight hidden sm:block">
                                                {exp.period}
                                            </span>
                                            <span
                                                className="font-heading text-2xl leading-none select-none transition-all duration-300"
                                                style={{
                                                    color: "var(--green-deep)",
                                                    opacity: isExpanded ? 1 : 0.45,
                                                    transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
                                                    display: "inline-block",
                                                }}
                                            >
                                                +
                                            </span>
                                        </div>
                                    </div>

                                    {/* Period on mobile */}
                                    <p className="sm:hidden font-mono text-[0.74rem] text-[var(--text-secondary)] mt-1.5 ml-10 tracking-tight">
                                        {exp.period}
                                    </p>
                                </button>

                                {/* Expandable details */}
                                <div
                                    className="grid transition-all duration-400 ease-[var(--ease-out)]"
                                    style={{
                                        gridTemplateRows: isExpanded ? "1fr" : "0fr",
                                        opacity: isExpanded ? 1 : 0,
                                        transition: "grid-template-rows 350ms cubic-bezier(0.23,1,0.32,1), opacity 300ms ease",
                                    }}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-2 md:px-4 pb-8 md:pb-10 ml-10 md:ml-14">
                                            {/* Thin green rule */}
                                            <div className="mb-5 h-px w-10" style={{ background: "var(--green-vivid)" }} />

                                            {exp.description && (
                                                <p className="font-body text-base text-[var(--text-secondary)] mb-4 leading-relaxed max-w-[56ch]">
                                                    {exp.description}
                                                </p>
                                            )}
                                            <ul className="space-y-3">
                                                {exp.details.map((detail, dIdx) => (
                                                    <li
                                                        key={dIdx}
                                                        className="font-body text-base text-[var(--text-secondary)] leading-relaxed flex gap-3"
                                                    >
                                                        <span
                                                            className="flex-shrink-0 font-bold mt-[0.05em]"
                                                            style={{ color: "var(--green-deep)" }}
                                                        >
                                                            *
                                                        </span>
                                                        <span>{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    );
                })}

                {/* Closing rule */}
                <div className="border-t border-[var(--line)]" />
            </div>
        </section>
    );
}
