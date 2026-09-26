import gsap from 'gsap';

// One shared tick source instead of a rAF loop per component
gsap.ticker.lagSmoothing(500, 33);

export default gsap.ticker;
