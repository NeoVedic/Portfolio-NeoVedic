import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // Try multiple possible build directories
  const possiblePaths = [
    path.resolve(import.meta.dirname, "..", "dist", "public"),
    path.resolve(import.meta.dirname, "..", "dist"),
    path.resolve(import.meta.dirname, "public"),
    path.resolve(process.cwd(), "dist", "public"),
    path.resolve(process.cwd(), "dist"),
    path.resolve(process.cwd(), "public")
  ];

  let distPath: string | null = null;
  
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      // Check if this directory contains index.html
      const indexPath = path.resolve(possiblePath, "index.html");
      if (fs.existsSync(indexPath)) {
        distPath = possiblePath;
        log(`📁 Found build directory: ${distPath}`);
        break;
      } else {
        log(`📁 Directory exists but no index.html: ${possiblePath}`);
      }
    }
  }

  if (!distPath) {
    log(`⚠️  Build directory not found. Tried: ${possiblePaths.join(', ')}`);
    log(`⚠️  Make sure to run 'npm run build' first`);
    
    // Serve a basic error page instead of crashing
    app.use("*", (_req, res) => {
      res.status(503).send(`
        <html>
          <head><title>Build Required</title></head>
          <body>
            <h1>Build Required</h1>
            <p>The application needs to be built first.</p>
            <p>Run <code>npm run build</code> and restart the server.</p>
            <p>Tried paths: ${possiblePaths.join(', ')}</p>
          </body>
        </html>
      `);
    });
    return;
  }

  // Serve static files with proper headers
  app.use(express.static(distPath, {
    maxAge: '1d', // Cache static assets for 1 day
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      // Set proper MIME types for common files
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      } else if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      } else if (filePath.endsWith('.html')) {
        res.setHeader('Content-Type', 'text/html');
      }
    }
  }));

  // Health check for static files
  const indexPath = path.resolve(distPath, "index.html");
  if (!fs.existsSync(indexPath)) {
    log(`⚠️  index.html not found at ${indexPath}`);
  }

  // Fall through to index.html for SPA routing
  app.use("*", (_req, res) => {
    try {
      res.sendFile(indexPath);
    } catch (error) {
      log(`❌ Error serving index.html: ${error}`);
      res.status(500).send('Internal Server Error');
    }
  });
}
