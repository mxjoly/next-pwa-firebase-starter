import express from 'express';
import compression from 'compression';

// Node.js modules
import { join } from 'path';
import { parse } from 'url';

// Own modules
import debug from './utils/debug';

/**
 * Create the Express server to render the Next application
 */
const createServer = app => {
  const server = express();
  const handle = app.getRequestHandler();

  // Middlewares
  server.use(compression());

  // Serve static files
  server.use(express.static('public'));
  server.use(express.static('.next'));

  // Use debug middlewares only in dev mode
  if (process.env.NODE_ENV !== 'production') {
    server.use((req, res, next) => {
      debug.http(req.method, req.hostname, req.url);
      next();
    });
  }

  server.get('/sw.js', (req, res) => {
    return app.serveStatic(req, res, join(__dirname, '.next', 'sw.js'));
  });

  server.get('/workbox-*.js', (req, res) => {
    const { pathname } = parse(req.path, true);
    return app.serveStatic(req, res, join(__dirname, '.next', pathname));
  });

  server.get('/manifest.json', (req, res) => {
    return app.serveStatic(req, res, join(__dirname, 'public', 'manifest.json'));
  });

  // Static resources should not be redirected by i18n middleware to same network trip
  // highly recommend add any extension of static resources here, though it would still
  // work if you don't
  server.all(/\.(js|json|png|jpg|ico)$/i, (req, res) => {
    return handle(req, res);
  });

  // Any other routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  return server;
};

export default app => createServer(app);
