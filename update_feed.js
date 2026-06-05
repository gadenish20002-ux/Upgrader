const fs = require('fs');

const liveFeedPath = './components/live-feed.tsx';
const itemsPath = './parsed_items.txt';

let feedContent = fs.readFileSync(liveFeedPath, 'utf8');
const itemsContent = fs.readFileSync(itemsPath, 'utf8');

feedContent = feedContent.replace(/const SKIN_ITEMS = \[[\s\S]*?\n\]/m, itemsContent);

fs.writeFileSync(liveFeedPath, feedContent);
console.log("Updated live-feed.tsx with new SKIN_ITEMS");
