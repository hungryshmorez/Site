// Site-wide GOLDEN VINYL hunt registry. Each world that hides vinyls records its
// localStorage key + how many it hides here, so the warehouse hub can show a
// running grand total across the whole complex and reward a 100% collection.
export const VINYL = {
  block: { store: '12m.vinyl.block', count: 5 },
  museum: { store: '12m.vinyl.museum', count: 4 },
  gameroom: { store: '12m.vinyl.gameroom', count: 2 },
  greenroom: { store: '12m.vinyl.greenroom', count: 2 },
  utility: { store: '12m.vinyl.utility', count: 2 },
};

// { found, total } collected across every registered world
export function vinylTotals() {
  let found = 0, total = 0;
  for (const k in VINYL) {
    total += VINYL[k].count;
    try { found += new Set(JSON.parse(localStorage.getItem(VINYL[k].store) || '[]')).size; } catch (e) {}
  }
  return { found, total };
}
