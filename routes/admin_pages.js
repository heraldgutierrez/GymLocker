exports.users = function(req, res) {
	var currUser = req.session.currentUser;
	res.render('admin/admin_members', {
		title	: 'GymLocker - All Members',
		role 	: currUser.role
	});
};

exports.pro_queue = function(req, res) {
	var currUser = req.session.currentUser;
	res.render('admin/admin_pro_queue', {
		title	: 'GymLocker - Trainer Queue',
		role 	: currUser.role
	});
};

exports.exercises = function(req, res) {
	var currUser = req.session.currentUser;
	res.render('admin/admin_ex', {
		title	: 'GymLocker - All Exercises',
		role 	: currUser.role
	});
};

exports.equip = function(req, res) {
	var currUser = req.session.currentUser;
	res.render('admin/admin_equip', {
		title	: 'GymLocker - All Equipment',
		role 	: currUser.role
	});
};

exports.add_ex = function(req, res) {
	var currUser = req.session.currentUser;
	res.render('admin/admin_add_ex', {
		title	: 'GymLocker - Adding an Exercise',
		role 	: currUser.role
	});
};

exports.add_equip = function(req, res) {
	var currUser = req.session.currentUser;
	res.render('admin/admin_add_equip', {
		title	: 'GymLocker - Adding an Equipment',
		role 	: currUser.role
	});
};