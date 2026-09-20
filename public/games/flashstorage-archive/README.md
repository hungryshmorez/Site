# Flash Games Collection

This repository contains a collection of Flash game metadata organized by pages as specified in the original document.

## File Structure

The games are organized into separate JavaScript files by page and section:

- **Page 4**:
  - `page4.js` - Games 1-4
  - `page4-2.js` - Games 5-8
  - `page4-3.js` - Games 9-12
  - `page4-4.js` - Games 13-16

- **Page 5**:
  - `page5-1.js` - Games 1-4
  - `page5-2.js` - Games 5-8
  - `page5-3.js` - Games 9-12
  - `page5-4.js` - Games 13-16

- **Page 6**:
  - `page6-1.js` - Games 1-4
  - `page6-2.js` - Games 5-8
  - `page6-3.js` - Games 9-12
  - `page6-4.js` - Games 13-16

- **Page 7**:
  - `page7-1.js` - Games 1-4
  - `page7-2.js` - Games 5-8
  - `page7-3.js` - Games 9-12
  - `page7-4.js` - Games 13-16

- **Page 8**:
  - `page8.js` - Games 1-2

## Integration

The `index.js` file imports all game collections and exports them individually as well as a combined list of all games.

## Game Object Structure

Each game object in the collection follows this structure:

```javascript
{
    id: 1,                      // Unique ID within its page
    title: "Game Title",        // Title of the game
    src: "URL/to/game",         // Source URL for the game
    width: 640,                 // Default width
    height: 480,                // Default height
    thumbnail: "path/to/image", // Thumbnail image path
    tags: ["tag1", "tag2"],     // Categories/tags for the game
    rating: 4.5,                // Rating (0-5)
    author: "Author Name",      // Creator of the game
    featured: true              // Whether it's a featured game
}
```

## Usage

Import the games collection:

```javascript
// Import all games
import allGames from './index.js';

// Import specific page
import { page4Games1 } from './index.js';
```

## Notes

- This is a metadata collection only.
- Thumbnail placeholders need to be replaced with actual images.
- The original embed structure was:
```html
<iframe src="https://flashstorage.games/embed/GAME_NAME" width="640" height="480" scrolling="no"></iframe>
```
