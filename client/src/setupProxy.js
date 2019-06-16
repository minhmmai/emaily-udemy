//Use proxy so that in prod, relative paths will automatically resolve into prod paths
const proxy = require('http-proxy-middleware')
     
module.exports = function(app) {
    app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
}