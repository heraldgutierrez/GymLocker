var index = require('./index');
var admin = require('./admin_pages');
var admin_db = require('./admin_db');
var fitness = require('./fitness_pages');
var fitness_db = require('./fitness_db');
var user = require('./user');

// Index pages
exports.home = index.home;					// index/login page
exports.isLoggedIn = index.isLoggedIn;		// checks if someone is logged in
exports.login = index.login;				// attempt to log in
exports.logout = index.logout;				// log out
exports.main = index.main;					// onces logged in/signed up, view main home page
exports.signup = index.signup;				// attempt to sign up
exports.demo = index.demo;					// signin using a demo account

// Admin pages
exports.admin_users = admin.users;
exports.admin_pro_queue = admin.pro_queue;
exports.admin_exercises = admin.exercises;
exports.admin_equip = admin.equip;
exports.admin_add_ex = admin.add_ex;
exports.admin_add_equip = admin.add_equip;

// Admin Query/JSON
exports.db_get_all_members = admin_db.get_all_members;
// exports.db_delete_members = admin_db.delete_members;
// exports.db_get_pro_queue = admin_db.get_pro_queue;
// exports.db_get_all_ex = admin_db.get_all_ex;
exports.db_get_all_equip = admin_db.get_all_equip;
exports.db_add_equip = admin_db.add_equip;
exports.db_get_muscle_groups = admin_db.get_muscle_groups;
exports.db_get_exercise_types = admin_db.get_exercise_types;
exports.db_get_exercises = admin_db.get_exercises;
exports.db_add_exercise = admin_db.add_exercise;

// Fitness pages
exports.fitness = fitness.library;
exports.create_workout = fitness.create_workout;

// Fitness Query/JSON 
exports.db_get_exercises_by_muscle = fitness_db.get_exercises_by_muscle;
exports.db_get_previous_workouts = fitness_db.get_previous_workouts;
exports.db_get_planned_workouts = fitness_db.get_planned_workouts;
exports.db_check_existing_workouts = fitness_db.check_existing_workouts;
exports.db_get_ex_search_results = fitness_db.get_ex_search_results;
exports.db_save_workout = fitness_db.save_workout;
exports.db_delete_workout = fitness_db.delete_workout;

// User Query/JSON
exports.get_settings = user.get_settings;
exports.save_preference = user.save_preference;