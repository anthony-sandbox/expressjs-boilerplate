/**
 * GET /
 * Home page.
 */
 
 export function index(req, res){
   res.render('home', {
      title: 'Home' 
   });  
 }