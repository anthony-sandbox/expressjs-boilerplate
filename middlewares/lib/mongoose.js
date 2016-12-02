 /**
  * Module dependencies
  */
 import chalk    from 'chalk';
 import mongoose from 'mongoose';

 export default () => {
    mongoose.promise = global.promise;
    mongoose.connect(process.env.MONGODB_URI || process.evn.MONGOLAB_URI);
    mongoose.connection.on('error', ()=>{
        console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('X'));
        process.exit();
    });
 };
