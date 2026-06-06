const fs = require('fs');

const content = fs.readFileSync('lib/default-data.ts', 'utf8');

// Extract current DEFAULT_SKINS
const match = content.match(/export const DEFAULT_SKINS: Skin\[\] = \[([\s\S]*?)\];/);
// Actually it's just "]" at the end.
// Let's require it properly.
