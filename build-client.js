import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Create static-build directory if it doesn't exist
const staticDir = path.resolve('./static-build');
if (fs.existsSync(staticDir)) {
  fs.rmSync(staticDir, { recursive: true });
}
fs.mkdirSync(staticDir);

// Run the client-only build
console.log('Building client application for cPanel...');
try {
  execSync('cd client && npx vite build --config vite.config.cjs', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

// Copy all public assets
console.log('Copying public assets...');
const publicDir = path.resolve('./client/public');
if (fs.existsSync(publicDir)) {
  const files = fs.readdirSync(publicDir);
  for (const file of files) {
    if (file === '.gitkeep') continue;
    
    const sourcePath = path.join(publicDir, file);
    const targetPath = path.join(staticDir, file);
    
    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied public asset: ${file}`);
    }
  }
}

// Copy all attached assets
console.log('Copying attached assets...');
const assetDir = path.resolve('./attached_assets');
if (fs.existsSync(assetDir)) {
  const files = fs.readdirSync(assetDir);
  for (const file of files) {
    const sourcePath = path.join(assetDir, file);
    const targetPath = path.join(staticDir, file);
    
    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied attached asset: ${file}`);
    }
  }
}

// Create an .htaccess file for Apache (cPanel)
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

console.log('\n========================');
console.log('Build completed successfully!');
console.log('Upload the contents of the static-build directory to your cPanel subdirectory.');
console.log('========================');