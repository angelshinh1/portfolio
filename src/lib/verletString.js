// Point-mass / Verlet string simulation

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

  // amplitude: signed displacement at atRatio (0 = start, 1 = end)
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

  // Samples the points into a smooth SVG path matching GuitarStrings.js
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
