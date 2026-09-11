# Repo Audit — what we can pull into The Festival

An audit of every sibling repo against **Site** (`12matt3r // The Festival`, a
walkable Three.js + Vite festival portfolio). For each repo: what it is, and the
concrete thing we can lift from it to make the Site better.

The Site's own README lists these next steps — most of them are already solved
in one of the repos below:

1. Wire each destination CTA to the real EPK / store.
2. Feed the crowd/lights from real audio (Web Audio analyser) instead of fixed BPM.
3. Nicer character models + spawn bench, merch tent, VJ booth structures.
4. Mobile on-screen movement + touch targets.
5. Code-split the Three.js bundle.

---

## Tier 1 — Real content the Site already gestures at (wire in now)

These are the actual artist worlds/EPKs the destinations promise. The Site
already has `page:` stubs (`shmorez.html`, `tanky.html`, `driftwave.html`,
`studio.html`, `tv.html`) and blurbs that literally say "his EPK is on the
visuals screen / jukebox / temple monolith / throne-room TV." These repos are
that content.

| Repo | Feeds | What to lift |
| --- | --- | --- |
| **Shmorez-EPK** | SHMOREZ destination | `index.html` + `SHMOREZ episode.html/.pdf` + 11 media. Real EPK to load on the "visuals screen" and the CTA target. |
| **Tanky-Johnson-EPK** | TANKY JOHNSON | `index.html` + 14 media. The "saloon jukebox" EPK + press photos as textures. |
| **DriftWave-Static** | DRIFTWAVE STATIC | `index.html` + `background.js` (reusable vaporwave/striped-sun canvas backdrop). The "temple monolith" EPK. |
| **Glitch-Portfolio** | 12MATT3R / the glitch room | `glitch-art-epk.html` + `background.js`/`main.js` glitch/RGB-split effect. The 12matt3r EPK and the CRT-monument aesthetic. |
| **dreamos** | "DreamOS TV" theater **and** the web-OS the big CRT boots in the glitch room | A full browser desktop OS — `desktop.js`, `windows.js`, `programs.js`, `icons.js`, `audio.js`, 26 media. Embed it in the CRT as an interactive iframe instead of a static texture. |

**Action:** replace the CTA stubs / screen textures with iframes (or copied
assets) from these five. This closes next-step #1 entirely and gives the glitch
room + DreamOS TV real interactive payloads.

---

## Tier 2 — 3D techniques & assets to lift into the world

| Repo | Stack | What to lift |
| --- | --- | --- |
| **storyai-3d-director-desk** | React + R3F + drei | 8 rigged character models, **20 poses**, FBX/OBJ import, and a crowd-array system. Directly upgrades `scene/characters.js` + `scene/crowd.js` — solves next-step #3 (nicer characters). Also a camera-staging pattern for cinematic destination reveals. |
| **A-Museum-Interactive-3D-Environment** | Vanilla Three.js, no build | Museum-craft: marble statues, framed paintings, furniture, architectural detail, dynamic lighting — a recipe for detailing `scene/gallery.js`, the merch tent, and prop structures. |
| **Simulation-Reality** | TS + Three.js + **custom GLSL** | `vite-plugin-glsl` shader pipeline, a modular TS architecture, and **PWA + code-split** config. Blueprint for next-step #5 (code-split) and richer `fxpass.js`/`distortion.js`/`trippycam.js` shaders. |
| **Futuristic-Web-Experience** | Three.js r160 + **GSAP** | Cinematic intro + "liquid mirror" WebGL shader material. Use for the spawn/intro sequence and GSAP portal transitions when entering a destination world. |
| **Car-Game-ThreeJS** ("Drift & Drive") | R3F + **Rapier physics** | Vehicle physics. Make Tanky's lifted truck drivable, or a physics mini-game in `gamezones.js`. |
| **vxlverse** | R3F + Rapier + **howler** + gsap | A "3D game & art gallery platform" — patterns for the gallery, a game-embedding framework, and howler-based audio management (cleaner than raw Web Audio for one-shots). |
| **shosho** | R3F + **@react-three/rapier** | Physics "books falling / scatter" technique — reuse for a codex / merch-drop / physics-scatter moment. |

