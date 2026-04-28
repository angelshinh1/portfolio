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
                    description: "Developed and optimized backend services for RBC's Data Sharing API platform, enabling secure data exchange for initiatives such as Open Banking and Interac Pay-By-Bank.",
                    details: [
                        "Designed and implemented a Cryptography service following JOSE (JSON Object Signing and Encryption) standards, ensuring secure, compliant transmission of sensitive client data across distributed systems",
                        "Architected the service for scalability and modularity, leveraging stateless design, clear service boundaries, and extensible components to support high-throughput API workloads",
                        "Improved application startup performance by 80% by introducing multithreading and parallel initialization of critical components",
                        "Built and enhanced Java Spring Boot APIs deployed on OpenShift, contributing to production-grade backend systems used by internal and external consumers",
                        "Translated business and security requirements into technical designs, including API specifications, data mappings, and system workflows",
                        "Conducted performance tuning, debugging, and root cause analysis to improve reliability and efficiency of services",
                        "Contributed to CI/CD and DevOps workflows, supporting deployment, monitoring, and production stability",
                        "Participated in design reviews, technical discussions, and presented solutions to stakeholders and team members"
                    ]
                },
                {
                    title: "Lead Developer – DDP Hunt (RBC Digital & WMT)",
                    type: "Project Lead",
                    period: "JAN 2026 - APR 2026",
                    description: "Led the development of DDP Hunt, an interactive scavenger hunt platform inspired by the @ CUSEC 2026 Scavenger Hunt, along with my internship and adapted for internal use at RBC.\n\nRefactored and rebuilt the codebase alongside to create a scalable and engaging system that allowed participants to claim hunt items via QR codes and unique codes, accumulate points, and redeem prizes in real time.\n\nHosted and executed a live event involving 30+ co-op students across RBC Digital and Wealth Management Technologies, driving engagement through gamification and seamless user experience.\n\nKey contributions:",
                    details: [
                        "Led architecture and development using Next.js and MongoDB",
                        "Designed real-time point tracking and reward redemption system",
                        "Pitched the idea to the VP of my branch to further discuss how this technology can be used in real scenarios to improve customer experience"
                    ]
                },
                {
                    title: "Technical Systems Analyst",
                    type: "Co-op",
                    period: "SEP 2025 - DEC 2025",
                    details: [
                        "Developing and optimizing automation processes to improve data accuracy and operational efficiency within the Identity & Access Management (IAM) Analytics & Governance team.",
                        "Collaborating with cross-functional teams to enable data-driven decision-making strategies for Global Cyber Security.",
                        "Building and maintaining dashboards for clear visualization of insights and recommendations.",
                        "Assisting with database management, testing, and documentation of end-to-end data flows.",
                        "Working in an agile environment to deliver secure and scalable solutions aligned with business needs."
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
                    period: "FEB 2025 - PRESENT",
                    details: [
                        "Currently developing a conference website for CUSEC 2027.",
                        "Leading two teams: Tech General & Tech Growth to coordinate and develop technology at CUSEC."
                    ]
                },
                {
                    title: "Director of UI/UX",
                    type: "Volunteer",
                    period: "MAY 2025 - JAN 2026",
                    details: [
                        "Worked on UI and UX Design for CUSEC 2026.",
                        "Final result: https://2026.cusec.net"
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
                        "Spearhead 4+ technical workshops and study sessions per term for GDG @ Seneca Polytechnic, driving 150+ student attendees and fostering a hands-on developer learning community."
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
                        "Tought robotics using LEGO NXT and EV3 to introduce engineering and programming fundamentals.",
                        "Lead game development sessions with Roblox Studio (Lua) to build interactive 3D experiences.",
                        "Instructed Python and C++ programming, covering core concepts like loops, functions, and OOP.",
                        "Designed hands-on projects that develop logical thinking, creativity, and problem-solving skills.",
                        "Adapted teaching methods for different age groups and skill levels in a fun, engaging environment."
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
                        "Supported 60+ students per semester through hands-on help with assignments and lab activities.",
                        "Raised class average by 30% through one-on-one guidance and peer-learning strategies.",
                        "Maintained a safe and collaborative lab environment by enforcing lab guidelines."
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
                        "Mentored 20+ students weekly in C++ and Python fundamentals, resulting in a 95% lab pass rate.",
                        "Created interactive debugging sessions and coding challenges to reinforce core OOP concepts."
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
                        "Developed predictive models to analyze market patterns, leading to a 10% increase in simulated returns.",
                        "Built data pipelines using Python and JavaScript to automate extraction and transformation of financial datasets.",
                        "Integrated NLP-powered prompt engineering for news-based sentiment analysis, improving short-term prediction reliability by 15%."
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

    // Flatten the experiences data into a single array
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
                <h2 className="font-heading text-2xl lg:text-4xl font-bold mb-3 text-[#1E1E1E]">Work Experience</h2>
            </div>

            {/* Experience List */}
            <div className="flex flex-col gap-12">
                {flatExperiences.map((exp, index) => {
                    const isExpanded = expandedIndex === index;
                    return (
                        <div key={index} className="flex flex-col md:flex-row gap-6">
                            {/* Left Side: Logo */}
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center overflow-hidden border border-black/10 text-[#1E1E1E] font-bold text-xl relative">
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
                            <div className="flex-1">
                                {/* Header Row (Clickable) */}
                                <div 
                                    onClick={() => toggleExpand(index)}
                                    className="flex flex-col md:flex-row md:items-start justify-between mb-2 cursor-pointer group"
                                >
                                    <div>
                                        <h3 className="font-heading font-bold text-base md:text-lg text-[#1E1E1E] transition-colors group-hover:text-black">
                                            {exp.title}
                                        </h3>
                                        <p className="font-sans text-sm md:text-base text-gray-700 mt-0.5 font-medium">
                                            {exp.company} <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${getTypeBadgeClass(exp.type)}`}>
                                                {exp.type}
                                            </span>
                                        </p>
                                        <div className="mt-1.5">
                                            
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 mt-2 md:mt-0">
                                        <p className="font-sans text-xs md:text-sm text-gray-600 whitespace-nowrap font-medium">
                                            {exp.period}
                                        </p>
                                        <svg 
                                            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                            className={`text-gray-500 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
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