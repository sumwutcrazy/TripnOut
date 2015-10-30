 process.env.TMPDIR = 'tmp'; // to avoid the EXDEV rename error, see http://stackoverflow.com/q/21071303/76173
 
 // load upload requirements
 var multipart  = require('connect-multiparty');
 var multipartMiddleware = multipart();
 var flow = require('../upload/flow-node.js')('tmp');

 // Configure access control allow origin header stuff
 var ACCESS_CONTROLL_ALLOW_ORIGIN = false;

 // add to exports
 module.exports = function(app, express) {

  // get an instance of the express router
  var apiRouter = express.Router();
  
  apiRouter.route('/image')
  // Handle uploads through Flow.js
  .post(multipartMiddleware, function(req, res) {
    flow.post(req, function(status, filename, original_filename, identifier) {
      //console.log('POST', status, original_filename, identifier);
      if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
        res.header("Access-Control-Allow-Origin", "*");
      }
      res.status(status).send();
    });
  })

  .options(function(req, res){
    console.log('OPTIONS');
    if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
      res.header("Access-Control-Allow-Origin", "*");
    }
    res.status(200).send();
  })

  // Handle status checks on chunks through Flow.js
  .get(function(req, res) {
    flow.get(req, function(status, filename, original_filename, identifier) {
      console.log('GET', status);
      if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
        res.header("Access-Control-Allow-Origin", "*");
      }

      if (status == 'found') {
        status = 200;
      } else {
        status = 204;
      }

      res.status(status).send();
    });
  });

  app.get('/download/:identifier', function(req, res) {
    flow.write(req.params.identifier, res);
  });

  return apiRouter;

 };