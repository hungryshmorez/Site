# 12matt3r // The Festival — Codex

*A living reference for what the site is and what's planned. Rebuilt whenever the world changes.*

**Live:** https://hungryshmorez.github.io/Site/ · **Stack:** Three.js r0.160 + Vite 5 → GitHub Pages
A styled version of this codex is published as an Artifact for easy reading/sharing.

---

## 01 · Premise

12matt3r is a **genre-defying experience-design collective** where the digital, the analog, and the
algorithmic collide. The name bridges "12" as cosmic completeness with the raw physical "matter" of our
world — and, a dozen or a zero, **it doesn't matter** (hence *doesntmatter.us*).

The Festival is the immersive front door. Rules: **portals, not menus** · **every destination is a
person** · **reward curiosity** · **always end on the ask**.

## 02 · The Grounds

One continuous Three.js field with a full day→night cycle (150s) and a 128-BPM beat pulse (or live
Web-Audio bass) driving everything. A 320-strong instanced crowd (170 on phones) with glowsticks.

**The main stage is now a walkable platform** — a front ramp lets you climb onto the deck (the controls
raise your eye onto it). It carries the beat-reactive LED wall, **tall PA speaker stacks either side**
(cyan left / magenta right, cones punch on the bass), moving-head spots, lasers, and a **DJ booth**
mid-deck. **Rave Charles is down in the mosh pit**, not on the stage.

**Bloom** (UnrealBloom, desktop) makes all the neon physically glow. **Spatial audio** swells as you
near the stage and muffles (low-pass) inside the porta-potty. **Beat-drop fireworks** burst over the
stage on big bass spikes, with a short **camera shake**.

**World coordinates [x, z]** (stage north / −z; spawn at [0, 8]):

| | [x, z] | | | [x, z] |
|---|---|---|---|---|
| Main stage | 0, −26 | | 12matt3r (VJ booth) | 7, 8 |
| DJ booth (on deck) | 0, −24 | | Merch tent | −6, 12 |
| Rave Charles (pit) | 0, −15 | | Sofa King (lounge) | 14, 17 |
| Shmorez + campfire | −8/−10, −6/−8 | | The Lab (porta-potty) | 18, 4 |
| Tanky + tailgate | 11/16, −4/−8 | | DreamOS TV doorway | −18, 8 |
| DriftWave | −14, 2 | | dealer / board / dumpster | −5,5 / 3,11 / −19,15 |

## 03 · The Roster (9 destinations)

Each a procedural model, its own neon accent, matching doesntmatter.us. Reaching one plays the warp;
the *planned* note is the in-engine world behind the portal.

- **RAVE CHARLES** — down in the pit — rapper·DJ — magenta. Masked raver, glowing visor.
- **SHMOREZ** — the pit, by his campfire — electronic·marshmallow — orange.
- **SOFA KING SAD BOI** — up on his elevated lounge — dubstep·weird bass — indigo.
- **DRIFTWAVE STATIC** — chill zone — slushwave·ambient·vaporwave — purple.
- **TANKY JOHNSON** — by his tailgate — country — gold. Cowboy.
- **12MATT3R** — VJ booth — glitch·code — cyan. RGB-splitting glitch figure.
- **THE MERCH TENT** — store/commissions — green. → planned: the camera-lock Etsy carousel.
- **THE LAB** — porta-potty entrance — green → the CRT-boot Lab page (§05).
- **DREAMOS TV** — a lit side doorway (magenta marquee, vendor-stand underglow) → the theater (§06).

## 04 · Systems & Secrets (all built)

- **Portal warp** — themed transition into a world (local page + portal home, or external new tab).
- **Trash-hunt** — 10 hidden pieces → dumpster → secret download.
- **Dealer → TRI-PPY** — hooded dealer in the crowd → rainbow hue over the world.
- **DJ booth → TRIPPY CAM** — walk onto the stage, reach the booth → your live **webcam becomes the
  sky** (getUserMedia → VideoTexture on a BackSide sphere). Opt-in; HUD toggle.
- **The hub board** — walk-up news Post-its + guest book (localStorage).
- **The Lab portal** — porta-potty → CRT → zoom → Lab page (§05).
- **Beat-drop fireworks + camera shake**, **spatial/enclosed audio**, day/night (scrub `[` `]`).
- **Photo booth** — 📷 downloads a branded, UI-free JPEG of your view (shareable).

## 05 · The Lab

Entrance is the **porta-potty**: warp inside a cramped stall, an old CRT boots "12matt3r LABS /
DreamOS," click the screen → zoom → the Lab loads on its own page (`lab.html`, placeholder world +
portal home). **Planned Lab world:** the big interior — merch board (Etsy shirts), music rack, book
stand, commission desk, and the experiments (DreamOS, Trippy Cam, Deadnet, Driftwave Vaporizer, Games,
Stories).

