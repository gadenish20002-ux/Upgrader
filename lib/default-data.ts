import type { Skin, AppState, InventoryItem } from "./types"

export const DEFAULT_SKINS: Skin[] = [
  {
    id: "skin-1",
    name: "Abyssal Apparition",
    weapon: "MP7",
    wear: "Battle-Scarred",
    price: 29867,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_jdk4uL5V6JoIeKsAm6Xyfo45uc9GnnnzBh-5zzTw9n9I3mQPAEgD5YlFuIOthC6wNK1MeKwsgHeiZUFk3vcOiyhPQ",
    rarity: "mythical"
  },
  {
    id: "skin-2",
    name: "Modern Hunter",
    weapon: "P250",
    wear: "Well-Worn",
    price: 1321,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0Pq7ZrBoMs-eAWOV0-BJvOhuRz39lkV-5zuEmN6seX-QbgYpA8B0QLZbtRXpmofgM-Pj4FSI3tkXxCj8hzQJsHhBKeBm5Q",
    rarity: "uncommon"
  },
  {
    id: "skin-3",
    name: "Slaughter",
    weapon: "Shadow Daggers",
    wear: "Factory New",
    price: 88801,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6VgH-qWDHWR_uJ_t-l9AXHqx0V_tWzRn4v7Iy7Ea1QlDsEiF7UP5xWxkIexZuPjsgLWi91MyC3gznQen1baSVU",
    rarity: "legendary"
  },
  {
    id: "skin-4",
    name: "Crimson Web",
    weapon: "Shadow Daggers",
    wear: "Well-Worn",
    price: 92298,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6x0H-eWDHSvzedxuPUnHi3mkRx24j_cn4qgIHnGbwF0A5p1R7UI5xm-k9XnMrjq5gOPj95BxDK-0H2triMq-g",
    rarity: "legendary"
  },
  {
    id: "skin-5",
    name: "Nostalgia",
    weapon: "P90",
    wear: "Field-Tested",
    price: 23141,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_jdk_6v-V6piM-SSAmCZwNF6ueZhW2fgxBh25mmAyY6reS2WaAElCpZ2RrMOuxO6k4LnNuy2tgLejoIWyXj3kGoXuTP4YgZa",
    rarity: "mythical"
  },
  {
    id: "skin-6",
    name: "Desert-Strike",
    weapon: "Negev",
    wear: "Battle-Scarred",
    price: 1294,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2gbaNoNs-HB3ORz_1iv_NkcCW6khUz_WnUz42tI3-WOw5zDpAmQOQD4ELskoDlMeni4gTWjoNNmSj_33kcvC51o7FVXp6G1h4",
    rarity: "uncommon"
  },
  {
    id: "skin-7",
    name: "Neo-Noir",
    weapon: "Glock-18",
    wear: "Well-Worn",
    price: 141344,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-dAW6C_uJ_t-l9AXznwh9zsjjSn9j9dH-eb1V0CsF3QrNZ4xW8ltPlM-7h4QbYit5NzyzgznQecekkTuo",
    rarity: "legendary"
  },
  {
    id: "skin-8",
    name: "Guardian",
    weapon: "M4A1-S",
    wear: "Factory New",
    price: 26861,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL87o95sQyy0lBMzjDGMnYftb3-QPFUlWZJ1F7VbsBi7xoa0Y7vl5ACP2ohEzX-t2iJA7Xtv4ugKWaQ7uvqAAzqYQbE",
    rarity: "mythical"
  },
  {
    id: "skin-9",
    name: "Doppler",
    weapon: "Talon Knife",
    wear: "Minimal Wear",
    price: 140500,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWad_v13oPFhRju2qhAmoT-Jn4bjJC_4Ml93UtZuF-MMt0btxtHlZr7m5gKKjYwRmH2oj3gcuH095e1QAqVwqKzUjluTMKp9v8cWgnOBZw",
    rarity: "legendary"
  },
  {
    id: "skin-10",
    name: "Copper Oxide",
    weapon: "P250",
    wear: "Battle-Scarred",
    price: 540,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjFU0PW8bb1vLOWWMXfClL5JvOhuRz39kEVx526GzYyudHLFbAYpXpZ0EbZeuxK4ktyxNOu3tQLX2o1DyCX7ijQJsHjyf3ICdA",
    rarity: "uncommon"
  },
  {
    id: "skin-11",
    name: "Cinquedea",
    weapon: "MAG-7",
    wear: "Battle-Scarred",
    price: 21932,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiVI0P-vb_NSJ_ySHXSvzedxuPUnSijmlh9x4D-BnNyuJ3LCbAVzAsdxFuRe5EPpw9XiMbvh5lHYiYwQyjK-0H3Th2Gpiw",
    rarity: "mythical"
  },
  {
    id: "skin-12",
    name: "Lil' Pig",
    weapon: "AUG",
    wear: "Well-Worn",
    price: 13429,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk4_uieK1qH_GGCVicyOl-pK84TXCwxRhx627SmNj6J3PFaQV2X5R1R7JctBixldfvY7u24ATY2owX02yg2cUR6r7A",
    rarity: "mythical"
  },
  {
    id: "skin-13",
    name: "Robin's Egg",
    weapon: "Galil AR",
    wear: "Field-Tested",
    price: 326,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OGhbZt_L_KaAHSVxulJvOhuRz39kRl04ziAwouhInmTaQMlCcNxReFZ5xTqmtO1PuLntFDX3d8QyST_jjQJsHiwz7gI3Q",
    rarity: "common"
  },
  {
    id: "skin-14",
    name: "Doppler",
    weapon: "Paracord Knife",
    wear: "Factory New",
    price: 89325,
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0PzadQJD4eO0mIGInOfxMqndqWZQ-sd9j-Db8IjKhF2zowdyNjqhI9SQdw9tYQ3V-la6lb3ngJLv78jJzXcwvnQj7HeLmhyygkkYO_sv26IMYqz0aQ",
    rarity: "legendary"
  },
  {
    id: "skin-15",
    name: "Doppler",
    weapon: "Gut Knife",
    wear: "Factory New",
    price: 136483,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRaalSJP-DHmuV09FmuOB6SniMmRQguynLmYmpeCjEPwYhDJF4R-AMsEO-l9exPrjm5gzWjowWmSz323lNuCY65_FCD_QON0IPhg",
    rarity: "legendary"
  },
  {
    id: "skin-16",
    name: "Doppler",
    weapon: "Nomad Knife",
    wear: "Minimal Wear",
    price: 81261,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GeMWOf0f56tfNWXyGyhhh1jDGMnYftby6SPAV2X8N3Q7NcsEa_lNezMuPq5wzY2IpHmHn6j3tNvytq5OhXBaY7uvqAC7ut2F0",
    rarity: "legendary"
  },
  {
    id: "skin-17",
    name: "Blaze",
    weapon: "UMP-45",
    wear: "Minimal Wear",
    price: 208,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1a7s2oZKVgJeOsAm6Xyfo4srhvSi21wUoi4j_Xzt7_di6RaQ4mA5YhRuIMtEbswIDmMbzg5ACN35UFk3uW8e_n9A",
    rarity: "uncommon"
  },
  {
    id: "skin-18",
    name: "Space Cat",
    weapon: "PP-Bizon",
    wear: "Factory New",
    price: 3418,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1Y-s2sYb5iLs-AHmaTxO13pN5lRi67gVN04jvcmYv6IHnGbw51XsYmQO5ftBG9xoexNrix4gPYjIJEzX_2iX9I8G81tOIzQC5J",
    rarity: "rare"
  },
  {
    id: "skin-19",
    name: "★ Bayonet",
    weapon: "Bayonet",
    wear: "Factory New",
    price: 54468,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKni_DtU4fe6Jv07IfTDDT_JkL4htLI7HCvmwE9z42_Vzov4ci2Wa1IgWMN3R7IMuxCm0oqwYUAZNBA",
    rarity: "legendary"
  },
  {
    id: "skin-20",
    name: "Fade",
    weapon: "M9 Bayonet",
    wear: "Minimal Wear",
    price: 32304,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWaR_uh3tORWQyC0nQlp4znQytr6cnjFbg8oC8BzRrQK50S-lNDgP-_r5wWP3t5CyX37jCIb7DErvbiJu9Hv_g",
    rarity: "legendary"
  },
  {
    id: "skin-21",
    name: "Doppler",
    weapon: "Paracord Knife",
    wear: "Factory New",
    price: 37866,
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0PzadQJD4eOkgYKSqPr1Ibndk2JL7cFOhuDG_Zi7iwfjrkdpN22mdtPGJ1Q5Zw3XrAPsxb3p0Z_o7c_KzHBj6XEjsH-MmAv3308TscgGJg",
    rarity: "legendary"
  },
  {
    id: "skin-22",
    name: "Boreal Forest",
    weapon: "Gut Knife",
    wear: "Factory New",
    price: 138499,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRYL1SJv-BC3SE_ux5ouRoQxa_nBovp3PSmYqhJX6UPw9yD5N1FOEO4UPqwdLmNruz5lePjd9Dmy6q3SkYvCg5_a9cBkQf8e9t",
    rarity: "legendary"
  },
  {
    id: "skin-23",
    name: "Fade",
    weapon: "Ursus Knife",
    wear: "Minimal Wear",
    price: 54800,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tsIc-VD2OV_uJ_t-l9AXzml00i527XzouseH7GblAjX5N3R-NbuhLswYfjY-zj7laKjdkRyX_gznQeK-1-7hY",
    rarity: "legendary"
  },
  {
    id: "skin-24",
    name: "Gamma Doppler",
    weapon: "Gut Knife",
    wear: "Minimal Wear",
    price: 137746,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRaalSJf2WHGacxdF7sfNrQyy6jxgjjDGMnYftby-ROwEmXMciQeUDt0Prkt3hMeKwsQKP2ogRzyWqiy4b6So_5-YBU6Q7uvqAIJUtHr4",
    rarity: "legendary"
  },
  {
    id: "skin-25",
    name: "Wasteland Princess",
    weapon: "Sawed-Off",
    wear: "Well-Worn",
    price: 25923,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2tfZt6MM-AD3CVxeFwtt5lRi67gVMksWuEmduuIH2fPwUkWJojQuMP5xi8lNzlY-234lDag4xFnin_jihN8G81tH9UxALW",
    rarity: "mythical"
  },
  {
    id: "skin-26",
    name: "Weasel",
    weapon: "Glock-18",
    wear: "Battle-Scarred",
    price: 2897,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK6HLMXCVwP1zvN5lRi67gVN_4j7Qzdj8dimQblQkX8YkTeNe5Bmxkd2zNr_j5QbdjthCzX-qjylI8G81tDMJpR5Y",
    rarity: "rare"
  },
  {
    id: "skin-27",
    name: "Cartel",
    weapon: "AK-47",
    wear: "Factory New",
    price: 25029,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNK0POlPPNSI_GBGmKc_uJ_t-l9ASuywktwtW3dwt79eX6fZlUiCJJ1RbUPtkW8w4LiZe_i4ATYjN8WmH7gznQeZkk4ehM",
    rarity: "mythical"
  },
  {
    id: "skin-28",
    name: "Pandora's Box",
    weapon: "MP9",
    wear: "Minimal Wear",
    price: 1412,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_CNk__OgbKt_Ic-fB2CY1aAv5LE9Hyu1wUtx5WTUyYmrcHiUbgIlCcF5Q7RZtUKwlNDiZL7q4QTblcsbmlthBLtr",
    rarity: "uncommon"
  },
  {
    id: "skin-29",
    name: "SWAG-7",
    weapon: "MAG-7",
    wear: "Field-Tested",
    price: 6333,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiNK0P-vb_NSM-eSCTCvzedxuPUnHirhkxhxtzvRzI38dnLEOlQnW5N1F-FZtRG6kYLvPu205ADaj40RnDK-0H0F4y2tgg",
    rarity: "rare"
  },
  {
    id: "skin-30",
    name: "Doppler",
    weapon: "Paracord Knife",
    wear: "Minimal Wear",
    price: 35448,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6VgH_ScHnecxPxJoOloXCziqhEutDWR1Nv6JHuXbQUpCpIkQe8KsBjsxNLgYevltlTe3olHyHiv3StK73pqtugcEf1yeFJGil8",
    rarity: "legendary"
  },
  {
    id: "skin-31",
    name: "Yorkshire",
    weapon: "Nova",
    wear: "Factory New",
    price: 937,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiVI0OCneLRhJc-dAXGR_uJ_t-l9AXHqx0l0526Bwtz7IHzDaFJxDsAhRbQDuxPtltTiYe234g3fg4xEzH7gznQe4s_Y0gw",
    rarity: "uncommon"
  },
  {
    id: "skin-32",
    name: "Orange Peel",
    weapon: "MP7",
    wear: "Field-Tested",
    price: 293,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf7jJk-_O-bZtiMvGdCWKvzedxuPUnFiuxxRl3622By9z4dSiTPwB0ApsjQOMNsxTpkYHnZrvr4AWLiNlEnDK-0H2hOymBhQ",
    rarity: "common"
  },
  {
    id: "skin-33",
    name: "Tiger Tooth",
    weapon: "Skeleton Knife",
    wear: "Minimal Wear",
    price: 30522,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-SAFiEyOlzot5mXSi9khgYvzSCkpu3dyjBagAlXMB4R-YOt0OxlIe2ZuuztQXdjNhAySn52i5Mv3tj5rlRUb1lpPPHmhG_Tw",
    rarity: "legendary"
  },
  {
    id: "skin-34",
    name: "Doppler",
    weapon: "Huntsman Knife",
    wear: "Minimal Wear",
    price: 144004,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SA1iDwP5muOh7Sha-lA8lvziMgIr9HifOOV5kFMN5Qe8CshbrltLlNOqxsgLc2t8Uzyv9jSNLuC9r4-oEVfB2r_GFjg3fcepqRzB392E",
    rarity: "legendary"
  },
  {
    id: "skin-35",
    name: "Aristocrat",
    weapon: "AUG",
    wear: "Battle-Scarred",
    price: 6870,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk7uepV6V_KeOHAWSCwPpJvOhuRz39w00j5WSDytyqI3_CPwAgXMd2E-Vc4US-koCxNOzq5AaMithNyij32DQJsHjdc8VZyg",
    rarity: "rare"
  },
  {
    id: "skin-36",
    name: "Black Laminate",
    weapon: "Bayonet",
    wear: "Well-Worn",
    price: 82798,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PG7V6ZsOf-dC3Ov0vp5vuR-Tjq7qhEutDWR1Nr6IHuXOgMkWcQiQ7YK5hG7wYfgYuOx5gSN2YNCyHn-2Cof5i5isL0cEf1yJefVwLI",
    rarity: "legendary"
  },
  {
    id: "skin-37",
    name: "Eclipse",
    weapon: "Moto Gloves",
    wear: "Field-Tested",
    price: 67969,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJsuB6RiqMlxEmsDa6lob-KT-JaQMpDpFzFOdY4EO8lIDnMLjr5ALZjN1Dnyj7iyhAvXo55ucKWadx87qX0V_LSR8vSA",
    rarity: "legendary"
  },
  {
    id: "skin-38",
    name: "Asiimov",
    weapon: "M4A4",
    wear: "Battle-Scarred",
    price: 120693,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6V6V-Kf2cGFidxOp_pewnTii3w0x_tmTRnt2qdHyWaFAjA5UlQOYI5BO5k9bhZunm41OI34NDnjK-0H3pAWw_Rw",
    rarity: "legendary"
  },
  {
    id: "skin-39",
    name: "Case Hardened",
    weapon: "Butterfly Knife",
    wear: "Battle-Scarred",
    price: 89207,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD3avzud6teVWQyC0nQlp5z6AyN_7I3mfOFQnApUlFrMN5BbpwdbhP-vgs1Pd3dpBmXr9jnwf6DErvbim1G57Bg",
    rarity: "legendary"
  },
  {
    id: "skin-40",
    name: "Vent Rush",
    weapon: "P90",
    wear: "Field-Tested",
    price: 6360,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf-jFk_6v-V7BsLvefC2OvzedxuPUnTXywwElz52XXzIz4dn2RalcoC8FzQrJfsRe-moG0YeK2sQPZ3YpEmzK-0H18Z6zceQ",
    rarity: "rare"
  },
  {
    id: "skin-41",
    name: "Gamma Doppler",
    weapon: "Huntsman Knife",
    wear: "Minimal Wear",
    price: 139101,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SA1iXwON7sd5tQDmjmRg1jC2Nm5z8cBTLN1F4Tox4R7JZs0bsldLnMurg5VfWg4wUyyn72yhIuiY6tu1UBaAlrKDT2Q3HL_Rjtkcw7QQm",
    rarity: "legendary"
  },
  {
    id: "skin-42",
    name: "Doppler",
    weapon: "Survival Knife",
    wear: "Minimal Wear",
    price: 80748,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsLc-XAXeAzetkj_FhTjq2xiIrujqNjsH_IHmVbw4gDpIlF7Nb5kO4k9CzZr_q5FbaiopNyyqoii0cvSZjsOcKT-N7rcPcFrXZ",
    rarity: "legendary"
  },
  {
    id: "skin-43",
    name: "Limelight",
    weapon: "Sawed-Off",
    wear: "Minimal Wear",
    price: 2419,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2tfZt-IeeWClifx-hJvOhkSha_nBovp3ODz4utJHrBZ1MjD5YkFO8NtBjqwdXvP-nn4QLZjIJNnHio2Hwd5npq_a9cBh09Jdi8",
    rarity: "rare"
  },
  {
    id: "skin-44",
    name: "Rust Coat",
    weapon: "M9 Bayonet",
    wear: "Battle-Scarred",
    price: 68976,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWaB_v1iteRlcCK9nBsijDCAnobsLGXCPVV1XpB4ELYIsEbqktbjN-_k71GKjotAyS6sjn8d63pj4ewGUaci5OSJ2GrdBJ84",
    rarity: "legendary"
  },
  {
    id: "skin-45",
    name: "Slaughter",
    weapon: "Survival Knife",
    wear: "Field-Tested",
    price: 29277,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsLc-JC2WCwNF6ueZhW2fglEt-5jmDytn_InKRPwQkAsQhE-UJu0a4lYflNO7k41bc34sTyH76kGoXuTxGW3zC",
    rarity: "legendary"
  },
  {
    id: "skin-46",
    name: "Doppler",
    weapon: "Nomad Knife",
    wear: "Factory New",
    price: 38251,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GeMWOf0f56tfNWXyGyhhhzjDGMnYftbyqeblVzX5ohROZbtxfpxNDvZOjmsVSKj98Wzi_5jilO6ilose8GBKE7uvqAQvAc2Rg",
    rarity: "legendary"
  },
  {
    id: "skin-47",
    name: "Contamination",
    weapon: "P250",
    wear: "Field-Tested",
    price: 489,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0Py7a6hoIeKsHWyFzeJl5N55HXzjqhEutDWR1NahIH6SaVUnDsB2Q-MIthHrxtTjMuLk7gXc2YlHyir93CtMuCdt4e8cEf1ykWaXO4g",
    rarity: "common"
  },
  {
    id: "skin-48",
    name: "Safari Mesh",
    weapon: "Nomad Knife",
    wear: "Well-Worn",
    price: 47442,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H-ODMWqV0uZJpOBncCW6khUz_WzWm9esdXOfbwRyWZR0ROACthDulYeyM-m34AeL3doXxX-s2Hwb7311o7FVDfDKraI",
    rarity: "legendary"
  },
  {
    id: "skin-49",
    name: "Sergeant",
    weapon: "FAMAS",
    wear: "Minimal Wear",
    price: 2206,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a4c2oaalsM8-ACXOvzedxuPUnF3HmkBx_tjnSmNmrJHiROFN1W8NxFrFZsxbrk4e0Yuvr5wWLi4JAyjK-0H3maOk52Q",
    rarity: "rare"
  },
  {
    id: "skin-50",
    name: "Jungle Dashed",
    weapon: "SSG 08",
    wear: "Well-Worn",
    price: 271,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I_826abRoH-ObAXWE_uRjvuZlSha_nBovp3PUz9-pcnuXPQMpCMZwQ-UM5xixmtGxN-7n4wWKiN5DySivhyxJ5ixj_a9cBvFEfbOR",
    rarity: "uncommon"
  },
  {
    id: "skin-51",
    name: "Stained",
    weapon: "Dual Berettas",
    wear: "Battle-Scarred",
    price: 464,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1a_s2oZ7ZuJfSsAm6Xyfo45LVtG3zgzEt-tmWHydutd3nFaVciDJIjFrZZt0OxmoXkMuuz7wbY2pUFk3vnrYa7Ww",
    rarity: "common"
  },
  {
    id: "skin-52",
    name: "Frosty",
    weapon: "Sport Gloves",
    wear: "Battle-Scarred",
    price: 138223,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk6P6hfqFSM-CcHHOvwu97v95-RienkA8YvzSCkpu3dXqfbA5zW5N0F-dcu0K8ldDnMuPk4wHdjN9EniWthn4av31v4eoHWL1lpPOyBkNpPQ",
    rarity: "legendary"
  },
  {
    id: "skin-53",
    name: "Bunsen Burner",
    weapon: "Glock-18",
    wear: "Battle-Scarred",
    price: 219,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a_s2pZKtuK6HLMWGcwONzo95rQzy2qhEutDWR1Nb7IC-TOw4hCZF5FOJe40W5lILlZLvktAHXiIJMyST_3XlIv3k94escEf1yWue1sjU",
    rarity: "uncommon"
  },
  {
    id: "skin-54",
    name: "Shipping Forecast",
    weapon: "M249",
    wear: "Battle-Scarred",
    price: 216,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wipC0OihbK1sI6OsAm6Xyfo4s7c4Gnvmx0l0tWjSzoyoeC7BPwUgDsAiQ-cMsROwloG2Y-rr4wfe3pUFk3scMmqwFg",
    rarity: "common"
  },
  {
    id: "skin-55",
    name: "Cold Blooded",
    weapon: "P90",
    wear: "Minimal Wear",
    price: 29177,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_C9k_P6nfKxoMs-DVzevzedxuPUnSivqkBt_5m7Rw9v8cXmTZ1UjX5Z5EOEIuhK8koHuNe7r51fYjt4XyDK-0H2E4aJrDg",
    rarity: "mythical"
  },
  {
    id: "skin-56",
    name: "VariCamo Blue",
    weapon: "XM1014",
    wear: "Factory New",
    price: 933,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk5-uRfqV_KfOSA2ivw-Jjtd5lRi67gVN0tmTdyN-gJy2fb1AjCcFzFOYDu0btxNDkYr_k4APXg4JNxXn32n5L8G81tKBcQXWQ",
    rarity: "uncommon"
  },
  {
    id: "skin-57",
    name: "Blush Pour",
    weapon: "SSG 08",
    wear: "Minimal Wear",
    price: 1374,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I4P2Raad_OfyaDViWzeFhj_FgQSKMmRQguynLyY2rdHqWaAYgWJFyR-dZuxC-loLjMeixsgzXi4hGyyT4j3hOvHxu4fFCD_TyynIDEA",
    rarity: "uncommon"
  },
  {
    id: "skin-58",
    name: "Facility Dark",
    weapon: "UMP-45",
    wear: "Minimal Wear",
    price: 1182,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1T9s2sZLFoMOKaAHOvw-JjtfNsSxa_nBovp3PVnN_7JyjDOgciWZRyQudf5hjrwYHnNOjl4gKN2YtNmXj5iS5Lvys5_a9cBlkwYg2r",
    rarity: "uncommon"
  },
  {
    id: "skin-59",
    name: "Necropos",
    weapon: "SSG 08",
    wear: "Well-Worn",
    price: 252,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-dC2SCzv55o95lRi67gVN26m_VnomsdiqTZwB0W5R5E7UCuxe6lICyMO3i7lDWjt4XyHj_iypB8G81tA-y21Aw",
    rarity: "uncommon"
  },
  {
    id: "skin-60",
    name: "Neon Ply",
    weapon: "MP7",
    wear: "Well-Worn",
    price: 6963,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_jdk4uL5V7ZoMPyaDWavzedxuPUnGS2wzBglsm6AnNyqJHLBOAdyCZV0ELIN5xC6kNThY-jqslbbid4WyjK-0H0WWbSZ_g",
    rarity: "rare"
  },
  {
    id: "skin-61",
    name: "Doppler",
    weapon: "Nomad Knife",
    wear: "Factory New",
    price: 43797,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GeMXWFw_dJveB7TSW2nAcitwKJk4jxNWWVOlUiWZt0RO4MtkW8ldK2ML7i4wHW2t9Bm3n2iH5Kv3pttuwBU6Rw5OSJ2BsJTr2y",
    rarity: "legendary"
  },
  {
    id: "skin-62",
    name: "Rust Coat",
    weapon: "Ursus Knife",
    wear: "Battle-Scarred",
    price: 81564,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tsMc-AGmKVzdF9vuhvSha-kBkupjDLy9-hcymePwV0XpN1E7MPshfrl9HkMO7q5QyI2Y9MnC353ClLvCdu5PFCD_SZq2fGzA",
    rarity: "legendary"
  },
  {
    id: "skin-63",
    name: "Destroyer",
    weapon: "Galil AR",
    wear: "Factory New",
    price: 12.42,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWOV0vpkv_hsXRa_nBovp3PWwougcHvBP1IpWJohEOdc5hLrwNTiZbjh7gbaithNnnqsjX4f7y8-_a9cBt1aCBEk",
    rarity: "uncommon"
  },
  {
    id: "skin-64",
    name: "Hypnotic",
    weapon: "SG 553",
    wear: "Factory New",
    price: 2094,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1a7s24bbZ5KfecMWuZxuZi_rJrF3DlkEUl5GTdy4yudHyRZgYnWZskFucO4RO_kIK0PuOxtVPb2d5bjXKpAmuHKUk",
    rarity: "rare"
  },
  {
    id: "skin-65",
    name: "Facility Sketch",
    weapon: "PP-Bizon",
    wear: "Minimal Wear",
    price: 911,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1T9s2sZLFoMOKaAHOv1uZ_pORWQyC0nQlptTjWyImvJSnBOgcjCcF2EbMDskLploCzZO-0swfZithGnCWq3X5P6jErvbhS6IbYJA",
    rarity: "uncommon"
  },
  {
    id: "skin-66",
    name: "Victoria",
    weapon: "CZ75-Auto",
    wear: "Minimal Wear",
    price: 31131,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a_s2rfKdlJfSsDX3HlNF6ueZhW2fkk04i5WrXmY2sc3qfPFAlWZd3EOdY4Bi6loCxPu7h51fZjNlGzST5kGoXuTXAF0gA",
    rarity: "legendary"
  },
  {
    id: "skin-67",
    name: "Case Hardened",
    weapon: "Stiletto Knife",
    wear: "Minimal Wear",
    price: 149259,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SH1ifyOJztN5lRi67gVNzsWTdn92oJy6XaVUgWJQlQuALtxS4l4HnMrzk5VDc2d1Mmyj9hn8b8G81tHhX34fn",
    rarity: "legendary"
  },
  {
    id: "skin-68",
    name: "Coral Halftone",
    weapon: "P2000",
    wear: "Field-Tested",
    price: 104,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0Pq6V6JsI_WHMXfCkb4mj-1gSCGn2xsj5mrWm4v_c37EaAV1CMR2Ru8P4RO7m4fjY7_rsgDZjYMQzHiriyNXrnE8hd3eC64",
    rarity: "common"
  },
  {
    id: "skin-69",
    name: "Doppler",
    weapon: "Karambit",
    wear: "Factory New",
    price: 80658,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SA1iDwP5muOh7Sha-lA8lvziMgIr9HifOOV5kFMRxFuEM5hi_xNXhMbmx5VCMjd9MyCv6jigc6n064ucLAvZ3_6bViV3fcepqpLtspE0",
    rarity: "legendary"
  },
  {
    id: "skin-70",
    name: "Blue Laminate",
    weapon: "AK-47",
    wear: "Minimal Wear",
    price: 7011,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0POlPPNhIf2sDGuFxNF6ueZhW2fhzE5_5G7dnt_7JXufa1J0DZAkE-cKtBaxl9WzPuyz5lDY3YpAzCn9kGoXuZPu7T4u",
    rarity: "rare"
  },
  {
    id: "skin-71",
    name: "Ultraviolet",
    weapon: "Butterfly Knife",
    wear: "Field-Tested",
    price: 110084,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsHWiv0ftkoO1scCW6khUz_WuHyor4cnLEPAMjD5F2FOcLt0O-ktLgMLvg7wbYjIJNmH-viX9A6351o7FVdgPZdkU",
    rarity: "legendary"
  },
  {
    id: "skin-72",
    name: "Mayan Dreams",
    weapon: "SSG 08",
    wear: "Field-Tested",
    price: 431,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1T9s2jab1sLs-XHGKRzP1JsvNoWSaMmRQguynLytmqd3yQP1coCJR0QecK40TqkdHgMuvi5gDa3owRz3_72ilA6X1jsvFCD_TXuxrUgQ",
    rarity: "common"
  },
  {
    id: "skin-73",
    name: "Case Hardened",
    weapon: "Paracord Knife",
    wear: "Battle-Scarred",
    price: 95236,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6V8H_-aAmKU_uJ_t-l9ASrglh8l5DjWz479d3iTOwYlX5UhFrYMsRnrltWxNrzl5QHYjYJCyX_gznQeOO_KAyk",
    rarity: "legendary"
  },
  {
    id: "skin-74",
    name: "Visions",
    weapon: "P250",
    wear: "Factory New",
    price: 26623,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiVI0OL8PfRSNvmAB2ie0tF6ueZhW2fmzERx5jyHm4v_dXvGaQR2WJF2QrIMsxW_w9PvN-zhtgXXiokWn3_6kGoXuc_iGAKZ",
    rarity: "mythical"
  },
  {
    id: "skin-75",
    name: "Momentum",
    weapon: "UMP-45",
    wear: "Battle-Scarred",
    price: 18161,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1Y-s27ZbRSIeKBAXCD_uJ_t-l9ASzrx0txsWiBydv4JCmSaFdzDJt0TOYN5hbtwYWzNerl5QeIj4IXyX3gznQeadzF8t4",
    rarity: "mythical"
  },
  {
    id: "skin-76",
    name: "VariCamo Grey",
    weapon: "AK-47",
    wear: "Minimal Wear",
    price: 279,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFU6s24abZkI_GeAVicyOl-pK8_TXvhxh5_626Bn477dn-fbQcnXMZzEeMPtxe_w9DhY-OztAXc2IsT02yg2Vc0ERtW",
    rarity: "common"
  },
  {
    id: "skin-77",
    name: "Brass",
    weapon: "Tec-9",
    wear: "Field-Tested",
    price: 323,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiNK0PC8abd-H_yaCW-Ej-91tuQ7Sy3gzB9x4m_Vy9b8dy-SaFcjDZchQ-IL5EHqxtzhP7y34ADAy9USp8n4eRk",
    rarity: "uncommon"
  },
  {
    id: "skin-78",
    name: "Ocean Drive",
    weapon: "Desert Eagle",
    wear: "Battle-Scarred",
    price: 139734,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ_yWMWyZ1e1-j-1gSCGn2x5-sG7Wzdyvc3OSbgcnXpR5FO9bukTtm9WzMePhswaN2N5CmCj_jyhXrnE8ibjhEyc",
    rarity: "legendary"
  },
  {
    id: "skin-79",
    name: "Power Loader",
    weapon: "Negev",
    wear: "Well-Worn",
    price: 2233,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2gbaNoNs-aA3eRwvpJvOhuRz39lE914j-HyYmscHLBZ1J1X5NyEbYI5Be8k4DmYuzh4AGIgo0QzSqs3TQJsHgPf9N5RQ",
    rarity: "rare"
  },
  {
    id: "skin-80",
    name: "Irradiated Alert",
    weapon: "Sawed-Off",
    wear: "Battle-Scarred",
    price: 1257,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c29eJtjNfuWHXOCyP5zj-N7QD69qhEutDWR1NquJHuXO1J2CMZ2TLEPtxe8wdLhMO_gsQ2PiolBzymojX5A6X054O4cEf1yT4AnDcQ",
    rarity: "uncommon"
  },
  {
    id: "skin-81",
    name: "Fleet Flock",
    weapon: "AUG",
    wear: "Field-Tested",
    price: 16664,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_jdk7uepV7d6IfyfAXCD_uJ_t-l9AXnmw0t252TVztercCmTZ1AmDMZ2RuBftRnsx4LhN-O0s1DYi9pEmCTgznQesuSvNik",
    rarity: "mythical"
  },
  {
    id: "skin-82",
    name: "Autotronic",
    weapon: "M9 Bayonet",
    wear: "Well-Worn",
    price: 62228,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWCD_uMvj-NoVhaygAkopy-KlIb6HifOOV5kFJRxF-RZtxLqlIXvPr63tA2NithGmHj_iiwc6i5qsOwEA_Jxq_CD2grfcepqx0gUsCA",
    rarity: "legendary"
  },
  {
    id: "skin-83",
    name: "Fade",
    weapon: "MAC-10",
    wear: "Minimal Wear",
    price: 311,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a7s2oaaBoH_yaCW-Ej-h347AwHyzqx04l4WvSyI77cCjCbQEhW8MjE-NcthG8loXlMujh7g3Ay9USCa6Cs30",
    rarity: "uncommon"
  },
  {
    id: "skin-84",
    name: "Thermal Currents",
    weapon: "PP-Bizon",
    wear: "Field-Tested",
    price: 742,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1T9veRb6FiIvmBCnSv0vt4ouh6Sha_nBovp3PRmdysdHLCZwUjDsB1FOcJ4BW4mobhZu3q7wyKj4MTzCj2jHhJu30-_a9cBrr9UcuO",
    rarity: "uncommon"
  },
  {
    id: "skin-85",
    name: "RMX",
    weapon: "PP-Bizon",
    wear: "Factory New",
    price: 418,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1Z5uihZpt_LeisAm6Xyfo45OI7S37gwEhx4WiGnt_8eS2RPw4nX8AkTeNftkS8ltLkNePj5gyI3ZUFk3vfJ75LcA",
    rarity: "uncommon"
  },
  {
    id: "skin-86",
    name: "Waves Perforated",
    weapon: "SG 553",
    wear: "Factory New",
    price: 1282,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I_826abRoH_ScGnSv1u9gtfJWQyC0nQlp4TyDnNr4c3yVPQcpX8FxQORZ5he5lYG1Mr-07wOMjt1Hyyv-3H5O5jErvbhvnntidg",
    rarity: "uncommon"
  },
  {
    id: "skin-87",
    name: "Coral Paisley",
    weapon: "MP7",
    wear: "Field-Tested",
    price: 409,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf9Tte0OKvYbdhJemsGWaCzNF6ueZhW2fklEV-sGvUzdigdX2WbgciCZQjRe9b50Xqm4bkMevj5gaMgo1AnCiskGoXuQsY-r8v",
    rarity: "common"
  },
  {
    id: "skin-88",
    name: "Wild Six",
    weapon: "Nova",
    wear: "Well-Worn",
    price: 2364,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiVI0PyhfqVSIf6QBmiCyPpzj-1gSCGn20t-4jnUzI7_IHifblIpDJJzF7UP5kPpxtHgMu62tAPZjY4Ryn72hnlXrnE8sT3rGLc",
    rarity: "rare"
  },
  {
    id: "skin-89",
    name: "Blaze Orange",
    weapon: "XM1014",
    wear: "Well-Worn",
    price: 1061,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk5-uRYLFjNPWBMWWcwPRzj-57Tie0kCIrujqNjsGtdSiVbVBxCpJ5QuFbsUPpk9G2Mb6ztAza2IhDzyuojitB7Ck5tuxTT-N7rSTH9lIp",
    rarity: "uncommon"
  },
  {
    id: "skin-90",
    name: "Minotaur's Labyrinth",
    weapon: "UMP-45",
    wear: "Field-Tested",
    price: 1304,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1Y-s2iaaZ0MvmdGm-vzedxuPUnHSiwwUUh5jndn939dC2QaVApXJdwR7Ncsxe8xtWyMrmwtAWIjohGzzK-0H1h0wYN6w",
    rarity: "uncommon"
  },
  {
    id: "skin-91",
    name: "Blue Steel",
    weapon: "XM1014",
    wear: "Well-Worn",
    price: 403,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7uORaqh4JfSsAm6Xyfo4s7NrFnmylk114jiBnNn7cC7GaFcgC5pxEbZe5kTslYG0N7625laN2JUFk3tWvCSOkg",
    rarity: "common"
  },
  {
    id: "skin-92",
    name: "Schematic",
    weapon: "P90",
    wear: "Factory New",
    price: 518,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf9Ttk-fe8fK1qL_eWAVicyOl-pK89HXrjwhh_sGWDz4yrcn-eZlR1XMAkFOYIshTqlIXlMbnk7lHWiIlE02yg2XF_CACM",
    rarity: "uncommon"
  },
  {
    id: "skin-93",
    name: "Marble Fade",
    weapon: "Nomad Knife",
    wear: "Factory New",
    price: 68669,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GeMWqR0-x6td5vTi22qhEutDWR1NqsdS6Wa1UpC8cjQ7QJ5BHqx9zjZurgsgfZiYgXn3r7hy8b6yo_5OocEf1y7tM7KOE",
    rarity: "legendary"
  },
  {
    id: "skin-94",
    name: "Ultraviolet",
    weapon: "Stiletto Knife",
    wear: "Factory New",
    price: 94062,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-AAViA1PxmvORWQyC0nQlptmmGmdeqcHyebQ5zXJVzFrMC4RO8moHlZOPj4Fba2dlAzin3iX9L7DErvbgj2cX5Sw",
    rarity: "legendary"
  },
  {
    id: "skin-95",
    name: "Midnight Laminate",
    weapon: "AK-47",
    wear: "Battle-Scarred",
    price: 2249,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFU6s2neq1pJeOQC2mE_v5jovFlSha_nBovp3PRnt36d36UOlUmCcF2TOZfsRC_ldW1ML625AbZ2dhHyn_7jSgauCtp_a9cBpVVSdXG",
    rarity: "rare"
  },
  {
    id: "skin-96",
    name: "Doppler",
    weapon: "Skeleton Knife",
    wear: "Factory New",
    price: 32575,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-SA1iUzv5mvOR7cDm7lA4i4QKJk4jxNWWTZg5zDpV4R-QOsEO7lNa2NL_h41Da34tCyCiqhyxN6yxv4OoBVqcs5OSJ2Fw1OS4C",
    rarity: "legendary"
  },
  {
    id: "skin-97",
    name: "Wash me plz",
    weapon: "M4A1-S",
    wear: "Field-Tested",
    price: 289,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_iKMWiGxPxmsfJ6cC28mhkrtgKIzo6oMhTLN1F4Tox1TLUNthHuxtbuZejntAzWjNlNmX6rjylJuyhp6-kLBKt38vKFiFuUL_Rjtk_8Ljjf",
    rarity: "common"
  },
  {
    id: "skin-98",
    name: "Scorched",
    weapon: "Karambit",
    wear: "Well-Worn",
    price: 123541,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-AHliUwP5mvORWQyC0nQlptmzcntmody-fbAYlDpElTLZf50W_ltS2NrywsgWMidlFyS2riS0Y7DErvbjAAm1c_A",
    rarity: "legendary"
  },
  {
    id: "skin-99",
    name: "Savannah Halftone",
    weapon: "MP5-SD",
    wear: "Field-Tested",
    price: 129,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1T-82sZLF_H_OSA2ivzP4jo-VWQiy3nAgq_TjTyN6qICqTPVRzCZN4Q7EKsES6xtDlMb7gsQXb3oxHzHj32HtJ73p1o7FV_MEGTHA",
    rarity: "common"
  },
  {
    id: "skin-100",
    name: "Electric Hive",
    weapon: "AWP",
    wear: "Factory New",
    price: 28765,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk5_u4bZthKfebGinElLtytLVtG362x05wsWyByt2scHrGOgd1WZJ1ROBc4xi_ld3gNO7g-UWA3Kwc2RVq",
    rarity: "mythical"
  },
  {
    id: "skin-101",
    name: "Woodsman",
    weapon: "P2000",
    wear: "Well-Worn",
    price: 7700,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMW-Fz_pzot5lRi67gVMi5GuBzo6sJXiSOAJxCMR2RuECthTskNG1Yrm3sgCM345CyCj32yJP8G81tLtUlzXH",
    rarity: "rare"
  },
  {
    id: "skin-102",
    name: "Ultraviolet",
    weapon: "Ursus Knife",
    wear: "Battle-Scarred",
    price: 138528,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5t-L8-DG3WAzetJvOhuRz39k0Rw4jiHw4r4I3nEZ1UiWZJ3F7Jb4xPul9HnNejgtADWjNoUmC76iDQJsHhIUD-ATQ",
    rarity: "legendary"
  },
  {
    id: "skin-103",
    name: "In Living Color",
    weapon: "M4A4",
    wear: "Minimal Wear",
    price: 93108,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSLP-FC1icyOl-pK84GH2wxhty4DjcyNuhdHyXbAVxW8QjTbEMthC8kNa0MLmzs1Hbj95E02yg2bbWGcKW",
    rarity: "legendary"
  },
  {
    id: "skin-104",
    name: "AXIA",
    weapon: "Glock-18",
    wear: "Minimal Wear",
    price: 9054,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_PGmV6V1KfGsCWufwuVJvOhuRz39lh93sDmDytj6InjCaQ52ApF1EeIMuxC9wNPmNe3k7wLfjIJGm32o2zQJsHgd3ZW3tg",
    rarity: "mythical"
  },
  {
    id: "skin-105",
    name: "Gamma Doppler",
    weapon: "Karambit",
    wear: "Factory New",
    price: 50955,
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20kPb5PrrukmRB-Ml0mNbR_Y3mjQeLpxo7Oy3tIteQJwc7aAnW_VK3wu27g8DtvsjLzSdksnIk4izYlha-0x8ebrZnguveFwtRKpxn8A",
    rarity: "legendary"
  },
  {
    id: "skin-106",
    name: "Urban Masked",
    weapon: "Kukri Knife",
    wear: "Factory New",
    price: 119069,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZt-MM-HD3eV_vtksuBncCW6khUz_W2GmdupJ3mfPA8jW5ZwR-QN4UKxmtOyN7y25lfW2YtNziX8jCtN7Xp1o7FVXby906g",
    rarity: "legendary"
  },
  {
    id: "skin-107",
    name: "Facility Negative",
    weapon: "P90",
    wear: "Factory New",
    price: 512,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf9Ttk7f67bbR_Kf6HMWaB1O9JvOhuRz39zE5_tmvSzNugeXyUOAMlW5pyQOcN4Re-xte0Nb_n4wXf2INNynj_jzQJsHhMSbHang",
    rarity: "uncommon"
  },
  {
    id: "skin-108",
    name: "Memento",
    weapon: "R8 Revolver",
    wear: "Minimal Wear",
    price: 205,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2pe5t_eM-eC2qVz_p5j-1gSCGn20wk4D7Vz9_9JHyeawMnXpByReMDshfuxIDnPunj5gCN2ohFyST_2C1XrnE8s2YJKK4",
    rarity: "uncommon"
  },
  {
    id: "skin-109",
    name: "Titanium Bit",
    weapon: "Tec-9",
    wear: "Field-Tested",
    price: 5165,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiNW0PSifbBoJM-HC2TJ_uJ_t-l9ASi3w0gm62qHzdz6Jy2WbAZxW8dyTOEIukawldfhY7zqtgKN2d9MyHngznQe9VU90c8",
    rarity: "rare"
  },
  {
    id: "skin-110",
    name: "Magma",
    weapon: "M249",
    wear: "Field-Tested",
    price: 1380,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wiNK0P2se61pKfGdMWuZxuZi_rNrTC-wl0gh5WXXmIqpIyiSbVIoXJckEO9eukTrx4XkMbjh51bYjIJbjXKp9iAER2c",
    rarity: "uncommon"
  },
  {
    id: "skin-111",
    name: "Attack Vector",
    weapon: "P90",
    wear: "Factory New",
    price: 6127,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_jdk__2icZt7Kf-fC3Ov0bcmj-1gSCGn20QhtW_Vm9r8InmVbFJyDJMkE-IJsEOwm9G1Mu3jswSP2t1Hyy-s3yJXrnE8K5R_WCY",
    rarity: "rare"
  },
  {
    id: "skin-112",
    name: "Navy Sheen",
    weapon: "MAG-7",
    wear: "Minimal Wear",
    price: 461,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiNW0Pyvfr1SM_iaAGKvzedxuPUnHyu2lh8j5zuBzYv4Iy3FZwJzCJMlQbEL5hO-ltPnP7zmswHY39hAxTK-0H11955Myw",
    rarity: "uncommon"
  },
  {
    id: "skin-113",
    name: "Firebreathing",
    weapon: "Desert Eagle",
    wear: "Battle-Scarred",
    price: 5445,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6_evb6hoH_aaHGKS0-t3pOlgQS6MmRQguynLn9ircSiTPFUgCJAkQbELsxXtktDkMurk4lTZ39hEyn_-3HsbvXxj4fFCD_RcNNN-xQ",
    rarity: "rare"
  },
  {
    id: "skin-114",
    name: "Black Sand",
    weapon: "Galil AR",
    wear: "Field-Tested",
    price: 262,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWaCjO13ve5WQyC0nQlp5T7dzoqpeX3FZ1R2DZd4Qe4CtRS_k9y0Ye7qtQOP2oxAyX73iytK6TErvbi0QhR0PQ",
    rarity: "uncommon"
  },
  {
    id: "skin-115",
    name: "Case Hardened",
    weapon: "Bayonet",
    wear: "Field-Tested",
    price: 48581,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PO_V6tkLPWXMWuZxuZi_uRrSXDlzUtw4WTRwtj4eX6XPAd0XsEiROcNthm-w4HhP-Pq7waKiItbjXKppDMdu0I",
    rarity: "legendary"
  },
  {
    id: "skin-116",
    name: "Hazard",
    weapon: "MAG-7",
    wear: "Battle-Scarred",
    price: 867,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wjFL0PqvcqV_JM-RHGaGztF6ueZhW2flxR8ksDvcnt_7JC7DaQUgA5FxQe8I50TsmobhMe2041SI2dpFySWrkGoXuaG6AS0C",
    rarity: "uncommon"
  },
  {
    id: "skin-117",
    name: "Doppler",
    weapon: "Shadow Daggers",
    wear: "Minimal Wear",
    price: 146686,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6VgH-KGDH6vzO9ksu1sRjO2kSIrujqNjsGgJXPFaA4kC8RxE7MPshO6lda0M-Kw7lPaiooWmX6sj35N7y495OdRT-N7remj_pWP",
    rarity: "legendary"
  },
  {
    id: "skin-118",
    name: "Blue Titanium",
    weapon: "Tec-9",
    wear: "Factory New",
    price: 520,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiNV0OanfKVjKeWeXTeG_uJ_t-l9AXnikBh-6mvTztz4eHvCOgIiCpFzQOAJ5xPulNK2Nr7q7gHcg9lEm3ngznQe7B1sAb0",
    rarity: "uncommon"
  },
  {
    id: "skin-119",
    name: "Smoking Kills",
    weapon: "MP7",
    wear: "Battle-Scarred",
    price: 11984,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf8DIM0OGjZ69kLvesBW6czf1JprNWQyC0nQlp4z7QmI2pdyjEP1ByD5BwTLQDsRXrktXjP-ri5FHYjIpExCX73CJJ6zErvbgKbpbVdg",
    rarity: "mythical"
  },
  {
    id: "skin-120",
    name: "Stained",
    weapon: "Nomad Knife",
    wear: "Battle-Scarred",
    price: 78031,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GCMWGf0-1ztN5lRi67gVMh6mjXwo6ud3rEOgVyA5ZxQeFZtBDpk9e0MrzmslDW2d5GzSit338a8G81tHbrR9Yc",
    rarity: "legendary"
  },
  {
    id: "skin-121",
    name: "Blue Steel",
    weapon: "Classic Knife",
    wear: "Factory New",
    price: 70543,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRabVSIvyGC2OvzedxuPUnGiuyw0x34jyDz9-tcX-XblVxCsElEeQLtxa_ltLnN-LhtVfd2d9MyDK-0H3ReQavbA",
    rarity: "legendary"
  },
  {
    id: "skin-122",
    name: "Black Limba",
    weapon: "Dual Berettas",
    wear: "Battle-Scarred",
    price: 859,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s29baV-L_6sC2uZ1etlj-N7Tj-8qhEutDWR1NyuJC6SPQQoC8N1TLYMthC_kNTmMOKw4gLe2osWmC6vhylB6C5i4OscEf1yNRLqhkE",
    rarity: "uncommon"
  },
  {
    id: "skin-123",
    name: "Stained",
    weapon: "Butterfly Knife",
    wear: "Factory New",
    price: 36470,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD3avx-Fks-RtcCW6khUz_TnXmImvIHuQaw8gC5AhRe4ItUTqw9a1NOyw7wTYiYgRzi__jHsbvCZ1o7FVCIQMXZk",
    rarity: "legendary"
  },
  {
    id: "skin-124",
    name: "Night Stripe",
    weapon: "Navaja Knife",
    wear: "Battle-Scarred",
    price: 28345,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJo_FWQSC0nQk0py-MiorGLSLANkI-AsF1FrUI4US9wdeyZujg5lOIiIwTzHn823hO7X5rsrlUWatxqKWEjRaBb-NTNYcBTg",
    rarity: "legendary"
  },
  {
    id: "skin-125",
    name: "Gamma Doppler",
    weapon: "M9 Bayonet",
    wear: "Minimal Wear",
    price: 138328,
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjzMrbcl1RV59VhhuzTypz9iUex-CwwOj6rYJjBclM_NwvXrFW2k7u6jMS678ucn3Y17iIr4yzcmxaxhkkdZuFr1_3NVxzAUO-pfLmq",
    rarity: "legendary"
  },
  {
    id: "skin-126",
    name: "First Class",
    weapon: "Sawed-Off",
    wear: "Well-Worn",
    price: 895,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2tfZtqMvWWAFicxO9iuOR7cDqyghgjvDuDpYPwJiPTcA9yXpB0QOQPsEW_l9DlY-3m4gaK3YtDyS_7jCpB7S9vtuwDUfck8qHJz1aWiwWPy5U",
    rarity: "uncommon"
  },
  {
    id: "skin-127",
    name: "Orange Anolis",
    weapon: "USP-S",
    wear: "Field-Tested",
    price: 5605,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSIf2sAm6KwPxyj_NsSxa_nBovp3OHn4qqcX3FbQMgD5okQeFYtBbsktLmMeux5leLjIIXxXn4i3wdvC9s_a9cBikK0tGN",
    rarity: "rare"
  },
  {
    id: "skin-128",
    name: "Chalice",
    weapon: "CZ75-Auto",
    wear: "Factory New",
    price: 2248,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s28Z71sLM-fB2CY1aBzsrQ5HnyyzBh25jzcyI3_dyqXaFcmC8ByReBZuxi-lYXlMei05FSPlcsbmsOlfuvI",
    rarity: "rare"
  },
  {
    id: "skin-129",
    name: "Doppler",
    weapon: "Stiletto Knife",
    wear: "Factory New",
    price: 23692,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SA1iUzv5mvOR7cDm7lA4i4AKJk4jxNWXBPQ8lCcR2E-QLsRXuwNHuMeiwsQKIjokWm3r2hytIvypp4O4BBaIi5OSJ2HdaKYE7",
    rarity: "legendary"
  },
  {
    id: "skin-130",
    name: "Redline",
    weapon: "AK-47",
    wear: "Field-Tested",
    price: 23877,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-RHGavzedxuPUnFniykEtzsWWBzoyuIiifaAchDZUjTOZe4RC_w4buM-6z7wzbgokUyzK-0H08hRGDMA",
    rarity: "mythical"
  },
  {
    id: "skin-131",
    name: "Bulldozer",
    weapon: "SG 553",
    wear: "Well-Worn",
    price: 3404,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I4M23bahhL-esAm6Xyfo44rZsF3jmwU53tmyDzYv6cHnCalQhXMckEe9Y5kXplIC0NrzrtAfcipUFk3th3T45rw",
    rarity: "rare"
  },
  {
    id: "skin-132",
    name: "Oxide Blaze",
    weapon: "Desert Eagle",
    wear: "Minimal Wear",
    price: 348,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKF-JeKHMWKRxuJzj-JmXTu8kRgpjDGMnYftb32UPwJxDJokRuUIsRi_lNPhM7izsgXZi49GySiq2nxNuCdttbtUB_A7uvqAjSk2l_c",
    rarity: "uncommon"
  },
  {
    id: "skin-133",
    name: "High Beam",
    weapon: "Glock-18",
    wear: "Minimal Wear",
    price: 443,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a7s24bbZ5KfecMWWc1OtJvOhuRz39zU5yt2vQntn9dC3Dbw8iDJQhF-IJ5xDqkdSxMr6251aMiI5BynqtiTQJsHhqpMNExQ",
    rarity: "common"
  },
  {
    id: "skin-134",
    name: "Hand Cannon",
    weapon: "Desert Eagle",
    wear: "Battle-Scarred",
    price: 7516,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7uORYKVjJPOSAGmfz9F6ueZhW2eww0t-6mrUn977cinDZ1IgD8YiTeUIthjpk9zkYem04wTXj4oRnCv7kGoXuTIzWSlA",
    rarity: "rare"
  },
  {
    id: "skin-135",
    name: "★ Karambit",
    weapon: "Karambit",
    wear: "Factory New",
    price: 76854,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2labZsLfKaGinEx-0u5LhqGHrjlElz52jRmN2sd3yfb1NzWZVwRbNeu0S5k9WxMuvh-UWA3ObnwJvj",
    rarity: "legendary"
  },
  {
    id: "skin-136",
    name: "Gamma Doppler",
    weapon: "Butterfly Knife",
    wear: "Minimal Wear",
    price: 53887,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2qvxONzouBlSxa-lA8lvziMgIr9HifOOV5kFJp2Ee9b4Rntm4GxY7_ntQHc2o1DmH6r3Hgcv3w4t-pXU6ZzrPHQjQnfcepq0dwfRJw",
    rarity: "legendary"
  },
  {
    id: "skin-137",
    name: "Parched",
    weapon: "Sawed-Off",
    wear: "Field-Tested",
    price: 367,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2mcZtpJeOWHHOvw-J5v-xWQyC0nQlp52_dnoqsdHjDaAInDMNzQbZc4ROxxIbgMrmxtALagtgXniiv3HxOuDErvbjDfqqgDA",
    rarity: "uncommon"
  },
  {
    id: "skin-138",
    name: "Incinegator",
    weapon: "XM1014",
    wear: "Well-Worn",
    price: 26228,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7OeRcKk8cKHHMW6ewud4tfNoWyahqhEutDWR1NuuJXqWO1d0CsdyE-9ctxPpkYDmYr6zsgKLgt5NnC33in9B7idi4u8cEf1ypt9Mlvk",
    rarity: "mythical"
  },
  {
    id: "skin-139",
    name: "Twin Turbo",
    weapon: "Dual Berettas",
    wear: "Minimal Wear",
    price: 20527,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s2qfaVhH_WfB3OV0tFkse1lVha_nBovp3OHytv8JCnBbAF1X5MjR7UPsBfrmoHuNr7nsgbfjdlAxSr63CIfuChr_a9cBiuNovOB",
    rarity: "mythical"
  },
  {
    id: "skin-140",
    name: "Caged Steel",
    weapon: "Nova",
    wear: "Field-Tested",
    price: 78,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiNW0P24aahSKPWLMWuZxuZi_rY_FiqyxER2smrRztuoeX_CagAkA8d0RLYC50W5moe2PuKztAXd2t9bjXKpf1PVBjs",
    rarity: "common"
  },
  {
    id: "skin-141",
    name: "Vandal",
    weapon: "Galil AR",
    wear: "Minimal Wear",
    price: 482,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMXGRz-p3vN5lRi67gVMj4mzVw92tdHKXPwcjD8AhR-YKtBe8mtHkNLvgtAGIjd0WxCyv2CNI8G81tKkB1-EH",
    rarity: "uncommon"
  },
  {
    id: "skin-142",
    name: "Hot Rod",
    weapon: "AUG",
    wear: "Factory New",
    price: 555,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_Cxk_feqV6hkJ_iHQDCVkuxz5bY_H3znlhtz5jzTztigeXLBbwRyD8ckTOZbt0G8wNOyZuL8p1uJa1KD__k",
    rarity: "uncommon"
  },
  {
    id: "skin-143",
    name: "Midnight Paintover",
    weapon: "Five-SeveN",
    wear: "Field-Tested",
    price: 194,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRYL1SL-aWHHeR0v1JoOBgQT28gxg1jCmAm4PGLSLANkI-X5YmF-QN4EK8wdXgNenrsgDejYNAmS33jHtB6Ctj5esBBKItqKXQhhaBb-MJGErI3w",
    rarity: "common"
  },
  {
    id: "skin-144",
    name: "Desert-Strike",
    weapon: "M4A4",
    wear: "Field-Tested",
    price: 94964,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0OanfKVjM-ScHGqvzedxuPUnHnjnxEsi4WTTntqucnuUaA92CZR2E-IDtRa-mobnYeLksQbXg4hDyTK-0H1Bbz5yqg",
    rarity: "legendary"
  },
  {
    id: "skin-145",
    name: "Crimson Web",
    weapon: "Classic Knife",
    wear: "Battle-Scarred",
    price: 138539,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRYL1SN_WRHVicyOl-pK8-HnHlwUkh62SGyd_6IHrCP1IlXJt1FuQPshXuk4fiMO2w5VGI34IU02yg2SQnu4I0",
    rarity: "legendary"
  },
  {
    id: "skin-146",
    name: "Dazzle",
    weapon: "Negev",
    wear: "Field-Tested",
    price: 1059,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1T9s2gbaNoNs-XD32KzetJvOhuRz39xxxzsmWEz9v9I3zFaQQiA5pzE7YLt0WwwdHkZrjktQXeg4gXyXj62zQJsHixNFIgjA",
    rarity: "uncommon"
  },
  {
    id: "skin-147",
    name: "Ultraviolet",
    weapon: "Nomad Knife",
    wear: "Battle-Scarred",
    price: 32079,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H-OcMXeF0_56td5lRi67gVMhsDiHyduhcS7BaQ4oApUmRrFf4ES-k9GzPumxsQLej44Wzi37i3wb8G81tLNXf6VL",
    rarity: "legendary"
  },
  {
    id: "skin-148",
    name: "Smoke Out",
    weapon: "Moto Gloves",
    wear: "Factory New",
    price: 147660,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJo-xmRCyMmRQguynLztircXjCaAAkDZp0TO4OsRW8xtznP-7mswXYj4wTnyysiHkc5n5p5PFCD_SXL_AlqA",
    rarity: "legendary"
  },
  {
    id: "skin-149",
    name: "Desert Hydra",
    weapon: "AWP",
    wear: "Factory New",
    price: 182824.26,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6x0JOKSMWuZxuZi_uA7Syu2w0Ry4mqGzYypeH3DaAEnCpt0FuAK4RjrkoDgMb7mtFfcit5bjXKpX4RFZcA",
    rarity: "legendary"
  },
  {
    id: "skin-150",
    name: "Baroque Purple",
    weapon: "AK-47",
    wear: "Battle-Scarred",
    price: 98,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0OSrZqF5L8-DG3WAzetJvOhuRz39wEgl6jyBwtqtJS6QbFRzApIkR-YLsRe6wdDvZung4gHbjd4XyH7_iTQJsHhGzMbuTA",
    rarity: "common"
  },
  {
    id: "skin-151",
    name: "Doppler",
    weapon: "Huntsman Knife",
    wear: "Factory New",
    price: 60943,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SA1iUzv5mvOR7cDm7lA4i4AKJk4jxNWWROAEmX5omROIPskTtmobkZrvjtgzajIwRmSn723xK6Shr4LpXV6Yh5OSJ2Po9oSed",
    rarity: "legendary"
  },
  {
    id: "skin-152",
    name: "Cobalt Core",
    weapon: "MAG-7",
    wear: "Battle-Scarred",
    price: 818,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiFO0P-vb_NSLemBDWKexNF6ueZhW2fkwBshsT-DntuscSiVbABzD5Z2QuRftRXuwYblY-_i5AePj49Emyn7kGoXuSUXTp8T",
    rarity: "uncommon"
  },
  {
    id: "skin-153",
    name: "Prime Conspiracy",
    weapon: "FAMAS",
    wear: "Minimal Wear",
    price: 6964,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a4s2gfalvJeKAMWqRxut4pOBWQyC0nQlp5m7Tmd39cSmSZwUlDZJwTLFZsUW5kIKyNbji71aLj4pDxX38h3wfuDErvbhergaiXw",
    rarity: "rare"
  },
  {
    id: "skin-154",
    name: "Ol' Rusty",
    weapon: "SG 553",
    wear: "Field-Tested",
    price: 12.42,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1c_M29b_E4c8-BG3SE2NF6ueZhW2e3xxt35GzSw9_8J3yePFIpCMEiRrJZukO7x4exZLiw4AGLiNgRy32rkGoXuZqsEgp2",
    rarity: "uncommon"
  },
  {
    id: "skin-155",
    name: "Short Ochre",
    weapon: "MP7",
    wear: "Factory New",
    price: 538,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf7i1k4ue9fKV_JM-fB2CY1aB04eU6H3_mwxxw4znSmd79c3LBb1MgDZNwROdcuhG7kNHuNr7i5AXflcsbmuYuTdkk",
    rarity: "uncommon"
  },
  {
    id: "skin-156",
    name: "Jet Set",
    weapon: "AK-47",
    wear: "Well-Worn",
    price: 8246,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0OWrZKhSNOKSGGKcxOpJseo9GBa_nBovp3ODydescy_FbVcoDZMkReYP4xC8w93jY7u35AeK2IhMmC__2itN73pv_a9cBpGGBr1j",
    rarity: "mythical"
  },
  {
    id: "skin-157",
    name: "★ Bowie Knife",
    weapon: "Bowie Knife",
    wear: "Factory New",
    price: 132953,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s29fbZ7KeaSAliSzvl_ta88TX61xExyt2nTz9eveHjEPQRzXMcjFuYIuhHtkIKyNLnmtACLg4sX02yg2XbF4Kcv",
    rarity: "legendary"
  },
  {
    id: "skin-158",
    name: "Slaughter",
    weapon: "Ursus Knife",
    wear: "Field-Tested",
    price: 108044,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tsLc-JC2WCwNF6ueZhW2fhkU9wtTjWytepcHueblR2ApslReYM4xS6kYDlZrnjtAzb3dpBzi2skGoXufPjJEMh",
    rarity: "legendary"
  },
  {
    id: "skin-159",
    name: "Predator",
    weapon: "Nova",
    wear: "Well-Worn",
    price: 819,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwjFL0OirarZsI_GeMWuZxuZi_rE8Fy2xx0h25z-Eyt77eSnEbw8mXJEmQeMP5EXrx4ezN7jgtAKNjIlbjXKpxHjTAt0",
    rarity: "uncommon"
  },
  {
    id: "skin-160",
    name: "Death Grip",
    weapon: "P90",
    wear: "Battle-Scarred",
    price: 3996,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf9Ttk_6v-V6ZsMvWRAWmV0tF0vPRscCW6khUz_WqAy4z6cX2Tbg8hWJN2RLQMsRPplNDmYr63sVPciIkTyij3iX5M7yt1o7FVUmFnInA",
    rarity: "rare"
  },
  {
    id: "skin-161",
    name: "Banana Cannon",
    weapon: "R8 Revolver",
    wear: "Minimal Wear",
    price: 7866,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2pe5t_eM-RD2mRz-9JvOhuRz39kU4msjzdmd6peXKTOFd2DcchEOEP40btlt3lN7iz5FbeiNpFzi_83zQJsHgWY2btRg",
    rarity: "rare"
  },
  {
    id: "skin-162",
    name: "Plume",
    weapon: "Nova",
    wear: "Well-Worn",
    price: 851,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiFO0PyhfqVSJvWSGm-V0_1hue9ucCW6khUz_Tndmd6tdHKQbAMnCZAmQrVYtRW9moayNerq5FTdioJMmST7j35L7Sp1o7FVL01CQxQ",
    rarity: "uncommon"
  },
  {
    id: "skin-163",
    name: "VariCamo",
    weapon: "M4A1-S",
    wear: "Well-Worn",
    price: 734,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_iKMXGR0-d1sexmcCW6khUz_WjSw9qgd32TaAV1DMAlRrNcuhG7xt2yM-_ktlHW2tlHxHqs2iJI7yZ1o7FVeF8MW04",
    rarity: "uncommon"
  },
  {
    id: "skin-164",
    name: "Koi",
    weapon: "Nova",
    wear: "Field-Tested",
    price: 2115,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiFO0PyhfqVSK_-aMWuZxuZi_rBqGCu3xEoksm_SzomhcHiQP1QjD8BxQuAN50TtlIK1Yri05lDeiY5bjXKpu6W3YF0",
    rarity: "rare"
  },
  {
    id: "skin-165",
    name: "Scorched",
    weapon: "Bayonet",
    wear: "Factory New",
    price: 62612,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0OG-V6BsMOCfC1icyOl-pK86HS_gwEx3sT_Ryon7c3ySO1UkCpt3Q7EL4BGxwd3lNeq24QTYiI1H02yg2fqRNo8T",
    rarity: "legendary"
  },
  {
    id: "skin-166",
    name: "Queen Jaguar",
    weapon: "Driver Gloves",
    wear: "Battle-Scarred",
    price: 23046,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5tnIfeGD3Wv2Ot6vO5-cCW6khUz_WSHm4qteC2XOg4jDcN0EOZbthDsxoDnN7m24laI3d8QnCv6hn5PvHx1o7FVsUpsiR4",
    rarity: "legendary"
  },
  {
    id: "skin-167",
    name: "Rust Coat",
    weapon: "PP-Bizon",
    wear: "Well-Worn",
    price: 713,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1a_s29fKFoLM-RHGaGztF6ueZhW2fnxU904mnQy9atcXPDbgAmXsNyQe5Ysxi6moHuN-_m4g3eid9Czn2rkGoXuZcB6ljd",
    rarity: "uncommon"
  },
  {
    id: "skin-168",
    name: "Forest DDPAT",
    weapon: "Flip Knife",
    wear: "Well-Worn",
    price: 149137,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6x0H_SXHmaE_uJ_t-l9AXmxx01xt2rRnI2uc3uRPVAkW5R0FrIIsha6wdbjZrjh4wOP3t0Ry3_gznQeDR4sxYY",
    rarity: "legendary"
  },
  {
    id: "skin-169",
    name: "Gold Leaf",
    weapon: "MP5-SD",
    wear: "Well-Worn",
    price: 872,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1T9veRb6thJM-QD2qf_uJ_t-l9ASvgwUghsGndmdyoI36TPA9xX8R5EOQOuhe8m920Mujq7wDY3YwTzn3gznQe4R7J2J0",
    rarity: "uncommon"
  },
  {
    id: "skin-170",
    name: "Moon in Libra",
    weapon: "Nova",
    wear: "Well-Worn",
    price: 528,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwipC0OihbK1sI6GsAm6Xyfo4tLhoHy_rx0ol6z-Hw4v8Ii2VOgIgCcd0E-QCu0W9lNPiYu_rtVSPjpUFk3ueOYGM7w",
    rarity: "uncommon"
  },
  {
    id: "skin-171",
    name: "Condition Zero",
    weapon: "MP5-SD",
    wear: "Factory New",
    price: 674,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePFSI_-dCm6EyOF4quR7QBa_nBovp3PQz93_InrCbAVxCcN5RbNZthm7w9e0Y-q35gbdi49GzX2vjCIf63xr_a9cBnKSfiDi",
    rarity: "uncommon"
  },
  {
    id: "skin-172",
    name: "Converter",
    weapon: "M4A4",
    wear: "Well-Worn",
    price: 1049,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwipC0OCrbJtlJeisAm6Xyfo46OAxFnHixEhztzuAyo79eCqfb1VyXpclTONctxS6w9KxMbi25Fbd2ZUFk3t2_C2R8Q",
    rarity: "uncommon"
  },
  {
    id: "skin-173",
    name: "Colony",
    weapon: "Dual Berettas",
    wear: "Minimal Wear",
    price: 931,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I4M29eKVuJc-eD3WZz-tJvOhuRz39wRx2smzVyIqtJ3OQaARzDschFO5esxm5mtHiM-7l5wCN3ohBxSz63zQJsHg_UethgQ",
    rarity: "uncommon"
  },
  {
    id: "skin-174",
    name: "Black Lotus",
    weapon: "M4A1-S",
    wear: "Field-Tested",
    price: 15920,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_ux6seJicCW8gQg0jDGMnYftb3-eOgEpDcFyQuMMtRG8kIbhMuK051ba2IMQyH6r3yof5ilv4bwLWfU7uvqA7qRNHGA",
    rarity: "mythical"
  },
  {
    id: "skin-175",
    name: "Halftone Shift",
    weapon: "XM1014",
    wear: "Field-Tested",
    price: 477,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk5-aRe6xsMPWAMX-dkL4n5N5lRi67gVN24GnSm9b9cHrGOg8hCpMmRLMC4xftwdPkYbvq5gzZio4UnC_6iy5L8G81tJrSBQ92",
    rarity: "uncommon"
  },
  {
    id: "skin-176",
    name: "Gamma Doppler",
    weapon: "Glock-18",
    wear: "Minimal Wear",
    price: 71173,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2paalgIc-XAXeAzetkj_FhTjq2wSIgvzKGkbD1KCzPKhhxC5FyRbII4Ua_ltDhY-Ln41fW2I1Ayn_9ii5P7Xpr5ekHV6Mg__HekUifZpA8glcU",
    rarity: "legendary"
  },
  {
    id: "skin-177",
    name: "Ultraviolet",
    weapon: "SG 553",
    wear: "Well-Worn",
    price: 461,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I4M2-fbZ9LPWsAm6Xyfo44bQ-Tn7gwRt-t2uAw96tIn7FOAF1CsckQLUJ4xXskdO2NLzrtAyIi5UFk3tU_MwgmA",
    rarity: "uncommon"
  },
  {
    id: "skin-178",
    name: "Polished Malachite",
    weapon: "Dual Berettas",
    wear: "Battle-Scarred",
    price: 415,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I4PGmV6lsMvKfC1iX0-dmo95lRi67gVN_5GWHz46sInLGPwAmX8F2E7MNsxPsld21Zerr5AyI34hCzHqrjShB8G81tPVumS8Z",
    rarity: "common"
  },
  {
    id: "skin-179",
    name: "Banana Leaf",
    weapon: "XM1014",
    wear: "Well-Worn",
    price: 302,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk5-uRZKFsJs-UHGKVz9F6ueZhW2e3zRlxsTvVzdqpdy6eOwF0X8ciQOcD5hjqwNLmNu7isQHfjY1Cz3mvkGoXuYSrXADo",
    rarity: "common"
  },
  {
    id: "skin-180",
    name: "Neon Rider",
    weapon: "AK-47",
    wear: "Field-Tested",
    price: 122155,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV6poL_6sHG6UxPxJvOhuRz39xkQhsTnVzoygdy7Ea1UoCZQkRe9bs0brl9TvN-m0tVHYjY5CyS35jjQJsHhk4o5zcA",
    rarity: "legendary"
  },
  {
    id: "skin-181",
    name: "Omega",
    weapon: "Sport Gloves",
    wear: "Battle-Scarred",
    price: 32383,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_KfD2Sb_vlzsuNgQS6MjBgrvzKSpYPwJiPTcFAkC5UiRrRZ5BO9ktDnM-q37wCMjN5GxCqvhngb6Chj6u0CVvAj-6fJz1aW3nluLgw",
    rarity: "legendary"
  },
  {
    id: "skin-182",
    name: "Forest Leaves",
    weapon: "USP-S",
    wear: "Battle-Scarred",
    price: 324,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSM-CsAmKR1-tlj-1gSCGn2xgh5W3Rwo2gcH6eP1IhWcYmTeYO4xTsw9TmY-mx5Q3a3ogQmSqsiCtXrnE8utrnVdI",
    rarity: "common"
  },
  {
    id: "skin-183",
    name: "dev_texture",
    weapon: "Negev",
    wear: "Minimal Wear",
    price: 3302,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2gbaNoNs-XC3GExPZipfNscCW6khUz_W_QzdmhJy7EOFAkWMdzF-dbtEK9moGyZbi37gTZi4xMxH36iipK73p1o7FVNCisfvA",
    rarity: "rare"
  },
  {
    id: "skin-184",
    name: "Cyber Security",
    weapon: "M4A4",
    wear: "Battle-Scarred",
    price: 24372,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSI-mRC3WA1OB9j-1gSCGn2x9-527Tyt-pcnyUagQlW5JxEOIOuhjrw9XlMrixtQTd2NhNmH_5jCNXrnE8Cu1wa6c",
    rarity: "mythical"
  },
  {
    id: "skin-185",
    name: "Wintergreen",
    weapon: "AK-47",
    wear: "Well-Worn",
    price: 924,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFU6s2jbbBsLPyaDViX0-tzvt47cCW6khUz_W-Ay96seSrBaQcnDJRyTbMDuxTsw9bmNLy0sQPb34JNyn_-jS9N6n51o7FVK4Nkj6A",
    rarity: "uncommon"
  },
  {
    id: "skin-186",
    name: "Case Hardened",
    weapon: "Survival Knife",
    wear: "Well-Worn",
    price: 61458,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsMc-cB2uVxdF6ueZhW2fmx0gi4jzQm9qhdSqSPVRzDJR2FOEKsha4xtbgPuy04QON3YJEyyr_kGoXuQK6HIuK",
    rarity: "legendary"
  },
  {
    id: "skin-187",
    name: "Spalted Wood",
    weapon: "AUG",
    wear: "Factory New",
    price: 479,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk6-C3V7NiL_SsAm6Xyfo44-JsFiy3wBkl6miBmNz9IHrEbAZxDZciEO8Kuxbtm93gP-Lgtlbe35UFk3vZ4ja9kg",
    rarity: "common"
  },
  {
    id: "skin-188",
    name: "Torn",
    weapon: "SCAR-20",
    wear: "Factory New",
    price: 628,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk_OKRe6dsMqLDMXSE0-d9tfNWSzyggSIrujqNjsH6eHiSOwZ0XsdxFrEIthfpx9W0Yuux4QDe34pFni-s3SpK7Hs6570KT-N7re2tWema",
    rarity: "uncommon"
  },
  {
    id: "skin-189",
    name: "Dart",
    weapon: "MP9",
    wear: "Well-Worn",
    price: 483,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_jdk4uL3V6dlJeaBAWmvzedxuPUnH3_lkRgmtmrVmNn6dC_COFUlWJZwF-df4xW8ktK2N-234QfX2IlMzjK-0H1cH54WRg",
    rarity: "uncommon"
  },
  {
    id: "skin-190",
    name: "Transport",
    weapon: "Moto Gloves",
    wear: "Well-Worn",
    price: 35539,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJqeRlQyakqh4mvjK6lob-KT-JbwZzCsR0RrYK4ETrwIbkYe_l4gSM2YNEniv73XxKvyhj4u0DVKMi_rqX0V9cNOIfoA",
    rarity: "legendary"
  },
  {
    id: "skin-191",
    name: "Boreal Forest",
    weapon: "Bowie Knife",
    wear: "Factory New",
    price: 141463,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF-qd5vQDu2hgkYsTKXn471HifOOV5kFJJzE-IJs0K7mtfgN--0tATegt1MmX332nkcvS8557sDB6Bx86XejQ7fcepqCHZuB98",
    rarity: "legendary"
  },
  {
    id: "skin-192",
    name: "Hades",
    weapon: "Tec-9",
    wear: "Battle-Scarred",
    price: 395,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wipC0PqvbKF-H_yaCW-Ej7chtLM9F322lkhxsm7Xyon_Ii-ePAYiD5ElEOUK4ETqx9DmZb_qsgDAy9USH97bt-4",
    rarity: "common"
  },
  {
    id: "skin-193",
    name: "Condemned",
    weapon: "AUG",
    wear: "Minimal Wear",
    price: 317,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf7jJk4ve9YJtrL-KWHXOvx-dktd5lRi67gVNztmXQz92qcyiWPQAiDZZ1ELUD5kG8wNW0P762tVaMjopBxCX3jiMc8G81tDi9HBdS",
    rarity: "common"
  },
  {
    id: "skin-194",
    name: "Carbon Fiber",
    weapon: "PP-Bizon",
    wear: "Minimal Wear",
    price: 420,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1a4s2tabZvL_6sCG6SxPxJvOhuRz39zEVy62yAmNn4JXOXZg52DcQiTOZb5kbumtGzZOrn4VbX2NpMyyj7jDQJsHiD-oETFg",
    rarity: "common"
  },
  {
    id: "skin-195",
    name: "Anolis",
    weapon: "PP-Bizon",
    wear: "Factory New",
    price: 508,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1T9s2iYb5sMvSsHWyZz9F6ueZhW2e2xkpytWjTydaqeHKXbAJyApN4QuUOtkG8wNTiMLm3tAKM2Y9Hny75kGoXub_Drj6P",
    rarity: "uncommon"
  },
  {
    id: "skin-196",
    name: "Doppler",
    weapon: "Paracord Knife",
    wear: "Minimal Wear",
    price: 149123,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6VgH_ScHnecxPxJoOloXCznqhEutDWR1Nz7eSnCOwEpA5twQu4CsRe8ltyzMOrntAaM3dpMzS2siypK7CY54-4cEf1yr5PbGSk",
    rarity: "legendary"
  },
  {
    id: "skin-197",
    name: "Doppler",
    weapon: "Huntsman Knife",
    wear: "Minimal Wear",
    price: 64597,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SA1iUzv5mvOR7cDm7lA4i4gKJk4jxNWXEa1V1CpR1FOQD4xK4xNzhN-6w5AXX3opCn3ivjy1N6C9t67xUU_Jw5OSJ2AqihnPi",
    rarity: "legendary"
  },
  {
    id: "skin-198",
    name: "Hand Sweaters",
    weapon: "Driver Gloves",
    wear: "Well-Worn",
    price: 114761,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3WvyuB_pN5oXS6qmRgYtC-An4HGLSLANkI-CZJzROEM4xa7lYbgM7i07lOP3okXmCn4iypM7idt4udXU6p0rqHS3haBb-PCGCVNWw",
    rarity: "legendary"
  },
  {
    id: "skin-199",
    name: "Indigo",
    weapon: "CZ75-Auto",
    wear: "Minimal Wear",
    price: 750,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1I4M2nZqBkJ_-sD2mU_ulktfhWQyC0nQlp5zmGzo2rcXnDbFJxDZoiRrII40Puw9a2YeOwsgbdjNlCnCSoiilK6TErvbj4Q9U5dw",
    rarity: "uncommon"
  },
  {
    id: "skin-200",
    name: "Crimson Batik",
    weapon: "Sawed-Off",
    wear: "Field-Tested",
    price: 216,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2mcaFSIvGHB2yvxPdzo95lRi67gVNxsGjUzIz9ci7DblclD5d1Ee5esEO4mt3vN7_g5VeIj4xAzi2r23kb8G81tFlYllZq",
    rarity: "uncommon"
  },
  {
    id: "skin-201",
    name: "Counter Terrace",
    weapon: "MAG-7",
    wear: "Minimal Wear",
    price: 1279,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wipC0PWrZ6loNOKaDViD1etmo95uXSy2myIrujqNjsH6InKeOAIgX5smTbMLtka-loflYe7n5wDZjt5AySX7hyhNuns547wBT-N7rTTigBkB",
    rarity: "uncommon"
  },
  {
    id: "skin-202",
    name: "Scorched",
    weapon: "Gut Knife",
    wear: "Factory New",
    price: 22901,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRe7RSJPGDHmuV_uJ_t-l9AX-yl0Uj6jvQnoyrcy-TPQd1ApB2E7UIuxWwkoHkMOzjsgXei4pAyXngznQeOP3RS-8",
    rarity: "legendary"
  },
  {
    id: "skin-203",
    name: "Duct Tape",
    weapon: "Hand Wraps",
    wear: "Factory New",
    price: 91894,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqhkysCmRm5_8HifOOV5kFJF5R7IIskW_kIXnNriz7w3eg4hMzCX-2nxP6SZo4u0LBKAi-aXV2V7fcepqgxTHW6A",
    rarity: "legendary"
  },
  {
    id: "skin-204",
    name: "Sheet Lightning",
    weapon: "M4A4",
    wear: "Factory New",
    price: 3058,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFL6s2iYaNlNP6aAGCvzedxuPUnSiuxw0x06mjUzt2teX2QPQQkXMQmR7EK4EG9mtyzNr62tlbb2YpHzTK-0H1YrMl7BA",
    rarity: "rare"
  },
  {
    id: "skin-205",
    name: "Oni Taiji",
    weapon: "AWP",
    wear: "Minimal Wear",
    price: 81852,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6xsLv6KD1icyOl-pK9vGCqwkx524G_WnNmsInyXOAVyXJJ0TbNb5EOxxIflYbzj4gDdiNlC02yg2XaKgrAq",
    rarity: "legendary"
  },
  {
    id: "skin-206",
    name: "Rose Hex",
    weapon: "M4A1-S",
    wear: "Battle-Scarred",
    price: 870,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_iKMW-V2e9xv-9WQyC0nQlp6mzTyNr8eH3EOAAmXMQjEOdZtxC7mt3gMuuw5FSL3YlNn3qv3CxO5jErvbgiwdR6KA",
    rarity: "uncommon"
  },
  {
    id: "skin-207",
    name: "Dream Glade",
    weapon: "G3SG1",
    wear: "Field-Tested",
    price: 3411,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1Y-s2pO7dqcc-UAmaUxNF6ueZhW2e3wkl162TVmdqvd3mUPw9yDJZ4FOYJ4UKxkNfiNrvn4QCMjdlHmHj6kGoXub9gXKkW",
    rarity: "rare"
  },
  {
    id: "skin-208",
    name: "Boreal Forest",
    weapon: "Nomad Knife",
    wear: "Minimal Wear",
    price: 134680,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_iKMWGf0-tlpN5rQDu2lBEYvzSCkpu3IC_EawN1WJMjRrMIsBiwlYXiPr7h5VOKgoJAyi37hy0f6Chp5egFVr1lpPOSgy8u-g",
    rarity: "legendary"
  },
  {
    id: "skin-209",
    name: "Charred",
    weapon: "Bloodhound Gloves",
    wear: "Factory New",
    price: 131915,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIlvzyGkbDqKCfRO0RPVssnHaMUsES-k9HjNrixsgbd3YIRni7-inlO5i5t6-pRAqIs_aOFjg_JZbU5sI5Deqh-Veq-pA",
    rarity: "legendary"
  },
  {
    id: "skin-210",
    name: "Cyanospatter",
    weapon: "FAMAS",
    wear: "Field-Tested",
    price: 417,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1T9s28baFrH_yaCW-Ej7olsbNsG3rmzEoj5m6Hz9atJC2WOg8iDJchR7JeuhfuwIbnZO3k4FHAy9USioZeSPo",
    rarity: "common"
  },
  {
    id: "skin-211",
    name: "Inlay",
    weapon: "R8 Revolver",
    wear: "Field-Tested",
    price: 767,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2pe5t_JeacAnGV09F3s-BnWyGmhiIloTKLgIrGLSLANkI-A5cjFOBc5ES_m921Ybux5gXeioMQzy2ojHlMuChi4bxQVfFzr6OEjRaBb-Nm3twhXg",
    rarity: "uncommon"
  },
  {
    id: "skin-212",
    name: "Ricochet",
    weapon: "AUG",
    wear: "Minimal Wear",
    price: 1234,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_C9k7uepV654LfKfC1icyOl-pK9tHi-wxUp0sTyGw4z8dXqfb1IlWcd1QedctUbpwNHgPrnjtFeLj4tD02yg2euRXb9L",
    rarity: "uncommon"
  },
  {
    id: "skin-213",
    name: "Coach Class",
    weapon: "P2000",
    wear: "Field-Tested",
    price: 190,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V6h4J_eSCWKv0bwm4LFWQyC0nQlptTmEyNf9d3mQPQ91D5sjQrYJsxO_xNGxMLzi5QOMio4TxX79iy1JvzErvbjJFhomkA",
    rarity: "common"
  },
  {
    id: "skin-214",
    name: "Ancient Ritual",
    weapon: "G3SG1",
    wear: "Well-Worn",
    price: 95,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1a4s2vZqdkJf6HMXCZz-tJvOhuRz39zE5ysWjSyterJX-VZ1UgX8EhTeVf5EOxlN3jYemwsw3WjtgQzi7-2zQJsHjSk9PLGw",
    rarity: "common"
  },
  {
    id: "skin-215",
    name: "Aeolian Dark",
    weapon: "M4A4",
    wear: "Factory New",
    price: 409,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwipC6s2vard5MvGQGlibz-Fij-w9cCW6khUz_TvQnt37cS_EaQAgDMciEbVb4EK4ktzvZb_ltlOI3o4RmHmt23xKvSh1o7FVNKLRyHM",
    rarity: "common"
  },
  {
    id: "skin-216",
    name: "Commando Company",
    weapon: "AUG",
    wear: "Minimal Wear",
    price: 1408,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk6f6ra695IeKdMWuZxuZi_rQwHHrlxRl_smzQn4qqIiqePAAmDcZyEbNYthW-k9y0Zem2swzbi9hbjXKptZgodME",
    rarity: "uncommon"
  },
  {
    id: "skin-217",
    name: "Boroque Sand",
    weapon: "Negev",
    wear: "Well-Worn",
    price: 558,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1T9s24bapoNP-sGmae_uJ_t-l9AX3glxh142zUzIz_dXiWPVMjX8EhF-MP40K8l9TiMr_j7lPXiYxGzyzgznQeGMlgK6w",
    rarity: "uncommon"
  },
  {
    id: "skin-218",
    name: "Nuclear Threat",
    weapon: "P250",
    wear: "Battle-Scarred",
    price: 2598,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjFL0Py7Y6F-NOKaHmKvxvxzte9WQyC0nQlp5mrRztyuIy3GbQF1WMN2QbFetBfulNbnPruz7lGKit4UyS6vjn9K5jErvbiRPSOzZg",
    rarity: "rare"
  },
  {
    id: "skin-219",
    name: "Death Rattle",
    weapon: "PP-Bizon",
    wear: "Well-Worn",
    price: 911,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1T9s2gbbZiJPmSMWuZxuZi_rNrHCjkw09_5mzUz4uudSrEb1QiWcd0RLMDsEK7kILkMO2071aLj41bjXKpFxy7d4g",
    rarity: "uncommon"
  },
  {
    id: "skin-220",
    name: "Nuclear Garden",
    weapon: "MAC-10",
    wear: "Well-Worn",
    price: 1119,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a4s2gfadhJfGBMXSb1OJ6o7JWQiiwxE0YvzSCkpu3Ii_COw4jDsMkEbYJsxe5xNezPu-3swCN3dhEz3_33XlA63lo6-8DWL1lpPMiXZ_jZw",
    rarity: "uncommon"
  },
  {
    id: "skin-221",
    name: "Doppler",
    weapon: "Ursus Knife",
    wear: "Factory New",
    price: 102413,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tsLc-XAXeAzetkj_FhTjq2xCIrujqNjsGrcnKTbgQjWZRyFuEL4EO4xoXuY-7n71bY2YtGxH35jSga6Cs4sboLT-N7rSrR5rr3",
    rarity: "legendary"
  },
  {
    id: "skin-222",
    name: "BI83 Spectrum",
    weapon: "MAG-7",
    wear: "Factory New",
    price: 4119,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiVI0P-vb_NSIvmAA3KEydF6ueZhW2fml0Vw4mWGnN2udHmSOgAoCJMjQOJY4xK8k9XvPu-x5Qba2N5HzH73kGoXuQbKMJGE",
    rarity: "rare"
  },
  {
    id: "skin-223",
    name: "Urban DDPAT",
    weapon: "Tec-9",
    wear: "Battle-Scarred",
    price: 215,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wipC0PaqeKV5H-WBDFicyOl-pK89HC3iwkwh522Dm9qqIijEbQN1XJt1TOZb5kbtkIbkZr7l4QTeiYIQ02yg2SkrOr2J",
    rarity: "uncommon"
  },
  {
    id: "skin-224",
    name: "Ancient Lore",
    weapon: "XM1014",
    wear: "Factory New",
    price: 3955,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7v-RaapuKfWdGliHwPx7j-1gSCGn204k626ByIqteX-TbAQjCcAhRbFcsUK5ktbhYb_j5VePi4JMnyX4in5XrnE8pNPbCik",
    rarity: "rare"
  },
  {
    id: "skin-225",
    name: "Case Hardened",
    weapon: "Falchion Knife",
    wear: "Well-Worn",
    price: 50877,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SH1ifyOJztN5lRi67gVMi4z-Hz96tcSiUblcoA5tyTONZsxG4wdPjZLvg4Q3ej99Ezyr2jS1L8G81tJVww3hv",
    rarity: "legendary"
  },
  {
    id: "skin-226",
    name: "Flame Jörmungandr",
    weapon: "AUG",
    wear: "Battle-Scarred",
    price: 1298,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_C9k5f28ZZtiMvGdCWKvzedxuPUnTn7glkly423Xy4yoJHOWaFR0A5YlQrNc5xXrm93hZejntQWN3YNCzzK-0H2szzSoFw",
    rarity: "rare"
  },
  {
    id: "skin-227",
    name: "Gamma Doppler",
    weapon: "Gut Knife",
    wear: "Minimal Wear",
    price: 63078,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRaalSJ_GeA2avxeFmoO1sXRajnRw0tm-6lob-KT-JOwEgDcN2EOEDsBnumtG1N-nr7wHc2ItAySStiC8auC9p5-1XVKUk87qX0V8XtbYmPA",
    rarity: "legendary"
  },
  {
    id: "skin-228",
    name: "Stained",
    weapon: "Gut Knife",
    wear: "Battle-Scarred",
    price: 103681,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRabVSJv-BDWKU_uJ_t-l9ASqwzUp152vXnoqrcXmfagYgCJF2Q-MD5hTqlN2zMu7m5VDYgt5Nn3jgznQeBu0Fnbw",
    rarity: "legendary"
  },
  {
    id: "skin-229",
    name: "Printstream",
    weapon: "Desert Eagle",
    wear: "Minimal Wear",
    price: 75879,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ8-DHG6e1f1iouRoQha_nBovp3OGmdeqInyVP1V0XsYlRbEI50a5wNyzZr605AyI3t5MmCSohylAuC89_a9cBoMY9UkV",
    rarity: "legendary"
  },
  {
    id: "skin-230",
    name: "Doppler",
    weapon: "Bowie Knife",
    wear: "Minimal Wear",
    price: 42337,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd57WiuqqhAmoT-Jn4bjJC_4Ml93UtZuQe5Y50O-wNzhMuji5w3e344Rny-q3H5K7iZtsekLU6El-6eBi1vHY6p9v8dqQrLELQ",
    rarity: "legendary"
  },
  {
    id: "skin-231",
    name: "Gamma Doppler",
    weapon: "Butterfly Knife",
    wear: "Minimal Wear",
    price: 82534,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2qvxu97veBWSyajhREioQKVko7qJHr4Ml93UtZuF7EMshHumoXnY76w4wLe2IxAn3r3iXhO6Sxj6rkBAvZ3-KOBjV2TNqp9v8eAgEBjpg",
    rarity: "legendary"
  },
  {
    id: "skin-232",
    name: "Eco",
    weapon: "CZ75-Auto",
    wear: "Battle-Scarred",
    price: 4711,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2tcvM4H_WQAVicyOl-pK87HivqxR5xt2_Qnt6qI3-fPFciWJBzRuFZ5Ba_moG0Mrm04lfajYwQ02yg2Q7xomN1",
    rarity: "rare"
  },
  {
    id: "skin-233",
    name: "Autotronic",
    weapon: "Gut Knife",
    wear: "Battle-Scarred",
    price: 103911,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRb7dSJ-WHMWaF1eFiou5nRiqMmRQguynLy46odXPFZw9xD5dyFOUDuhPslNXkNOLj71Db3o4Rn3j7hy8YvCZu4_FCD_SSdjZ6vg",
    rarity: "legendary"
  },
  {
    id: "skin-234",
    name: "Torque",
    weapon: "AUG",
    wear: "Well-Worn",
    price: 1761,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_jdk7uepV7R_L_eBC3SDyPhJvOhuRz39lxhxsm_WzN37Iy7CbAcmC8B2QuYPtRCwx9HvNr-xtQPaj95EmS__3TQJsHjrLu4xbg",
    rarity: "rare"
  },
  {
    id: "skin-235",
    name: "Doppler",
    weapon: "Survival Knife",
    wear: "Factory New",
    price: 82849,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsLc-AD3eAyedktd5kTjuxmRguqTiBpYPwJiPTcAUjCpohTOYPtES7ldzvYrjl5laLi4JBnC_6iS1PvHtst7wDV_Ui-fLJz1aWWu-XwP8",
    rarity: "legendary"
  },
  {
    id: "skin-236",
    name: "Crimson Web",
    weapon: "Navaja Knife",
    wear: "Battle-Scarred",
    price: 52401,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJuPhWWCyxhiIrujqNjsGtJS-eag4iCpN4QrZYsEK_m9K0ZLzl4gOLiYgQxSj2in9Buis_5OZRT-N7rdEUHJYn",
    rarity: "legendary"
  },
  {
    id: "skin-237",
    name: "Fowl Play",
    weapon: "Five-SeveN",
    wear: "Factory New",
    price: 11041,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRabVSdaesCGKR1eZzovJWQyC0nQlptm_Vw9ercnOUaA8lA5skFuIPsxPqmtXkNu205lfYiN8XnCyvj3hNvDErvbiIo1idJQ",
    rarity: "mythical"
  },
  {
    id: "skin-238",
    name: "Lore",
    weapon: "Karambit",
    wear: "Minimal Wear",
    price: 60097,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-QG1ibwPx3vd5lQDu2qhEutDWR1IqrIHLCZlUmDJYlTLFb50HuwdyxPu2w4lCKjI5HniT2jS1PuCxj5e0cEf1y9ZCADXU",
    rarity: "legendary"
  },
  {
    id: "skin-239",
    name: "Dark Water",
    weapon: "M4A1-S",
    wear: "Minimal Wear",
    price: 7634,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GeMX2Vw_x3j-VoXSKMmRQguynLzI6td3-TPQAlD5slR-EJ5hDux9XmMe7i71CI2t8UzSuthi9OvSlo6vFCD_TltxSe0A",
    rarity: "rare"
  },
  {
    id: "skin-240",
    name: "Hideout",
    weapon: "Dual Berettas",
    wear: "Factory New",
    price: 1154,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1f-vOiV6ZoMvWHGmaD_uJzpOloQxa0hxQpjDGMnYftb3-WbQ92WcZ4EeFZs0TtxIfvZr_m7wXW2I0TySv93ywd5yxu5-0FAPE7uvqA-FxXgtE",
    rarity: "uncommon"
  },
  {
    id: "skin-241",
    name: "Leaded Glass",
    weapon: "M4A1-S",
    wear: "Well-Worn",
    price: 20280,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9Jo-loWz22hyIrujqNjsH8dn6ePwB2DpEmFuAMt0HulYa1Nu2z4QWPjt9NnCX63H9M5ys96r1QT-N7rZDTLd1E",
    rarity: "mythical"
  },
  {
    id: "skin-242",
    name: "Circaetus",
    weapon: "CZ75-Auto",
    wear: "Factory New",
    price: 983,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2tcvM4H-ebB3Wc1ud4tN5lRi67gVN242-AzNuoIyieOg8lDJdyEeVe40TqxoDvZLixtVPZ2IhFmC333yNJ8G81tFbyihAW",
    rarity: "uncommon"
  },
  {
    id: "skin-243",
    name: "Reactor",
    weapon: "Glock-18",
    wear: "Factory New",
    price: 970,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2gfadhJfGBMXeR1fpzou84cC6_mh4sjDGMnYftb3yTbAQjA5NxR-4MtRjumtzkM-yzsVDegtkWyyX43ytBvC9tsrpRAKE7uvqAUKOQcp4",
    rarity: "uncommon"
  },
  {
    id: "skin-244",
    name: "Lifted Spirits",
    weapon: "P2000",
    wear: "Battle-Scarred",
    price: 606,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_K8-VAn6Zz-lJtPNsTiSMmRQguynLydatcHrEOgIhXJZxReINtRO7ltexZuiwtQPd34lFxXqqjisYun444fFCD_R1ajI6RQ",
    rarity: "uncommon"
  },
  {
    id: "skin-245",
    name: "Threat Detected",
    weapon: "SSG 08",
    wear: "Well-Worn",
    price: 1358,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1a4s2nZrBoLPyaCWKewutJv_NoQS62qhEutDWR1ImuJy_BagUgDMR1ROVbthK6xofvNrnk5lHditpByCz3iC9M7Cdv4ekcEf1ytraGvsY",
    rarity: "uncommon"
  },
  {
    id: "skin-246",
    name: "Hot Shot",
    weapon: "Five-SeveN",
    wear: "Factory New",
    price: 115,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRe6tSJ-KWF1ie1O16teB7cCahlBMgtgKDk5n8HjjCKFN-Zc4pEr9OrBm4xN3vNrix41aIjtkQyH-s2ipMvSY_sOxRBaFx-vCE3AuXYLE_45kdZKHwQRxY8PU",
    rarity: "common"
  },
  {
    id: "skin-247",
    name: "Fire Elemental",
    weapon: "P2000",
    wear: "Battle-Scarred",
    price: 47771,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMWGZ0-tJte1sQiy9gRwrjDGMnYftb3-RZldxWJVyF-QLsUG5mofnML_qtg3cjd4TyCr4jXsf63lr4-5TVvA7uvqA-y0nTh8",
    rarity: "legendary"
  },
  {
    id: "skin-248",
    name: "Winterized",
    weapon: "Glock-18",
    wear: "Battle-Scarred",
    price: 1465,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK8-WAm6ExNF1sexmcCW6khUz_W6Azdn6eCrBalcjXJpzE7EO5xa_l4DuNu6ws1Hb2IgUn32si39B5y11o7FVC5qcAFg",
    rarity: "uncommon"
  },
  {
    id: "skin-249",
    name: "Latte Rush",
    weapon: "MP9",
    wear: "Minimal Wear",
    price: 25289,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_jdk4uL3V6hsNOSWMWuZxuZi_rdrGCyxxER252ncw9arJC-QOAcmXsF2ROAP4RbrlNOzNbzq5VDb2YJbjXKpzLFi2t8",
    rarity: "mythical"
  },
  {
    id: "skin-250",
    name: "Amber Fade",
    weapon: "Sawed-Off",
    wear: "Well-Worn",
    price: 1112,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2vaZtrIfSWMWqV1e96vOhqcCW6khUz_TuHwt2odHKROA90WZN2Fu4DsEO-mtTlNLiws1SNi99NxHmtj3tI5n11o7FVJSB89LY",
    rarity: "uncommon"
  },
  {
    id: "skin-251",
    name: "Rust Coat",
    weapon: "Stiletto Knife",
    wear: "Well-Worn",
    price: 77402,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SH1iD1etzvN5iQSC1kCIqtjmMj4K3dCqUbgVzDJQiR7FcshW8kNfvNejh5wKPgokXyS__3y1N634_5OsKVr1lpPNkLaxKOQ",
    rarity: "legendary"
  },
  {
    id: "skin-252",
    name: "Cocoa Rampage",
    weapon: "P90",
    wear: "Factory New",
    price: 1292,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf9Ttk_6v-V6BkLv-sHGad0e9xtd5lRi67gVMl52jUztr9cn7CbQEmWZV1R-ED5BHqx9G1PuOxsgWM2N4Xniqrh35L8G81tGacA9-f",
    rarity: "uncommon"
  },
  {
    id: "skin-253",
    name: "Grassland Leaves",
    weapon: "P2000",
    wear: "Factory New",
    price: 303,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0OG-V6hoIeaWHViX0-9lo-1oQS2MmRQguynLzI77dSqVbwF0D8MkTOYJ5xfpl9zhM-62tleI3o0TxHmviisdvCxttvFCD_RWG0AtOw",
    rarity: "common"
  },
  {
    id: "skin-254",
    name: "Berries And Cherries",
    weapon: "Five-SeveN",
    wear: "Factory New",
    price: 3027,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRaaVSJvGXC1iCxOpJsu18Sha_nBovp3OEmY2vIi_FagEoDMMjQuMKthDqm9TjP-O3sVSLio0Qnnr22i0f7C9t_a9cBnO-dw69",
    rarity: "rare"
  },
  {
    id: "skin-255",
    name: "Gamma Doppler",
    weapon: "Butterfly Knife",
    wear: "Minimal Wear",
    price: 24964,
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPD1PrbQqW9e-NV9j_v-5YT0m1HnlB81NDG3Oo7HcwM5NQ7U_gO8yb28gZG07ZvIzXdivXMg4HvUyhDkiR4eZ-Rv1qGACQLJqUKvgfw",
    rarity: "legendary"
  },
  {
    id: "skin-256",
    name: "Guerrilla",
    weapon: "MP7",
    wear: "Well-Worn",
    price: 862,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_jdk4uL5V69lIfuaMWuZxuZi_uU7Hy22xE5x5TnWyYqvIi2SaVN0C8d1QeVf4RC-kdC0MOPl4Qbf2dhbjXKpOJ4z2JA",
    rarity: "uncommon"
  },
  {
    id: "skin-257",
    name: "Spectrogram",
    weapon: "M249",
    wear: "Well-Worn",
    price: 194,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wipP0OKraa9-H-KSB2mSzvlJvOhuRz39kxsj5WXUz4urInmWblIgCZVxTbJfthXsmoDuM-m05QPeiIJAyiuvjjQJsHhX7l6_wQ",
    rarity: "common"
  },
  {
    id: "skin-258",
    name: "Black Nile",
    weapon: "AWP",
    wear: "Field-Tested",
    price: 246,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V7d5Mv-dC1icyOl-pK89Gyvhlhsit2-BwoyrICmWPQcmDpEkQOdeskOxwNKzN7vm4VeP2oMR02yg2Z2CmmVC",
    rarity: "uncommon"
  },
  {
    id: "skin-259",
    name: "Connexion",
    weapon: "Galil AR",
    wear: "Battle-Scarred",
    price: 5150,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMXeYzut4uflWQyC0nQlpt22Dzd_4cS7Db1NzDZYkQuIKsBW4xt3jPurq7gPag4oXnCqrhipB7TErvbi_0k78nw",
    rarity: "rare"
  },
  {
    id: "skin-260",
    name: "Giraffe",
    weapon: "Hand Wraps",
    wear: "Well-Worn",
    price: 68374,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqhsmsS-MmbD-KDnGOFB1Zc4pEr9OrBm6w9bgM-Pi4wLe34tNnCT3jCxJ53s_6rsBUqQkq63V2wnBZOJo55YdZKHw2FL19Wg",
    rarity: "legendary"
  },
  {
    id: "skin-261",
    name: "Gold Brick",
    weapon: "MAC-10",
    wear: "Battle-Scarred",
    price: 5433,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a4s2pZ6hpH_KBB2Sb_uJ_t-l9AX2wwhl35jzRw4yodymWO1R0X5V0FrRc4Bi-m4DuY-2xsgzY39oRmSTgznQe6Q1Q_KE",
    rarity: "rare"
  },
  {
    id: "skin-262",
    name: "Golden Coil",
    weapon: "M4A1-S",
    wear: "Battle-Scarred",
    price: 50833,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj_JnTiK2lxQztgKClYP9HifOOV5kFJclQ-Jb5xW-m9CxPuLq4QTfjd0XzyX6jCpL6X5o5OgDVfYn_a2Ci1rfcepqgV49FrE",
    rarity: "legendary"
  },
  {
    id: "skin-263",
    name: "Tempest",
    weapon: "Nova",
    wear: "Field-Tested",
    price: 1454,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwipC0OGrabdkJPWsDHWR1-FJvOhuRz39xUUk4jiHyt_9cXzGZwV2CJJyQbYN4Ua9wdPiZr6x4FTcjIhMzXmsjjQJsHjYOlWGdQ",
    rarity: "uncommon"
  },
  {
    id: "skin-264",
    name: "Tigris",
    weapon: "CZ75-Auto",
    wear: "Minimal Wear",
    price: 2462,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2tP_FsbeSaCWKC_uJ_t-l9ASvil0R15WjUmYmqc33CaQ91W5QlRbVetETtwNC1P-u34g2L2dpEmS_gznQebcVQ6rs",
    rarity: "rare"
  },
  {
    id: "skin-265",
    name: "Brake Light",
    weapon: "Sawed-Off",
    wear: "Factory New",
    price: 1356,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2vaZt7JeKHB2Cf_vxztN5lRi67gVMj5T_Ry9yhcS-XaFUiDpVwEe4D4Bi9lta1Yb_m5FfdiYxNmS_3j35A8G81tL5T7kT_",
    rarity: "uncommon"
  },
  {
    id: "skin-266",
    name: "Bright Water",
    weapon: "Shadow Daggers",
    wear: "Minimal Wear",
    price: 110996,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6x0H_-QC2ae_uV4uedscHDjqhEutDWR1NapdiiWblJxCpdyROVftBS9lNa1Meng5wXd3oJEyy_7ji1J6ilu6-0cEf1yYi7ebTk",
    rarity: "legendary"
  },
  {
    id: "skin-267",
    name: "Gamma Doppler",
    weapon: "Butterfly Knife",
    wear: "Minimal Wear",
    price: 31588,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2qvxu97veBWSyajhREioQKVko7qJH_4Ml93UtZuQrVe4EOxkNHvYryx5g2L39oXyS6q2ixM5i9s474GUast_6PU3AuXY6p9v8diATcRqA",
    rarity: "legendary"
  },
  {
    id: "skin-268",
    name: "Acid Wash",
    weapon: "MP5-SD",
    wear: "Field-Tested",
    price: 736,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePFSJeSQBlicyOl-pK9rTnjqlkkitmTVn437IiiePQRyX8F4FuBc5xS_lYHgZevj7wzagosX02yg2cdA74dF",
    rarity: "uncommon"
  },
  {
    id: "skin-269",
    name: "Jungle Thicket",
    weapon: "Sawed-Off",
    wear: "Field-Tested",
    price: 881,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c29eJt9IfyeMWCCxOt4j-1gSCGn2xhztj6Bn97_dnzBaQAoA5ciE-8PukG6k9fhZOi34gOPit9BxSz7hytXrnE8FOcrcRs",
    rarity: "uncommon"
  },
  {
    id: "skin-270",
    name: "Black Laminate",
    weapon: "Shadow Daggers",
    wear: "Minimal Wear",
    price: 73304,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6N-H-CGHW-vw-J3s-pWQyi-nBMmpzi6lob-KT-JbQ9zDsMhEO8L4xS7k93mMbu35wOPitpBzij9hngY5ypitexXB_BxqbqX0V9R9Pjb9Q",
    rarity: "legendary"
  },
  {
    id: "skin-271",
    name: "Carved Jade",
    weapon: "AUG",
    wear: "Field-Tested",
    price: 1092,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_C9k5fOqbZthKfebGimWkLlytrI5TXrlwBx-sGyGw9-gcC-fZgAhCpRwQbRbtxe4kdSxP7vm-UWA3MgZU-ku",
    rarity: "uncommon"
  },
  {
    id: "skin-272",
    name: "Gator Mesh",
    weapon: "M249",
    wear: "Minimal Wear",
    price: 144,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wjFL0P-re6xSMOmHBmie_uJ_t-l9ASrkwxxwtWrUyY79I3yUaA5xWcd2RO4C4BO6l4HkZbnj7lSM2YtDzC3gznQeaJe5pgI",
    rarity: "common"
  },
  {
    id: "skin-273",
    name: "Infrastructure",
    weapon: "Negev",
    wear: "Minimal Wear",
    price: 1124,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1T9s24bbZ5KfecHXeCwPdJvOhuRz39zU9w4m3RmdmqdSiSa1BxDJMiQ-4NsELqwYHgMujm5lHbg9gRxHqo2DQJsHghIlc9AQ",
    rarity: "uncommon"
  },
  {
    id: "skin-274",
    name: "Nouveau Rouge",
    weapon: "AK-47",
    wear: "Factory New",
    price: 25415,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC6s2vY_A6H_6cG3GVwPtJvOhuRz39zBsm5j-HyNqpd32fPVd1AsB3RbEP4xntwdPuM-jl4QaK2NpCzX_23DQJsHjpyGbntg",
    rarity: "mythical"
  },
  {
    id: "skin-275",
    name: "Fragment",
    weapon: "UMP-45",
    wear: "Field-Tested",
    price: 260,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1O4uKRbrZsJ_2WAHOvzedxuPUnGH3qwxtzsjzczN-odXqePQN0C5EiFrUK50G7lYXkP7jh71bXjdlEyDK-0H3tn7dQwA",
    rarity: "uncommon"
  },
  {
    id: "skin-276",
    name: "Daybreak",
    weapon: "M4A4",
    wear: "Well-Worn",
    price: 1680,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiNW0PmnZatjL8-AG2mCyP1zj-1gSCGn2xgl5mjRzd2qeXmeO1coDZpxEeUJsxnrwYaxY7-w4wTb2NpGz3762yxXrnE8iKAzA8Q",
    rarity: "rare"
  },
  {
    id: "skin-277",
    name: "Mint Fan",
    weapon: "Desert Eagle",
    wear: "Well-Worn",
    price: 1313,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk5-aRbaV_NPisCGae0tF6ueZhW2ewlEoktW2AnI2qJHqSPFBxXJp0QrEIsRbpwYC0Purr4w3W3t1CmXiokGoXuVx1ISUO",
    rarity: "uncommon"
  },
  {
    id: "skin-278",
    name: "Red Quartz",
    weapon: "Nova",
    wear: "Factory New",
    price: 7480,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiNW0PG8cbd5IfyfB32VxdF6ueZhW2ewxEVy4j6GzI6rIHLFZlMlCZZ3RLZe50O4kNPmYuvgtVfd3o5CxSn6kGoXuWu5UcUF",
    rarity: "rare"
  },
  {
    id: "skin-279",
    name: "Ultraviolet",
    weapon: "MAC-10",
    wear: "Factory New",
    price: 1142,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1I4M2-fbZ9LPWsAm6Xyfo457RoS3vlzRx2sWWAzNz4dXvGbQ9zCsZ1FOMI40G4ktDvY-LgtQ3YipUFk3sgu3LoQg",
    rarity: "uncommon"
  },
  {
    id: "skin-280",
    name: "Brother",
    weapon: "Tec-9",
    wear: "Battle-Scarred",
    price: 7341,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiVI0Oara_1SJ-WWHG6cze9JvOhuRz39xBsj4GmEyt-vIHjEbgJ2CsR2RONfu0K_lYXvZrjg4ADYg4wXzin42DQJsHgTPX1sbQ",
    rarity: "rare"
  },
  {
    id: "skin-281",
    name: "Creme Pinstripe",
    weapon: "Sport Gloves",
    wear: "Factory New",
    price: 109381,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk6P6hfqFSM-CcHHOv0ed4o_V7Rjm2qh8rsj6OpYPwJiPTcAdzW5V2E-4IsBnswNHuZbznsQfXg4NCny_4hnhOvS04suoDVvZx86zJz1aWnYsnB-o",
    rarity: "legendary"
  },
  {
    id: "skin-282",
    name: "Death Strike",
    weapon: "SSG 08",
    wear: "Battle-Scarred",
    price: 26978,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-ADWiC0ed5vt5lRi67gVMh6jjTn9ygJSieaAEiAsB2F7Jfshe-xtHkPuvisQLXgt8UmCz523lM8G81tFON4mQ2",
    rarity: "mythical"
  },
  {
    id: "skin-283",
    name: "Phobos",
    weapon: "AWP",
    wear: "Minimal Wear",
    price: 6891,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V7RlL_KcHVicyOl-pK84GXHmwk115D6GzdqudHyUbwRxW5R3ROZbtEG8wYDiY7-x5VOKgotB02yg2bdJjfAf",
    rarity: "rare"
  },
  {
    id: "skin-284",
    name: "Gunsmoke",
    weapon: "MP7",
    wear: "Factory New",
    price: 268,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf9Ttk6PeieKFjH_yaCW-Ej7d0sbI8Gyrklht04GvXy46vJ3uQbQ4nWcN5EeAI5hPtmtzjP7nktlHAy9USqCgnGlg",
    rarity: "common"
  },
  {
    id: "skin-285",
    name: "Ticket to Hell",
    weapon: "USP-S",
    wear: "Well-Worn",
    price: 5929,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_vp5j-lsQyWMmRQguynLzt_8JXiVOwF2AsF4R-ECshftltKxZe6x41CKjotExST8jn8f7ilr5PFCD_TZVvgG5g",
    rarity: "rare"
  },
  {
    id: "skin-286",
    name: "Heat Treated",
    weapon: "Desert Eagle",
    wear: "Battle-Scarred",
    price: 11332,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7uORbKFsJ_yWMWSR0utJuOB7Syy9kBkY4QKJk4jxNWXGbQZ0CZpyTeBf4xO4m9y1Nuy05wHYg4lNySWr3C1Luyhu4LkKA6As5OSJ2JAJXn6j",
    rarity: "mythical"
  },
  {
    id: "skin-287",
    name: "★ Huntsman Knife",
    weapon: "Huntsman Knife",
    wear: "Factory New",
    price: 131644,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s26aad5KfOSAimVlugu47U5HSrmzEp14zncz4ygICiealIiAsF2EOdYtkTpwNXuYbjk-UWA3JpY_ZDP",
    rarity: "legendary"
  },
  {
    id: "skin-288",
    name: "Basket Halftone",
    weapon: "SG 553",
    wear: "Well-Worn",
    price: 444,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1T-82heqVjJ_WsDGaDyutij-1gSCGn2xxy6mndyNj6cnLCPAIlC5YkF-4Ku0W_ltDhPr6z5lfb2IJBniT7iy9XrnE8euhCJNg",
    rarity: "common"
  },
  {
    id: "skin-289",
    name: "Fade",
    weapon: "Bayonet",
    wear: "Factory New",
    price: 101859,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POvV6JsJPWsAm6Xyfo45-BrHniwzUh24jjVm4qgInnCOA4mDscmEeVcsBXtkN22P-yx5waNg5UFk3tAoG85FQ",
    rarity: "legendary"
  },
  {
    id: "skin-290",
    name: "Evil Daimyo",
    weapon: "M4A4",
    wear: "Field-Tested",
    price: 5774,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSJeaaAliUwOd7qe5WQyC0nQlp4GqGz42ucCqXaQMhDpd4R-AIsxK6ktXgZePltVPXitoRn3-tjCgd6zErvbijVJZd2Q",
    rarity: "rare"
  },
  {
    id: "skin-291",
    name: "Blue Steel",
    weapon: "Shadow Daggers",
    wear: "Factory New",
    price: 80160,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6V8H_KfG2KU_uJ_t-l9AS21w0smtm-HmIz8JHyVbgMmDJYjQeNf40G9moXiYrnqsgGNjIoUxSzgznQe0gLV55c",
    rarity: "legendary"
  },
  {
    id: "skin-292",
    name: "Damascus Steel",
    weapon: "Bayonet",
    wear: "Minimal Wear",
    price: 88651,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PO_V6BsLfGADXKD_uJ_t-l9ASu2zE904DnQyY34JSrGPQAmDsdxQ7MKsRK7k9CxNLnnswDY2tpNmCzgznQe52NAd0k",
    rarity: "legendary"
  },
  {
    id: "skin-293",
    name: "Liquidation",
    weapon: "MP5-SD",
    wear: "Well-Worn",
    price: 206,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1Y-s2jePF-JM-CG26TytF6ufB8Ri2ygRQovQKJk4jxNWXBOgUmDsN5FrIM5xi4lIHgNe7q51Pdi4pGni-t2ntA5ids5LxRVPUj5OSJ2Kcl14st",
    rarity: "uncommon"
  },
  {
    id: "skin-294",
    name: "Wash me",
    weapon: "P90",
    wear: "Well-Worn",
    price: 73,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7jJk4OSrerRsM-OsCmifxeJzj_FlWiSMmRQguynLz9qsdn6UZw4gDZUlEbNfthiwkNXlY7u05gDX3YlMnC2rjCwfuyhr4PFCD_Qqz45uYg",
    rarity: "common"
  },
  {
    id: "skin-295",
    name: "Franklin",
    weapon: "Glock-18",
    wear: "Well-Worn",
    price: 6706,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2jZ6poOc-UAmiTytF6ueZhW2eww0wmtz6Hz92hd3iUPwIhWZtzQ7UP5ha7kd22N-7j4gTZ345BnH_5kGoXuXiKVoel",
    rarity: "rare"
  },
  {
    id: "skin-296",
    name: "Propaganda",
    weapon: "MAC-10",
    wear: "Battle-Scarred",
    price: 14933,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-DHGiAwOl3vuVocCW6khUz_T_WzN6hcHOQaQIgCZIlFrEPtUS7wdW0Ne6wtFTYj9pAzyr-3SxP6n11o7FVcf1yckU",
    rarity: "mythical"
  },
  {
    id: "skin-297",
    name: "Slaughter",
    weapon: "Bowie Knife",
    wear: "Minimal Wear",
    price: 115556,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5zSiuhlCIrujqNjsGscnueZwYoDJUmFO8Nsxfpx9buMeLm5Afe3Y8RxHivjS8bu34-4rsHT-N7rRZowTHv",
    rarity: "legendary"
  },
  {
    id: "skin-298",
    name: "Atomic Alloy",
    weapon: "M4A1-S",
    wear: "Minimal Wear",
    price: 21284,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GeMWrEwL87o95oQyW8jCIooTyLnYrGLSLANkI-D5d2FrENtRG7wNDvZe-3slfci9pFmHj8jSof6yZjtugEB6QtrKTXhxaBb-PhITXxPA",
    rarity: "mythical"
  },
  {
    id: "skin-299",
    name: "Needle Point",
    weapon: "Broken Fang Gloves",
    wear: "Field-Tested",
    price: 68917,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YtTGKiI71HifOOV5kFJQlQbUL4RHukofjY-227wDaidpHnCqs3H5K6So95ekLVKck__bW3Q_fcepqSI673wM",
    rarity: "legendary"
  },
  {
    id: "skin-300",
    name: "Sandstorm",
    weapon: "Galil AR",
    wear: "Battle-Scarred",
    price: 1148,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V7dsLvSAGmiCzNF6ueZhW2exkx4m6mrcmd6heS-XZgB1ApZ3FLUI5xm6ktezMuzh7gTeiYpFnCr-kGoXuTw2UKiI",
    rarity: "uncommon"
  },
  {
    id: "skin-301",
    name: "Wicked Sick",
    weapon: "P2000",
    wear: "Minimal Wear",
    price: 24555,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMWOVwuJ_vuRWQyC0nQlp4jnTyNqodHyXOlQkDZtzF-UN4BjukYeyZuLn5Qbaj4NEzy3_3ywd5zErvbh-3lU8Iw",
    rarity: "mythical"
  },
  {
    id: "skin-302",
    name: "Red Tire",
    weapon: "Glock-18",
    wear: "Well-Worn",
    price: 222,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1I_826YbZoH-SBC2aU_vxztN5lRi67gVN15WzSmY36cn6RagEnD8MjTbIJ50W5m9OyN-rmtQGIgo9Fnimrhngd8G81tCm_mA6x",
    rarity: "common"
  },
  {
    id: "skin-303",
    name: "Forest DDPAT",
    weapon: "Kukri Knife",
    wear: "Well-Worn",
    price: 50435,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtlOc-XCneR1dF6ueZhW2eyw0wk4TuDnI6pdS7BOAcnWMFyEbNYtEa6x9HjPurj4lHajYIWny6vkGoXuZN4gz37",
    rarity: "legendary"
  },
  {
    id: "skin-304",
    name: "Rust Coat",
    weapon: "Bowie Knife",
    wear: "Battle-Scarred",
    price: 97079,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3od56Wyy2mSIsvTSDn7D0JC_OK1s-C5F1RO4Ktka_kofuMevjtgWMjI8QmSj7iStM7itv6-hXUfEnqKHQ2xaBb-ObX0d6iA",
    rarity: "legendary"
  },
  {
    id: "skin-305",
    name: "Silver Pour",
    weapon: "Dual Berettas",
    wear: "Battle-Scarred",
    price: 1312,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I4PeRaad_OfyaDViWzeFh495lRi67gVN3tmnTn4yreXvFZgYjD8QlE-QK4EGxkda0Ze20tQbZ2Y9CyS_5iC1K8G81tJXDIHOE",
    rarity: "uncommon"
  },
  {
    id: "skin-306",
    name: "Light Box",
    weapon: "MAC-10",
    wear: "Minimal Wear",
    price: 1472,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1W7vH_OJtkLPyGHW6fz9F6ueZhW2e2lBsk4WvXw974diiSblV1DMBxRrEJu0PrwNy1Mruw4gKK3d0TynmskGoXuUBgCcQQ",
    rarity: "uncommon"
  },
  {
    id: "skin-307",
    name: "Man-o'-war",
    weapon: "AWP",
    wear: "Field-Tested",
    price: 91436,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k7uW-V6NhL-KKMWuZxuZi_uM5HXG3xhh_t2iBnI2ucn3EZwEjDpJ0Q-dY5EPrxNTiYevj7gXa2IhbjXKpQIFOiXU",
    rarity: "legendary"
  },
  {
    id: "skin-308",
    name: "Ultra Violent",
    weapon: "Sport Gloves",
    wear: "Battle-Scarred",
    price: 98603,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk6P6hfqFSM-CcHHOv1et1uN5uXSi3nBgppwKHiIb-KT_4Ml93UtZuTOcLtUW8lNDvZL634FfYi4pCyiX5iXka6Htr4uhQVqt3_vfRiAzDZap9v8fuC2Vr0A",
    rarity: "legendary"
  },
  {
    id: "skin-309",
    name: "Mischief",
    weapon: "MP7",
    wear: "Well-Worn",
    price: 1052,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_jdk4uL5V7ZsI_uWGmKV09F6ueZhW2fnlE5x52Tdz4mscn6XOAFzXppyQ7RZtkTpwNzuMejn5wyPjYoTy336kGoXuS747mDn",
    rarity: "uncommon"
  },
  {
    id: "skin-310",
    name: "Exo",
    weapon: "Nova",
    wear: "Minimal Wear",
    price: 436,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiNK0PyhfqVSM_OaMWGZ_uJ_t-l9AS3lxE8k4zuGz42qciiVPQIkDcF0TLNeuhmwxtfhYbzm4wfci95FnC_gznQeGrfN1lI",
    rarity: "uncommon"
  },
  {
    id: "skin-311",
    name: "Bright Water",
    weapon: "Bowie Knife",
    wear: "Factory New",
    price: 90651,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF-qd5mTCyymyIsvTSDn7CgcRTLN1F4Tox3E7RY4BW8l4CyMLvq5gSL2oMXzCyqin5I5nttsrsGA_Ihq6LX2lnAL_Rjtv1VSd_s",
    rarity: "legendary"
  },
  {
    id: "skin-312",
    name: "Royal Legion",
    weapon: "Glock-18",
    wear: "Minimal Wear",
    price: 1362,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK6HLMWaHwPxyj-1gSCGn20gksm_Uyo7_JSmeOARyXsEhFLQMsUW_wIXuP-rj71CIiotAzCqoinhXrnE8DvG09t0",
    rarity: "rare"
  },
  {
    id: "skin-313",
    name: "Safari Mesh",
    weapon: "Skeleton Knife",
    wear: "Well-Worn",
    price: 143296,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-AHlidxP1-j_VoQRa_nBovp3PSyd6qdSqePQEhDpJ5E-cI5kK5kIe2Zrzh4Qza2I9Fyiys2i1N7Xpv_a9cBuq3CrbI",
    rarity: "legendary"
  },
  {
    id: "skin-314",
    name: "Disco Tech",
    weapon: "MAC-10",
    wear: "Battle-Scarred",
    price: 13482,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-dD2SCxNF6ueZhW2frkR5z4m_SyY37cnKRblIpW5smQOcO4EW7lYa1ZOjgtFCLg4wXnn72kGoXuTa4h8QB",
    rarity: "mythical"
  },
  {
    id: "skin-315",
    name: "Doppler",
    weapon: "Ursus Knife",
    wear: "Minimal Wear",
    price: 57927,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tsLc-XAXeAzetkj_FhTjq2xiIrujqNjsH8dSrDOgZxCsdwQbIKshHqlYa2Y-i35wzW2ItEn3mtjysdvS9s4ekET-N7rUzmvdlV",
    rarity: "legendary"
  },
  {
    id: "skin-316",
    name: "Citric Acid",
    weapon: "Tec-9",
    wear: "Minimal Wear",
    price: 384,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wjFU4M2-aa1jNM-AHmuR1f1JqeRlQyakqhEutDWR1NagcXnGOA8iXptyQO9Y5Bjpw4DlNrvntQOIiY4UyHmvh3hK7iw56rwcEf1yY9HMcYg",
    rarity: "common"
  },
  {
    id: "skin-317",
    name: "Army Mesh",
    weapon: "Tec-9",
    wear: "Minimal Wear",
    price: 812,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wjFL0P-re6xSIeKeF1icyOl-pK8xGnCxkR5_tWTQztepcHiWOwAlCpJ3Q7ML5BO-lNyxMuvl5wXYiY0Q02yg2eIzVY8M",
    rarity: "uncommon"
  },
  {
    id: "skin-318",
    name: "Doppler",
    weapon: "Navaja Knife",
    wear: "Factory New",
    price: 103750,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWTSWylhY3tjyXlrD0IDnFMlN5QMckKrtT5Uj8jILvNu7r4VfZj4gTySX_33gc6i5r475RBPAh_vKBjQrIZ7Q45sEHJ_y5DUPZghIomjw",
    rarity: "legendary"
  },
  {
    id: "skin-319",
    name: "Freehand",
    weapon: "Huntsman Knife",
    wear: "Factory New",
    price: 57773,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SA1idwPx9teVWWjmMzE0YvzSCkpu3cC-Wald2A5tyFu9esxDpktO2Nrzq4wzaiYlGzXmo3SxIuHw65bsLU71lpPPkJkZySA",
    rarity: "legendary"
  },
  {
    id: "skin-320",
    name: "Bullfrog",
    weapon: "P250",
    wear: "Well-Worn",
    price: 1248,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjIJuqKRarFhLPaBAWCvzedxuPUnG3q1kEUl6mnRmYz6JXvBOlQgXsMiRe5ZtxnpmoLiZuO0sVbcjo8XyTK-0H1rEQ3j6Q",
    rarity: "uncommon"
  },
  {
    id: "skin-321",
    name: "Forest DDPAT",
    weapon: "M9 Bayonet",
    wear: "Well-Worn",
    price: 37533,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMW-J_upyoOB9cCW6khUz_WrSzdv4d3KXZgAmW5ZxRuMJskS4wNHjM-rktgfagoxEziX5iC1I53x1o7FVgsvyhlU",
    rarity: "legendary"
  },
  {
    id: "skin-322",
    name: "Oxide Blaze",
    weapon: "XM1014",
    wear: "Well-Worn",
    price: 1354,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7OeRcKk8cKHHMWiIyOpzj-NlTjO2qhEutDWR1N-tJ3zDOFAoDZMhRrNbsUa_x9fuMrvrsgDW3YJGxHn22ixO6C9j5uscEf1ygXv9Ksw",
    rarity: "uncommon"
  },
  {
    id: "skin-323",
    name: "Urban Masked",
    weapon: "Bowie Knife",
    wear: "Field-Tested",
    price: 57521,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNFloN59Tjm2qgg1sTyLpYPwJiPTcFUkDMFxRecO50LpxNazY7vgtAHcioNExSr4iH4Y6nk-57pRWaIlqPXJz1aWG3uFyDs",
    rarity: "legendary"
  },
  {
    id: "skin-324",
    name: "Doppler",
    weapon: "Ursus Knife",
    wear: "Factory New",
    price: 82157,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tsLc-RAmaTyv5zsfNlcCSyhx8rtjSfn4vGLSLANkI-C5IiRrQN5BaxktbgNOrksVOPj9gRnin-jS8fvX4_6-kAAqNx8vLQiRaBb-PCt4gg5w",
    rarity: "legendary"
  },
  {
    id: "skin-325",
    name: "Poly Mag",
    weapon: "M4A4",
    wear: "Minimal Wear",
    price: 535,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSJfyaGmKv1e91pOhqTiWMmRQguynLzY2pIi2QawR0CpdwTOdeuhXrw9XjZeq04QLYjIlFxSz9hn9MvCw44vFCD_Q07cip4Q",
    rarity: "uncommon"
  },
  {
    id: "skin-326",
    name: "Vulcan",
    weapon: "AK-47",
    wear: "Battle-Scarred",
    price: 56478,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSMuWRDGKC_uJ_t-l9AXCxxEh14zjTztivci2ePQZ2W8NzTecD4BKwloLiYeqxtAOIj9gUyyngznQeF7I6QE8",
    rarity: "legendary"
  },
  {
    id: "skin-327",
    name: "Doppler",
    weapon: "Gut Knife",
    wear: "Factory New",
    price: 59092,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRaalSJP-DHmuV09FmuOB6SnuMmRQguynLzYqtd3uXawNxAsAmReINt0S9kNW1N-Pk5lOIiNlNnCio2yNN6Hs-sfFCD_S11dClsg",
    rarity: "legendary"
  },
  {
    id: "skin-328",
    name: "Man-o'-war",
    weapon: "Negev",
    wear: "Field-Tested",
    price: 268,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1a4s2gbaNoNs-UAmiC2NF6ueZhW2fikBh352vQyt-sI3mRbQ8lDJpxTLVfuxC5k4W0MLvm5VfeithHnij5kGoXuSdORNFb",
    rarity: "uncommon"
  },
  {
    id: "skin-329",
    name: "Doppler",
    weapon: "Navaja Knife",
    wear: "Factory New",
    price: 118778,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWSyajhREioQKVko7qJH_4Ml93UtZuTORYsxm-w9K2ZLyztlTcioNAxHn2j3sauis_5b0DAKR0_vbX2QDFNKp9v8ccuootUQ",
    rarity: "legendary"
  },
  {
    id: "skin-330",
    name: "Copper Borre",
    weapon: "MAC-10",
    wear: "Field-Tested",
    price: 1325,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a4s2lZqt5M8-RHGiHz9F6ueZhW2eywBwhsWmAz9-peSjFalQmCJFyTeEC4UO5kNTjNOy0sgXa3oxNzC36kGoXufH8E8DI",
    rarity: "uncommon"
  },
  {
    id: "skin-331",
    name: "Zander",
    weapon: "Sawed-Off",
    wear: "Well-Worn",
    price: 510,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2veZt-IeeWCmiWx9Fsse9tSjvhqhEutDWR1N79dXrBbFUgXpt4QrJb5hfuktTgYuLrtAXXiNpGySuvjS8b6i9j4escEf1ycSPZoqI",
    rarity: "uncommon"
  },
  {
    id: "skin-332",
    name: "Shallow Grave",
    weapon: "P90",
    wear: "Battle-Scarred",
    price: 24238,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf-jFk_6v-V7dlIfyfAXCvxvx3puRWQyC0nQlpsWzUyIqvcCiVPFQnW8YmEO4P5xi6xNS2Num35FbX34lCzX7_hytK5zErvbi02RizsA",
    rarity: "mythical"
  },
  {
    id: "skin-333",
    name: "Nitro",
    weapon: "MP5-SD",
    wear: "Well-Worn",
    price: 288,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1I4M2heqVjJ_WsD2STxOBio7JWQyC0nQlp42yEzImsdH3EaAEgC8N2EeYJtRbuxtDjYr_q7weI3d5FzCz43ChOvDErvbiO5Zd60w",
    rarity: "common"
  },
  {
    id: "skin-334",
    name: "Doppler",
    weapon: "Skeleton Knife",
    wear: "Minimal Wear",
    price: 26897,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-SA1iUzv5mvOR7cDm7lA4i4gKJk4jxNWWRbwR0XpokQuJYthW6kdXmZu_h5wHZ2YMRmC6s3X9IuH5i5r0LVasj5OSJ2E5r5oFO",
    rarity: "legendary"
  },
  {
    id: "skin-335",
    name: "Case Hardened",
    weapon: "M9 Bayonet",
    wear: "Well-Worn",
    price: 143661,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWaB_uF_vORtcCW6khUz_WvXnNqteHKQZlV0CpolFLZZthDpxIKyNLmx4ADYiNpHmXqvjSJA5iZ1o7FVI83_8yo",
    rarity: "legendary"
  },
  {
    id: "skin-336",
    name: "Cold Fusion",
    weapon: "Galil AR",
    wear: "Battle-Scarred",
    price: 413,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V6p4I_yWD3Wv0uVjvO16cCiigBwYvzSCkpu3cy6UbQIgC5QkReYKsEHsmtS2Yb_itA3Y2INNyXj6jHxK7Ho_selRA71lpPOhjRfzhg",
    rarity: "common"
  },
  {
    id: "skin-337",
    name: "Muertos",
    weapon: "P250",
    wear: "Battle-Scarred",
    price: 27753,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSLfGdCmacwNF6ueZhW2e1lh51sm3UmN37cHuUbQQhXJtwQO4C4BXsxtHjM-624A3a2IoWySiskGoXuSIJMqiP",
    rarity: "mythical"
  },
  {
    id: "skin-338",
    name: "Morris",
    weapon: "Sawed-Off",
    wear: "Minimal Wear",
    price: 1061,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2veZt-IeeWCiqfx-hJtu1mWCyhqhEutDWR1NypJSnDPQF2C8N2EOEL4xjqkd20Ze7q4APW3dkWxSit2i4a7Ctp4LkcEf1yx89MV8Y",
    rarity: "uncommon"
  },
  {
    id: "skin-339",
    name: "Lime Hex",
    weapon: "MP5-SD",
    wear: "Battle-Scarred",
    price: 1262,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1I_82iYaloH_iWFlicyOl-pK8_HH22xxl34DiHz9mreS-TblN2C5FwFOQN4Rjpx9C1Yunh4gfbg91M02yg2SHKjRF4",
    rarity: "uncommon"
  },
  {
    id: "skin-340",
    name: "Black Tie",
    weapon: "Driver Gloves",
    wear: "Factory New",
    price: 31263,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-NPmHDW-VxdF0vOBqRBaknRQztgKJk4jxNWXBbwdxDcZwFrFY40XrktLgNr7q4AKM2owQmX6ojSpMuCo_tulQB6ss5OSJ2E_SKQx-",
    rarity: "legendary"
  },
  {
    id: "skin-341",
    name: "Dusk Ruins",
    weapon: "Galil AR",
    wear: "Field-Tested",
    price: 1333,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V7Z4Kf6AMXWVxdF6ueZhW2fnlBkl427dno2rcXLBagYjDMN0Qu8Ls0a9wIK0PrvhtlHYgogTyy_5kGoXuQFMiuDz",
    rarity: "uncommon"
  },
  {
    id: "skin-342",
    name: "Rust Coat",
    weapon: "Huntsman Knife",
    wear: "Well-Worn",
    price: 146257,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SH1iD1etzvN5iQSC1kCIqtjmMj4K3cXiUbFd1ApZwQ-Bb5Ba5kYfjMu3hslSI2oNDyi6shy4bvy1i5-hWU71lpPPSsstkpw",
    rarity: "legendary"
  },
  {
    id: "skin-343",
    name: "Twilight Galaxy",
    weapon: "Glock-18",
    wear: "Field-Tested",
    price: 18591,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2vebFsH_afC2Sb0tF6ueZhW2e3zR9-5mjcztv8cnjBbQMiA8ZzFLUKtBbsl4LuY77q4AHdj4pNmCz-kGoXudhVSAZp",
    rarity: "mythical"
  },
  {
    id: "skin-344",
    name: "Safari Mesh",
    weapon: "Paracord Knife",
    wear: "Factory New",
    price: 61787,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV7d9H_2WHW-v1e94j-1gSCGn20t35z6HzdagcnmQPAMmD5V5Q7Rf5hLtwIK0MO-24wSM2YkXnnr_iiNXrnE8Zdgcdss",
    rarity: "legendary"
  },
  {
    id: "skin-345",
    name: "Tiger Tooth",
    weapon: "Paracord Knife",
    wear: "Minimal Wear",
    price: 127003,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6VjH-SaCWKC_uFkse9uSha_nBovp3OGnon7dXufZwcnC5cjEO8M5BDrw4LlNuvq5ADWid4XnCX63yxM5i8-_a9cBvWv3FY7",
    rarity: "legendary"
  },
  {
    id: "skin-346",
    name: "Chopper",
    weapon: "P90",
    wear: "Well-Worn",
    price: 1741,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf-jFk_6v-V6J4LPysGm-CzvpivORWQyC0nQlptWTXzt-tIyrFPQMjCpImQbED5xm5kIDhZePitlbdjotBnH783H9L7jErvbjpMmMyTQ",
    rarity: "rare"
  },
  {
    id: "skin-347",
    name: "Blue Steel",
    weapon: "Karambit",
    wear: "Factory New",
    price: 81386,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SH1iSzftztN5lRi67gVNw4D_WytioJX2WO1AmCpJ5Qu9Z4EK-wYLjMOzm4gKMjt9BnC732i9M8G81tP_ecAuH",
    rarity: "legendary"
  },
  {
    id: "skin-348",
    name: "Rat Rod",
    weapon: "AK-47",
    wear: "Field-Tested",
    price: 7997,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSLvmRDGuV09F6ueZhW2fklBx362TTnN36dHiRa1AmW5QlQuVftxO9k4HhZuvksVDc398Rzy32kGoXuR34FNLu",
    rarity: "rare"
  },
  {
    id: "skin-349",
    name: "Tropical Breeze",
    weapon: "USP-S",
    wear: "Field-Tested",
    price: 551,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSM_-WMXOCzv5_s-BlcCW6khUz_WqBz9avIyiRbAQiApB1E-dZsEK7ld3gZuPqtFHbiYtMnyn9hn5Avy51o7FVuRzLF34",
    rarity: "uncommon"
  },
  {
    id: "skin-350",
    name: "27",
    weapon: "USP-S",
    wear: "Well-Worn",
    price: 1234,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSNeODMWGZxOJyj_JnTiK2qhEutDWR1Nf8dSieZlciX5skF-INsRe_l9HuMurn5QDZ2tgTnyT82ysduHo_tekcEf1yefDz68I",
    rarity: "uncommon"
  },
  {
    id: "skin-351",
    name: "Chainmail",
    weapon: "P2000",
    wear: "Factory New",
    price: 364,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0POjV6dlIfmdA2aZzdF6ueZhW2fqxU4k6znTn434JHnEPA9yWcR2TLIJ4UK4w9e2Nbjr4QbX2owXnyr7kGoXuSuECNR4",
    rarity: "uncommon"
  },
  {
    id: "skin-352",
    name: "Ash Wood",
    weapon: "P90",
    wear: "Factory New",
    price: 500,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7jJk--Wnb7dSLPmUBnPex-p16ec6HHixlBx_4TvUwor7I3mQPFNyX8B5Ru9Z5xftl9G0Y-7nsRue1dw3cZ5lyQ",
    rarity: "common"
  },
  {
    id: "skin-353",
    name: "Gamma Doppler",
    weapon: "Gut Knife",
    wear: "Minimal Wear",
    price: 39820,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRaalSJ_GeA2avxeFmoO1sXRajnRw0tm66lob-KT-JOAIiWZRwR-NZ5hO5lde2NOrl4QyM3YtDySSoi39J6iZrtrpRAvYm-bqX0V-vZngSFg",
    rarity: "legendary"
  },
  {
    id: "skin-354",
    name: "Stalker",
    weapon: "MAC-10",
    wear: "Well-Worn",
    price: 131534,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1c_M2jaac8cM-AGmacyutkj-1gSCGn20V0t27Tw974Jy-WOg9yW8N3QOQDsxG4x9O0ZOPqtgHZ399HzST8ji9XrnE8CxAHwFY",
    rarity: "legendary"
  },
  {
    id: "skin-355",
    name: "Boreal Forest",
    weapon: "Falchion Knife",
    wear: "Factory New",
    price: 43154,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-bF1iWzvxzo_VWTSahkBwrjDGMnYftbyjDPVQgCJEhELMOtRG9mtfkP-jr7wyMjoMWny2vjSxMvCc9suxWAqU7uvqAOEaxeJw",
    rarity: "legendary"
  },
  {
    id: "skin-356",
    name: "Tropical Storm",
    weapon: "SSG 08",
    wear: "Factory New",
    price: 400,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I_82-aahgH-ObD2Of1tF6ueZhW2fhxU1ysDjWmdqvcHrGaw5xA8AkELUL5xa7ktLgZrjj5VPc2YsTxC3-kGoXuZdbLCna",
    rarity: "common"
  },
  {
    id: "skin-357",
    name: "Tiger Tear",
    weapon: "SSG 08",
    wear: "Well-Worn",
    price: 452,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1T9veRfK1qJeLBMWuZxuZi_uVqFn3hzRsjt27Xz9z6dirEZgN0D5p4R-Jf4UPrl9XnMrzm7wCLjohbjXKpscqbOIY",
    rarity: "common"
  },
  {
    id: "skin-358",
    name: "Naga",
    weapon: "Desert Eagle",
    wear: "Battle-Scarred",
    price: 4908,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7uORbKFsJ_yWMWmRxu9JvOhuRz39zEx06jjWm4n8Ii6WPFQhA5YjE7MJskPrwdTuZb7htlHbg9oTzCn2hjQJsHhQd9ynBw",
    rarity: "rare"
  },
  {
    id: "skin-359",
    name: "Nebula Crusader",
    weapon: "M249",
    wear: "Minimal Wear",
    price: 1092,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wiVI0P_8PP1SLvWRG2uR_u1kpfJoSyyhqhEutDWR1Ir_JSiXOgciDJN4RucCsRW8w4KyZu_q5FeLjN4RnCmt33lP7nxv5-wcEf1yLX15hXE",
    rarity: "rare"
  },
  {
    id: "skin-360",
    name: "Polymer",
    weapon: "CZ75-Auto",
    wear: "Factory New",
    price: 544,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s2tcrI_H_2VMWuZxuZi_rcwSnHjwxgh527SzI6oIHKUZ1dxA8ckTbUCskG6ldTuY-nh5FTf34JbjXKpj6qz0B4",
    rarity: "uncommon"
  },
  {
    id: "skin-361",
    name: "Night",
    weapon: "Desert Eagle",
    wear: "Factory New",
    price: 166,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk_P2RZq1qKOSsAm6Xyfo4seVrHHjmzRhz42XUm4mgIC6TaQYkXpMjTLIIsRawl9HhYbzktFPfgpUFk3u310nzMg",
    rarity: "common"
  },
  {
    id: "skin-362",
    name: "Gamma Doppler",
    weapon: "Bowie Knife",
    wear: "Minimal Wear",
    price: 98818,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5uTiS-lCIjvC2VlorrHjvPP0V1C_0sHLBS9g67l9G0Mu_q5ATZ3t1BxSn6in5B6yc9t7kHBaFw_aPQ3QiTNLQ_ssICOr_5Gko8dFgH",
    rarity: "legendary"
  },
  {
    id: "skin-363",
    name: "Mockingbird",
    weapon: "XM1014",
    wear: "Field-Tested",
    price: 452,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk9___OPU5H_2cDWyZz-l0ufNtcCW6khUz_T-AnNagJH3FbwQnCsEmTeEMs0aww9biMby3tleKjtkQmSX-2yMfv311o7FVNa3OfdQ",
    rarity: "uncommon"
  },
  {
    id: "skin-364",
    name: "Anodized Navy",
    weapon: "SG 553",
    wear: "Factory New",
    price: 635,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1a4c2gabJ0H_yaCW-Ej7ons-AwG37hzUQj5z_Tw9esIHnCZ1UiW5ojQuYJtBO6kNzgNrjitQXAy9USYrEgg8s",
    rarity: "uncommon"
  },
  {
    id: "skin-365",
    name: "Scorched",
    weapon: "Nomad Knife",
    wear: "Minimal Wear",
    price: 75689,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H-ODMWOR0f56td5lRi67gVN252yBy4uteS7FaQ4kA5B5Q7EMthW6wdO0Zu7m5VTXgthFzy__ji1L8G81tIOO-uWD",
    rarity: "legendary"
  },
  {
    id: "skin-366",
    name: "Grinder",
    weapon: "Glock-18",
    wear: "Field-Tested",
    price: 5478,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a_s2pZKtuK8-QAW6cxOpJvOhuRz39w00lsG-BnNj7cniROgd1WZRzReIDsBewk9G0YeOw5gWPi40Xnnr4hzQJsHiNyVoujA",
    rarity: "rare"
  },
  {
    id: "skin-367",
    name: "Angry Mob",
    weapon: "Five-SeveN",
    wear: "Well-Worn",
    price: 108539,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC1iDxPhzvt5oQS6hjCIrujqNjsH_cy2RagUjA8BwR-de5hjskNflNrnqsgaLiYgRyyythitM7Hw-sekKT-N7rXEld5dH",
    rarity: "legendary"
  },
  {
    id: "skin-368",
    name: "Kitbash",
    weapon: "MP5-SD",
    wear: "Well-Worn",
    price: 6584,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePF-JM-ED3SExOJ3vuVWQyy0lB4-jDGMnYftb32XZ1NyX5B5QuJcthi7k9K0Ye6zsQeP2IMRyiX4iSJLvC5q6-4HUaY7uvqAsG-atjE",
    rarity: "rare"
  },
  {
    id: "skin-369",
    name: "Global Offensive",
    weapon: "M4A4",
    wear: "Battle-Scarred",
    price: 241,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0PG9b6tSI_GeAVicyOl-pK89HijjkU534mTRw478IirEOgUhXpshQrMK4xW9x4biYrvnsgDd3ohA02yg2Z7zUK8D",
    rarity: "uncommon"
  },
  {
    id: "skin-370",
    name: "Primal Saber",
    weapon: "UMP-45",
    wear: "Field-Tested",
    price: 9901,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1Y-s27ZbQ5dc-DHG6dwOJlseNsXRa_nBovp3PRn478JHmePQ8hDcF2Q7YDtxXrk92zYbyw7gXYjIhEyCn_3Hsbui44_a9cBklqRdMs",
    rarity: "mythical"
  },
  {
    id: "skin-371",
    name: "Overgrowth",
    weapon: "USP-S",
    wear: "Well-Worn",
    price: 1658,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSKOmsHW6VxutJsvNoWSaMmRQguynLytyqdy2eaVUgAsB0QeIIsxfuldy2MO3gtFSI2ooRzSiq3HxA7SlvtfFCD_RGjmYWyQ",
    rarity: "rare"
  },
  {
    id: "skin-372",
    name: "Damascus Steel",
    weapon: "Nomad Knife",
    wear: "Well-Worn",
    price: 36706,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GCMWORzO9ls_R6cCW6khUz_W6Hyt-vJXifaQFzCJNzR7RZsxLsx4K0N-_m5AbZg9kXn3r93S1NvHx1o7FV4ooHb_M",
    rarity: "legendary"
  },
  {
    id: "skin-373",
    name: "Doppler",
    weapon: "Shadow Daggers",
    wear: "Factory New",
    price: 145619,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6VgH-OSHneYyPxzj-xoXSu_kBQ9tjm6mLD1KCzPKhghX5N4EOBfthfsw4LnYuvh5AbfioNHmyms3Cgf6Sk54e4CVvIl_qOEkUifZuDD3SRj",
    rarity: "legendary"
  },
  {
    id: "skin-374",
    name: "Constrictor",
    weapon: "Hand Wraps",
    wear: "Battle-Scarred",
    price: 68863,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqg4psjaAiYTwLxTILFd-XccfGb5d6lSmlYDiY-_r7gzc2IJGmX6t3CMb6iY5te0BBKt0-qDVhwyXYrU_6MQDIuHnE0r2o5Rb7g",
    rarity: "legendary"
  },
  {
    id: "skin-375",
    name: "Seigaiha",
    weapon: "Driver Gloves",
    wear: "Field-Tested",
    price: 84644,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3Wv0u13vO1mXxa-kAkmvzGMmbD7LT7CAVp5Xco0W-dZuhe6wNDuP-q05g2NiYlFmSn5iS1N7yxj4LxUWPJx-6yCiFqUNOIjoc5UtEcI9GU",
    rarity: "legendary"
  },
  {
    id: "skin-376",
    name: "Unhinged",
    weapon: "Broken Fang Gloves",
    wear: "Battle-Scarred",
    price: 69970,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YoDOEkYrqKiLJAVR8W8ErKrtT5Uj8jNfuN-2wtgeNioNDxS7_jS4av31j5L4CVqV0rvLTigzCNeE5tZkCJqm5DUPZGadTirc",
    rarity: "legendary"
  },
  {
    id: "skin-377",
    name: "Electric Blue",
    weapon: "Zeus x27",
    wear: "Field-Tested",
    price: 357,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLln4Xl7x1I4PeRbahoI-SBB2Svw-Jjtd5lRi67gVMk4WjUydf4ICiTb1N2CMRwRrQIt0KwxNXmPuyx4g3Y3o5Em36vjCIa8G81tM1Sd6W5",
    rarity: "common"
  },
  {
    id: "skin-378",
    name: "Safari Mesh",
    weapon: "Talon Knife",
    wear: "Minimal Wear",
    price: 42924,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMXSA_uNzo-lWWyi9qhEutDWR1ImueHmRbwFzCJF5RO8OtRXpkNyzM-rn51aP2YpEyS73ii5Auits6u0cEf1yj0RX76A",
    rarity: "legendary"
  },
  {
    id: "skin-379",
    name: "Slaughter",
    weapon: "Bayonet",
    wear: "Field-Tested",
    price: 116979,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV75oIuKSMWuZxuZi_uU7HyjhwUh-tm_Xydmuc3nGbwN2ApAmQeNfsUXtktOzYuLm5FPajN9bjXKpLQ8HVlE",
    rarity: "legendary"
  },
  {
    id: "skin-380",
    name: "Candy Apple",
    weapon: "Five-SeveN",
    wear: "Field-Tested",
    price: 194,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRe6tSMvWXMWuZxuZi_rAwG36xxUp-t2rVwt6vdCmSPAQnDpNxQOBY5BXsxoWzZuvg5Ffdid1bjXKptD9kyfI",
    rarity: "common"
  },
  {
    id: "skin-381",
    name: "Marble Fade",
    weapon: "Navaja Knife",
    wear: "Minimal Wear",
    price: 118772,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWQiihlxEijDuEnorGLSLANkI-DpolR7Vf5hK5kdTlNbiwsg3YiNlCm3mq3Cgd6iZusetRUPJx-qTT2xaBb-MDauzVhA",
    rarity: "legendary"
  },
  {
    id: "skin-382",
    name: "Lunar Weave",
    weapon: "Driver Gloves",
    wear: "Well-Worn",
    price: 72994,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5tvLPGQBVicyOl-pK8xTizrzER1t2rczNj9JSqRZg92CZZ2RrRetBi7kYDhZeLl7wDajo9C02yg2YX5gL0s",
    rarity: "legendary"
  },
  {
    id: "skin-383",
    name: "Emerald",
    weapon: "Dual Berettas",
    wear: "Minimal Wear",
    price: 999,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1a4c2rZaF_IfyXMWuZxuZi_uBrF3u3zE5xsWjTzIr7eHKeaVIpCpd5QOIC5xi_w9PjY-2x4QDd3opbjXKpzqjop3Y",
    rarity: "uncommon"
  },
  {
    id: "skin-384",
    name: "Gamma Doppler",
    weapon: "M9 Bayonet",
    wear: "Minimal Wear",
    price: 77549,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWad_ul3vexocC28hQ0rti-6iof4Mi6TAVp5Xco0W-UPsBDuwdfgN-jn5FHXjdpNzn322CpP5i064-oBVaEm_PWGjFmXMrAjoc5UYR0MRG0",
    rarity: "legendary"
  },
  {
    id: "skin-385",
    name: "Amber Fade",
    weapon: "P2000",
    wear: "Factory New",
    price: 4925,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0POvV6JsJPWsA2KEwOJ6ueJWQyC0nQlpsjvcmd_7dHyVZgdxAsB1QeRZ5BPqlYbmNuvr5lTW2o1Myyyt3ykY7DErvbib25P3aA",
    rarity: "rare"
  },
  {
    id: "skin-386",
    name: "PAW",
    weapon: "AWP",
    wear: "Factory New",
    price: 4581,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k7uW-V7RsN-CSGVicyOl-pK84Tn-3xkgltWWGnI39c3LDaA4lD5V0QO8It0LqktfuMOrq7gDajYJG02yg2bUm5WIV",
    rarity: "rare"
  },
  {
    id: "skin-387",
    name: "Stained",
    weapon: "Stiletto Knife",
    wear: "Field-Tested",
    price: 82703,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SH1iWzvx1teVWQyC0nQlp4zjVyNn4cX-SPQcjCMBxRbIL40Kwl9SzNu3i5wSLjY9Byyz93X4f7jErvbjY1bBrVA",
    rarity: "legendary"
  },
  {
    id: "skin-388",
    name: "Racing Green",
    weapon: "Driver Gloves",
    wear: "Field-Tested",
    price: 24202,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-NPmHDW-VxdFxouRsQRa0hxg-jDGMnYftb3mXblQnWJclRuNYtETux9DlYr-wtVaK2IsTmCT-jC4Y6ihjtr0FUaA7uvqAQikoKDk",
    rarity: "legendary"
  },
  {
    id: "skin-389",
    name: "Doppler",
    weapon: "Huntsman Knife",
    wear: "Factory New",
    price: 21517,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SA1iUzv5mvOR7cDm7lA4i4QKJk4jxNWXBag91D5JxRu8N5hC_mtflP-6x7gSMio5Nnius2i1Avypisr0CVadx5OSJ2A8DtsQk",
    rarity: "legendary"
  },
  {
    id: "skin-390",
    name: "Business Class",
    weapon: "USP-S",
    wear: "Battle-Scarred",
    price: 1063,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsAnKXxu9xtd58XDn-hiIrujqNjsGvJSjDPQ4nW5d1EO5btka6x9y1Me7ktgWM2oMWn3irjn8Y5ils5rxWT-N7rQDu-iuk",
    rarity: "uncommon"
  },
  {
    id: "skin-391",
    name: "Doppler",
    weapon: "Karambit",
    wear: "Factory New",
    price: 109810,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SA1iC1Oxvj-xoXSu_kBQ9tjm6lob-KT-JbgMoW8Z5Ee8Isha9k9K1YeLr7wXci4wQzyqsjCxBuytssrkLV6Ek-LqX0V8zRrFpiQ",
    rarity: "legendary"
  },
  {
    id: "skin-392",
    name: "Polar Mesh",
    weapon: "Nova",
    wear: "Battle-Scarred",
    price: 1468,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwjFL0P-re6xSIeKQGm6T_u15vvV7TjqnqhEutDWR1I7_dCmXbgEmWJYiFuZc4BPpkoWyYe3jsVbejt8QyiutjXxPuic45-wcEf1ynwKdBSU",
    rarity: "uncommon"
  },
  {
    id: "skin-393",
    name: "Fade",
    weapon: "Survival Knife",
    wear: "Minimal Wear",
    price: 103887,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsIc-VD2OV_uJ_t-l9AXuwwBh0sT-BydarInPGPQUpCMcjELJY5xm4xIG0NLy241Dag9hNzirgznQeOQeAleU",
    rarity: "legendary"
  },
  {
    id: "skin-394",
    name: "Oscillator",
    weapon: "UMP-45",
    wear: "Factory New",
    price: 1459,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1a4s27ZbQ5dc-WAmKT1fx5p-B_Sha_nBovp3PTztuvd3jDOlMhX5IjR7YPtRTtx4XjNum2tQOLjItHmyj5j34b6Spt_a9cBq1OnGjK",
    rarity: "uncommon"
  },
  {
    id: "skin-395",
    name: "Surveillance",
    weapon: "AUG",
    wear: "Field-Tested",
    price: 619,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_C9k5vy6bahhKfeWAGSV_ulktfhWQyC0nQlp42TWmI2seXOUb1UgXJp3F-ZbsxixltbiNLvl7gza3olCyST-i3wa6zErvbj9bg91yA",
    rarity: "uncommon"
  },
  {
    id: "skin-396",
    name: "Boreal Forest",
    weapon: "Huntsman Knife",
    wear: "Factory New",
    price: 76636,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-bF1iWzvxzo_VWTSahkBwrjDGMnYftb3qRaFMmCpokE-YOsRW5xNbjY-ri7gTb2YpDz36o3XtL7H1psecLUfI7uvqAW2HsimI",
    rarity: "legendary"
  },
  {
    id: "skin-397",
    name: "Rust Coat",
    weapon: "Sawed-Off",
    wear: "Factory New",
    price: 74,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2veZt-NPWWAlicyOl-pK87TC2ylB534jiGzNv6dCjFPQR2XpJ4RuQPtRbqx9znYujitFPZ3oJC02yg2T-LVFiK",
    rarity: "common"
  },
  {
    id: "skin-398",
    name: "Clear Polymer",
    weapon: "Nova",
    wear: "Factory New",
    price: 5195,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiFO0PyhfqVSMP-fF2qV09F6ueZhW2exxkR-tmWEmIyoJXyWZw4iDsclROVftxm7wIe1NbizswPe2YlHmCuvkGoXuVU3K7Ec",
    rarity: "rare"
  },
  {
    id: "skin-399",
    name: "Orbit Mk01",
    weapon: "AK-47",
    wear: "Field-Tested",
    price: 4475,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlV6diLP-dFzfB_vxztN5lRi67gVMk4TmEn9n_c3PGPwZyDMckTO8JsEPuktG1ZOrjsgPX2IwUyiyv3S0f8G81tLnuvOvF",
    rarity: "rare"
  },
  {
    id: "skin-400",
    name: "Doppler",
    weapon: "Survival Knife",
    wear: "Factory New",
    price: 63032,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsLc-XAXeAzetkj_FhTjq2wSIrujqNjsH_J3jDZlV1AsAmE-QNtxG6koCxY-mx41bcjo9CnC35inkb6C06tb5QT-N7rTRepqpg",
    rarity: "legendary"
  },
  {
    id: "skin-401",
    name: "Marble Fade",
    weapon: "Bayonet",
    wear: "Factory New",
    price: 85507,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6lsMvKfC1iWwOpzj-1gSCGn2xhysWrTn42rdH2SawQnDccjE-ELsxa-mtTjMejr7wXZgoxFn3n2hnhXrnE8oMvxYMA",
    rarity: "legendary"
  },
  {
    id: "skin-402",
    name: "Chocolate Chesterfield",
    weapon: "Specialist Gloves",
    wear: "Factory New",
    price: 28464,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V6NhL-aWMXSAxO1_se1gXD2MhAguvymAnrD7LSrENWl8U8UoAfkNu0Ttx4CxP-zr4wDbjN4XmX79j3xM7SdisbkLBPB0q6LWiwnHM7Zs_9Bdc2KEwswI",
    rarity: "legendary"
  },
  {
    id: "skin-403",
    name: "Freight",
    weapon: "P90",
    wear: "Minimal Wear",
    price: 1112,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf-jFk_6v-V6diLuSSB2mV09F6ueZhW2fhk09ytjmDm4n8JHOebQEgCMAmQrEMuhi4k4W0MurntVHfid5GnC38kGoXuRB1lB54",
    rarity: "uncommon"
  },
  {
    id: "skin-404",
    name: "Verdant Growth",
    weapon: "P90",
    wear: "Battle-Scarred",
    price: 498,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7jJk4v28Z5t5JeiHB2uV_ulkteRncD-6mxgYvzSCkpu3eXqUaFMkDZciEeZesxG4w4fgZe3g51HfiY4RmS33jCNMvXpst-gFAr1lpPPtRxOxww",
    rarity: "common"
  },
  {
    id: "skin-405",
    name: "X-Ray",
    weapon: "M4A4",
    wear: "Minimal Wear",
    price: 73649,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0Oq8ab1SLaSsAm6Xyfo46LAxTHrgxU8lt2WHmNf7cS-Ub1JxDpQkQecO40OwxN2yZbvg41DciJUFk3vXysuZ3Q",
    rarity: "legendary"
  },
  {
    id: "skin-406",
    name: "Case Hardened",
    weapon: "Navaja Knife",
    wear: "Factory New",
    price: 121195,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsfBWQCC_kBkYvzSCkpu3eHKWaQ8jXpQkReZZtxa_x4HvYujh41HZg9pNzX2ojCJA7itpteYHBb1lpPM10bWGng",
    rarity: "legendary"
  },
  {
    id: "skin-407",
    name: "Fallout Warning",
    weapon: "UMP-45",
    wear: "Minimal Wear",
    price: 122,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1I_82gfa9oM-SBB3eV_uN3ou5mQRa_nBovp3PTw9z8eC3BaQRyDJEiQO5YtRK8lNOxYuLjtFHe34hAyin2hi9AvX5j_a9cBo7SjwdV",
    rarity: "common"
  },
  {
    id: "skin-408",
    name: "Creep",
    weapon: "AUG",
    wear: "Minimal Wear",
    price: 815,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf7i1e0PO7b5tuMvWWHlicyOl-pK9oSnnnkRl34WqBwtavcH6TagRxWZR2E7FYuhm9wIblZr60slHXjYtM02yg2RFs1ez8",
    rarity: "uncommon"
  },
  {
    id: "skin-409",
    name: "Gungnir",
    weapon: "AWP",
    wear: "Well-Worn",
    price: 1100375.56,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6N4LvedB3WvzedxuPUnHnjnzUl0sWrdztitI3rDZgJzAsZ1QOFY4UPqldDgMO_l41HXit9AmTK-0H227dAsvQ",
    rarity: "legendary"
  },
  {
    id: "skin-410",
    name: "Spearmint",
    weapon: "Moto Gloves",
    wear: "Battle-Scarred",
    price: 143202,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJvehnWxanhxQmvTqJn7D1KCzPKhgnW5UmRO4DsxXrlYbhPurmtAXai98UzS73in5I6S5p4OsAU_Zx-KHWkUifZsxBQgc2",
    rarity: "legendary"
  },
  {
    id: "skin-411",
    name: "VariCamo",
    weapon: "G3SG1",
    wear: "Well-Worn",
    price: 425,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1T9s24abZkI_GeAVicyOl-pK9qTn7gwUlwsWrVzd2sci3GZ1cnDpF0TeNe5kG9mt21Mrzq4VPYjdhA02yg2WVbe73u",
    rarity: "common"
  },
  {
    id: "skin-412",
    name: "Necro Jr.",
    weapon: "MP5-SD",
    wear: "Battle-Scarred",
    price: 874,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePFSK_mXMWmVwvx5vu5kRiq8myIrujqNjsH8JXqXPVAhDZVyR7YO4ETrxtLvZbmxtAXfiIpCzHr5h3tB635j4-gCT-N7reJfmdfh",
    rarity: "uncommon"
  },
  {
    id: "skin-413",
    name: "Rebel",
    weapon: "Tec-9",
    wear: "Well-Worn",
    price: 12.42,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SJuKWC2OfzNF6ueZhW2fgkU0k5GmBzIn6eHjBagBxDZMhReYN5hC5ldbgNb7jtFbfgt5Ey3_3kGoXuRiiuNrn",
    rarity: "uncommon"
  },
  {
    id: "skin-414",
    name: "Doppler",
    weapon: "Nomad Knife",
    wear: "Factory New",
    price: 142586,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GeMWOf0f56tfNWXyGyhhh2jDGMnYftb3mSbQF0A5NzEbMI5BO4l4bvNujh5gPaj95Mzy75iStI7ito5-tXVvY7uvqAlag3iO0",
    rarity: "legendary"
  },
  {
    id: "skin-415",
    name: "Stained",
    weapon: "Flip Knife",
    wear: "Factory New",
    price: 148026,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6V8H_acHGSVxdF6ueZhW2fjkUUk4GzRmNuvcSnFO1MlW5RxR7MItUbskIHnZurl5ALf341Gmy-rkGoXuTDvkImE",
    rarity: "legendary"
  },
  {
    id: "skin-416",
    name: "Freehand",
    weapon: "Karambit",
    wear: "Minimal Wear",
    price: 69637,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SA1idwPx9teVWWjmMkxQptgKJk4jxNWXCOlJ2CZpyEeBbuxbrltXkMbzlsgTXit1NyST9hiJBu3ptsesLAPJ35OSJ2AmQpzvF",
    rarity: "legendary"
  },
  {
    id: "skin-417",
    name: "Antique",
    weapon: "PP-Bizon",
    wear: "Minimal Wear",
    price: 5644,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1Y-s2sYb5iLs-SAHOZ0Ptzj-1gSCGn20sj4DnTyN2pdyjFOg4oXJV5Qu5c5xS9w4bjNL7q7gHd2INGxCn_iyxXrnE83Efvvd0",
    rarity: "rare"
  },
  {
    id: "skin-418",
    name: "Fade",
    weapon: "Talon Knife",
    wear: "Factory New",
    price: 50345,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWaR_uh3tORWQyC0nQlpsmXcnNaoeHuTZwUiWMZzRrVZsxm9x9ThNrzj4QCPjdhNmHj73S9KujErvbhX2ACGeQ",
    rarity: "legendary"
  },
  {
    id: "skin-419",
    name: "Forest DDPAT",
    weapon: "Ursus Knife",
    wear: "Well-Worn",
    price: 125366,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tlOc-XCneR1dF6ueZhW2fqxU0ktmTTytugdi_CZ1ckDZYiRO8Muka-kYXiZuri4wTdjIJDyHr9kGoXuTEenuE-",
    rarity: "legendary"
  },
  {
    id: "skin-420",
    name: "Royal Paladin",
    weapon: "M4A4",
    wear: "Well-Worn",
    price: 77338,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSMv-KD2uv0v9jufNscCW6khUz_W-Az9b8d3LFZ1AnDMAjR-4CsBO9xofhNL_q4wLWjogUzyn43SxM73x1o7FVNN3FvCs",
    rarity: "legendary"
  },
  {
    id: "skin-421",
    name: "Aztec",
    weapon: "M249",
    wear: "Battle-Scarred",
    price: 3117,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wiNK0P_8PP1SIeqHC2SvzedxuPUnTirnwEslsT6Gzd2sJHLCOlUpWJohE-MMsxW6l9GxPuy24AyL398QnjK-0H18Ww4Zdw",
    rarity: "rare"
  },
  {
    id: "skin-422",
    name: "Containment Breach",
    weapon: "AWP",
    wear: "Factory New",
    price: 80648,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JkMuWAMWuZxuZi_rQ6SXq1xURysj_Vw4uhJHOVPQ8oCZt4QrRbtRi6ldPlPu_g4FHaiYNbjXKpcPI_17A",
    rarity: "legendary"
  },
  {
    id: "skin-423",
    name: "Predator",
    weapon: "M249",
    wear: "Minimal Wear",
    price: 1355,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wjFL0OirarZsI_GeMWuZxuZi_rM9H3nkk01-6mSAzon_d3vBZw4lXsB0TOQD4RftwdXmY7-3tlffioNbjXKpMr9foB4",
    rarity: "uncommon"
  },
  {
    id: "skin-424",
    name: "Apocalypto",
    weapon: "Sawed-Off",
    wear: "Minimal Wear",
    price: 2367,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2tfZt-IeeWCmiWx9F3oO5qTiWqhQkojDGMnYftb3vFbVcmDsRwEOdbtkW4lIbiMOrh4FaIiYMQxXmoiXkd7n1o5b4AWKM7uvqARUQpSmk",
    rarity: "rare"
  },
  {
    id: "skin-425",
    name: "Crimson Web",
    weapon: "Bowie Knife",
    wear: "Battle-Scarred",
    price: 133149,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF-qd5-SiugqhEutDWR1Nb6eHLCOlR0C8Z3TeEPtEHsw4KyY-Lh5gLZ2d9BnCiv2itI7Hps5-scEf1yekXUy9I",
    rarity: "legendary"
  },
  {
    id: "skin-426",
    name: "Gnarled",
    weapon: "P2000",
    wear: "Well-Worn",
    price: 1318,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PO_V7Q_cKDDMWuf0vpJp-57Qy2MmRQguynLyt38dXjDaA5zC5YlQ-Nc5BG5k93mP-jhsVeKiY8XmSr5iy5J7C1s6_FCD_TbNBDIDw",
    rarity: "uncommon"
  },
  {
    id: "skin-427",
    name: "Black Laminate",
    weapon: "Bowie Knife",
    wear: "Field-Tested",
    price: 102412,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNFxo95rQD66kCIlvzyGkbD1ICbOMFdkX_0sHLBS9g7qx9HhMuyxtA3b3o0Tyij92H4fuy5q675XAPBxrvHVh1nBOeFo5ZYAOr_5Gl4TXifL",
    rarity: "legendary"
  },
  {
    id: "skin-428",
    name: "Cobalt Quartz",
    weapon: "Dual Berettas",
    wear: "Minimal Wear",
    price: 4045,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1a4s2ter1-NPGfAm6KxOpJsu18Sha_nBovp3OGm92vdXyWOgN2Dcd2E7Zfsxa7kNe2Zbm2slSN2N1HnCmqi39MuCc6_a9cBtlhe-EA",
    rarity: "rare"
  },
  {
    id: "skin-429",
    name: "Hedge Maze",
    weapon: "Sport Gloves",
    wear: "Minimal Wear",
    price: 100206,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_eBC2Ke_uJ_t-l9AX21whwi4Gndnov9JH_FblMlCJYjRbFZtkWww4HnNbjr7wWN39gUmH7gznQeohQBtY8",
    rarity: "legendary"
  },
  {
    id: "skin-430",
    name: "Night Riot",
    weapon: "PP-Bizon",
    wear: "Factory New",
    price: 12.42,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1Y-s2sYb5iLs-BB2iE_uJ_t-l9AXqxzUQisWTWz9egc3KWbAJ0XJt5Q7YN5xnuxNDiN7iz4waLgtkWzS7gznQeDJdgNeg",
    rarity: "uncommon"
  },
  {
    id: "skin-431",
    name: "Graphite",
    weapon: "AWP",
    wear: "Minimal Wear",
    price: 23093,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k7OC7ZbRhJc-RHGaGztF6ueZhW2e2k0l2sW_WzN7_cS6SbgV1CsF3TOEI4EOwloGzNLzg5g3fiIpHxC78kGoXuTqeOjwH",
    rarity: "mythical"
  },
  {
    id: "skin-432",
    name: "Amber Fade",
    weapon: "Galil AR",
    wear: "Field-Tested",
    price: 1361,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0POvV6JsJPWsA2KEwOJ6ueJWQyC0nQlp52uGm9yodC3GZ1d0CMdyQeJctRDqmtayY-Kz71fW2IIUziz8intK6TErvbiZh4dEMQ",
    rarity: "uncommon"
  },
  {
    id: "skin-433",
    name: "Mount Fuji",
    weapon: "MP9",
    wear: "Well-Worn",
    price: 4934,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_CNk4uL3V6J4KvmsHm6eytF6ueZhW2fgkUoh5m7dnt78eC7FPFQgXJByE-AL5Bixld20MO2x51DX2o1NxCyokGoXudOiZ_SY",
    rarity: "rare"
  },
  {
    id: "skin-434",
    name: "Forest DDPAT",
    weapon: "Paracord Knife",
    wear: "Factory New",
    price: 53921,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6x0H_SXHmaE_uJ_t-l9AS3gkB4m5myGyo6sciifPQdzD8RzR-JctBjsl9bvMOzjslPYgopAyi_gznQexg-GN_M",
    rarity: "legendary"
  },
  {
    id: "skin-435",
    name: "Xiangliu",
    weapon: "CZ75-Auto",
    wear: "Minimal Wear",
    price: 14737,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1c_M2tcpt-LvGYC3Sv0ftkoO1scCW6khUz_WTcw9r7JH7BOgApApojQuBb5kO5lNO1ZO_h4VaM2o5Gm36s3HgbvH51o7FVgkdxNDg",
    rarity: "mythical"
  },
  {
    id: "skin-436",
    name: "Prey",
    weapon: "MP7",
    wear: "Minimal Wear",
    price: 638,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf7jJk9feseqVuIf2sHGKU_uJ_t-l9AXvqwUsk4DyHnIr7eHySbg8gWcckTOUCsxawk9O1ZeywsQOIg95AznjgznQehcsrUP8",
    rarity: "uncommon"
  },
  {
    id: "skin-437",
    name: "Ocean Topo",
    weapon: "Glock-18",
    wear: "Battle-Scarred",
    price: 264,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1T9veRfKt9L8-fB2CY1aAj57loSirrwEpy4mjSztyqdiiQbFRyCcd2RLFetEG5wdbuMbu35Azflcsbmny2FqpB",
    rarity: "common"
  },
  {
    id: "skin-438",
    name: "Foundation",
    weapon: "Specialist Gloves",
    wear: "Battle-Scarred",
    price: 125286,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJv_NoQS62qgovuimApYPwJiPTcFMgWJVwFLIPthDpkt3vN7ux5QTWitkTm3r5iiMc7nw6sukBBfV38vDJz1aWnrr9eTA",
    rarity: "legendary"
  },
  {
    id: "skin-439",
    name: "Neo-Noir",
    weapon: "AWP",
    wear: "Factory New",
    price: 114936,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6poL_6cB3WvzedxuPUnHirrxR4l423SyI39I3KXPwdxWZclQeNZ5EXskYfnNeyw71OMi9lNzDK-0H3r66pOTw",
    rarity: "legendary"
  },
  {
    id: "skin-440",
    name: "Blue Steel",
    weapon: "Bayonet",
    wear: "Minimal Wear",
    price: 43725,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PO_V6ZhNfWXMWuZxuZi_rgwTH21kxt24TvXwo6vdXmfbgdyDpV5RORYuxS5m4KzY7605FPejohbjXKpq_wJOWQ",
    rarity: "legendary"
  },
  {
    id: "skin-441",
    name: "Freehand",
    weapon: "Butterfly Knife",
    wear: "Well-Worn",
    price: 23820,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2qvzO9ku-RtcDyjqkR3jDGMnYftbyqSZlcgCMd5RLEItBe9koXhZbzi4AyK34tNmXn4i3hO6SxttuoBAKI7uvqA0_B7rlE",
    rarity: "legendary"
  },
  {
    id: "skin-442",
    name: "Praetorian",
    weapon: "MAG-7",
    wear: "Well-Worn",
    price: 5558,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiVI0P-vb_NSMOKSC3Of0-d3vt5lRi67gVMl5j_VzIr_eSnBbw4iXsR2FLZfsRi6x9LvNOqw4FePid4UmCX2iC1J8G81tOf1qE-m",
    rarity: "rare"
  },
  {
    id: "skin-443",
    name: "Imminent Danger",
    weapon: "M4A1-S",
    wear: "Factory New",
    price: 71903,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9JpuR7WyC0miIrujqNjsGpciiVZgIpCpAjEOUPuhXuw93kZOzm4laPi4IRyij-2H9P6yc65rwCT-N7rc1sfRJu",
    rarity: "legendary"
  },
  {
    id: "skin-444",
    name: "Rose Iron",
    weapon: "MP9",
    wear: "Field-Tested",
    price: 2401,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_C9k-_qheqp0H-KcHWKvzP4vj-1gSCGn20h0423Wn9qoJH6QOwNxXpRxQOQLtEHumtTvP-i05wyMjN5Hz3qtiy1XrnE8Sl7QOgI",
    rarity: "rare"
  },
  {
    id: "skin-445",
    name: "Ultraviolet",
    weapon: "Talon Knife",
    wear: "Field-Tested",
    price: 142354,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMXSf_v5jovFlSha_nBovp3PTzIuudXLGbVMkWJd0ELEPsEa6wNa0PunktASMj44QzSr2hiwcuHxt_a9cBqbhUpOe",
    rarity: "legendary"
  },
  {
    id: "skin-446",
    name: "Slaughter",
    weapon: "Karambit",
    wear: "Factory New",
    price: 61197,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SA1iKxOxksd5lRi67gVNx5GzQztqrdH-ea1AjApImFuEJ5EO5wYHmP-2w7gGLgowTz3r5jCwY8G81tFw9kDjw",
    rarity: "legendary"
  },
  {
    id: "skin-447",
    name: "Desert Strike",
    weapon: "MP5-SD",
    wear: "Minimal Wear",
    price: 1191,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1Y-s2jePFSJPWAC3WE_v1iouhiSha_nBovp3PUzYyqdHKfOgJ1CpAhROQJukW4lYDuMr7jswfWjdpNyimsi35O53s-_a9cBg0oJUav",
    rarity: "uncommon"
  },
  {
    id: "skin-448",
    name: "Lab Rats",
    weapon: "MP5-SD",
    wear: "Factory New",
    price: 6083,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1T9s2iaaZ_IeSsA3fF_uJ_t-l9AXrhxh4l5G_Um9eoJX6WaAVyXMN1RbYM5Bi4wN21Yuq0swTdidhMzSTgznQed7nbwhE",
    rarity: "rare"
  },
  {
    id: "skin-449",
    name: "Abyss",
    weapon: "SSG 08",
    wear: "Field-Tested",
    price: 825,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1a_s2ibbJkIeSbD2mvzedxuPUnH3_jzE1y4TvQyIr9JyieZlckCsRxF-8K50bsxN3gZOzktAzc2IJEzDK-0H1XlSI8xg",
    rarity: "uncommon"
  },
  {
    id: "skin-450",
    name: "Oil Change",
    weapon: "Dual Berettas",
    wear: "Minimal Wear",
    price: 228,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I_82rZqNkLvWsCm6C1fdJvOhuRz39x0txtzuHn9j_cn6VbVMiCpJ4Q-MCuhDukYXnN-7q4wTbjIlGzij9jzQJsHgVbYzf3Q",
    rarity: "uncommon"
  },
  {
    id: "skin-451",
    name: "Fade",
    weapon: "Classic Knife",
    wear: "Minimal Wear",
    price: 94017,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRaaVSJvGXC1icyOl-pK9tHn-yxhkltmTVnon4IHqUbgInWcN1ELIK5hS9xIbkZumx4wONjd9H02yg2Yau6XG6",
    rarity: "legendary"
  },
  {
    id: "skin-452",
    name: "Olive Plaid",
    weapon: "MP7",
    wear: "Well-Worn",
    price: 221,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf9Ttk__6vYaA8H_yaCW-Ej7cv5-BqSijgkRx252yAzdj_cy6QZ1R0XpB0QuZf4Bbrk9a0Yenr5wPAy9USeuvoaWg",
    rarity: "uncommon"
  },
  {
    id: "skin-453",
    name: "Dizzy",
    weapon: "MP9",
    wear: "Minimal Wear",
    price: 627,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f7i1e0PaqeKV5H-OEB3Wc_uxhj-1gSCGn204k5mXQwoz4dnrDaQ92CMB3R7FZtxa4mtfkZuyx5gHb2YNNz336jyxXrnE8H46mzhg",
    rarity: "uncommon"
  },
  {
    id: "skin-454",
    name: "Autotronic",
    weapon: "Huntsman Knife",
    wear: "Minimal Wear",
    price: 105715,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-UHViY1OBio-xoQRaygAkopy-KlIb6HifOOV5kFMF1QrMNu0Puw4DvYbnk5Qfc2d5Azyv_3C1O7Hlq4ulRAvcn_qKBiFvfcepq3JPpPWw",
    rarity: "legendary"
  },
  {
    id: "skin-455",
    name: "Bone Mask",
    weapon: "R8 Revolver",
    wear: "Battle-Scarred",
    price: 876,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c29eJt5IeCWMWuZxuZi_rNtHX_hwh91sWjXm9qreSqfaAIgD5d3RLNbt0Pqx4e2Mrjn5wHbi99bjXKpUIbZI8w",
    rarity: "uncommon"
  },
  {
    id: "skin-456",
    name: "Bamboo Shadow",
    weapon: "Sawed-Off",
    wear: "Minimal Wear",
    price: 1019,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2mcZtvIf2RAWivy_t4t-1scCu_lB4sjDGMnYftb3mTOAMlCcRwQONcs0buxoKxNOy2tgyKjtgXmHj62ypPuHs56-hUBas7uvqAJwYOBrA",
    rarity: "uncommon"
  },
  {
    id: "skin-457",
    name: "Fusion",
    weapon: "Sawed-Off",
    wear: "Factory New",
    price: 1302,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c29abNoJP-VCFiW1P1_v-9WQyC0nQlp4WiHyY79eHmXOw4mW5JwQ-Jc5hO7koXjML_jsgSK2oJHmyz82ilB7DErvbjU0C2wDw",
    rarity: "uncommon"
  },
  {
    id: "skin-458",
    name: "Crimson Web",
    weapon: "Skeleton Knife",
    wear: "Well-Worn",
    price: 114314,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-bF1iHxOxlj-1gSCGn2011t26Bytr_cn-VZwciXJskRLQKuka9k4ezYrnqtQXf2YhGzC6viXxXrnE8k9yhp-k",
    rarity: "legendary"
  },
  {
    id: "skin-459",
    name: "Polysoup",
    weapon: "M4A4",
    wear: "Factory New",
    price: 2390,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFU4M2-Z6h0M_-GHlidle8ij-1gSCGn2x904j7dntz4eX6UOlcmCZFwQLIL4Ri7ktexMePg4Q3ZiIIQmyv6inxXrnE8bylol6Q",
    rarity: "rare"
  },
  {
    id: "skin-460",
    name: "Moss Quartz",
    weapon: "M4A1-S",
    wear: "Well-Worn",
    price: 101,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GeMWSC2P1ise1lRjO2kSIjsi-OpYjrJC7JAVp5Xco0W7NZsRCwmoCzNbni7lGNi4JMyij3ii9LvS5q4u4KUKIl-ayF2QnBOeYjoc5UYcWIs5E",
    rarity: "common"
  },
  {
    id: "skin-461",
    name: "Blue Steel",
    weapon: "Falchion Knife",
    wear: "Field-Tested",
    price: 25503,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SH1iSzftztN5lRi67gVNxsT7Tntmpdi-XPQAmWJJ5QuRYsBa7loe2P-7lsVTZjtkUnyz_inhK8G81tNS01icZ",
    rarity: "legendary"
  },
  {
    id: "skin-462",
    name: "Doomkitty",
    weapon: "FAMAS",
    wear: "Minimal Wear",
    price: 200,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1T9s2qZ6tgK_mHGn6vzedxuPUnTHrmxk1x6jmBmdb4Jy6QZw8jW8RwR-9esUHsltXnNu3n5VPXiY5AzTK-0H2q4sGvpw",
    rarity: "uncommon"
  },
  {
    id: "skin-463",
    name: "Wings",
    weapon: "AUG",
    wear: "Minimal Wear",
    price: 1060,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk6fevfKxoMuOsD3KX_uJ_t-l9AX7qzE5_sGmEw9uoJCrBOgMoDsN2ReMI4EPrm4fvY-m04ASPgt8Uz3_gznQePzx-iqc",
    rarity: "uncommon"
  },
  {
    id: "skin-464",
    name: "Blue Tac",
    weapon: "P90",
    wear: "Field-Tested",
    price: 471,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf9Ttk-uGvbpt_L-WdClicyOl-pK9rS3DjwEgjtziHyNioJ3rDaFdxXpR4TbUK4xbtx9K2ZbjltQPei91G02yg2byPK7vI",
    rarity: "uncommon"
  },
  {
    id: "skin-465",
    name: "Oceanic",
    weapon: "MAC-10",
    wear: "Minimal Wear",
    price: 385,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a4s2jaac8cM-cDWKRz-dJvOhuRz39lh4h52qGm9z7cCjBZ1IpCJp5QbRZtxXql9LnPrnr5wLXiY5EzX_2jjQJsHjZHPDEEg",
    rarity: "uncommon"
  },
  {
    id: "skin-466",
    name: "Colony",
    weapon: "FAMAS",
    wear: "Well-Worn",
    price: 650,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I4M29eKVuJc-eD3WZz-tJvOhuRz39xExw5GXTw4qod3uUaQ91ApZ3QbMItxDrxtK2ZbuxtAaLg4hDxS76hjQJsHgze9LmZw",
    rarity: "uncommon"
  },
  {
    id: "skin-467",
    name: "Brass",
    weapon: "Glock-18",
    wear: "Well-Worn",
    price: 7127,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a_s2seqV-M8-fB2CY1aAu5-c_HirjzExxtTnSntb_JSnBaVIpCJojFLUMs0GwwIDjMeOztVeIlcsbmrw2c4EA",
    rarity: "rare"
  },
  {
    id: "skin-468",
    name: "Crimson Foil",
    weapon: "UMP-45",
    wear: "Minimal Wear",
    price: 2840,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1c_PGmV7d9L-KHMXKd0bojj-1gSCGn20V2tm_Sn9irdX3EZwUkA5B1R-IL5Ebsk9O2MOni4AKIgogUmH333SlXrnE8E6oIYXY",
    rarity: "rare"
  },
  {
    id: "skin-469",
    name: "Doppler",
    weapon: "Shadow Daggers",
    wear: "Factory New",
    price: 65581,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6VgH_ScHnecxPxJoOloXCznqhEutDWR1Nv9J3PDOFN1X5AmTO8NsRO4x9fuYe-07gLWgopDzH3_jnsYuilt4rscEf1y5zaZlV8",
    rarity: "legendary"
  },
  {
    id: "skin-470",
    name: "Ultraviolet",
    weapon: "M9 Bayonet",
    wear: "Factory New",
    price: 55527,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMXSf_v5jovFlSha_nBovp3OAzd6qcX6ROFd1X5QkF7MDuxDpxIDgNb_msVTbiI4XzCit2iMfvH1v_a9cBqI-pjxG",
    rarity: "legendary"
  },
  {
    id: "skin-471",
    name: "Spitfire",
    weapon: "FAMAS",
    wear: "Battle-Scarred",
    price: 5027,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I_829eK15JvmBC1iWwON3o95rXSilmiIrujqNjsGhI3ueZwJ1CMZ5ROYLthjqm9TuMeq2tgXWiYlDmy_733wd6S5isOcKT-N7rQ0Sk12j",
    rarity: "rare"
  },
  {
    id: "skin-472",
    name: "Autotronic",
    weapon: "Shadow Daggers",
    wear: "Field-Tested",
    price: 98240,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6N-H-CGHW-vwPtiv_V7QCe6liIrujqNjsGrIH2fOFJxX5F1TeICsRe8x4ezY-vj7gHc2N9HxHir3HhK7Cds5L4AT-N7rU0zpOnr",
    rarity: "legendary"
  },
  {
    id: "skin-473",
    name: "Queen's Gambit",
    weapon: "AWP",
    wear: "Factory New",
    price: 47497,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0OO7baFjM8-UD2qSyPpJvOhuRz39kUpw42zWntiteSiVaQYhCJJzEeIOukSwl4XmPrmw4VHXjtpExC_33zQJsHjNnJgjQA",
    rarity: "legendary"
  },
  {
    id: "skin-474",
    name: "Fire Serpent",
    weapon: "AK-47",
    wear: "Factory New",
    price: 221934.96,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0PSneqF-JeKDC2mE_u995LZWTTuygxIYvzSCkpu3cnvFPQB2DpUkROFY4Rntw93lP7i241DbiI1BxSuviHlKunk_6-sHU71lpPMTRLyP4Q",
    rarity: "legendary"
  },
  {
    id: "skin-475",
    name: "Scorched",
    weapon: "Skeleton Knife",
    wear: "Minimal Wear",
    price: 110484,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-AHliUwP5mvORWQyC0nQlp42zQydivIn_EaQFzXpRyFLIDuhe-ldXmZOLg7lSP3dlAmC79hn5N5zErvbgU3gnTIw",
    rarity: "legendary"
  },
  {
    id: "skin-476",
    name: "Modern Hunter",
    weapon: "Nova",
    wear: "Well-Worn",
    price: 673,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwipC0Pq7ZrBoMs-eAWOV0-BJvOhuRz39xk9_5mSAytqucX6RZwElDpF0QbMNtROwkIbmZuvltQbai4MRnCyoijQJsHiu0ebWIQ",
    rarity: "uncommon"
  },
  {
    id: "skin-477",
    name: "Nuclear Garden",
    weapon: "Glock-18",
    wear: "Battle-Scarred",
    price: 1394,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2gfadhJfGBMXSb1OJ6o95uXSy2myIrujqNjsGpd3LCagQiWJVzEOdfu0PrkYe1MLnqtQzW34xDmH2oiiIc7i5p4u5RT-N7rQEHvAcX",
    rarity: "rare"
  },
  {
    id: "skin-478",
    name: "Gamma Doppler",
    weapon: "Falchion Knife",
    wear: "Minimal Wear",
    price: 138317,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SA1iXwON7sd5tQDmjmRg1jC2Nm5z8dRTLN1F4Tox2RO8NtxG9kYCxYbvisw3bj9lByCyo3ylKuy9stboEUqcn_a3RiFuVL_Rjtvg0XKwV",
    rarity: "legendary"
  },
  {
    id: "skin-479",
    name: "Night Borre",
    weapon: "FAMAS",
    wear: "Battle-Scarred",
    price: 370,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I_82lZqt5M8-RAnKV_uJ_t-l9AXHrxEV-sT-Ez9j7eHuVPQQgXpIhEOQPtxa_wd3gZbnm4QHXi49FxCXgznQeEWoLaGo",
    rarity: "uncommon"
  },
  {
    id: "skin-480",
    name: "Shredded",
    weapon: "MP9",
    wear: "Field-Tested",
    price: 12.42,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f9Tte0OKnZq9SNPmUC3WvzedxuPUnGCiyxB4ksDzdz4qpeS-UZ1clXsBwTOFc5BO_kdPlNOnl5wOL2IJGyzK-0H3-TFWDqQ",
    rarity: "uncommon"
  },
  {
    id: "skin-481",
    name: "Army Sheen",
    weapon: "Nova",
    wear: "Field-Tested",
    price: 805,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiNW0PO8Zb1SM_iaAGKvzedxuPUnGXu1xEkktz-Dyd-oJH6ebwIpD5F5ReEJt0W-x4WxZOi0swCM34lNxDK-0H27DLwAVA",
    rarity: "uncommon"
  },
  {
    id: "skin-482",
    name: "Blue Steel",
    weapon: "Paracord Knife",
    wear: "Factory New",
    price: 124655,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6V8H_KfG2KU_uJ_t-l9ASu2zEkjsm6HytytcHnBPQ90XMNxE-VYsUK_m9TlN7nl7gHag48WmyngznQeOvn5VbM",
    rarity: "legendary"
  },
  {
    id: "skin-483",
    name: "Rainbow Spoon",
    weapon: "Galil AR",
    wear: "Factory New",
    price: 19682,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PO_V7BkNPGdB3Kd_vx3ue9rQD6MkhwrujGEiLD1KCzPKhhxCMclQeAPtUK-xoWxPrvkslOKg4tHzXn-3Xsbvyo647sLVqoh_6XekUifZrx5Pjj5",
    rarity: "mythical"
  },
  {
    id: "skin-484",
    name: "Aloha",
    weapon: "SG 553",
    wear: "Factory New",
    price: 1282,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I_829b_E-c8-SAmiYwNF6ueZhW2fjxE5x5W_SnNz8eXmQaVN2WJUmF7RZuhS8wYbiZeO04VPa3YlCmHr7kGoXuWs6bs2V",
    rarity: "uncommon"
  },
  {
    id: "skin-485",
    name: "Vendetta",
    weapon: "FAMAS",
    wear: "Minimal Wear",
    price: 108,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I4PeRarNSIvySHXOvzedxuPUnSS-3wEx362jWw9eodnLGaFMhCZUlQO5etBe_k9XlNuvkslDcg91FxDK-0H3uRMe02w",
    rarity: "common"
  },
  {
    id: "skin-486",
    name: "Urban Masked",
    weapon: "Classic Knife",
    wear: "Battle-Scarred",
    price: 52576,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRe7RSNPGDC1iF0-x3vt5lRi67gVNxsWWAytqqIHLBP1MlXMckQrMI50O4wIexM7u25gLcjN8UmCX22Cgd8G81tNnT-P6o",
    rarity: "legendary"
  },
  {
    id: "skin-487",
    name: "Twist",
    weapon: "CZ75-Auto",
    wear: "Battle-Scarred",
    price: 903,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s2pcbZsNPWsAm6Xyfo45bY7TXzjxk5w42XXn93_cnLFOFN1C5t0ROANsBLtx9ziNu6x4FHejpUFk3uH-TvaLw",
    rarity: "uncommon"
  },
  {
    id: "skin-488",
    name: "Atheris",
    weapon: "AWP",
    wear: "Field-Tested",
    price: 6569,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JkMPWBMWuZxuZi_rZsS3zgzU8isW3dnIr6eHKfPVAhDpojEe9YsUW4xta1Nuzm5FDci4NbjXKpmWVQppo",
    rarity: "rare"
  },
  {
    id: "skin-489",
    name: "Asiimov",
    weapon: "AK-47",
    wear: "Minimal Wear",
    price: 23394,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIeOaB2qf19F6ueZhW2e2wEt-t2jcytf6dymSO1JxA5oiRecLsRa5kIfkYr-241aLgotHz3-rkGoXuUp8oX57",
    rarity: "legendary"
  },
  {
    id: "skin-490",
    name: "Iron Clad",
    weapon: "P250",
    wear: "Minimal Wear",
    price: 1426,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiVI0OL8PfRSLfWHD2uv0e94te16cCW6khUz_W2Hzd6heSjBbFd1CsFxF-8DsULulNLjZu6xtQDfitlCyiWt3HtNu3p1o7FVE3GEpAE",
    rarity: "uncommon"
  },
  {
    id: "skin-491",
    name: "Stained",
    weapon: "Talon Knife",
    wear: "Field-Tested",
    price: 138084,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWaB_uh5ouJsSxa_nBovp3PTm96sdnmRPwcnCcB0QeVcsEG-mtLiMunn51CI2YhByy-ojnhLvHo5_a9cBs8s08Rw",
    rarity: "legendary"
  },
  {
    id: "skin-492",
    name: "Rain Station",
    weapon: "Nova",
    wear: "Factory New",
    price: 120,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwjZJ7vugV7dlIeCWHVjAkNF6ueZhW2ewkUhysW6AzIqvdH2eOFQpC5ZzQeNc5kG8wNeyNL-w4wbfjNgRzn78kGoXuS8lQPk9",
    rarity: "common"
  },
  {
    id: "skin-493",
    name: "Berry Gel Coat",
    weapon: "SG 553",
    wear: "Battle-Scarred",
    price: 975,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1c_M2mabR9Oc-BC2Ov0ukj5bdWQyC0nQlp42vXn4mrIy2VagRzXJJxFOYJsxG4koLgP-zktVbf3oJMmSX43SIf6jErvbj113ptXQ",
    rarity: "uncommon"
  },
  {
    id: "skin-494",
    name: "Toy Soldier",
    weapon: "Nova",
    wear: "Well-Worn",
    price: 3557,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiFO0PyhfqVSNP-KMXSfzep_tfNWQyC0nQlp42zVytutcCmTZgchW5omTbNc5ka8l9XvM77jtACL34lBm3__iShI6TErvbjr52W2-A",
    rarity: "rare"
  },
  {
    id: "skin-495",
    name: "Flux",
    weapon: "G3SG1",
    wear: "Minimal Wear",
    price: 6728,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1c_M2pO7dqcc-VAnKI_v5jovFlSha_nBovp3ODz9uoc3vGOgMmApp3QrFe5xftm9bjNOm24Afb3YlBn3mqjS8dvy1p_a9cBmtTF-_C",
    rarity: "mythical"
  },
  {
    id: "skin-496",
    name: "Doppler",
    weapon: "Falchion Knife",
    wear: "Minimal Wear",
    price: 100881,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SA1iUzv5mvOR7cDm7lA4i4QKJk4jxNWXBaAEnX5R0ELJb5EK5moa1MOyw7gSNj4tBnyT4hi4d5idr4O4GA6px5OSJ2IVStUtw",
    rarity: "legendary"
  },
  {
    id: "skin-497",
    name: "Sobek's Bite",
    weapon: "Nova",
    wear: "Field-Tested",
    price: 1550,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiVI0PyhfqVSM_-RC2yvzedxuPUnGX22wR9y5jvQz436IH_BPQ4nW8FwFuUDskO_lt3gMu_i71GNiNkWyjK-0H21VCFkHA",
    rarity: "rare"
  },
  {
    id: "skin-498",
    name: "Bulkhead",
    weapon: "Negev",
    wear: "Battle-Scarred",
    price: 60,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1T9s2qfad5M8-KC2uczvlJvOhuRz39kB50sWmBw4moJXnGPFd1WJMjFLFZs0S9lNGxNuLg7weLg91BzCj73TQJsHg2tHPevg",
    rarity: "common"
  },
  {
    id: "skin-499",
    name: "Fade",
    weapon: "Falchion Knife",
    wear: "Factory New",
    price: 67559,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SD1iWwOpzj-1gSCGn20l-tmjVmIqhdHmWa1AkCJRyFuUItBW9wNTmY7jh5ADa3o5Fy3-sinhXrnE8OtZmGks",
    rarity: "legendary"
  },
  {
    id: "skin-500",
    name: "Red Rock",
    weapon: "P250",
    wear: "Battle-Scarred",
    price: 1100,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSIeiaAWqvzedxuPUnSizhkEh05zzQmIr8JX6UbAZ2DsMhTOEOthexl9e2NuLktAzaiIpGnjK-0H2BmRk7ww",
    rarity: "rare"
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
