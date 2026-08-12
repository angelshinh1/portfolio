// Hash navigation has to go through Lenis, because Lenis owns the scroll
// position: a native jump (Next's own hash handling, scrollIntoView, setting
// window.scrollY) leaves Lenis's internal target where it was, and the next
// frame it animates the page straight back. So every in-page jump — same page,
// after a route change, or on a cold load with a hash in the URL — is funneled
// through here.

let lenis = null;

export function setLenis(instance) {
  lenis = instance;
}

// How far above the target to land, so the floating navbar doesn't sit on top
// of the section heading. Matches `scroll-padding-top` in globals.css.
const NAV_OFFSET = 80;

// The scroll is pointless — and on mobile, silently swallowed — while something
// is holding the page still: the loading overlay and the open mobile menu both
// pin `body { overflow: hidden }`.
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

/**
 * Scroll to `hash` right now. Returns false if it couldn't (target missing or
 * scrolling is locked), so callers can retry.
 */
// A single click can reach us twice — once from the document click handler,
// once from the router event it triggers. Firing scrollTo again mid-flight
// restarts the easing from the current position, which reads as a stutter, so
// an identical request arriving right behind another is dropped.
let lastRequest = { hash: null, at: 0 };

export function scrollToHash(hash, { immediate = false } = {}) {
  if (typeof window === "undefined" || scrollLocked()) return false;

  const target = findTarget(hash);
  if (!target) return false;

  const now = performance.now();
  if (lastRequest.hash === hash && now - lastRequest.at < 200) return true;
  lastRequest = { hash, at: now };

  if (lenis) {
    lenis.scrollTo(target, { offset: -NAV_OFFSET, immediate });
  } else {
    // Reduced motion, or Lenis not running — plain jump.
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "auto" });
  }
  return true;
}

/**
 * Same, but waits for the target to actually be there and for the page to be
 * unlocked. Needed because a cross-page hash link lands before the destination
 * has mounted, and a mobile menu link fires before the menu has released the
 * scroll lock. Gives up after ~2s rather than looping forever.
 */
export function scrollToHashWhenReady(hash, opts) {
  if (typeof window === "undefined" || !hash || hash === "#") return;

  let frames = 0;
  const tick = () => {
    if (scrollToHash(hash, opts)) return;
    if (frames++ < 120) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
