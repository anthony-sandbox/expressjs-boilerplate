 /**
  * Module dependencies
  */
 import session      from 'express-session';
 import connectMongo from 'connect-mongo';

 export default (app) => {
 
  const MongoStore = connectMongo(session);
 
  app.use(session({
     name: process.env.APPNAME,
     resave: true,
     saveUninitialized: true,
     secret: process.env.SESSION_SECRET,
     store: new MongoStore({
         url: process.env.MONGODB_URI || process.env.MONGODB_URI,
         autoReconnect: true
  })
  
 }));
 };
