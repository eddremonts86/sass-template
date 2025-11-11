#!/usr/bin/env node

/**
 * Generate VitePress sidebar configuration from docs folder structure
 *
 * This script recursively scans the docs/ folder (up to 5 levels deep) and
 * automatically generates the sidebar configuration for VitePress.
 *
 * It creates sections based on folder structure and includes all .md files.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.join(__dirname, '../docs');
const CONFIG_FILE = path.join(DOCS_DIR, '.vitepress/config.mjs');
const MAX_DEPTH = 5;
const IGNORED_FOLDERS = ['.vitepress', 'public', 'node_modules', 'api'];
const IGNORED_FILES = ['index.md'];

/**
 * Convert filename to title
 * Examples:
 *   getting-started.md -> Getting Started
 *   QUICK_START_STRAPI.md -> Quick Start Strapi
 *   strapi-integration.md -> Strapi Integration
 */
function filenameToTitle(filename) {
  const name = filename.replace(/\.mdx?$/, '');

  // Handle uppercase names like QUICK_START_STRAPI
  if (name === name.toUpperCase()) {
    return name
      .split(/[_-]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  // Handle kebab-case names
  return name
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Convert folder name to section title
 */
function folderToTitle(foldername) {
  const titleMap = {
    guide: 'Getting Started',
    components: 'UI Components',
    patterns: 'Design Patterns',
    strapi: 'Strapi Integration',
    api: 'API Documentation',
  };

  return titleMap[foldername] || filenameToTitle(foldername);
}

/**
 * Get all markdown files in a directory recursively
 */
function getMarkdownFiles(dir, baseDir = dir, depth = 0) {
  if (depth > MAX_DEPTH) return [];

  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relativePath = path.relative(baseDir, fullPath);

    if (item.isDirectory()) {
      if (IGNORED_FOLDERS.includes(item.name)) continue;

      const subFiles = getMarkdownFiles(fullPath, baseDir, depth + 1);
      files.push(...subFiles);
    } else if (item.isFile() && /\.mdx?$/.test(item.name)) {
      if (IGNORED_FILES.includes(item.name)) continue;

      files.push({
        name: item.name,
        path: relativePath,
        dir: path.dirname(relativePath),
      });
    }
  }

  return files;
}

/**
 * Sort files with special ordering
 * Priority: overview > getting-started > alphabetical
 */
function sortFiles(files) {
  return files.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();

    // Overview always first
    if (aName.includes('overview')) return -1;
    if (bName.includes('overview')) return 1;

    // Getting started second
    if (aName.includes('getting-started')) return -1;
    if (bName.includes('getting-started')) return 1;

    // Quick start third
    if (aName.includes('quick')) return -1;
    if (bName.includes('quick')) return 1;

    // Alphabetical
    return aName.localeCompare(bName);
  });
}

/**
 * Generate sidebar items for a section
 */
function generateSidebarItems(files, sectionPrefix, subDir = null) {
  const sortedFiles = sortFiles(files);

  return sortedFiles.map(file => {
    // Build the complete path
    let link;
    if (subDir) {
      // For subdirectory files, include the subdirectory in the path
      link = `/${sectionPrefix}/${subDir}/${file.name.replace(/\.mdx?$/, '')}`;
    } else {
      // For root level files, just use section/filename
      link = `/${sectionPrefix}/${file.name.replace(/\.mdx?$/, '')}`;
    }
    const text = filenameToTitle(file.name);

    return { text, link };
  });
}

/**
 * Generate sidebar configuration
 */
