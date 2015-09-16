	var express    = require('express');        // call express
	var app        = express();                 // define our app using express
	var bodyParser = require('body-parser');

	//DATABASE.!
	var mongoose   = require('mongoose');
	mongoose.connect('mongodb://localhost:27017/mqtt');

	var ChatUser  = require('./models/user');	

	//to get the data from the POST
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	var port = process.env.PORT || 8080;  
	//ROUTES FOR THE API----------------------
	var router = express.Router();  

	router.use(function(req, res, next) {
	    // do logging
	    console.log('Something is happening.');
	    next(); // make sure we go to the next routes and don't stop here
	});

	router.get('/', function(req, res) {
	    res.json({ message: 'hooray! welcome to our api!' });   
	});
	// REGISTER OUR ROUTES -------------------------------
	// all of our routes will be prefixed with /api
	router.route('/user')

	    .post(function(req, res) {
		        
		    	var typeOfOperation = req.body.type;
		    	switch(typeOfOperation){

		    		case 'getFriendsData':
			    		console.log('Get Friends Data');	
			    		 ChatUser.find({name : 'Jupneet'},function(err, users) {
			            if (err)
			                res.send(err);
			            res.json(users);   
			 			   });
		    		break;

		    		case 'addNewUser':
				        var chatUser = new ChatUser();   
				        chatUser.name = req.body.name;
				        chatUser.contact_number = req.body.contact_number;
				        chatUser.image_url = req.body.image_url;
				        chatUser.save(function(err) {
				            if (err)
				                res.send(err);
				            res.json({ message: 'Chat user created : ' + chatUser.name});
				        });
		    		break;	
		    		default:
			    		break;
		    	}
		          })
	router.route('/user/:user_id')
	    .get(function(req, res) {
	        ChatUser.findById(req.params.user_id, function(err, user) {
	            if (err)
	                res.send(err);
	            res.json(user);
	        });
	    });

	app.use('/api', router);
	app.listen(port);
	console.log('Listening on port ' + port);

