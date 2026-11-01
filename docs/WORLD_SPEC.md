# THE COMPLEX — World Spec

*One walkable world that connects every room, game, theater and press kit on the site. This spec describes what is
built, how it fits together, where everything is, and what is still open. Companion to `CODEX.md` (which documents
each individual room); this file documents the **whole**.*

---

## 1. Premise

The 12matt3r site started as a festival with a ring of small rooms. It grew into a campus. **The Complex** is the single
space that ties it together: you spawn in the **movie-theater lobby**, walk (or ride an elevator) to anything, and every
door is a real page of the site.

Four ideas hold it together:

1. **Walk, don't navigate.** Every destination is a place you reach on foot or by elevator; the quick-walk buttons are
   a convenience, never the only way.
2. **Every door is real.** A neon door opens an existing page of the site (a room, a game, a theater, an EPK). Nothing is a
   placeholder.
3. **Verticality = the catalog.** Towers hold *lists of things* (one floor each, up to four doors a floor); the ground holds
   *experiences* (a club, theaters, a library, an arcade).
4. **One show.** A simulated 120 BPM clock pulses the club's LEDs, neon, beams and crowd; the site's global music player
   runs everywhere.

## 2. The world graph

```
                      FESTIVAL (index.html) ─ WAREHOUSE ─ the big loop (8 rooms)
                                  │
                         MOVIE LOBBY (lobby.html) ◄── spawn
        ┌──────────┬───────────┬──┴────────┬────────────┬─────────────┐
   5 theaters   arcade terminal   photo booth   merch tent    voting booths     FOOD COURT
   (north wall) (→ Arcade theater) (→ Trippy Cam) (→ store)   (→ Chroma vote)   (east wall)
        │                                              ┌──────────────┴───────────┐
        │                                      FEVER DREAM LIBRARY          THE UNDERGROUND
        │                                      (east door, z −16)           (south door, behind spawn)
        │                                                                          │
        │                       ┌────────────── gallery hallway (arcade + cinema) ──────────────┐
        │                  THE ARCHIVE tower ◄─ west end                      east end ─► THE ROOMS tower
        └─ each theater = screening.html?room=…                 (+ a Chroma Awards theater door at each end)
```

Pages: `lobby.html`, `underground.html`, `library.html`, `screening.html` (theaters + arcade), `chroma.html`
(DreamOS desktop), `vote.html`, plus every existing room page.

## 3. Space conventions

- **Units:** metres. **Up:** +y. Each room page has its own origin; the Underground uses its Unity-project origin
  (arena centre = `[0, 0]`, +z toward the cinemas, −z toward the lobby).
- **Player:** eye height 1.65 m, capsule radius 0.4–0.45, walk 4.5–5 m/s (shift ×1.7–1.8). Drag to look, WASD/arrows to
  move, click/tap the floor to walk, click props to use them.
- **Doors/portals:** a doorway is a neon frame + animated glow + a sign. Two triggers: walk into the zone just inside the
  frame, or click it. Both call `goTo(url)` (a 0.5 s warp fade, then navigation).
- **Colour language:** cyan/violet = the club's two DJs; amber = wayfinding, concierge, cinema; every floor/door carries its
  room's own accent.

## 4. Place-by-place

### 4.1 Movie Lobby (`lobby.html`) — the spawn
Room `x ±22, z ±20`, 11 m high; spawn `[0, 16.5]` facing north.

| What | Where |
|---|---|
| Chroma Awards 2025 theater door | north wall, x = −18 |
| New Mobile Theater (9×16, IMAX-tall) | x = −9 |
| **Chroma Awards** (grand marquee, red carpet, paparazzi) | x = 0 |
| 16×9 theater | x = +9 |
| Enter the Void | x = +18 |
| Arcade terminal desk (→ Arcade theater) | west wall `[−20.6, 4]` |
| Photo booth (→ Trippy Cam window) | west wall `[−21.15, −5]` |
| Merch tent (→ `store.html`) | south wall `[−12, 18.6]` |
| Voting booths (open the Chroma vote window) | `[−20.5, −13]`, `[−20.5, 12]`, `[12, 18.5]`, `[20.5, 17.5]` |
| Food court (4 stalls + tables) | east side |
| **Fever Dream Library** door | east wall, z = −16 |
| **The Underground** door | south wall, x = 0 |

