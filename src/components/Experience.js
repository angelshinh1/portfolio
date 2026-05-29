import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Experience() {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const experiencesData = {
        RBC: {
            company: "RBC",
            logo: "/rbc-logo.png",
            fallback: "RBC",
            roles: [
                {
                    title: "Software Developer",
                    type: "Internship",
                    period: "JAN 2026 - APR 2026",
                    description: "Developed and optimized backend services for RBC's Data Sharing API platform, enabling secure data exchange for Open Banking.",
                    details: [
                        "Designed and implemented a Cryptography service following JOSE standards for secure data transmission.",
                        "Improved application startup performance by 80% through multithreading and parallel initialization.",
                        "Built and deployed Java Spring Boot APIs on OpenShift for scalable and modular service architecture."
                    ]
                },
                {
                    title: "Lead Developer – DDP Hunt (RBC Digital & WMT)",
                    type: "Project Lead",
                    period: "JAN 2026 - APR 2026",
                    description: "Led the development of DDP Hunt, an interactive scavenger hunt platform for internal events.",
                    details: [
                        "Built a scalable real-time points system using Next.js and MongoDB.",
                        "Hosted a live event with 30+ participants, driving engagement through gamification."
                    ]
                },
                {
                    title: "Technical Systems Analyst",
                    type: "Co-op",
                    period: "SEP 2025 - DEC 2025",
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
            fallback: "GDG-SP",
            roles: [
                {
                    title: "Vice President of Technology",
                    type: "Volunteer",
                    period: "JAN 2026 - PRESENT",
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
            fallback: "CUSEC",
            roles: [
                {
                    title: "Director of Technology",
                    type: "Volunteer",
                    period: "FEB 2026 - PRESENT",
                    details: [
                        "Developing the conference website for CUSEC 2027.",
                        "Leading Tech General & Tech Growth teams to coordinate technology at CUSEC."
                    ]
                },
                {
                    title: "Director of UI/UX",
                    type: "Volunteer",
                    period: "MAY 2025 - JAN 2026",
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
                    type: "Part-time",
                    period: "JUL 2025 - SEP 2025",
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
            fallback: "SP",
            roles: [
                {
                    title: "Lab Assistant",
                    type: "Part-time",
                    period: "AUG 2024 - PRESENT",
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
                    type: "Part-time",
                    period: "AUG 2024 - JUN 2025",
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
                    title: "Machine Learning Engineer and Data Science Intern",
                    type: "Co-op",
                    period: "JAN 2025 - APR 2025",
                    details: [
                        "Developed predictive models leading to a 10% increase in simulated returns.",
                        "Built data pipelines in Python and JavaScript to automate extraction."
                    ]
                }
            ]
        }
    };

    const flatExperiences = [];
    Object.values(experiencesData).forEach((companyData) => {
        companyData.roles.forEach((role) => {
            flatExperiences.push({
                company: companyData.company,
                logo: companyData.logo,
                fallback: companyData.fallback,
                ...role
            });
        });
    });

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <section
            id="experience"
            className="relative max-w-[88vw] lg:max-w-[64rem] mx-auto px-1 py-24 lg:py-28"
        >
            <SectionHeader title="Experience" className="mb-14 lg:mb-16" />

            <div className="flex flex-col">
                {flatExperiences.map((exp, index) => {
                    const isExpanded = expandedIndex === index;
                    return (
                        <Reveal
                            key={index}
                            delay={Math.min(index * 0.04, 0.2)}
                            className="group/row border-t border-[var(--line)] first:border-t-0"
                        >
                            <div className="flex flex-row gap-4 md:gap-6 py-7">
                                {/* Logo */}
                                <div className="flex-shrink-0 mt-0.5">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--surface)] flex items-center justify-center overflow-hidden border border-[var(--line)] text-[var(--ink)] font-mono font-semibold text-[10px] md:text-xs relative">
                                        <span className="absolute z-0">{exp.fallback}</span>
                                        <img
                                            src={exp.logo}
                                            alt={`${exp.company} logo`}
                                            className="w-full h-full object-cover relative z-10 bg-[var(--surface)]"
                                            onError={(e) => {
                                                e.target.style.display = "none";
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <button
                                        onClick={() => toggleExpand(index)}
                                        className="w-full text-left flex flex-col md:flex-row md:items-start justify-between gap-1.5 cursor-pointer"
                                        aria-expanded={isExpanded}
                                    >
                                        <div className="min-w-0">
                                            <h3 className="font-heading font-medium text-lg md:text-xl text-[var(--ink)] leading-snug transition-colors duration-200 group-hover/row:text-[var(--accent)]">
                                                {exp.title}
                                            </h3>
                                            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1.5">
                                                <span className="font-sans text-sm md:text-base text-[var(--ink-2)] font-medium">
                                                    {exp.company}
                                                </span>
                                                <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase px-2 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                                                    {exp.type}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 md:mt-1 flex-shrink-0">
                                            <span className="font-mono text-[0.7rem] md:text-xs text-[var(--ink-3)] whitespace-nowrap tracking-tight">
                                                {exp.period}
                                            </span>
                                            <svg
                                                width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                className={`text-[var(--ink-3)] transition-transform duration-300 ease-[var(--ease-out)] flex-shrink-0 ${isExpanded ? "rotate-180" : ""}`}
                                            >
                                                <path d="M6 9l6 6 6-6" />
                                            </svg>
                                        </div>
                                    </button>

                                    {/* Expandable details */}
                                    <div
                                        className="grid transition-all duration-300 ease-[var(--ease-out)]"
                                        style={{
                                            gridTemplateRows: isExpanded ? "1fr" : "0fr",
                                            opacity: isExpanded ? 1 : 0
                                        }}
                                    >
                                        <div className="overflow-hidden">
                                            {exp.description && (
                                                <p className="font-sans text-sm md:text-base text-[var(--ink-2)] mt-4 leading-relaxed">
                                                    {exp.description}
                                                </p>
                                            )}
                                            <ul className={`${exp.description ? "mt-3" : "mt-4"} space-y-2`}>
                                                {exp.details.map((detail, dIdx) => (
                                                    <li
                                                        key={dIdx}
                                                        className="font-sans text-sm md:text-[0.95rem] text-[var(--ink-2)] leading-relaxed flex gap-3"
                                                    >
                                                        <span className="text-[var(--accent)] mt-[0.4em] flex-shrink-0 h-px w-3 bg-[var(--accent)]" aria-hidden="true" />
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
            </div>
        </section>
    );
}
