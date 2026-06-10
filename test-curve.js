const ROULETTE_SLOWDOWN_START = 3600 / 9500;
const rouletteSpinCurve = (() => {
  const points = 480
  const curve = [0]
  let total = 0

  for (let index = 1; index <= points; index += 1) {
    const t = (index - 0.5) / points
    const smoothStep = (value) => value * value * (3 - 2 * value)
    const smootherStep = (value) => value * value * value * (value * (value * 6 - 15) + 10)
    const startRamp = smoothStep(Math.min(1, t / 0.14))
    const slowdownT = Math.min(1, Math.max(0, (t - ROULETTE_SLOWDOWN_START) / (1 - ROULETTE_SLOWDOWN_START)))
    const brake = (1 - smootherStep(slowdownT)) ** 2.6
    const peak = Math.sin(Math.PI * Math.min(1, t / ROULETTE_SLOWDOWN_START)) ** 1.2
    const fastVelocity = 1.0 + 2.2 * startRamp + 9.5 * peak
    const slowVelocity = fastVelocity * brake
    const velocity = t < ROULETTE_SLOWDOWN_START ? fastVelocity : slowVelocity
    total += velocity
    curve[index] = total
  }

  return curve.map((value) => value / total)
})()

function rouletteSpinProgress(t) {
  const clamped = Math.min(1, Math.max(0, t))
  const scaled = clamped * (rouletteSpinCurve.length - 1)
  const lower = Math.floor(scaled)
  const upper = Math.min(rouletteSpinCurve.length - 1, lower + 1)
  const mix = scaled - lower
  return rouletteSpinCurve[lower] + (rouletteSpinCurve[upper] - rouletteSpinCurve[lower]) * mix
}

for (let elapsed = 0; elapsed <= 3000; elapsed += 100) {
  const progress = rouletteSpinProgress(elapsed / 9500);
  const centerIndex = 10 + 5190 * progress;
  console.log(`t=${elapsed}ms: progress=${progress.toFixed(4)} centerIndex=${centerIndex.toFixed(1)}`);
}
