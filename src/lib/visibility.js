// Runs anime.js loops only while `el` is on screen and the tab is visible
export function playWhileVisible(el, { margin = "0px" } = {}) {
  const loops = [];
  let onScreen = false;

  const sync = () => {
    const run = onScreen && !document.hidden;
    loops.forEach((a) => (run ? a.resume() : a.pause()));
  };

  const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync(); }, { rootMargin: margin });
  io.observe(el);
  document.addEventListener("visibilitychange", sync);

  return {
    add(...anims) { loops.push(...anims); sync(); },
    stop() {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    },
  };
}
