 /**
  * Module dependencies
  */

 import expressStatusMonitor from './lib/express-status-monitor';
 import logger               from './lib/logger';
 import compression          from './lib/compression';
 import cors                 from './lib/cors';
 import sass                 from './lib/sass';
 import session              from './lib/session';
 import bodyParser           from './lib/body-parser';
 import flash                from './lib/flash';
 import mongoose             from './lib/mongoose';
 import lusca                from './lib/lusca';


 export default (app) => {
   expressStatusMonitor(app);
   mongoose();
   logger(app);
   compression(app);
   cors(app);
   sass(app);
   session(app);
   lusca(app);
   bodyParser(app);
   flash(app);
 };
