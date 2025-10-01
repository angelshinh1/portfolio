import { useState, useRef } from "react";

export default function Experience() {
    const [selectedExp, setSelectedExp] = useState("RBC");
    const detailsRef = useRef(null);

    const experiences = {
        RBC: {
            title: "Technical Systems Analyst",
            company: "RBC",
            type: "Co-op",
            period: "SEP 2025 - PRESENT",
            details: [
                "Developing and optimizing automation processes to improve data accuracy and operational efficiency within the Identity & Access Management (IAM) Analytics & Governance team.",
                "Collaborating with cross-functional teams to enable data-driven decision-making strategies for Global Cyber Security.",
                "Building and maintaining dashboards for clear visualization of insights and recommendations.",
                "Assisting with database management, testing, and documentation of end-to-end data flows.",
                "Working in an agile environment to deliver secure and scalable solutions aligned with business needs."
            ]
        },
        LOGICFUSION: {
            title: "Computer Science Instructor",
            company: "LogicFusion",
            type: "Permanent Part-time",
            period: "JUL 2025 - PRESENT",
            details: [
                "Teach robotics using LEGO NXT and EV3 to introduce engineering and programming fundamentals.",
                "Lead game development sessions with Roblox Studio (Lua) to build interactive 3D experiences.",
                "Instruct Python and C++ programming, covering core concepts like loops, functions, and OOP.",
                "Design hands-on projects that develop logical thinking, creativity, and problem-solving skills.",
                "Adapt teaching methods for different age groups and skill levels in a fun, engaging environment."
            ]
        },
        CUSEC: {
            title: "Developer and UI/UX Designer",
            company: "CUSEC",
            type: "Volunteer",
            period: "MAY 2025 - PRESENT",
            details: [
                "Collaborated with cross-functional teams to design and develop a responsive website for CUSEC.",
                "Led the UI/UX revamp of the conference portal, improving user engagement through intuitive navigation and visual consistency.",
                "Implemented accessibility best practices to ensure inclusivity and compliance, increasing usability across diverse audiences.",
                "Designed promotional assets and branding elements to maintain visual consistency across digital platforms."
            ]
        },
        "SENECA POLYTECHNIC": {
            title: "Lab Assistant",
            company: "Seneca Polytechnic",
            type: "Contract Part-time",
            period: "AUG 2024 - PRESENT",
            details: [
                "Supported 60+ students per semester through hands-on help with assignments and lab activities.",
                "Raised class average by 30% through one-on-one guidance and peer-learning strategies.",
                "Maintained a safe and collaborative lab environment by enforcing lab guidelines."
            ]
        },
        "BEAVER CREEK": {
            title: "Coding Tutor",
            company: "Beaver Creek Kids Club",
            type: "Permanent Part-time",
            period: "AUG 2024 - JUN 2025",
            details: [
                "Mentored 20+ students weekly in C++ and Python fundamentals, resulting in a 95% lab pass rate.",
                "Created interactive debugging sessions and coding challenges to reinforce core OOP concepts."
            ]
        },
        "META TRADING CLUB": {
            title: "Machine Learning Engineer and Data Science Intern",
            company: "Meta Trading Club",
            type: "Co-op",
            period: "JAN 2025 - APR 2025",
            details: [
                "Developed predictive models to analyze market patterns, leading to a 10% increase in simulated returns.",
                "Built data pipelines using Python and JavaScript to automate extraction and transformation of financial datasets.",
                "Integrated NLP-powered prompt engineering for news-based sentiment analysis, improving short-term prediction reliability by 15%."
            ]
        }
    };

    const companyKeys = Object.keys(experiences);
    const currentIndex = companyKeys.indexOf(selectedExp);

    const handleExpChange = (company) => {
        setSelectedExp(company);
        
        // Auto-scroll to details on mobile
        if (detailsRef.current && window.innerWidth < 1024) {
            setTimeout(() => {
                detailsRef.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 50);
        }
    };

    const handleNext = () => {
        if (currentIndex < companyKeys.length - 1) {
            handleExpChange(companyKeys[currentIndex + 1]);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            handleExpChange(companyKeys[currentIndex - 1]);
        }
    };

    return (
        <section id="experience" className="max-w-[70vw] mx-auto py-16">
            {/* Header */}
            <div className="jost mb-4 text-left lg:text-center">
                <h2 className="text-2xl lg:text-5xl font-bold mb-3 text-left lg:text-center">My Experience</h2>
                <p className="text-base lg:text-xl text-gray-400 text-left lg:text-center">What I&apos;ve been working on</p>
            </div>

            {/* Experience Layout */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Sidebar - Company List */}
                <div className="jost text-sm lg:text-xl lg:w-64 flex flex-col gap-0.5 lg:gap-3">
                    {Object.keys(experiences).map((company) => (
                        <button
                            key={company}
                            onClick={() => handleExpChange(company)}
                            className={`text-left px-6 py-4 transition-all duration-300 font-medium border-b ${
                                selectedExp === company
                                    ? "border-white text-white"
                                    : "border-transparent text-gray-400 hover:text-white"
                            }`}
                        >
                            {company}
                        </button>
                    ))}
                </div>

                {/* Right Side - Experience Details */}
                <div ref={detailsRef} className="flex-1 p-8">
                    <h3 className="jost text-base lg:text-2xl font-bold mb-1">
                        {experiences[selectedExp].title}{" "}
                        <span className="jost text-purple-400">@ {experiences[selectedExp].company}</span>
                    </h3>
                    <p className="nova-oval-regular text-sm lg:text-base text-gray-500 mb-2">
                        {experiences[selectedExp].type}
                    </p>
                    <p className="nova-oval-regular text-sm lg:text-base text-gray-400 mb-6 uppercase tracking-wide">
                        {experiences[selectedExp].period}
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                        {experiences[selectedExp].details.map((detail, index) => (
                            <li key={index} className="nova-oval-regular text-sm lg:text-base text-white leading-relaxed">
                                {detail}
                            </li>
                        ))}
                    </ul>

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 lg:gap-4 mt-6 lg:mt-8">
                        {currentIndex > 0 && (
                            <button
                                onClick={handlePrev}
                                className={`jost group px-4 py-2 lg:px-8 lg:py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg lg:rounded-xl backdrop-blur-sm text-white text-sm lg:text-base font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/10 active:scale-[0.98] ${
                                    currentIndex === companyKeys.length - 1 ? 'w-full' : 'flex-1'
                                }`}
                            >
                                <span className="flex items-center justify-center gap-1 lg:gap-2">
                                    <svg className="w-3 h-3 lg:w-4 lg:h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span className="hidden sm:inline">Previous</span>
                                    <span className="sm:hidden">Prev</span>
                                </span>
                            </button>
                        )}
                        {currentIndex < companyKeys.length - 1 && (
                            <button
                                onClick={handleNext}
                                className={`jost group px-4 py-2 lg:px-8 lg:py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg lg:rounded-xl backdrop-blur-sm text-white text-sm lg:text-base font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/10 active:scale-[0.98] ${
                                    currentIndex === 0 ? 'w-full' : 'flex-1'
                                }`}
                            >
                                <span className="flex items-center justify-center gap-1 lg:gap-2">
                                    <span className="hidden sm:inline">Next</span>
                                    <span className="sm:hidden">Next</span>
                                    <svg className="w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}