import { openWindow } from './popup.js';

// Open the voting page (vote.html → the Chroma Awards vote page in an iframe) in the
// in-site window, so nobody has to leave the site. Used by every voting booth and
// vote button.
export function openVote() {
  openWindow('VOTE // CHROMA AWARDS', new URL('vote.html', location.href).href);
}
