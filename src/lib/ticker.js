import gsap from 'gsap';

// Single shared tick source for all new physics/animation work (strings, drone,
// cursor, grain, etc.) instead of each component running its own
// requestAnimationFrame loop. See ANIMATION_PLAN.md's "Architecture change
// worth making up front". Components hook in with gsap.ticker.add(fn) /
// gsap.ticker.remove(fn) directly.
gsap.ticker.lagSmoothing(500, 33);

export default gsap.ticker;
