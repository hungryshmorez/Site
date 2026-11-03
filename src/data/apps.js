// Games and tools by 12matt3r / SofaKingSadBoi (also on the studios site). Opened from the arcade terminal and the computer room.
const host = (u) => new URL(u).hostname.replace(/^www\./, '');
const mk = (rows) => rows.map(([title, url]) => ({ title, url, note: host(url) }));
export const ARCADE_GAMES = mk([
  ['Out to Pasture: Bardo Monsters', 'https://app.nimblefox.ai/events/nimble-game-jam/entries/Zfq8uKHgTG'],
  ['You’re Probably Gonna Die!', 'https://app.nimblefox.ai/g/f7AZrQFAOf'],
  ['B2Buddy', 'https://app.nimblefox.ai/g/6VplR8vm22'],
  ['CHECKMATE 55–OVERDRIVE', 'https://app.nimblefox.ai/g/7TJ5y6zN3N'],
  ['SEVEN DAYS', 'https://hungryshmorez.github.io/Seven-days/'],
  ['The Club', 'https://app.nimblefox.ai/g/L6sIaIjfQ6'],
  ['Midnight Vapor Circuit', 'https://app.nimblefox.ai/g/UjaA1ZAbvU'],
  ['NPC Therapy', 'https://npctherapy.on.websim.com/'],
  ['Chromashift', 'https://websim.com/@SOFAKINGSADBOI/chromashift-hyper-surreal-dreamscape-3'],
  ['Urban Life Simulator', 'https://urban-life-simulator-10--sofakingsadboi.on.websim.com/'],
  ['Choose Your Own Grand Theft Auto Story', 'https://leonida-360-vice-city-crime-simulator--sofakingsadboi.on.websim.com/'],
  ['Bikini Bottom Anomaly Hunt', 'https://fright-night.on.websim.com/'],
  ['GTA Vice City Websim Edition', 'https://gta--sofakingsadboi.on.websim.com/'],
  ['Curse of the Monkey Paw', 'https://wish.on.websim.com/'],
  ['Trippy Racing', 'https://dreamworld-cattle-racing-game--sofakingsadboi.on.websim.com/'],
]);
export const APPS_SITES = mk([
  ['Out to Pasture: documentation', 'https://out-to-pasture--sofakingsadboi.on.websim.com/'],
  ['Showrunner Script Lab', 'https://showrunner-studio-2--sofakingsadboi.on.websim.com/'],
  ['When Ocean Meets Sky: documentation', 'https://ocean-meets-sky--sofakingsadboi.on.websim.com/'],
  ['That Time Again: documentation', 'https://that-time-again--sofakingsadboi.on.websim.com/'],
  ['Fever Dream: documentation', 'https://fever-dream--sofakingsadboi.on.websim.com/'],
  ['Web Fusion Studio', 'https://fuse2.on.websim.com/'],
  ['Trippy Cam 2.0', 'https://trippykit.on.websim.com/'],
  ['Windows 93', 'https://64fm47unhpzo.space.minimax.io'],
  ['FFmpeg Studio', 'https://3jnyhlyqkqq1e.space.minimax.io/'],
  ['The Book of the Fading Age', 'https://0vc7xut32fnw9.space.minimax.io/'],
  ['Long Live the Underground', 'https://oy3r595rsonau.space.minimax.io/'],
  ['Driftwave Vaporizer', 'https://oy3r595rsonau.space.minimax.io/'],
  ['Start From the Bottom Now We Here', 'https://jcuhmw6ty0qn4.space.minimax.io/'],
]);
