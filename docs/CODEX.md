# 12matt3r // The Festival — Codex

*A living reference for what the site is and what's planned. Rebuilt whenever the world changes.*

**Live:** https://hungryshmorez.github.io/Site/ · **Stack:** Three.js r0.160 + Vite 5 → GitHub Pages
A styled version of this codex is published as an Artifact for easy reading/sharing.

---

## 01 · Premise

12matt3r is a **genre-defying experience-design collective** where the digital, the analog, and the
algorithmic collide — video artists, rappers, and producers dismantling the barrier between live
performance and new media. The name is a dual-layered philosophy: "12" as cosmic completeness + the
raw physical "matter" of our world — all while acknowledging that, a dozen or a zero, **it doesn't
matter** (hence the home domain, *doesntmatter.us*).

The Festival is the immersive front door. Core rules:

- **Portals, not menus.** You walk up to a character; a warp transition carries you into their EPK,
  which loads as its own lightweight page so no machine holds every world at once.
- **Every destination is a person** — cast as festival roles.
- **Reward curiosity** — the grounds hide secrets.
- **Always end on the ask** — hear the music, see the work, buy merch, hire the collective.

## 02 · The Grounds

One continuous Three.js field: a main stage with a beat-reactive LED screen, lasers, haze, and a
320-strong instanced crowd (170 on phones) with glowsticks. A **day→night cycle** (150s loop) and a
**128-BPM beat pulse** (or live Web-Audio bass) drive lights, screen, crowd bounce, and every aura.

**World coordinates [x, z]** (stage at top / −z; you spawn on the bench at [0, 8]):

| Destination | [x, z] | On |
|---|---|---|
| Rave Charles | [0, −22] | main stage |
| Shmorez | [−8, −6] | the pit |
| Driftwave Static | [−14, 2] | chill zone |
| Tanky Johnson | [11, −4] | right flank |
| 12matt3r | [7, 8] | VJ booth |
| The Merch Tent | [−6, 12] | store |
| Sofa King Sad Boi | [14, 17] | back couch |
| The Lab | [18, 4] | side stage → porta-potty |
| *dealer* | [−5, 5] | in the crowd |
| *hub board* | [3, 11] | by the booth |
| *dumpster* | [−19, 15] | back-left |

## 03 · The Roster

Eight destinations, each a procedural model (no external assets), each with its own neon accent
matching the official doesntmatter.us profiles. Today, reaching one plays the warp and opens its
existing EPK link; the **planned** note is the in-engine world to build behind that portal.

- **RAVE CHARLES** — headliner, main stage — *rapper · DJ* — magenta. Masked raver w/ glowing LED
  visor. → planned: his EPK world.
- **SHMOREZ** — in the pit — *electronic · marshmallow* — orange. Toasted marshmallow man squishing
  to the bass. → planned: EPK world / custom player.
- **SOFA KING SAD BOI** — back couch — *dubstep · weird bass* — indigo. Hooded sad-boi slumped on a
  couch under his own rain cloud, glowing phone. → planned: his own world.
- **DRIFTWAVE STATIC** — chill zone — *slushwave · ambient · vaporwave* — purple. Chrome bust in
  shades, retro sun halo. → planned: vaporwave world + the Driftwave Vaporizer.
- **TANKY JOHNSON** — right flank — *country* — gold. Cowboy: jeans, white tee, brown hat, gold
  buckle. → planned: EPK world.
- **12MATT3R** — VJ booth — *glitch art · code* — cyan. Glitch humanoid of RGB-splitting slices.
  → planned: the hub + web-OS / studio world.
- **THE MERCH TENT** — store/commissions — *merch · tip jar · NDA* — green. Striped canopy + vendor.
  → planned: wired to the real Etsy + store.
- **THE LAB** — side stage / porta-potty — *trippy cam · dreamOS · deadnet* — green. → planned: the
  full Lab interior world (see §05).

## 04 · Systems & Secrets (all built)

- **Portal warp** — themed full-screen transition into a world (same-tab page + portal home) or an
  external link (new tab, festival stays).
- **The trash-hunt** — 10 hidden litter pieces (faint glint) → carry to the glowing dumpster →
  cleaning the whole place unlocks a secret download. Placeholder reward at `public/secret/`.
- **The Dealer → TRI-PPY** — hooded dealer in the crowd (no name tag, only a glowing baggie). Reach
  him → the world melts into shifting rainbow hues + unlocks the TRI-PPY toggle. Reach again to come
  down. Echoes the toggle on doesntmatter.us.
- **The hub board** — walk-up cork board by the VJ booth: news/updates as Post-its + a guest book
  (leave a message, saved to localStorage for now). This is the **12matt3r hub**.
- **The Lab portal** — porta-potty → CRT → zoom → Lab page (see §05).
- **Day/night + beat clock** — 150s dusk→night (scrub with `[` `]`) and the 128-BPM/bass pulse.

## 05 · The Lab

Entrance is the festival **porta-potty**. Reach it → warp drops you *inside* a cramped stall (its own
tiny scene; the festival stops rendering). An old beige **CRT** boots a green "12matt3r LABS /
DreamOS" terminal; look around, click the screen, the camera **zooms into the glass** → warp → the
Lab loads on its own page.

