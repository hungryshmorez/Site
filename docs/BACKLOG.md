# 12matt3r // Festival — Backlog

Captured from the big idea dump. Grouped by area. ✅ = done this pass · ⏳ = queued.

## Link fixes + new content (catalog / data)
- ✅ Mariah's Rage link fix → `https://mariah--hollowaya.on.websim.com`
- ✅ Back Rooms (story) correct version → `https://aibackroomssimulator.on.websim.com/?v=432`
- ✅ Add **GTA VI: Leonida 360** (choose-your-story) to Stories → `https://leonida-360-vice-city-crime-simulator--sofakingsadboi.on.websim.com`
- ✅ Add **ChromaShift** (Chroma Awards) to Stories → `…dreamscape-3…`; keep the scary **ChrØmaShift** → `…dreamscape-9…`
- ✅ Add **Backrooms Expedition** (3D game) to Games → `https://liminal-geo-the-backrooms-expedition--sofakingsadboi.on.websim.com/?v=12`
- ✅ Add **Simsplicer** to Tools → `https://fuse2.on.websim.com`
- ✅ Add **Creative Idea Expander** to Tools → `https://creative-idea.on.websim.com`
- ✅ Add **VJ Application** (should open in a popup that STOPS the festival music) → `https://saucelab-vj-application--sofakingsadboi.on.websim.com`
- ✅ Add a **LoRAs** folder to Tools (HuggingFace model pages, images on each)
- ✅ DriftWave Static: add **Slushwave catalog** (`https://slushwave.on.websim.com`) + two Bandcamp albums to their links
- ⏳ 12matt3r EPK (`glitch-portfolio…`) reported **not loading** — user's site issue; revisit if a new URL comes.

## Classic site (user prefers the classic site)
- ✅ **The 'classic site' link now opens the REAL classic website** (the self-contained static portfolio
  build, hosted at `/classic/`), not the catalog-generated remake. Removed the remake (`classic.html` +
  `src/classic.js`).

## Separate lab vendors — DONE ✅
- ✅ Broke the Lab into in-world **lab-market kiosks** on the left flank (kept the right decluttered):
  **DreamOS · Wake Up · Stories · Tools** aisles. Each deep-links straight to its Lab folder
  (`lab.html?folder=<name>`, added to lab.js). THE LAB side-stage remains the full launcher hub.

## The message board
- ✅ **Artist directory added to the hub board**: walk up to the message board → an "artists" section lists
  every persona; tap one to open their EPK + links in the in-site Windows popup. (Plus the existing news +
  guest book.)

## VJ / stage
- ✅ **Dual 16:9 VJ panels** on the stage (no black bars from the ultra-wide screen; video shows twice),
  centered on the north wall with the DJ decks in the gap between them.
- ✅ **In-world VJ board** by the lab runs the screens (start/stop + ⏮/⏭); moved off the HUD.

## Layout
- ✅ **Even perimeter distribution**: 3 vendors per side wall (L: DreamOS TV/Merch/Monkey's Paw · R:
  Arcade/Deadnet/Codex), Lab centered on the back wall, characters spread through the central crowd.
- ✅ LoRAs folded into the Tools folder.

## 3D layout / spacing — done ✅ (re-plot pass)
- ✅ **No overlaps**: whole map re-plotted; verified no station pair within 5 units.
- ✅ **DreamOS TV** → between Sofa King and Tanky (20, −2).
- ✅ **Deadnet portal** → beside the Arcade (15, 12 · arcade 20, 9).
- ✅ **Porta-potties (Codex)** → beside the dumpster (−13, −16); **all three lit**; **no floating label**.
- ✅ **Dumpster** → emissive + a light so it's visible at night.
- ✅ **Arcade** → all three cabinets individually lit.

## Stage / DJ / photo booth
- ✅ Move **THE DECKS** DJ rig ONTO the stage deck (−8, −24, lifted).
- ✅ Move **Trippy Cam** trigger off the stage into a **Photo Booth** by the hub board (−13, 17), now with
  its own dedicated model: a curtained booth, stool, glowing lens, PHOTO marquee, and a flash bulb.
