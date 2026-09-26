// Interruptible spring on the shared ticker; damping 1 = no overshoot, response = seconds
import ticker from "./ticker";

export function createSpring({ from = 0, damping = 1, response = 0.35, onChange } = {}) {
  let value = from;
  let velocity = 0;
  let target = from;
  let running = false;

  const stiffness = (2 * Math.PI / response) ** 2;
  const dampingCoef = (4 * Math.PI * damping) / response;

  function frame(deltaMs) {
    // Clamp dt so a backgrounded tab doesn't explode the integration
    const dt = Math.min(deltaMs, 32) / 1000;
    const accel = -stiffness * (value - target) - dampingCoef * velocity;
    velocity += accel * dt;
    value += velocity * dt;

    if (Math.abs(value - target) < 0.05 && Math.abs(velocity) < 0.05) {
      value = target;
      velocity = 0;
      stop();
    }
    onChange?.(value);
  }

  // gsap.ticker hands the callback (time, deltaTime) with deltaTime in ms
  function onTick(_time, deltaMs) {
    frame(deltaMs ?? 16);
  }

  function start() {
    if (running) return;
    running = true;
    ticker.add(onTick);
  }

  function stop() {
    if (!running) return;
    running = false;
    ticker.remove(onTick);
  }

  return {
    // Re-target from the current value, keeping velocity
    set(next, initialVelocity) {
      target = next;
      if (initialVelocity !== undefined) velocity = initialVelocity;
      if (value !== target || velocity !== 0) start();
    },
    // Jump the value without animating — used while a finger is tracking 1:1.
    setCurrent(next) {
      stop();
      value = target = next;
      velocity = 0;
      onChange?.(value);
    },
    get value() { return value; },
    stop,
  };
}

// Where a flick comes to rest (exponential-decay projection)
export function project(velocity, decelerationRate = 0.998) {
  return (velocity / 1000) * decelerationRate / (1 - decelerationRate);
}

// Soft boundary: the further past the edge you drag, the less it follows.
export function rubberband(overshoot, dimension, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

// Rolling pointer history → velocity in px/s at release.
export function createVelocityTracker(sampleWindowMs = 100) {
  const samples = [];
  return {
    add(position, time = performance.now()) {
      samples.push({ position, time });
      while (samples.length > 2 && time - samples[0].time > sampleWindowMs) samples.shift();
    },
    velocity() {
      if (samples.length < 2) return 0;
      const first = samples[0];
      const last = samples[samples.length - 1];
      const dt = last.time - first.time;
      return dt > 0 ? ((last.position - first.position) / dt) * 1000 : 0;
    },
    reset() { samples.length = 0; },
  };
}
