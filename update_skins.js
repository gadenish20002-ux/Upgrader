const fs = require('fs');
const content = fs.readFileSync('parse_drops.js', 'utf8');
const lines = content.split('\n');
const dataLine = lines.find(l => l.startsWith('const data = '));
const jsonStr = dataLine.substring('const data = '.length);
const data = JSON.parse(jsonStr);

const rarityColors = {
  "b0c3d9": "uncommon",
  "8847ff": "rare",
  "eb4b4b": "legendary",
  "d32ce6": "mythical",
  "5e98d9": "common",
  "4b69ff": "uncommon",
  "e4ae39": "ancient",
}

const DEFAULT_SKINS = data.liveDrops.map((d, i) => {
    let weapon = d.item.extra?.n?.[0] || '';
    let name = d.item.extra?.n?.[1] || d.item.marketName;
    let wear = d.item.extra?.n?.[2] || "FN"; 
    
    let price = parseFloat(d.item.price);
    
    let hex = d.item.extra?.ch || 'ffffff';
    let rarity = rarityColors[hex] || "uncommon";

    let img = d.item.image ? `https://s3.upgrader.pro/cdn${d.item.image}` : d.item.imageNew;
    
    return {
      id: "skin-" + (i + 1),
      name: name,
      weapon: weapon,
      wear: wear,
      price: price,
      image: img,
      rarity: rarity
    };
});

let defaultDataContent = fs.readFileSync('./lib/default-data.ts', 'utf8');
const skinsStr = "export const DEFAULT_SKINS: Skin[] = [\n" + DEFAULT_SKINS.map(s => {
    return `  { id: "${s.id}", name: ${JSON.stringify(s.name)}, weapon: ${JSON.stringify(s.weapon)}, wear: ${JSON.stringify(s.wear)}, price: ${s.price}, image: ${JSON.stringify(s.image)}, rarity: "${s.rarity}" },`;
}).join("\n") + "\n]";

defaultDataContent = defaultDataContent.replace(/export const DEFAULT_SKINS: Skin\[\] = \[[\s\S]*?\n\]/m, skinsStr);
fs.writeFileSync('./lib/default-data.ts', defaultDataContent);
console.log("Updated lib/default-data.ts with actual skins from drops");
