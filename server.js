 // BASE SETUP
 // ======================================
 
 // CALL THE PACKAGES --------------------
 var express    = require('express'); // call express
 var app        = express(); // define our app using express
 var config     = require('./config');
 var bodyParser = require('body-parser'); // get body-parser
 var morgan     = require('morgan'); // used to see requests
 var mongoose   = require('mongoose'); // for working w/ our database
 var path 		= require('path');
 var http		= require('http').Server(app);
 var io			= require('socket.io')(http); // socket.io for messaging

 // DATABASE CONNECTION -------------------

 mongoose.connect(config.database);

 // APP CONFIGURATION ---------------------
 // use body parser so we can grab information from POST requests
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());
 
 // configure our app to handle CORS requests
 app.use(function(req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
   next();
 });
 
 // log all requests to the console 
 app.use(morgan('dev'));
 
 // ROUTES FOR OUR API
 // =============================

 var apiRoutes = require('./app/routes/api')(app, express);
 
 // REGISTER OUR ROUTES -------------------------------
 // all of our routes will be prefixed with /api
 app.use('/api', apiRoutes);

 // MAIN CATCHALL ROUTE --------------- 
 // SEND USERS TO FRONTEND ------------

 // set the public folder to serve public assets
 app.use('/static', express.static(__dirname + '/public'));

 // has to be registered after API ROUTES
 app.get('*', function(req, res) {
   res.sendFile(path.join(__dirname + '/public/index.html'));
 });

var users = {};

io.on('connection', function(socket){
	var thisuser = "";
 	socket.on('online', function(data){
 		thisuser = data.username;
 		users[thisuser] = String(socket.id);
		io.emit('users', users);
	});
	socket.on('offline', function(){
		delete users[thisuser];
		io.emit('users', users);
	});
	socket.on('disconnect', function(){
		if(users[thisuser] !== undefined){
			delete users[thisuser];
			thisuser = "";
			io.emit('users', users);
		};
	});
});

 // START THE SERVER
 // ===============================
 http.listen(config.port, function(){
 	console.log('Magic happens on port ' + config.port);
 });
 
