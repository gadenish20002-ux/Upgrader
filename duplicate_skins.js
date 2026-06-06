const fs = require('fs');

let content = fs.readFileSync('lib/default-data.ts', 'utf8');

// The file has:
// export const DEFAULT_SKINS: Skin[] = [
//   { ... },
// ]

const skinsMatch = content.match(/export const DEFAULT_SKINS: Skin\[\] = \[([\s\S]*?)\]\n/);

if (skinsMatch) {
    const innerContent = skinsMatch[1];
    
    // We can parse the objects using a dirty eval or just duplicate the string with replaced IDs
    // Since it's formatted as objects, let's just duplicate the blocks.
    
    // Each object looks like:   { id: "skin-1", name: "Sand Dune", ... },
    let skinsArr = [];
    const objRegex = /{\s*id:\s*"skin-\d+",([\s\S]*?)}/g;
    
    let m;
    while ((m = objRegex.exec(innerContent)) !== null) {
        skinsArr.push(m[1]);
    }
    
    if (skinsArr.length > 0) {
        let newSkinsList = [];
        // Original 20
        for (let i = 0; i < skinsArr.length; i++) {
            newSkinsList.push(`  { id: "skin-${i + 1}",${skinsArr[i]}}`);
        }
        
        // Add more by duplicating
        let added = skinsArr.length;
        for (let copy = 1; copy <= 3; copy++) { // total 4 * 20 = 80
            for (let i = 0; i < skinsArr.length; i++) {
                // Vary price a bit to make it look different
                let skinBody = skinsArr[i];
                let newBody = skinBody.replace(/price:\s*([\d\.]+)/, (match, p1) => {
                    let newPrice = (parseFloat(p1) * (1 + copy * 0.1)).toFixed(2);
                    return `price: ${newPrice}`;
                });
                newSkinsList.push(`  { id: "skin-${added + i + 1}",${newBody}}`);
            }
            added += skinsArr.length;
        }
        
        const newSkinsStr = `export const DEFAULT_SKINS: Skin[] = [\n${newSkinsList.join(',\n')}\n]\n`;
        content = content.replace(/export const DEFAULT_SKINS: Skin\[\] = \[([\s\S]*?)\]\n/, newSkinsStr);
        
        fs.writeFileSync('lib/default-data.ts', content);
        console.log("Successfully added more skins. Total skins:", newSkinsList.length);
    } else {
        console.log("Could not parse individual skins.");
    }
} else {
    console.log("Could not find DEFAULT_SKINS array.");
}
