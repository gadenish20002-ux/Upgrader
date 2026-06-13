/**
 * mapItem.js — преобразование предмета донора в нашу модель Skin.
 *
 * Формат донора (/api/items/shop):
 *   { id:"15934", appId:730, marketName:"AK-47 | Wild Lotus (Factory New)",
 *     price:"1258708.660", image:"https://community.akamai.steamstatic.com/.../360fx360f",
 *     extra:{ n:["AK-47","Wild Lotus","Factory New"], ch:"eb4b4b", st:false, ... } }
 *
 * Наша модель (lib/types.ts → Skin):
 *   { id, name, weapon, wear, price:number, image, rarity }
 */

// Карта цветов рамки донора (extra.ch, hex без #) → наша редкость.
// Цвета — стандартные цвета редкости CS2.
const COLOR_TO_RARITY = {
  b0c3d9: "common", // Consumer
  "5e98d9": "common", // Industrial
  "4b69ff": "uncommon", // Mil-Spec
  "8847ff": "rare", // Restricted
  d32ce6: "legendary", // Classified
  eb4b4b: "ancient", // Covert
  e4ae39: "ancient", // Knife / Gloves / Contraband (золото)
   caab05: "ancient",
  ffd700: "ancient",
};

function rarityFromColor(ch) {
  if (!ch) return "rare";
  const key = String(ch).replace(/^#/, "").toLowerCase();
  return COLOR_TO_RARITY[key] || "rare";
}

/**
 * @param {object} item предмет донора
 * @param {string} localImage локальный путь к картинке (например "/images/skins/15934.png")
 *                            если не передан — оставляем исходный URL донора.
 * @returns {object} Skin
 */
function mapItem(item, localImage) {
  const n = (item.extra && Array.isArray(item.extra.n) && item.extra.n) || [];
  const weapon = n[0] || (item.marketName || "").split("|")[0].trim();
  const baseName = n[1] || (item.marketName || "").replace(/^[^|]*\|/, "").replace(/\(.*\)$/, "").trim();
  const wear = n[2] || (item.marketName.match(/\(([^)]+)\)\s*$/) || [])[1] || "";
  const isStatTrak = !!(item.extra && item.extra.st);

  return {
    id: String(item.id),
    name: (isStatTrak ? "StatTrak™ " : "") + baseName,
    weapon,
    wear,
    price: Math.round(parseFloat(item.price) * 100) / 100,
    image: localImage || item.image,
    rarity: rarityFromColor(item.extra && item.extra.ch),
  };
}

module.exports = { mapItem, rarityFromColor };
