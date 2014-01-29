var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var ObjectId = mongoose.Types.ObjectId;
// var id = new ObjectId('id string');

// get
exports.get_settings = function(req, res) {
	var curr = req.session.currentUser;
	var id = new ObjectId(curr._id);
	
	UserModel.findOne({ _id : id }, function(err, result) {
		res.json(result);
	});
};

// post
exports.save_preference = function(req, res) {
	var curr = req.session.currentUser;
	var id = new ObjectId(curr._id);
	var type = req.body.type;
	var show = req.body.show;

	console.log(type + ' - ' + show);

	UserModel.findOne({ _id : id }, function(err, result) {
		if(type == 'create_help')
			result.create_help = show;
		else if(type == 'diagram')
			result.diagram = show;
		else if(type == 'exercise_help')
			result.exercise_help = show;
		else if(type == 'view_routines_help')
			result.view_routines_help = show;
		else if(type == 'view_workout_help')
			result.view_workout_help = show;

		result.save();
	});
};