// Point-mass / Verlet string simulation. Framework-agnostic — no DOM, no React.
// Drive `.step()` from the shared gsap.ticker (see lib/ticker.js). Consumed by
// components/GuitarStringsPhysics.js, which samples `.points` into an SVG path.
//
// Coordinate model: points run along a local x axis from 0..length (string
// rest line). `y` is perpendicular displacement from rest — renderers map
// that onto real SVG x/y depending on orientation.

export class VerletString {
  constructor({ length, segments = 14, damping = 0.985, stiffness = 0.15, relaxIterations = 3 }) {
    this.length = length;
    this.segments = segments;
    this.damping = damping;
    this.stiffness = stiffness;
    this.relaxIterations = relaxIterations;
    this.points = Array.from({ length: segments }, (_, i) => ({
      x: (i / (segments - 1)) * length,
      y: 0,
      oldY: 0,
      pinned: i === 0 || i === segments - 1,
    }));
  }

  setLength(length) {
    this.length = length;
    this.points.forEach((p, i) => {
      p.x = (i / (this.segments - 1)) * length;
    });
  }

  // amplitude: signed displacement to add at atRatio (0 = start, 1 = end) along the string.
  // velocity: optional, how hard to pluck (e.g. from cursor speed) — scales a nearby spread
  // so the pluck looks like a real disturbance instead of a single-point spike.
  pluck(amplitude, atRatio = 0.5, spread = 2) {
    const center = Math.round(atRatio * (this.segments - 1));
    for (let offset = -spread; offset <= spread; offset++) {
      const i = center + offset;
      if (i <= 0 || i >= this.segments - 1) continue;
      const falloff = 1 - Math.abs(offset) / (spread + 1);
      this.points[i].y += amplitude * falloff;
    }
  }

  isSettled(threshold = 0.05) {
    return this.points.every(p => p.pinned || Math.abs(p.y - p.oldY) < threshold);
  }

  reset() {
    this.points.forEach(p => { p.y = 0; p.oldY = 0; });
  }

  step() {
    for (const p of this.points) {
      if (p.pinned) continue;
      const vy = (p.y - p.oldY) * this.damping;
      p.oldY = p.y;
      p.y += vy;
    }
    for (let iter = 0; iter < this.relaxIterations; iter++) {
      for (let i = 1; i < this.segments - 1; i++) {
        const p = this.points[i];
        if (p.pinned) continue;
        const avg = (this.points[i - 1].y + this.points[i + 1].y) / 2;
        p.y += (avg - p.y) * this.stiffness; // relaxation, keeps it string-like not jello-like
      }
    }
  }

  // Samples the current points into a smooth cubic-bezier SVG path (Catmull-Rom
  // -> Bezier conversion), mapped into real SVG space: `position` is the string's
  // rest-line coordinate (the y in DESIGN.md's horizontal format, x in vertical),
  // and `vertical` picks which axis the displacement perturbs — matching
  // GuitarStrings.js's `M 0,{y} C ...` (horizontal) / `M {x},0 C ...` (vertical)
  // path structure so this drops into the same rendering path.
  toPath({ position = 0, vertical = false } = {}) {
    const pts = this.points;
    const n = pts.length;
    if (n < 2) return '';
    const toReal = p => (vertical
      ? { x: position + p.y, y: p.x }
      : { x: p.x, y: position + p.y });

    const r0 = toReal(pts[0]);
    let d = `M ${round(r0.x)},${round(r0.y)}`;
    for (let i = 0; i < n - 1; i++) {
      const p0 = toReal(pts[i - 1] || pts[i]);
      const p1 = toReal(pts[i]);
      const p2 = toReal(pts[i + 1]);
      const p3 = toReal(pts[i + 2] || pts[i + 1]);
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${round(c1x)},${round(c1y)} ${round(c2x)},${round(c2y)} ${round(p2.x)},${round(p2.y)}`;
    }
    return d;
  }
}

function round(n) {
  return Math.round(n * 100) / 100;
}
