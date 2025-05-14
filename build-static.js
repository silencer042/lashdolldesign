import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Create a static build directory
const staticDir = path.resolve('./static-build');
if (fs.existsSync(staticDir)) {
  fs.rmSync(staticDir, { recursive: true });
}
fs.mkdirSync(staticDir);

// Run the Vite build for the client
console.log('Building client application...');
execSync('cd client && npx vite build --outDir ../static-build --base="./"', { stdio: 'inherit' });

// Copy all the images from attached_assets to the build
console.log('Copying assets...');
const assetDir = path.resolve('./attached_assets');
const targetDir = path.resolve('./static-build');

if (fs.existsSync(assetDir)) {
  const files = fs.readdirSync(assetDir);
  for (const file of files) {
    const sourcePath = path.join(assetDir, file);
    const targetPath = path.join(targetDir, file);
    
    // Only copy files, not directories
    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied: ${file}`);
    }
  }
}

// Create an .htaccess file for Apache server (cPanel)
console.log('Creating .htaccess file...');
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

console.log('Static build created successfully in the static-build directory!');
console.log('Upload everything in the static-build directory to your cPanel subdirectory.');