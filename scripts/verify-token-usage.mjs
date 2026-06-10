import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const COMPONENTS_DIR = path.join(ROOT, 'packages/components/src');
const TOKENS_DIR = path.join(ROOT, 'node_modules/orbit-ds-variables/dist/css');

const TOKEN_FILES = [
  'primitives/variables.css',
  'themes/d-grey/variables.css',
  'themes/d-green/variables.css',
  'themes/n-grey/variables.css',
  'themes/n-green/variables.css',
  'themes/n-blue/variables.css',
  'platforms/web/variables.css',
  'platforms/ipad/variables.css',
  'platforms/desktop/variables.css',
];

const LOCAL_ONLY_VARS = new Set(['--orbit-listing-icon-frame', '--font-family']);

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return entry.name.endsWith('.css') ? [fullPath] : [];
  });
}

function collectCssVars(content) {
  const vars = new Set();
  for (const match of content.matchAll(/var\(--([a-zA-Z0-9-]+)\)/g)) {
    vars.add(`--${match[1]}`);
  }
  return vars;
}

function collectDefinedVars(content) {
  const vars = new Set();
  for (const match of content.matchAll(/--([a-zA-Z0-9-]+)\s*:/g)) {
    vars.add(`--${match[1]}`);
  }
  return vars;
}

const componentCss = walk(COMPONENTS_DIR)
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');

const usedVars = collectCssVars(componentCss);
const definedVars = new Set(LOCAL_ONLY_VARS);

for (const relativePath of TOKEN_FILES) {
  const filePath = path.join(TOKENS_DIR, relativePath);
  const content = readFileSync(filePath, 'utf8');
  for (const token of collectDefinedVars(content)) {
    definedVars.add(token);
  }
}

const missing = [...usedVars]
  .filter((name) => !definedVars.has(name) && !LOCAL_ONLY_VARS.has(name))
  .sort();

if (missing.length > 0) {
  console.error('Missing CSS variables in orbit-ds-variables token bundles:');
  for (const name of missing) console.error(`  ${name}`);
  process.exit(1);
}

console.log(`All ${usedVars.size} component CSS variables are defined in token bundles.`);
