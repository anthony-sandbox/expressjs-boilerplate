 /**
  * Module dependencies
  */
  
 import expressStatusMonitor from 'express-status-monitor';

 export default (app) => {
   app.use(expressStatusMonitor());
 };
