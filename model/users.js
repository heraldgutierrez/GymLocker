// var mongoose = require('mongoose');

var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	name: String,
	role: Number
});

var UserModel = mongoose.model('Users', userSchema);
mongoose.connect('mongodb://localhost/GymLocker');

exports.userlist = function userlist(role, callback) {
	// console.log('Inside UserList with role of ' + role);
	// var UserModel = mongoose.model('Users');

	UserModel.find({}, function(err, users) {
		if(err) {
			// console.log(err);
		} else {
			// console.log(users);
			callback(null, users);
		}
	})// end User.find()
}// end exports.userlist

exports.addUser = function addUser(name, callback) {
	// var UserModel = mongoose.model('Users');
	var user = new UserModel({
		_id: getNextSequence('userid'),
		name: name,
		role: 2
	});

	user.save(function(err) {
		if(!err) {
			callback(null, true);
		} else {
			return console.log(err);
		}
	});

	// return; //res.send(user);
}// end exports.userlist

// function getNextSequence(name) {
// 	var ret = db.counters.findAndModify({
// 		query: { _id: name },
// 		update: { $inc: { seq: 1} },
// 		new: true
// 	});

// 	return ret.seq;
// }

exports.userExists = function userExists(name, callback) {
	// var UserModel = mongoose.model('Users');
	UserModel.findOne({name: name}, function(err, user) {
		if(err)
			console.log(err);
		else if(user == null)
			callback(null, false);
		else
			callback(null, user);
	});
}