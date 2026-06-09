import type { Skin, AppState, InventoryItem } from "./types"

export const DEFAULT_SKINS: Skin[] = [
  {
    id: "skin-1",
    name: "Ultraviolet",
    weapon: "StatTrak™ SG 553",
    wear: "Factory New",
    price: 9900,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I4M2-fbZ9LPWsAm6Xyfo44bQ-Tn7gwRt-t2uAw96tIn7FOAF1CsckQLUJ4xXskdO2NLzrtAyIi5UFk3tU_MwgmA",
    rarity: "uncommon"
  },
  {
    id: "skin-2",
    name: "Winterized",
    weapon: "Glock-18",
    wear: "Factory New",
    price: 159.9,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK8-WAm6ExNF1sexmcCW6khUz_W6Azdn6eCrBalcjXJpzE7EO5xa_l4DuNu6ws1Hb2IgUn32si39B5y11o7FVC5qcAFg",
    rarity: "uncommon"
  },
  {
    id: "skin-3",
    name: "Acheron",
    weapon: "AWP",
    wear: "Well-Worn",
    price: 73.09,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk4eetZKFsMs-ABXKczf1JouRtTSWmkCIrujqNjsH4eC-ROFMkDccjR7EDsBCxlN2xZu7jtlaNj4pMxSr8hiIc53tt67kHT-N7rafi4HxI",
    rarity: "uncommon"
  },
  {
    id: "skin-4",
    name: "The Daily Deagle",
    weapon: "Desert Eagle",
    wear: "Factory New",
    price: 82.56,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk5-urV6dsMs-EHGaA_uJ_t-l9AXm3kxh162qHy9-pd3PEagMmDJMkRuEK4BG4x9zhZe-07gPdiotMyivgznQej0ovEM4",
    rarity: "uncommon"
  },
  {
    id: "skin-5",
    name: "Arsenic Spill",
    weapon: "AWP",
    wear: "Minimal Wear",
    price: 38.93,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk-fO8YadsLf-sHW6d0eJzj_hsQyW8giIrujqNjsH8eS2ePANxXJN3Q-NbtxDtkNexMeri5lfd3doTnij7hiJMuy5jtutQT-N7rTqLZycV",
    rarity: "uncommon"
  },
  {
    id: "skin-6",
    name: "Uncharted",
    weapon: "StatTrak™ AK-47",
    wear: "Minimal Wear",
    price: 204.8,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIeqHC2SvzedxuPUnFnCwwBl_5D_Syon8dnyUaQUlD5oiQ7ECuxW7l920ZL-w4AfX2IlByTK-0H0PRM7cOA",
    rarity: "uncommon"
  },
  {
    id: "skin-7",
    name: "Doppler",
    weapon: "★ Bayonet",
    wear: "Minimal Wear",
    price: 38890.07,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6ZhIfOYHmKR0-JJveB7TSW2nAcitwKJk4jxNWWVZ1AmDJIlQuZcu0btx9e0Y-205gOL3dhGzS333CpBvHxi6ucEBfcg5OSJ2MqXuBCE",
    rarity: "ancient"
  },
  {
    id: "skin-8",
    name: "Damascus Steel",
    weapon: "★ StatTrak™ Nomad Knife",
    wear: "Battle-Scarred",
    price: 15221.41,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GCMWORzO9ls_R6cCW6khUz_W6Hyt-vJXifaQFzCJNzR7RZsxLsx4K0N-_m5AbZg9kXn3r93S1NvHx1o7FV4ooHb_M",
    rarity: "ancient"
  },
  {
    id: "skin-9",
    name: "Oxide Blaze",
    weapon: "Glock-18",
    wear: "Minimal Wear",
    price: 27.02,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK6HLMWSf0_x5tORncCW6khUz_T_Xn9f6dnvDb1UkDsdwF7IItES6kYK1M-7k7wSI3YwQm3_63XlAvH51o7FVwJirs7M",
    rarity: "uncommon"
  },
  {
    id: "skin-10",
    name: "Wasteland Rebel",
    weapon: "StatTrak™ AK-47",
    wear: "Field-Tested",
    price: 9373.93,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0Oa8YaZ4NPWsD2zEltF6ueZhW2fgkEh35m3cmIusIn6TbwMpWJJxReMKtBHsw4HhM7nh4gTc3YJCxXr2kGoXudZyw1tq",
    rarity: "legendary"
  },
  {
    id: "skin-11",
    name: "Marina",
    weapon: "StatTrak™ Dual Berettas",
    wear: "Factory New",
    price: 4855.25,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1T9s2jabZkLvGsHXKe0-dltd5lRi67gVN34DuDyoytIH3EPwYnDMYjROde4RC9lIDnZO_i51TejdoRxSWrhn9B8G81tGB0zZHS",
    rarity: "rare"
  },
  {
    id: "skin-12",
    name: "Blue Steel",
    weapon: "★ StatTrak™ Bayonet",
    wear: "Minimal Wear",
    price: 26094.41,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PO_V6ZhNfWXMWuZxuZi_rgwTH21kxt24TvXwo6vdXmfbgdyDpV5RORYuxS5m4KzY7605FPejohbjXKpq_wJOWQ",
    rarity: "ancient"
  },
  {
    id: "skin-13",
    name: "Valence",
    weapon: "StatTrak™ FAMAS",
    wear: "Field-Tested",
    price: 478.1,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a_s2oaalsM8-QAWmEzvtkj-1gSCGn2x4ksWzczo39c3_Ga1R1CpByR-YO4RXqm9fgP76w4lbYi91CzSyq2H5XrnE8rQqckvg",
    rarity: "rare"
  },
  {
    id: "skin-14",
    name: "Water Elemental",
    weapon: "StatTrak™ Glock-18",
    wear: "Well-Worn",
    price: 2353.62,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK72fB3aFxP11te99cCW6khUz_TjVyompc3-QOFR2DJQkFOMJtBbqk9LlY-7n5QLZjtkTxCWqhixPv311o7FVIf8eASQ",
    rarity: "mythical"
  },
  {
    id: "skin-15",
    name: "Angel Eyes",
    weapon: "Dual Berettas",
    wear: "Factory New",
    price: 349.7,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1f-vOiV6FhKeSWMWWZw-J_s-BlcCi9khgrjDGMnYftb32WZlN1W8B5R7UN50brwYDlPrm3s1CPjYoXmCn3hnlJuCpi574EAqA7uvqAcmHsw_M",
    rarity: "rare"
  },
  {
    id: "skin-16",
    name: "Safari Mesh",
    weapon: "★ StatTrak™ Paracord Knife",
    wear: "Minimal Wear",
    price: 14000,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV7d9H_2WHW-v1e94j-1gSCGn20t35z6HzdagcnmQPAMmD5V5Q7Rf5hLtwIK0MO-24wSM2YkXnnr_iiNXrnE8Zdgcdss",
    rarity: "ancient"
  },
  {
    id: "skin-17",
    name: "Case Hardened",
    weapon: "★ Paracord Knife",
    wear: "Minimal Wear",
    price: 10762.84,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6V8H_-aAmKU_uJ_t-l9ASrglh8l5DjWz479d3iTOwYlX5UhFrYMsRnrltWxNrzl5QHYjYJCyX_gznQeOO_KAyk",
    rarity: "ancient"
  },
  {
    id: "skin-18",
    name: "Chocolate Chesterfield",
    weapon: "★ Specialist Gloves",
    wear: "Field-Tested",
    price: 9986.94,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V6NhL-aWMXSAxO1_se1gXD2MhAguvymAnrD7LSrENWl8U8UoAfkNu0Ttx4CxP-zr4wDbjN4XmX79j3xM7SdisbkLBPB0q6LWiwnHM7Zs_9Bdc2KEwswI",
    rarity: "ancient"
  },
  {
    id: "skin-19",
    name: "Bullet Queen",
    weapon: "StatTrak™ Glock-18",
    wear: "Battle-Scarred",
    price: 4100,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK6HLMXCR0-N3ueVsQRa_nBovp3PQydf4dXuSalUgCJZwRrILthi9kYDlMe_m4g2Ij90Um3moiXkc6SZj_a9cBgLxwlYC",
    rarity: "legendary"
  },
  {
    id: "skin-20",
    name: "Weasel",
    weapon: "Glock-18",
    wear: "Field-Tested",
    price: 80,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK6HLMXCVwP1zvN5lRi67gVN_4j7Qzdj8dimQblQkX8YkTeNe5Bmxkd2zNr_j5QbdjthCzX-qjylI8G81tDMJpR5Y",
    rarity: "rare"
  },
  {
    id: "skin-21",
    name: "Elite 1.6",
    weapon: "StatTrak™ Dual Berettas",
    wear: "Minimal Wear",
    price: 43.06,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhH_WfB3OV0tF1vOB6XCCwqhEutDWR1Ir4JS2UbQRxW5J5QLICsxi8ld3mY7jq4AeKj99FzCSsiy1M5y9q6r0cEf1yqEZuIxI",
    rarity: "uncommon"
  },
  {
    id: "skin-22",
    name: "Bad Trip",
    weapon: "FAMAS",
    wear: "Field-Tested",
    price: 3700,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1d7v-ve5tvIfSHHG6A_uJ_t-l9AX6xzExytWndzdj6eCrGb1MkWZB2TOBc4xK8mtHkZezrsQOPjoITyi_gznQezHhrR0c",
    rarity: "legendary"
  },
  {
    id: "skin-23",
    name: "Fully Tuned",
    weapon: "StatTrak™ Glock-18",
    wear: "Field-Tested",
    price: 5815.65,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5tnJOCWC2yvzedxuPUnS3HqzR9152_UyNigeSqWa1BxW8ElRLJfshfpkNHuZO_n4ADd2IxBxDK-0H3ID5Y8zA",
    rarity: "legendary"
  },
  {
    id: "skin-24",
    name: "Needle Point",
    weapon: "★ Broken Fang Gloves",
    wear: "Minimal Wear",
    price: 6878.67,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YtTGKiI71HifOOV5kFJQlQbUL4RHukofjY-227wDaidpHnCqs3H5K6So95ekLVKck__bW3Q_fcepqSI673wM",
    rarity: "ancient"
  },
  {
    id: "skin-25",
    name: "Vogue",
    weapon: "StatTrak™ Glock-18",
    wear: "Field-Tested",
    price: 515.07,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-WF2KTzuBiseJ9cCW6khUz_T-GyNavdCqRawN1CMFwTOcO5hO7loXiY-zmsQKPi44QzHj22ikcvy11o7FVfFOBmfY",
    rarity: "mythical"
  },
  {
    id: "skin-26",
    name: "Rat Rod",
    weapon: "AK-47",
    wear: "Well-Worn",
    price: 358.88,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSLvmRDGuV09F6ueZhW2fklBx362TTnN36dHiRa1AmW5QlQuVftxO9k4HhZuvksVDc398Rzy32kGoXuR34FNLu",
    rarity: "rare"
  },
  {
    id: "skin-27",
    name: "Fade",
    weapon: "★ StatTrak™ Bayonet",
    wear: "Factory New",
    price: 41000,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POvV6JsJPWsAm6Xyfo45-BrHniwzUh24jjVm4qgInnCOA4mDscmEeVcsBXtkN22P-yx5waNg5UFk3tAoG85FQ",
    rarity: "ancient"
  },
  {
    id: "skin-28",
    name: "Ramese's Reach",
    weapon: "Glock-18",
    wear: "Factory New",
    price: 7717.75,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-BD2qKxP1JvOhuRz39kUkk42TcztmuIHOVb1cpCcZ1EeBY5BLtkIDgNOqwtALXjI0Un3r4jDQJsHidobtL7w",
    rarity: "rare"
  },
  {
    id: "skin-29",
    name: "Grassland Leaves",
    weapon: "P2000",
    wear: "Battle-Scarred",
    price: 634.76,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0OG-V6hoIeaWHViX0-9lo-1oQS2MmRQguynLzI77dSqVbwF0D8MkTOYJ5xfpl9zhM-62tleI3o0TxHmviisdvCxttvFCD_RWG0AtOw",
    rarity: "common"
  },
  {
    id: "skin-30",
    name: "Survivor Z",
    weapon: "FAMAS",
    wear: "Factory New",
    price: 1437.07,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1Y-s2oaalsM8-fC2mEwNF6ueZhW2exlE8hsTzcw4n4JC7BOAQpCscmRrRe5xW7w9TgNu7itAHWiYpAziqokGoXuXR1eqm1",
    rarity: "uncommon"
  },
  {
    id: "skin-31",
    name: "Leet Museo",
    weapon: "AK-47",
    wear: "Minimal Wear",
    price: 36407.09,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSIfKAGnWRwvpJvOhuRz39xEly6jmHmdiqeS6UawMmCsBzFrRb4BLtx9DgPr635A3Xj45GySj5jzQJsHjwtGRbjQ",
    rarity: "legendary"
  },
  {
    id: "skin-32",
    name: "Dezastre",
    weapon: "StatTrak™ Dual Berettas",
    wear: "Well-Worn",
    price: 382.92,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhH_WfB3OV0tFytftoXD2hkCIrujqNjsH4c3qeOgR2XpJzFOcD4BK_m4HmN7mx5wGIjthDxHn23yhLv31u6u4HT-N7rWmjRO8T",
    rarity: "rare"
  },
  {
    id: "skin-33",
    name: "Freehand",
    weapon: "★ StatTrak™ Butterfly Knife",
    wear: "Well-Worn",
    price: 53157.9,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2qvzO9ku-RtcDyjqkR3jDGMnYftbyqSZlcgCMd5RLEItBe9koXhZbzi4AyK34tNmXn4i3hO6SxttuoBAKI7uvqA0_B7rlE",
    rarity: "ancient"
  },
  {
    id: "skin-34",
    name: "Woodsman",
    weapon: "StatTrak™ P2000",
    wear: "Field-Tested",
    price: 1562.03,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMW-Fz_pzot5lRi67gVMi5GuBzo6sJXiSOAJxCMR2RuECthTskNG1Yrm3sgCM345CyCj32yJP8G81tLtUlzXH",
    rarity: "rare"
  },
  {
    id: "skin-35",
    name: "Moonrise",
    weapon: "Glock-18",
    wear: "Well-Worn",
    price: 65.58,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a7s2pZKtuK8_CVliF0-x3vt5kQCa9qhsipTiXpYPwJiPTcANzXJNyFOEMthXsktHhMLzl4FaK3toWn3iqhi9BvHw9su5UU6Zw-_bJz1aWcX-Jd_0",
    rarity: "rare"
  },
  {
    id: "skin-36",
    name: "Urban Hazard",
    weapon: "StatTrak™ P2000",
    wear: "Field-Tested",
    price: 40.98,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMXKCw-94j-loVSihkSIrujqNjsGsJXnFPw4gCcZ1TOIPt0LukoG2ZuqxtAXaj4sTzy6q3SpN7C9u6-YCT-N7rcTI-daA",
    rarity: "uncommon"
  },
  {
    id: "skin-37",
    name: "Granite Marbleized",
    weapon: "P2000",
    wear: "Well-Worn",
    price: 14.66,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0Pq3V6N_If6aGmKvzedxuPUnHyvhkUh2tmuBztupdi2fPwclDMN1F-JctUTuwYDgYu3rslPdj9lHnjK-0H1HqokLtA",
    rarity: "common"
  },
  {
    id: "skin-38",
    name: "Neon Rider",
    weapon: "AK-47",
    wear: "Minimal Wear",
    price: 6439,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV6poL_6sHG6UxPxJvOhuRz39xkQhsTnVzoygdy7Ea1UoCZQkRe9bs0brl9TvN-m0tVHYjY5CyS35jjQJsHhk4o5zcA",
    rarity: "legendary"
  },
  {
    id: "skin-39",
    name: "Scorched",
    weapon: "★ Paracord Knife",
    wear: "Field-Tested",
    price: 4206.4,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV7d9H_SSHnecxNF6ueZhW2fqzEl_sT7QwtegdCnEa1QnXsckEbIIt0TpxIWzZr7g5QPag4sXzXr8kGoXuabkrFHY",
    rarity: "ancient"
  },
  {
    id: "skin-40",
    name: "Royal Consorts",
    weapon: "StatTrak™ Dual Berettas",
    wear: "Battle-Scarred",
    price: 137,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhH_KWHGKE1e9lj-ZmQy22myIxtjOMmYrGLSLANkI-C5AjFOcM5EaxxtTmPrnl4Q2Ki91Eyyz32y1Luyk44u4LUqEjr_ff3BaBb-MmOWu8Lw",
    rarity: "rare"
  },
  {
    id: "skin-41",
    name: "Umbral Rabbit",
    weapon: "Glock-18",
    wear: "Factory New",
    price: 198.19,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-eAWie_vx3suNgWxa_nBovp3PXyo76Ii_FPAQmDMYiTLYDthm_kdbmZry2slCLjoMQzC7_3y1J7nts_a9cBi_qumx0",
    rarity: "rare"
  },
  {
    id: "skin-42",
    name: "Urban Masked",
    weapon: "★ Paracord Knife",
    wear: "Battle-Scarred",
    price: 4308.89,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV7d9H-SSHmKv1Px0se9WQyC0nQlptm3Tw9aseHKeagAgDcMjEOIPtBSxwNHmMerlsQLYgoIRxHmv3ygcvzErvbijdLAgow",
    rarity: "ancient"
  },
  {
    id: "skin-43",
    name: "Baroque Purple",
    weapon: "AK-47",
    wear: "Field-Tested",
    price: 459,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0OSrZqF5L8-DG3WAzetJvOhuRz39wEgl6jyBwtqtJS6QbFRzApIkR-YLsRe6wdDvZung4gHbjd4XyH7_iTQJsHhGzMbuTA",
    rarity: "common"
  },
  {
    id: "skin-44",
    name: "Sun in Leo",
    weapon: "AWP",
    wear: "Field-Tested",
    price: 1678.96,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk9f2qYaVucs-fB2CY1aAnteVqHCzgkRsh4TnXyY2vIH-QaVcpA5F3TOdct0S_wNO0Zri05wbXlcsbmn9hB4gb",
    rarity: "common"
  },
  {
    id: "skin-45",
    name: "Catacombs",
    weapon: "Glock-18",
    wear: "Field-Tested",
    price: 61.35,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-XC2aEyfp5vO1WQyC0nQlptWWDzIz8dy6QalMgXsMiQbEJtRjskdW2M7nn71Dcj49Fm3qsiClB7jErvbhnnfwjgw",
    rarity: "uncommon"
  },
  {
    id: "skin-46",
    name: "Turf",
    weapon: "P2000",
    wear: "Battle-Scarred",
    price: 40.24,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PW9V7Q_cKDDQ3SAzvxij-1gSCGn20h14mSByd6vJXmUagQoXpMkQecN40Xsm4DhM-3k4lTY340UxCn53HhXrnE88VIlnLo",
    rarity: "uncommon"
  },
  {
    id: "skin-47",
    name: "Blue Steel",
    weapon: "★ Survival Knife",
    wear: "Factory New",
    price: 14231.94,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsMc-RAnKVxdF6ueZhW2fqxBh1tWXVm4v9c3iTawUnDpsjQeMMshW6ld2xP-_q5w3bjoNCyHn2kGoXucNZoqIn",
    rarity: "ancient"
  },
  {
    id: "skin-48",
    name: "Forest DDPAT",
    weapon: "★ Specialist Gloves",
    wear: "Battle-Scarred",
    price: 11699.11,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJtOV5Tj2Mkg8itjO6mY70LhTLN1F4TowkQrFYshHsxNKyPu_ntQfYid9By3j-ii9I6StqsOlUV6Aj-aCF2guTL_RjtifunYRS",
    rarity: "ancient"
  },
  {
    id: "skin-49",
    name: "Ventilators",
    weapon: "StatTrak™ Dual Berettas",
    wear: "Factory New",
    price: 72.45,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhIvWBC3OEwP1JpuRnWyC_lAkooS66lob-KT-JblNxDcMiQe8M5hDtxtfnNrvrswyLjdgWzCyvhytP7ilqt7pXBfdz-rqX0V-MxKZG7g",
    rarity: "uncommon"
  },
  {
    id: "skin-50",
    name: "Meltdown",
    weapon: "FAMAS",
    wear: "Well-Worn",
    price: 3265.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a4s2gfadhJfGBMXeR1fpzou89cC-ymBw0jDGMnYftb3rDPQMhXppwRudet0O4xNLhMu7r7leMiY9Cmy34i39L7C9ssucBAvA7uvqAFyvbTO4",
    rarity: "mythical"
  },
  {
    id: "skin-51",
    name: "Wicked Sick",
    weapon: "P2000",
    wear: "Minimal Wear",
    price: 487.11,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMWOVwuJ_vuRWQyC0nQlp4jnTyNqodHyXOlQkDZtzF-UN4BjukYeyZuLn5Qbaj4NEzy3_3ywd5zErvbh-3lU8Iw",
    rarity: "mythical"
  },
  {
    id: "skin-52",
    name: "Scorched",
    weapon: "★ StatTrak™ Butterfly Knife",
    wear: "Minimal Wear",
    price: 43912.85,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsHXevxe9moO1scCW6khUz_WTVzdurInyVbVdzXsB5TLZc50XuwdW1Yeu05Fbd3osXzXj_iy9N7H11o7FVf664M8c",
    rarity: "ancient"
  },
  {
    id: "skin-53",
    name: "Halftone Wash",
    weapon: "FAMAS",
    wear: "Battle-Scarred",
    price: 35.89,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1T-829eKhsM_isCGadwP1JvOhuRz39wxt14WuBy9qpJX-TPFdyDJFxRLRc5BK-wIXlNu3htleP3Y5Bynmt3zQJsHgxqrWZvw",
    rarity: "common"
  },
  {
    id: "skin-54",
    name: "Autotronic",
    weapon: "★ StatTrak™ Bayonet",
    wear: "Field-Tested",
    price: 23790.75,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW9V6ZsOf-dC3OvwPtiv_V7QCe6liIrujqNjsGodirBZlckD5B1FLMDtka7m9DuZL7i4ADf39lNxSqqjXgc5ihstrkAT-N7rfe3-Xhk",
    rarity: "ancient"
  },
  {
    id: "skin-55",
    name: "Switch Board",
    weapon: "Dual Berettas",
    wear: "Factory New",
    price: 681.73,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1T9s2gfalvJeKAMWCCxOt4j-1gSCGn20104juHydqtcnLBblAiWMdxQrUKsEG-wd3iPrmx5gGNiNgXznqtiCNXrnE8feK4iuw",
    rarity: "common"
  },
  {
    id: "skin-56",
    name: "Pulse",
    weapon: "StatTrak™ FAMAS",
    wear: "Minimal Wear",
    price: 1198.47,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1Y-s2oaalsM8-DG2uDxNF6ueZhW2flxBlxtm_WntqhJyiSbw90CpJyR-8DtRm6kdHkYuLj4QzY2INCzX-skGoXudLVHKnn",
    rarity: "rare"
  },
  {
    id: "skin-57",
    name: "Decommissioned",
    weapon: "FAMAS",
    wear: "Well-Worn",
    price: 20,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1Y-s2oaalsM8-dG2yV_vpzvvJgQCeMmRQguynLnouqJC-VbwciD5J3QORYshftkIXlPuzrtlCP2NlCySmvin9B7Xo_5_FCD_RaCEWnyQ",
    rarity: "uncommon"
  },
  {
    id: "skin-58",
    name: "CaliCamo",
    weapon: "FAMAS",
    wear: "Factory New",
    price: 540,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1T9s24abZkI_GeAViUxP1zovVWQyC0nQlp4WXRn9qqI3uVblQgApJzELVb5BHqlYC1MePr71TXi91AzCz33S9KujErvbjpBPXbmw",
    rarity: "common"
  },
  {
    id: "skin-59",
    name: "Contractor",
    weapon: "G3SG1",
    wear: "Field-Tested",
    price: 348.33,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1I4M2-ZadSLPmUBnPelOwj47A4GCyywEgl52_TmNyuJH2XOgJzX5UlQeUCsBS9m9bhP-rq4Rue1dx74w5z0g",
    rarity: "common"
  },
  {
    id: "skin-60",
    name: "Yeti Camo",
    weapon: "FAMAS",
    wear: "Minimal Wear",
    price: 58.24,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I4PeRaqh4Jc-VD2qR0tF6ueZhW2fjk01x5jiBytqveXiWOFcnDJMmQeMLskPrmoCzYrzn7wPd3d1Fnyv8kGoXufV393rw",
    rarity: "uncommon"
  },
  {
    id: "skin-61",
    name: "Hedge Maze",
    weapon: "★ Sport Gloves",
    wear: "Factory New",
    price: 2781194.65,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_eBC2Ke_uJ_t-l9AX21whwi4Gndnov9JH_FblMlCJYjRbFZtkWww4HnNbjr7wWN39gUmH7gznQeohQBtY8",
    rarity: "ancient"
  },
  {
    id: "skin-62",
    name: "Orange Crash",
    weapon: "G3SG1",
    wear: "Battle-Scarred",
    price: 52.8,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1I_82pO7dqcc-eB2uZ1ed3v_NoQS62qhEutDWR1Iv_IC2eZgUkA5Z0RbEL5BLqw9flMby2swba34JBnHr22CMd5i1r67ocEf1y0mrzb0E",
    rarity: "uncommon"
  },
  {
    id: "skin-63",
    name: "Damascus Steel",
    weapon: "★ StatTrak™ Survival Knife",
    wear: "Field-Tested",
    price: 6311,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsMc-XD2qR0u1jo95lRi67gVNw6myGnN6teHyTbFV1DMQhTeFYsBa7xtHhZb-z5gfejN4Un3-si3wf8G81tKX6O3VS",
    rarity: "ancient"
  },
  {
    id: "skin-64",
    name: "Marble Fade",
    weapon: "★ StatTrak™ Survival Knife",
    wear: "Factory New",
    price: 13965.56,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsLc-eD3WSzetJtuBtSha_nBovp3OGztqtIH-RbwV1X5Z5QuEPshGwl9TuY-vrsQPd3d0QmSz72nwY5ilo_a9cBrKGUnAZ",
    rarity: "ancient"
  },
  {
    id: "skin-65",
    name: "Boreal Forest",
    weapon: "★ StatTrak™ Paracord Knife",
    wear: "Field-Tested",
    price: 5535.06,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6x0H_acHGKD1dF0v_NsTiWMmRQguynLztutd3qfaFMlDcZwQbYIsUGwlILlYuzi4wGMi4MWyyusjnxJ7nk-5vFCD_TajkSe4A",
    rarity: "ancient"
  },
  {
    id: "skin-66",
    name: "Aqua Terrace",
    weapon: "Galil AR",
    wear: "Field-Tested",
    price: 8678.43,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0POjV6NoL_2WGnWZwtFlpOR5XBa_nBovp3Pdzo6hcH6Ta1RxWZslRuYC4xG9x4bgP-zj4wfY2YoQzyT43XhA7Shq_a9cBkjd5CSZ",
    rarity: "uncommon"
  },
  {
    id: "skin-67",
    name: "Panther",
    weapon: "Dual Berettas",
    wear: "Battle-Scarred",
    price: 248.4,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I4M2-aap5KPWBMWuZxuZi_uA4Si-3kRx-sDzUn4r_cnPGa1AiApJwReRc4RXrwIHjMLu25AGP2otbjXKpeGQaAco",
    rarity: "uncommon"
  },
  {
    id: "skin-68",
    name: "Stained",
    weapon: "★ StatTrak™ Classic Knife",
    wear: "Battle-Scarred",
    price: 9000,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRabVSJv-BDWKU_uJ_t-l9AXziwkV362nUzNj7dS2Sawd1A5p3TLQC5Bfrlt3nP-rh4wWPjYwXmy_gznQeaAH0jRU",
    rarity: "ancient"
  },
  {
    id: "skin-69",
    name: "Eye of Athena",
    weapon: "FAMAS",
    wear: "Field-Tested",
    price: 357.9,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1Y-s2oaalsM8-cGWuvzvx3vuZscCW6khUz_WzUnNb6eXjCbFV2WcAlTO5ct0G-xIfgZe63tADb34wTzX2qjXlO6Xx1o7FV19iwjVc",
    rarity: "mythical"
  },
  {
    id: "skin-70",
    name: "2A2F",
    weapon: "FAMAS",
    wear: "Well-Worn",
    price: 16.84,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M26eqVkLs-QD3Wvx-97sfJWQyC0nQlptWiEnt6odXLCagcgDpB2QO4PsBmxkoHvPu7ktlff399Cmy7_jyMa5jErvbgLXw1DVg",
    rarity: "uncommon"
  },
  {
    id: "skin-71",
    name: "Black Laminate",
    weapon: "★ StatTrak™ Butterfly Knife",
    wear: "Factory New",
    price: 137835.18,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsCXSvw_tipOR7SSWqqh8rsj6OpYP4LCLJP0J1Zc4pEr9OrBC7xtOyN-vjtFDZjYNAnH6qiS9J73s56u4BWPJxqK3U2gDDYLU-t5YdZKHw7iAX8js",
    rarity: "ancient"
  },
  {
    id: "skin-72",
    name: "Corticera",
    weapon: "AWP",
    wear: "Minimal Wear",
    price: 2700,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk6fO4bahsH_GEHlicyOl-pK8xTSzqwU1-5jjWno6hJHyeOg91A5R2TOEOtRS-kIG2ZeO25lDYg90U02yg2USK57Qn",
    rarity: "mythical"
  },
  {
    id: "skin-73",
    name: "NV",
    weapon: "Galil AR",
    wear: "Field-Tested",
    price: 14.08,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V7RiLOmsCXWVxOBJt-BlRiWMmRQguynLnNn4JXyWalMlW5ciE-RftRCwlt3gYbyz41Tb34pBmSr92yod7itq5fFCD_TxM0_hWQ",
    rarity: "common"
  },
  {
    id: "skin-74",
    name: "Cobra Strike",
    weapon: "Dual Berettas",
    wear: "Field-Tested",
    price: 4916.66,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhIvWBC3OEwP1Js-5rXSiMmRQguynLydn9JXmUOwMgCsN1EbMPsRHtxoDuZrzm4VTait4Tzn_-jn4f7ipu4fFCD_Qo-zseRg",
    rarity: "mythical"
  },
  {
    id: "skin-75",
    name: "Balance",
    weapon: "Dual Berettas",
    wear: "Battle-Scarred",
    price: 132.31,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhH_WfB3OV0tFkv_JscCW6khUz_W2Dyon_dimePA8lWJclQrMJthm-kYW2NbzrtQ3eioJCnyWo33wa7Hl1o7FV2r7YJY0",
    rarity: "uncommon"
  },
  {
    id: "skin-76",
    name: "Waters of Nephthys",
    weapon: "FAMAS",
    wear: "Field-Tested",
    price: 4866.76,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1Y-s2oaalsM8-bAWuf_uF1teBncCW6khUz_W3WmYv_JSmSZgZ0WJRwEeRbtUS5kIKyZejmsQHciN5AxHj8intK6il1o7FV74niokA",
    rarity: "mythical"
  },
  {
    id: "skin-77",
    name: "Damascus Steel",
    weapon: "★ StatTrak™ Butterfly Knife",
    wear: "Field-Tested",
    price: 60049.13,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD3avxe97sfJqWjqMzE0YvzSCkpu3J32VZgF1CZN1QLULsUWwkNTjNrnhtALYjo1Cnn762H4f5io9t-gBBL1lpPNt-MvFbw",
    rarity: "ancient"
  },
  {
    id: "skin-78",
    name: "Blue Laminate",
    weapon: "StatTrak™ AK-47",
    wear: "Well-Worn",
    price: 5000,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0POlPPNhIf2sDGuFxNF6ueZhW2fhzE5_5G7dnt_7JXufa1J0DZAkE-cKtBaxl9WzPuyz5lDY3YpAzCn9kGoXuZPu7T4u",
    rarity: "rare"
  },
  {
    id: "skin-79",
    name: "Slaughter",
    weapon: "★ StatTrak™ Bayonet",
    wear: "Minimal Wear",
    price: 36000,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV75oIuKSMWuZxuZi_uU7HyjhwUh-tm_Xydmuc3nGbwN2ApAmQeNfsUXtktOzYuLm5FPajN9bjXKpLQ8HVlE",
    rarity: "ancient"
  },
  {
    id: "skin-80",
    name: "Sandstorm",
    weapon: "StatTrak™ Galil AR",
    wear: "Field-Tested",
    price: 118.09,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V7dsLvSAGmiCzNF6ueZhW2exkx4m6mrcmd6heS-XZgB1ApZ3FLUI5xm6ktezMuzh7gTeiYpFnCr-kGoXuTw2UKiI",
    rarity: "uncommon"
  },
  {
    id: "skin-81",
    name: "Night Stripe",
    weapon: "★ Paracord Knife",
    wear: "Minimal Wear",
    price: 5187.98,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV7d9H_6aCW-E0vpkufFscCW6khUz_WvQm9v4cy-XaAIiXpshQ7QDsBLpktO2Nbnn4gfY2oxGmSmr3SwdvC91o7FVXhfCwdw",
    rarity: "ancient"
  },
  {
    id: "skin-82",
    name: "ZX Spectron",
    weapon: "FAMAS",
    wear: "Minimal Wear",
    price: 1004.77,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1Y-s2oaalsM8-AHmKT1fx5vt5lRi67gVNxsDvTyNyueHOeaVVzCcN1EbVZtRK5k4LkNOnj4wbe2tlMxH_-jyNN8G81tGqq3pxL",
    rarity: "rare"
  },
  {
    id: "skin-83",
    name: "Scumbria",
    weapon: "Five-SeveN",
    wear: "Factory New",
    price: 782.82,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRabVSJvmFC1iDxPhzvt56TDy-lw8usgKJk4jxNWXBP1JzAppxQ-UN5hm_mtLgZbjn5wPdi49Bnyqr3SJPvChq4-tWB6Ak5OSJ2BFWlPNZ",
    rarity: "uncommon"
  },
  {
    id: "skin-84",
    name: "Snack Attack",
    weapon: "Glock-18",
    wear: "Field-Tested",
    price: 1621.06,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-AAGaTyu9ipOBqRBa_nBovp3PQyomrcHKSaQYkCcRwQe8LukHswYHhN-Kz7lOM3YoUni6tjn5K7C5u_a9cBhxPlKk2",
    rarity: "mythical"
  },
  {
    id: "skin-85",
    name: "Oni Taiji",
    weapon: "AWP",
    wear: "Well-Worn",
    price: 24990,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6xsLv6KD1icyOl-pK9vGCqwkx524G_WnNmsInyXOAVyXJJ0TbNb5EOxxIflYbzj4gDdiNlC02yg2XaKgrAq",
    rarity: "legendary"
  },
  {
    id: "skin-86",
    name: "Grinder",
    weapon: "Glock-18",
    wear: "Field-Tested",
    price: 210.18,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a_s2pZKtuK8-QAW6cxOpJvOhuRz39w00lsG-BnNj7cniROgd1WZRzReIDsBewk9G0YeOw5gWPi40Xnnr4hzQJsHiNyVoujA",
    rarity: "rare"
  },
  {
    id: "skin-87",
    name: "Retrobution",
    weapon: "Five-SeveN",
    wear: "Well-Worn",
    price: 85.18,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j_NsWzu8lwgzujKLpYPwJiPTcAByWJB4TOULsxS5wNfmPuzjtQHciYpHmCuqhypJvSlr4LsGBaEmr_bJz1aWW-JyGhc",
    rarity: "rare"
  },
  {
    id: "skin-88",
    name: "Doppler",
    weapon: "★ Paracord Knife",
    wear: "Factory New",
    price: 17368.42,
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0PzadQJD4eO0mIGInOfxMqndqWZQ-sd9j-Db8IjKhF2zowdyNjqhI9SQdw9tYQ3V-la6lb3ngJLv78jJzXcwvnQj7HeLmhyygkkYO_sv26IMYqz0aQ",
    rarity: "ancient"
  },
  {
    id: "skin-89",
    name: "Nuclear Garden",
    weapon: "Glock-18",
    wear: "Minimal Wear",
    price: 1600,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2gfadhJfGBMXSb1OJ6o95uXSy2myIrujqNjsGpd3LCagQiWJVzEOdfu0PrkYe1MLnqtQzW34xDmH2oiiIc7i5p4u5RT-N7rQEHvAcX",
    rarity: "rare"
  },
  {
    id: "skin-90",
    name: "Case Hardened",
    weapon: "★ Butterfly Knife",
    wear: "Battle-Scarred",
    price: 54999.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD3avzud6teVWQyC0nQlp5z6AyN_7I3mfOFQnApUlFrMN5BbpwdbhP-vgs1Pd3dpBmXr9jnwf6DErvbim1G57Bg",
    rarity: "ancient"
  },
  {
    id: "skin-91",
    name: "Gamma Doppler",
    weapon: "★ Bayonet",
    wear: "Minimal Wear",
    price: 46288.44,
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJH4dmklYyPqPr1Ibndk2JL7cFOhuDG_Zi73VG2qUQ_am36LNKWcwM2Ml3X_FS8wL3vhMC0vJXOn3ZkuSAl7HiOmwv3308XDHXucw",
    rarity: "ancient"
  },
  {
    id: "skin-92",
    name: "Conspiracy",
    weapon: "StatTrak™ Desert Eagle",
    wear: "Minimal Wear",
    price: 1628.54,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ_yWMWaF0-tjo95lRi67gVMk4WTSm9moI3-QPVBxDJByQOJe40O6k4fnM-zgsQXci4gUyH3_3CMa8G81tJHuULJI",
    rarity: "mythical"
  },
  {
    id: "skin-93",
    name: "Black Laminate",
    weapon: "AK-47",
    wear: "Minimal Wear",
    price: 6209.61,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0POlPPNhIf2sDHCvzedxuPUnGnzjlh51sTyAzomrICnEbQByWcciTOQIsBG_m9LiZOLh7wfdi91DnzK-0H1Z7oynag",
    rarity: "uncommon"
  },
  {
    id: "skin-94",
    name: "Safety Net",
    weapon: "AK-47",
    wear: "Well-Worn",
    price: 265.98,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0P-re6xSM_GVC3OJzvx3vuZscCW6khUz_W3RyI2tdyjFaAUlW5J5QeNc4BS_xoKzYePi4QSIgoJDynn4jS9Mvyh1o7FVeAmr1N8",
    rarity: "rare"
  },
  {
    id: "skin-95",
    name: "Bunsen Burner",
    weapon: "Glock-18",
    wear: "Factory New",
    price: 634.3,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a_s2pZKtuK6HLMWGcwONzo95rQzy2qhEutDWR1Nb7IC-TOw4hCZF5FOJe40W5lILlZLvktAHXiIJMyST_3XlIv3k94escEf1yWue1sjU",
    rarity: "uncommon"
  },
  {
    id: "skin-96",
    name: "Obsidian",
    weapon: "StatTrak™ P2000",
    wear: "Battle-Scarred",
    price: 340.12,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMWiS0udyueBncCW6khUz_W7QzNf4eHKUPA9xDMAkFrMJ40brldGxM-rk4lfago1MzXmrjCwYvC91o7FVDbVY3kE",
    rarity: "rare"
  },
  {
    id: "skin-97",
    name: "Wildfire",
    weapon: "AWP",
    wear: "Minimal Wear",
    price: 6246.84,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7NkLPSVB3WV_uJ_t-l9AX7rxhl-tmzSwomtdC6TPwQnW5UkR-YD5kK-ltCzP-Ox4FfXiNoQyyrgznQeu9L0PzQ",
    rarity: "legendary"
  },
  {
    id: "skin-98",
    name: "Light Rail",
    weapon: "Desert Eagle",
    wear: "Well-Worn",
    price: 82.19,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6OGRbKFsJ_yWMWKIztF6ueZhW2fhlhlw6m-GnNyvIiiXOwQoDMR2QbZe5hi5k9KxN-vhtFbciN1FnyqskGoXuU4JtHUo",
    rarity: "rare"
  },
  {
    id: "skin-99",
    name: "Tiger Strike",
    weapon: "★ Specialist Gloves",
    wear: "Minimal Wear",
    price: 33177.28,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJpOhuSjuMmg8mvTqApYPwJiPTcAYkDMZ3EOUJ4Ra9w4W2NOyx4wGNjYtDy3763H4bvCY6t-sFUap3_KDJz1aW0GG4fIQ",
    rarity: "ancient"
  },
  {
    id: "skin-100",
    name: "Fire Serpent",
    weapon: "AK-47",
    wear: "Minimal Wear",
    price: 96836.57,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0PSneqF-JeKDC2mE_u995LZWTTuygxIYvzSCkpu3cnvFPQB2DpUkROFY4Rntw93lP7i241DbiI1BxSuviHlKunk_6-sHU71lpPMTRLyP4Q",
    rarity: "legendary"
  },
  {
    id: "skin-101",
    name: "Hideout",
    weapon: "StatTrak™ Dual Berettas",
    wear: "Battle-Scarred",
    price: 6.38,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1f-vOiV6ZoMvWHGmaD_uJzpOloQxa0hxQpjDGMnYftb3-WbQ92WcZ4EeFZs0TtxIfvZr_m7wXW2I0TySv93ywd5yxu5-0FAPE7uvqA-FxXgtE",
    rarity: "uncommon"
  },
  {
    id: "skin-102",
    name: "Fowl Play",
    weapon: "StatTrak™ Five-SeveN",
    wear: "Well-Worn",
    price: 1413.52,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRabVSdaesCGKR1eZzovJWQyC0nQlptm_Vw9ercnOUaA8lA5skFuIPsxPqmtXkNu205lfYiN8XnCyvj3hNvDErvbiIo1idJQ",
    rarity: "mythical"
  },
  {
    id: "skin-103",
    name: "Gamma Doppler",
    weapon: "Glock-18",
    wear: "Well-Worn",
    price: 7619.67,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2paalgIc-XAXeAzetkj_FhTjq2wSIgvzKGkbD1KCzPKhhxC5FyRbII4Ua_ltDhY-Ln41fW2I1Ayn_9ii5P7Xpr5ekHV6Mg__HekUifZpA8glcU",
    rarity: "legendary"
  },
  {
    id: "skin-104",
    name: "Crimson Web",
    weapon: "★ Paracord Knife",
    wear: "Well-Worn",
    price: 8059.51,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6x0H-eWDHSvzedxuPUnGH_gx0pxtT-Dm9uvdXrGbAFzCsZ5Ee9YtkTpx9LgYuPjtA3djotByDK-0H0Jjl4AqA",
    rarity: "ancient"
  },
  {
    id: "skin-105",
    name: "Occult",
    weapon: "★ Sport Gloves",
    wear: "Factory New",
    price: 300666,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk6P6hfqFSM-CcHHOv1-t6puR9cDu2kSIrujqNjsGody2XPQVzWZslEe5euxS_lYC0Yu7l4wLfj99MmCv4jXka6Slp6-4ET-N7rUuG7GIq",
    rarity: "ancient"
  },
  {
    id: "skin-106",
    name: "Omega",
    weapon: "★ Sport Gloves",
    wear: "Well-Worn",
    price: 15999.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_KfD2Sb_vlzsuNgQS6MjBgrvzKSpYPwJiPTcFAkC5UiRrRZ5BO9ktDnM-q37wCMjN5GxCqvhngb6Chj6u0CVvAj-6fJz1aW3nluLgw",
    rarity: "ancient"
  },
  {
    id: "skin-107",
    name: "Vulcan",
    weapon: "AK-47",
    wear: "Well-Worn",
    price: 11799.72,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSMuWRDGKC_uJ_t-l9AXCxxEh14zjTztivci2ePQZ2W8NzTecD4BKwloLiYeqxtAOIj9gUyyngznQeF7I6QE8",
    rarity: "legendary"
  },
  {
    id: "skin-108",
    name: "Rattler",
    weapon: "★ Hydra Gloves",
    wear: "Battle-Scarred",
    price: 2833.42,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOlo_k7yNk6P6hfqF-H_KfAWiUyeFjvuVWRzC3hxwYoDOEkYrqKiLJAVRiW9EzKrtT5Uj8jNOyZb_i5QHcg40Unyz-ji5LvX1v6-kEV_Ek8vCFjguUYOU_tJVWd6y5DUPZHBGjgbE",
    rarity: "ancient"
  },
  {
    id: "skin-109",
    name: "Freehand",
    weapon: "★ Bayonet",
    wear: "Field-Tested",
    price: 13722.25,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6lsMvuWCliF0dF6ueZhW2e1zUh36zuEnteqeSqTOlUnXMYhFOcDuxfpkIblM-zj4gSLi45EniSqkGoXuTHKXCgo",
    rarity: "ancient"
  },
  {
    id: "skin-110",
    name: "Doppler",
    weapon: "★ Survival Knife",
    wear: "Minimal Wear",
    price: 19950,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsLc-RAmaTyv5zsfNlcCSyhx8rtjSfn4vGLSLANkI-CJQjFrQJsxHrktfjMu6z5gbYi49FyS-rh3lJuHxst7oLAvci-PDehxaBb-MyRwuVrw",
    rarity: "ancient"
  },
  {
    id: "skin-111",
    name: "Embargo",
    weapon: "PP-Bizon",
    wear: "Field-Tested",
    price: 134.23,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1Y-s2sYb5iLs-BAWaU_vl3ovNgQDuMmRQguynLnt37I3ifb1VyW8F4Te8D4UTrl4GxZru25FTZjI9GnCr5iC4YvSto4PFCD_TYHp-YNQ",
    rarity: "rare"
  },
  {
    id: "skin-112",
    name: "High Seas",
    weapon: "G3SG1",
    wear: "Battle-Scarred",
    price: 65.5,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1c_M2pO7dqcc-RG2STwOBztfNWQyC0nQlp4j7Syt-rdHPEOAIjCpV5TLQK40K5wdLjY-_r7wfeio1AySiriCIf6DErvbj1Mwus0A",
    rarity: "rare"
  },
  {
    id: "skin-113",
    name: "Imperial Dragon",
    weapon: "StatTrak™ P2000",
    wear: "Battle-Scarred",
    price: 1000.91,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PW9V7Q_cKDDMW6d0etkueBlcC2hlBoovQKJk4jxNWXEbAQmDsQmRbNYsxGwxoC1YrvrsQXXg40QxCX533tJ7Xs-4eYKWKAl5OSJ2JuLIVNl",
    rarity: "mythical"
  },
  {
    id: "skin-114",
    name: "Off World",
    weapon: "Glock-18",
    wear: "Field-Tested",
    price: 19.83,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-aAGOZxuFJvOhuRz39xRly4WSDm4z9dHvCOg8iC5pxQrZethbsk4C1MbnnsQTag4pFyy_9hzQJsHjSW_TM0g",
    rarity: "uncommon"
  },
  {
    id: "skin-115",
    name: "Vice",
    weapon: "★ Sport Gloves",
    wear: "Minimal Wear",
    price: 124500,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_KfG2Kv0ed4u95lRi67gVNx4T-Bw434IHyVb1QlAsd1FOUDthG4xNznMu3m4QXXg90Wzn_33C1I8G81tLaDi_rK",
    rarity: "ancient"
  },
  {
    id: "skin-116",
    name: "Tuxedo",
    weapon: "Galil AR",
    wear: "Field-Tested",
    price: 64.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OGhV6t_I_GsAm6Xyfo45ONqGHC2kE1y42jWz9uscXmfbQQlCsZzFOACuxawl4GxMevj4QPfg5UFk3uvmVba9Q",
    rarity: "uncommon"
  },
  {
    id: "skin-117",
    name: "Sand Dashed",
    weapon: "PP-Bizon",
    wear: "Minimal Wear",
    price: 5.38,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1I_826abRoH-ObAXWE_v13vuVWQyC0nQlp62XcyNygJCrDawR1WZIlQ7QL4xS_wNblPu_h7gOP3oJHynr8iHhK6zErvbioPrlsUA",
    rarity: "common"
  },
  {
    id: "skin-118",
    name: "Galigator",
    weapon: "Galil AR",
    wear: "Factory New",
    price: 500,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PWvZK1hH_eSAm6XwPp5ot5lRi67gVN_42_VydytcX3BbQ8pCsB0ReMCtEG_lYLuNuji4AGPjt8Qynj4jXlI8G81tMQ6bFYi",
    rarity: "rare"
  },
  {
    id: "skin-119",
    name: "O-Ranger",
    weapon: "Galil AR",
    wear: "Factory New",
    price: 20.3,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OGhbZtiMvGdCWKvx-J_s-pWQyC0nQlp4jjRyYuhdy2WOgBzWZFxQrMP4RCwldbhM7jj5VDZi4IWzin7inwd5jErvbhrB4cQjg",
    rarity: "common"
  },
  {
    id: "skin-120",
    name: "Robin's Egg",
    weapon: "Galil AR",
    wear: "Well-Worn",
    price: 3.77,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OGhbZt_L_KaAHSVxulJvOhuRz39kRl04ziAwouhInmTaQMlCcNxReFZ5xTqmtO1PuLntFDX3d8QyST_jjQJsHiwz7gI3Q",
    rarity: "common"
  },
  {
    id: "skin-121",
    name: "Death Rattle",
    weapon: "PP-Bizon",
    wear: "Field-Tested",
    price: 94.87,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1T9s2gbbZiJPmSMWuZxuZi_rNrHCjkw09_5mzUz4uudSrEb1QiWcd0RLMDsEK7kILkMO2071aLj41bjXKpFxy7d4g",
    rarity: "common"
  },
  {
    id: "skin-122",
    name: "Doppler",
    weapon: "★ StatTrak™ Bayonet",
    wear: "Factory New",
    price: 37641.46,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6BiMOCfC3Wv0eZ3o-Q9cCW6khUz_WvQmNaqcHvDPVUpC8B5E7ICtkW-wYK0NO204FbW2t1NxC_72y4d53l1o7FVWhjV62M",
    rarity: "ancient"
  },
  {
    id: "skin-123",
    name: "Safari Mesh",
    weapon: "★ Survival Knife",
    wear: "Battle-Scarred",
    price: 3889,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5t-MM-eC3SY_vp3vt5lRi67gVNztTmBydj4I32fZ1UpDMAiEecMuxXqxN2zN7zi5Abdg4hDxSj5iywf8G81tEchNhm2",
    rarity: "ancient"
  },
  {
    id: "skin-124",
    name: "Rocket Pop",
    weapon: "StatTrak™ Galil AR",
    wear: "Factory New",
    price: 1987.94,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfD3Wv0e9kpOhqQyygqhEutDWR1Nf8eXzDP1InCMR3QucIshjrktexMOqz4QPcjo1Gz3qq2H9L5ylu4ugcEf1yh3Lp9zc",
    rarity: "uncommon"
  },
  {
    id: "skin-125",
    name: "Polymer",
    weapon: "CZ75-Auto",
    wear: "Field-Tested",
    price: 41.67,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s2tcrI_H_2VMWuZxuZi_rcwSnHjwxgh527SzI6oIHKUZ1dxA8ckTbUCskG6ldTuY-nh5FTf34JbjXKpj6qz0B4",
    rarity: "uncommon"
  },
  {
    id: "skin-126",
    name: "Stained",
    weapon: "★ Survival Knife",
    wear: "Battle-Scarred",
    price: 5622.31,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsMc-VAXWTxOpJvOhuRz39kEkjtjmGydmhdi-TbVNyDJNwTbRf4BjpwILhNe7k4wzW2otCyn72jzQJsHhv3Am88A",
    rarity: "ancient"
  },
  {
    id: "skin-127",
    name: "Amber Fade",
    weapon: "Galil AR",
    wear: "Well-Worn",
    price: 2140,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0POvV6JsJPWsA2KEwOJ6ueJWQyC0nQlp52uGm9yodC3GZ1d0CMdyQeJctRDqmtayY-Kz71fW2IIUziz8intK6TErvbiZh4dEMQ",
    rarity: "uncommon"
  },
  {
    id: "skin-128",
    name: "Boreal Forest",
    weapon: "★ StatTrak™ Classic Knife",
    wear: "Minimal Wear",
    price: 16000,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRYL1SJv-BC3SE_ux5ouRoQxa_nBovp3OHytj4IH7FOldyXMAmFuRftxG6xIWxZOux7lOLjoJBzCj92i5N6H5s_a9cBvSJSM6F",
    rarity: "ancient"
  },
  {
    id: "skin-129",
    name: "Ivory",
    weapon: "P2000",
    wear: "Battle-Scarred",
    price: 24.3,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMW6Gzvxvj-1gSCGn20gism3dz96pc3KVOgYoCpR4TOFZsxbsxNzlYejl7lPWiIJBmX6t235XrnE8r5B4jsA",
    rarity: "uncommon"
  },
  {
    id: "skin-130",
    name: "Blue Streak",
    weapon: "StatTrak™ PP-Bizon",
    wear: "Factory New",
    price: 3999,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1T9s29eKhsNOSWHFicyOl-pK8-Hyzjx0t1sWjdy4v_dXyVaFcpC5ElTO4OsxSxkILjYu3k5wKM2dlG02yg2QMXfH6m",
    rarity: "rare"
  },
  {
    id: "skin-131",
    name: "Grey Smoke",
    weapon: "Galil AR",
    wear: "Well-Worn",
    price: 1.95,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OGha6xSIvycHGWvw_lJt-BlRiWyhyIrujqNjsH9dimTZgAmCMMhRuEL5xCxkNa0Pum3sgzX3osWyH362ixL7HlqtehUT-N7rUWzKN8P",
    rarity: "common"
  },
  {
    id: "skin-132",
    name: "Copper Fiber",
    weapon: "CZ75-Auto",
    wear: "Minimal Wear",
    price: 9.73,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s2tabZvL_6sCG6SxPxJs_s-Gha_nBovp3OEzIn8c3qUagUiD5p0FuILtUKxm4e2Mrzms1baiIpCyiiqhi1J6yxo_a9cBnTQQcTV",
    rarity: "common"
  },
  {
    id: "skin-133",
    name: "Doppler",
    weapon: "★ Bayonet",
    wear: "Factory New",
    price: 34289.37,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV7dsMOCbB3WV_uN3ouNlSiCpkBkYvzSCkpu3d3_FaFUnXpRwEO4O50G5xoW1Y7zn5wLe3oxBxHn6jiwf7XposO8LBb1lpPPeBvHrwA",
    rarity: "ancient"
  },
  {
    id: "skin-134",
    name: "Heirloom",
    weapon: "Desert Eagle",
    wear: "Factory New",
    price: 11751.47,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7uORbapqMvGFC2Ovxet3t-1scCW6khUz_W3czNegeXueO1N2WZIkE-RY4EGxlNSxZLnn5gfai4oTniSoiStA6y91o7FVItTkIhw",
    rarity: "rare"
  },
  {
    id: "skin-135",
    name: "Corinthian",
    weapon: "Desert Eagle",
    wear: "Factory New",
    price: 139.15,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7uORbKFsJ_yWMWSf0-d4pOlgTieMmRQguynLzNz4Iy2ebgUmDZB4QeEDskO5ktWzMrjm7wPd2IlGmCr_3XxBuClr4PFCD_To4zX47g",
    rarity: "uncommon"
  },
  {
    id: "skin-136",
    name: "Kami",
    weapon: "StatTrak™ Five-SeveN",
    wear: "Minimal Wear",
    price: 419.12,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRYL1SK_GeB1icyOl-pK9oGnHnk012sT_XzNv4eXuUawUlDpEkQOIN40XskIHmP-mx4wOLio1B02yg2SJzf1Vk",
    rarity: "uncommon"
  },
  {
    id: "skin-137",
    name: "Midnight Storm",
    weapon: "Desert Eagle",
    wear: "Battle-Scarred",
    price: 1498.77,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7v-Re6FsM-ScHGqvzedxuPUnGXC3kR904myGyd79eXmUZwYlDsNyQe4JtkWxx9LgYuPrsVaNg99HzDK-0H3GwZY3mA",
    rarity: "common"
  },
  {
    id: "skin-138",
    name: "Doppler",
    weapon: "★ StatTrak™ Paracord Knife",
    wear: "Minimal Wear",
    price: 33825.27,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6VgH_ScHnecxPxJoOloXCzgqhEutDWR1N38IiqfZwd1CMF5EeEOskaxlNWxNeLq5gCPjIJNyn322ykduH054-ccEf1ylmda9Aw",
    rarity: "ancient"
  },
  {
    id: "skin-139",
    name: "Control",
    weapon: "StatTrak™ Galil AR",
    wear: "Field-Tested",
    price: 52.17,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PWvZK1hH_OcAHOCzuJJo_V7RiK2qhEutDWR1Nmvcn6RPFVxW5txTbRZuxDuxNKzZu2x7wCMiNpExCSshyof7Xlt5-scEf1y6paUA5M",
    rarity: "rare"
  },
  {
    id: "skin-140",
    name: "Sergeant",
    weapon: "StatTrak™ FAMAS",
    wear: "Well-Worn",
    price: 497.03,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a4c2oaalsM8-ACXOvzedxuPUnF3HmkBx_tjnSmNmrJHiROFN1W8NxFrFZsxbrk4e0Yuvr5wWLi4JAyjK-0H3maOk52Q",
    rarity: "rare"
  },
  {
    id: "skin-141",
    name: "Hyper Beast",
    weapon: "Five-SeveN",
    wear: "Field-Tested",
    price: 29051.82,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-lwXyyhlxgmoCm6lob-KT-JO1QgWZVyELEPu0W4l9KzYbzn5Fbf3YkTzn_8hihIvXxtsOoFUKYirLqX0V_f6-eqCw",
    rarity: "legendary"
  },
  {
    id: "skin-142",
    name: "Fever Dream",
    weapon: "AWP",
    wear: "Field-Tested",
    price: 1132.31,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7R-OfObAXeR1eZJvOhuRz39kE1w4jiAzNiod3qTOgcgXpAlQ-ML5hjqxtHjZOrrtlHWit9EyCj9iDQJsHhCZP-wUg",
    rarity: "mythical"
  },
  {
    id: "skin-143",
    name: "Torque",
    weapon: "AUG",
    wear: "Field-Tested",
    price: 522.96,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_jdk7uepV7R_L_eBC3SDyPhJvOhuRz39lxhxsm_WzN37Iy7CbAcmC8B2QuYPtRCwx9HvNr-xtQPaj95EmS__3TQJsHjrLu4xbg",
    rarity: "rare"
  },
  {
    id: "skin-144",
    name: "Nightshade",
    weapon: "Five-SeveN",
    wear: "Minimal Wear",
    price: 414.06,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRYL1SJvycGWKC0tF6ueZhW2frl08m5mrXyd-seSmVOgUkX5MhReRcsRHsm9LjZe_htACI3oJEzHj6kGoXucu6NwSL",
    rarity: "uncommon"
  },
  {
    id: "skin-145",
    name: "Winter Forest",
    weapon: "Galil AR",
    wear: "Minimal Wear",
    price: 7499.31,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V6JiMvWAGliHyOBitfNWQyC0nQlp4m7Wy96geHvCPVQjA5d2ROYDtRC4lIGzYeLrtADejt0TzC6tj3tO7DErvbiqpszlmA",
    rarity: "common"
  },
  {
    id: "skin-146",
    name: "Night",
    weapon: "★ Butterfly Knife",
    wear: "Minimal Wear",
    price: 56849,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsHWivz-dxuPVWQyC0nQlp4T_QnNarcXzBPQN1CZcjFuEC40a4ktzuNeLgslGL2t5GmS733Cwc6jErvbgctlCLOw",
    rarity: "ancient"
  },
  {
    id: "skin-147",
    name: "Dusk Ruins",
    weapon: "Galil AR",
    wear: "Minimal Wear",
    price: 992.16,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V7Z4Kf6AMXWVxdF6ueZhW2fnlBkl427dno2rcXLBagYjDMN0Qu8Ls0a9wIK0PrvhtlHYgogTyy_5kGoXuQFMiuDz",
    rarity: "uncommon"
  },
  {
    id: "skin-148",
    name: "Signal",
    weapon: "Galil AR",
    wear: "Factory New",
    price: 308.2,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V6NsLPmfMXSZxuB3vN57Si2MmRQguynLnIqvIy-TO1UlXJMjEeAN4UGwk9DkZLnltgPYjYkTnCn6iy8buips5PFCD_QZl2QaUg",
    rarity: "rare"
  },
  {
    id: "skin-149",
    name: "Gamma Doppler",
    weapon: "★ Bayonet",
    wear: "Minimal Wear",
    price: 46288.44,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6NsLf2SMWOf0f56tfNWXyGyhhh0jDGMnYftb3ifPQd2ApZ3Redb5xG-mtzkNuPr5ADXg4tGm33_23hLvCZrt-9XV_Y7uvqA1Mz9WrE",
    rarity: "ancient"
  },
  {
    id: "skin-150",
    name: "Clear Polymer",
    weapon: "Glock-18",
    wear: "Minimal Wear",
    price: 42.17,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK8-DAWuJzOtkj-1gSCGn200h4TnQwtqoci_CPQYlDsAiRuZc5hK7kd2zZbm37lGK2o5HnH2v2ixXrnE85Jt4rDY",
    rarity: "uncommon"
  },
  {
    id: "skin-151",
    name: "Teal Graf",
    weapon: "Glock-18",
    wear: "Minimal Wear",
    price: 25.53,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1T9s2hfqF_MPGAHViEwOlxteVWWyyymSIrujqNjsGueXyfaVN0X5N5Ru4O5he_k9XkM-7ltlPe2YJExX2tiXlN5yo6474LT-N7rZcNkc7T",
    rarity: "uncommon"
  },
  {
    id: "skin-152",
    name: "Doppler",
    weapon: "★ StatTrak™ Paracord Knife",
    wear: "Factory New",
    price: 21904.76,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6VgH_ScHnecxPxJoOloXCziqhEutDWR1Nv6JHuXbQUpCpIkQe8KsBjsxNLgYevltlTe3olHyHiv3StK73pqtugcEf1yeFJGil8",
    rarity: "ancient"
  },
  {
    id: "skin-153",
    name: "Nouveau Rouge",
    weapon: "AK-47",
    wear: "Field-Tested",
    price: 970,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC6s2vY_A6H_6cG3GVwPtJvOhuRz39zBsm5j-HyNqpd32fPVd1AsB3RbEP4xntwdPuM-jl4QaK2NpCzX_23DQJsHjpyGbntg",
    rarity: "mythical"
  },
  {
    id: "skin-154",
    name: "Safari Mesh",
    weapon: "★ StatTrak™ Butterfly Knife",
    wear: "Minimal Wear",
    price: 42640.7,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsHXevzOtluN59TieMmRQguynLmY2rdyqUOFNyC5N0QeQNuhC6kYe2M7nl7gTait1Hy3n52ipMvytj4_FCD_SLIWJ_mw",
    rarity: "ancient"
  },
  {
    id: "skin-155",
    name: "Ironwork",
    weapon: "Glock-18",
    wear: "Minimal Wear",
    price: 444.95,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a_s2pZKtuK8-XD3WbjOh3vO1WQyC0nQlp5jmEmNaodH6VbwMnApshEOcPskOww4e0N-qz5lPZ2YlGyCSviika6zErvbhhWFzqpw",
    rarity: "uncommon"
  },
  {
    id: "skin-156",
    name: "Doppler",
    weapon: "★ Bayonet",
    wear: "Minimal Wear",
    price: 38890.07,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6BiMOCfC3Wv0eZ3o-Q4cCW6khUz_TvWmIygcnnGaVIlC5N5QOINt0S8lYDkMOu2sgTWgoxExCmqi3hN7i11o7FV2n5aQD4",
    rarity: "ancient"
  },
  {
    id: "skin-157",
    name: "Akoben",
    weapon: "StatTrak™ Galil AR",
    wear: "Battle-Scarred",
    price: 26.01,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OG-V6NsLPmfMWabzuxzvt5lRi67gVMlt2_dzd6qcH2TOgN0CpIlE7Ve5hbukdW0MrixslPW2IgQzyv8jypI8G81tJzCUipD",
    rarity: "uncommon"
  },
  {
    id: "skin-158",
    name: "Firebreathing",
    weapon: "Desert Eagle",
    wear: "Minimal Wear",
    price: 188.69,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6_evb6hoH_aaHGKS0-t3pOlgQS6MmRQguynLn9ircSiTPFUgCJAkQbELsxXtktDkMurk4lTZ39hEyn_-3HsbvXxj4fFCD_RcNNN-xQ",
    rarity: "rare"
  },
  {
    id: "skin-159",
    name: "Fire Elemental",
    weapon: "StatTrak™ P2000",
    wear: "Well-Worn",
    price: 9495,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMWGZ0-tJte1sQiy9gRwrjDGMnYftb3-RZldxWJVyF-QLsUG5mofnML_qtg3cjd4TyCr4jXsf63lr4-5TVvA7uvqA-y0nTh8",
    rarity: "legendary"
  },
  {
    id: "skin-160",
    name: "Tiger Tooth",
    weapon: "★ StatTrak™ Survival Knife",
    wear: "Minimal Wear",
    price: 14996.06,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsLs-HB2CV09F5ouBnSCyMmRQguynLy42tdSnBOFcgC8EjF-ECtBi6x9fuY-3n4w2P2YsWyiX42iMd7Clp4vFCD_R6ZwboAg",
    rarity: "ancient"
  },
  {
    id: "skin-161",
    name: "Blue Steel",
    weapon: "★ Classic Knife",
    wear: "Minimal Wear",
    price: 9999.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRabVSIvyGC2OvzedxuPUnGiuyw0x34jyDz9-tcX-XblVxCsElEeQLtxa_ltLnN-LhtVfd2d9MyDK-0H3ReQavbA",
    rarity: "ancient"
  },
  {
    id: "skin-162",
    name: "Tom Cat",
    weapon: "StatTrak™ AUG",
    wear: "Battle-Scarred",
    price: 23.97,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk7uepV7BlNf6XC3WD1eFkvd5lRi67gVMm5GrRzt2sJXqUag4kDZAmFuBYtUTslIXuPui2s1Hb2o4Wyir2hy1N8G81tF6C_jtH",
    rarity: "uncommon"
  },
  {
    id: "skin-163",
    name: "Safari Mesh",
    weapon: "AK-47",
    wear: "Battle-Scarred",
    price: 6.94,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFL0P-re6xSNPGdMWuZxuZi_rIxSirkkElyt2qEzI2heXiTaVIiX5siROQJtxnul4XnYbvgswOMgolbjXKpnRk9Yjk",
    rarity: "common"
  },
  {
    id: "skin-164",
    name: "Tiger Tooth",
    weapon: "★ Paracord Knife",
    wear: "Factory New",
    price: 9407.68,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6VjH-SaCWKC_uFkse9uSha_nBovp3OGnon7dXufZwcnC5cjEO8M5BDrw4LlNuvq5ADWid4XnCX63yxM5i8-_a9cBvWv3FY7",
    rarity: "ancient"
  },
  {
    id: "skin-165",
    name: "Forest DDPAT",
    weapon: "★ StatTrak™ Survival Knife",
    wear: "Well-Worn",
    price: 5510.61,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tlOc-XCneR1dF6ueZhW2frxE106zzQztb6Jy2TaQYoCpQiEO5Y4xOwldfjZurg5QTdid5GxCj-kGoXucz3RTaX",
    rarity: "ancient"
  },
  {
    id: "skin-166",
    name: "Shinobu",
    weapon: "StatTrak™ Glock-18",
    wear: "Well-Worn",
    price: 519.61,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5t-KPmdAWWF_uJ_t-l9AX6ylh5w4mTcwtahdS2VOgRzWJsjEOQL5EWxwNblZeK2tVPXitlDmyvgznQeC7fvQL8",
    rarity: "mythical"
  },
  {
    id: "skin-167",
    name: "Hybrid",
    weapon: "StatTrak™ Five-SeveN",
    wear: "Battle-Scarred",
    price: 66.81,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRbq17JeOWGGKe_uZvsvNgSxa_nBovp3OBmd6oJXyeaQ9yCsZxEOICsUO7kdK0Y-qxtFCN2YsQnCv7i39N7ixp_a9cBsh2vVQD",
    rarity: "rare"
  },
  {
    id: "skin-168",
    name: "Lifted Spirits",
    weapon: "P2000",
    wear: "Well-Worn",
    price: 4.88,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_K8-VAn6Zz-lJtPNsTiSMmRQguynLydatcHrEOgIhXJZxReINtRO7ltexZuiwtQPd34lFxXqqjisYun444fFCD_R1ajI6RQ",
    rarity: "uncommon"
  },
  {
    id: "skin-169",
    name: "Bizoom",
    weapon: "PP-Bizon",
    wear: "Well-Worn",
    price: 0.5,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1T9veRa6V_H-eBD3evw-dsv-9WQyC0nQlp6zzdzI6rIHOealMiCJolEOVb5EPrx9PuN7_i5lHW2d9NySj2jy9N6DErvbhOwQNAJg",
    rarity: "common"
  },
  {
    id: "skin-170",
    name: "CAUTION!",
    weapon: "Galil AR",
    wear: "Factory New",
    price: 9720.41,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OG-V6NsLPmfMWSR1Pp_v-9WQyC0nQlpsmnQwoqgIHuWa1QnC5EjRuJcsRi6lNfvPuvi7wPajo9Bziys23xIujErvbiCbfcatA",
    rarity: "rare"
  },
  {
    id: "skin-171",
    name: "Case Hardened",
    weapon: "StatTrak™ Five-SeveN",
    wear: "Minimal Wear",
    price: 3445.63,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRabVSL_mfC2OvzedxuPUnH3C1kRsi4jiAw4qtdXjCO1V2WcZxF-EO5xLsxtHmMeKw5g3fit4TnDK-0H1W4XC76Q",
    rarity: "rare"
  },
  {
    id: "skin-172",
    name: "Red Jasper",
    weapon: "G3SG1",
    wear: "Factory New",
    price: 2.94,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1I4P2Rb_d-J6GsGmidwPp5j-1gSCGn20Ql62_Tztz8dymWPwYoXpYjQ-8Ds0TpmoHnYbzh51aKjYhBzXn23CpXrnE8L3fMNjQ",
    rarity: "common"
  },
  {
    id: "skin-173",
    name: "The Empress",
    weapon: "StatTrak™ AK-47",
    wear: "Minimal Wear",
    price: 15296.66,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSJf2DHGKD0tF6ueZhW2exxEt152rWzI7_Ii-Ubw90DMB0Ee4C5xOwx9GxZbjk71PXgogWn36tkGoXudZeYvlo",
    rarity: "legendary"
  },
  {
    id: "skin-174",
    name: "Gamma Doppler",
    weapon: "★ StatTrak™ Falchion Knife",
    wear: "Factory New",
    price: 25124.85,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SA1iXwON7sd5tQDmjmRg1jC2Nm5z8chTLN1F4Tox2EecPuha9m4bhZuLhtQTZid4UxCT8h39PvCo54egAVqF2-PaF3QGSL_RjtnjgxS7B",
    rarity: "ancient"
  },
  {
    id: "skin-175",
    name: "Gamma Doppler",
    weapon: "★ Bayonet",
    wear: "Minimal Wear",
    price: 46288.44,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6NsLf2SMWOf0f56tfNWXyGyhhh1jDGMnYftby7FbARxDZUkF7NfsUK5lYbmZO3ktAWKj40Qznn_intPvX1i5e4DVfI7uvqAz_bVj6c",
    rarity: "ancient"
  },
  {
    id: "skin-176",
    name: "Rainbow Spoon",
    weapon: "Galil AR",
    wear: "Well-Worn",
    price: 2669.13,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PO_V7BkNPGdB3Kd_vx3ue9rQD6MkhwrujGEiLD1KCzPKhhxCMclQeAPtUK-xoWxPrvkslOKg4tHzXn-3Xsbvyo647sLVqoh_6XekUifZrx5Pjj5",
    rarity: "mythical"
  },
  {
    id: "skin-177",
    name: "Angry Mob",
    weapon: "StatTrak™ Five-SeveN",
    wear: "Field-Tested",
    price: 5332.03,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC1iDxPhzvt5oQS6hjCIrujqNjsH_cy2RagUjA8BwR-de5hjskNflNrnqsgaLiYgRyyythitM7Hw-sekKT-N7rXEld5dH",
    rarity: "legendary"
  },
  {
    id: "skin-178",
    name: "Wraiths",
    weapon: "StatTrak™ Glock-18",
    wear: "Field-Tested",
    price: 74.8,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK6HLMXCCwPp-qfJWQyC0nQlp4T_Xnoz8dCmfZlUgXsd5RbMC40WxkdXnP7nl4wHXi9oUyH_9jilIuzErvbjBKaM58A",
    rarity: "uncommon"
  },
  {
    id: "skin-179",
    name: "Ultraviolet",
    weapon: "★ StatTrak™ M9 Bayonet",
    wear: "Battle-Scarred",
    price: 32532.57,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMXSf_v5jovFlSha_nBovp3OAzd6qcX6ROFd1X5QkF7MDuxDpxIDgNb_msVTbiI4XzCit2iMfvH1v_a9cBqI-pjxG",
    rarity: "ancient"
  },
  {
    id: "skin-180",
    name: "Emerald Quartz",
    weapon: "CZ75-Auto",
    wear: "Battle-Scarred",
    price: 9459.11,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s2ter1-NPGfAm6KxOpJt_NsSieMmRQguynLyNivIn6XPFUnXsYmFuNbukK6ltfiYeux5A2M2dgXyCqo2igY7yhutfFCD_SCQHbp0w",
    rarity: "uncommon"
  },
  {
    id: "skin-181",
    name: "High Roller",
    weapon: "PP-Bizon",
    wear: "Battle-Scarred",
    price: 762.68,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1Y-s2sYb5iLs-SAmuvyOBJvOhuRz39kEx1smnczomgJX2XbA4hC8BzRe9etxntldblMuyx5wfc2ooWni7_3DQJsHhZ08njvA",
    rarity: "mythical"
  },
  {
    id: "skin-182",
    name: "Stained",
    weapon: "★ Butterfly Knife",
    wear: "Field-Tested",
    price: 47349.63,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD3avx-Fks-RtcCW6khUz_TnXmImvIHuQaw8gC5AhRe4ItUTqw9a1NOyw7wTYiYgRzi__jHsbvCZ1o7FVCIQMXZk",
    rarity: "ancient"
  },
  {
    id: "skin-183",
    name: "Mirror Mosaic",
    weapon: "Glock-18",
    wear: "Well-Worn",
    price: 366.86,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5tgKeKBAXWvzO9std5_HRajkBw1vwKJk4jxNWXFP1UhDsYkRbUMsxC6lNSzNO7lsQaK2dpCyH2rjS5J5i054exUVqQi5OSJ2C0RseXl",
    rarity: "mythical"
  },
  {
    id: "skin-184",
    name: "Big Game",
    weapon: "★ Sport Gloves",
    wear: "Factory New",
    price: 70768.69,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_iGAHOV09F6ueZhW2fil0tx4T7RnouodXjCaAMjWJshQOAOsEG8l9bgMrvr5QfXjotHyyWtkGoXucEGPk8i",
    rarity: "ancient"
  },
  {
    id: "skin-185",
    name: "Hunter",
    weapon: "G3SG1",
    wear: "Well-Worn",
    price: 17.98,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1c_M2pO7dqcc-QC3OdxNFkteV8Vxa_nBovp3Pdw9arJCrCP1N1DZFyR7EDskO4wd3mYr_ltVHa2oNNziWshn5Nunlp_a9cBi4_3bmx",
    rarity: "uncommon"
  },
  {
    id: "skin-186",
    name: "Night Stripe",
    weapon: "★ Nomad Knife",
    wear: "Minimal Wear",
    price: 9170.58,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H-ODMWmZxuZio_V7Rjm2qhEutDWR1N__eS6WbFMmD5MhFOJZ4xjswYHhMbzktFPYi45BmS3_2yJO6Cppt-4cEf1yoG4tbbU",
    rarity: "ancient"
  },
  {
    id: "skin-187",
    name: "Colony",
    weapon: "FAMAS",
    wear: "Minimal Wear",
    price: 4.15,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I4M29eKVuJc-eD3WZz-tJvOhuRz39xExw5GXTw4qod3uUaQ91ApZ3QbMItxDrxtK2ZbuxtAaLg4hDxS76hjQJsHgze9LmZw",
    rarity: "common"
  },
  {
    id: "skin-188",
    name: "Urban Masked",
    weapon: "★ StatTrak™ Nomad Knife",
    wear: "Well-Worn",
    price: 9200,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H-ODMXOR0etJpfNrTieMmRQguynLm96uciqSawMgX8Z1RrEIs0G8wN3nYbvjs1fZ2I1GmC-o3CofvSdi4PFCD_SLffhL6Q",
    rarity: "ancient"
  },
  {
    id: "skin-189",
    name: "Ancient Ritual",
    weapon: "G3SG1",
    wear: "Battle-Scarred",
    price: 425.82,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1a4s2vZqdkJf6HMXCZz-tJvOhuRz39zE5ysWjSyterJX-VZ1UgX8EhTeVf5EOxlN3jYemwsw3WjtgQzi7-2zQJsHjSk9PLGw",
    rarity: "common"
  },
  {
    id: "skin-190",
    name: "Superconductor",
    weapon: "★ Sport Gloves",
    wear: "Battle-Scarred",
    price: 75115.86,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_yaCW-E_ux6peRWQyC0nQlp4jjRyt-vJX6QblMgApt0R-5c5hLsktO2Nu_h4QaLg4MXyCmr2ClP7jErvbiwB_ADaw",
    rarity: "ancient"
  },
  {
    id: "skin-191",
    name: "Safari Mesh",
    weapon: "★ StatTrak™ Navaja Knife",
    wear: "Battle-Scarred",
    price: 7576.87,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJo_FWQiygnSIzsjO6lob-KT-JZgIlDJFxQbUIsxnsk9zjNrmz7wbfg4IQziT6hi9P5n5j674CWPIlqLqX0V-GxNuRmA",
    rarity: "ancient"
  },
  {
    id: "skin-192",
    name: "Midnight Laminate",
    weapon: "AK-47",
    wear: "Minimal Wear",
    price: 754.09,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFU6s2neq1pJeOQC2mE_v5jovFlSha_nBovp3PRnt36d36UOlUmCcF2TOZfsRC_ldW1ML625AbZ2dhHyn_7jSgauCtp_a9cBpVVSdXG",
    rarity: "rare"
  },
  {
    id: "skin-193",
    name: "Gamma Doppler",
    weapon: "★ Gut Knife",
    wear: "Factory New",
    price: 12900,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRaalSJ_GeA2avxeFmoO1sXRajnRw0tm66lob-KT-JOAIiWZRwR-NZ5hO5lde2NOrl4QyM3YtDySSoi39J6iZrtrpRAvYm-bqX0V-vZngSFg",
    rarity: "ancient"
  },
  {
    id: "skin-194",
    name: "Freehand",
    weapon: "★ M9 Bayonet",
    wear: "Battle-Scarred",
    price: 33120.62,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWad_uN3oupsSxamhSJ-4wKJk4jxNWWSbVd2D8R1TbYKtxCww4DvZL7j71OI340Qnyqo2isbu3ps4ecHAqtz5OSJ2C2JEBJP",
    rarity: "ancient"
  },
  {
    id: "skin-195",
    name: "Antique",
    weapon: "StatTrak™ PP-Bizon",
    wear: "Battle-Scarred",
    price: 777,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1Y-s2sYb5iLs-SAHOZ0Ptzj-1gSCGn20sj4DnTyN2pdyjFOg4oXJV5Qu5c5xS9w4bjNL7q7gHd2INGxCn_iyxXrnE83Efvvd0",
    rarity: "rare"
  },
  {
    id: "skin-196",
    name: "Fleet Flock",
    weapon: "AUG",
    wear: "Factory New",
    price: 4305.66,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_jdk7uepV7d6IfyfAXCD_uJ_t-l9AXnmw0t252TVztercCmTZ1AmDMZ2RuBftRnsx4LhN-O0s1DYi9pEmCTgznQesuSvNik",
    rarity: "mythical"
  },
  {
    id: "skin-197",
    name: "Sacrifice",
    weapon: "StatTrak™ Glock-18",
    wear: "Factory New",
    price: 589.26,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-bC3Wf_uJ_t-l9AXHixRlytW7Ty4queH_DZlMlX5UjF-dZsUPqk9LhY-Lk5waMjdlCmSzgznQeEFBQhB0",
    rarity: "uncommon"
  },
  {
    id: "skin-198",
    name: "Forest DDPAT",
    weapon: "★ Flip Knife",
    wear: "Field-Tested",
    price: 9496.08,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6x0H_SXHmaE_uJ_t-l9AXmxx01xt2rRnI2uc3uRPVAkW5R0FrIIsha6wdbjZrjh4wOP3t0Ry3_gznQeDR4sxYY",
    rarity: "ancient"
  },
  {
    id: "skin-199",
    name: "Case Hardened",
    weapon: "★ Survival Knife",
    wear: "Factory New",
    price: 14500,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsMc-cB2uVxdF6ueZhW2fmx0gi4jzQm9qhdSqSPVRzDJR2FOEKsha4xtbgPuy04QON3YJEyyr_kGoXuQK6HIuK",
    rarity: "ancient"
  },
  {
    id: "skin-200",
    name: "Crimson Tsunami",
    weapon: "StatTrak™ Galil AR",
    wear: "Minimal Wear",
    price: 570.88,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OG-V6NsLPmfMXCR1-tJvOhuRz39x0Qm6mjQzo6qeHLGOg8nXJUiE-UKtxa5mtPgZu3rtFGMiIwXxH-viDQJsHh48m4KFg",
    rarity: "rare"
  },
  {
    id: "skin-201",
    name: "Red Laminate",
    weapon: "AK-47",
    wear: "Well-Worn",
    price: 5283.67,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0POlPPNhIf2sAm6Xyfo4tucxS3rjwRx_42zRwo6pdSnCPwAmX5ohFOIJsUTqwdThNOi0s1TajZUFk3t5vdi_Cw",
    rarity: "mythical"
  },
  {
    id: "skin-202",
    name: "Buckshot",
    weapon: "★ Specialist Gloves",
    wear: "Battle-Scarred",
    price: 4211.18,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJtu57Sjqnqh81vCqLpYPwJiPTcFQhAsd5TOcDsxLqwN22ZrjqslDZg4gXnCj2jnlA7Sg54udWB_dz-qbJz1aWpqUo0Nk",
    rarity: "ancient"
  },
  {
    id: "skin-203",
    name: "Doppler",
    weapon: "★ Skeleton Knife",
    wear: "Minimal Wear",
    price: 59299,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-SA1iUzv5mvOR7cDm7lA4i5wKJk4jxNWWSbQ8iDsMkQ7QLtUO7kNXmZLy24wLZjYwQyy6v2y5Nvy9t67oCVKN05OSJ2CIEz_WG",
    rarity: "ancient"
  },
  {
    id: "skin-204",
    name: "Poison Dart",
    weapon: "StatTrak™ CZ75-Auto",
    wear: "Minimal Wear",
    price: 481.01,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnj53UO7ryvaac0dKiVW2XBlrwmsuA6GH3hkE9062qEz9aoeCmVawchW8dwEe4MrFDmxWPDR_Ga",
    rarity: "uncommon"
  },
  {
    id: "skin-205",
    name: "Ricochet",
    weapon: "AUG",
    wear: "Well-Worn",
    price: 35.87,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_C9k7uepV654LfKfC1icyOl-pK9tHi-wxUp0sTyGw4z8dXqfb1IlWcd1QedctUbpwNHgPrnjtFeLj4tD02yg2euRXb9L",
    rarity: "uncommon"
  },
  {
    id: "skin-206",
    name: "Coral Halftone",
    weapon: "P2000",
    wear: "Field-Tested",
    price: 15.38,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0Pq6V6JsI_WHMXfCkb4mj-1gSCGn2xsj5mrWm4v_c37EaAV1CMR2Ru8P4RO7m4fjY7_rsgDZjYMQzHiriyNXrnE8hd3eC64",
    rarity: "common"
  },
  {
    id: "skin-207",
    name: "Violent Daimyo",
    weapon: "Five-SeveN",
    wear: "Minimal Wear",
    price: 51.86,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC1iDxPhzvt5tTiC-jBIYvzSCkpu3cXjCPAB2WZMmQ-EK4BTqlNSzNOLk71GI3tpGmX2oii5N6nk667kDWL1lpPNv4wCTtw",
    rarity: "uncommon"
  },
  {
    id: "skin-208",
    name: "Half Sleeve",
    weapon: "FAMAS",
    wear: "Battle-Scarred",
    price: 3.65,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M2paaloIuKWCliWwON3o95lRi67gVN35TyBy42pcS6ROAUkWJJ3FOMK50TswNzjPuPh71fYjYoWmX_33CtB8G81tAX5qatv",
    rarity: "common"
  },
  {
    id: "skin-209",
    name: "Meow 36",
    weapon: "FAMAS",
    wear: "Factory New",
    price: 118.01,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M2oaalsM8-QAXWA_uNzv_ZWQyC0nQlp6jvVztaudCnEbAUgDsckFOAJsBLtlN2yP7zqslGMiooXyCX43H8Y5zErvbiVlZtU7g",
    rarity: "uncommon"
  },
  {
    id: "skin-210",
    name: "Calligraffiti",
    weapon: "Desert Eagle",
    wear: "Well-Worn",
    price: 17.56,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6_evb6hoH_OSAmuZxvx3tudWQyC0nQlp52rQmNv_IC7DaFR0ApB4QbMKs0W8k9zuPr6xtAGMjoITmymohyMa6jErvbhrxmEjWA",
    rarity: "uncommon"
  },
  {
    id: "skin-211",
    name: "Safari Mesh",
    weapon: "AWP",
    wear: "Well-Worn",
    price: 12.2,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf7jJk4ve9YJt5If6sAm6Xyfo45uU7HS_nzU914z_dzImtdXyQZlMjCJIkFOUI5ES9k9PkPriz71bdiJUFk3tlgygeXw",
    rarity: "common"
  },
  {
    id: "skin-212",
    name: "Slaughter",
    weapon: "★ Falchion Knife",
    wear: "Field-Tested",
    price: 16700,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SA1iKxOxksd5lRi67gVMhsWvXnIurc36UP1RzWJB4QbYCsBC-xoC0N-3gtVHY2N8XmCT_2isb8G81tLxG9DyC",
    rarity: "ancient"
  },
  {
    id: "skin-213",
    name: "Momentum",
    weapon: "AUG",
    wear: "Well-Worn",
    price: 411.6,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_jdk7uepV6liLfWdGnKd_uJ_t-l9ASi2zUp042SBno6sICrFbFMnCZR5EedftkPqk9ayMr_j71fXjo8XmXrgznQeFjVtTWM",
    rarity: "mythical"
  },
  {
    id: "skin-214",
    name: "Storm",
    weapon: "MP9",
    wear: "Battle-Scarred",
    price: 92.26,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f7i1k_OaheqlrMv-dGlicyOl-pK8_S3zjxRh_5mmGn9epIymQPQBxDpQlFuUJ5xa6kt2yZLjkswLY2ooT02yg2WH9Y1dp",
    rarity: "common"
  },
  {
    id: "skin-215",
    name: "Black Nile",
    weapon: "AWP",
    wear: "Minimal Wear",
    price: 513.79,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V7d5Mv-dC1icyOl-pK89Gyvhlhsit2-BwoyrICmWPQcmDpEkQOdeskOxwNKzN7vm4VeP2oMR02yg2Z2CmmVC",
    rarity: "uncommon"
  },
  {
    id: "skin-216",
    name: "Crimson Web",
    weapon: "★ StatTrak™ Butterfly Knife",
    wear: "Battle-Scarred",
    price: 52000,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsBn6v1ut0o95lRi67gVN04WmDzNz_cX_CalAiW8FxR7MI4xKxmtPlYe7ksgzeiN5BziT83y4f8G81tOxPsLb-",
    rarity: "ancient"
  },
  {
    id: "skin-217",
    name: "Hot Shot",
    weapon: "Five-SeveN",
    wear: "Well-Worn",
    price: 292.6,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRe6tSJ-KWF1ie1O16teB7cCahlBMgtgKDk5n8HjjCKFN-Zc4pEr9OrBm4xN3vNrix41aIjtkQyH-s2ipMvSY_sOxRBaFx-vCE3AuXYLE_45kdZKHwQRxY8PU",
    rarity: "common"
  },
  {
    id: "skin-218",
    name: "Downtown",
    weapon: "M249",
    wear: "Well-Worn",
    price: 28.3,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wiFO0P_8PP1SJP-EAHGf1etJvOhuRz39wUh-5GuGz4mrJHuSbg4jWJp1FLINsRCxwdDuZezm7leK3d5GmSr_jTQJsHj3YwoNRA",
    rarity: "rare"
  },
  {
    id: "skin-219",
    name: "Fade",
    weapon: "★ M9 Bayonet",
    wear: "Minimal Wear",
    price: 98120.39,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWaR_uh3tORWQyC0nQlp4znQytr6cnjFbg8oC8BzRrQK50S-lNDgP-_r5wWP3t5CyX37jCIb7DErvbiJu9Hv_g",
    rarity: "ancient"
  },
  {
    id: "skin-220",
    name: "Statics",
    weapon: "MP5-SD",
    wear: "Factory New",
    price: 218.87,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1W_6eRe7BsNPmQHViSzftzj-1gSCGn20l252_Tz478Jy3EbAYnX8FzFuAI5kO5wNK1P-uz4lSP2doRyS_6iipXrnE8LnlBQOA",
    rarity: "uncommon"
  },
  {
    id: "skin-221",
    name: "Nitro",
    weapon: "MP5-SD",
    wear: "Well-Worn",
    price: 353.71,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1I4M2heqVjJ_WsD2STxOBio7JWQyC0nQlp42yEzImsdH3EaAEgC8N2EeYJtRbuxtDjYr_q7weI3d5FzCz43ChOvDErvbiO5Zd60w",
    rarity: "common"
  },
  {
    id: "skin-222",
    name: "Old Roots",
    weapon: "MP9",
    wear: "Battle-Scarred",
    price: 192.96,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f7jJk4v28Z5tuIeKFB2mX_vdzvO1mWBa_nBovp3PUmI6vdi-VOgInDpFxQOIKuhW8lNC1Puqw41fajIJCnCv9j3tIuixt_a9cBudlkiY3",
    rarity: "common"
  },
  {
    id: "skin-223",
    name: "Night",
    weapon: "★ Flip Knife",
    wear: "Minimal Wear",
    price: 14000,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V7diH_6aCW-E_uJ_t-l9ASzgk09_tW_Qy9mocXLCbgQgWJQiReEI50SxldbiMuzn4gDd3oJCyi7gznQeD7v_WUw",
    rarity: "ancient"
  },
  {
    id: "skin-224",
    name: "Black Lotus",
    weapon: "M4A1-S",
    wear: "Battle-Scarred",
    price: 358.88,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_ux6seJicCW8gQg0jDGMnYftb3-eOgEpDcFyQuMMtRG8kIbhMuK051ba2IMQyH6r3yof5ilv4bwLWfU7uvqA7qRNHGA",
    rarity: "mythical"
  },
  {
    id: "skin-225",
    name: "Twist",
    weapon: "StatTrak™ CZ75-Auto",
    wear: "Field-Tested",
    price: 90.1,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s2pcbZsNPWsAm6Xyfo45bY7TXzjxk5w42XXn93_cnLFOFN1C5t0ROANsBLtx9ziNu6x4FHejpUFk3uH-TvaLw",
    rarity: "uncommon"
  },
  {
    id: "skin-226",
    name: "dev_texture",
    weapon: "Negev",
    wear: "Well-Worn",
    price: 33.6,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2gbaNoNs-XC3GExPZipfNscCW6khUz_W_QzdmhJy7EOFAkWMdzF-dbtEK9moGyZbi37gTZi4xMxH36iipK73p1o7FVNCisfvA",
    rarity: "rare"
  },
  {
    id: "skin-227",
    name: "Damascus Steel",
    weapon: "★ Falchion Knife",
    wear: "Factory New",
    price: 11930.36,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SH1iUwON3o-J8XBbqxSIrujqNjsH7eXjGPwAkXJR2QLMJtRe5kN2xYu7k5QHcio0XyX-o3S4duH5u4eYFT-N7rR0fzt1P",
    rarity: "ancient"
  },
  {
    id: "skin-228",
    name: "Printstream",
    weapon: "StatTrak™ M4A1-S",
    wear: "Field-Tested",
    price: 30220.33,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj_F7Rienhgk1tjyIpYPwJiPTcAAoCpsiEO5ZsUbpm9C2Zuni4VHW3o5EzSX62HxP7Sg96-hWVqYi_6TJz1aW0nxrkGs",
    rarity: "legendary"
  },
  {
    id: "skin-229",
    name: "Wood Fired",
    weapon: "StatTrak™ Nova",
    wear: "Well-Worn",
    price: 200,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiVI0PyhfqVSKOWdGmKC_uxkpfVscCW6khUz_WiByIr8IyiXbQYlD5d1E-BftxW_lNbgMb7n7gyM3tkXnimr3C1O6n11o7FVLv86c40",
    rarity: "uncommon"
  },
  {
    id: "skin-230",
    name: "Emphorosaur-S",
    weapon: "M4A1-S",
    wear: "Factory New",
    price: 263.04,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj-dsSi26mxoYtS-AlJXgHifOOV5kFJt4F-8KukXtldyyMLjjtVOIjIsWzXj8iylJ5ig6tbsKV_ItqaaB3gHfcepq28_00F4",
    rarity: "rare"
  },
  {
    id: "skin-231",
    name: "The Battlestar",
    weapon: "StatTrak™ M4A4",
    wear: "Field-Tested",
    price: 3129.69,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSMPmcAGKV09F6ueZhW2fjxB9_4GqEyN6vdi_BPwQgWZIkRLYD4Ba_kILgYeOz4lbagthBz3_9kGoXuZIYHoDp",
    rarity: "legendary"
  },
  {
    id: "skin-232",
    name: "Stymphalian",
    weapon: "AUG",
    wear: "Well-Worn",
    price: 246.02,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk7uepV7d5Of2DBmacyO94j-NgXS2gqhEutDWR1Iz6cnqXOA8mD5shTOEPuhm-moHlZLnj4gLWjdhEzimr2n8bvC5q4e8cEf1yYjdCpmM",
    rarity: "mythical"
  },
  {
    id: "skin-233",
    name: "Exo",
    weapon: "Nova",
    wear: "Minimal Wear",
    price: 29.27,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiNK0PyhfqVSM_OaMWGZ_uJ_t-l9AS3lxE8k4zuGz42qciiVPQIkDcF0TLNeuhmwxtfhYbzm4wfci95FnC_gznQeGrfN1lI",
    rarity: "uncommon"
  },
  {
    id: "skin-234",
    name: "Jungle Dashed",
    weapon: "CZ75-Auto",
    wear: "Field-Tested",
    price: 84.86,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1I_826abRoH-ObAXWE_uRjvuZlSha_nBovp3PQyt2reHrGPAQiDJYjTOQItRDpwd3kZO23sQLY3Y0TmX75iXxB631i_a9cBsRmAsJf",
    rarity: "common"
  },
  {
    id: "skin-235",
    name: "Contractor",
    weapon: "Dual Berettas",
    wear: "Minimal Wear",
    price: 3.16,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I4M2-ZadSLPmUBnPekb8g5LI8Hyi2l01z42Tdmdj9cXiRaA4jXJp4E7YJ4Ra8lILmP-7itBue1dzkV1WWjA",
    rarity: "common"
  },
  {
    id: "skin-236",
    name: "Keeping Tabs",
    weapon: "StatTrak™ G3SG1",
    wear: "Well-Worn",
    price: 142.92,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1Y-s2pO7dqcc-HD2SEyO13vOxoXxa_nBovp3OHzouqcHqRZwBxDcd2EOUDskXtl4DmYevi4FGLg4tDz3n4iylB6Xw9_a9cBgS1m-61",
    rarity: "uncommon"
  },
  {
    id: "skin-237",
    name: "Ultraviolet",
    weapon: "★ Paracord Knife",
    wear: "Field-Tested",
    price: 6048.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV7diH-CGHHecxNFwse1qRyC8myIrujqNjsGrJXjEPwAiC5pwEeAC40brkNzvPuLgsgHY2oMWyiv9jCxIvChr4egHT-N7rbYjcxXs",
    rarity: "ancient"
  },
  {
    id: "skin-238",
    name: "The Executioner",
    weapon: "G3SG1",
    wear: "Battle-Scarred",
    price: 600,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1Y-s2pO7dqcc-WFmKT1Pp_v-9sXRa_nBovp3PXmdyseC3DOFN1DJZ1TeIOtEKxmoG2PuKwsgOPgoxGzyr7jnhPvXlq_a9cBnGZIRC4",
    rarity: "mythical"
  },
  {
    id: "skin-239",
    name: "Palm",
    weapon: "MAC-10",
    wear: "Battle-Scarred",
    price: 2.48,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1I_82-aahgH_yaCW-Ej78l4uJoHH-2lBh-4mTQnIupdHrEO1QgW5MhTbIPtUHul9C1P7ni5gLAy9USZUzbrTo",
    rarity: "common"
  },
  {
    id: "skin-240",
    name: "Ultraviolet",
    weapon: "★ Bowie Knife",
    wear: "Field-Tested",
    price: 5259,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNFlv955WjujmRgYvzSCkpu3dHKePw8oW8N5QOYLshW-wdC1N--0tAHajoNCmCj7iStI6Hw-tegBU71lpPP9HYRDsQ",
    rarity: "ancient"
  },
  {
    id: "skin-241",
    name: "Zirka",
    weapon: "StatTrak™ M4A4",
    wear: "Well-Worn",
    price: 5673.44,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFL0OG6abZSIuKSGGivzedxuPUnSXnqkBwj62vTn9b8cyjBOlNxD8Z2Te8L5Ea8xtbkNe6z7lTajotCmDK-0H35HfkCFQ",
    rarity: "rare"
  },
  {
    id: "skin-242",
    name: "Blue Steel",
    weapon: "★ Talon Knife",
    wear: "Well-Worn",
    price: 32227.02,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWaB_ux6peRtcCW6khUz_WqHnNmqJH7GPwEhXJN5F-Ff5hPrlt3uN7vhsw2IidpEmyyq3yxJ6Cd1o7FVPYygbVE",
    rarity: "ancient"
  },
  {
    id: "skin-243",
    name: "The Emperor",
    weapon: "M4A4",
    wear: "Well-Worn",
    price: 4238.17,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSJf2DC3Wf09F6ueZhW2exwBh_6m3dnt36InjDPQ4oXJt1TbJeshW_mtfjN-vrsgaKiokWy333kGoXuRj4z9Nd",
    rarity: "legendary"
  },
  {
    id: "skin-244",
    name: "Dark Blossom",
    weapon: "M4A4",
    wear: "Minimal Wear",
    price: 2237.01,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFL0PC7bJtvLOWWMWuZxuZi_rZsSi3rzRlwtmjVy4yheHzGa1V0DcF5RO4JsxO-x9C1ZenqtFbW2d1bjXKpi8Drf9k",
    rarity: "common"
  },
  {
    id: "skin-245",
    name: "Marble Fade",
    weapon: "★ Shadow Daggers",
    wear: "Minimal Wear",
    price: 10697.48,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6VgH_2SHGWcxNFwseVscCW6khUz_T_dyI2tJXrFbQN2X5MjTLUCtEa5kYXnYuPh5QGLjowUxXitjixA7nl1o7FVu7_YRqU",
    rarity: "ancient"
  },
  {
    id: "skin-246",
    name: "Foundation",
    weapon: "★ Specialist Gloves",
    wear: "Well-Worn",
    price: 22658.06,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJv_NoQS62qgovuimApYPwJiPTcFMgWJVwFLIPthDpkt3vN7ux5QTWitkTm3r5iiMc7nw6sukBBfV38vDJz1aWnrr9eTA",
    rarity: "ancient"
  },
  {
    id: "skin-247",
    name: "Amber Fade",
    weapon: "AUG",
    wear: "Well-Worn",
    price: 326,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_CNk6fOqbZtgJeSSAmuZwtF6ueZhW2fizUlwsmuEytmvJHzGaQJyXMclEbYCuhPtkdHmPrvqsVaL3osTmyj6kGoXuZFFysy6",
    rarity: "uncommon"
  },
  {
    id: "skin-248",
    name: "Capillary",
    weapon: "Five-SeveN",
    wear: "Field-Tested",
    price: 32.63,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j_dsRieMmRQguynLmY79IinFbA90CZN2Q-Bc4UW6x9KyZLnjtQCMjo8WyXr7jy1O6Ck_sfFCD_SqR6qLvA",
    rarity: "uncommon"
  },
  {
    id: "skin-249",
    name: "Boost Protocol",
    weapon: "StatTrak™ Five-SeveN",
    wear: "Factory New",
    price: 1306.8,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRb7dSJvmFC1iDxPhzvt5sSTygnBIpjDGMnYftby7FalV1D5QhE-EDthW8xtCyPu63tFPciYhBynn_jykfuCttte4CA6E7uvqAn_5lxU8",
    rarity: "rare"
  },
  {
    id: "skin-250",
    name: "Tiger Tooth",
    weapon: "★ Bayonet",
    wear: "Factory New",
    price: 24000,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POgV7BkJ_WBMWiCwOBxtd5lRi67gVMhsGrTntn4ci-ROAYlXMBwE7YL5BaxxIHjY-vq7w3X398RxS78iylK8G81tBow9RWL",
    rarity: "ancient"
  },
  {
    id: "skin-251",
    name: "Man-o'-war",
    weapon: "Negev",
    wear: "Minimal Wear",
    price: 19.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1a4s2gbaNoNs-UAmiC2NF6ueZhW2fikBh352vQyt-sI3mRbQ8lDJpxTLVfuxC5k4W0MLvm5VfeithHnij5kGoXuSdORNFb",
    rarity: "uncommon"
  },
  {
    id: "skin-252",
    name: "Buzz Kill",
    weapon: "StatTrak™ M4A4",
    wear: "Factory New",
    price: 17603.79,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSM_WQGmiC_uJ_t-l9AX22kBh0tm3Qn92qdS7GPARyW5t0QLQD4xi6w9XkZe3jsgDW3ogUnH3gznQeqfpfmso",
    rarity: "legendary"
  },
  {
    id: "skin-253",
    name: "Case Hardened",
    weapon: "★ Stiletto Knife",
    wear: "Well-Worn",
    price: 19986.47,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SH1ifyOJztN5lRi67gVNzsWTdn92oJy6XaVUgWJQlQuALtxS4l4HnMrzk5VDc2d1Mmyj9hn8b8G81tHhX34fn",
    rarity: "ancient"
  },
  {
    id: "skin-254",
    name: "Fade",
    weapon: "★ StatTrak™ Butterfly Knife",
    wear: "Minimal Wear",
    price: 227780.76,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2avx-9ytd5lRi67gVNwsDvSwtqqc3iXZg4kCZYjReYLtRbum9XgYuvm5wbWjtgUzCn3iSsf8G81tFEeH9rw",
    rarity: "ancient"
  },
  {
    id: "skin-255",
    name: "Nuclear Garden",
    weapon: "MAC-10",
    wear: "Factory New",
    price: 7420.05,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a4s2gfadhJfGBMXSb1OJ6o7JWQiiwxE0YvzSCkpu3Ii_COw4jDsMkEbYJsxe5xNezPu-3swCN3dhEz3_33XlA63lo6-8DWL1lpPMiXZ_jZw",
    rarity: "uncommon"
  },
  {
    id: "skin-256",
    name: "Cobalt Disruption",
    weapon: "StatTrak™ Desert Eagle",
    wear: "Field-Tested",
    price: 12674.28,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7v-RbKB9IeSXC2mDxNFmteBqQCq4qhEutDWR1I36c3OVbFQjDcRwR7EO4EW-x4HvMumzswfWjd8XnCn2iShM53s5t-0cEf1ycu8KccY",
    rarity: "mythical"
  },
  {
    id: "skin-257",
    name: "Lt. Commander",
    weapon: "★ Specialist Gloves",
    wear: "Battle-Scarred",
    price: 7798.97,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJouhqRDqygiIksjCKpYPwJiPTcFJzApV0F-cL5kHuk9CxP7u3sgDYgo1BzX76jixM7Cw-selXBacn-PHJz1aWiwi0X-Y",
    rarity: "ancient"
  },
  {
    id: "skin-258",
    name: "Modern Hunter",
    weapon: "M4A4",
    wear: "Battle-Scarred",
    price: 4074.2,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwipC0Pq7ZrBoMs-eAWOV0-BJvOhuRz39xUh0tmyDmIusd3mTbldxCcEmRrYNsEO8k9a1Punis1OLj4pBxHn82jQJsHibcUQx2g",
    rarity: "rare"
  },
  {
    id: "skin-259",
    name: "VariCamo",
    weapon: "G3SG1",
    wear: "Factory New",
    price: 21.37,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1T9s24abZkI_GeAVicyOl-pK9qTn7gwUlwsWrVzd2sci3GZ1cnDpF0TeNe5kG9mt21Mrzq4VPYjdhA02yg2WVbe73u",
    rarity: "common"
  },
  {
    id: "skin-260",
    name: "Forest DDPAT",
    weapon: "★ StatTrak™ Huntsman Knife",
    wear: "Well-Worn",
    price: 11320,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-bF1iUxf53pN5lRi67gVN-6mqBz4msIHnDPAd1X5YiQuBe5Ba5ltG2NOvj7wTcjo1Eyn79inwd8G81tJCD569m",
    rarity: "ancient"
  },
  {
    id: "skin-261",
    name: "Palm",
    weapon: "Negev",
    wear: "Well-Worn",
    price: 556.58,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1I_82-aahgH_KBD3Gf_uJ_t-l9AXHgkU1x5WvQmY38cnvDZg8iX8d5E-Nc5BXqxN3gZO7jtlbZ3dkQmC3gznQei7Y7Jls",
    rarity: "common"
  },
  {
    id: "skin-262",
    name: "Safari Mesh",
    weapon: "★ Gut Knife",
    wear: "Well-Worn",
    price: 5043.59,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRe7RSLfWABliEwOBJvOhuRz39wU12sWnczIyuI3mQbFAnD8RyTLVc4BHukIfmZbjq4Vba2IlMzyT43DQJsHjApBIhpw",
    rarity: "ancient"
  },
  {
    id: "skin-263",
    name: "Death by Puppy",
    weapon: "AUG",
    wear: "Minimal Wear",
    price: 392.61,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_C9k7uepV6BoIeSbMWWJ_up5t-ZwcCW6khUz_W7RnNegdyqRPAcpDZdwQOAO5xW4w4C0ZemwtgHYjoNHniX6iSsd7Cx1o7FVmQFtzuc",
    rarity: "mythical"
  },
  {
    id: "skin-264",
    name: "Player Two",
    weapon: "M4A1-S",
    wear: "Field-Tested",
    price: 4118,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj-J6SCbhxUl_jDGMnYftby7BbVdyCsB0EeZY4RPukNfhZOO2sQ3W398Qy3_6jHxIunptsO9TUqs7uvqAAWrfZoM",
    rarity: "legendary"
  },
  {
    id: "skin-265",
    name: "Scorched",
    weapon: "★ Stiletto Knife",
    wear: "Minimal Wear",
    price: 13195.72,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-AHliUwP5mvORWQyC0nQlpsmuDzNj6d3-SaQ4hCpN1FOMM40LuwdeyMe625gOIidlMmXn6hi1N6DErvbhNNNdMtg",
    rarity: "ancient"
  },
  {
    id: "skin-266",
    name: "Pandora's Box",
    weapon: "★ Sport Gloves",
    wear: "Battle-Scarred",
    price: 169229.79,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H-CGHHecxNF6ueZhW2exk01w4j7cmYn4eHPCbAMhApdwTOIN5BPsx9yyYu605FTeid0Uy3j3kGoXueKyz5wo",
    rarity: "ancient"
  },
  {
    id: "skin-267",
    name: "Wintergreen",
    weapon: "AK-47",
    wear: "Well-Worn",
    price: 50.69,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFU6s2jbbBsLPyaDViX0-tzvt47cCW6khUz_W-Ay96seSrBaQcnDJRyTbMDuxTsw9bmNLy0sQPb34JNyn_-jS9N6n51o7FVK4Nkj6A",
    rarity: "uncommon"
  },
  {
    id: "skin-268",
    name: "Safari Mesh",
    weapon: "★ StatTrak™ Huntsman Knife",
    wear: "Battle-Scarred",
    price: 6999,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-AHlidxP1-j_VoQRa_nBovp3OEzd7_dn_FOAVxCpp2QuQC4xW9kYaxNOLqtA3dgowWyyn7jnxAuCxj_a9cBvBQQTn3",
    rarity: "ancient"
  },
  {
    id: "skin-269",
    name: "Contractor",
    weapon: "Five-SeveN",
    wear: "Well-Worn",
    price: 222.87,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRe6tSMP2QMWuZxuZi_rRtTXjkxE115DjdmNn7ciieaVAkAsN4ELVc40Htx4fmPrng51DXj95bjXKpZ_EmD5Y",
    rarity: "common"
  },
  {
    id: "skin-270",
    name: "Inheritance",
    weapon: "StatTrak™ AK-47",
    wear: "Battle-Scarred",
    price: 5687.58,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQ0OKheqdoLPGaAFicyOl-pK8xGH_nwUt1sGrSz9ivcHKQOAcjXMYkRu5Yuxe4lYCyZOq25VSM2oMT02yg2UxBSEgA",
    rarity: "legendary"
  },
  {
    id: "skin-271",
    name: "Gold Arabesque",
    weapon: "AK-47",
    wear: "Well-Worn",
    price: 126194.73,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSJ_-fCliR0-90tfJ4WiyMmRQguynLntmvICieOARzCpMhF-BYsRe-xoHvYu_g5lSNj4NDyy2viCwY6Hlu5_FCD_Q1jEqYuQ",
    rarity: "legendary"
  },
  {
    id: "skin-272",
    name: "Scorched",
    weapon: "★ StatTrak™ M9 Bayonet",
    wear: "Well-Worn",
    price: 56387,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMXSA_up3oPFlSha_nBovp3PSnNj6dnnEbA4oDZB0TbIP5BTulYG2NO3q4lTWjYpAyi79jHtNvHo6_a9cBpN31nKp",
    rarity: "ancient"
  },
  {
    id: "skin-273",
    name: "Cobalt Paisley",
    weapon: "MP9",
    wear: "Battle-Scarred",
    price: 12.11,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f9Tte0PCifaFSMPGaHWuV2NF6ueZhW2ewwhwmtmmDmdz_eH-RaQZ1CcB3E-BcukKwmoXlNerk5wHY3tkRmX74kGoXuZ6yLkO1",
    rarity: "uncommon"
  },
  {
    id: "skin-274",
    name: "Phantom Disruptor",
    weapon: "AK-47",
    wear: "Well-Worn",
    price: 459,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlJfA6H-CbD2mEzuNJtOh6XTyjgRI1jDGMnYftb3qTbQMpCZVxF-8Ku0Xtw4XkYu2xtQSL3d5FxSz-3H5Ovy895epRA6E7uvqAsbzZtpo",
    rarity: "mythical"
  },
  {
    id: "skin-275",
    name: "Urban Masked",
    weapon: "★ Survival Knife",
    wear: "Battle-Scarred",
    price: 4190.81,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5t-MM-HD3eV_vtksuBncCW6khUz_WnTwo2vIHrEO1UpCcRwTe4MtEO-wNXnZOm2sw2Pgo5GxHr7j35I6y11o7FVtOoVFFs",
    rarity: "ancient"
  },
  {
    id: "skin-276",
    name: "Solitude",
    weapon: "M4A1-S",
    wear: "Well-Worn",
    price: 174.04,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H-OcDW-vzOFjvvVoRiegqhBzsmyWpYPwJiPTcFIoXpslROVftRK5kYblN7zq5VbX3YtMmH_8ji5MvX1qtu1XWPFxrvLJz1aW589-peo",
    rarity: "mythical"
  },
  {
    id: "skin-277",
    name: "Firestarter",
    weapon: "MAG-7",
    wear: "Well-Worn",
    price: 90.26,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wjFL0P-vb_NSJvmBC2WZ1fpzvt5lRi67gVNyt27dz46scn2TaQ52XpV1E-8I4RLuwIHnMO2w4gfa2NlHmy2ri3xP8G81tFM5kI47",
    rarity: "uncommon"
  },
  {
    id: "skin-278",
    name: "Magma",
    weapon: "StatTrak™ M249",
    wear: "Battle-Scarred",
    price: 111.71,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wiNK0P2se61pKfGdMWuZxuZi_rNrTC-wl0gh5WXXmIqpIyiSbVIoXJckEO9eukTrx4XkMbjh51bYjIJbjXKp9iAER2c",
    rarity: "uncommon"
  },
  {
    id: "skin-279",
    name: "Big Swell",
    weapon: "★ Specialist Gloves",
    wear: "Minimal Wear",
    price: 40157.6,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V6NhL-aWMXSAxO1_se1gXD2MghwxtgKHlpr8HifOOV5kFJJyFOVZuhC8l9XjNL-3tgHcg41HzHr4hntBuntpse0LUvZwr_bX3QjfcepqIIhMOUI",
    rarity: "ancient"
  },
  {
    id: "skin-280",
    name: "Contrast Spray",
    weapon: "M249",
    wear: "Minimal Wear",
    price: 159.16,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wjFL0OG-eqV0H_yaCW-Ej-shsbBtS3q2wkUitWzUz9b_c3vEZ1UhD5R4F-QL40a8m4HuZbnitlfAy9USVV6qaxA",
    rarity: "common"
  },
  {
    id: "skin-281",
    name: "Doppler",
    weapon: "★ StatTrak™ Huntsman Knife",
    wear: "Factory New",
    price: 31262.6,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SA1iDwP5muOh7Sha-lA8lvziMgIr9HifOOV5kFMN5Qe8CshbrltLlNOqxsgLc2t8Uzyv9jSNLuC9r4-oEVfB2r_GFjg3fcepqRzB392E",
    rarity: "ancient"
  },
  {
    id: "skin-282",
    name: "Victoria",
    weapon: "StatTrak™ CZ75-Auto",
    wear: "Minimal Wear",
    price: 15294.36,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a_s2rfKdlJfSsDX3HlNF6ueZhW2fkk04i5WrXmY2sc3qfPFAlWZd3EOdY4Bi6loCxPu7h51fZjNlGzST5kGoXuTXAF0gA",
    rarity: "legendary"
  },
  {
    id: "skin-283",
    name: "Scarlet Shamagh",
    weapon: "★ Sport Gloves",
    wear: "Factory New",
    price: 86790.13,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_icG2mU0vp5v_VhcDu2kSIrujqNjsGqIC-SalIhW8B2Q7MNs0G9x4W0NeKwtALa3ohEyi2oiCpI5yZo4OcFT-N7rZxgqiT0",
    rarity: "ancient"
  },
  {
    id: "skin-284",
    name: "Eco",
    weapon: "StatTrak™ Galil AR",
    wear: "Minimal Wear",
    price: 13290.9,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWKTztF6ueZhW2exwExw4WrcyImrcHmTbQAlWcQkQudYt0O5lNfgP-nh5AOL3otAziz7kGoXua-HTb4P",
    rarity: "mythical"
  },
  {
    id: "skin-285",
    name: "Autotronic",
    weapon: "★ StatTrak™ Huntsman Knife",
    wear: "Field-Tested",
    price: 10079.65,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-UHViY1OBio-xoQRaygAkopy-KlIb6HifOOV5kFMF1QrMNu0Puw4DvYbnk5Qfc2d5Azyv_3C1O7Hlq4ulRAvcn_qKBiFvfcepq3JPpPWw",
    rarity: "ancient"
  },
  {
    id: "skin-286",
    name: "Bullet Rain",
    weapon: "StatTrak™ M4A4",
    wear: "Minimal Wear",
    price: 18655,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0PC7ZKhoNM-BD26e_uMisbBWQyC0nQlp4GmGydioIH3DPFMjDMd2QrQO5hDtkNK2Ne_htAXd3d0Uyiiriysb5zErvbh6fsb98Q",
    rarity: "legendary"
  },
  {
    id: "skin-287",
    name: "Damascus Steel",
    weapon: "★ StatTrak™ Skeleton Knife",
    wear: "Minimal Wear",
    price: 20522.45,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-SH1iUwON3o-J8XBa_nBovp3PUm9_7JHOWZ1QjAsN0ELUD5EHpwdGxP7nksQTbgoxEyXj833gf7S1j_a9cBoUrfx8l",
    rarity: "ancient"
  },
  {
    id: "skin-288",
    name: "Boreal Forest",
    weapon: "★ Huntsman Knife",
    wear: "Field-Tested",
    price: 5693.81,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-bF1iWzvxzo_VWTSahkBwrjDGMnYftb3qRaFMmCpokE-YOsRW5xNbjY-ri7gTb2YpDz36o3XtL7H1psecLUfI7uvqAW2HsimI",
    rarity: "ancient"
  },
  {
    id: "skin-289",
    name: "Oxide Oasis",
    weapon: "MP5-SD",
    wear: "Factory New",
    price: 16652.71,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePFSLvWcAFiWzet9pOB7QRa_nBovp3OAmYr_cnLFOlN0A5d4Qu4KtRi6lYG2Mr7n4QCLg48Tm3_-3yxOvSdj_a9cBsgSaNGx",
    rarity: "mythical"
  },
  {
    id: "skin-290",
    name: "Boreal Forest",
    weapon: "★ StatTrak™ Skeleton Knife",
    wear: "Field-Tested",
    price: 11476.79,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-bF1iWzvxzo_VWTSahkBwrjDGMnYftb32fPFIkDZV4EeJbskTpxt2yN-6wtQCIjY1GnyWriyIauCxv4LtQAvY7uvqAMerubhQ",
    rarity: "ancient"
  },
  {
    id: "skin-291",
    name: "Containment Breach",
    weapon: "AWP",
    wear: "Minimal Wear",
    price: 17600,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JkMuWAMWuZxuZi_rQ6SXq1xURysj_Vw4uhJHOVPQ8oCZt4QrRbtRi6ldPlPu_g4FHaiYNbjXKpcPI_17A",
    rarity: "legendary"
  },
  {
    id: "skin-292",
    name: "Global Offensive",
    weapon: "M4A4",
    wear: "Minimal Wear",
    price: 1497.84,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0PG9b6tSI_GeAVicyOl-pK89HijjkU534mTRw478IirEOgUhXpshQrMK4xW9x4biYrvnsgDd3ohA02yg2Z7zUK8D",
    rarity: "uncommon"
  },
  {
    id: "skin-293",
    name: "Temukau",
    weapon: "StatTrak™ M4A4",
    wear: "Well-Worn",
    price: 2497.11,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSNPWeG2yR1NF6ueZhW2ewlBtx5W6AmYv9JS6XaAV1CJEmTeUL4UTpxNzjZO3jtgaIjN9ExCuskGoXuRnyRhBA",
    rarity: "legendary"
  },
  {
    id: "skin-294",
    name: "Fizzy POP",
    weapon: "M4A1-S",
    wear: "Factory New",
    price: 2000,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H-ODMXOVwuZ4v_ZoXRahkBkYvzSCkpu3JyqVagUhX5Z2QOYMs0a4lYHmMOjn7gCN2YwQyX6r3HhO5i464b1RA71lpPPi0vWs1A",
    rarity: "uncommon"
  },
  {
    id: "skin-295",
    name: "Crimson Web",
    weapon: "★ Specialist Gloves",
    wear: "Minimal Wear",
    price: 27959.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJp-RrXBahkBkYvzSCkpu3JyiSbAQkC8d1E7YJtEXtkIazMruz4lOP3dpGmCyt23hA731v4LkKAL1lpPOyoS0Ibw",
    rarity: "ancient"
  },
  {
    id: "skin-296",
    name: "Tiger Tooth",
    weapon: "★ StatTrak™ Nomad Knife",
    wear: "Factory New",
    price: 17447.96,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GdMXOZxutkj-57Tie0kCIrujqNjsGsIH-WOlUnCpp3FOAMshe-xNHgZe20slPX2YNFn336iy1L6Stp47oET-N7rXiT8mY0",
    rarity: "ancient"
  },
  {
    id: "skin-297",
    name: "Urban Masked",
    weapon: "★ Stiletto Knife",
    wear: "Factory New",
    price: 40329.8,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-AHliEwP5zj_R7TSi9qhEutDWR1Niud3ufbFMpA8B0TeNbuxW6w9PuP-_ntlTWi9oUnir5j35K5ypq67wcEf1y6MY6rfc",
    rarity: "ancient"
  },
  {
    id: "skin-298",
    name: "Blackbook",
    weapon: "★ Specialist Gloves",
    wear: "Well-Worn",
    price: 26120.78,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V6NhL-aWMXSAxO1_se1gXD2Mkg8mtTuMjobGIyfGPV1PVssnHaMUthC9l9e2Mei25wTajN5EziT_2CodvSxs5ugBWKp2rvDX2Q6QMOc8tI5DeqjzpbB7FA",
    rarity: "ancient"
  },
  {
    id: "skin-299",
    name: "Hazard",
    weapon: "MAG-7",
    wear: "Field-Tested",
    price: 1692.12,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wjFL0PqvcqV_JM-RHGaGztF6ueZhW2flxR8ksDvcnt_7JC7DaQUgA5FxQe8I50TsmobhMe2041SI2dpFySWrkGoXuaG6AS0C",
    rarity: "uncommon"
  },
  {
    id: "skin-300",
    name: "Poseidon",
    weapon: "M4A4",
    wear: "Factory New",
    price: 197890.37,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0OKhe6FkJP-dMWuZxuZi_uM9Sn23xkx_sG3VyNyqcnnFZgchDMYjQuMJtRHuw9PvZuPjtlCI3d9bjXKpHL2aoaM",
    rarity: "mythical"
  },
  {
    id: "skin-301",
    name: "Doppler",
    weapon: "★ StatTrak™ Navaja Knife",
    wear: "Minimal Wear",
    price: 23999,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWTSWylhY3tjyXlrD0IDnFMlN5QMckKrtT5Uj8jILvNu7r4VfZj4gTySX_33gc6i5r475RBPAh_vKBjQrIZ7Q45sEHJ_y5DUPZghIomjw",
    rarity: "ancient"
  },
  {
    id: "skin-302",
    name: "Bulldozer",
    weapon: "MP9",
    wear: "Minimal Wear",
    price: 24126.08,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f7i1k9veiZKt6H_yaCW-Ej-tztbQ5Hy2wxklw5TiDnt_4eC_GOFR1XJdzQ-AMskXswNbvNuvq4wPAy9USwXKj73o",
    rarity: "rare"
  },
  {
    id: "skin-303",
    name: "Gamma Doppler",
    weapon: "★ Shadow Daggers",
    wear: "Minimal Wear",
    price: 10196.28,
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD4eOzmYWZlvvwDLbQhGld7cxrj-3--YXygED6-0VsYz-hJNKcIwM8aQ3XqFi7l7_ngpHquJ7LyyZl6SQg5iqInRK0hQYMMLJWkXxH2Q",
    rarity: "ancient"
  },
  {
    id: "skin-304",
    name: "Night",
    weapon: "★ Gut Knife",
    wear: "Battle-Scarred",
    price: 4857.55,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRe6tSLvmUBnOvzedxuPUnF3C3l0p25mvQz4r7c3ueag91DpclRrFc5kaxk4e2Y7zi4VOIg4hFmTK-0H3lwmjDRw",
    rarity: "ancient"
  },
  {
    id: "skin-305",
    name: "Scorched",
    weapon: "★ Talon Knife",
    wear: "Field-Tested",
    price: 17500,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMXSA_up3oPFlSha_nBovp3ODydepeCqeOwBxC5NwQ-NZ5BDswIKxP7y04wzdgt9NzC_33XlBuChr_a9cBq0veVHG",
    rarity: "ancient"
  },
  {
    id: "skin-306",
    name: "Urban Masked",
    weapon: "★ StatTrak™ Gut Knife",
    wear: "Battle-Scarred",
    price: 6323.87,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRe7RSNPGDC1iF0-x3vt5lRi67gVN0t2WGz9z8cHufa1IpX5skQbJbuxHtl9KxZu7ntgWM3o8Uziishi5J8G81tIA_RSBn",
    rarity: "ancient"
  },
  {
    id: "skin-307",
    name: "Faded Zebra",
    weapon: "StatTrak™ M4A4",
    wear: "Well-Worn",
    price: 370,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFL0OirarZsI_GeMWWH_uJ_t-l9AXu3zBkhsDyHz4z9dXmVagJzW8MiQbFetBfrkNHhZbjr51CMiN8TyS_gznQeEoYBjXk",
    rarity: "uncommon"
  },
  {
    id: "skin-308",
    name: "Ice Coaled",
    weapon: "StatTrak™ AK-47",
    wear: "Field-Tested",
    price: 814.04,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-UGm-Zz-llj-1gSCGn2x4l5z_RyNj6JXnEbgFzXMYjEOUIsBe5m9exP-zg4leMj4pGxXn7jCJXrnE84asPq_0",
    rarity: "mythical"
  },
  {
    id: "skin-309",
    name: "Evil Daimyo",
    weapon: "M4A4",
    wear: "Factory New",
    price: 966.24,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSJeaaAliUwOd7qe5WQyC0nQlp4GqGz42ucCqXaQMhDpd4R-AIsxK6ktXgZePltVPXitoRn3-tjCgd6zErvbijVJZd2Q",
    rarity: "rare"
  },
  {
    id: "skin-310",
    name: "Atheris",
    weapon: "AWP",
    wear: "Field-Tested",
    price: 412.22,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JkMPWBMWuZxuZi_rZsS3zgzU8isW3dnIr6eHKfPVAhDpojEe9YsUW4xta1Nuzm5FDci4NbjXKpmWVQppo",
    rarity: "rare"
  },
  {
    id: "skin-311",
    name: "Crimson Web",
    weapon: "★ StatTrak™ Stiletto Knife",
    wear: "Battle-Scarred",
    price: 20449.96,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-bF1iHxOxlj-1gSCGn2xl-426HnourJHKWaQYkDpt5FLMKuxW4m9bvNO7k4ALYjIxNxH77iHxXrnE8aQrZRtQ",
    rarity: "ancient"
  },
  {
    id: "skin-312",
    name: "Damascus Steel",
    weapon: "★ Huntsman Knife",
    wear: "Factory New",
    price: 10296.15,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SH1iUwON3o-J8XBbqxSIrujqNjsGpIn_GbA8pA5J5Q7Jesxm5w9flZezi5FHXgo9Fzy_2iX8c7yhu47oCT-N7rcl4-qvl",
    rarity: "ancient"
  },
  {
    id: "skin-313",
    name: "Toy Soldier",
    weapon: "Nova",
    wear: "Minimal Wear",
    price: 542.52,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiFO0PyhfqVSNP-KMXSfzep_tfNWQyC0nQlp42zVytutcCmTZgchW5omTbNc5ka8l9XvM77jtACL34lBm3__iShI6TErvbjr52W2-A",
    rarity: "rare"
  },
  {
    id: "skin-314",
    name: "Crypsis",
    weapon: "FAMAS",
    wear: "Battle-Scarred",
    price: 17.76,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I_82oaalsM8-UBmiD1dF_vvJsTD2gqhEutDWR1IyudXKSOFIkC8QhTbEK5kK8x9C2NOK3slbYg48Rnyr_hixI6i85sr0cEf1yzP52oWI",
    rarity: "uncommon"
  },
  {
    id: "skin-315",
    name: "龍王 (Dragon King)",
    weapon: "M4A4",
    wear: "Well-Worn",
    price: 1649.55,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSIf6QC3SE0-96j-1gSCGn20x062mAwtb8cX3CaAMoApV3EeFZ50Wwk9fuM-vqtAHW3opHn3iqiSxXrnE8PytIGFg",
    rarity: "mythical"
  },
  {
    id: "skin-316",
    name: "Tornado",
    weapon: "M4A4",
    wear: "Well-Worn",
    price: 836.89,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFU0OaheqpsJP-sAm6Xyfo4secwGX3llEp3sT_dwtz4IH3GZgchD8AmTeUP5hO8lIG0Zuji5VTWipUFk3sAwQa4aw",
    rarity: "common"
  },
  {
    id: "skin-317",
    name: "Doppler",
    weapon: "★ StatTrak™ Butterfly Knife",
    wear: "Factory New",
    price: 222521.84,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2qvxeFmoO1sXRajnRw0tm-6mLD1KCzPKhh2DMckEeYNshC6koe1Munq5AbbitgTyyX6jixL7i5qteYLA6Mh-vWGkUifZkSF3e67",
    rarity: "ancient"
  },
  {
    id: "skin-318",
    name: "Boreal Forest",
    weapon: "★ Ursus Knife",
    wear: "Factory New",
    price: 10905.6,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tlOc-VAXWV0vpJsu57Sii_qhEutDWR1I2uJS-QZ1IhCJB2TOcOt0PuwNPvM-3k4VSMi4sQzCysiSxP73xi6-0cEf1y17OWkH8",
    rarity: "ancient"
  },
  {
    id: "skin-319",
    name: "Drop Me",
    weapon: "Negev",
    wear: "Well-Worn",
    price: 5,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2gbaNoNs-QAmKR09Flu_hWQyC0nQlpsDnVy4mpcSiQOlB2CJRxR-AK4BDrw4azN-225lfc2t0Tznr6iX4f6zErvbg1B8-kIw",
    rarity: "uncommon"
  },
  {
    id: "skin-320",
    name: "Slalom",
    weapon: "CZ75-Auto",
    wear: "Minimal Wear",
    price: 950,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2vard5MvGQGliHyeditd5qVRa_nBovp3Pdzt3_eSqUOA4hDpB1EbQPshXqkdPmPrm04APXjdhExXis2C1N7io9_a9cBtMaUZjs",
    rarity: "rare"
  },
  {
    id: "skin-321",
    name: "Autotronic",
    weapon: "★ Butterfly Knife",
    wear: "Well-Worn",
    price: 60963.86,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsCXSvw_tipOR7SSWqqhwypzKRiID3KCj4Ml93UtZuROIDtUawltG1N-Pj4gaMg98Xyy2q2CxN63k54uwHBfd0-_GEhwHBOap9v8dVISN0PQ",
    rarity: "ancient"
  },
  {
    id: "skin-322",
    name: "Crimson Web",
    weapon: "★ StatTrak™ Ursus Knife",
    wear: "Battle-Scarred",
    price: 13999,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tlOc-EC2WD_uJ_t-l9ASzrwRt14WXTmNqrIy-eaAIoCpdyQuYJtxHuwNyyZe_m5wHb39lCmSTgznQedPIzvI4",
    rarity: "ancient"
  },
  {
    id: "skin-323",
    name: "Slaughter",
    weapon: "★ Talon Knife",
    wear: "Minimal Wear",
    price: 44500,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWad_vRzsvNocCW6khUz_W-Gy4n9cC3BOwIhA5t2ELFbuhm8x9LhYevq5AzZ3tkUmyr42HtIvXp1o7FVC_3pdDk",
    rarity: "ancient"
  },
  {
    id: "skin-324",
    name: "Rising Skull",
    weapon: "StatTrak™ Nova",
    wear: "Well-Worn",
    price: 937.8,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiFO0OGlfahhH_6cGGavzedxuPUnSSy3wEV-4miHyt__eHKSOA4pA5JxE7UJ5kO9l4HmZuixtgHZgoMTyDK-0H1FVu2S0A",
    rarity: "rare"
  },
  {
    id: "skin-325",
    name: "Thermal Currents",
    weapon: "PP-Bizon",
    wear: "Battle-Scarred",
    price: 0.5,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1T9veRb6FiIvmBCnSv0vt4ouh6Sha_nBovp3PRmdysdHLCZwUjDsB1FOcJ4BW4mobhZu3q7wyKj4MTzCj2jHhJu30-_a9cBrr9UcuO",
    rarity: "common"
  },
  {
    id: "skin-326",
    name: "Scorched",
    weapon: "★ Classic Knife",
    wear: "Field-Tested",
    price: 6595.81,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRe7RSJPGDHmuV_uJ_t-l9AXrhxR4h5mvdzoyhJS2VbAQoC5ZwTOYL5xmxxtXvZOmxtFTZg45FmC7gznQeWPC0gg0",
    rarity: "ancient"
  },
  {
    id: "skin-327",
    name: "Monkey Business",
    weapon: "Five-SeveN",
    wear: "Field-Tested",
    price: 904.56,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-NoQSi9lCIrujqNjsGheXmXPQcoWMFzEO5ZtUOwkILjY7yzsg3ci91DySiohn4buCht4eYET-N7rZVO80Su",
    rarity: "mythical"
  },
  {
    id: "skin-328",
    name: "Bloomstick",
    weapon: "StatTrak™ Nova",
    wear: "Field-Tested",
    price: 2285.82,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiFO0OG-eq1jJ8-dAXGR_uJ_t-l9AXDrxU4msD_UzN2qIy6Va1chXJJxFu8OtBO5l9fjZLnh4wXd3olBmCzgznQeBg5SBVo",
    rarity: "mythical"
  },
  {
    id: "skin-329",
    name: "Doppler",
    weapon: "★ StatTrak™ M9 Bayonet",
    wear: "Factory New",
    price: 84099.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWad_up5oPFlSjuMhRUmoDjWpYPwJiPTcFBzDcQhFuJf4BiwmtzmP7iw5QXc3YsUzn6oiikauCg44uoEAqQl_6bJz1aWfAW50lg",
    rarity: "ancient"
  },
  {
    id: "skin-330",
    name: "Kitbash",
    weapon: "MP5-SD",
    wear: "Factory New",
    price: 177.44,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePF-JM-ED3SExOJ3vuVWQyy0lB4-jDGMnYftb32XZ1NyX5B5QuJcthi7k9K0Ye6zsQeP2IMRyiX4iSJLvC5q6-4HUaY7uvqAsG-atjE",
    rarity: "rare"
  },
  {
    id: "skin-331",
    name: "Polysoup",
    weapon: "M4A4",
    wear: "Well-Worn",
    price: 790.88,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFU4M2-Z6h0M_-GHlidle8ij-1gSCGn2x904j7dntz4eX6UOlcmCZFwQLIL4Ri7ktexMePg4Q3ZiIIQmyv6inxXrnE8bylol6Q",
    rarity: "rare"
  },
  {
    id: "skin-332",
    name: "Crimson Web",
    weapon: "★ Flip Knife",
    wear: "Battle-Scarred",
    price: 14590,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6x0H-eWDHSvzedxuPUnTn6wkEgksm7Rzon4JXOXOwYnD5oiELMP4EWww9LuN-zq5wKLgtoUzTK-0H1-4rT4QQ",
    rarity: "ancient"
  },
  {
    id: "skin-333",
    name: "Pilot",
    weapon: "Desert Eagle",
    wear: "Battle-Scarred",
    price: 6654.98,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7uOReK1hL-SsCmKRxuJzj-1gSCGn2x8jtWncyIupJH2TPwYlCJZyF-Rct0XplNfiYuy2tAeIiItEz36ointXrnE8Ks-4_Fs",
    rarity: "rare"
  },
  {
    id: "skin-334",
    name: "Deep Relief",
    weapon: "M249",
    wear: "Field-Tested",
    price: 90.56,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wiFO0P_8PP1SJPWWHliCxOJ_tedWQyC0nQlp5DzUzIyqcnyQOAckWJckQu8KuhnpkdPgNu-0tgTYio5Eny2shnsd7TErvbi9QVp9bQ",
    rarity: "uncommon"
  },
  {
    id: "skin-335",
    name: "The Fuschia Is Now",
    weapon: "CZ75-Auto",
    wear: "Factory New",
    price: 3995.24,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s2ofbduKPmSMWuZxuZi_uM-Sn_hlhgi4D_RnImrJC3COFIoApB3FLUP4RS9mtSzYu_r7wHZjopbjXKpFZZFzGk",
    rarity: "mythical"
  },
  {
    id: "skin-336",
    name: "Oxide Blaze",
    weapon: "Desert Eagle",
    wear: "Battle-Scarred",
    price: 33.06,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKF-JeKHMWKRxuJzj-JmXTu8kRgpjDGMnYftb32UPwJxDJokRuUIsRi_lNPhM7izsgXZi49GySiq2nxNuCdttbtUB_A7uvqAjSk2l_c",
    rarity: "uncommon"
  },
  {
    id: "skin-337",
    name: "Ultralight",
    weapon: "StatTrak™ Negev",
    wear: "Minimal Wear",
    price: 15.24,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2gbaNoNs-GAnOCwOJ_t-l9cCW6khUz_WSAnNj_cX6VZlQlX8Z0TeVc4RG5w4ayM-2w5wzYidhGyXr-iC0f6Cl1o7FVuI8WfEM",
    rarity: "uncommon"
  },
  {
    id: "skin-338",
    name: "Gamma Doppler",
    weapon: "★ Huntsman Knife",
    wear: "Minimal Wear",
    price: 22182.51,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SA1iXwON7sd5tQDmjmRg1jC2Nm5z8cBTLN1F4Tox4R7JZs0bsldLnMurg5VfWg4wUyyn72yhIuiY6tu1UBaAlrKDT2Q3HL_Rjtkcw7QQm",
    rarity: "ancient"
  },
  {
    id: "skin-339",
    name: "Metallic DDPAT",
    weapon: "MAG-7",
    wear: "Factory New",
    price: 11.88,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiNW0Oe8aqVjH_yaCW-Ej7ch5bQ_GiqxlBxy422Bwt2seCjEbVMkX5J2R-8J4RPsx9bkNO7jtgLAy9USmH-e5kI",
    rarity: "common"
  },
  {
    id: "skin-340",
    name: "Stone Cold",
    weapon: "Galil AR",
    wear: "Field-Tested",
    price: 179.9,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMWmZxuZip-hnSBa_nBovp3PSnI2heXqXOwQjDpcmQ-UN5BjrmtexP-rgswDajotBxCz5iyhMui5u_a9cBuYTcBV8",
    rarity: "rare"
  },
  {
    id: "skin-341",
    name: "Syd Mead",
    weapon: "AUG",
    wear: "Minimal Wear",
    price: 891.11,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk7uepV7d0JM-eC2aU_uJ_t-l9AX_rkU9-5j_Ry42qcnuQbw5zCcMhQrINtRO-xIHvY-Ow4gPY2Y4UmSngznQeqqNNbYw",
    rarity: "mythical"
  },
  {
    id: "skin-342",
    name: "Anodized Navy",
    weapon: "Negev",
    wear: "Factory New",
    price: 23974.48,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1a4c2gabJ0H_yaCW-Ej7cu4rJrSXzikUh04G2Em9yteS-SagAkDsQlEOMP4RexldKzM7ix4lPAy9USZWBsgPo",
    rarity: "uncommon"
  },
  {
    id: "skin-343",
    name: "Doppler",
    weapon: "★ Paracord Knife",
    wear: "Factory New",
    price: 17368.42,
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0PzadQJD4eOkgYKSqPr1Ibndk2JL7cFOhuDG_Zi7iwfjrkdpN22mdtPGJ1Q5Zw3XrAPsxb3p0Z_o7c_KzHBj6XEjsH-MmAv3308TscgGJg",
    rarity: "ancient"
  },
  {
    id: "skin-344",
    name: "Blue Steel",
    weapon: "★ StatTrak™ Butterfly Knife",
    wear: "Well-Worn",
    price: 70990,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD3avw-JjteVWQyC0nQlpsmyBwo2tcS-eaFB2XpUjE7Jeuhi_kdfvYerj4FCMgtgUm3732ipM6jErvbi_vJM0jA",
    rarity: "ancient"
  },
  {
    id: "skin-345",
    name: "Jet Set",
    weapon: "AK-47",
    wear: "Well-Worn",
    price: 27433.51,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0OWrZKhSNOKSGGKcxOpJseo9GBa_nBovp3ODydescy_FbVcoDZMkReYP4xC8w93jY7u35AeK2IhMmC__2itN73pv_a9cBpGGBr1j",
    rarity: "mythical"
  },
  {
    id: "skin-346",
    name: "Full Throttle",
    weapon: "StatTrak™ M4A4",
    wear: "Factory New",
    price: 36970.48,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwi8P7qaRe69_MuKHMWCCxOt4j-1gSCGn20kk4mSHn97_eXqTOgMkXpdzR-MNsxO7w9e2Yrnk5VbciIhDznj8iy9XrnE8J4rQ87g",
    rarity: "legendary"
  },
  {
    id: "skin-347",
    name: "Forest DDPAT",
    weapon: "★ StatTrak™ Ursus Knife",
    wear: "Battle-Scarred",
    price: 10027.07,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tlOc-XCneR1dF6ueZhW2fqxU0ktmTTytugdi_CZ1ckDZYiRO8Muka-kYXiZuri4wTdjIJDyHr9kGoXuTEenuE-",
    rarity: "ancient"
  },
  {
    id: "skin-348",
    name: "Black Laminate",
    weapon: "★ Huntsman Knife",
    wear: "Minimal Wear",
    price: 7029.52,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-UHViY1OBio-xoQRaxmRwkuAKJm4LwLyrTO2l8U8UoAfkJ5kTsmtfvNe7mswOL3YNByX_9338Y7ig44-cEV_Yk_PGBjgnCZeY7_9Bdc4dD_RHM",
    rarity: "ancient"
  },
  {
    id: "skin-349",
    name: "Crimson Web",
    weapon: "★ Huntsman Knife",
    wear: "Battle-Scarred",
    price: 9998.57,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-bF1iHxOxlj-1gSCGn20V24znRw4v7JXPEaVUnW8AkQbUP5xW4wYKzMeu3sgPbio4WzXr_3HxXrnE84qvZFNo",
    rarity: "ancient"
  },
  {
    id: "skin-350",
    name: "Rust Coat",
    weapon: "★ Survival Knife",
    wear: "Battle-Scarred",
    price: 3889,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsMc-AGmKVzdF9vuhvSha-kBkupjDLn9ytc36QZwByCJpwE-4I4UW9kNy0NO3mtQHdj4xFxSr6j35Lu35s6vFCD_SeoZUIGw",
    rarity: "ancient"
  },
  {
    id: "skin-351",
    name: "Interlock",
    weapon: "Nova",
    wear: "Well-Worn",
    price: 2700,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwipC0OSrerBkJ_-aAmuF0ud5vt5wSiW_mgoYvzSCkpu3dXOTPw5xDcQkROde4Ra6x4biZOi3tQLfiIJMyCz72ihA63tt5esFWb1lpPMXduS-Jw",
    rarity: "uncommon"
  },
  {
    id: "skin-352",
    name: "Moon in Libra",
    weapon: "Nova",
    wear: "Minimal Wear",
    price: 585,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwipC0OihbK1sI6GsAm6Xyfo4tLhoHy_rx0ol6z-Hw4v8Ii2VOgIgCcd0E-QCu0W9lNPiYu_rtVSPjpUFk3ueOYGM7w",
    rarity: "common"
  },
  {
    id: "skin-353",
    name: "Safari Mesh",
    weapon: "★ Shadow Daggers",
    wear: "Well-Worn",
    price: 3700,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV7d9H_2WHW-v1e94j-1gSCGn201xtj7dn96hJCmTOlcjCMclELUMtEW5lYDkNum351aLjo5Gynj62ytXrnE8619lrZ4",
    rarity: "ancient"
  },
  {
    id: "skin-354",
    name: "Luxe Trim",
    weapon: "AUG",
    wear: "Factory New",
    price: 308.41,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_Ddc0OK7bqJoMs-fB2CY1aAntOUwSivrwksmtTyBnI2udijFZ1cmDZt0QeUCsRG7xoWzNu3r5gPelcsbmlZvKhNj",
    rarity: "uncommon"
  },
  {
    id: "skin-355",
    name: "Twin Turbo",
    weapon: "Dual Berettas",
    wear: "Field-Tested",
    price: 225.24,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s2qfaVhH_WfB3OV0tFkse1lVha_nBovp3OHytv8JCnBbAF1X5MjR7UPsBfrmoHuNr7nsgbfjdlAxSr63CIfuChr_a9cBiuNovOB",
    rarity: "mythical"
  },
  {
    id: "skin-356",
    name: "Marble Fade",
    weapon: "★ StatTrak™ Nomad Knife",
    wear: "Factory New",
    price: 21000,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GeMWqR0-x6td5vTi22qhEutDWR1NqsdS6Wa1UpC8cjQ7QJ5BHqx9zjZurgsgfZiYgXn3r7hy8b6yo_5OocEf1y7tM7KOE",
    rarity: "ancient"
  },
  {
    id: "skin-357",
    name: "Tiger Tooth",
    weapon: "★ StatTrak™ Skeleton Knife",
    wear: "Minimal Wear",
    price: 35865.03,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-SAFiEyOlzot5mXSi9khgYvzSCkpu3dyjBagAlXMB4R-YOt0OxlIe2ZuuztQXdjNhAySn52i5Mv3tj5rlRUb1lpPPHmhG_Tw",
    rarity: "ancient"
  },
  {
    id: "skin-358",
    name: "Yorkshire",
    weapon: "Nova",
    wear: "Well-Worn",
    price: 24.53,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiVI0OCneLRhJc-dAXGR_uJ_t-l9AXHqx0l0526Bwtz7IHzDaFJxDsAhRbQDuxPtltTiYe234g3fg4xEzH7gznQe4s_Y0gw",
    rarity: "uncommon"
  },
  {
    id: "skin-359",
    name: "Sheet Lightning",
    weapon: "M4A4",
    wear: "Factory New",
    price: 1028.53,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFL6s2iYaNlNP6aAGCvzedxuPUnSiuxw0x06mjUzt2teX2QPQQkXMQmR7EK4EG9mtyzNr62tlbb2YpHzTK-0H1YrMl7BA",
    rarity: "rare"
  },
  {
    id: "skin-360",
    name: "Shredded",
    weapon: "MP9",
    wear: "Factory New",
    price: 74.47,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f9Tte0OKnZq9SNPmUC3WvzedxuPUnGCiyxB4ksDzdz4qpeS-UZ1clXsBwTOFc5BO_kdPlNOnl5wOL2IJGyzK-0H3-TFWDqQ",
    rarity: "uncommon"
  },
  {
    id: "skin-361",
    name: "Chantico's Fire",
    weapon: "M4A1-S",
    wear: "Field-Tested",
    price: 8882.39,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj_JmWiWnlBYioQKJk4jxNWXFZ1IgC5MiQuZeuhK4wIXnMuPhslCM2oMTxH75hnxK6Htjse4BVqd25OSJ2DU2Q_CD",
    rarity: "legendary"
  },
  {
    id: "skin-362",
    name: "Desert-Strike",
    weapon: "StatTrak™ Negev",
    wear: "Field-Tested",
    price: 25.84,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2gbaNoNs-HB3ORz_1iv_NkcCW6khUz_WnUz42tI3-WOw5zDpAmQOQD4ELskoDlMeni4gTWjoNNmSj_33kcvC51o7FVXp6G1h4",
    rarity: "uncommon"
  },
  {
    id: "skin-363",
    name: "Forest DDPAT",
    weapon: "★ StatTrak™ Falchion Knife",
    wear: "Minimal Wear",
    price: 10991.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-bF1iUxf53pN5lRi67gVMksWuHntutdi_Cb1IlCZFwROYMuxmxloGyY77msQCNiNhNm3j-2CIa8G81tBGTV0lI",
    rarity: "ancient"
  },
  {
    id: "skin-364",
    name: "Gamma Doppler",
    weapon: "★ Shadow Daggers",
    wear: "Factory New",
    price: 8900,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6VgH_eSA2qR_up5oPFlSjuMhRUmoDjXpYPwJiPTcAQnD8YhTbML50btkobnNu7m5ACL2owRzHj62igYvy1q5-tRUaEt-KbJz1aWfS6Wzvg",
    rarity: "ancient"
  },
  {
    id: "skin-365",
    name: "Djinn",
    weapon: "FAMAS",
    wear: "Field-Tested",
    price: 907.14,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a_s2oaalsM8-ZB2me_uJ_t-l9AXzhwxt-5TiAzdmgd3yeaQ50DZRxEe5b4BXrm4HkPr7kslfcg9pCznjgznQepOOy8CM",
    rarity: "mythical"
  },
  {
    id: "skin-366",
    name: "Tigris",
    weapon: "CZ75-Auto",
    wear: "Minimal Wear",
    price: 232.16,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2tP_FsbeSaCWKC_uJ_t-l9ASvil0R15WjUmYmqc33CaQ91W5QlRbVetETtwNC1P-u34g2L2dpEmS_gznQebcVQ6rs",
    rarity: "rare"
  },
  {
    id: "skin-367",
    name: "Night Ops",
    weapon: "PP-Bizon",
    wear: "Minimal Wear",
    price: 6.15,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1T9s24abZkI_GeAVieyOl-pN5lRi67gVMk4Gvdy439eS3DPFUgXpp3Qu5btESxm4LnZbmxtAPdg90WmySqinxN8G81tMa6T4nf",
    rarity: "common"
  },
  {
    id: "skin-368",
    name: "Lore",
    weapon: "★ StatTrak™ M9 Bayonet",
    wear: "Minimal Wear",
    price: 66657.97,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWSF_uMvj-NoVha_mg8ijDGMnYftbyrBOw52D5R0FOYPtkG6ltOxNrjl4FPdiN0WzC723SxP6ypp6u8LVKY7uvqAFpeI3XY",
    rarity: "ancient"
  },
  {
    id: "skin-369",
    name: "Forest DDPAT",
    weapon: "★ StatTrak™ Talon Knife",
    wear: "Field-Tested",
    price: 20400,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMW-J_upyoOB9cCW6khUz_WTQn9iqdXjDOwEjDsdyQuQC5BHpkNyxML_i5Abeio9Cyy362H9N7yZ1o7FVCmRPBKA",
    rarity: "ancient"
  },
  {
    id: "skin-370",
    name: "Case Hardened",
    weapon: "MAC-10",
    wear: "Minimal Wear",
    price: 2140.92,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a_s2hYahoJM-fB2CY1aAituJtTnvjkUx3tziGmd6hJy-VZlAoWZtwFLRZ5EbpwNLvYb-zsgOKlcsbmn9_3b1O",
    rarity: "rare"
  },
  {
    id: "skin-371",
    name: "Plague",
    weapon: "AUG",
    wear: "Well-Worn",
    price: 59.97,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk7uepV7RhIfeGC1icyOl-pK8_GH7hzUx04WSByNj4JXuRaQJzXJclEO8MthHpl9DhYejjtAeL2YMU02yg2aipyCXk",
    rarity: "uncommon"
  },
  {
    id: "skin-372",
    name: "Case Hardened",
    weapon: "★ StatTrak™ Flip Knife",
    wear: "Field-Tested",
    price: 16526.3,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6V8H_-aAmKU_uJ_t-l9ASu2l0Qj4m7cnNf6JSqSZgAhA5NzFOALsBbrkILuPu625AXcjdpGz33gznQe1ZCqub0",
    rarity: "ancient"
  },
  {
    id: "skin-373",
    name: "Asiimov",
    weapon: "AK-47",
    wear: "Well-Worn",
    price: 3374.3,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIeOaB2qf19F6ueZhW2e2wEt-t2jcytf6dymSO1JxA5oiRecLsRa5kIfkYr-241aLgotHz3-rkGoXuUp8oX57",
    rarity: "legendary"
  },
  {
    id: "skin-374",
    name: "Scorched",
    weapon: "★ StatTrak™ Ursus Knife",
    wear: "Minimal Wear",
    price: 8195.73,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5t-MM-XD3eAzetJvOhuRz39zUgjtTvQyYz8ci6TPARzCZtyELILuhbsltazMOm04AHXiYJMziytjjQJsHj5P22EGw",
    rarity: "ancient"
  },
  {
    id: "skin-375",
    name: "Teardown",
    weapon: "FAMAS",
    wear: "Battle-Scarred",
    price: 23.82,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I_82jbbdlH_icGliRz-pJs-5lSxa_nBovp3PQw9r9cXuQZwMjXMF0E7YN4ES9loflPu_htQTX3otGyS3_iCNP6ixq_a9cBmFkCHH9",
    rarity: "uncommon"
  },
  {
    id: "skin-376",
    name: "Doppler",
    weapon: "★ Flip Knife",
    wear: "Minimal Wear",
    price: 29233.84,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6VgH_ScHnecxPxJoOloXCzhqhEutDWR1NesJX_BPQV0CsckQeMLtRbrlNOzY-3i41DbitlEzyv2jiob6CZt5ekcEf1ySivHiG0",
    rarity: "ancient"
  },
  {
    id: "skin-377",
    name: "Ultraviolet",
    weapon: "★ StatTrak™ Skeleton Knife",
    wear: "Field-Tested",
    price: 17874.39,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-AAViA1PxmvORWQyC0nQlp4WTSnN74J3PCOAF0A5V3R-ACsUS6kYCzYrzk7geI2YlMzS2r2i1NvzErvbhVpSdBEA",
    rarity: "ancient"
  },
  {
    id: "skin-378",
    name: "Night",
    weapon: "★ M9 Bayonet",
    wear: "Minimal Wear",
    price: 41499.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMXSf_uB_t-l9cCW6khUz_WSAnIyrIy6ValInCJNyQeIPtxLtk9DuZr7rsQaI3YkRmyyrh3gc6Cl1o7FVxcznlCA",
    rarity: "ancient"
  },
  {
    id: "skin-379",
    name: "Cirrus",
    weapon: "MP7",
    wear: "Factory New",
    price: 2200.1,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf-jFk6fugaahSMP-cAmOVwOpg4t5lRi67gVMj5j6Dwtaocy6UOAIgApNyQrQOshS7lIXlMbvqslHfi41Eyi7823xK8G81tHGGql6L",
    rarity: "uncommon"
  },
  {
    id: "skin-380",
    name: "Urban Masked",
    weapon: "★ M9 Bayonet",
    wear: "Battle-Scarred",
    price: 28000,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMXSA_vp3oORWWjuxlBMYvzSCkpu3dnmQagEhApJwTeENsRW-l4LkZLjh4FbWg91ByiT-jSJB5nk96uwFWL1lpPPSsWRCMw",
    rarity: "ancient"
  },
  {
    id: "skin-381",
    name: "Nightmare",
    weapon: "StatTrak™ M4A1-S",
    wear: "Minimal Wear",
    price: 4891.53,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj-9gSCGnmBw1tgKJk4jxNWXCbAUpXpp0FrYPthC7k4fnZOm04laMjYxHn3r52HxJ6i065e0FVKV05OSJ2IHiKyzQ",
    rarity: "mythical"
  },
  {
    id: "skin-382",
    name: "Scorched",
    weapon: "★ StatTrak™ Skeleton Knife",
    wear: "Field-Tested",
    price: 14928.1,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-AHliUwP5mvORWQyC0nQlp42zQydivIn_EaQFzXpRyFLIDuhe-ldXmZOLg7lSP3dlAmC79hn5N5zErvbgU3gnTIw",
    rarity: "ancient"
  },
  {
    id: "skin-383",
    name: "Scorched",
    weapon: "★ StatTrak™ Gut Knife",
    wear: "Battle-Scarred",
    price: 6600,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRe7RSJPGDHmuV_uJ_t-l9AX-yl0Uj6jvQnoyrcy-TPQd1ApB2E7UIuxWwkoHkMOzjsgXei4pAyXngznQeOP3RS-8",
    rarity: "ancient"
  },
  {
    id: "skin-384",
    name: "Griffin",
    weapon: "StatTrak™ M4A4",
    wear: "Battle-Scarred",
    price: 783.04,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSJ-KaCGGZz9F6ueZhW2e2zERysm3Umdesd3rGald1DpRyQLVbtUa5mtPvYuzrtATeg95EmS2vkGoXuZ5UWeP5",
    rarity: "rare"
  },
  {
    id: "skin-385",
    name: "Doppler",
    weapon: "★ StatTrak™ Falchion Knife",
    wear: "Factory New",
    price: 30316.27,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SA1iUzv5mvOR7cDm7lA4i4QKJk4jxNWXBaAEnX5R0ELJb5EK5moa1MOyw7gSNj4tBnyT4hi4d5idr4O4GA6px5OSJ2IVStUtw",
    rarity: "ancient"
  },
  {
    id: "skin-386",
    name: "Urban Masked",
    weapon: "★ Flip Knife",
    wear: "Well-Worn",
    price: 10000,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V7d9H-SSHmKv1Px0se9WQyC0nQlp5DnWw46pIy2SOwBxW5VwFOcP5hC4x92zM-6ztVbYjtoTmST_iSNA6DErvbgg2ar9PQ",
    rarity: "ancient"
  },
  {
    id: "skin-387",
    name: "Water Sigil",
    weapon: "StatTrak™ PP-Bizon",
    wear: "Factory New",
    price: 401.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1T9s25abBoMs-QHGKD1dF6ueZhW2frwRwh4j7VwoqpdHyWPQcgCpd2TbFYsxC-l4a0Pu2ztA2NgtkUzST-kGoXuZ4FYcbA",
    rarity: "uncommon"
  },
  {
    id: "skin-388",
    name: "Doppler",
    weapon: "★ Stiletto Knife",
    wear: "Minimal Wear",
    price: 45999,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SA1iUzv5mvOR7cDm7lA4i4AKJk4jxNWXBPQ8lCcR2E-QLsRXuwNHuMeiwsQKIjokWm3r2hytIvypp4O4BBaIi5OSJ2HdaKYE7",
    rarity: "ancient"
  },
  {
    id: "skin-389",
    name: "Crimson Weave",
    weapon: "★ Driver Gloves",
    wear: "Factory New",
    price: 219095.87,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t_JfSsAm6Xyfo4trVoSnGxlh9x5DmEzt6rJS2RagYiA5siQ-MLthW9xtDlM7uxtFCNgpUFk3thcTnRAg",
    rarity: "ancient"
  },
  {
    id: "skin-390",
    name: "Black Laminate",
    weapon: "★ StatTrak™ Bowie Knife",
    wear: "Factory New",
    price: 12915.06,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNFxo95rQD66kCIlvzyGkbD1ICbOMFdkX_0sHLBS9g7qx9HhMuyxtA3b3o0Tyij92H4fuy5q675XAPBxrvHVh1nBOeFo5ZYAOr_5Gl4TXifL",
    rarity: "ancient"
  },
  {
    id: "skin-391",
    name: "Blaze",
    weapon: "Desert Eagle",
    wear: "Minimal Wear",
    price: 69983.25,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7vORbqhsLfWAMWuZxuZi_uI_TX6wxxkjsGXXnImsJ37COlUoWcByEOMOtxa5kdXmNu3htVPZjN1bjXKpkHLRfQU",
    rarity: "rare"
  },
  {
    id: "skin-392",
    name: "Damascus Steel",
    weapon: "★ StatTrak™ Talon Knife",
    wear: "Well-Worn",
    price: 29999,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWaB_up3veB6TDygqgoutzKSpYPwJiPTcAYoAsB4E-cIsRXqktKyMOzm4QWL3d4QziT53ykfu3tqtuYHBaJz8qzJz1aWxqN5i4Q",
    rarity: "ancient"
  },
  {
    id: "skin-393",
    name: "Condition Zero",
    weapon: "MP5-SD",
    wear: "Factory New",
    price: 635.77,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePFSI_-dCm6EyOF4quR7QBa_nBovp3PQz93_InrCbAVxCcN5RbNZthm7w9e0Y-q35gbdi49GzX2vjCIf63xr_a9cBnKSfiDi",
    rarity: "uncommon"
  },
  {
    id: "skin-394",
    name: "Motherboard",
    weapon: "MP7",
    wear: "Factory New",
    price: 40.85,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_C9k7Pu8a7FkNPKcD3WU_ulkteRncCW6khUz_T7Wm9-vJHmWbAVzDJZzFuMP5hKwxIDiP7jlsQGI2Y9CzSr_j3tJ6i51o7FV2fbsGVQ",
    rarity: "common"
  },
  {
    id: "skin-395",
    name: "Night Borre",
    weapon: "FAMAS",
    wear: "Field-Tested",
    price: 815.78,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I_82lZqt5M8-RAnKV_uJ_t-l9AXHrxEV-sT-Ez9j7eHuVPQQgXpIhEOQPtxa_wd3gZbnm4QHXi49FxCXgznQeEWoLaGo",
    rarity: "common"
  },
  {
    id: "skin-396",
    name: "Night Terror",
    weapon: "StatTrak™ M4A1-S",
    wear: "Well-Worn",
    price: 162.22,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj-hnXCa-mxQmjDGMnYftby3FPFVxA5ZwRecOtUXuxtPiNL_jsQLc2NkTzS38jC5L7ydj5u8EUKo7uvqAgGSM4LM",
    rarity: "rare"
  },
  {
    id: "skin-397",
    name: "Urban Sovereign",
    weapon: "MP9",
    wear: "Factory New",
    price: 402.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f8DIC0Oe8aqVjH-OcGGKCxOdxvt5lRi67gVMi4m6DmY2hcXLFPAMiA8NxQ-9cshK_m9yyYem04ACLg9hAzH6q239I8G81tD9Ib4M_",
    rarity: "rare"
  },
  {
    id: "skin-398",
    name: "Marble Fade",
    weapon: "★ StatTrak™ Bowie Knife",
    wear: "Factory New",
    price: 18289.75,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5kTjuxmRgYtTyBn7D1KCzPKhgpXMdyTeBb5BPuktPvZOi2sgWM2d9HmSr-i3xAuidssO8HBKcsrvLXkUifZhxP_T8X",
    rarity: "ancient"
  },
  {
    id: "skin-399",
    name: "Night Stripe",
    weapon: "★ StatTrak™ Ursus Knife",
    wear: "Battle-Scarred",
    price: 8902.59,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5t-MM-dB2CY1f1iouh5Sha_nBovp3Pdmd-qJ3rFZwclA5AlEbINsUS9ltbhM-6xtQHfit4UnC__hylB6Xpp_a9cBpOKr6LC",
    rarity: "ancient"
  },
  {
    id: "skin-400",
    name: "Doppler",
    weapon: "★ Survival Knife",
    wear: "Minimal Wear",
    price: 19950,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsLc-XAXeAzetkj_FhTjq2wSIrujqNjsH_J3jDZlV1AsAmE-QNtxG6koCxY-mx41bcjo9CnC35inkb6C06tb5QT-N7rTRepqpg",
    rarity: "ancient"
  },
  {
    id: "skin-401",
    name: "In Living Color",
    weapon: "M4A4",
    wear: "Minimal Wear",
    price: 4311.89,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSLP-FC1icyOl-pK84GH2wxhty4DjcyNuhdHyXbAVxW8QjTbEMthC8kNa0MLmzs1Hbj95E02yg2bbWGcKW",
    rarity: "legendary"
  },
  {
    id: "skin-402",
    name: "Urban Masked",
    weapon: "★ StatTrak™ Talon Knife",
    wear: "Minimal Wear",
    price: 29981.48,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMXSA_vp3oORWWjuxlBMYvzSCkpu3Ii2TbwEjCZpzTOUIskawlYCxN7nisg2I2olAmyqrhy4duC5i67wKB71lpPPq3A_5rQ",
    rarity: "ancient"
  },
  {
    id: "skin-403",
    name: "Seabird",
    weapon: "PP-Bizon",
    wear: "Well-Worn",
    price: 449.46,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1I4M2vebFsH-OHA2aCwtF6ueZhW2exxhh-6mWHnI76dn2Sb1MiDsFyQbFZsELtxNTmMerg4VDd2YxAyiqtkGoXuSVM9Bwl",
    rarity: "common"
  },
  {
    id: "skin-404",
    name: "Goo",
    weapon: "StatTrak™ MP9",
    wear: "Well-Worn",
    price: 133.23,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_jdk4uL3V6NiL8-fB2CY1aAv5LYwSn23xE4l5GrXn9aqIH-SZlMiD8MjEbYK4UW_x9TmM-Lh4FHYlcsbmqGCM0DC",
    rarity: "rare"
  },
  {
    id: "skin-405",
    name: "Shipping Forecast",
    weapon: "M249",
    wear: "Battle-Scarred",
    price: 2998.62,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wipC0OihbK1sI6OsAm6Xyfo4s7c4Gnvmx0l0tWjSzoyoeC7BPwUgDsAiQ-cMsROwloG2Y-rr4wfe3pUFk3scMmqwFg",
    rarity: "common"
  },
  {
    id: "skin-406",
    name: "Sand Dune",
    weapon: "MAG-7",
    wear: "Battle-Scarred",
    price: 210.57,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wjFU0OGvZqBSLPmUBnPew-0jtrk6TnDgwEwl4j-GzdqtcHnFPAdxXpMmRLIN5EW8w9KzM-rnshue1dx36R-nYw",
    rarity: "common"
  },
  {
    id: "skin-407",
    name: "Food Chain",
    weapon: "StatTrak™ MP9",
    wear: "Battle-Scarred",
    price: 381.71,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_jdk4uL3V6JiL_SsDW-RyOBJvOhuRz39xB5-sGrTnt2tdymVOFApD8dxQLUCuxWxldLkNezjtVDd2t8Uyy_7izQJsHisCKzN8w",
    rarity: "mythical"
  },
  {
    id: "skin-408",
    name: "Resupply",
    weapon: "StatTrak™ MAG-7",
    wear: "Factory New",
    price: 72.5,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wi9a6KWRaalgL8-RAX-vzedxuPUnTHjgkxwj52SHyImqcX2fO1AhDMNxEe4I4RWwkIXgMO60sQPeiYgQmTK-0H2GsAjMqQ",
    rarity: "uncommon"
  },
  {
    id: "skin-409",
    name: "Agent",
    weapon: "StatTrak™ MP5-SD",
    wear: "Factory New",
    price: 1407.55,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePFSJvKaMWuZxuZi_uU6Gn7glhxytWSAy4uqI3yTbA90WcQkRu4K5BG6x921Nb_q4w3f3YlbjXKpj8G4GlA",
    rarity: "rare"
  },
  {
    id: "skin-410",
    name: "Ultraviolet",
    weapon: "★ StatTrak™ Gut Knife",
    wear: "Battle-Scarred",
    price: 6399.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRe6tSMOWBHmuV_uJ_t-l9ASvhkRhw4GiDnN2hcXrGOAYgDZFwQrVYs0XtxtDgZu3ktVDXiYgRyy3gznQex8McCSA",
    rarity: "ancient"
  },
  {
    id: "skin-411",
    name: "Featherweight",
    weapon: "StatTrak™ MP9",
    wear: "Battle-Scarred",
    price: 20,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_jdk4uL3V7d4MPWBAm6XyfpJvOhuRz39wB9x6jncwtyvd3jBPw8gCJFwR7YItRW8kNK0P--27wLe391NzCyq3zQJsHiOu4WQDA",
    rarity: "uncommon"
  },
  {
    id: "skin-412",
    name: "Crimson Web",
    weapon: "★ StatTrak™ Falchion Knife",
    wear: "Field-Tested",
    price: 12492.38,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-bF1iHxOxlj-1gSCGn20t242-Eno34cC6SOgYoCZZzE-JesxawkIG0Pry24lCKj4IRzn-th3xXrnE8QWIt39g",
    rarity: "ancient"
  },
  {
    id: "skin-413",
    name: "Wave Chaser",
    weapon: "★ Driver Gloves",
    wear: "Well-Worn",
    price: 15000.84,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3Wv0ud6u95tXSi0mhMYpDWMjorGLSLANkI-ApsmQrFbtkPux4bgMuvg7gzWjI0Xnyz-23lI6i5s4bpWUqMl-6PQ2xaBb-Mdlpgj5g",
    rarity: "ancient"
  },
  {
    id: "skin-414",
    name: "Irradiated Alert",
    weapon: "MAG-7",
    wear: "Battle-Scarred",
    price: 300,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wjFL0Py7Y6F-NOKaHmKvw_x5p-9WQyC0nQlp5z7dwtr4JHjEawR0W5J5R-INtBPpwdzvMeK24FHZiotBzSWq3SMa5jErvbi6fRO3ow",
    rarity: "common"
  },
  {
    id: "skin-415",
    name: "Dragon Fists",
    weapon: "★ Driver Gloves",
    wear: "Minimal Wear",
    price: 22698.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3Wvxfx3t-5ncDqwlBEijC-AnrD1KCzPKhgkCZdwTeIL4ES5wdXjPrm251Pdi98QzST3jy0d6nxp4e5QAKsk_q3RkUifZohUdPsK",
    rarity: "ancient"
  },
  {
    id: "skin-416",
    name: "Urban Shock",
    weapon: "Dual Berettas",
    wear: "Minimal Wear",
    price: 249.48,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s2rZK15JeOsG3WSwOBlpO57Qha_nBovp3PQzI6pc3iRZ1cjC5dzQe4CsxPtwdHjMevq41CLjIpMm3_5jypN7Cxp_a9cBoxgoAoS",
    rarity: "rare"
  },
  {
    id: "skin-417",
    name: "Boreal Forest",
    weapon: "M4A1-S",
    wear: "Factory New",
    price: 2369.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_iKMWGf0-tlpN5rQDu2lBEYvzSCkpu3dyqVZgF1CJAhF7NYtULrlIa2M-Lh4wKMiYlDmyqrhygduCZs6-xXV71lpPMY7TF_eA",
    rarity: "common"
  },
  {
    id: "skin-418",
    name: "Control Panel",
    weapon: "M4A1-S",
    wear: "Field-Tested",
    price: 1869,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj-55SjuygRI1jDGMnYftbynDbQBzDcR3ROMI40Hpmt3kP-y271OK3tpFmy7633hJ73xit70GBPE7uvqArjH2yek",
    rarity: "mythical"
  },
  {
    id: "skin-419",
    name: "Red Filigree",
    weapon: "MAC-10",
    wear: "Factory New",
    price: 12633.07,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a4s28bapSMvWXMWuZxuZi_rk6F3DixUt_5W3Vn96odS-fO1N0D8MkQu4NukG4kdbiN7yw5gyLjdpbjXKp1e3DB44",
    rarity: "rare"
  },
  {
    id: "skin-420",
    name: "Sky Mandala",
    weapon: "Galil AR",
    wear: "Battle-Scarred",
    price: 14.62,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3bZtoIeKHBlidwOByse1ocCW6khUz_WzSy42rcS3CbwMkD5Z0TOAOsBDswNfhZu3q5w3ajdpNzSj-ii9P7nl1o7FVbxi6bE4",
    rarity: "uncommon"
  },
  {
    id: "skin-421",
    name: "Gila",
    weapon: "StatTrak™ Nova",
    wear: "Field-Tested",
    price: 127.61,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiNW0PyhfqVSM_GdClicyOl-pK8wHnrrwU8hsW2DyoqgeSieblIkDJZwQu8Cs0TultLgP76051SPid9N02yg2S7-0Sao",
    rarity: "rare"
  },
  {
    id: "skin-422",
    name: "Honey Paisley",
    weapon: "CZ75-Auto",
    wear: "Minimal Wear",
    price: 0.47,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1T9veReKVkM_yWF1iUxP13pN5lRi67gVN2tW3Sntuvd3OROFUoXsB2Q-9Zs0Hqlta0Pujr7waIiYJAxS-sjy0c8G81tBzzAWSY",
    rarity: "common"
  },
  {
    id: "skin-423",
    name: "Scrawl",
    weapon: "StatTrak™ Five-SeveN",
    wear: "Field-Tested",
    price: 50,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-BlXyGyqhIqtjqEpYPwJiPTcAInA5J0FO9csBSww4bhZruzswLcjIsXmCusjCsbuno_57tXUqB386HJz1aW2pI_m5Q",
    rarity: "uncommon"
  },
  {
    id: "skin-424",
    name: "Wildwood",
    weapon: "MAG-7",
    wear: "Field-Tested",
    price: 3.75,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wjFU7PqRf61hJOecAWOvzO9x595lRi67gVN36mzTw9v8cnyRaAZ1XMB2E7MPtkS-lYK2YuOx7gTd3dlDziSqjixB8G81tBJWeXuA",
    rarity: "common"
  },
  {
    id: "skin-425",
    name: "Dart",
    weapon: "MP9",
    wear: "Field-Tested",
    price: 65,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_jdk4uL3V6dlJeaBAWmvzedxuPUnH3_lkRgmtmrVmNn6dC_COFUlWJZwF-df4xW8ktK2N-234QfX2IlMzjK-0H1cH54WRg",
    rarity: "uncommon"
  },
  {
    id: "skin-426",
    name: "Carnivore",
    weapon: "StatTrak™ MAC-10",
    wear: "Battle-Scarred",
    price: 42,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a_s2jaadScaCsD2uZxOBJs-BkQBa_nBovp3PSmdqpcy2fPwEoWMciQLYKtBa9lYDmN-zlsVDXiNpAnnmqiHwcv3w5_a9cBiTJtAYY",
    rarity: "uncommon"
  },
  {
    id: "skin-427",
    name: "Boreal Forest",
    weapon: "★ Bowie Knife",
    wear: "Factory New",
    price: 14990.78,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF-qd5vQDu2hgkYsTKXn471HifOOV5kFJJzE-IJs0K7mtfgN--0tATegt1MmX332nkcvS8557sDB6Bx86XejQ7fcepqCHZuB98",
    rarity: "ancient"
  },
  {
    id: "skin-428",
    name: "Doppler",
    weapon: "★ Flip Knife",
    wear: "Factory New",
    price: 26379.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6VgH_ScHnecxPxJoOloXCziqhEutDWR1Nf6JHmfPw4kDsQkEeBbtRTsw9CyMu_nslPeg4wRmH2qhy9K7nxp4ukcEf1yIYwwFPU",
    rarity: "ancient"
  },
  {
    id: "skin-429",
    name: "Ultraviolet",
    weapon: "★ Flip Knife",
    wear: "Well-Worn",
    price: 10869.78,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V7diH-CGHHecxNF6ueZhW2fqkxghsDmBydb8JXKXO1QgA8F0RO4KshDrkYblZumz5VGLgt9MxSr2kGoXufZKGhe-",
    rarity: "ancient"
  },
  {
    id: "skin-430",
    name: "Stratosphere",
    weapon: "M4A1-S",
    wear: "Battle-Scarred",
    price: 304.28,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGC1iD1fx3pO56XyG2hxgYvzSCkpu3eSjEOgUkDsRxR7RYsRexwNe0Y-O05VeNg90UmX2q33lJ7itvt-cKB71lpPNheQHx2Q",
    rarity: "mythical"
  },
  {
    id: "skin-431",
    name: "Stained",
    weapon: "★ StatTrak™ Flip Knife",
    wear: "Battle-Scarred",
    price: 14284.43,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6V8H_acHGSVxdF6ueZhW2fjkUUk4GzRmNuvcSnFO1MlW5RxR7MItUbskIHnZurl5ALf341Gmy-rkGoXuTDvkImE",
    rarity: "ancient"
  },
  {
    id: "skin-432",
    name: "Tuxedo",
    weapon: "CZ75-Auto",
    wear: "Minimal Wear",
    price: 104.62,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1I4M2heqdsH_yaCW-Ej7lz6Oc9GXC3zEwh4D_VzY36eHvDaQYkXJV3FLMJtEG_kNHiZLmxtAPAy9USE1srPao",
    rarity: "uncommon"
  },
  {
    id: "skin-433",
    name: "Orbit Mk01",
    weapon: "StatTrak™ AK-47",
    wear: "Well-Worn",
    price: 4842.1,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlV6diLP-dFzfB_vxztN5lRi67gVMk4TmEn9n_c3PGPwZyDMckTO8JsEPuktG1ZOrjsgPX2IwUyiyv3S0f8G81tLnuvOvF",
    rarity: "rare"
  },
  {
    id: "skin-434",
    name: "Army Sheen",
    weapon: "MP9",
    wear: "Factory New",
    price: 165,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_C9k7uCjcZt-KPmdC1icyOl-pK9rTCvlwEwhsWzcyYmtJ3iVOFQiW5BxTeNbshjqmoXlN7ni7gfa3Y8T02yg2VdURND-",
    rarity: "common"
  },
  {
    id: "skin-435",
    name: "Bock Blocks",
    weapon: "M249",
    wear: "Minimal Wear",
    price: 17.3,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wi8Ju6uRaqhiI_uAMXeF0_56td5lRi67gVNw4juHnIr_JSmeOwQnXsd1RbZYtkTpkoDjY7nm5Vfci4NDxS__jyoY8G81tOB68LmM",
    rarity: "uncommon"
  },
  {
    id: "skin-436",
    name: "Urban Masked",
    weapon: "★ StatTrak™ Skeleton Knife",
    wear: "Well-Worn",
    price: 14300,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-AHliEwP5zj_R7TSi9qhEutDWR1N3_cnmWOAJzXJVwF-AO4xW8ld3iY-mz4lff399Mzi_7i39M6Cc947wcEf1y1H02ID0",
    rarity: "ancient"
  },
  {
    id: "skin-437",
    name: "Jungle DDPAT",
    weapon: "M249",
    wear: "Well-Worn",
    price: 370,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wipC0PaqeKV5H_qGAGCcxNF0ouB_QBa_nBovp3PXmNqqICqWbwB2ApMiQeFYsEXqmoDiZem37lTfit4WmS3623lB6itr_a9cBmG97jrI",
    rarity: "common"
  },
  {
    id: "skin-438",
    name: "Moss Quartz",
    weapon: "M4A1-S",
    wear: "Factory New",
    price: 14470.02,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GeMWSC2P1ise1lRjO2kSIjsi-OpYjrJC7JAVp5Xco0W7NZsRCwmoCzNbni7lGNi4JMyij3ii9LvS5q4u4KUKIl-ayF2QnBOeYjoc5UYcWIs5E",
    rarity: "common"
  },
  {
    id: "skin-439",
    name: "O.S.I.P.R.",
    weapon: "StatTrak™ M249",
    wear: "Minimal Wear",
    price: 38.98,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wiVI0P_8PP1SI_-eDG6exNF6ueZhW2fhwB53smmAzIr_cy2fa1N0D5J0E-Je4BG_lt22N-63sQLYid0UxCytkGoXuS8jTKqZ",
    rarity: "uncommon"
  },
  {
    id: "skin-440",
    name: "Doppler",
    weapon: "★ Shadow Daggers",
    wear: "Factory New",
    price: 11139.46,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6VgH_ScHnecxPxJoOloXCzgqhEutDWR1N6vJ3yeOw91Dpp1TeMItRK7kYe0Yuyx7gDegtoQzXr43H8Y6Cdt4-ccEf1ysB-0XEk",
    rarity: "ancient"
  },
  {
    id: "skin-441",
    name: "Atomic Alloy",
    weapon: "M4A1-S",
    wear: "Battle-Scarred",
    price: 2144.53,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GeMWrEwL87o95oQyW8jCIooTyLnYrGLSLANkI-D5d2FrENtRG7wNDvZe-3slfci9pFmHj8jSof6yZjtugEB6QtrKTXhxaBb-PhITXxPA",
    rarity: "mythical"
  },
  {
    id: "skin-442",
    name: "Hydroponic",
    weapon: "AK-47",
    wear: "Field-Tested",
    price: 130720.25,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNW0PCvZaZiL8-ZG2mXzetJvOhuRz39lk0m4Dncztz7Jy2fagIoC5t5QeNbskW6xNLgZu-24AXZgt4Xyi_4izQJsHjOr8RS6A",
    rarity: "mythical"
  },
  {
    id: "skin-443",
    name: "System Lock",
    weapon: "StatTrak™ M249",
    wear: "Minimal Wear",
    price: 59.91,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wiFO0P_8PP1SM_WYGmiC_uJ_t-l9AXzhzEt25Wjcn4n4dHKebgMlCMB2RO5b40S-x9TnN-KztFDf3ohDzirgznQedTUXMuU",
    rarity: "uncommon"
  },
  {
    id: "skin-444",
    name: "Boreal Forest",
    weapon: "★ StatTrak™ Flip Knife",
    wear: "Field-Tested",
    price: 9625.7,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6x0H_acHGKD1dF0v_NsTiWMmRQguynLnIuoJXmfb1ciDsR5R-ZfthOwkN3nMryxsw2PiYoUySr63CNLvSts5fFCD_TIli8aVg",
    rarity: "ancient"
  },
  {
    id: "skin-445",
    name: "Scorched",
    weapon: "★ StatTrak™ Flip Knife",
    wear: "Battle-Scarred",
    price: 11699.98,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V7d9H_SSHnecxNF6ueZhW2eywRl3sGzQm46pIy-TPAIpXsEiEO5c40S_kdDlPr6xslCPiYMRniuskGoXuRzTMIE6",
    rarity: "ancient"
  },
  {
    id: "skin-446",
    name: "Freehand",
    weapon: "★ Flip Knife",
    wear: "Factory New",
    price: 10899.37,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6VgH_2SHGyVxdFjoN5lRi67gVMk4Wzdm4r7cCiWPwUjXpt2QrZZ5ESxktLiNbmx4VPdiogTyi_42CxO8G81tO8hlF8A",
    rarity: "ancient"
  },
  {
    id: "skin-447",
    name: "Fade",
    weapon: "★ Specialist Gloves",
    wear: "Field-Tested",
    price: 15800,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJtuBtSha_nBovp3PQy42sdX6eagIjW5AlQOVetBXuk92xNLvg4gOMjd5AmC2ointB53w__a9cBqntWBk3",
    rarity: "ancient"
  },
  {
    id: "skin-448",
    name: "BOOM",
    weapon: "StatTrak™ AWP",
    wear: "Field-Tested",
    price: 15000,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk7f6vZZt-Kf2DAmKvzedxuPUnTX7mkxhy62iDzYqhdiqXbw4oWZEkE-IDsRa9lIXlMejktFOMi49MmDK-0H2AgUnw_w",
    rarity: "mythical"
  },
  {
    id: "skin-449",
    name: "Lime Hex",
    weapon: "MP5-SD",
    wear: "Battle-Scarred",
    price: 0.5,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1I_82iYaloH_iWFlicyOl-pK8_HH22xxl34DiHz9mreS-TblN2C5FwFOQN4Rjpx9C1Yunh4gfbg91M02yg2SHKjRF4",
    rarity: "common"
  },
  {
    id: "skin-450",
    name: "Cyber Security",
    weapon: "M4A4",
    wear: "Factory New",
    price: 20137.45,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSI-mRC3WA1OB9j-1gSCGn2x9-527Tyt-pcnyUagQlW5JxEOIOuhjrw9XlMrixtQTd2NhNmH_5jCNXrnE8Cu1wa6c",
    rarity: "mythical"
  },
  {
    id: "skin-451",
    name: "Wurst Hölle",
    weapon: "Nova",
    wear: "Field-Tested",
    price: 21.53,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiFO0P24bbZ9IeOAMXCF0_1ij-9mWSiMmRQguynLytutd33BbgV1DpdwEOYC5hSwwNPjYr_ksVHdjotGxH742yNL5yk6sfFCD_SvUSZNdg",
    rarity: "uncommon"
  },
  {
    id: "skin-452",
    name: "Bright Water",
    weapon: "★ M9 Bayonet",
    wear: "Factory New",
    price: 31999,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMW-J_uF1teBncCK9nBsijGTVpYPwJiPTcFUmC5p3FO5YsRO_lIG2Me3rsVOM3tpAmSv_33ka5i5r5upWV6Qsq_HJz1aWbk46ROo",
    rarity: "ancient"
  },
  {
    id: "skin-453",
    name: "Tiger Tooth",
    weapon: "★ StatTrak™ Bowie Knife",
    wear: "Factory New",
    price: 13500,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vt59Ri62hyIooTyLnYrGLSLANkI-XJJ0FLNY5BOxw4XjNu-zsQDd2IpFyy32jS0b7Ss95L5RVaIk_qyE3RaBb-Pz4OFuTg",
    rarity: "ancient"
  },
  {
    id: "skin-454",
    name: "Tempest",
    weapon: "StatTrak™ Nova",
    wear: "Field-Tested",
    price: 566.04,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwipC0OGrabdkJPWsDHWR1-FJvOhuRz39xUUk4jiHyt_9cXzGZwV2CJJyQbYN4Ua9wdPiZr6x4FTcjIhMzXmsjjQJsHjYOlWGdQ",
    rarity: "uncommon"
  },
  {
    id: "skin-455",
    name: "Lore",
    weapon: "★ StatTrak™ Gut Knife",
    wear: "Well-Worn",
    price: 15215.03,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRa7FSJ-WHMWuf0-tJvOhuRz39zU5-4mzUyI2ud32RaQ8lXJB2FuUI40S4kofgM-7hslaPgtpBnHj-iDQJsHjij6hzng",
    rarity: "ancient"
  },
  {
    id: "skin-456",
    name: "Murky",
    weapon: "G3SG1",
    wear: "Field-Tested",
    price: 52,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1a4s2pO7dqcc-eG3Wb2NF6ueZhW2e2wE5y6juDy46uJ3qePVR1C5BzR7UO4xa9ldXlYuK07wSP2dlMzin6kGoXucw3wj8l",
    rarity: "uncommon"
  },
  {
    id: "skin-457",
    name: "Blue Steel",
    weapon: "★ StatTrak™ Huntsman Knife",
    wear: "Well-Worn",
    price: 14200,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SH1iSzftztN5lRi67gVN1tW3UzousdnrBbFB0WZt0QbVctEawxoGxN-ywtgGNjtgUySz-hiIa8G81tLF2CaOG",
    rarity: "ancient"
  },
  {
    id: "skin-458",
    name: "Walnut",
    weapon: "Nova",
    wear: "Battle-Scarred",
    price: 193.35,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiFO0OWvZKp4NM-dAXGR_uJ_t-l9ASjrlk9042Xcm42geSmXa1UpX5F3Qe4Pu0Trl4K2Y-6z41GNgo9ExSXgznQek14KNvA",
    rarity: "common"
  },
  {
    id: "skin-459",
    name: "Doppler",
    weapon: "★ StatTrak™ Flip Knife",
    wear: "Minimal Wear",
    price: 36900,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6VgH_ScHnecxPxJoOloXCznqhEutDWR1IuudniQZgMiApAlFLJftRjqkYfuNOKx4lfejtoUzCSvjH5PvSo56rwcEf1y_87DeTE",
    rarity: "ancient"
  },
  {
    id: "skin-460",
    name: "Desert Storm",
    weapon: "M4A4",
    wear: "Field-Tested",
    price: 840.77,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwipC0Pare6F_NM-fB2CY1aB347UxFi-3kEgi5TmAw93_dXKWPFR1CJchTOQDsxa6m4DkM--0sgfZlcsbmn2FVX37",
    rarity: "common"
  },
  {
    id: "skin-461",
    name: "Slaughter",
    weapon: "★ StatTrak™ Bowie Knife",
    wear: "Field-Tested",
    price: 25000,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5zSiuhlCIrujqNjsGscnueZwYoDJUmFO8Nsxfpx9buMeLm5Afe3Y8RxHivjS8bu34-4rsHT-N7rRZowTHv",
    rarity: "ancient"
  },
  {
    id: "skin-462",
    name: "Royal Paladin",
    weapon: "M4A4",
    wear: "Battle-Scarred",
    price: 6222.02,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSMv-KD2uv0v9jufNscCW6khUz_W-Az9b8d3LFZ1AnDMAjR-4CsBO9xofhNL_q4wLWjogUzyn43SxM73x1o7FVNN3FvCs",
    rarity: "legendary"
  },
  {
    id: "skin-463",
    name: "Midnight Palm",
    weapon: "M249",
    wear: "Battle-Scarred",
    price: 272.91,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wjFL0OKvZKlSLvmUBnOvzedxuPUnS3Cxlx8ksW7Um9mtc3KTOwAlCJF4FO4PskO9wd3jZLjn4wSN2I1HzDK-0H3u05_o_Q",
    rarity: "common"
  },
  {
    id: "skin-464",
    name: "Emerald Poison Dart",
    weapon: "StatTrak™ M249",
    wear: "Minimal Wear",
    price: 201.19,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wjFL0P_8PP1SJuKcCVif0-dxue9oQxa_nBovp3PRzNb8JX2VO1IpDsclRrEPtxXtxNSxYuuw4QHai9gWyCT2j3gYuHlt_a9cBlcR8wa2",
    rarity: "rare"
  },
  {
    id: "skin-465",
    name: "Bulkhead",
    weapon: "Negev",
    wear: "Field-Tested",
    price: 3.77,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1T9s2qfad5M8-KC2uczvlJvOhuRz39kB50sWmBw4moJXnGPFd1WJMjFLFZs0S9lNGxNuLg7weLg91BzCj73TQJsHg2tHPevg",
    rarity: "common"
  },
  {
    id: "skin-466",
    name: "Stalker",
    weapon: "MAC-10",
    wear: "Minimal Wear",
    price: 4000,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1c_M2jaac8cM-AGmacyutkj-1gSCGn20V0t27Tw974Jy-WOg9yW8N3QOQDsxG4x9O0ZOPqtgHZ399HzST8ji9XrnE8CxAHwFY",
    rarity: "legendary"
  },
  {
    id: "skin-467",
    name: "Night Stripe",
    weapon: "★ StatTrak™ Skeleton Knife",
    wear: "Battle-Scarred",
    price: 15759.54,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-AHlieyOl-pPJ9XSCjkCIrujqNjsH8dX2VbVJ1X5Z0RbVZtEO5mtPhY77qtlbc34IQxC_6jy0f7C0457wLT-N7rW2ankyk",
    rarity: "ancient"
  },
  {
    id: "skin-468",
    name: "Printstream",
    weapon: "Desert Eagle",
    wear: "Well-Worn",
    price: 2951.13,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ8-DHG6e1f1iouRoQha_nBovp3OGmdeqInyVP1V0XsYlRbEI50a5wNyzZr605AyI3t5MmCSohylAuC89_a9cBoMY9UkV",
    rarity: "legendary"
  },
  {
    id: "skin-469",
    name: "Doppler",
    weapon: "★ Bowie Knife",
    wear: "Minimal Wear",
    price: 35998.54,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5tQDmjmRg1jC2Nm5z8dRTLN1F4Tox3E-cOukLuk9W0NLjr7g2Pj4lAzy782ytO6Sdv5e4GVKQl8qTRiQGSL_Rjtvx55ayw",
    rarity: "ancient"
  },
  {
    id: "skin-470",
    name: "Dry Season",
    weapon: "MP9",
    wear: "Field-Tested",
    price: 423.9,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f7jJk-_O-bZtpL-SAMWWCwPh5j-1gSCGn20Ql42XQyo2sJ3qSOgNxCscjEeJYtRPtkNfhMuPgsgPcgoJAyH36iiNXrnE8I0B0oz0",
    rarity: "common"
  },
  {
    id: "skin-471",
    name: "Classic Crate",
    weapon: "StatTrak™ MAC-10",
    wear: "Battle-Scarred",
    price: 19.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1c_M2jaac8cM-XG3SE_u1ksfVscCW6khUz_WvVntmrI3KXOgcpXpQmRbYK5xe6ktLiYuLksVONi4tMyC_72CpN7nx1o7FVpG3zbwE",
    rarity: "uncommon"
  },
  {
    id: "skin-472",
    name: "Sky Blue",
    weapon: "Five-SeveN",
    wear: "Factory New",
    price: 16.15,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRe6toH_KfG2KvwOByj-JhXSa-kCIrujqNjsGueHuXb1VxDZRzFuJe5BC4w4XnYbnj5A2NjIMUyyr3iikY6Cc4tecBT-N7rc172J_D",
    rarity: "common"
  },
  {
    id: "skin-473",
    name: "Gator Mesh",
    weapon: "M249",
    wear: "Battle-Scarred",
    price: 8,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wjFL0P-re6xSMOmHBmie_uJ_t-l9ASrkwxxwtWrUyY79I3yUaA5xWcd2RO4C4BO6l4HkZbnj7lSM2YtDzC3gznQeaJe5pgI",
    rarity: "common"
  },
  {
    id: "skin-474",
    name: "Case Hardened",
    weapon: "★ StatTrak™ Talon Knife",
    wear: "Minimal Wear",
    price: 64062.5,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWaB_uF_vORtcCW6khUz_WqBzd39Ii_CaVApAsYlEeUO4xXslNexY7nl5ALWjI0WmSqq3XlN5yx1o7FV8eN3eSM",
    rarity: "ancient"
  },
  {
    id: "skin-475",
    name: "Damascus Steel",
    weapon: "★ StatTrak™ Flip Knife",
    wear: "Field-Tested",
    price: 10799,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6V8H_SSA2aDwvtlj-1gSCGn20lx52ncwtn_eXyQb1JzXJR3FOEPsRO5xoDmM77n7gHeiIpCyC6tjyhXrnE8njKBWnQ",
    rarity: "ancient"
  },
  {
    id: "skin-476",
    name: "Kami",
    weapon: "Galil AR",
    wear: "Minimal Wear",
    price: 195.35,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V6NsLPmfMWyRzOdJvOhuRz39wkl142uEwtqsJ3OealV1DZYmFuNZ4xTtx4HnZuPl4gaLjdpNnHqt3TQJsHjaThnzjg",
    rarity: "uncommon"
  },
  {
    id: "skin-477",
    name: "Marble Fade",
    weapon: "★ Paracord Knife",
    wear: "Factory New",
    price: 11543.59,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6VgH_2SHGWcxNFwseVscCW6khUz_TnXw9-qdyiWbQEiA8FxROQMtxPqlILjM7vk4waIjoxNmSr9iyxK6yh1o7FVj-pHDZk",
    rarity: "ancient"
  },
  {
    id: "skin-478",
    name: "Plum Quill",
    weapon: "★ Driver Gloves",
    wear: "Battle-Scarred",
    price: 9825.96,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3Wvzv1iouhqRxajgA83vzi6lob-KT-JawEjXMZyQuQMs0Xpl4fvMrvn4FOI2N5Dnn78jnxI5yZj5-tXWfEs8rqX0V_DSgKUxA",
    rarity: "ancient"
  },
  {
    id: "skin-479",
    name: "Black Laminate",
    weapon: "★ StatTrak™ Shadow Daggers",
    wear: "Field-Tested",
    price: 4203.11,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6N-H-CGHW-vw-J3s-pWQyi-nBMmpzi6lob-KT-JbQ9zDsMhEO8L4xS7k93mMbu35wOPitpBzij9hngY5ypitexXB_BxqbqX0V9R9Pjb9Q",
    rarity: "ancient"
  },
  {
    id: "skin-480",
    name: "Buddy",
    weapon: "StatTrak™ Five-SeveN",
    wear: "Minimal Wear",
    price: 264.51,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-Z6SHCMmRQguynLw4r9IHiRbFdzA8FzELYL4xntw9e1Mu7q5laMjN5AzXiqinxI6iw_t_FCD_TZbg2oLg",
    rarity: "rare"
  },
  {
    id: "skin-481",
    name: "Wood Block Camo",
    weapon: "PP-Bizon",
    wear: "Factory New",
    price: 1.5,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1T9s25Z6tpH_eBD26e_u13ve5WXSy3qhEutDWR1NyucS6XPQMmD5p1ELYC4EG5xoCxMezktgHZjoJDnH342ChLu3k5sO4cEf1y1FpRu8Y",
    rarity: "common"
  },
  {
    id: "skin-482",
    name: "Pipsqueak",
    weapon: "MAC-10",
    wear: "Factory New",
    price: 300.33,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2hfqF_MPGAHViD0PtzsepWQiiwxE0YvzSCkpu3eXiQOlMkDpAhEeELuhi8x9DmM-uw4VCL2YlAzSn223tL7idp67wDUL1lpPNy-DeiVw",
    rarity: "uncommon"
  },
  {
    id: "skin-483",
    name: "Rust Coat",
    weapon: "★ StatTrak™ Shadow Daggers",
    wear: "Battle-Scarred",
    price: 4643.37,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6V8H-OHC2Kc_uV4uedscCS2kRQyvnPQzdn6dSiUbw4jX8MmROdbskHpwde2Yu-x4VGKiYtBni__hisf63ti_a9cBjfCVlsL",
    rarity: "ancient"
  },
  {
    id: "skin-484",
    name: "Bioleak",
    weapon: "StatTrak™ MP9",
    wear: "Field-Tested",
    price: 30.31,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_C9k4uL3V6ZkL_yWD2yvzedxuPUnHSi3xhgm4GSGm4mpcnyTbVQjWcZ5EeIL50LultzgNbvmtAPf3oJByDK-0H0NB5p7wQ",
    rarity: "uncommon"
  },
  {
    id: "skin-485",
    name: "Hunting Blind",
    weapon: "Galil AR",
    wear: "Factory New",
    price: 1635.87,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OG-V6loM_isHWuR0uZzo95lRi67gVMhsjyBmI38eHKUawZyDcB2RbVcuhXql4bnMePjsg3XjdgUxCr43y4d8G81tK0-GwoG",
    rarity: "common"
  },
  {
    id: "skin-486",
    name: "Orange DDPAT",
    weapon: "StatTrak™ Galil AR",
    wear: "Battle-Scarred",
    price: 2692.04,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V6BpMPGHMWiCwOBxtd5lRi67gVN-4WzRwomqeHKQOwEoAsdzRrENskK7wIXiM-m341feg44TzXr33C0Y8G81tE9ebY28",
    rarity: "rare"
  },
  {
    id: "skin-487",
    name: "Graven",
    weapon: "StatTrak™ MAC-10",
    wear: "Minimal Wear",
    price: 3730,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a_s2rfKdlJfSsA2aTkL5JsvNoWSaMmRQguynLztytdHieOA92W8N5Re4D4ELtk9O2Nbnq5FfWjIkRn333hn9O731j4_FCD_RXlm8jng",
    rarity: "rare"
  },
  {
    id: "skin-488",
    name: "Savannah Halftone",
    weapon: "MP5-SD",
    wear: "Well-Worn",
    price: 3,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1T-82sZLF_H_OSA2ivzP4jo-VWQiy3nAgq_TjTyN6qICqTPVRzCZN4Q7EKsES6xtDlMb7gsQXb3oxHzHj32HtJ73p1o7FV_MEGTHA",
    rarity: "common"
  },
  {
    id: "skin-489",
    name: "Emerald Jörmungandr",
    weapon: "Desert Eagle",
    wear: "Well-Worn",
    price: 56847.02,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7v-RYqt_Lc-UHGKVz9F6ueZhW2fqzB51sGiGzNqrJXqWbAYmCpJ0RuYDshm_xNPmZuy07wDY3YwXni6okGoXuekvMmaE",
    rarity: "rare"
  },
  {
    id: "skin-490",
    name: "Blue Steel",
    weapon: "★ Kukri Knife",
    wear: "Minimal Wear",
    price: 8057.28,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsMc-RAnKVxdF6ueZhW2exzE0h62nVyd6qeXjEbgF0X8EiEbZesRS_wIXkPujq7wPWjNpDyn6vkGoXudm1ivk1",
    rarity: "ancient"
  },
  {
    id: "skin-491",
    name: "Doppler",
    weapon: "★ StatTrak™ Stiletto Knife",
    wear: "Factory New",
    price: 46499.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SA1iSze91u_FsTju_qhAmoT-Jn4bjJC_4Ml93UtZuFrJbtRW_xNDhYbyxsgWKioJCxS7-jCga7Sto6usFUfIkq6bS3gCTMap9v8f8BQu6Gg",
    rarity: "ancient"
  },
  {
    id: "skin-492",
    name: "Doppler",
    weapon: "★ StatTrak™ Stiletto Knife",
    wear: "Factory New",
    price: 46499.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SA1iUzv5mvOR7cDm7lA4i4gKJk4jxNWXEbwAgX5RwQucPuhPrmobhN-2z4w3c2IkQyiz2jC0c7C04tusKUPIn5OSJ2D2EqjOB",
    rarity: "ancient"
  },
  {
    id: "skin-493",
    name: "Stained",
    weapon: "★ M9 Bayonet",
    wear: "Battle-Scarred",
    price: 30999.99,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWaB_uh5ouJsSxa_nBovp3PQzYuoIH7BaA51CMZ3FO9cskKxk4DjP-7l4VPW3d1Nm3-s3HhPuH4-_a9cBjoiw1dT",
    rarity: "ancient"
  },
  {
    id: "skin-494",
    name: "Wall Bang",
    weapon: "Negev",
    wear: "Well-Worn",
    price: 4.38,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2hfqF_MPGAHViX0-9wj-9sSCylqhEutDWR1Iv6cyiSZgcnWZp4F7Fe4Ba9kIHnZe7i4g2Lj4xFzS_3iC9A7C1p6-gcEf1yfzRcjE8",
    rarity: "common"
  },
  {
    id: "skin-495",
    name: "Code Red",
    weapon: "StatTrak™ Desert Eagle",
    wear: "Factory New",
    price: 17256.23,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6OGRbKFsJ_yWMWaXxvxzo_JmXRa_nBovp3PRmNj4c3mTb1RxC5cjF-EItRnrlNzkYrnk5gaI3Y0UmyX52H9K7ixs_a9cBsGEcOCn",
    rarity: "legendary"
  },
  {
    id: "skin-496",
    name: "Slaughter",
    weapon: "★ Skeleton Knife",
    wear: "Minimal Wear",
    price: 32869.01,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-SA1iKxOxksd5lRi67gVMh62_RzdygJHORZlAlDpZwQOYM4Ri5k4HhNezg4wOLg49Nyy772y9J8G81tBUopZdW",
    rarity: "ancient"
  },
  {
    id: "skin-497",
    name: "Urban Masked",
    weapon: "★ StatTrak™ Butterfly Knife",
    wear: "Battle-Scarred",
    price: 75338.26,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsHXev1e9mtd58XSuymyIrujqNjsH_JCmUalNzCJJ2EOZb4RC_mtPiZLyz4laPg9lGyX-v2itI7i1r6-ZQT-N7rSOfJ1lh",
    rarity: "ancient"
  },
  {
    id: "skin-498",
    name: "Prey",
    weapon: "MP7",
    wear: "Factory New",
    price: 107.86,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf7jJk9feseqVuIf2sHGKU_uJ_t-l9AXvqwUsk4DyHnIr7eHySbg8gWcckTOUCsxawk9O1ZeywsQOIg95AznjgznQehcsrUP8",
    rarity: "common"
  },
  {
    id: "skin-499",
    name: "Lionfish",
    weapon: "StatTrak™ Negev",
    wear: "Field-Tested",
    price: 45.9,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1I_82gbaNoNs-fB2iex-dluN5lRi67gVNx62XXzI74InPGbQMpDpMiRLMOsRG4lNXvPuritFeN3YpMzSSo2yhN8G81tOHyHega",
    rarity: "rare"
  },
  {
    id: "skin-500",
    name: "Digital Mesh",
    weapon: "G3SG1",
    wear: "Well-Worn",
    price: 82.03,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1c_M2pO7dqcc-XB3SC1P5ij-1gSCGn20wh4m-By9-qIC7COA8jWcNxRuUPshe6kNfnYe62tQ2K2NpHmXj2iC9XrnE82YBIy5I",
    rarity: "uncommon"
  }
]

const DEFAULT_INVENTORY: InventoryItem[] = [
  { uid: "inv-1", skinId: "skin-1" },
  { uid: "inv-2", skinId: "skin-2" },
  { uid: "inv-3", skinId: "skin-3" },
  { uid: "inv-4", skinId: "skin-4" },
]

export const DEFAULT_STATE: AppState = {
  balance: 1500,
  inventory: DEFAULT_INVENTORY,
  skins: DEFAULT_SKINS,
  upgradeSkins: DEFAULT_SKINS,
  loggedIn: false,
  username: "Player",
  avatar: null,
  online: 2172,
  upgrades: 132860345,
  predict: { outcome: "off", targetSkinId: null, hint: "x2", targetLosses: 3, currentLosses: 0, showPercentages: true, showMultipliers: true },
  adminPassword: "admin123",
  fastMode: false,
  fastMultipliers: [2, 4, 8],
  fastPercentages: [35, 55, 75],
  soundMode: "on",
}

export const RARITY_COLORS: Record<string, string> = {
  common: "#5e98d9",
  uncommon: "#4b69ff",
  rare: "#8847ff",
  mythical: "#d32ce6",
  legendary: "#eb4b4b",
  ancient: "#e4ae39",
}
