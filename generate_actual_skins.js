const fs = require('fs');

const rarityColors = {
  "#b0c3d9": "uncommon",
  "#8847ff": "rare",
  "#eb4b4b": "legendary",
  "#d32ce6": "mythical",
  "#5e98d9": "common",
  "#4b69ff": "uncommon",
  "#e4ae39": "ancient",
};

const wearShortNames = {
  "Factory New": "FN",
  "Minimal Wear": "MW",
  "Field-Tested": "FT",
  "Well-Worn": "WW",
  "Battle-Scarred": "BS"
};

function getRandomPrice(rarity) {
    let min = 1, max = 5;
    if (rarity === "common") { min = 0.5; max = 5; }
    if (rarity === "uncommon") { min = 2; max = 15; }
    if (rarity === "rare") { min = 10; max = 80; }
    if (rarity === "mythical") { min = 50; max = 300; }
    if (rarity === "legendary") { min = 200; max = 1500; }
    if (rarity === "ancient") { min = 800; max = 5000; }
    return (Math.random() * (max - min) + min).toFixed(2);
}

async function main() {
  try {
    console.log("Fetching skins...");
    const res = await fetch('https://raw.githubusercontent.com/bymykel/CSGO-API/main/public/api/en/skins.json');
    let data = await res.json();
    
    // Shuffle the data
    for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
    }

    // Limit to 500 skins so it doesn't overload the client but gives plenty of variety
    data = data.slice(0, 500);
    
    const DEFAULT_SKINS = data.map((d, i) => {
        let weapon = d.weapon ? d.weapon.name : d.name.split('|')[0].trim();
        let name = d.pattern ? d.pattern.name : (d.name.split('|')[1] ? d.name.split('|')[1].trim() : d.name);
        
        let availableWears = d.wears ? d.wears.map(w => w.name) : ["Factory New"];
        if (availableWears.length === 0) availableWears = ["Factory New"];
        let wear = availableWears[Math.floor(Math.random() * availableWears.length)];
        
        let hex = d.rarity ? d.rarity.color : '#b0c3d9';
        let rarity = rarityColors[hex] || "uncommon";
        
        let price = parseFloat(getRandomPrice(rarity));
        let img = d.image;
        
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
    
    // Also update DEFAULT_INVENTORY so it doesn't reference non-existent skins
    const invStr = `const DEFAULT_INVENTORY: InventoryItem[] = [
  { uid: "inv-1", skinId: "skin-1" },
  { uid: "inv-2", skinId: "skin-2" },
  { uid: "inv-3", skinId: "skin-3" },
  { uid: "inv-4", skinId: "skin-4" },
]`;
    defaultDataContent = defaultDataContent.replace(/const DEFAULT_INVENTORY: InventoryItem\[\] = \[[\s\S]*?\n\]/m, invStr);
    
    fs.writeFileSync('./lib/default-data.ts', defaultDataContent);
    console.log("Updated lib/default-data.ts with 500 real skins from CSGO-API.");

  } catch (e) {
    console.error(e);
  }
}
main();
