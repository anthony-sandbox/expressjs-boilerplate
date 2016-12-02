 /**
   * Module dependencies
   */
 
 import path                 from 'path';
 import express              from 'express';
 import dotenv               from 'dotenv';
 import chalk                from 'chalk';
 import compression          from 'compression';
 import bodyParser           from 'body-parser';
 import cors                 from 'cors';
 import logger               from 'morgan';
 import expressStatusMonitor from 'express-status-monitor';
 import sass                 from 'node-sass-middleware';
 import mongoose             from 'mongoose';
 import session              from 'express-session';
 import connectMongo         from 'connect-mongo';
 import flash                from 'flash';
 import lusca                from 'lusca';
 import * as homeController  from './controllers/home';
 
 
 /**
  * Load environment variables from .env file
  */
  
  dotenv.load({path: '.env'});

 /**
   * Create Express Server
   */
   
 const app                  = express();
 
 /**
  * Connect to MongoDB
  */
 mongoose.promise = global.promise;
 mongoose.connect(process.env.MONGODB_URI || process.evn.MONGOLAB_URI);
 mongoose.connection.on('error', ()=>{
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('X'));
    process.exit();
 });
 
 /**
  * Express configuration.
  */
 app.set('appName', process.env.APPNAME);
 app.set('host', process.env.HOST);
 app.set('port', process.env.PORT || 8080);
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', process.env.VIEW_ENGINE);
 app.use(require('express-status-monitor')());
 app.use(compression());
 app.use(cors());
 app.use(sass({
     src: path.join(__dirname, 'public'),
     dest: path.join(__dirname, 'public')
 }));
 app.use(logger('dev'));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: true}));
 
 const MongoStore = connectMongo(session);
 
 app.use(session({
     resave: true,
     saveUninitialized: true,
     secret: process.env.SESSION_SECRET,
     store: new MongoStore({
         url: process.env.MONGODB_URI || process.env.MONGODB_URI,
         autoReconnect: true
     })
 }));
 app.use(flash());
 app.use(lusca({
    csrf: true,
    csp: { 
        policy: {
            'default-src': '\'self\'',
            'img-src': '\'self\' data:'
            
        }
    },
    xframe: 'SAMEORIGIN',
    p3p: 'ABCDEF',
    hsts: {maxAge: 31536000, includeSubDomains: true, preload: true},
    xssProtection: true,
    nosniff: true
 }));
 
 
 /**
  * Static assets
  */
  
 app.use('/public',express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}));
 
 /**
  * Primary app routes
  */
 
 const homeRoute            = express.Router();
 
 
 homeRoute.route("/").get(homeController.index);
 
 app.use("/", homeRoute);
 
 /**
  * Export app
  */
  
  export default app;