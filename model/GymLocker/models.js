var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

// comparing _id
// var ObjectId = mongoose.Types.ObjectId;
// var id = new ObjectId('id string');
// OR
// var id = mongoose.Types.ObjectId('id string');

exports.generate = generate;

function generate() {
	var ModelBio = biometrics();
	var ModelBioType = biometric_types();
	var ModelEquip = equipment_type();
	var ModelExType = exercise_types();
	var ModelEx = exercises();
	var ModelMuscle = muscle_groups();
	var ModelProQue = professional_queue();
	var ModelPro = professionals();
	var ModelRoutExl = routine_exercises();
	var ModelTrainClient = trainer_client();
	var ModelTrainReq = training_requests();
	var ModelRoutine = user_routines();
	var ModelUserSetting = user_settings();
	var ModelUserWorkout = user_workouts();
	var UserModel = users();
	var ModelWorkout = workouts();
}

function biometrics() {
	var BSchema = new Schema({
		user_id	: String,
		date	: String,
		value	: Number,
		bio_type : String
	});

	mongoose.model('Biometrics', BSchema);
	return mongoose.model('Biometrics');
}

function biometric_types() {
	var BTSchema = new Schema({
		name	: String,
		typecode : String
	});

	mongoose.model('BiometricType', BTSchema);
	return mongoose.model('BiometricType');
}

function equipment_type() {
	var ETSchema = new Schema({
		name	: String,
		deleted : { type : Boolean, default : false }
	});

	mongoose.model('EquipmentType', ETSchema);
	return mongoose.model('EquipmentType');
}

function exercise_types() {
	var ETSchema = new Schema({
		name 	: String
	});

	mongoose.model('ExerciseType', ETSchema);
	return mongoose.model('ExerciseType');
}

function exercises() {
	var ESchema = new Schema({
		name 		: String,
		description	: String,
		muscle 		: String,
		equip		: String,
		exercise_type : String,
		video 		: String
	});

	mongoose.model('Exercises', ESchema);
	return mongoose.model('Exercises');
}

function muscle_groups() {
	var MGSchema = new Schema({
		name	: String
	});

	mongoose.model('MuscleGroup', MGSchema);
	return mongoose.model('MuscleGroup');
}

function professional_queue() {
	var PQSchema = new Schema({
		user_id 	: String,
		date 		: String
	});

	mongoose.model('ProQueue', PQSchema);
	return mongoose.model('ProQueue');
}

function professionals() {
	var PSchema = new Schema({
		user_id 	: String,
		available 	: { type : Boolean, default : true },
		showLoc 	: { type : Boolean, default : true },
		showTel 	: { type : Boolean, default : true },
		showEmail 	: { type : Boolean, default : true },
		showWeb 	: { type : Boolean, default : true },
		comments 	: String
	});

	mongoose.model('Professional', PSchema);
	return mongoose.model('Professional');
}

function routine_exercises() {
	var RESchema = new Schema({
		routine_id 	: String,
		exercise_id	: String
	});

	mongoose.model('RoutineExercises', RESchema);
	return mongoose.model('RoutineExercises');
}

function trainer_client() {
	var TCSchema = new Schema({
		trainer_id 	: String,
		client_id	: String
	});

	mongoose.model('TrainerClient', TCSchema);
	return mongoose.model('TrainerClient');
}

function training_requests() {
	var TRSchema = new Schema({
		trainer_id 	: String,
		client_id	: String,
		comment 	: String
	});

	mongoose.model('TrainerReq', TRSchema);
	return mongoose.model('TrainerReq');
}

function user_routines() {
	var URSchema = new Schema({
		user_id 	: String,
		date 		: String,
		title  		: String,
		comment 	: String
	});

	mongoose.model('UserRoutine', URSchema);
	return mongoose.model('UserRoutine');
}

function user_settings() {
	var USSchema = new Schema({
		user_id 	: String,
		setting 	: String,
		value		: String
	});

	mongoose.model('UserSetting', USSchema);
	return mongoose.model('UserSetting');
}

function user_workouts() {
	var UWSchema = new Schema({
		user_id 	: String,
		date		: String
	});

	mongoose.model('UserWorkout', UWSchema);
	return mongoose.model('UserWorkout');
}

function users() {
	var USchema = new Schema({
		username	: { type : String, index : { unique : true}},
		password	: String,
		role		: { type : String, default : '3' },
		diagram 	: { type : Boolean, default : false },
		exercise_help 	: { type : Boolean, default : true },
		create_help : { type : Boolean, default : true },
		view_workout_help 	: { type : Boolean, default : true },
		view_routines_help 	: { type : Boolean, default : true },
		deleted		: { type : Boolean, default : false }
	});

	USchema.pre('save', function(next) {
		var user = this;

		if(!user.isModified('password'))
			return next();

		bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
			if(err)
				return next(err);

			bcrypt.hash(user.password, salt, function(err, hash) {
				if(err)
					return next(err);

				user.password = hash;
				next();
			});
		});
	});

	USchema.methods.comparePassword = function(candidatePassword, cb) {
		bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
			if(err)
				return cb(err);
			cb(null, isMatch);
		});
	};

	mongoose.model('User', USchema);
	return mongoose.model('User');
}

function workouts() {
	var ESchema = new Schema({
		name 		: String,
		description	: String,
		muscle 		: String,
		equip		: String,
		exercise_type : String,
		video 		: String
	});

	// var WSchema = new Schema({
	// 	user_id 	: String,
	// 	workout_id 	: String,
	// 	date 		: String,
	// 	exercise	: String,
	// 	reps 		: String,
	// 	weight		: String,
	// 	muscle 		: String,
	// 	comments 	: String
	// });

	var WSchema = new Schema({
		user_id 	: String,
		workout_id 	: String,
		date 		: String,
		reps 		: String,
		weight		: String,
		comments 	: String,
		exercises 	: [ESchema]
	});

	mongoose.model('Workout', WSchema);
	return mongoose.model('Workout');
}