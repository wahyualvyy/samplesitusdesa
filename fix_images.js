const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function replaceInFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInFiles(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Regex to find Unsplash image URLs
            let newContent = content.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+[^"']*/g, (match) => {
                // Extract signature if exists, else random
                let sigMatch = match.match(/sig=(\d+)/);
                let seed = sigMatch ? sigMatch[1] : Math.floor(Math.random() * 1000);
                return `https://picsum.photos/seed/${seed}/800/600`;
            });
            
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log(`Updated images in ${file}`);
            }
        }
    }
}

replaceInFiles(srcDir);
console.log("Images replacement done.");
