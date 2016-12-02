
 /**
  * Moduel dependencies
  */
  
  import http           from 'http';
  import localtunnel    from 'localtunnel';
  import chalk          from 'chalk';
  import app            from './app';

 /**
   * Start Express Server
   */
  
 const server = http.createServer(app);
 server.listen(app.get('port'), app.get('host'), ()=>{
    
    const serverAddr = server.address().address;
    const serverPort = server.address().port;
    
    const tunnel = localtunnel(serverPort, {"subdomain":app.get('appName')}, (err, tunnel)=>{
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