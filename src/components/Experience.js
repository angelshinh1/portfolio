import Image from "next/image";
import { useState } from "react";

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
                    period: "Jan 2026 - PRESENT",
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

    const typeBadgeStyles = {
        "Internship":    "bg-blue-50 text-blue-700 border border-blue-200",
        "Co-op":         "bg-violet-50 text-violet-700 border border-violet-200",
        "Part-time":     "bg-amber-50 text-amber-700 border border-amber-200",
        "Full-time":     "bg-green-50 text-green-700 border border-green-200",
        "Volunteer":     "bg-rose-50 text-rose-700 border border-rose-200",
        "Project Lead":  "bg-teal-50 text-teal-700 border border-teal-200",
    };

    const getTypeBadgeClass = (type) =>
        typeBadgeStyles[type] || "bg-gray-100 text-gray-600 border border-gray-200";

    const flatExperiences = [];
    Object.values(experiencesData).forEach(companyData => {
        companyData.roles.forEach(role => {
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
        <section id="experience" className="max-w-[80vw] lg:max-w-[65vw] mx-auto py-16">
            {/* Header */}
            <div className="font-sans mb-10 text-left">
                <h2 className="font-heading text-2xl lg:text-3xl font-bold mb-3 text-[#1E1E1E]">Work Experience</h2>
            </div>

            {/* Experience List */}
            <div className="flex flex-col gap-12">
                {flatExperiences.map((exp, index) => {
                    const isExpanded = expandedIndex === index;
                    return (
                        <div key={index} className="flex flex-row gap-4 md:gap-6">
                            {/* Left Side: Logo - always visible on same line as title */}
                            <div className="flex-shrink-0 mt-0.5">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center overflow-hidden border border-black/10 text-[#1E1E1E] font-bold text-sm md:text-xl relative">
                                    <span className="absolute z-0">{exp.fallback}</span>
                                    <img 
                                        src={exp.logo} 
                                        alt={`${exp.company} logo`}
                                        className="w-full h-full object-contain relative z-10 bg-white"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Right Side: Content */}
                            <div className="flex-1 min-w-0">
                                {/* Header Row (Clickable) */}
                                <div 
                                    onClick={() => toggleExpand(index)}
                                    className="flex flex-col md:flex-row md:items-start justify-between mb-2 cursor-pointer group"
                                >
                                    <div className="min-w-0">
                                        <h3 className="font-heading font-bold text-base md:text-lg text-[#1E1E1E] transition-colors group-hover:text-black leading-snug">
                                            {exp.title}
                                        </h3>
                                        <p className="font-sans text-sm md:text-base text-gray-700 mt-0.5 font-medium">
                                            {exp.company}{" "}
                                            <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${getTypeBadgeClass(exp.type)}`}>
                                                {exp.type}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1.5 md:mt-0 md:ml-4 flex-shrink-0">
                                        <p className="font-sans text-xs md:text-sm text-gray-600 whitespace-nowrap font-medium">
                                            {exp.period}
                                        </p>
                                        <svg 
                                            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                            className={`text-gray-500 transform transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                                        >
                                            <path d="M6 9l6 6 6-6"/>
                                        </svg>
                                    </div>
                                </div>

                                {/* Expandable Details */}
                                <div 
                                    className="grid transition-all duration-300 ease-in-out"
                                    style={{ 
                                        gridTemplateRows: isExpanded ? '1fr' : '0fr',
                                        opacity: isExpanded ? 1 : 0
                                    }}
                                >
                                    <div className="overflow-hidden">
                                        {exp.description && (
                                            <p className="font-sans text-sm text-gray-700 mt-3 leading-relaxed whitespace-pre-line">
                                                {exp.description}
                                            </p>
                                        )}
                                        <ul className={`list-disc list-outside ml-4 ${exp.description ? 'mt-2' : 'mt-3'} space-y-1.5`}>
                                            {exp.details.map((detail, dIdx) => (
                                                <li key={dIdx} className="font-sans text-sm text-gray-600 leading-relaxed pl-1 marker:text-gray-400">
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}