import Link from "next/link";
import React, { useState } from "react";

const navItems = [
  { label: "About me",   href: "/#about",      icon: "ti-user-circle" },
  { label: "Experience", href: "/#experience",  icon: "ti-briefcase"   },
  { label: "Projects",   href: "/#projects",    icon: "ti-layout-grid" },
  // { label: "Blog",       href: "/blog",         icon: "ti-pencil"      }, // Temporarily disabled
  { label: "Resume",     href: "/Angel_Resume_swe.pdf", icon: "ti-file-text" },
  { label: "Fun Stuff",  href: "/#fun-stuff",   icon: "ti-confetti"    },
  { label: "Contact",    href: "/#contact",     icon: "ti-mail"        },
];

const Navbar = () => {
  return (
    <nav
      className="vt323-regular w-max mx-auto left-1/2 -translate-x-1/2 fixed bottom-6 z-30 transition-all duration-500 ease-out h-auto bg-white/70 backdrop-blur-2xl border rounded-full border-black/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.25)]"
    >
      <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2">
        {/* Home Button */}
        <Link
          href="/"
          title="Home"
          className="group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full hover:bg-black/5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shrink-0 hover:scale-110 active:scale-95"
        >
          <i className="ti ti-home text-xl md:text-2xl text-[#1E1E1E]/70 group-hover:text-[#1E1E1E] transition-all duration-300" aria-hidden="true" />
          {/* Tooltip */}
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1E1E1E] text-white text-sm sm:text-base font-medium rounded-lg md:rounded-xl opacity-0 scale-90 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out whitespace-nowrap shadow-xl">
            Home
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1E1E1E] rotate-45" />
          </span>
        </Link>

        {/* Separator */}
        <div className="w-[1px] h-6 md:h-8 bg-black/10 mx-0.5 md:mx-1 rounded-full shrink-0" />

        {/* Navigation */}
        <div className="flex items-center gap-0.5 md:gap-1">
          {navItems.map(({ label, href, icon }) => (
            <Link
              key={label}
              href={href}
              title={label}
              className="group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full hover:bg-black/5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shrink-0 hover:scale-110 active:scale-95"
            >
              <i className={`ti ${icon} text-xl md:text-2xl text-[#1E1E1E]/70 group-hover:text-[#1E1E1E] transition-all duration-300`} aria-hidden="true" />
              {/* Tooltip */}
              <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1E1E1E] text-white text-sm sm:text-base font-medium rounded-lg md:rounded-xl opacity-0 scale-90 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out whitespace-nowrap shadow-xl">
                {label}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1E1E1E] rotate-45" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;