import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { config, findAvailablePort } from "./config";

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Log database mode
  if (config.databaseUrl && !config.enableMockData) {
    log('✅ PostgreSQL database configured');
  } else if (config.enableMockData) {
    log('📝 Using mock data mode (configured)');
  } else {
    log('📝 Using mock data mode (no database configured)');
  }

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (config.nodeEnv === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Dynamic port allocation with fallbacks
  let actualPort = config.port;
  try {
    actualPort = await findAvailablePort(config.port);
    if (actualPort !== config.port) {
      log(`⚠️  Port ${config.port} unavailable, using port ${actualPort}`);
    }
  } catch (error) {
    log(`❌ Could not find available port starting from ${config.port}`);
    process.exit(1);
  }

  // Server startup with error handling
  server.listen(actualPort, config.host, () => {
    log(`🚀 Server running on http://${config.host}:${actualPort}`);
    
    // Health check endpoint
    app.get('/health', (_req, res) => {
      res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        port: actualPort,
        host: config.host,
        environment: config.nodeEnv,
        database: config.databaseUrl ? 'postgresql' : 'mock',
      });
    });
    
    // Perform startup health checks
    performStartupHealthChecks(actualPort);
  });

  // Handle server errors
  server.on('error', (error: any) => {
    if (error.code === 'EADDRINUSE') {
      log(`❌ Port ${actualPort} is already in use`);
    } else if (error.code === 'EACCES') {
      log(`❌ Permission denied to bind to port ${actualPort}`);
    } else {
      log(`❌ Server error: ${error.message}`);
    }
    process.exit(1);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    log('🛑 SIGTERM received, shutting down gracefully');
    server.close(() => {
      log('✅ Server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    log('🛑 SIGINT received, shutting down gracefully');
    server.close(() => {
      log('✅ Server closed');
      process.exit(0);
    });
  });
})();

// Startup health checks
async function performStartupHealthChecks(port: number) {
  try {
    // Check if server is responding
    const response = await fetch(`http://${config.host === '0.0.0.0' ? 'localhost' : config.host}:${port}/health`);
    if (response.ok) {
      log('✅ Health check passed - server is responding');
    } else {
      log('⚠️  Health check warning - server responded with non-200 status');
    }
  } catch (error) {
    log('⚠️  Health check failed - server may not be fully ready');
  }

  // Log system information
  log(`📊 System Info: Node ${process.version}, Platform: ${process.platform}`);
  log(`📁 Working Directory: ${process.cwd()}`);
  
  if (config.nodeEnv === 'development') {
    log('🔧 Development mode - Hot reload enabled');
  } else {
    log('🏭 Production mode - Serving static files');
  }
}
