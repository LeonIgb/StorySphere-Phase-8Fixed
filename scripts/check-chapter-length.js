// Usage: node scripts/check-chapter-length.js
// Reports the word count of every long-form chapter in src/data/chapters and flags any under the target.
const fs = require('fs');
const path = require('path');

const TARGET = 5000;
const dir = path.join(__dirname, '..', 'src', 'data', 'chapters');
let failed = false;

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort()) {
  const source = fs.readFileSync(path.join(dir, file), 'utf8').replace('export default', 'return');
  const paragraphs = new Function(source)();
  const words = paragraphs.reduce((n, p) => n + p.trim().split(/\s+/).filter(Boolean).length, 0);
  const ok = words >= TARGET;
  if (!ok) failed = true;
  console.log(`${ok ? 'OK  ' : 'LOW '} ${file.padEnd(14)} ${String(words).padStart(6)} words  (${paragraphs.length} paragraphs)`);
}
process.exit(failed ? 1 : 0);
