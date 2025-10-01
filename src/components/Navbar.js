import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = {
        "About me": "/#about",
        Experience: "/#experience",
        Projects: "/#projects",
        "Fun Stuff": "/#fun-stuff",
        Contact: "/#contact",
    };

    return (
        <nav
            className={`bitcount-single-ink-navbar w-full lg:px-4 2xl:px-8 pt-4 fixed top-0 z-30 xl:rounded-3xl transition-all duration-300 ease-in-out ${
                isMenuOpen 
                    ? "h-screen bg-black/90 backdrop-blur-md xl:h-min" 
                    : "h-auto bg-black/80 backdrop-blur-sm xl:h-min"
            }`}
        >
            <div className="flex items-center justify-between px-4 xl:px-8 pb-2 mx-4">
                <Link
                    href="/"
                    className="glass-border-effect flex items-center gap-3 p-2 px-4 rounded-lg cursor-pointer transition-all duration-300 ease-out"
                    onClick={() => setIsMenuOpen(false)}
                >
                    {/* Name for mobile */}
                    <div className="block xl:hidden text-center leading-none">
                        <h3 className="text-2xl font-bold">Angel Shinh</h3>
                    </div>
                    {/* Name for desktop */}
                    <div className="hidden xl:block text-center leading-none">
                        <h3 className="text-3xl font-bold">Angel Shinh</h3>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden xl:flex items-center gap-6">
                    {Object.entries(navItems).map(([item, url]) => (
                        <Link
                            key={item}
                            href={url}
                            className="glass-border-effect text-lg 2xl:text-xl font-medium px-2 2xl:px-4 py-2 rounded-xl transition-all duration-300 ease-out"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Mobile Burger Menu Button */}
                <button
                    className="xl:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <div
                        className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                            isMenuOpen ? "rotate-45 translate-y-2" : ""
                        }`}
                    />
                    <div
                        className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                            isMenuOpen ? "opacity-0" : ""
                        }`}
                    />
                    <div
                        className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                            isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                        }`}
                    />
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="xl:hidden mt-12 px-8 pb-4 space-y-3">
                    {Object.entries(navItems).map(([item, url]) => (
                        <Link
                            key={item}
                            href={url}
                            className="glass-border-effect block w-full text-left text-lg font-medium px-4 py-3 rounded-xl transition-all duration-300 ease-out"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;