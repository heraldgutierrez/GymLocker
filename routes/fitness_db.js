var mongoose = require('mongoose');
var BioTypeModel = mongoose.model('BiometricType');
var EquipTypeModel = mongoose.model('EquipmentType');
var ExerciseModel = mongoose.model('Exercises');
var ExTypeModel = mongoose.model('ExerciseType');
var MuscleModel = mongoose.model('MuscleGroup');
var UserModel = mongoose.model('User');
var WorkoutModel = mongoose.model('Workout');

// var ProQueModel = mongoose.model('ProQueue');
var ObjectId = mongoose.Types.ObjectId;
// var id = new ObjectId('id string');

var async = require('async');

exports.get_exercises_by_muscle = function(req, res) {
	var muscle = req.query.muscle;

	ExerciseModel.find({ muscle : muscle }).sort({ name : 1 }).exec(
		function(err, result) {
			res.json(result);
		}
	);
};

exports.get_previous_workouts = function(req, res) {
	var curr = req.session.currentUser;
	var today = getTodayDateString();

	WorkoutModel.distinct('workout_id', { user_id : curr._id, date : { $lt : today } }).exec(
		function(err, result) {
			res.json(result.length);
		}
	);
};

exports.get_planned_workouts = function(req, res) {
	var curr = req.session.currentUser;
	var today = getTodayDateString();

	WorkoutModel.distinct('workout_id', { user_id : curr._id, date : { $gte : today }}).exec(
		function(err, result) {
			res.json(result.length);
		}
	);
};

exports.check_existing_workouts = function(req, res) {
	var curr = req.session.currentUser;
	var date = req.query.date;
		
	if(!date) {
		date = getTodayDateString();
	}

	WorkoutModel.find({ user_id : curr._id, date : { $gte : date } }).exec(
		function(err, result) {
			res.json(result);
		}
	);
};

exports.get_ex_search_results = function(req, res) {
	var query = req.query.query;

	ExerciseModel.find({ $or: [
			{ name : { $regex : query, $options : 'i' } },
			{ exercise_type : { $regex : query, $options : 'i'} },
			{ muscle : { $regex : query, $options : 'i' } },
			{ equip : { $regex : query, $options : 'i' } }
		]}).sort({ name : 1 }).exec(function(err, result) {
			res.json(result);
		}
	);
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

exports.save_workout = function(req, res) {
	var body = req.body;
	var date = body.date;
	var exs = body.exs;

	console.log(exs.length);
	// console.log(JSON.parse(body));
	var e = ['test'];

	async.series([
		function(callback) {
			for(var i = 0; i < exs.length; i++) {
				console.log(exs[i].id);
				// getExerciseByID(exs[i].id);
				// console.log('1. ' + e);

				ExerciseModel.findOne({ _id : exs[i].id }).exec(function(err, result) {
					e.push(result);
					// console.log(e.length)
					// console.log(result);
					callback(null, e);
				});

				// console.log('2. ' + e);
			}

			// console.log('3. ' + e);
		}
	],
	function(err, result) {
		console.log('e: ' + e);
		console.log('result: ' + result);
	});
};

function getExerciseByID(id) {
	var id = new ObjectId(id);
	var curr = req.session.currentUser;

	async.series([
		function(callback) {
			// delete old workout on date
			WorkoutModel.find({ date : date }).remove();
			callback(null, true);
		},
		function(callback) {
			// create a new workout

			var wo = new WorkoutModel({ 
				user_id 	: curr._id,
				date 		: date,
				exercises 	: []
			});

			wo.save(function(err, result) {});
			// ExerciseModel.findOne({ _id : id }).exec(function(err, result) {
			// 	callback(null, result);
			// });
			callback(null, '');
		},
		function(callback) {
			// push all exercises to workout
			var exs = new Array();

			for(var i = 0; i < exs.length; i++) {

			}


			// callback(null, 'two');
		}
	], 
	function(err, results) {
		console.log(results);
	});
}