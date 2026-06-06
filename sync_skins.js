const fs = require('fs');

// Read live-feed.tsx to extract SKIN_ITEMS
const liveFeedPath = './components/live-feed.tsx';
const feedContent = fs.readFileSync(liveFeedPath, 'utf8');
const match = feedContent.match(/const SKIN_ITEMS = \[([\s\S]*?)\n\]/m);
if (!match) {
  console.error("SKIN_ITEMS not found");
  process.exit(1);
}

// Safely evaluate the array
const skinItemsStr = "[" + match[1] + "\n]";
// use eval carefully
let SKIN_ITEMS;
eval("SKIN_ITEMS = " + skinItemsStr);

// Read types to see how Skin is defined:
// export interface Skin { id: string, name: string, weapon: string, wear: string, price: number, image: string, rarity: Rarity }

const rarityColors = {
  "#5e98d9": "common", // 94, 152, 217
  "#4b69ff": "uncommon", // 75, 105, 255
  "#8847ff": "rare", // 136, 71, 255
  "#d32ce6": "mythical", // 211, 44, 230
  "#eb4b4b": "legendary", // 235, 75, 75
  "#e4ae39": "ancient", // 228, 174, 57
}

function getRarityFromRgb(rgbStr) {
  const m = rgbStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!m) return "uncommon";
  const hex = "#" + [m[1], m[2], m[3]].map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
  return rarityColors[hex] || "uncommon";
}

const DEFAULT_SKINS = SKIN_ITEMS.map((s, i) => {
  // Price wasn't saved in parse_drops_fix.js output!
  // Oh wait, in parse_drops.js we have prices.
  return {
    id: "skin-" + (i + 1),
    name: s.name,
    weapon: s.weapon,
    wear: "FN", // default since it's not extracted
    price: 0, // Need to get price!
    image: s.img,
    rarity: getRarityFromRgb(s.rarity)
  };
});
console.log(DEFAULT_SKINS.slice(0, 2));
