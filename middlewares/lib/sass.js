 /**
  * Module dependencies
  */
 import path from 'path';
 import sass from 'node-sass-middleware';

 export default (app) => {
   app.use(sass({
     src: path.join(__dirname, 'public'),
     dest: path.join(__dirname, 'public')
 }));
 };
