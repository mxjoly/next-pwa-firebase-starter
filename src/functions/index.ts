import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import next from 'next';
import path from 'path';

// Will be generated in production
// @ts-ignore
import createServer from './server';

// ------------------------------------------------------------------ //

admin.initializeApp();

// =================================================================== //
//                           EXPRESS SERVER                            //
// =================================================================== //

// Create the Next application and the Express server
const dev = process.env.NODE_ENV !== 'production';
const distDir = path.relative(process.cwd(), __dirname + '/.next');
const app = next({ dev, conf: { distDir } });
const server = createServer(app);

export const nextApp = functions.https.onRequest(server);