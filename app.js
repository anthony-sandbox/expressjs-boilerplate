 /**
   * Module dependencies
   */
 
 const path                 = require('path');
 const express              = require('express');
 const http                 = require('http');
 const dotenv               = require('dotenv');
 const chalk                = require('chalk');
 const compression          = require('compression');
 const bodyParser           = require('body-parser');
 const cors                 = require('cors');
 const logger               = require('morgan');
 const expressStatusMonitor = require('express-status-monitor');
 const sass                 = require('node-sass-middleware');
 const mongoose             = require('mongoose');
 const session              = require('express-session');
 const MongoStore           = require('connect-mongo')(session);
 const flash                = require('flash');
 const lusca                = require('lusca');
 const localtunnel          = require('localtunnel');
 
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
 const homeController       = require('./controllers/home');
 
 homeRoute.route("/").get(homeController.index);
 
 app.use("/", homeRoute);
 
 
 /**
  * Start Express Server
  */
  
 const server = http.createServer(app);
 server.listen(app.get('port'), app.get('host'), ()=>{
    
    const serverAddr = server.address().address;
    const serverPort = server.address().port;
    
    const tunnel = localtunnel(serverPort, {"subdomain":app.get('appName')}, function(err, tunnel){
        if(err){
            console.log('%s Localtunnel returned an error %s', chalk.red('x'), err);
        } else {
        
            console.log('%s Local App is running at %s:%d in %s mode', chalk.green('✓'), serverAddr, serverPort, app.get('env'));
            console.log('%s External URL %s', chalk.green('✓'), tunnel.url);
            console.log('Press CTRL-C to stop\n');   
        }
    });
    
    tunnel.on('close', function(){
       console.log('%s External URL has been closed', chalk.green('✓')) ;
    });
    
     
 });
 
 /**
  * Export app
  */
  
  module.exports = app;