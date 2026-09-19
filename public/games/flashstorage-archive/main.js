import allGames from './index.js';

import page4Games1 from './page4.js';
import page4Games2 from './page4-2.js';
import page4Games3 from './page4-3.js';
import page4Games4 from './page4-4.js';

import page5Games1 from './page5-1.js';
import page5Games2 from './page5-2.js';
import page5Games3 from './page5-3.js';
import page5Games4 from './page5-4.js';

import page6Games1 from './page6-1.js';
import page6Games2 from './page6-2.js';
import page6Games3 from './page6-3.js';
import page6Games4 from './page6-4.js';

import page7Games1 from './page7-1.js';
import page7Games2 from './page7-2.js';
import page7Games3 from './page7-3.js';
import page7Games4 from './page7-4.js';

import page8Games from './page8.js';

/**
 * Get all games in the collection
 * @returns {Array} All games in the collection
 */
export function getAllGames() {
    return allGames;
}

/**
 * Get games filtered by tag
 * @param {string} tag - The tag to filter by
 * @returns {Array} Games that match the tag
 */
export function getGamesByTag(tag) {
    return allGames.filter(game => game.tags.includes(tag));
}

/**
 * Get games filtered by author
 * @param {string} author - The author name to filter by
 * @returns {Array} Games by the specified author
 */
export function getGamesByAuthor(author) {
    return allGames.filter(game => game.author === author);
}

/**
 * Get featured games
 * @returns {Array} Featured games
 */
export function getFeaturedGames() {
    return allGames.filter(game => game.featured);
}

/**
 * Get games by rating threshold
 * @param {number} minRating - Minimum rating (0-5)
 * @returns {Array} Games that meet or exceed the rating
 */
export function getGamesByMinRating(minRating) {
    return allGames.filter(game => game.rating >= minRating);
}

/**
 * Search games by title
 * @param {string} query - The search term
 * @returns {Array} Games with matching titles
 */
export function searchGamesByTitle(query) {
    const lowercaseQuery = query.toLowerCase();
    return allGames.filter(game =>
        game.title.toLowerCase().includes(lowercaseQuery)
    );
}

/**
 * Get a specific game by ID
 * @param {number} id - The game ID
 * @returns {Object|null} The game object or null if not found
 */
export function getGameById(id) {
    return allGames.find(game => game.id === id) || null;
}

/**
 * Get a specific game by title
 * @param {string} title - The game title
 * @returns {Object|null} The game object or null if not found
 */
export function getGameByTitle(title) {
    return allGames.find(game => game.title === title) || null;
}

/**
 * Get all games from a specific page
 * @param {number} pageNum - The page number (4-8)
 * @returns {Array} Games from the specified page
 */
export function getGamesByPage(pageNum) {
    // Import from ES modules
    switch (pageNum) {
        case 4:
            return [
                ...page4Games1,
                ...page4Games2,
                ...page4Games3,
                ...page4Games4
            ];
        case 5:
            return [
                ...page5Games1,
                ...page5Games2,
                ...page5Games3,
                ...page5Games4
            ];
        case 6:
            return [
                ...page6Games1,
                ...page6Games2,
                ...page6Games3,
                ...page6Games4
            ];
        case 7:
            return [
                ...page7Games1,
                ...page7Games2,
                ...page7Games3,
                ...page7Games4
            ];
        case 8:
            return [...page8Games];
        default:
            return [];
    }
}

// Default export for easier importing
export default {
    getAllGames,
    getGamesByTag,
    getGamesByAuthor,
    getFeaturedGames,
    getGamesByMinRating,
    searchGamesByTitle,
    getGameById,
    getGameByTitle,
    getGamesByPage
};
