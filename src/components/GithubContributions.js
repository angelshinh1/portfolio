import { useEffect, useState } from "react";

// Live GitHub contribution calendar for the past year. Fetched client-side
// on every visit — no scrape baked into the build, no fixture data.
const USERNAME = "angelshinh1";
const API_URL = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`;

const LEVEL_COLOR = [
    "var(--bg-surface)",  // 0 — no activity
    "var(--green-soft)",
    "var(--green-muted)",
    "var(--green-vivid)",
    "var(--green-deep)",  // 4 — heaviest day
];

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SKELETON_WEEKS = 53;

// Groups the flat, date-ascending contribution list into Sunday-start weeks,
// padding the front so the first real day lands on its correct weekday.
function buildWeeks(contributions) {
    if (!contributions?.length) return [];
    const lead = new Date(`${contributions[0].date}T00:00:00`).getDay();
    const padded = Array.from({ length: lead }, () => null).concat(contributions);
    const weeks = [];
    for (let i = 0; i < padded.length; i += 7) {
        weeks.push(padded.slice(i, i + 7));
    }
    return weeks;
}

function monthLabelsFor(weeks) {
    const labels = [];
    let lastMonth = -1;
    weeks.forEach((week, index) => {
        const firstDay = week.find(Boolean);
        if (!firstDay) return;
        const month = new Date(`${firstDay.date}T00:00:00`).getMonth();
        if (month !== lastMonth) {
            labels.push({ index, label: MONTH_NAMES[month] });
            lastMonth = month;
        }
    });
    return labels;
}

export default function GithubContributions() {
    const [data, setData] = useState(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        let cancelled = false;
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) throw new Error("github-contributions request failed");
                return res.json();
            })
            .then((json) => {
                if (!cancelled) setData(json);
            })
            .catch(() => {
                if (!cancelled) setFailed(true);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    if (failed) return null;

    const weeks = data ? buildWeeks(data.contributions) : Array.from({ length: SKELETON_WEEKS }, () => Array(7).fill(null));
    const monthLabels = data ? monthLabelsFor(weeks) : [];
    const total = data?.total?.lastYear;

    return (
        <div>
            <div className="flex items-baseline justify-between gap-4 mb-4">
                <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-[0.15em]">
                    Contributions
                </p>
                <p className="font-mono text-[0.7rem] text-[var(--text-muted)] tracking-tight min-h-[1em]">
                    {total != null ? `${total} in the past year` : ""}
                </p>
            </div>

            <div className="overflow-x-auto pb-1">
                <div className={`inline-block min-w-full ${data ? "" : "animate-pulse"}`}>
                    <div className="relative h-4 mb-1" style={{ width: weeks.length * 13 }}>
                        {monthLabels.map(({ index, label }) => (
                            <span
                                key={`${label}-${index}`}
                                className="absolute font-mono text-[0.62rem] text-[var(--text-muted)]"
                                style={{ left: index * 13 }}
                            >
                                {label}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-[3px]">
                        {weeks.map((week, wi) => (
                            <div key={wi} className="flex flex-col gap-[3px]">
                                {week.map((day, di) => (
                                    <div
                                        key={di}
                                        className={
                                            day
                                                ? "w-[10px] h-[10px] rounded-[2px] transition-transform duration-150 ease-[var(--spring)] hover:scale-125 hover:shadow-[var(--lift-1)]"
                                                : "w-[10px] h-[10px] rounded-[2px]"
                                        }
                                        style={{
                                            background: day ? LEVEL_COLOR[day.level] : "transparent",
                                            border: day ? "1px solid var(--line)" : "none",
                                        }}
                                        title={day ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}` : undefined}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
