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

// Copy text to the clipboard. `navigator.clipboard` only exists in a secure
// context (HTTPS or localhost); the production site is served over plain HTTP
// on an IP, where it is undefined and the copy silently fails. Fall back to a
// hidden <textarea> + execCommand("copy"), which works on insecure origins.
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // fall through to the legacy path below
    }
  }

  if (typeof document === "undefined") return false
  try {
    const ta = document.createElement("textarea")
    ta.value = text
    ta.setAttribute("readonly", "")
    ta.style.position = "fixed"
    ta.style.top = "-9999px"
    ta.style.left = "-9999px"
    ta.style.opacity = "0"
    document.body.appendChild(ta)
    ta.focus()
    ta.select()
    ta.setSelectionRange(0, text.length)
    const ok = document.execCommand("copy")
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}
