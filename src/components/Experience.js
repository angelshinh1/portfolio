import { useState } from "react";

export default function Experience() {
    const [selectedExp, setSelectedExp] = useState("RBC");

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

    return (
    <section id="experience" className="max-w-[70vw] mx-auto py-16">
            {/* Header */}
            <div className="medievalsharp-regular mb-4 text-left lg:text-center">
                <h2 className="text-2xl lg:text-5xl font-bold mb-3 text-left lg:text-center">My Experience</h2>
                <p className="text-base lg:text-xl text-gray-400 text-left lg:text-center">What I&apos;ve been working on</p>
            </div>

            {/* Experience Layout */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Sidebar - Company List */}
                <div className="medievalsharp-regular text-sm lg:text-xl lg:w-64 flex flex-col gap-0.5 lg:gap-3">
                    {Object.keys(experiences).map((company) => (
                        <button
                            key={company}
                            onClick={() => setSelectedExp(company)}
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
                <div className="flex-1 p-8">
                    <h3 className="medievalsharp-regular text-base lg:text-2xl font-bold mb-1">
                        {experiences[selectedExp].title}{" "}
                        <span className="medievalsharp-regular text-purple-400">@ {experiences[selectedExp].company}</span>
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
                </div>
            </div>
        </section>
    );
}