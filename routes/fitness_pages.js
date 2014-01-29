// var mongoose = require('mongoose');
// var UserModel = mongoose.model('User');

exports.library = function(req, res) {
	var currUser = req.session.currentUser;
	var today = getTodayDateString();
	
	res.render('fitness/library', {
		title	: 'GymLocker - Fitness Library',
		role 	: currUser.role,
		date	: today
	});
};

exports.create_workout = function(req, res) {
	var currUser = req.session.currentUser;
	var today = getTodayDateString();

	res.render('fitness/create', {
		title	: 'GymLocker - Fitness: Create Workout',
		role 	: currUser.role,
		date 	: today
	});
};

function getTodayDateString() {
	var date = new Date();
	var year = date.getFullYear();
	var day = date.getDate();
	var month = date.getMonth() + 1;

	if(month < 10)
		month = '0' + month;
	var today = month + '/' + day + '/' + year;

	return today;
}