 /**
  * Module dependencies
  */
 import lusca from 'lusca';

  export default (app) => {
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
 };
