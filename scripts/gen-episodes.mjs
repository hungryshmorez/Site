import { readFileSync, writeFileSync } from 'node:fs';
const s = readFileSync('/home/user/Site/public/studios/index.html', 'utf8');

function balanced(str, start, open, close) {
  let d = 0, inTL = false;
  for (let i = start; i < str.length; i++) {
    const c = str[i];
    if (inTL) { if (c === '\\') { i++; continue; } if (c === '`') inTL = false; continue; }
    if (c === '`') { inTL = true; continue; }
    if (c === open) d++;
    else if (c === close) { d--; if (d === 0) return str.slice(start, i + 1); }
  }
  return null;
}

// slug -> {title, genre, description, poster} from the slate
const slate = {};
{
  const re = /slug:`([^`]*)`,title:`([^`]*)`,genre:`([^`]*)`,description:`([^`]*)`,poster:`([^`]*)`/g;
  let m;
  while ((m = re.exec(s))) slate[m[1]] = { title: m[2], genre: m[3], description: m[4], poster: m[5] };
}
console.error('slate shows:', Object.keys(slate).length);

// xi = { slug: [episodes] } for every show except al-and-sloppy
const xiAt = s.indexOf('xi={');
const xi = eval('(' + balanced(s, xiAt + 3, '{', '}') + ')');

// al-and-sloppy inline episodes:[ ... ]
const epAt = s.indexOf('episodes:[');
const alSloppy = eval('(' + balanced(s, epAt + 'episodes:'.length, '[', ']') + ')');

const bySlug = { ...xi, 'al-and-sloppy': alSloppy };
const stillPath = (p) => 'studios/' + String(p).replace(/^\/?/, '');

const EPISODES = [];
for (const [slug, eps] of Object.entries(bySlug)) {
  const showTitle = (slate[slug] && slate[slug].title) || slug;
  for (const e of eps) {
    EPISODES.push({
      show: slug, showTitle,
      title: e.title, seasonEpisode: e.seasonEpisode || null, duration: e.duration || null,
      synopsis: e.synopsis || null, showrunnerUrl: e.showrunnerUrl, videoUrl: e.videoUrl,
      still: e.still ? stillPath(e.still) : null, vertical: !!e.vertical,
    });
  }
}
console.error('episodes total:', EPISODES.length);

const SHOWS = Object.entries(slate).map(([slug, v]) => ({
  slug, title: v.title, genre: v.genre, description: v.description,
  poster: 'studios/' + v.poster.replace(/^\/?/, ''),
}));
console.error('shows total:', SHOWS.length);

const header = [
  '// Every episode across the That Time Again Studios slate — 63 across all series.',
  '// Extracted from the studios build baked into public/studios/ (the site\'s own copy),',
  '// so the theater plays real cuts and links out to each one\'s Showrunner page.',
  '// Regenerate: node scripts/gen-episodes.mjs (source of truth: public/studios/index.html).',
].join('\n');
const studio = {
  title: 'That Time Again Studios',
  blurb: `Synthetic media from a collapsing public-access multiverse — ${EPISODES.length} episodes across the slate.`,
  showUrl: 'https://www.showrunnerstudio.com/',
};
const epFile = header + '\n'
  + 'export const STUDIO = ' + JSON.stringify(studio, null, 0) + ';\n'
  + 'export const EPISODES = ' + JSON.stringify(EPISODES, null, 0) + ';\n';

writeFileSync('/home/user/Site/src/data/episodes.js', epFile);

const showFile = `// The full That Time Again Studios slate — every show with its poster and
// description. Used by the theater's SHOWS carousel. Regenerate via
// scripts/gen-episodes.mjs (source: public/studios/index.html).
export const SHOWS = ${JSON.stringify(SHOWS, null, 0)};
`;
writeFileSync('/home/user/Site/src/data/shows.js', showFile);
console.error('wrote episodes.js + shows.js');
