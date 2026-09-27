// Canonical per-artist EPK + links, from the collective's own directory
// (portfolio_data.json → artist_profiles). Source of truth for the LINKS panel
// shown inside each artist's world and for the Lab's alias tabs. These are the
// CORRECT links — edit here (and portfolio_data.json) if an artist's links change.
export const ARTIST_LINKS = {
  'SOFA KING SAD BOI': {
    world: 'sofaboi.html',
    epk: 'https://sofa-king-sad-boi-official-epk--sofakingsadboi.on.websim.com/',
    note: 'Dubstep, bass music, and genre-defying electronic productions.',
    links: [
      { title: 'Bandcamp', url: 'https://driftwavestatic.bandcamp.com' },
      { title: 'YouTube', url: 'https://www.youtube.com/@sofakingsadboi' },
      { title: 'Spotify', url: 'https://open.spotify.com/artist/0gI4DEY1dhARmuER7aPSJY' },
    ],
  },
  'DRIFTWAVE STATIC': {
    world: 'driftwave.html',
    epk: 'https://staticcorp--sofakingsadboi.on.websim.com/',
    note: 'Slush wave, ambient, vaporwave producer.',
    links: [
      { title: 'Bandcamp', url: 'https://driftwavestatic.bandcamp.com' },
      { title: 'SoundCloud', url: 'https://soundcloud.com/sofakingsadboi' },
    ],
  },
  'RAVE CHARLES': {
    world: 'ravecharles.html',
    epk: 'https://express.adobe.com/page/s43NCJty7DfTO/',
    note: 'Rapper, DJ, veteran producer.',
    links: [
      { title: 'Facebook', url: 'https://www.facebook.com/sofakingsadboi/' },
    ],
  },
  'TANKY JOHNSON': {
    world: 'tanky.html',
    epk: 'https://tanky-johnson-epk--sofakingsadboi.on.websim.com/',
    note: 'Country music alias — southern charm for the experimental collective.',
    links: [],
  },
  'SHMOREZ': {
    world: 'shmorez.html',
    epk: 'https://shmorez-official-epk--sofakingsadboi.on.websim.com/#visuals',
    note: 'Animated electronic marshmallow squish of fire.',
    links: [],
  },
  '12MATT3R': {
    world: 'studio.html',
    epk: 'https://glitch-portfolio--sofakingsadboi.on.websim.com/',
    note: 'Web stuff, coding, new-media experience design — the collective hub.',
    links: [
      { title: 'Instagram', url: 'https://www.instagram.com/12matt3r/' },
      { title: 'GitHub', url: 'https://github.com/12Matt3r' },
    ],
  },
};
