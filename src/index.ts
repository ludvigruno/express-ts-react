import logger from 'jet-logger';
import server from './server';
import { mongoConnect } from './db';

mongoConnect.connectToMongo();
// Constants
const serverStartMsg = 'Express server started on port: ',
  port = process.env.PORT || 3001;

// Start server
server.listen(port, () => {
  logger.info(serverStartMsg + port);
});
