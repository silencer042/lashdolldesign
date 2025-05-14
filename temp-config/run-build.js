
import * as fs from 'fs';
import * as path from 'path';

// Copy the index.html file
const indexPath = path.resolve('./index.html');
const buildDir = path.resolve('../static-build');
const destIndexPath = path.join(buildDir, 'index.html');
fs.copyFileSync(indexPath, destIndexPath);

// Create .htaccess file
const htaccessContent = `
# Enable URL rewriting
RewriteEngine On

# If an existing asset or directory is requested, serve it directly
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Otherwise, redirect all requests to index.html
RewriteRule ^ index.html [L]
`;

fs.writeFileSync(path.join(buildDir, '.htaccess'), htaccessContent);

console.log('✅ Build files created in static-build directory!');
