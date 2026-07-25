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
- ✅ Add the MiniMax app `https://fm10ff7jh3uf.space.minimax.io` as a card that opens in the Win95-style popup.
- ⏳ Continue surfacing anything we build on the classic page.

## 3D layout / spacing — done ✅ (re-plot pass)
- ✅ **No overlaps**: whole map re-plotted; verified no station pair within 5 units.
- ✅ **DreamOS TV** → between Sofa King and Tanky (20, −2).
- ✅ **Deadnet portal** → beside the Arcade (15, 12 · arcade 20, 9).
- ✅ **Porta-potties (Codex)** → beside the dumpster (−13, −16); **all three lit**; **no floating label**.
- ✅ **Dumpster** → emissive + a light so it's visible at night.
- ✅ **Arcade** → all three cabinets individually lit.

## Stage / DJ / photo booth
- ✅ Move **THE DECKS** DJ rig ONTO the stage deck (−8, −24, lifted).
- ✅ Move **Trippy Cam** trigger off the stage into a **Photo Booth** by the hub board (−13, 17). *(Visual
  restyle to a dedicated photo-booth model still TODO — it currently reuses the booth mesh.)*
- ⏳ **12matt3r Labs / stage VJ**: switch between trippy videos (list TBD) that play on the big stage screen — **visual only, no audio** — so you're VJ'ing the concert. Also a good home for the fireworks + laser show controls.

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
- ⏳ **Curse of the Monkey Paw** → its own vendor area: a fortune-teller machine but a **monkey paw**, **5 wishes**, then it opens `https://wish.on.websim.com`.

## Contributed code (saved in `docs/contributed/`, reference only — wire in when we build these)
- `enemy.js` — Goomba-like enemy (chase AI, jump, damage, death particles). For a future combat/bullet-hell or backrooms chase.
- `parkour-world.js` — floating platforms + trippy skybox + crystals + ripple ground. For the Skyline/Vertical Ascent parkour (Tier 3) or a Lab interior.
- `vice-city-room.js` — detailed first-person room (furniture, neon, PointerLock + mobile joystick, AI D&D chat, interactables). Reference for the Leonida/GTA-style room and interactable props.

## Deferred Tier 2 / Tier 3 (from earlier)
- Secret rooms / fake walls, keycard access, target shooting gallery, spatial distortion fields, world resize, aimable laser show.
- Jump/flight-dependent: parkour ascent, glide/ring fly-through. Physics-loop-dependent: bullet-hell, laser-grid, pinball, dunk tank.
