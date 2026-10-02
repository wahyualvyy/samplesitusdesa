const fs = require('fs');
const path = require('path');

const actionsDir = path.join(__dirname, '../src/actions');
const files = fs.readdirSync(actionsDir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
  const filePath = path.join(actionsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if "use server" is somewhere but not at the very top
  if (content.includes('"use server"') && !content.startsWith('"use server"')) {
    // Remove all occurrences of "use server"; or "use server"
    content = content.replace(/"use server";?\s*/g, '');
    // Add it to the very top
    content = '"use server";\n\n' + content;
    fs.writeFileSync(filePath, content);
    console.log(`Fixed use server in ${file}`);
  }
});
