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

## 3D layout / spacing (needs a focused re-plot pass — do together)
- ⏳ **No overlaps**: Shmorez's campsite currently sits on top of the Arcade + DreamOS TV. Space every station out; outer stations get their own area along the edge.
- ⏳ **DreamOS TV** → between Sofa King and Tanky Johnson.
- ⏳ **Deadnet portal** → beside the Arcade machine.
- ⏳ **Porta-potties (Codex)** → beside the dumpster. Light **all three** stalls (not just the center) and **don't label** that one.
- ⏳ **Dumpster** → light it up like the others (currently not visible).
- ⏳ **Arcade** → all three cabinets lit.

## Stage / DJ / photo booth
- ⏳ Move **THE DECKS** DJ rig ONTO the stage (it's currently in the middle of the crowd).
- ⏳ Move **Trippy Cam** off the stage into a **Photo Booth** in the back, next to the message board.
- ⏳ **12matt3r Labs / stage VJ**: switch between trippy videos (list TBD) that play on the big stage screen — **visual only, no audio** — so you're VJ'ing the concert. Also a good home for the fireworks + laser show controls.

## Dealer / drugs / FX orbs
- ⏳ Dealer's trip effect isn't trippy enough — beef it up.
- ⏳ Turn the map FX pickups into **orbs**: the player finds orbs around the map, carries them to the dealer, which **unlocks that effect as a buyable "drug"** — and it's **time-limited** (wears off after a while).

## Outer wall / arena
- ⏳ Clicking the **outer wall** should walk you to that spot (currently doesn't).
- ⏳ Fix seeing **outer areas beyond the map** (corners near the dumpster) — cull/hide out-of-bounds.
- ⏳ Use the outer wall for **beat-reactive lights** (dim/brighten to the beat) + **lasers**; put **speaker stacks** (like the stage ones) in the open corner areas.

## New in-world areas / vendors
- ⏳ **Curse of the Monkey Paw** → its own vendor area: a fortune-teller machine but a **monkey paw**, **5 wishes**, then it opens `https://wish.on.websim.com`.

## Contributed code (saved in `docs/contributed/`, reference only — wire in when we build these)
- `enemy.js` — Goomba-like enemy (chase AI, jump, damage, death particles). For a future combat/bullet-hell or backrooms chase.
- `parkour-world.js` — floating platforms + trippy skybox + crystals + ripple ground. For the Skyline/Vertical Ascent parkour (Tier 3) or a Lab interior.
- `vice-city-room.js` — detailed first-person room (furniture, neon, PointerLock + mobile joystick, AI D&D chat, interactables). Reference for the Leonida/GTA-style room and interactable props.

## Deferred Tier 2 / Tier 3 (from earlier)
- Secret rooms / fake walls, keycard access, target shooting gallery, spatial distortion fields, world resize, aimable laser show.
- Jump/flight-dependent: parkour ascent, glide/ring fly-through. Physics-loop-dependent: bullet-hell, laser-grid, pinball, dunk tank.