**Theaters** (`data/theaters.js`) play: the Chroma entries and videos; every episode on the studios page
(`data/tta.js` → vertical clips to the 9×16 room, the rest to 16×9); the Enter the Void playlist; and the Arcade theater
loads any catalog game on the big screen.

### 4.2 The Fever Dream Library (`library.html`)
Reading room `x ±11, z ±12`, 6.5 m high; spawn `[0, 9.2]`. One book per production document on a long table
(`[0, −3.2]`, 9×2.4 m), shelves on the walls, two reading nooks, an amber **Archive Terminal** (east wall, `[9.5, 1.6]`) with
tabs + search + "how it was made". Documents live in `data/library.js` and `public/library/` (9 PDFs, the agent
protocol, and the interactive production hub site).

### 4.3 The Underground (`underground.html`) — the club
Rebuilt from the supplied Unity project (`B2Buddy Underground`); coordinates below are the Unity metres.

| Zone | Footprint (x, z) | Notes |
|---|---|---|
| Main lobby | x ±11, z −38…−24 | "Members entrance", concierge counter `[5.9, −27.5]`, exit door back to the festival lobby |
| **Concert arena** | x ±24, z ±24, 12 m high | neon dance floor + diamond inlays, halo ring rig at y 10.8, 8 beams, two trusses, crowd of 70 |
| Stage A (Cyan) | `[−20, 0]`, deck x −23.3…−16.9, 1.3 m | Visionary Eye artwork, LED wall, DJ console, line arrays |
| Stage B (Violet) | `[20, 0]`, mirrored | Dream Eye artwork |
| VIP balconies | y = 4, z = ±21 (x ±15.5) | reached by two stairs, x ±2.25, z ±8.25…±19.5 (22 treads); two booths each |
| Vote kiosks / show desk | `[∓14.1, −5.6]`, `[0, −5]` | open the Chroma vote window / toggle the music |
| **Gallery hallway** | x ±24, z 24…34 | arcade + cinema portals; the two towers and two Chroma theater doors at its ends |
| **Neon arcade** | centre `[−14, 43]`, 22×18 | 10 cabinets (each opens a real game in the in-site window); 3 supplied horse sculptures (Joust / Chrome / Toon) |
| Cinema lobby | x 3…28, z 34…46 | concession bar `[19, 43.7]`, posters |
| **Main cinema** | centre `[15, 59]`, 24×26, 8 m | 8 stepped rows, 64 recliners, 19.5×6.1 m screen |
| Private cinema | centre `[37, 46]`, 18×20 | 14.5×5.2 m screen, sofas, tables |

Screens play the studios' videos *only while you are inside the room* (muted until you interact); desks skip to the
next video. The club "show" is a **simulated** 120 BPM clock (as in the Unity original), not audio analysis.


### 4.3b The street (outside the club) — from the Unity "outside world"
`x −42…42, z −61…−38.6` (Unity metres; the club's arrival lounge is at z −38…−24). You leave the club through **sliding smoked-glass
doors** (they open as you approach) onto a wet-asphalt street with sidewalks, lane dashes, a crosswalk at x = 18, streetlamps,
parked cars, and the club's neon facade (canopy, velvet rope, queue).

| End of the street | What | Opens |
|---|---|---|
| West (x = −42) | **THE COMPLEX** — rusted warehouse, sliding door at z = −51 | `warehouse.html` |
| East (x = +42) | **B2BUDDY RECORDS** — record-shop front (vinyl · decks · open late) | in-site music window |
| South sidewalk (x = 38, z = −62) | **THE MOVIE LOBBY** — sliding doors under a CINEMA marquee | `lobby.html` |
| South (x = 18, z = −61) | **THE FESTIVAL gateway** — pillars + 7 pulsing rings + floor chevrons | `index.html` |

The Unity project also models the festival grounds, the Midway big top, the Complex's interior (hide-and-seek, five wings, a hidden
room) and the Movie Lobby/library/towers in the same scene; on the web those remain their own pages, reached through the doors above.

### 4.4 The two towers (gallery ends)
Footprint 20×10 m, **8 m per floor**, an elevator on the far wall of every floor (click the doorway or its amber button →
floor list → camera glide to the chosen floor).

**East — THE ROOMS** (`x 24…44, z 24…34`): one door per floor.

| Floor | Room | Page |
|---|---|---|
| 0 | The Gallery (museum) | `museum.html` |
| 1–6 | Rave Charles · Driftwave Static · VaporStudio Rooms · Sofa King Sad Boi · Tanky Johnson · Shmorez | the artist worlds |
| 7–14 | Green Room · Surreal Lo-Fi · Abstract Psychedelic · Glitch Room · Horrorcore · Control Room · Game Room · **Rooftop** | the big loop, in loop order |