---

## Tier 3 — Real audio (solves next-step #2)

| Repo | What to lift |
| --- | --- |
| **lofi-player** | magenta.js **ML-generated lo-fi** + an interactive music room. Real generative audio to drive the crowd/lights analyser, and a perfect fit for the DriftWave chill zone / lounge. |
| **freesound** | The Freesound.org codebase + API — a source of CC-licensed SFX (footsteps, crowd ambience, UI clicks) and samples to feed `audio/ambience.js` and `audio/reactor.js`. Use as an asset/API source, not a code import. |

Swap the fixed 128-BPM `pulse` for a Web Audio `AnalyserNode` reading the actual
DJ/lofi track, so lights, LED screen, crowd bounce and auras react to real sound.

---

## Tier 4 — Playable games for the arcade / game zones

The Site already bundles `public/classic/flash-games/*` and has `arcade.js` /
`gamezones.js`.

| Repo | What to lift |
| --- | --- |
| **flashpoint-web** | Ruffle-based Flash player + a 200k-game archive UI. The **engine** to actually run the flash games the Site already ships. |
| **BrowserGames** | A collection of drop-in browser games for arcade cabinets. |
| **Space-Rangers-Universe-Sources** | Game source — content for a cabinet/kiosk. |
| **pokemmo** | Pixi.js + Node real-time multiplayer netcode (rooms, chat, JWT). Reference if we ever add multiplayer *presence* to the festival crowd. |
| **biomes-game** | Open-source voxel MMORPG (Next.js/WASM/React). Heavy — reference only, for multiplayer/voxel architecture, not a direct import. |

---

## Tier 5 — Indirect / heavier lift (a path exists, but it's not a drop-in)

The goal is to integrate everything we can. These four don't paste straight into
the Three.js world, but each still has a real path in if we want it.

| Repo | What it is | Path into the Site |
| --- | --- | --- |
| **12matt3r** | The MCP asset-generation pipeline (`generate_3d`, `generate_image`, `generate_audio`). | Not site code — it's the **tool** we use to author new models/textures/music for every tier above. Integrate it as the asset pipeline, not as a scene. |
| **VibeOS** | From-scratch hobby OS in C + ARM assembly (bare-metal QEMU/Raspberry Pi, macOS-style GUI, DOOM, MicroPython). Not web tech. | Aesthetic reference for the CRT web-OS / glitch room (its dock, window chrome, System-7 B&W look), and its help pages/screenshots can texture a "VibeOS" cabinet. Running the real kernel in-browser would need a WASM emulator — possible but heavy; treat as a themed kiosk, not a live embed. |
| **BookLore** | Self-hosted book manager (Angular + Java backend). | Could back `codex.html` as a real reading room via an embedded/iframed deployed instance. Optional — only if the codex should hold real books rather than lore. |
| **needle-engine-support** | Needle Engine docs — an alternative web 3D engine. | Reference only; not a swap-in for our Three.js stack. Useful if we ever want editor-driven scene authoring. |
| **gallery** | Google AI Edge Gallery (Android on-device LLM). | No practical path — it's a native Android app for running LLMs on-device. The *idea* (an AI NPC) could inspire a chat character, but nothing in this repo ports to the web. |

---

## Recommended sequence

1. **Wire Tier 1 content** into the five destinations + DreamOS CRT (fast, high
   payoff, closes next-step #1).
2. **Real-audio analyser** from lofi-player / DJ engine (next-step #2).
3. **storyai characters + poses** to replace procedural figures (next-step #3).
4. **Simulation-Reality's** GLSL + code-split/PWA config (next-step #5 + nicer FX).
5. **Rapier mini-games** (Car-Game / shosho) into the game zones as depth.
