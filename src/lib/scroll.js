// Hash navigation: native smooth scroll, offset below the navbar

// Land below the floating navbar
const NAV_OFFSET = 80;

// Wait while the loading overlay or mobile menu has the page locked
function scrollLocked() {
  return document.body.style.overflow === "hidden";
}

function findTarget(hash) {
  if (!hash || hash === "#") return null;
  try {
    return document.querySelector(hash);
  } catch {
    return null; // not a valid selector (e.g. "#2-things")
  }
}

/* Scroll to `hash` now */
// A click can arrive twice (click handler + router event); ignore the repeat
let lastRequest = { hash: null, at: 0 };

export function scrollToHash(hash, { immediate = false } = {}) {
  if (typeof window === "undefined" || scrollLocked()) return false;

  const target = findTarget(hash);
  if (!target) return false;

  const now = performance.now();
  if (lastRequest.hash === hash && now - lastRequest.at < 200) return true;
  lastRequest = { hash, at: now };

  // Reduced motion and deep links jump instead of gliding
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: immediate || reduced ? "auto" : "smooth" });
  return true;
}

/* Scroll to `hash` once the target exists and the page is unlocked */
export function scrollToHashWhenReady(hash, opts) {
  if (typeof window === "undefined" || !hash || hash === "#") return;

  let frames = 0;
  const tick = () => {
    if (scrollToHash(hash, opts)) return;
    if (frames++ < 120) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
