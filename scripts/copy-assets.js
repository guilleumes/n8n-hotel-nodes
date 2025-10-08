#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Copy SVG icons from nodes to dist
 */
async function copyAssets() {
  const nodesDir = path.join(__dirname, '..', 'nodes');
  const distDir = path.join(__dirname, '..', 'dist', 'nodes');

  console.log('📋 Copying asset files...');

  // List of node directories to process
  const nodeDirs = ['Beds24', 'Cuentica', 'ParteViajeros'];

  for (const nodeDir of nodeDirs) {
    const sourcePath = path.join(nodesDir, nodeDir);
    const targetPath = path.join(distDir, nodeDir);

    // Check if source directory exists
    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️  Skipping ${nodeDir} - directory not found`);
      continue;
    }

    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }

    // Copy SVG files
    const files = fs.readdirSync(sourcePath);
    const svgFiles = files.filter(file => file.endsWith('.svg'));

    for (const file of svgFiles) {
      const sourceFile = path.join(sourcePath, file);
      const targetFile = path.join(targetPath, file);
      
      fs.copyFileSync(sourceFile, targetFile);
      console.log(`✅ Copied ${nodeDir}/${file}`);
    }
  }

  // Also copy icons from credentials folder
  const credentialsSource = path.join(__dirname, '..', 'credentials', 'icons');
  const credentialsTarget = path.join(__dirname, '..', 'dist', 'credentials', 'icons');

  if (fs.existsSync(credentialsSource)) {
    if (!fs.existsSync(credentialsTarget)) {
      fs.mkdirSync(credentialsTarget, { recursive: true });
    }

    const credFiles = fs.readdirSync(credentialsSource);
    const credSvgFiles = credFiles.filter(file => file.endsWith('.svg'));

    for (const file of credSvgFiles) {
      const sourceFile = path.join(credentialsSource, file);
      const targetFile = path.join(credentialsTarget, file);
      
      fs.copyFileSync(sourceFile, targetFile);
      console.log(`✅ Copied credentials/icons/${file}`);
    }
  }

  console.log('✨ Assets copy completed!');
}

// Run the script
copyAssets().catch(err => {
  console.error('❌ Error copying assets:', err);
  process.exit(1);
});
