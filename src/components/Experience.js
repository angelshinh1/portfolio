import SectionHeader from "./SectionHeader";
import { Paper } from "./scrapbook";
import { RESUME_URL } from "@/lib/resume";
import experiencesData from "@/data/experience";

// Round company mark; falls back to initials if the logo fails
function Logo({ src, fallback }) {
    return (
        <span
            className="relative flex w-11 h-11 md:w-12 md:h-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--bg-surface)] font-mono text-[8px] text-[var(--text-muted)]"
            style={{ border: "3px solid #fff", boxShadow: "0 1px 2px rgba(62,44,30,0.14), 0 3px 8px rgba(62,44,30,0.1)" }}
        >
            <span className="absolute z-0">{fallback}</span>
            <img
                src={src}
                alt=""
                className="relative z-10 w-full h-full object-cover bg-[var(--bg-surface)]"
                onError={(e) => { e.target.style.display = "none"; }}
            />
        </span>
    );
}

// One row per role, each with its own company mark
function RoleRow({ role }) {
    return (
        <li className="flex gap-4 md:gap-6 py-5 md:py-6 border-t border-[rgba(62,44,30,0.12)] first:border-t-0">
            <Logo src={role.logo} fallback={role.fallback} />
            <div className="min-w-0 flex-1 grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-0.5">
                <span className="font-body text-[1rem] font-medium text-[var(--text-primary)] pt-0.5">
                    {role.title}
                    <span className="font-normal text-[var(--text-muted)]"> · {role.company}</span>
                </span>
                <span className="font-type text-[0.74rem] text-[var(--ink-sepia)] sm:text-right sm:pt-1 whitespace-nowrap sm:row-span-2">
                    {role.period}
                </span>
                <span className="font-body text-[0.9rem] leading-relaxed text-[var(--text-muted)]">
                    {role.summary}
                </span>
            </div>
        </li>
    );
}

export default function Experience() {
    const roles = Object.values(experiencesData).flatMap((c) =>
        c.roles.map((r) => ({ ...r, company: c.company, logo: c.logo, fallback: c.fallback }))
    );

    return (
        <section
            id="experience"
            className="relative max-w-[88vw] lg:max-w-[60rem] mx-auto px-1 py-24 lg:py-28"
        >
            <SectionHeader title="Experience" className="mb-12 lg:mb-14" />

            {/* A cream sheet with only a faint torn edge; untilted so the text stays crisp */}
            <Paper variant="cream" seed={11} depth={3} innerClassName="px-5 sm:px-8 md:px-10 py-3 md:py-4">
                <ul>
                    {roles.map((role) => (
                        <RoleRow key={`${role.company}-${role.title}`} role={role} />
                    ))}
                </ul>
            </Paper>

            <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="press mt-6 inline-flex items-center gap-1.5 font-hand text-[1.45rem] leading-none text-[var(--green-deep)] transition-colors duration-200 hover:text-[var(--ink-brown)]"
            >
                the long version lives in my resume &rarr;
            </a>
        </section>
    );
}
