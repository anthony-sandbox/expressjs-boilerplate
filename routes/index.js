 /**
  * Module dependencies
  */
import homeRoute from './home';

export default (app)=>{
    
app.use("/", homeRoute);    
    
};
