// ERRORS, GOTTA CATCH 'EM ALL
var domain = require('domain').create();
domain.on('error', function(err){
    console.log('Application Error: ' + err.message);
});
domain.run(function(){
    require('./src/app')();
});