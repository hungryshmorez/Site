// Drop-in boot for the global player. Every room page includes this so music is
// present and continuous everywhere without each room having to wire it by hand.
// The festival (main.js) initialises the player itself, because it also attaches
// the beat-reactor to the same element — so this boot is a no-op there.
import { initGlobalPlayer } from './globalplayer.js';

initGlobalPlayer({ transport: true, autoResume: true });
