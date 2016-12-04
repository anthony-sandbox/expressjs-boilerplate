 /**
   * Module dependencies
   */
 
 import path                 from 'path';
 import express              from 'express';
 import dotenv               from 'dotenv';
 
 import middlewares          from './middlewares';
 import routes               from './routes/index';
 
 /**
  * Load environment variables from .env file
  */
  
  dotenv.load({path: '.env'});

 /**
   * Create Express Server
   */
   
 const app = express();
 
 /**
  * Express configuration.
  */
 app.set('appName', process.env.APPNAME);
 app.set('host', process.env.HOST);
 app.set('port', process.env.PORT || 8080);
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', process.env.VIEW_ENGINE);
 
 /**
  * Static assets
  */
  
 app.use('/public',express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}));
 
 
 /**
  * Middlewares
  */
 
 middlewares(app);
 
 
 /**
  * Routes
  */
  
  
 
 routes(app);
 
 /**
  * Export app
  */
  
  export default app;