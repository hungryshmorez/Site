# 12matt3r // The Festival — Codex

*A living reference for what the site is and what's planned. Rebuilt whenever the world changes.*

**Live:** https://hungryshmorez.github.io/Site/ · **Stack:** Three.js r0.160 + Vite 5 → GitHub Pages
This encyclopedia lives **on the site** as a styled page (`codex.html`) — reached **in-world by stepping
into the porta-potty and booting its CRT**, and also linked from the 3D entry screen and the classic menu.

---

## 01 · Premise

12matt3r is a **genre-defying experience-design collective** where the digital, the analog, and the
algorithmic collide. The name bridges "12" as cosmic completeness with the raw physical "matter" of our
world — and, a dozen or a zero, **it doesn't matter** (hence *doesntmatter.us*).

The Festival is the immersive front door. Rules: **portals, not menus** · **every destination is a
person or place you walk up to** · **reward curiosity** · **always end on the ask**. For anyone who'd
rather not walk the 3D world, a **classic flat menu** (`classic.html`) mirrors everything (§07).

## 02 · The Grounds

One continuous Three.js field with a full day→night cycle (150s) and a 128-BPM beat pulse (or live
Web-Audio bass) driving everything. A 320-strong instanced crowd (170 on phones) with glowsticks.

**The main stage is a walkable platform** — a front ramp lets you climb onto the deck. It carries the
beat-reactive LED wall, **tall PA speaker stacks either side** (cyan left / magenta right, cones punch on
the bass), moving-head spots, lasers, and a **DJ booth** mid-deck. **Rave Charles is down in the mosh
pit**, not on the stage.

**Bloom** (UnrealBloom, desktop) makes all the neon physically glow. **Spatial audio** swells as you
near the stage and muffles (low-pass) inside the porta-potty. **Beat-drop fireworks** burst over the
stage on big bass spikes, with a short **camera shake**.

**You spawn inside the festival**, on a bench at **[−4, 6]** facing the stage, right in the grounds. The
12matt3r hub board (news + guest book) moved to the back-left corner at **[−18, 18]**.

**The arena is closed by a 3-sided grandstand** (stadium seating on the left, right, and back — the
stage is the 4th side) and a **tall enclosing wall** behind it (the floor grid stops at the arena), so
you can't see empty ground beyond the corners. Colored **light posts** ring the seating; **beat-reactive
strips + lasers** run up the wall (flaring on the drop) and **speaker stacks** stand in the four corners.
Night is a touch brighter overall. Walking and click-to-walk are clamped to the arena; **clicking the
wall walks you toward it**.

**World coordinates [x, z]** (stage north / −z):

| destination | [x, z] | | destination | [x, z] |
|---|---|---|---|---|
| Main stage | 0, −26 | | 12MATT3R (in crowd) | −5, −10 |
| **THE DECKS** (on stage) | −8, −24 | | Merch tent | −20, 4 |
| Rave Charles (pit) | 0, −16 | | Sofa King (lounge) | 18, −8 |
| Shmorez + fire + tent | 9,19 · 9,16 · 5,20 | | THE LAB (big stage) | −1, 17 |
| Tanky + tailgate | 15/18, 3/5 | | DreamOS TV (big CRT) | 20, −2 |
| DriftWave | −2, −3 | | **THE ARCADE** (×3) | 20, 9 |
| Spawn / hub board | −4,6 / −18,18 | | **DEADNET** (by arcade) | 15, 12 |
| dealer / dumpster | 16,−18 / −18,−16 | | **PORTA-POTTY** (Codex) | −13, −16 |
| Photo booth (Trippy Cam) | −13, 17 | | Basketball hoop | 11, 8 |

*People (Rave, Shmorez, 12MATT3R, DriftWave) live in/around the crowd; structures (merch, deadnet,
arcade, TV, lab, porta) sit on the sides/back, lined up with their neighbours. Everything is rotated to
face the **center** of the grounds ([0, −4]).*

## 03 · The Roster (12 destinations)

Each a procedural model with its own neon accent, matching doesntmatter.us. Reaching one plays the warp
and opens its info panel; the CTA opens the real place (EPK / world / portal).

- **RAVE CHARLES** — in the center pit, surrounded by the crowd — rapper·DJ — magenta. Masked raver.
- **SHMOREZ** — out back by his campfire + tent — electronic·marshmallow — orange.
- **SOFA KING SAD BOI** — up on his elevated lounge — dubstep·weird bass — indigo. → his EPK.
- **DRIFTWAVE STATIC** — chill zone — slushwave·ambient·vaporwave — purple.
- **TANKY JOHNSON** — by his tailgate — outlaw country — gold. Cowboy.
- **12MATT3R** — a glitch figure somewhere in the crowd — glitch·code — cyan → the web-OS.
- **THE MERCH TENT** — store/commissions — green. → planned: the camera-lock Etsy carousel.
- **DREAMOS TV** — a big retro **CRT television** (wood cheeks, glowing scanline screen) whose screen
  frames a doorway you walk into → the theater (§06). Sits on the right, between Sofa King and Tanky.
