# 12matt3r // The Festival — Codex

*A living reference for what the site is and what's planned. Rebuilt whenever the world changes.*

**Live:** https://hungryshmorez.github.io/Site/ · **Stack:** Three.js r0.160 + Vite 5 → GitHub Pages
This encyclopedia is also published **on the site itself** as a styled page (`codex.html`), linked from
the 3D entry screen, the classic menu, and the Lab.

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

**Spawn + the hub are in the bottom-left corner.** You start on the bench at **[−18, 18]** facing the
stage; the 12matt3r hub board sits beside you at **[−14, 16]**.

**World coordinates [x, z]** (stage north / −z):

| destination | [x, z] | | destination | [x, z] |
|---|---|---|---|---|
| Main stage | 0, −26 | | 12MATT3R (VJ) | −19, −7 |
| DJ booth (on deck) | 0, −24 | | Merch tent | −19, 3 |
| Rave Charles (pit) | −8, −13 | | Sofa King (lounge) | 17, −8 |
| Shmorez + campfire | 4/3, −11/−14 | | THE LAB (porta-potty) | −1, 17 |
| Tanky + tailgate | 14/18, 3/4 | | DreamOS TV doorway | 14, 16 |
| DriftWave | −2, −3 | | **THE ARCADE** | 10, 11 |
| Spawn + hub board | −18/−14, 18/16 | | **DEADNET** | −12, −18 |
| dealer / dumpster | 16,−18 / −18,−16 | | | |

*Note: THE LAB and 12MATT3R swapped corners — the Lab now sits near spawn, 12MATT3R back-left.*

## 03 · The Roster (11 destinations)

Each a procedural model with its own neon accent, matching doesntmatter.us. Reaching one plays the warp
and opens its info panel; the CTA opens the real place (EPK / world / portal).

- **RAVE CHARLES** — down in the pit — rapper·DJ — magenta. Masked raver, glowing visor.
- **SHMOREZ** — the pit, by his campfire — electronic·marshmallow — orange.
- **SOFA KING SAD BOI** — up on his elevated lounge — dubstep·weird bass — indigo. → his EPK.
- **DRIFTWAVE STATIC** — chill zone — slushwave·ambient·vaporwave — purple.
- **TANKY JOHNSON** — by his tailgate — outlaw country — gold. Cowboy.
- **12MATT3R** — VJ figure, back-left — glitch·code — cyan. RGB-splitting glitch figure → the web-OS.
- **THE MERCH TENT** — store/commissions — green. → planned: the camera-lock Etsy carousel.
- **DREAMOS TV** — a lit side doorway (magenta marquee, vendor-stand underglow) → the theater (§06).
- **THE LAB** — porta-potty entrance — green → the CRT-boot Lab terminal (§05).
- **THE ARCADE** — a lone arcade cabinet — magenta → the **Flash Games portal / games library**. New.
- **DEADNET** — a broken flickering CRT monolith in a lonely corner — purple → *deadnet*, "the digital
  afterlife," a self-generating non-real internet. New.

## 04 · Systems & Secrets (all built)

- **Portal warp** — themed transition into a world (local page + portal home, or external new tab).
- **Trash-hunt** — 10 hidden pieces → dumpster → secret download.
- **Dealer → TRI-PPY** — hooded dealer in the crowd → rainbow hue over the world.
- **DJ booth → TRIPPY CAM** — walk onto the stage, reach the booth → your live **webcam becomes the
  sky** (getUserMedia → VideoTexture on a BackSide sphere). The feed is **zoomed out / tiled** so you
  can see yourself. **Hitting the booth again while it's live randomizes the effect** (mirror-hall
  tiling, hue tint, texture spin, additive blend); the HUD toggle turns it off. Opt-in.
- **The hub board** — walk-up news Post-its + guest book (localStorage), bottom-left by spawn.
- **The Lab portal** — porta-potty → CRT → zoom → Lab terminal (§05).
- **Beat-drop fireworks + camera shake**, **spatial/enclosed audio**, day/night (scrub `[` `]`).
- **Photo booth** — 📷 downloads a branded, UI-free JPEG of your view (shareable).

## 05 · The Lab (built — a working launcher)

Entrance is the **porta-potty**: warp inside a cramped stall, an old CRT boots "12matt3r LABS /
DreamOS," click the screen → zoom → the Lab loads on its own page (`lab.html`). The Lab is now a
**working DreamOS terminal** generated entirely from the canonical catalog (`data/catalog.js`): a folder
dashboard — **Artist Profiles**, **DreamOS Ecosystem**, **Wake Up Series** (18), **Games** (18),
**Stories & Experiences** (9), **Tools** (5), and an **off-site link wall** (27). Click a folder → a
grid of launchable cards (external worlds open in a new tab; DreamOS TV routes internally; Deadnet gets
its own accent). **Planned:** a fully 3D Lab interior to replace the terminal.

## 06 · DreamOS TV — the movie theater (built)

Its own walk-in world on its own page (`tv.html`), reached through the **lit side doorway** on the
perimeter. A dark theater: big animated screen on **3 channels** (Enter the Void / Dead Signal /
Driftwave, click to switch), **tiered seats** with **silhouette NPCs**, **popcorn** arcing through the
projector flicker, and a portal back to the festival. Real video drops in later as a VideoTexture
channel.

## 07 · The classic (flat) site — built

`classic.html` is a **two-column menu index** for anyone who doesn't want the 3D walk: a sticky sidebar
(nav with live counts + active-scroll highlight), a hero bio, featured **Trippy Cam** and **DreamOS TV**
cards, and every section (Artist Profiles, DreamOS Ecosystem, Wake Up, Games, Stories, Tools, Links).
It's generated from the **same `data/catalog.js`** as the Lab and the 3D roster, so the flat and 3D
experiences never drift. The 3D entry screen links to it ("prefer a classic site?"); the classic sidebar
links back to the 3D festival.

## 08 · The living grounds — micro-scenes (built)

- 🔥 **Shmorez's campfire** — additive fire + logs + flickering firelight, NPCs roasting marshmallows.
- 🛻 **Tanky's tailgate** — lifted low-poly truck (oversized tires, cooler in the bed, underglow),
  beer-pong table with red-cup triangles, NPCs tossing ping-pong balls that arc across it.
- 🛋️ **Sofa King's lounge** — an elevated riser (via a `lift` option), with beat-up couches of seated
  NPCs below nodding up at him.

## 09 · Controls & Accessibility

WASD/arrows + Shift; drag to look; tap-to-walk / tap a name. Walk up the ramp onto the stage.
`[` `]` scrub time. `◐ motion` (and OS reduced-motion) calms pulse/head-bob/trip and disables
fireworks+shake. `🔊` sound · `📷` photo. Adaptive quality on phones (DPR 1.5, no MSAA, no bloom,
thinner crowd).

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
