import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const startServerWithDB = async () => {
  await initMongoConnection();
  setupServer();
};

startServerWithDB();
