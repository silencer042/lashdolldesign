import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Create a static build directory
const staticDir = path.resolve('./cpanel-build');
if (fs.existsSync(staticDir)) {
  fs.rmSync(staticDir, { recursive: true });
}
fs.mkdirSync(staticDir);

console.log('Building client application for cPanel...');
try {
  // Run the Vite build with the .cjs config
  execSync('cd client && npx vite build --config vite.config.build.cjs', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}

// Copy all the image assets
console.log('\nCopying image assets...');
const assetDir = path.resolve('./attached_assets');
if (fs.existsSync(assetDir)) {
  const files = fs.readdirSync(assetDir);
  for (const file of files) {
    const sourcePath = path.join(assetDir, file);
    const targetPath = path.join(staticDir, file);
    
    // Only copy files, not directories
    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied: ${file}`);
    }
  }
}

// Create an .htaccess file for cPanel
console.log('\nCreating .htaccess file...');
const htaccessContent = `# Enable URL rewriting
RewriteEngine On

# If an existing asset or directory is requested, serve it directly
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Otherwise, redirect all requests to index.html
RewriteRule ^ index.html [L]
`;

fs.writeFileSync(path.join(staticDir, '.htaccess'), htaccessContent);

console.log('\n✨ Build for cPanel completed! ✨');
console.log('=============================================');
console.log('All files are in the cpanel-build directory.');
console.log('Upload all these files to your cPanel subdirectory.');
console.log('=============================================');