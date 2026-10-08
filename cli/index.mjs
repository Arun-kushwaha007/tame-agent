#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_ROOT = path.resolve(__dirname, '..');
const CWD = process.cwd();

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

const args = process.argv.slice(2);
const command = args[0] || 'help';
const force = args.includes('--force');

function log(msg) { console.log(msg); }
function success(msg) { console.log(`${colors.green}${colors.bold}✔${colors.reset} ${msg}`); }
function info(msg) { console.log(`${colors.blue}${colors.bold}ℹ${colors.reset} ${msg}`); }
function warn(msg) { console.log(`${colors.yellow}${colors.bold}⚠${colors.reset} ${msg}`); }
function error(msg) { console.error(`${colors.red}${colors.bold}✖${colors.reset} ${msg}`); }

function printHelp() {
  log(`
${colors.cyan}${colors.bold}tame-agent${colors.reset} - Frontend Governance & AI Agent Rules

${colors.bold}Usage:${colors.reset}
  npx tame-agent <command> [options]

${colors.bold}Commands:${colors.reset}
  init          Initialize tame-agent in your project (copies all rules, skills, and eslint plugins)
  add-rules     Copy only the agent rules to .agents/rules/
  add-eslint    Copy only the ESLint plugin
  add-skills    Copy only the skills to .agents/skills/
  help          Show this help message

${colors.bold}Options:${colors.reset}
  --force       Overwrite existing files without prompting
  `);
}

function copyDirContents(src, dest) {
  if (!fs.existsSync(src)) {
    warn(`Source directory not found: ${src}`);
    return;
  }
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.name === '.gitkeep') continue;

    if (entry.isDirectory()) {
      copyDirContents(srcPath, destPath);
    } else {
      if (fs.existsSync(destPath) && !force) {
        warn(`Skipped existing file (use --force to overwrite): ${destPath}`);
        continue;
      }
      fs.copyFileSync(srcPath, destPath);
      success(`Created: ${path.relative(CWD, destPath)}`);
    }
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function init() {
  log(`\n${colors.cyan}${colors.bold}Initializing tame-agent...${colors.reset}\n`);
  
  // 1. Copy rules
  info('Setting up agent rules...');
  const rulesSrc = path.join(PKG_ROOT, 'rules');
  const rulesDest = path.join(CWD, '.agents', 'rules');
  ensureDir(rulesDest);
  copyDirContents(rulesSrc, rulesDest);

  // 2. Create AGENTS.md template
  info('Creating AGENTS.md template...');
  const agentsMdSrc = path.join(PKG_ROOT, 'templates', 'AGENTS.md');
  const agentsMdDest = path.join(CWD, 'AGENTS.md');
  if (fs.existsSync(agentsMdSrc)) {
    if (!fs.existsSync(agentsMdDest) || force) {
      fs.copyFileSync(agentsMdSrc, agentsMdDest);
      success('Created: AGENTS.md');
    } else {
      warn('Skipped existing file: AGENTS.md');
    }
  } else {
    // Fallback if template doesn't exist yet
    if (!fs.existsSync(agentsMdDest) || force) {
      fs.writeFileSync(agentsMdDest, '# AI Agent Instructions\n\nReference the rules in `.agents/rules/`.\n');
      success('Created: AGENTS.md');
    }
  }

  // 3. Copy ESLint plugin
  info('Setting up ESLint plugin...');
  const eslintSrc = path.join(PKG_ROOT, 'eslint-plugin');
  const eslintDest = path.join(CWD, 'eslint-rules'); // typical place for local plugins or generic output
  ensureDir(eslintDest);
  copyDirContents(eslintSrc, eslintDest);

  // 4. Copy Skills
  info('Setting up skills...');
  const skillsSrc = path.join(PKG_ROOT, 'skills');
  const skillsDest = path.join(CWD, '.agents', 'skills');
  ensureDir(skillsDest);
  copyDirContents(skillsSrc, skillsDest);

  log(`\n${colors.green}${colors.bold}✨ Success! tame-agent has been initialized.${colors.reset}`);
  log(`\nNext steps:`);
  log(`1. Review the generated rules in ${colors.cyan}.agents/rules/${colors.reset}`);
  log(`2. Update ${colors.cyan}AGENTS.md${colors.reset} to fit your project`);
  log(`3. Configure ESLint to use the local rules in ${colors.cyan}eslint-rules/${colors.reset}\n`);
}

function addRules() {
  info('Adding agent rules...');
  const rulesSrc = path.join(PKG_ROOT, 'rules');
  const rulesDest = path.join(CWD, '.agents', 'rules');
  ensureDir(rulesDest);
  copyDirContents(rulesSrc, rulesDest);
  success('Rules added successfully.');
}

function addEslint() {
  info('Adding ESLint plugin...');
  const eslintSrc = path.join(PKG_ROOT, 'eslint-plugin');
  const eslintDest = path.join(CWD, 'eslint-rules');
  ensureDir(eslintDest);
  copyDirContents(eslintSrc, eslintDest);
  success('ESLint plugin added successfully.');
}

function addSkills() {
  info('Adding skills...');
  const skillsSrc = path.join(PKG_ROOT, 'skills');
  const skillsDest = path.join(CWD, '.agents', 'skills');
  ensureDir(skillsDest);
  copyDirContents(skillsSrc, skillsDest);
  success('Skills added successfully.');
}

async function run() {
  switch (command) {
    case 'init':
      init();
      break;
    case 'add-rules':
      addRules();
      break;
    case 'add-eslint':
      addEslint();
      break;
    case 'add-skills':
      addSkills();
      break;
    case 'help':
    case '--help':
    case '-h':
      printHelp();
      break;
    default:
      error(`Unknown command: ${command}`);
      printHelp();
      process.exit(1);
  }
}

run().catch(err => {
  error(`An unexpected error occurred:\n${err.message}`);
  process.exit(1);
});
