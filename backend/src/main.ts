import { config } from 'dotenv';
import logger from 'jet-logger';
import server from './server';

config();

const version = process.env.npm_package_version || 'N/A';

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || 'localhost';
const serverStartMsg = `Express server started on url: http://${host}:${port}`;

server.listen(port, host, () => {
  logger.info('Code version: ' + version);
  logger.info(serverStartMsg);
});
