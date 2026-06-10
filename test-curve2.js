const ROULETTE_SLOWDOWN_START = 3600 / 9500;
const rouletteSpinCurve = (() => {
  const points = 480
  const curve = [0]
  let total = 0

  for (let index = 1; index <= points; index += 1) {
    const t = (index - 0.5) / points
    const smoothStep = (value) => value * value * (3 - 2 * value)
    const smootherStep = (value) => value * value * value * (value * (value * 6 - 15) + 10)
    const startRamp = smoothStep(Math.min(1, t / 0.05))
    const slowdownT = Math.min(1, Math.max(0, (t - ROULETTE_SLOWDOWN_START) / (1 - ROULETTE_SLOWDOWN_START)))
    const brake = (1 - smootherStep(slowdownT)) ** 2.6
    const peak = Math.sin(Math.PI * Math.min(1, t / ROULETTE_SLOWDOWN_START)) ** 1.2
    const fastVelocity = 3.0 + 3.0 * startRamp + 6.7 * peak
    const slowVelocity = fastVelocity * brake
    const velocity = t < ROULETTE_SLOWDOWN_START ? fastVelocity : slowVelocity
    total += velocity
    curve[index] = total
  }

  return curve.map((value) => value / total)
})()

console.log(rouletteSpinCurve.slice(0, 5));
console.log(rouletteSpinCurve.slice(-5));
