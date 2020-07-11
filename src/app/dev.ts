import next from 'next';
import debug from './utils/debug';
import createServer from './server';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './src/app' });

try {
  app.prepare().then(async () => {
    const server = await createServer(app);
    server.listen(port, () => {
      debug.success(`> Ready on http://localhost:${port}`);
    });
  });
} catch (err) {
  console.error(err);
  process.exit(1);
}
