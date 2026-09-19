import allGames from './index.js';

// Define genre categories
export const genres = [
  { name: 'Action', slug: 'action' },
  { name: 'Adventure', slug: 'adventure' },
  { name: 'Puzzle', slug: 'puzzle' },
  { name: 'Platform', slug: 'platform' },
  { name: 'Racing', slug: 'racing' },
  { name: 'Shooting', slug: 'shooting' },
  { name: 'Simulation', slug: 'simulation' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Strategy', slug: 'strategy' },
  { name: 'Horror', slug: 'horror' },
  { name: 'Escape', slug: 'escape' },
  { name: 'Cooking', slug: 'cooking' },
];

// Helper functions to map tags to genre categories
const tagToGenreMap = {
  // Action genres
  'action': 'action',
  'fighting': 'action',
  'zombie': 'action',
  'samurai': 'action',
  'bombing': 'action',
  'mutant': 'action',

  // Adventure genres
  'adventure': 'adventure',
  'point and click': 'adventure',
  'exploration': 'adventure',
  'magic': 'adventure',

  // Puzzle genres
  'puzzle': 'puzzle',
  'physics': 'puzzle',
  'minimalist': 'puzzle',

  // Platform genres
  'platform': 'platform',
  'stickman': 'platform',
  'running': 'platform',

  // Racing genres
  'racing': 'racing',
  'driving': 'racing',
  'stunt': 'racing',

  // Shooting genres
  'shooter': 'shooting',
  'shooting': 'shooting',

  // Simulation genres
  'simulation': 'simulation',
  'management': 'simulation',
  'blacksmith': 'simulation',
  'restaurant': 'simulation',
  'mining': 'simulation',
  'farming': 'simulation',

  // Sports genres
  'sports': 'sports',
  'basketball': 'sports',
  'skateboarding': 'sports',

  // Strategy genres
  'strategy': 'strategy',
  'war': 'strategy',
  'turn-based': 'strategy',

  // Horror genres
  'horror': 'horror',

  // Escape genres
  'escape': 'escape',

  // Cooking genres
  'cooking': 'cooking',
  'restaurant': 'cooking'
};

/**
 * Gets the primary genre for a game based on its tags
 * @param {Object} game - The game object
 * @returns {string} The primary genre slug
 */
function getPrimaryGenre(game) {
  // Loop through the game's tags
  for (const tag of game.tags) {
    const lowercaseTag = tag.toLowerCase();
    // If the tag maps to a genre, return that genre
    if (tagToGenreMap[lowercaseTag]) {
      return tagToGenreMap[lowercaseTag];
    }
  }
  // Default to action if no matching genre is found
  return 'action';
}

/**
 * Split games into genre categories
 * @returns {Object} Object with genre slugs as keys and arrays of games as values
 */
export function getGamesByGenre() {
  const gamesByGenre = {};

  // Initialize each genre with an empty array
  genres.forEach(genre => {
    gamesByGenre[genre.slug] = [];
  });

  // Assign each game to its primary genre
  allGames.forEach(game => {
    const genreSlug = getPrimaryGenre(game);
    if (gamesByGenre[genreSlug]) {
      gamesByGenre[genreSlug].push(game);
    } else {
      // If the genre doesn't exist, add it to action (default)
      gamesByGenre['action'].push(game);
    }
  });

  return gamesByGenre;
}

/**
 * Get games for a specific genre
 * @param {string} genreSlug - The genre slug
 * @returns {Array} Array of games for that genre
 */
export function getGamesByGenreSlug(genreSlug) {
  const gamesByGenre = getGamesByGenre();
  return gamesByGenre[genreSlug] || [];
}

/**
 * Get the genre object by slug
 * @param {string} slug - The genre slug
 * @returns {Object|null} The genre object or null if not found
 */
export function getGenreBySlug(slug) {
  return genres.find(genre => genre.slug === slug) || null;
}

/**
 * Check if a game belongs to a specific genre
 * @param {Object} game - The game object
 * @param {string} genreSlug - The genre slug
 * @returns {boolean} True if the game belongs to the genre
 */
export function gameMatchesGenre(game, genreSlug) {
  return getPrimaryGenre(game) === genreSlug;
}

export default {
  genres,
  getGamesByGenre,
  getGamesByGenreSlug,
  getGenreBySlug,
  gameMatchesGenre
};