## 06 · DreamOS TV — the movie theater (built)

Its own walk-in world on its own page (`tv.html`), reached through the **lit side doorway** on the
perimeter. A dark theater: big animated screen on **3 channels** (Enter the Void / Dead Signal /
Driftwave, click to switch), **tiered seats** with **silhouette NPCs**, **popcorn** arcing through the
projector flicker, and a portal back to the festival. Real video drops in later as a VideoTexture
channel.

## 07 · The living grounds — micro-scenes (built)

- 🔥 **Shmorez's campfire** — additive fire + logs + flickering firelight, NPCs roasting marshmallows.
- 🛻 **Tanky's tailgate** — lifted low-poly truck (oversized tires, cooler in the bed, underglow),
  beer-pong table with red-cup triangles, NPCs tossing ping-pong balls that arc across it.
- 🛋️ **Sofa King's lounge** — an elevated riser (via a new `lift` option), with beat-up couches of
  seated NPCs below nodding up at him.

## 08 · Controls & Accessibility

WASD/arrows + Shift; drag to look; tap-to-walk / tap a name. Walk up the ramp onto the stage.
`[` `]` scrub time. `◐ motion` (and OS reduced-motion) calms pulse/head-bob/trip and disables
fireworks+shake. `🔊` sound · `📷` photo. Adaptive quality on phones (DPR 1.5, no MSAA, no bloom,
thinner crowd).

## 09 · Design Language

Late-night neon cyberpunk: near-black ground, mono type, RGB-split glitch titles, CRT scanlines, and
now **real bloom** so the neon glows. Each roster member owns one accent — the palette is the cast.
Palette: cyan `#00F3FF` · magenta `#FF0055` · green `#39FF14` · purple `#b967ff` · indigo `#6a6cff`
· orange `#ff6b35` · gold `#e6c04a` · ground `#05060f`.

## 10 · Architecture

Three.js + Vite, procedural primitives, data-driven roster. Each world is its own **page** (index /
lab / tv). Bloom via EffectComposer (desktop).

| Module | Role |
|---|---|
| `main.js` | orchestration: renderer+composer, input, beat clock, day/night, mode/portal manager, all wiring |
| `data/destinations.js`, `data/news.js` | roster + hub-board news |
| `scene/festival.js` | ground, sky, walkable stage, LED, speaker stacks, ramp, lights, lasers, day/night |
| `scene/crowd.js` · `characters.js` · `models.js` | crowd + placed characters + procedural builders |
| `scene/trash.js` · `dealer.js` · `board.js` · `djbooth.js` · `trippycam.js` | secrets/interactions |
| `scene/labPortal.js` | porta-potty interior + CRT + zoom |
| `scene/campfire.js` · `tailgate.js` · `lounge.js` | the micro-scenes |
| `scene/fireworks.js` | beat-drop firework bursts |
| `player/controls.js` | walk/look/auto-walk, head-bob, ground-height (stage ramp) |
| `ui/hud.js` · `audio/reactor.js` | name tags + panel · Web-Audio pulse + spatial/low-pass |
| `tv.html` + `src/tv.js` | the DreamOS TV theater world (own page) |
| `lab.html` | the Lab's page (placeholder + portal home) |

**Delivery:** GitHub Pages, auto-deploy on push, relative base path. Adaptive quality on phones;
festival parks while inside a portal; `preserveDrawingBuffer` for the photo booth.

## 11 · Roadmap

**Next:** the real **artist EPK worlds** (heaviest lift) · the **Lab interior** world · the **Merch
carousel** (camera-lock → Etsy, needs your assets) · spotlight-the-ask in EPKs.
**Then:** memories/photo wall + blog in the hub · mobile on-screen controls · code-split + loading gate
· deeper audio-reactivity (frequency bands) · NPC gaze, minimap, more easter eggs.
**Later:** a shared backend (Supabase/Firebase) → shared guest book, synced DreamOS TV, presence,
leaderboards.

## 12 · Content needed from you

Per-artist audio/video/press · Etsy shirt images + links · music-store links · the book · commissions
+ pricing · the real secret-drop file · real news posts · the doesntmatter.us streaming URLs.

## 13 · Glossary

**Portal/warp** — festival → world transition. **EPK** — a walkable press kit. **Pulse** — the beat
value driving everything. **TRI-PPY** — the dealer's rainbow trip. **TRIPPY CAM** — your webcam as the
sky. **DreamOS** — the fictional OS / Lab through-line. **The hub** — 12matt3r's news/guest-book board.
