# Sync Worker — прокси-API к донору (upgrader.pro)

Фоновый сервис, который тянет с донора **скины + цены + картинки** и **статистику
(апгрейды + онлайн)**, складывает к нам и отдаёт нашему фронтенду через наши
эндпоинты `/api/v1/skins` и `/api/v1/stats`.

## ⚠️ Главное, что нужно знать

`upgrader.pro` закрыт **Cloudflare**. Поэтому план «axios + cheerio» **не работает**:

- Любой запрос без браузера (axios/curl) получает страницу-челлендж
  `Just a moment...` (HTTP 403/503), а **не** JSON.
- Сайт донора — **SPA** (клиентский рендер): онлайна нет в исходном HTML,
  `cheerio` по сырому HTML его не найдёт.

Поэтому воркер ходит к донору через **headless-браузер** (Playwright + stealth),
который проходит Cloudflare (получает cookie `cf_clearance`), а уже потом читает
JSON API и онлайн из живого DOM. Картинки скинов лежат на **Steam CDN (без
Cloudflare)** — их качаем обычным `axios`.

## Что отдаёт донор (проверено вживую)

| Данные | Источник | Ответ |
|---|---|---|
| Скины/цены/картинки | `GET /api/items/shop?sortBy=price&sortDirection=DESC&offset=N&limit=19` | `{ items:[...], hasMore:bool }` |
| Апгрейды (всего) | `GET /api/statistics/games-count` | `{ "count": 167364233 }` |
| Онлайн | публичного API нет (`/api/statistics/online` → 401 JWT) | парсим из DOM шапки |

Предмет донора: `{ id, appId, marketName, price:"строка", image, extra:{ n:[оружие,имя,износ], ch:цвет-hex, st:stattrak } }`
→ маппится в нашу модель `Skin` (`lib/types.ts`) в `lib/mapItem.js`.

## Установка

```bash
cd worker
npm install            # поставит зависимости + playwright install chromium (postinstall)
cp .env.example .env   # отредактируй под себя
```

### npm-пакеты

**Воркер** (`worker/package.json`):
- `playwright` — headless-браузер (проходит Cloudflare)
- `playwright-extra` + `puppeteer-extra-plugin-stealth` — анти-детект
- `axios` — скачивание картинок со Steam CDN и пуш статистики
- `node-cron` — расписание

> `cheerio` намеренно не используется: донор — SPA за Cloudflare, парсить сырой
> HTML бесполезно. Если очень нужен — данные берём из живого DOM Playwright.

**Сайт** (наши роуты `/api/v1/*`) — дополнительные пакеты ставить не нужно,
`@vercel/kv` уже есть в проекте.

## Запуск

```bash
npm run sync:skins   # разово синхронизировать скины
npm run sync:stats   # разово синхронизировать статистику
npm start            # постоянно по расписанию (node-cron)
```

## Куда сохраняются данные

- Скины → `lib/skins-data.json` (его уже читает фронт). Картинки → `public/images/skins/<id>.png`.
- Статистика → `worker/data/stats.json` (локальный кэш) и, опционально, пушится
  POST-ом на `/api/v1/stats` сайта (Vercel KV).

## 🏗️ Где запускать (ВАЖНО — выбор архитектуры)

Воркер держит **живой браузер и постоянный процесс**, поэтому он **НЕ запускается
на Vercel serverless** (там нет постоянного процесса и запись в `public/`
невозможна в рантайме). Варианты:

**A. Свой долгоживущий хост (VPS / отдельный сервер / локальная машина) — рекомендую.**
- Воркер пишет `lib/skins-data.json` + `public/images/skins/` и периодически
  коммитит/пушит в git (Vercel пере-деплоит), **или** фронт крутится на том же
  хосте (`next start`) и подхватывает файлы мгновенно.
- Статистику пушит на сайт POST-ом (`STATS_PUSH_URL`).
- Лучше с **резидентным IP** (с дата-центровых IP Cloudflare строже).

**B. Остаёмся на Vercel для фронта, воркер — отдельно (как в A), но:**
- `DOWNLOAD_IMAGES=false` → не качаем картинки, оставляем ссылки на Steam CDN
  (иначе пришлось бы коммитить тысячи файлов или использовать Vercel Blob).
- Статистику пушим в KV через `/api/v1/stats` (`STATS_PUSH_URL` + `STATS_PUSH_SECRET`).

### Если Cloudflare всё равно не пускает
- Запусти с `DONOR_HEADLESS=false` и/или через резидентный прокси.
- Либо подними **FlareSolverr** (docker) — отдельный сервис, который решает CF и
  отдаёт куки/ответ по локальному HTTP; воркер можно переключить на него.
- Либо платный обходчик (ZenRows / ScraperAPI / ScrapingBee).

## Переменные окружения
См. `.env.example`. Ключевые: `DONOR_HEADLESS`, `DOWNLOAD_IMAGES`, `PAGE_DELAY_MS`,
`SKINS_CRON`, `STATS_CRON`, `STATS_PUSH_URL`, `STATS_PUSH_SECRET`.

На стороне сайта для защиты пуша статистики задай `STATS_PUSH_SECRET` в env Vercel.
