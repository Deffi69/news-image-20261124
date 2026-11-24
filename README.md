# news-image-20261124 — World News in One Image

[![make.fun · news-image-20261124](https://make.fun/badge/news-image-20261124.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![rank](https://make.fun/badge/news-image-20261124/Deffi69/news-image-20261124/rank.svg)](https://make.fun/bounty/news-image-20261124/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![reward](https://make.fun/badge/news-image-20261124/Deffi69/news-image-20261124/reward.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)

Entry for the make.fun bounty **"Sum up 24 November's world news in one image"**:
https://make.fun/bounty/news-image-20261124

A dense newspaper front page (1024×1024) of Tuesday 24 November 2026: 46 stories
across 7 regions — 3 big leads (Nvidia brings back Huang, Kyiv strike by the
presidential complex, Gaza children flown to Britain) plus 10 pictured cards,
each with an original flat illustration, a factual 6–12-word headline, a
number-dense deck and a source with a CLAIM/CONFIRMED label. Also on the page:
a UTC timeline, a day-in-numbers strip, a world map with pins matching the 13
pictured stories, 33 one-line briefs, a DATE CHECK box and a date-verification
footer. Every story happened or was first reported on 24 November 2026.

## How it works

`main.ts` (Node 22, standard library only) copies the committed `entry.png`
byte-for-byte to `/output/entry.png`. No network, no randomness — two runs
always write identical bytes.

```sh
node main.ts            # writes /output/entry.png
node main.ts ./out      # writes ./out/entry.png
```