- **THE LAB** — a big screen-stage — green → warps straight into the Lab terminal (§05).
- **THE ARCADE** — a row of three arcade cabinets, side-by-side with the TV — magenta → the **Flash
  Games portal / games library**.
- **DEADNET** — a broken flickering CRT monolith **beside the Arcade** — purple → *deadnet*, "the digital
  afterlife," a self-generating non-real internet.
- **THE CODEX (porta-potty)** — a row of three lit porta-potties **beside the dumpster** (no floating
  label). Step inside, boot the old CRT → **this encyclopedia** (`codex.html`) loads.
- **THE DECKS** — the DJ rig **up on the stage deck** — cyan → **$AUCELAB**, a real two-deck DJ console
  (`dj.html`): upload your own tracks, EQ, filters, crossfader, tempo, cue, sync, loops, jog wheels,
  waveforms, meters. Uploads are **saved on your computer** (IndexedDB) so they're there next visit, and
  an **AUTO RADIO** cycles your whole library whenever you stop DJing. Single-user.

## 04 · Systems & Secrets (all built)

- **Portal warp** — themed transition into a world (local page + portal home, or external new tab).
- **Trash-hunt** — 10 hidden pieces → dumpster → secret download.
- **Dealer → TRI-PPY** — hooded dealer in the crowd → rainbow hue over the world.
- **Photo booth → TRIPPY CAM** — reach the photo booth in the back (by the hub board) → your live
  **webcam becomes the sky** (getUserMedia → VideoTexture on a BackSide sphere). The feed is **zoomed out / tiled** so you
  can see yourself. **Hitting the booth again while it's live randomizes the effect** (mirror-hall
  tiling, hue tint, texture spin, additive blend); the HUD toggle turns it off. Opt-in.
- **The hub board** — walk-up news Post-its + guest book (localStorage), bottom-left by spawn.
- **Porta-potty → the Codex** — step inside the porta-potty, boot the old CRT → the encyclopedia
  (`codex.html`) loads. Reuses the porta-potty interior + CRT-zoom machinery.
- **Camera FX modes** — an ◉ fx console (bottom-right) switches the whole view between NORMAL, CRT, VHS,
  ASCII, GAMEBOY, and WIREFRAME (a post-processing pass). Each non-normal mode is **locked until you find
  its hidden shader chip** tucked around the grounds (behind the stage, against the grandstands, a back
  corner) — click a chip to unlock it forever (saved in localStorage). Console + unlocks both.
- **In-site popup window** — games/worlds/EPKs open in a draggable Windows-style window
  (title bar, min/max/close, live page in an iframe, no URL) over the site, so you never leave.
- **Beat-drop fireworks + camera shake**, **spatial/enclosed audio**, day/night (scrub `[` `]`).
- **Fireworks launcher** (🎆 fw console) — load a colour canister and FIRE: shells rise from the mortar
  rack by the stage and burst overhead in your colour.
- **Basketball hoop** — a neon hoop at ~[11, 8]. Walk near (a 🏀 hint appears) and **click to shoot** a
  ball along your aim with an arc; sink it through the ring to score (running tally).
- **Photo booth** — 📷 downloads a branded, UI-free JPEG of your view (shareable).

## 05 · The Lab (built — a working launcher)