**West — THE ARCHIVE** (`x −44…−24`): four doors per floor.

| Floor | Doors |
|---|---|
| 0 The Festival | festival grounds · Warehouse · Movie Lobby · Chroma desktop |
| 1 Games I | Knock Knock · Lo-Fi 3D Room · Bridge Horror House · Open City |
| 2 Games II | Turbo Kart Rush · Drift Drive · Parkour · SEVEN DAYS |
| 3 Games III | VoxelCraft · Minecraft Classic · Fractalarium · HYDRACTRL |
| 4 Retro | Flash Games · Browser Games · Windows 97 · classic site |
| 5 Arcade Row | Arcade + Karaoke · The Block · Race Track · Bullet Hell |
| 6 Stages | DreamOS TV · Saucelab DJ · VJ Stage · The Lab |
| 7 Studios | That Time Again · Links · The Board · Merch Store |
| 8 Tools + Archives | Room Builder · Codex · Channel 86 Evidence · Fever Dream Library |
| 9–10 **Roof** | the EPKs: Rave Charles · Shmorez · Tanky · Driftwave · Sofa King · Glitch Art |

Not placed on purpose: the **Hidden Room** (a secret, unlocked by exploring), Windows 93 (no entry page in the repo).

### 4.5 The existing rooms (summary; full coordinates in the room reference)
Artist worlds (Rave Charles, Driftwave Static, Sofa King, Tanky, Shmorez, Glitch Room) are open Three.js fields (bounds
±28–30, spawn `[0, 12–15]`, stage/north at −z) with a stage/centrepiece, an EPK object and side zones. The loop rooms
(Green Room, Lo-Fi, Abstract, Glitch, Horrorcore, Control Room, Game Room, Rooftop) are single rooms (±13–28) with a back
door behind the spawn and a forward door across the room, each with its own DJ booth. The museum is a 20×36 m marble hall.

## 5. Systems

