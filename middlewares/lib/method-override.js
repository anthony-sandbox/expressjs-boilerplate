 /**
  * Module dependencies
  */
 import methodOverride from 'method-override';

 export default (app) => {
   app.use(methodOverride('_method'));
 };



