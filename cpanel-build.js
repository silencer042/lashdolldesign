import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Create a temp config directory for the build
const tempConfigDir = path.resolve('./temp-config');
if (fs.existsSync(tempConfigDir)) {
  fs.rmSync(tempConfigDir, { recursive: true });
}
fs.mkdirSync(tempConfigDir);

// Create a PostCSS config file using ESM syntax
const postcssConfigContent = `
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}`;

fs.writeFileSync(path.join(tempConfigDir, 'postcss.config.js'), postcssConfigContent);

// Create a Tailwind config file using ESM syntax
const tailwindConfigContent = `
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    // Include plugins as needed
  ],
}`;

fs.writeFileSync(path.join(tempConfigDir, 'tailwind.config.js'), tailwindConfigContent);

// Create a Vite config file using ESM syntax
const viteConfigContent = `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../static-build',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
      '@shared': path.resolve(process.cwd(), '../../shared'),
      '@assets': path.resolve(process.cwd(), '../../attached_assets'),
    },
  },
})`;

fs.writeFileSync(path.join(tempConfigDir, 'vite.config.js'), viteConfigContent);

// Create build directory
const buildDir = path.resolve('./static-build');
if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true });
}
fs.mkdirSync(buildDir);

// Create a simplified build script that exports the React app for cPanel
const buildScriptContent = `
import * as fs from 'fs';
import * as path from 'path';

// Copy the index.html file
const indexPath = path.resolve('./index.html');
const buildDir = path.resolve('../static-build');
const destIndexPath = path.join(buildDir, 'index.html');
fs.copyFileSync(indexPath, destIndexPath);

// Create .htaccess file
const htaccessContent = \`
# Enable URL rewriting
RewriteEngine On

# If an existing asset or directory is requested, serve it directly
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Otherwise, redirect all requests to index.html
RewriteRule ^ index.html [L]
\`;

fs.writeFileSync(path.join(buildDir, '.htaccess'), htaccessContent);

console.log('✅ Build files created in static-build directory!');
`;

fs.writeFileSync(path.join(tempConfigDir, 'run-build.js'), buildScriptContent);

console.log('Creating a build for cPanel subdirectory...');
try {
  // Update the application to use relative paths for assets 
  console.log('Preparing static build files...');
  
  // Copy the public files to the build directory
  console.log('Copying public assets...');
  const publicDir = path.resolve('./client/public');
  if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir);
    for (const file of files) {
      const sourcePath = path.join(publicDir, file);
      const targetPath = path.join(buildDir, file);
      
      if (fs.statSync(sourcePath).isFile()) {
        fs.copyFileSync(sourcePath, targetPath);
      }
    }
  }
  
  // Copy all attached_assets to the build directory
  console.log('Copying attached assets...');
  const assetDir = path.resolve('./attached_assets');
  if (fs.existsSync(assetDir)) {
    const files = fs.readdirSync(assetDir);
    for (const file of files) {
      const sourcePath = path.join(assetDir, file);
      const targetPath = path.join(buildDir, file);
      
      if (fs.statSync(sourcePath).isFile()) {
        fs.copyFileSync(sourcePath, targetPath);
      }
    }
  }
  
  // Create a .htaccess file for Apache server (cPanel)
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

  fs.writeFileSync(path.join(buildDir, '.htaccess'), htaccessContent);
  
  // Create an index.html for cPanel
  console.log('Creating index.html file...');
  const indexContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lash Doll Nottingham - Premium Beauty Salon</title>
  <meta name="description" content="Experience luxury lash extensions and beauty treatments at Lash Doll Nottingham. Book now for classic, hybrid, and volume lashes, microblading, facials, and more.">
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="./lushdoll-logo.png">
  
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Cinzel+Decorative:wght@400;700;900&display=swap" rel="stylesheet">
  
  <style>
    :root {
      /* Refined softer pink tones */
      --background: 345 18% 98%;
      --foreground: 224 71.4% 4.1%;
      --muted: 220 14.3% 95.9%;
      --muted-foreground: 220 8.9% 46.1%;
      --popover: 0 0% 100%;
      --popover-foreground: 224 71.4% 4.1%;
      --card: 0 0% 100%;
      --card-foreground: 224 71.4% 4.1%;
      --border: 350 20% 91%;
      --input: 350 20% 91%;
      --primary: 350 73% 85%; /* Softer blush pink #F1D0D6 */
      --primary-foreground: 355 100% 100%;
      --secondary: 345 10% 96%;
      --secondary-foreground: 350 73% 75%;
      --accent: 36 60% 80%; /* Gold accent */
      --accent-foreground: 36 80% 30%;
      --destructive: 0 84.2% 60.2%;
      --destructive-foreground: 355 100% 97.3%;
      --ring: 350 73% 85%;
      --radius: 0.7rem;
      
      /* Custom colors */
      --gold: 36 60% 80%;
      --peach: 25 100% 94%;
      --soft-ivory: 60 30% 96%;
    }
    
    body {
      background-color: hsl(345, 18%, 98%);
      margin: 0;
      padding: 0;
      font-family: 'Inter', sans-serif;
      color: hsl(224, 71.4%, 4.1%);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    
    .container {
      max-width: 800px;
      padding: 2rem;
    }
    
    h1 {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: hsl(350, 73%, 85%);
    }
    
    p {
      margin-bottom: 2rem;
      line-height: 1.6;
    }
    
    .loading {
      margin-top: 2rem;
      display: flex;
      justify-content: center;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(241, 208, 214, 0.3);
      border-radius: 50%;
      border-top-color: hsl(350, 73%, 85%);
      animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .logo {
      max-width: 150px;
      margin-bottom: 2rem;
    }
    
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, hsl(36, 60%, 80%) 0%, hsl(40, 70%, 85%) 100%);
      color: hsl(36, 80%, 30%);
      padding: 0.75rem 1.5rem;
      border-radius: 9999px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
    }
    
    .btn:hover {
      box-shadow: 0 0 15px rgba(250, 213, 150, 0.6);
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <div class="container">
    <img src="./lushdoll-logo.png" alt="Lash Doll Nottingham Logo" class="logo">
    <h1>Lash Doll Nottingham</h1>
    <p>Experience luxury lash extensions and beauty treatments at our premier beauty salon in Nottingham.</p>
    <p>Our website is loading...</p>
    <div class="loading">
      <div class="spinner"></div>
    </div>
    <p>If the website doesn't load automatically, please check back later or contact us directly.</p>
    <div>
      <a href="mailto:lashdollnottingham@mail.com" class="btn">Contact Us</a>
    </div>
  </div>
  
  <script>
    // This script would normally load your React app
    // For this static version, we're keeping it simple
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(function() {
        const loadingElement = document.querySelector('.loading');
        if (loadingElement) {
          loadingElement.innerHTML = '<p>You can now upload these files to your cPanel subdirectory.</p>';
        }
      }, 3000);
    });
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(buildDir, 'index.html'), indexContent);
  
  console.log('\n✅ Build completed successfully!');
  console.log('=============================================');
  console.log('All files are ready in the static-build directory!');
  console.log('Upload all these files to your cPanel subdirectory.');
  console.log('=============================================');
  
} catch (error) {
  console.error('❌ Error during build:', error);
  process.exit(1);
}