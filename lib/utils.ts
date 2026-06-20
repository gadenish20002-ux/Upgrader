import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatWeaponName(weapon: string) {
  const upperWeapons = ["AWP", "AUG", "USP-S", "M4A1-S", "M4A4", "AK-47", "SG 553", "CZ75-AUTO", "XM1014", "SSG 08", "G3SG1", "SCAR-20", "MAG-7", "MAC-10", "MP7", "MP9", "MP5-SD", "UMP-45", "P90", "PP-BIZON", "TEC-9"];
  
  let prefix = "";
  let baseWeapon = weapon;

  if (baseWeapon.toUpperCase().includes("STATTRAK™")) {
    prefix = "StatTrak™ ";
    baseWeapon = baseWeapon.replace(/STATTRAK™\s*/i, "");
  } else if (baseWeapon.toUpperCase().includes("SOUVENIR")) {
    prefix = "Souvenir ";
    baseWeapon = baseWeapon.replace(/SOUVENIR\s*/i, "");
  }

  const isUpper = upperWeapons.includes(baseWeapon.toUpperCase());
  if (isUpper) {
    baseWeapon = baseWeapon.toUpperCase();
  } else {
    // Title Case: capitalize first letter of each word
    baseWeapon = baseWeapon.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }

  return prefix + baseWeapon;
}

export function formatSkinName(name: string) {
  if (!name) return name;
  return name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

export function isSticker(weapon: string) {
  if (!weapon) return false;
  const w = weapon.toLowerCase();
  return w === "sticker" || w === "наклейка" || w === "patch" || w === "нашивка" || w === "pin" || w === "значок";
}
