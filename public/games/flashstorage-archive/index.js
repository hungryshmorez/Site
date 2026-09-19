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

// Combine all games
const allGames = [
    ...page4Games1,
    ...page4Games2,
    ...page4Games3,
    ...page4Games4,
    ...page5Games1,
    ...page5Games2,
    ...page5Games3,
    ...page5Games4,
    ...page6Games1,
    ...page6Games2,
    ...page6Games3,
    ...page6Games4,
    ...page7Games1,
    ...page7Games2,
    ...page7Games3,
    ...page7Games4,
    ...page8Games
];

// Export individual pages
export {
    page4Games1,
    page4Games2,
    page4Games3,
    page4Games4,
    page5Games1,
    page5Games2,
    page5Games3,
    page5Games4,
    page6Games1,
    page6Games2,
    page6Games3,
    page6Games4,
    page7Games1,
    page7Games2,
    page7Games3,
    page7Games4,
    page8Games
};

// Export all games
export default allGames;
