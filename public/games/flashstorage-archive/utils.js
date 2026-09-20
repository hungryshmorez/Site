/**
 * Generate a proper iframe embed code for a game
 * @param {Object} game - The game object
 * @returns {string} HTML iframe code for embedding the game
 */
export function generateEmbedCode(game) {
    const url = game.src.replace('/player/', '/embed/');
    return `<iframe src="${url}" width="${game.width}" height="${game.height}" scrolling="no" frameborder="0" allowfullscreen></iframe>`;
}

/**
 * Generate a link to play the game in a new tab
 * @param {Object} game - The game object
 * @returns {string} URL to play the game in full page mode
 */
export function generatePlayUrl(game) {
    return game.src;
}

/**
 * Get all unique tags from the games collection
 * @param {Array} games - Collection of games
 * @returns {Array} Unique tags sorted alphabetically
 */
export function getAllUniqueTags(games) {
    const tagsSet = new Set();
    games.forEach(game => {
        game.tags.forEach(tag => tagsSet.add(tag));
    });
    return [...tagsSet].sort();
}

/**
 * Get all unique authors from the games collection
 * @param {Array} games - Collection of games
 * @returns {Array} Unique authors sorted alphabetically
 */
export function getAllUniqueAuthors(games) {
    const authorsSet = new Set();
    games.forEach(game => authorsSet.add(game.author));
    return [...authorsSet].sort();
}

/**
 * Get games sorted by rating
 * @param {Array} games - Collection of games
 * @param {boolean} ascending - Sort direction (default: descending)
 * @returns {Array} Games sorted by rating
 */
export function getGamesSortedByRating(games, ascending = false) {
    return [...games].sort((a, b) => {
        return ascending ? a.rating - b.rating : b.rating - a.rating;
    });
}

export default {
    generateEmbedCode,
    generatePlayUrl,
    getAllUniqueTags,
    getAllUniqueAuthors,
    getGamesSortedByRating
};
