const fs = require('fs');
const path = require('path');

const actionsDir = path.join(__dirname, '../src/actions');
const files = fs.readdirSync(actionsDir).filter(f => f.endsWith('.ts') && f !== 'auth.ts');

files.forEach(file => {
  const filePath = path.join(actionsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has requireAuth
  if (!content.includes('requireAuth')) {
    // Add import
    content = `import { requireAuth } from "@/lib/auth";\n` + content;
  }

  // Find functions that modify data
  const functionRegex = /export async function (save|delete|update|create|upsert|toggle)[A-Za-z0-9_]*\([^)]*\)\s*{/g;
  
  content = content.replace(functionRegex, (match) => {
    // Inject requireAuth unless it's createComplaint (public) or already has it
    if (match.includes('createComplaint') || match.includes('saveAduan')) {
      return match;
    }
    return `${match}\n  await requireAuth();`;
  });

  fs.writeFileSync(filePath, content);
  console.log(`Processed ${file}`);
});