function generateSidebarConfig() {
  const sidebar = {};

  // Scan each main section
  const mainSections = ['guide', 'strapi', 'components', 'patterns', 'api'];

  for (const section of mainSections) {
    const sectionPath = path.join(DOCS_DIR, section);
    if (!fs.existsSync(sectionPath)) continue;

    const files = getMarkdownFiles(sectionPath);

    // Build sidebar for this section
    const sidebarItems = [];

    // Group files by subdirectory
    const subDirs = {};
    for (const file of files) {
      // Check if file is in root (dir === ".") or in a subdirectory
      if (file.dir === '.') {
        // Root level file
        if (!subDirs['_root']) subDirs['_root'] = [];
        subDirs['_root'].push(file);
      } else {
        // Subdirectory file - use the first directory name
        const subDir = file.dir.split(path.sep)[0];
        if (!subDirs[subDir]) subDirs[subDir] = [];
        subDirs[subDir].push(file);
      }
    }

    // Special handling for components (split by layout)
    if (section === 'components') {
      const uiComponents = [];
      const layoutComponents = [];

      for (const file of files) {
        const fileName = file.name.toLowerCase();
        if (
          ['header', 'sidebar', 'footer', 'navigation'].some(name =>
            fileName.includes(name)
          )
        ) {
          layoutComponents.push(file);
        } else {
          uiComponents.push(file);
        }
      }

      if (uiComponents.length > 0) {
        sidebarItems.push({
          text: 'UI Components',
          items: generateSidebarItems(uiComponents, section, null),
        });
      }

      if (layoutComponents.length > 0) {
        sidebarItems.push({
          text: 'Layout',
          items: generateSidebarItems(layoutComponents, section, null),
        });
      }
    } else {
      // Standard processing: check if we have subdirectories
      const hasSubDirs = Object.keys(subDirs).some(key => key !== '_root');

      // If we have both root files AND subdirectories, show them separately
      if (hasSubDirs) {
        // Show root files first if they exist
        if (subDirs['_root'] && subDirs['_root'].length > 0) {
          sidebarItems.push({
            text: folderToTitle(section),
            items: generateSidebarItems(subDirs['_root'], section, null),
          });
        }

        // Then show each subdirectory as a separate group
        for (const [subDir, subFiles] of Object.entries(subDirs)) {
          if (subDir === '_root') continue;

          sidebarItems.push({
            text: folderToTitle(subDir),
            items: generateSidebarItems(subFiles, section, subDir),
          });
        }
      } else {
        // No subdirectories, just show all files under one group
        if (subDirs['_root'] && subDirs['_root'].length > 0) {
          sidebarItems.push({
            text: folderToTitle(section),
            items: generateSidebarItems(subDirs['_root'], section, null),
          });
        }
      }
    }

    sidebar[`/${section}/`] = sidebarItems;
  }

  return sidebar;
}

/**
 * Read current config file
 */
function readConfigFile() {
  return fs.readFileSync(CONFIG_FILE, 'utf-8');
}

/**
 * Update config file with new sidebar
 */
function updateConfigFile(sidebarConfig) {
  let config = readConfigFile();

  // Convert sidebar to string with proper formatting
  let sidebarString = JSON.stringify(sidebarConfig, null, 6);

  // Replace value quotes with single quotes
  sidebarString = sidebarString.replace(/: "([^"]+)"/g, ": '$1'");

  // Replace property name quotes, but keep quotes for paths with special chars
  sidebarString = sidebarString.replace(
    /"([a-zA-Z_$][a-zA-Z0-9_$]*)":/g,
    '$1:'
  );

  // Use a more robust approach: find sidebar: and count braces to find the matching closing brace
  const sidebarStart = config.indexOf('sidebar:');
  if (sidebarStart === -1) {
    console.error('Could not find sidebar section in config file');
    return false;
  }

  // Find the opening brace after "sidebar:"
  const openBraceIndex = config.indexOf('{', sidebarStart);
  if (openBraceIndex === -1) {
    console.error('Could not find opening brace for sidebar');
    return false;
  }

  // Count braces to find the matching closing brace
  let braceCount = 0;
  let closeBraceIndex = -1;
  for (let i = openBraceIndex; i < config.length; i++) {
    if (config[i] === '{') braceCount++;
    if (config[i] === '}') braceCount--;
    if (braceCount === 0) {
      closeBraceIndex = i;
      break;
    }
  }

  if (closeBraceIndex === -1) {
    console.error('Could not find closing brace for sidebar');
    return false;
  }

  // Replace the sidebar section
  const before = config.substring(0, sidebarStart);
  const after = config.substring(closeBraceIndex + 1);

  config = before + 'sidebar: ' + sidebarString + after;

  fs.writeFileSync(CONFIG_FILE, config, 'utf-8');
  return true;
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Scanning docs folder...');

  const sidebarConfig = generateSidebarConfig();

  console.log('📝 Generated sidebar configuration:');
  console.log(JSON.stringify(sidebarConfig, null, 2));

  console.log('\n💾 Updating config file...');

  if (updateConfigFile(sidebarConfig)) {
    console.log('✅ Successfully updated docs/.vitepress/config.mjs');
  } else {
    console.error('❌ Failed to update config file');
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateSidebarConfig, updateConfigFile };