THE LAB is its own **big screen-stage** (three screens labelled GAMES / WAKE UP / STORIES). Reaching it
plays the green warp and loads the Lab on its own page (`lab.html`) — the porta-potty is no longer the
entrance (it's a standalone gag now, §04). The Lab is a **working DreamOS terminal** generated from the
canonical catalog (`data/catalog.js`), holding everything on the playable side: **Artist Profiles**,
**DreamOS Ecosystem**, **Wake Up Series** (18), **Games** (18), **Stories & Experiences** (9), **Tools**,
and an **off-site link wall**. Trippy Cam, DreamOS TV and Deadnet are **excluded here** — they already
live out in the festival as their own destinations. Launches open in the in-site popup window (§04).
**Planned:** a fully 3D Lab interior to replace the terminal.

## 06 · DreamOS TV — the movie theater (built)

Its own walk-in world on its own page (`tv.html`), reached through the **lit side doorway** on the
perimeter. A dark theater: big animated screen on **3 channels** (Enter the Void / Dead Signal /
Driftwave, click to switch), **tiered seats** with **silhouette NPCs**, **popcorn** arcing through the
projector flicker, and a portal back to the festival. Real video drops in later as a VideoTexture
channel.

## 07 · The classic (flat) site — built

`classic.html` is a **two-column menu index** for anyone who doesn't want the 3D walk. At the **top is
the Links block**: a **tab/emblem per artist** (plus a COLLECTIVE tab) — click one and that artist's own
links swap in (EPK + Spotify/IG/etc.), exactly like the old site; COLLECTIVE shows the shared hubs, dev
nodes, web3, and support. Below: featured **Trippy Cam** / **DreamOS TV** cards and every catalog section
(DreamOS, Wake Up, Games, Stories, Deadnet, Tools). It's generated from the **same `data/catalog.js`**
(now mirroring the collective's own dataset — per-artist links, labs content, 22 TV channels), so the flat
page, the Lab, and the 3D roster never drift. The 3D entry screen links to it; the classic sidebar links
back to the festival.

## 08 · The living grounds — micro-scenes (built)

- 🔥 **Shmorez's campfire** — additive fire + logs + flickering firelight, NPCs roasting marshmallows.
- 🛻 **Tanky's tailgate** — lifted low-poly truck (oversized tires, cooler in the bed, underglow) +
  a **playable beer-pong table**: walk up (a glowing marker + 🍺 hint appear) and **click to toss** a
  ball at the cups; sink one to score, clear the rack and it re-racks. NPCs also toss in the background.
- 🛋️ **Sofa King's lounge** — an elevated riser (via a `lift` option), with beat-up couches of seated
  NPCs below nodding up at him.

## 09 · Controls & Accessibility

WASD/arrows + Shift; drag to look; tap-to-walk / tap a name. Walk up the ramp onto the stage.
`[` `]` scrub time, or use the **🕑 time console** to snap to Auto / Day / Dusk / Cyber-Night / Neon
Dawn. `◉ fx` switches camera modes (§04). `◐ motion` (and OS reduced-motion) calms pulse/head-bob/trip
and disables fireworks+shake. `🔊` sound · `📷` photo. Adaptive quality on phones (DPR 1.5, no bloom).

## 10 · Design Language

Late-night neon cyberpunk: near-black ground, mono type, RGB-split glitch titles, CRT scanlines, and
**real bloom** so the neon glows. Each roster member owns one accent — the palette is the cast.
Palette: cyan `#00F3FF` · magenta `#FF0055` · green `#39FF14` · purple `#b967ff` · indigo `#6a6cff`
· orange `#ff6b35` · gold `#e6c04a` · ground `#05060f`.

## 11 · Architecture

Three.js + Vite, procedural primitives, **data-driven** roster + catalog. Each world/view is its own
**page** (index / classic / lab / tv / codex). Bloom via EffectComposer (desktop).

| Module | Role |
|---|---|
| `main.js` | orchestration: renderer+composer, input, beat clock, day/night, mode/portal manager, all wiring |
| `data/destinations.js` | the 11-destination roster (drives models, auras, tags, proxies, panels) |
| `data/catalog.js` | **single source of truth** for every EPK, game, story, DreamOS node, tool, link |
| `data/news.js` | hub-board news posts |
| `scene/festival.js` | ground, sky, walkable stage, LED, speaker stacks, ramp, lights, lasers, day/night |
| `scene/crowd.js` · `characters.js` · `models.js` | crowd + placed characters + procedural builders (incl. arcade, deadnet) |
| `scene/trash.js` · `dealer.js` · `board.js` · `djbooth.js` · `trippycam.js` | secrets/interactions |
| `scene/labPortal.js` | porta-potty interior + CRT + zoom |
| `scene/campfire.js` · `tailgate.js` · `lounge.js` · `fireworks.js` | micro-scenes + beat-drop bursts |
| `player/controls.js` | walk/look/auto-walk, head-bob, ground-height (stage ramp) |
| `ui/hud.js` · `audio/reactor.js` | name tags + panel · Web-Audio pulse + spatial/low-pass |
| `tv.html` + `src/tv.js` | the DreamOS TV theater world (own page) |
| `lab.html` + `src/lab.js` | the Lab DreamOS terminal (launcher, from catalog) |
| `classic.html` + `src/classic.js` | the flat menu site (from catalog) |
| `codex.html` | this encyclopedia, on the site |

**Delivery:** GitHub Pages, auto-deploy on push, relative base path. Adaptive quality on phones;
festival parks while inside a portal; `preserveDrawingBuffer` for the photo booth.

## 12 · Roadmap

**Next:** the real **artist EPK worlds** (heaviest lift) · a fully 3D **Lab interior** to replace the
terminal · the **Merch carousel** (camera-lock → Etsy, needs your assets) · spotlight-the-ask in EPKs.
**Then:** memories/photo wall + blog in the hub · mobile on-screen controls · code-split + loading gate
· deeper audio-reactivity (frequency bands) · NPC gaze, minimap, more easter eggs.
**Later:** a shared backend (Supabase/Firebase) → shared guest book, synced DreamOS TV, presence,
leaderboards.

## 13 · Content needed from you

Per-artist audio/video/press · Etsy shirt images + links · music-store links · the book · commissions
+ pricing · the real secret-drop file · real news posts · the doesntmatter.us streaming URLs · a sweep
of the Wake Up / games slugs for any dead links.

## 14 · Glossary

**Portal/warp** — festival → world transition. **EPK** — a walkable press kit. **Pulse** — the beat
value driving everything. **TRI-PPY** — the dealer's rainbow trip. **TRIPPY CAM** — your webcam as the
sky. **DreamOS** — the fictional OS / Lab through-line. **Deadnet** — the digital afterlife, a non-real
internet. **The Arcade** — the walk-up door to the games library. **The hub** — 12matt3r's news/guest-
book board. **The catalog** — `data/catalog.js`, the one source of truth feeding every view.
