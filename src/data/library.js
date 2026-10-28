// THE FEVER DREAM LIBRARY — every document behind the show. Files live in
// public/library/fever-dream/ (PDFs + agent protocol) and the interactive hub site in
// public/library/fever-dream-hub/. To add one: drop the file there and append an entry.
//   kind  'site' | 'bible' | 'script' | 'prod'   (terminal tab + book colour)
//   short the title on the book cover
//   pages page count (PDFs)   size  human size
const F = 'library/fever-dream/';

export const LIBRARY = {
  name: 'FEVER DREAM',
  sub: 'THE PRODUCTION LIBRARY',
  blurb: 'A dual-track experimental film: 228 consecutive 15-second generations (57:00) interleaving two comatose patients’ journeys through a shared trauma, conjoining at the end. 1990s dark-surrealist stop-motion look — every bible, script, prompt and critique that built it.',
  tabs: [['all', 'ALL'], ['bible', 'BIBLES'], ['script', 'SCRIPTS'], ['prod', 'PRODUCTION']],
  docs: [
    { id: 'hub', kind: 'site', short: 'PRODUCTION HUB', title: 'Production Bible Hub', url: 'library/fever-dream-hub/index.html', size: 'interactive',
      desc: 'The working site: premise, every clip of every script on a searchable board, the checklist & proof log, prompt lint, models and sources.' },
    { id: 'master-bible', kind: 'bible', short: 'MASTER BIBLE', title: 'Dual Conjoined Master Bible', url: F + 'master-bible.pdf', pages: 87, size: '1.4 MB',
      desc: 'The master document: premise, both continuity locks, carried relics and the surgical directives for the whole film.' },
    { id: 'clips228', kind: 'bible', short: '228-CLIP MOVIE', title: '228-Clip Conjoined Movie', url: F + '228-clip-conjoined-movie.pdf', pages: 77, size: '1.3 MB',
      desc: 'The flagship: all 228 fifteen-second generations, Boy and Girl interleaved, no cuts, 57:00.' },
    { id: 'master-plan', kind: 'bible', short: '114 MASTER PLAN', title: '114-Generation Master Plan', url: F + '114-master-plan.pdf', pages: 39, size: '648 KB',
      desc: 'The original 114-generation plan (28:30) that the 228-clip epic grew from, with the network-executive critique.' },
    { id: 'assets', kind: 'bible', short: 'ASSET & SET PROMPTS', title: 'Asset & Set Prompt Bible', url: F + 'asset-and-set-prompt-bible.pdf', pages: 12, size: '224 KB',
      desc: 'Reference-sheet prompts for the characters, entities and sets — lock the look before any clip is generated.' },
    { id: 'boy', kind: 'script', short: 'THE BOY', title: 'The Boy’s Solo Script · 114 Generations', url: F + 'boy-script.pdf', pages: 37, size: '612 KB',
      desc: 'The Boy (Somatic Collapse): every generation of his solo track, in order.' },
    { id: 'girl', kind: 'script', short: 'THE GIRL', title: 'The Girl’s Solo Script · 114 Generations', url: F + 'girl-script.pdf', pages: 13, size: '220 KB',
      desc: 'The Girl (Memory Archive & Domestic Regret): her solo track. Note the numbering defects (031/091 twice, 068 skipped).' },
    { id: 'dual', kind: 'script', short: 'DUAL RUNNING', title: 'Conjoined Dual Running · 114 Generations', url: F + 'conjoined-dual-running.pdf', pages: 34, size: '608 KB',
      desc: 'Both tracks run side by side across 114 generations — the interleave that became the 228-clip cut.' },
    { id: 'critique', kind: 'prod', short: 'CRITIQUE', title: 'Show Critique Props', url: F + 'show-critique-props.pdf', pages: 4, size: '108 KB',
      desc: 'The Adult Swim–style executive critique master prompts used to pressure-test the show.' },
    { id: 'audit', kind: 'prod', short: 'NETWORK AUDIT', title: 'Project Audit — Network Evaluation', url: F + 'network-audit.pdf', pages: 13, size: '20 MB',
      desc: 'A structural tear-down of the 228-clip epic: “15-second micro-clips for an hour straight is structural suicide — unless it’s hypnotic.”' },
    { id: 'agents', kind: 'prod', short: 'AGENT PROTOCOL', title: 'Agent Protocol (AGENTS.md)', url: F + 'agent-protocol.txt', size: '9 KB',
      desc: 'How an agent works the production: task ids, proof records, the banned-word rules, source defects and export formats.' },
  ],
  process: [
    ['PREMISE', 'Two comatose patients — the Boy and the Girl — each cross a hospital-grounded dreamscape of their own, tied to one shared trauma.'],
    ['LOOK', 'Distressed 1990s dark-surrealist stop-motion: 35mm/VHS grain, gate weave, tactile grime. Zero sterile CGI.'],
    ['PLAN', '114 generations per track → interleaved into 228 consecutive 15-second clips, 57:00, no cuts and no breathing room.'],
    ['LOCKS', 'Continuity locks (coat, injuries, relics: cup from 23, mirror from 45, key from 65). Every biome maps to a failing body system.'],
    ['RULES', 'AI-tell word ban, sensory-filter stripping, messy biological realism, one discrete 15-second take per generation.'],
    ['CRITIQUE', 'Executive critique + a network audit pressure-test the structure before a frame is made.'],
    ['PROOF', 'Each clip is logged in the hub: model, prompt used, documentation link, screenshot, checksum.'],
  ],
};
