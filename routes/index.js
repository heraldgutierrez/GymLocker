var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

// GET home page
exports.home = function(req, res) {
	if(!req.session.currentUser) {
		res.render('index');
	} else {
		res.redirect('/main');
	}
};

exports.isLoggedIn = function(req, res, next) {
	if(!req.session.currentUser) {
        res.redirect('/');
	} else {
		next();
	}
}

exports.login = function(req, res) {
	var name = req.body.loginUsername;
	var pass = req.body.loginPassword;

	console.log('Attempting to login: ' + name);

	UserModel.findOne(
		{ 	username : name,
			password : pass
		},
		function(err, result) {
			// if(result == null) --> no users exists, okay to save new user
			if(result == null) {
				// incorrect username/password
				console.log('Incorrect login');
				res.redirect('/?warning=incorrectLogin');
			} else {
				// reload home page with warning that username already exists
				console.log('Logging in: ' + name);
				req.session.currentUser = result;
				res.redirect('/main');
			}
		}// end: function
	);// end: findOne
};

exports.logout = function(req, res) {
	req.session.destroy();
	res.redirect('/');
};

exports.main = function(req, res) {
	var currUser = req.session.currentUser;

	res.render('main_index', { 
		title	: 'GymLocker',
		role 	: currUser.role,
		user_id : currUser._id
	});
};

exports.signup = function(req, res) {
	var name = req.body.signupUsername;
	var pass = req.body.signupPassword;
	var verifyPass = req.body.signupVerifyPassword;

	console.log('Attempting to signup ' + name + ' into GymLocker');

	if(pass == verifyPass) {
		var newUser = new UserModel({
			username : name,
			password : pass
		});

		// need to check if the username already exists
		UserModel.findOne(
			{ username : name },
			function(err, result_1) {
				// if(result == null) --> no users exists, okay to save new user
				if(result_1 == null) {
					// save new user
					newUser.save(function(err, result_2) {
						req.session.currentUser = newUser;

						console.log(name + ' has been added.');
						res.redirect('/main');
					});
				} else {
					// reload home page with warning that username already exists
					console.log(name + ' already exists.');
					res.redirect('/?warning=usernameExists');
				}
			}// end: function
		);// end: findOne
	} else {
		console.log('Password doesn\'t match verify password');
		res.redirect('/?warning=verifyPassword');
	}
}; // end: signup

exports.demo = function(req, res) {
	var date = new Date();
	var name = 'demo_' + date.getTime();
	var demo = new UserModel({
		username : name,
		password : name,
		role 	 : 4
	});

	demo.save(function(err, result) {
		req.session.currentUser = demo;

		console.log(name + ' has been added.');
		res.redirect('/main');
	});
};