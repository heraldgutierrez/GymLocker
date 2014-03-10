
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

// mongodb
var mongoose = require('mongoose');
var mongoDBConnect = process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/GymLocker';
mongoose.connect(mongoDBConnect);

// models
var models = require('./model/model');

// routes
var routes = require('./routes/routes');
var isLoggedIn = routes.isLoggedIn;

// all environments
app.configure(function() {
	app.set('port', process.env.PORT || 5000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

// development only
app.configure('development', function() {
	app.use(express.errorHandler());
});



/*********************************************************
**********************************************************
*
*	HTML pages/handlers
*
*********************************************************
*********************************************************/
app.get('/', routes.home);				// index page
app.post('/signup', routes.signup);	// add new user
app.post('/login', routes.login);		// user login
app.get('/main', isLoggedIn, routes.main);
app.get('/logout', routes.logout);
app.get('/demo', routes.demo);

// admin pages
app.get('/admin/members', isLoggedIn, routes.admin_users);
app.get('/admin/professional_queue', isLoggedIn, routes.admin_pro_queue);
app.get('/admin/exercises', isLoggedIn, routes.admin_exercises);
app.get('/admin/equipment', isLoggedIn, routes.admin_equip);
app.get('/admin/add_exercise', isLoggedIn, routes.admin_add_ex);
app.get('/admin/add_equipment', isLoggedIn, routes.admin_add_equip);

// admin JSON calls
app.get('/get_all_members', routes.db_get_all_members);
// app.get('/delete_members', routes.db_delete_members);
// app.get('/get_pro_queue', routes.db_get_pro_queue);
// app.get('/get_all_exs', routes.db_get_all_ex);
app.get('/get_equipment', routes.db_get_all_equip);
app.get('/add_equipment', routes.db_add_equip);
app.get('/get_muscle_groups', routes.db_get_muscle_groups);
app.get('/get_exercise_types', routes.db_get_exercise_types);
app.get('/add_exercise', routes.db_add_exercise);
app.get('/get_exercises', routes.db_get_exercises);

// fitness pages
app.get('/fitness/library', isLoggedIn, routes.fitness);
app.get('/fitness/create', isLoggedIn, routes.create_workout);

// fitness JSON calls
app.get('/fitness/get_previous_workouts', routes.db_get_previous_workouts);
app.get('/fitness/get_planned_workouts', routes.db_get_planned_workouts);
app.get('/fitness/check_existing_workout', routes.db_check_existing_workouts);
app.get('/get_exercises_by_muscle', routes.db_get_exercises_by_muscle);
app.get('/fitness/get_ex_search_results', routes.db_get_ex_search_results);
app.post('/fitness/save_workout', routes.db_save_workout);
app.post('/fitness/delete_workout', routes.db_delete_workout);
app.post('/fitness/add_to_existing_workout', routes.db_add_to_existing_workout)

// user JSON calls
app.get('/get_settings', routes.get_settings);
app.post('/save_preference', routes.save_preference);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
