# Contributed code (reference only)

Code the artist provided "for later." Not wired into the build. Ported on demand
when we build the matching feature.

## enemy.js — saved in full ✅
Goomba-like `Enemy` class: wander/chase AI, jump attack, damage flash, death
particle burst, eye-tracking, trippy colour shift.
**Use for:** a combat/chase mechanic, backrooms pursuer, or a mini-game.

## World class (parkour) — source in chat log, port on demand
A `World` class that builds floating platforms in rings, a canvas-generated
trippy skybox (3 variants: fractal grid / concentric circles / spirals),
floating islands with abstract trees, crystal clusters, and a **player-centered
ripple effect on the ground** (vertex displacement) + colour-shifting ground.
**Reusable bits:** the ripple-ground vertex shader-in-JS, the canvas skybox
generator, floating-platform layout.
**Use for:** Skyline / Vertical Ascent parkour (Tier 3), or a Lab interior world.

## Vice City room — source in chat log, port on demand
A detailed first-person room: PointerLock controls + mobile nipplejs joystick +
touch-look, `createDetailed*` furniture builders (desk, safe, painting, door,
couch, bar, bookshelf, plants, neon signs, windows, lamps, rugs), raycast "press
E to interact" on tagged props, a d20 dice roller, and an **AI Game-Master chat**
(`websim.chat.completions`) driving a D&D-style escape room.
**Reusable bits:** the interactable-prop pattern (`userData.interactive`), the
detailed-furniture builders, the mobile joystick + touch-look controls.
**Use for:** the Leonida / GTA-style room, interactable props, richer interiors.
