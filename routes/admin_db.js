var mongoose = require('mongoose');
var BioTypeModel = mongoose.model('BiometricType');
var EquipTypeModel = mongoose.model('EquipmentType');
var ExerciseModel = mongoose.model('Exercises');
var ExTypeModel = mongoose.model('ExerciseType');
var MuscleModel = mongoose.model('MuscleGroup');
var UserModel = mongoose.model('User');

// var ProQueModel = mongoose.model('ProQueue');
// var ObjectId = mongoose.Types.ObjectId;
// var id = new ObjectId('id string');

exports.get_all_members = function(req, res) {
	UserModel.find({}).sort({ username : 1 }).exec(
		function(err, result) {
			console.log(JSON.stringify(result));
			res.json(result);
		}
	);
};

exports.get_all_equip = function(req, res) {
	EquipTypeModel.find({}).sort({ name : 1 }).exec(
		function(err, result) {
			res.json(result);
		}
	);
};

exports.add_equip = function(req, res) {
	var equip = new EquipTypeModel({
		name : req.query.equipment
	});

	console.log(equip);

	equip.save(function(err, result) {
		res.json({"success" : true});
	});
};

exports.get_exercise_types = function(req, res) {
	ExTypeModel.find({}).sort({ name : 1 }).exec(
		function(err, result) {
			res.json(result);
		}
	);
};

exports.get_muscle_groups = function(req, res) {
	MuscleModel.find({}).sort({ name : 1 }).exec(
		function(err, result) {
			res.json(result);
		}
	);
};

exports.add_exercise = function(req, res) {
	var exercise = new ExerciseModel({
		name 		: req.query.exercise_name,
		description	: req.query.exercise_desc,
		muscle 		: req.query.muscle_group,
		equip		: req.query.equipment,
		exercise_type : req.query.exercise_type,
		video 		: req.query.video
	});

	exercise.save(function(err, result) {
		res.json({"success" : true});
	});	
};	

exports.get_exercises = function(req, res) {
	ExerciseModel.find({}).sort({ name : 1 }).exec(
		function(err, result) {
			res.json(result);
		}
	);
};


// exports.delete_member = function(req, res) {
// 	var id = new ObjectId();
// 	UserModel.remove({ _id : id }, function(err, result) {
		
// 	});
// };

// exports.get_pro_queue = function(req, res) {
// 	ProQueModel.find({}, 
// 		function(err, result) {
// 			if(result != null) {
// 				for(var i = 0; i < result.length; i++) {
// 					UserModel.find({ _id : new ObjectId(result.user_id) })
// 						.sort({ username : 1 })
// 						.execFind(
// 						);
// 				}
// 			}
// 		}
// 	);
// };