| System | What it does | Where |
|---|---|---|
| Walk model | union of walkable rectangles + per-position height (stairs, stage decks, terraces, balconies, tower floors) + solid props; slides along edges | `underground.js` |
| Static geometry | boxes/cylinders merged per material, mirrored once from the Unity (left-handed) space | `underground.js → flush()` |
| Hotspots & triggers | invisible click boxes + walk-in zones for doors, kiosks, cabinets | `hotspot()`, `themedDoor()` |
| Elevator | per-tower floor list, eased camera ride, arrives facing into the floor | `TOWERS`, `rideTo()` |
| Show clock | bounded 120 BPM pulse → neon colour, LED shader gain, beam opacity, point-light intensity, crowd bounce (no strobe) | `frame()` |
| Screens | test-card shader until a muted looping `<video>` starts (only while you're in the room) | `mkScreen()` |
| Terminals | DreamOS-style panels: arcade (games on the big screen), library (documents), theater (videos) | `screening.js`, `library.js` |
| In-site window | draggable iframe window; used for games, PDFs, the vote page, the photo booth | `ui/popup.js` |
| Music | one global player (`globalplayer`), persistent across rooms | `player/` |
| Assets | 5 supplied GLBs decimated to ≈2 MB total (webp textures) | `public/underground/` |


### 5b. The explorer layer (from the Unity polish pass)
An **access passport** of five stamps (DJ battle vote · VIP deck · NEON PULSE · main cinema · private cinema) with a live "next stop", a
**14-destination map** (M) where WALK sets an on-screen beacon (a small route graph over the walked routes; shows the next landmark and
distance, never moves you) and GO jumps there, the first arcade cabinet as the **NEON PULSE** timing mini-game, and a finale at the
arena show desk once all five are stamped (winning DJ, score, bounded confetti, a synthesized cue; FX can be muted). Keys: P passport,
M map, 1 / 2 vote, Space plays NEON PULSE, Esc closes panels. Progress is kept in `localStorage` (`ug:stamps`, `ug:finale`).

## 6. Data model — where to change things

| To change… | Edit |
|---|---|
| Theater lineup | `src/data/theaters.js`, `src/data/chroma.js` |
| Videos in the 9×16 / 16×9 theaters | `src/data/episodes.js` (studios episodes), `src/data/tta.js` (+ extra clips), `src/data/videos.js` (YouTube) |
| Arcade games / cabinets | `src/data/catalog.js` (`LAB['Games']`) |
| Library documents | `src/data/library.js` + `public/library/` |
| Tower floors and doors | `TOWERS` in `src/underground.js` |
| The big loop order | `src/data/loop.js` |

## 7. Look & feel

Dark, neon, 1990s-arcade-meets-nightclub. Palette: cyan `#10c4ff`, violet `#a326ff`, amber `#ff8829` as the club's trio; each
room keeps its own accent. Glass, brass and stone accents in the club; warm wood and amber in the library. Text is canvas
monospace signage. Reduced-motion is respected (`rm-dock`); the club pulse is bounded and never strobes.

## 8. Performance & platform targets

- Desktop first; phones get pixel-ratio ≤ 1.5, no MSAA. The club is ~9 point lights — the heaviest scene; budget to trim
  lights on touch devices if frame time slips.
- All pages are static (GitHub Pages); no server. Videos stream from their CDN; only the room you stand in plays.
- Smoke test (`scripts/smoke.mjs`) loads every page headlessly and fails on script errors or 404s.

## 9. Not built / open decisions

1. **The loop complex.** The eight loop rooms are inside THE ROOMS tower (floors 7–14). A separate complex at the far end of
   the street ("where B2Buddy Records sings") was discussed but not defined — decide whether the loop moves out of the tower.
2. **EPKs on the Underground's roof.** Built as the top two floors of the Archive; a literal walkable roof deck is not.
3. **Per-entry Chroma vote links** — every booth uses the single Chroma watch page until each entry's own link is supplied.
4. **9×16 theater** now has 29 clips; add more vertical videos in `data/tta.js`.
5. **Hidden Room** access from inside the complex (currently only via the original unlock).
6. **Mobile pass** on the club (lights, 128k-poly-class art already reduced) and touch controls for the elevator list.
7. **Passport / finale** from the Unity project ("unlock the finale") was not ported.
8. **Moving-light model** from the Unity project is replaced by simple fixtures.

## 10. One world, no hand-offs (campus built in `underground.html`)

The Movie Lobby, its five theaters and the Fever Dream Library are now built **inside the Underground scene** (ported from the
Unity campus builder), not reached through `lobby.html` / `library.html`:

- **Movie Lobby** — street face with the marquee canopy, blade sign and sliding glass doors at world (37.2, −62.3); inside: plum
  carpet, coffered ceiling, three chandeliers, marble columns, directory pylon, Chroma red carpet with ropes, grand marquee and
  paparazzi flashes, arcade terminal (opens NEON PULSE), Trippy Cam (four tinted frames), four vote booths (open the vote page in
  the in-site window), merch tent, a four-stall food court with eight tables.
- **Five theaters** behind the theater-row wall (x offsets −17.6 … 17.6). 9×16 and 16×9 rooms play their clips while you stand in
  them; the Chroma 2025 / Chroma rooms have a desk that lists every video and game and opens it in a window; ENTER THE VOID opens
  its playlist.
- **Fever Dream Library** through the lobby's east door: shelves, window, a long table with one book per production document
  (click to open the PDF in a window), reading nooks, and the Archive Terminal (tabs, search, places/towers/systems pages).
- **Tower doors** that match a place in this world warp there (festival, complex, lobby, merch tent, library, four complex
  wings, the two Chroma theaters); every other door shows a card with the page one click away in a window. Nothing navigates away.

## 11. The swap (street runs east)

- The street now runs east past the old end to **THE MUSEUM** (x ≈ 108, pillared entrance, opens the museum page in a window; B2Buddy Records is a small door beside it).
- **THE MOVIE THEATER** (lobby + five theaters: DreamOS TV, 9×16, 16×9, Chroma 2025, Enter the Void + the Fever Dream Library to its north) is the building at the street's **west** end. Door at (−43, −40.6).
- **THE COMPLEX** is on the south sidewalk, door at x = 66. A red carpet starts in the road, goes in the door and down the entrance hall into the **Chroma Awards room** (east of the hall; paparazzi flash along the way). West of the hall is the **Computer Room** (terminals into every Chroma app). The old hidden room is now **THE STUDIO** (DJ tables, an NPC machine that opens Knock Knock).
- Tower doors for games warp to the Midway.
- Still to build: the complex's loop floor (both sides), the level-stack elevator with door descriptions, the single-screen arcade offshoot, the club arcade room's removal.
