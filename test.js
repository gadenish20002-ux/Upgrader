const fs = require('fs');
const lottie = JSON.parse(fs.readFileSync('public/assets/lottie/arrow-anim-hover.json', 'utf8'));
const colors = [];
function findColors(obj) {
  if (!obj) return;
  if (Array.isArray(obj)) { obj.forEach(findColors); return; }
  if (typeof obj === 'object') {
    if (obj.ty === 'fl') { // fill
      colors.push(obj.c);
    }
    Object.values(obj).forEach(findColors);
  }
}
findColors(lottie);
console.log(colors);
