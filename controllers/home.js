/**
 * Home page.
 */
 
 export function home(req, res){
   res.render('home', {
      title: 'Home' 
   });  
 }