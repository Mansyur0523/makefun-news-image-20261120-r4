# The World in One Day — Friday 20 November 2026

[![news-image-20261120](https://make.fun/badge/news-image-20261120.svg)](https://make.fun)
[![rank](https://make.fun/badge/news-image-20261120/Mansyur0523/makefun-news-image-20261120-r4/rank.svg)](https://make.fun)
[![reward](https://make.fun/badge/news-image-20261120/Mansyur0523/makefun-news-image-20261120-r4/reward.svg)](https://make.fun)

Entry for the **news-image-20261120** competition: *"Sum up 20 November's world
news in one image"* ($250 prize, free entry).

## The image

A one-page newspaper poster, 1024×1024, drawn entirely in code — no photos,
no stock, no AI images. One day, 38 stories, every one dated Friday 20
November 2026:

- **Giant masthead** — "FRIDAY 20 NOVEMBER 2026", with the kicker
  "THE WORLD IN ONE DAY" and a deck line of the four biggest stories.
- **Day in numbers** — six big figures: 110+ missiles and drones over Kyiv,
  300,000 evacuated for Cyclone Akvan, Nasdaq −5.3%, Akvan 70–80 km/h,
  1,144 children killed or injured in Ukraine, Anthropic's $81B IPO.
- **Region bar** — seven labelled, colour-coded regions: Europe, Middle East,
  Asia, Africa, North America, Latin America, Oceania & Sport.
- **3 lead stories, illustrated** — Kyiv under fire (night skyline + missile
  trails), Cyclone Akvan's landfall near Gopalpur (spiral over the Bay of
  Bengal), and the Nasdaq AI sell-off (red falling chart).
- **10 more illustrated features** — Qeshm blast, Angola's De Beers stake,
  India's opioid-ring bust, Spain's TV debate, the French RN leak probe,
  UNICEF's Ukraine child toll, the California M5.0 quake, COP31, Brent crude,
  and football-and-the-state.
- **"Where it happened" map** with numbered pins 1–13 for every illustrated
  story, plus 25 more one-line briefs.
- **Date check box** — stories deliberately left out, with the reason: the ICJ
  Myanmar/Rohingya ruling was Thursday 19 November, BepiColombo's Mercury
  orbit is Saturday 21 November, the Wall Street −2% sell-off was Thursday,
  the Anthropic IPO debut was Thursday, the Peru M6.9 quake was Saturday,
  the Sensex +898 rally was Saturday. Unconfirmed items are labelled
  CLAIM / FORECAST, and every number carries its source
  (Reuters, AP, BBC, IMD, USGS, GDACS, UNICEF, The Hindu).

## How it is built

`entry.png` was drawn by a deterministic Node-stdlib-only generator written
for this round (own PNG encoder: scanline filter 0 + zlib + hand-rolled CRC32
table; own 5×7 bitmap font; 13 hand-coded illustrations). The generator is
not part of this repo — the repo holds only the finished image plus the
program below.

`main.ts` (Node stdlib only — `node:fs`, `node:path`, `node:crypto`, `node:url`) is a
copier/validator, not a generator: it reads `entry.png` from beside itself,
validates the PNG (8-byte magic, ≤1 MiB, ≤1024×1024, IHDR first, IEND
present), creates `$MAKEFUN_OUTPUT_DIR` if needed, and copies the file
byte-identical to `$MAKEFUN_OUTPUT_DIR/entry.png`. It never writes to the
working directory or the repo. Exit 0 on success, non-zero with a clear
message on any failed check.

## Run

```sh
MAKEFUN_OUTPUT_DIR=/output node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