- ✅ **Stage VJ screen**: the stage video wall plays a muted, looping YouTube playlist mounted as a CSS3D
  object locked to the screen plane (tracks perspective as you walk). Click the screen or the 🎬 vj button
  to go live, ⏮/⏭ to switch clips — you VJ the concert, visual only. *(Playlist `PLTHYibH4Hb0Y` — "Website
  visuals" by sofa king sad boi; confirmed valid/embeddable.)*

## Dealer / drugs / FX orbs — done ✅
- ✅ Beefed up the trip: a new **TRIP** shader (6-fold kaleidoscope + swirl + chroma + rolling rainbow),
  the dealer's always-in-stock signature.
- ✅ The camera effects are now **orbs** scattered on the map. Pick one up (click or walk into it), carry
  it to the dealer to put it **in stock**, then buy it from the dealer's menu to trip on that effect for a
  **limited time** (25–30s, with a countdown, then it wears off). In-stock drugs persist (localStorage).
  Replaces the old FX console + instant-unlock chips + standalone TRI-PPY toggle.

## Outer wall / arena — done ✅
- ✅ Clicking the **outer wall / above the horizon** now walks you toward that heading to the arena edge.
- ✅ **Enclosed the map**: a tall rectangular wall behind the grandstands (north wall behind the stage) +
  the floor grid shrunk to the arena, so you no longer see empty ground in the corners.
- ✅ **Beat-reactive wall light strips** (dim/brighten to the beat) + **wall lasers** (flare on the drop,
  hue-cycling) + **corner speaker stacks** in the four open corners (cones punch on the bass).

## New in-world areas / vendors
- ✅ **The Monkey's Paw** → its own vendor: a carnival fortune machine with a glowing severed monkey's paw
  curled under a glass dome, left flank at (−20, −8). Reach it → opens `https://3jnyhlyqkqq1e.space.minimax.io/`
  (SOFA KING SAD BOI's build) in the Win-style popup. Also added to the classic Stories list.
- ✅ **VAPORSTUDIO** (generative lo-fi / vaporwave / mallsoft music studio) → added to Tools and to
  DriftWave Static's links (`https://bl8ig28k7482x.space.minimax.io`). *(Could later become DriftWave's
  main in-world portal if we want it to replace the EPK link.)*

## Contributed code (saved in `docs/contributed/`, reference only — wire in when we build these)
- `enemy.js` — Goomba-like enemy (chase AI, jump, damage, death particles). For a future combat/bullet-hell or backrooms chase.
- `parkour-world.js` — floating platforms + trippy skybox + crystals + ripple ground. For the Skyline/Vertical Ascent parkour (Tier 3) or a Lab interior.
- `vice-city-room.js` — detailed first-person room (furniture, neon, PointerLock + mobile joystick, AI D&D chat, interactables). Reference for the Leonida/GTA-style room and interactable props.

## Tier 2 — DONE ✅
- ✅ **Aimable laser show** — six emitters on the stage truss; toggle 🔦 and the beam fan tracks your gaze,
  beat-reactive with a rolling hue + aim spot.
- ✅ **Target shooting gallery** — front-left carnival booth, five sliding targets, aim-and-click hitscan,
  knockdown + respawn + score.
- ✅ **World resize** — 📐 size console scales the player from ANT (0.35x) to GIANT (5x).
- ✅ **Spatial distortion fields** — three rippling warp bubbles; inside one, the FOV breathes + screen wobbles.
- ✅ **Secret room / fake wall + keycard** — a sealed backstage vault (left-back, [-15,-20]); find the hidden
  keycard (behind the dumpster, [-22,-23]), click the vault to slide the fake wall open, claim the backstage
  pass → opens the Discord.

## Character worlds — DONE ✅
Each character's festival destination now enters their own walkable world page (EPK inside), instead of
opening the external EPK link directly.
- ✅ **DriftWave Static** → `driftwave.html` — vaporwave dreamscape (temple / mallsoft / lo-fi nook); EPK on the temple monolith.
- ✅ **Sofa King Sad Boi** → `sofaboi.html` — rainy couch kingdom (sofa throne / couch sea / bass pit); EPK on the throne-room TV.
- ✅ **Rave Charles** → `ravecharles.html` — neon mosh pit / tour road / LED-visor mask; EPK (tour timeline) on the stage screen.
- ✅ **12matt3r** → `studio.html` — glitch room around a stacked-CRT monument; EPK (web-OS) on the big CRT.
- ✅ **Tanky Johnson** → `tanky.html` — cosmic western (saloon / tailgate / void desert); EPK on the saloon jukebox.
- ✅ **Shmorez** → `shmorez.html` — s'mores campground (bonfire / s'mores land / camp); EPK on the visuals screen.
- Pattern: standalone Vite page, reuses WalkControls + the in-site popup; each has zone labels + a back-portal to the festival.

## Tier 3 (mostly done)
- ✅ **Jump** (space) + **Glide** (hold space while falling) on the shared controls → festival + every world.
- ✅ **Parkour ascent** — spiral of floating islands in DriftWave's world up to the summit crystal.
- ✅ **Ring fly-through** — glide off the DriftWave summit through six descending rings → "RING RUNNER".
- ✅ **Dunk tank** — Midway carnival game: hit the bullseye to drop the dunkee (splash).
- ✅ **Laser grid** — sweeping security beams guard the portal in 12matt3r's glitch room → "SYSTEM BREACHED".
- ✅ **Bullet-hell** — DODGE HELL: a standalone first-person survival (bullethell.html, reached from a Midway
  cabinet). Telegraphed emitters ring the arena and fire aimed shots at varied heights that ramp up; strafe/
  jump/glide to survive, health bar + timer + local best.
- ⬜ **Pinball** — deserves its own fixed-cam flipper-physics mini-mode; deferred so it plays well.

## The arcade / Midway
- ✅ Consolidated all games into **THE MIDWAY** — a circus tent built into the wall (walk in to play).
  Cabinets: flash portal / Wake Up / Games / Stories; the Monkey's Paw machine; basketball (banks off the
  backboard); shooting gallery; dunk tank. Removed the standalone festival games + game kiosks + wall monkey-paw.