**Status:** portal + CRT zoom built & live. `lab.html` is a placeholder terminal ("world under
construction") with a portal back through the porta-potty.

**Planned Lab world** — the big "inside the porta-potty" expanse holding everything you've made:
merch board (Etsy shirts you click to buy), music rack, book stand, commission desk, and the
experiments — DreamOS, DreamOS TV, Trippy Cam, Deadnet, Driftwave Vaporizer, Games (25+), Stories.

## 06 · DreamOS TV — the movie theater (planned)

One Lab experiment becomes its own world: a **movie theater you walk into** — big screen playing your
videos, rows of seats, and **NPCs sitting with you throwing popcorn**. A place to hang out and watch,
not a video embed. Portal hook exists (named on the Lab page); the room is next to build.

## 07 · Controls & Accessibility

- **Walk:** WASD / arrows, Shift to run. Touch: tap a spot to auto-walk; tap a name to walk to them.
- **Look:** drag anywhere. Subtle walking head-bob.
- **Time:** `[` and `]` scrub day→night.
- **Comfort:** `◐ motion` (and OS reduced-motion) calms pulse, disables head-bob, tones the trip.
  `🔊` toggles sound.
- Honors `prefers-reduced-motion`, visible focus rings, adaptive quality on phones.

## 08 · Design Language

Late-night neon cyberpunk: near-black ground, mono type for structure, running RGB-split "glitch" on
titles (cyan/magenta shadow), CRT scanlines, additive neon glow. Each roster member owns one accent —
the palette *is* the cast.

Palette: cyan `#00F3FF` · magenta `#FF0055` · green `#39FF14` · purple `#b967ff` · indigo `#6a6cff`
· orange `#ff6b35` · gold `#e6c04a` · ground `#05060f`.
Type: system monospace (JetBrains-Mono-style) for display/labels/data; clean sans for body. No web-font downloads.

## 09 · Architecture

Three.js + Vite, vanilla ES modules, zero external 3D assets. The roster is **data-driven** (one
array). Each world is its own **page** (multi-page Vite build) — the perf principle behind portals.

| Module | Role |
|---|---|
| `main.js` | orchestration: renderer, input, beat clock, day/night, render loop, portal/mode manager, UI |
| `data/destinations.js` | the roster |
| `data/news.js` | hub board news |
| `scene/festival.js` | ground, sky, stage, LED, lights, lasers, haze, day/night |
| `scene/crowd.js` | instanced crowd + glowsticks |
| `scene/characters.js` | places models + aura + click proxy |
| `scene/models.js` | procedural builders |
| `scene/trash.js` | trash-hunt + dumpster + reward |
| `scene/dealer.js` | dealer NPC → TRI-PPY |
| `scene/board.js` | hub board (news + guest book) |
| `scene/labPortal.js` | porta-potty interior + CRT + zoom |
| `player/controls.js` | walk, look, auto-walk, head-bob |
| `ui/hud.js` | name tags, prompts, destination panel |
| `audio/reactor.js` | Web-Audio bass → pulse |
| `lab.html` | the Lab's page (placeholder + portal home) |

**Delivery:** GitHub Pages, auto-deploy workflow on push, relative base path (works under `/Site/`).
Adaptive quality (DPR 1.5 + no MSAA + thinner crowd on phones). Pauses the festival inside a portal.

## 10 · Roadmap

**Next — the worlds:** DreamOS TV theater · the Lab interior · Sofa King's world · artist EPK worlds.
**Then — features/polish:** memories/photo wall + blog in the hub · mobile on-screen controls +
pinch-look · code-split the bundle + a real loading screen · deeper audio-reactivity (frequency bands).
**Later — backend:** a shared backend (Supabase/Firebase) so guest-book + blog are shared across
visitors (today the guest book is per-device localStorage).

## 11 · Content needed from you

Framework's built; these drop in as they arrive (worlds use placeholders first):
per-artist audio/video/press images · Etsy shirt images + buy links · music-store links · the book
(title/cover/blurb/link) · commissions + pricing · the real secret-drop file · real news posts · the
exact URLs behind the doesntmatter.us streaming buttons.

## 12 · Status & Log (this session)

Pushed the real project → trash-hunt → portal warp + real 12matt3r intro → Sofa King Sad Boi +
corrected genres → the Dealer/TRI-PPY → Lab porta-potty portal → the hub board → polish pass (mobile
quality, head-bob, calmer CRT) → went live on GitHub Pages + fixed the absolute-path bug that had left
the **music silent** on the live deploy.

**Now:** playable and live with music, 8 destinations, 4 secret systems, and the Lab portal. The
destination *worlds* behind the portals are the active build front.

## 13 · Glossary

- **Portal / warp** — the transition from festival into a world (or the porta-potty).
- **EPK** — electronic press kit; an artist's bio/tracks/videos/press, here a walkable world.
- **Pulse** — the 0–1 beat value (128 BPM or live bass) driving reactive elements.
- **TRI-PPY** — the rainbow-warp "trip" scored from the dealer.
- **DreamOS** — 12matt3r's fictional OS; the through-line of the Lab experiments.
- **The hub** — the 12matt3r hub: news, guest book, memories, blog.
- **doesntmatter.us** — the official current site; source of truth for copy, roster, and the Labs.
